'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {
  collection, doc, getDoc, onSnapshot, query,
  orderBy, setDoc, updateDoc, where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  AlertTriangle, Bell, BellOff, CheckCircle2, Eye,
  MessageSquare, Plus, Settings, Trash2, X,
} from 'lucide-react';
import { cn } from '@/lib/math-platform/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatAlert {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  flaggedWord: string;
  messageText: string;
  createdAt: string;
  read: boolean;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AlertsPage() {
  const { courseId } = useParams<{ courseId: string }>();

  // ── Flagged words state ──────────────────────────────────────────────────
  const [chatFlags, setChatFlags] = useState<string[]>([]);
  const [newFlag, setNewFlag] = useState('');
  const [savingFlags, setSavingFlags] = useState(false);

  // ── Alerts state ─────────────────────────────────────────────────────────
  const [alerts, setAlerts] = useState<ChatAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);

  // ── Load flagged words from courses/{courseId} ───────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, 'courses', courseId));
        if (snap.exists()) {
          setChatFlags((snap.data().chatFlags as string[]) ?? []);
        }
      } catch (e) {
        console.error('Failed to load chat flags', e);
      }
    }
    load();
  }, [courseId]);

  // ── Subscribe to alerts ──────────────────────────────────────────────────
  useEffect(() => {
    const q = query(
      collection(db, 'chatAlerts'),
      where('courseId', '==', courseId),
      orderBy('createdAt', 'desc'),
    );
    const unsub = onSnapshot(q, (snap) => {
      setAlerts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatAlert)));
      setAlertsLoading(false);
    }, () => setAlertsLoading(false));
    return unsub;
  }, [courseId]);

  // ── Save flagged words ───────────────────────────────────────────────────
  const saveFlags = useCallback(async (flags: string[]) => {
    setSavingFlags(true);
    try {
      await setDoc(doc(db, 'courses', courseId), { chatFlags: flags }, { merge: true });
      setChatFlags(flags);
    } finally {
      setSavingFlags(false);
    }
  }, [courseId]);

  function addFlag() {
    const word = newFlag.trim().toLowerCase();
    if (!word || chatFlags.includes(word)) return;
    setNewFlag('');
    saveFlags([...chatFlags, word]);
  }

  function removeFlag(word: string) {
    saveFlags(chatFlags.filter((f) => f !== word));
  }

  // ── Mark alert read ──────────────────────────────────────────────────────
  async function markRead(alertId: string) {
    await updateDoc(doc(db, 'chatAlerts', alertId), { read: true });
  }

  const unreadCount = alerts.filter((a) => !a.read).length;
  const visible = filterUnread ? alerts.filter((a) => !a.read) : alerts;

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString('he-IL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">התראות צ׳אט</h1>
        <p className="mt-1 text-sm text-slate-500">
          הגדר מילות דגל ועקב אחרי שיחות חריגות של סטודנטים
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* ── Left: Flagged words settings ──────────────────────────────── */}
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Settings className="h-4 w-4 text-slate-600" />
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">מילות דגל</h2>
            </div>
            <p className="mb-4 text-xs text-slate-500">
              כאשר סטודנט כותב מילה שמורה — תיווצר התראה אוטומטית כאן.
              המילות אינן תלויות רישיות.
            </p>

            {/* Add word input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newFlag}
                onChange={(e) => setNewFlag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addFlag()}
                placeholder="הוסף מילה..."
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none"
                dir="auto"
              />
              <button
                onClick={addFlag}
                disabled={!newFlag.trim() || savingFlags}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white! disabled:opacity-50 transition hover:bg-indigo-500"
              >
                <Plus className="h-4 w-4" />
                הוסף
              </button>
            </div>

            {/* Existing flags */}
            {chatFlags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {chatFlags.map((word) => (
                  <span
                    key={word}
                    className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700"
                  >
                    {word}
                    <button
                      onClick={() => removeFlag(word)}
                      className="rounded-full p-0.5 transition hover:bg-rose-200"
                      aria-label={`הסר ${word}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-center text-xs text-slate-400">
                אין מילות דגל מוגדרות
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4">
              <div className="flex items-center gap-2 text-rose-600">
                <Bell className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wide">לא נקראו</p>
              </div>
              <p className="mt-1 text-3xl font-bold text-rose-700">{unreadCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
              <div className="flex items-center gap-2 text-slate-500">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-wide">סה״כ</p>
              </div>
              <p className="mt-1 text-3xl font-bold text-slate-800">{alerts.length}</p>
            </div>
          </div>
        </div>

        {/* ── Right: Alerts list ─────────────────────────────────────────── */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-700">
              התראות
              {unreadCount > 0 && (
                <span className="mr-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                  {unreadCount} חדשות
                </span>
              )}
            </h2>
            <button
              onClick={() => setFilterUnread((v) => !v)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition',
                filterUnread
                  ? 'bg-rose-100 text-rose-700'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300',
              )}
            >
              {filterUnread ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
              {filterUnread ? 'כל ההתראות' : 'לא נקראו בלבד'}
            </button>
          </div>

          {alertsLoading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-slate-400">טוען...</p>
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <CheckCircle2 className="mb-3 h-10 w-10 text-emerald-400" />
              <p className="font-semibold text-slate-600">אין התראות</p>
              <p className="mt-1 text-xs text-slate-400">
                {filterUnread ? 'כל ההתראות נקראו' : 'לא נמצאו שיחות חריגות'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onMarkRead={() => markRead(alert.id)}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Alert card ───────────────────────────────────────────────────────────────

function AlertCard({
  alert,
  onMarkRead,
  formatDate,
}: {
  alert: ChatAlert;
  onMarkRead: () => void;
  formatDate: (s: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-5 shadow-sm transition',
        !alert.read ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold',
            !alert.read ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600',
          )}>
            {alert.userName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{alert.userName}</p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                &quot;{alert.flaggedWord}&quot;
              </span>
              <span>{formatDate(alert.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!alert.read && (
            <button
              onClick={onMarkRead}
              title="סמן כנקרא"
              className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              נקרא
            </button>
          )}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300"
          >
            {expanded ? <X className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {expanded ? 'סגור' : 'הצג'}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <MessageSquare className="h-3.5 w-3.5" />
            הודעת הסטודנט
          </div>
          <p className="text-sm leading-7 text-slate-700" dir="auto">{alert.messageText}</p>
        </div>
      )}
    </div>
  );
}
