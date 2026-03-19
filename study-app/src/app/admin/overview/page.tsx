'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Users, MessageSquare, MessageCircle,
  BookMarked, ArrowLeft, Loader2, AlertTriangle,
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  chatUsers: number;
  totalMessages: number;
  totalFeedback: number;
  feedbackGotIt: number;
  feedbackNeedsReview: number;
  feedbackLost: number;
  totalAlerts: number;
}

const EMPTY: Stats = {
  totalUsers: 0,
  chatUsers: 0,
  totalMessages: 0,
  totalFeedback: 0,
  feedbackGotIt: 0,
  feedbackNeedsReview: 0,
  feedbackLost: 0,
  totalAlerts: 0,
};

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [studentsSnap, chatsSnap, feedbackSnap, alertsSnap] = await Promise.all([
        getDocs(collection(db, 'students')),
        getDocs(collection(db, 'chats')),
        getDocs(collection(db, 'theoryFeedback')),
        getDocs(collection(db, 'chatAlerts')),
      ]);

      let totalMessages = 0;
      chatsSnap.forEach(d => {
        const msgs = d.data().messages;
        if (Array.isArray(msgs)) totalMessages += msgs.length;
      });

      let gotIt = 0, needsReview = 0, lost = 0;
      feedbackSnap.forEach(d => {
        const s = d.data().status;
        if (s === 'got_it') gotIt++;
        else if (s === 'needs_review') needsReview++;
        else if (s === 'lost') lost++;
      });

      setStats({
        totalUsers: studentsSnap.size,
        chatUsers: chatsSnap.size,
        totalMessages,
        totalFeedback: feedbackSnap.size,
        feedbackGotIt: gotIt,
        feedbackNeedsReview: needsReview,
        feedbackLost: lost,
        totalAlerts: alertsSnap.size,
      });
      setLoading(false);
    }

    load().catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8" dir="rtl">

      {/* Header */}
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            חזרה
          </Link>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">סטטיסטיקות מערכת</p>
        <h1 className="mt-1 text-2xl font-bold text-white">סקירה כללית</h1>
        <p className="mt-1 text-sm text-slate-500">מונים בזמן אמת מכל המשתמשים</p>

        {loading && (
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">טוען נתונים...</span>
          </div>
        )}

        {/* ── Grid of counters ─────────────────────────────────── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Counter
            icon={Users}
            accent="from-indigo-500 to-violet-500"
            label="משתמשים רשומים"
            value={stats.totalUsers}
            loading={loading}
          />
          <Counter
            icon={MessageSquare}
            accent="from-sky-500 to-cyan-500"
            label="משתמשי צ׳אט"
            value={stats.chatUsers}
            loading={loading}
          />
          <Counter
            icon={MessageCircle}
            accent="from-teal-500 to-emerald-500"
            label="הודעות בצ׳אט"
            value={stats.totalMessages}
            loading={loading}
          />
          <Counter
            icon={AlertTriangle}
            accent="from-rose-500 to-red-500"
            label="התראות"
            value={stats.totalAlerts}
            loading={loading}
          />
        </div>

        {/* ── Theory feedback ───────────────────────────────────── */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Counter
            icon={BookMarked}
            accent="from-amber-500 to-orange-500"
            label="סימונים — הכל"
            value={stats.totalFeedback}
            loading={loading}
          />
          <SmallCounter
            label="הבנתי"
            value={stats.feedbackGotIt}
            color="text-emerald-400"
            loading={loading}
          />
          <SmallCounter
            label="צריך חידוד"
            value={stats.feedbackNeedsReview}
            color="text-amber-400"
            loading={loading}
          />
          <SmallCounter
            label="לא הבנתי"
            value={stats.feedbackLost}
            color="text-rose-400"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────────────────────────── */

function Counter({
  icon: Icon,
  accent,
  label,
  value,
  loading,
}: {
  icon: React.ElementType;
  accent: string;
  label: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      {loading ? (
        <div className="h-8 w-16 animate-pulse rounded-lg bg-white/10" />
      ) : (
        <p className="text-3xl font-bold tabular-nums text-white">{value.toLocaleString()}</p>
      )}
      <p className="mt-1.5 text-sm text-slate-400">{label}</p>
    </div>
  );
}

function SmallCounter({
  label,
  value,
  color,
  loading,
}: {
  label: string;
  value: number;
  color: string;
  loading: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
      <p className="text-sm text-slate-400">{label}</p>
      {loading ? (
        <div className="h-6 w-10 animate-pulse rounded-lg bg-white/10" />
      ) : (
        <p className={`text-2xl font-bold tabular-nums ${color}`}>{value.toLocaleString()}</p>
      )}
    </div>
  );
}
