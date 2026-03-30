'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Paperclip, Send, X, Bot, User, AlertCircle } from 'lucide-react';
import { getCourseById } from '@/lib/math-platform/data';
import MathText from '@/components/MathText';
import type { CourseId } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';
import { getDoc, setDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imagePreview?: string;
}

const CHAT_TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

export default function ChatPage() {
  const params = useParams();
  const courseId = params.courseId as CourseId;
  const course = getCourseById(courseId);
  const { user } = useAuth();

  const docId = user ? `${courseId}_${user.uid}` : null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history from Firestore on mount
  useEffect(() => {
    if (!user || !docId) {
      setChatLoading(false);
      return;
    }

    const loadChat = async () => {
      try {
        const ref = doc(db, 'chats', docId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() as {
            messages: Message[];
            lastMessageAt: string;
            courseId: string;
            userId: string;
          };

          const lastAt = new Date(data.lastMessageAt).getTime();
          const isExpired = Date.now() - lastAt > CHAT_TTL_MS;

          if (isExpired) {
            await setDoc(ref, {
              messages: [],
              lastMessageAt: new Date().toISOString(),
              courseId,
              userId: user.uid,
            });
            setMessages([]);
          } else {
            setMessages(data.messages ?? []);
          }
        }
      } catch (e) {
        console.error('[chat] failed to load Firestore chat:', e);
      } finally {
        setChatLoading(false);
      }
    };

    loadChat();
  }, [user, docId, courseId]);

  // Scroll to bottom on new messages / streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  const saveToFirestore = useCallback(
    async (allMessages: Message[]) => {
      if (!user || !docId) return;
      try {
        const cleanMessages = allMessages.map(({ id, role, content, imagePreview }) => ({
          id,
          role,
          content,
          ...(imagePreview ? { imagePreview } : {}),
        }));
        await setDoc(doc(db, 'chats', docId), {
          messages: cleanMessages,
          lastMessageAt: new Date().toISOString(),
          courseId,
          userId: user.uid,
          userName: user.displayName ?? null,
          userEmail: user.email ?? null,
        });
      } catch (e) {
        console.error('[chat] failed to save to Firestore:', e);
      }
    },
    [user, docId, courseId],
  );

  const checkFlaggedWords = useCallback(
    async (text: string) => {
      if (!user) return;
      try {
        const courseRef = doc(db, 'courses', courseId);
        const courseSnap = await getDoc(courseRef);
        if (!courseSnap.exists()) return;

        const flags: string[] = courseSnap.data()?.chatFlags ?? [];
        const lowerText = text.toLowerCase();

        for (const word of flags) {
          if (lowerText.includes(word.toLowerCase())) {
            await addDoc(collection(db, 'chatAlerts'), {
              courseId,
              userId: user.uid,
              userName: user.displayName ?? user.email,
              flaggedWord: word,
              messageText: text,
              createdAt: new Date().toISOString(),
              read: false,
            });
            break; // alert once per message
          }
        }
      } catch (e) {
        console.error('[chat] flagged words check failed:', e);
      }
    },
    [user, courseId],
  );

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('ניתן להעלות קבצי תמונה בלבד (PNG, JPG, JPEG)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('הקובץ גדול מדי — מקסימום 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      const base64 = dataUrl.split(',')[1];
      setImageBase64(base64 ?? null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text && !imageBase64) return;
    if (streaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text || 'אנא בדוק את העבודה שהעליתי',
      imagePreview: imagePreview ?? undefined,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setImageBase64(null);
    setImagePreview(null);
    setStreaming(true);
    setError(null);

    // Check for flagged words (fire and forget)
    if (text) checkFlaggedWords(text);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
          imageBase64: imageBase64 ?? undefined,
        }),
      });

      if (!res.ok) throw new Error('שגיאה בשרת');

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m)),
        );
      }

      // Save full conversation to Firestore after streaming finishes
      const finalMessages = [...updatedMessages, { id: assistantId, role: 'assistant' as const, content: accumulated }];
      await saveToFirestore(finalMessages);
    } catch {
      setError('שגיאה בחיבור לשרת. נסה שוב.');
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }, [input, imageBase64, imagePreview, messages, streaming, courseId, checkFlaggedWords, saveToFirestore]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!course) return null;

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-280px)] min-h-[480px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">מנחה אישי — {course.shortTitle}</p>
            <p className="text-xs text-slate-500">שואל שאלות, לא נותן תשובות</p>
          </div>
          <div className="mr-auto rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            מחובר
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {chatLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-300 [animation-delay:300ms]" />
              </span>
            </div>
          ) : isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                <Bot className="h-8 w-8" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-950">שלום! אני המנחה שלך לקורס {course.shortTitle}</p>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  שאל אותי על חומר הקורס, העלה תמונה של תרגיל לבדיקה, או בקש רמז — אני כאן לעזור לך להגיע לתשובה בעצמך.
                </p>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {['תן לי רמז לשאלה שאני תקוע בה', 'איך מוכיחים בהפרכה?', 'הסבר לי את המושג הזה'].slice(
                  0,
                  3,
                ).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setInput(suggestion);
                      textareaRef.current?.focus();
                    }}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:bg-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex items-end gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-xl',
                      msg.role === 'user' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600',
                    )}
                  >
                    {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={cn(
                      'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-7',
                      msg.role === 'user'
                        ? 'rounded-br-md bg-slate-950 text-white'
                        : 'rounded-bl-md bg-slate-100 text-slate-800',
                    )}
                  >
                    {msg.imagePreview && (
                      <img
                        src={msg.imagePreview}
                        alt="תמונה שהועלתה"
                        className="mb-2 max-h-48 rounded-xl object-contain"
                      />
                    )}
                    {msg.content ? (
                      <MathText text={msg.content} />
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-2 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Image preview */}
        {imagePreview && (
          <div className="mx-6 mb-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <img src={imagePreview} alt="תצוגה מקדימה" className="h-12 w-12 rounded-xl object-cover" />
            <p className="flex-1 text-xs text-slate-600">תמונה מוכנה לשליחה</p>
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setImageBase64(null);
              }}
              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-slate-100 px-4 py-4">
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-950"
              title="העלה תמונה"
            >
              <Paperclip className="h-4 w-4" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="שאל שאלה, בקש רמז, או תאר איפה נתקעת..."
              rows={1}
              dir="rtl"
              className="flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
              style={{ maxHeight: '120px', overflowY: 'auto' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
              }}
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={streaming || (!input.trim() && !imageBase64)}
              className={cn(
                'mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition',
                streaming || (!input.trim() && !imageBase64)
                  ? 'bg-slate-100 text-slate-300'
                  : 'bg-slate-950 text-white! hover:bg-slate-800',
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            Enter לשליחה · Shift+Enter לשורה חדשה · המנחה לא מגלה פתרונות · שיחה נשמרת ל-72 שעות
          </p>
        </div>
      </div>
  );
}
