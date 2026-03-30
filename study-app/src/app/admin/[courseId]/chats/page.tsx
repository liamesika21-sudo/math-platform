'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MessageSquare, Search, User, ChevronLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/math-platform/utils';
import MathText from '@/components/MathText';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  docId: string;
  userId: string;
  userName: string | null;
  userEmail: string | null;
  courseId: string;
  lastMessageAt: string;
  messages: ChatMessage[];
}

export default function AdminChatsPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    async function loadChats() {
      try {
        const q = query(
          collection(db, 'chats'),
          where('courseId', '==', courseId),
          orderBy('lastMessageAt', 'desc'),
        );
        const snap = await getDocs(q);
        const list: ChatSession[] = [];
        for (const d of snap.docs) {
          const data = d.data();
          if (data.messages?.length) {
            list.push({
              docId: d.id,
              userId: data.userId,
              userName: data.userName ?? null,
              userEmail: data.userEmail ?? null,
              courseId: data.courseId,
              lastMessageAt: data.lastMessageAt,
              messages: data.messages,
            });
          }
        }
        setSessions(list);
      } catch (e) {
        console.error('[admin/chats] load error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadChats();
  }, [courseId]);

  const filtered = sessions.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.userName?.toLowerCase().includes(q) ||
      s.userEmail?.toLowerCase().includes(q) ||
      s.userId.toLowerCase().includes(q)
    );
  });

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function displayName(s: ChatSession) {
    return s.userName || s.userEmail || s.userId;
  }

  // ── Detail view ──────────────────────────────────────────────────────────
  if (selectedSession) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <button
          onClick={() => setSelectedSession(null)}
          className="mb-4 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-700"
        >
          <ChevronLeft className="h-4 w-4" />
          חזרה לרשימה
        </button>

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {displayName(selectedSession)}
              </h2>
              {selectedSession.userEmail && selectedSession.userName && (
                <p className="text-sm text-slate-500">{selectedSession.userEmail}</p>
              )}
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />
                עדכון אחרון: {formatDate(selectedSession.lastMessageAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {selectedSession.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'rounded-xl p-4 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'mr-8 border border-indigo-100 bg-indigo-50 text-slate-800'
                  : 'ml-8 border border-slate-100 bg-white text-slate-700',
              )}
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {msg.role === 'user' ? 'סטודנט' : 'AI Mentor'}
              </div>
              <MathText text={msg.content} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">צ׳אטים של סטודנטים</h1>
          <p className="text-sm text-slate-500">
            צפייה בהתכתבויות סטודנטים עם ה-AI Mentor
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <MessageSquare className="h-5 w-5" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם, מייל או מזהה..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-10 pl-4 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400">טוען צ׳אטים...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-400">
          {search ? 'לא נמצאו תוצאות' : 'אין צ׳אטים עדיין'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((s) => {
            const userMsgCount = s.messages.filter((m) => m.role === 'user').length;
            const lastMsg = s.messages[s.messages.length - 1];
            return (
              <button
                key={s.docId}
                onClick={() => setSelectedSession(s)}
                className="flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-right shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-800">
                      {displayName(s)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDate(s.lastMessageAt)}
                    </span>
                  </div>
                  {s.userEmail && s.userName && (
                    <p className="text-xs text-slate-400">{s.userEmail}</p>
                  )}
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {lastMsg?.content?.slice(0, 80)}
                    {(lastMsg?.content?.length ?? 0) > 80 ? '...' : ''}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                    {userMsgCount}
                  </span>
                  <span className="text-[10px] text-slate-400">הודעות</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
