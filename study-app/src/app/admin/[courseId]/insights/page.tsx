'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getTheoryItemsForWeek, getCourseWeeks } from '@/lib/math-platform/data';
import type { CourseId, TheoryItem } from '@/lib/math-platform/types';
import type { FeedbackDoc, FeedbackStatus } from '@/contexts/TheoryFeedbackContext';
import { cn } from '@/lib/math-platform/utils';
import { AlertTriangle, CheckCircle2, HelpCircle, RefreshCw, Users } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ItemAggregate {
  item: TheoryItem;
  total: number;
  got_it: number;
  needs_review: number;
  lost: number;
  /** % of respondents who flagged needs_review or lost */
  struggleRate: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<FeedbackStatus, { label: string; icon: React.ElementType; bar: string; text: string }> = {
  got_it:       { label: 'הבנתי',       icon: CheckCircle2, bar: 'bg-emerald-400', text: 'text-emerald-700' },
  needs_review: { label: 'צריך חידוד', icon: RefreshCw,    bar: 'bg-amber-400',   text: 'text-amber-700'   },
  lost:         { label: 'לא הבנתי',   icon: HelpCircle,   bar: 'bg-rose-400',    text: 'text-rose-700'    },
};

function pct(n: number, total: number) {
  return total === 0 ? 0 : Math.round((n / total) * 100);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const cid = courseId as CourseId;

  // All feedback docs for this course (real-time)
  const [docs, setDocs] = useState<FeedbackDoc[]>([]);
  const [fbLoading, setFbLoading] = useState(true);

  // Selected week filter (null = all weeks)
  const weeks = getCourseWeeks(cid);
  const [weekFilter, setWeekFilter] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'theoryFeedback'), where('courseId', '==', cid));
    const unsub = onSnapshot(q, (snap) => {
      setDocs(snap.docs.map((d) => d.data() as FeedbackDoc));
      setFbLoading(false);
    });
    return unsub;
  }, [cid]);

  // All theory items for the selected week(s)
  const allItems: TheoryItem[] = useMemo(() => {
    const targetWeeks = weekFilter ? [weekFilter] : weeks.map((w) => w.id);
    return targetWeeks.flatMap((wid) => getTheoryItemsForWeek(wid));
  }, [weeks, weekFilter]);

  // Build per-item aggregates
  const aggregates: ItemAggregate[] = useMemo(() => {
    return allItems
      .map((item) => {
        const itemDocs = docs.filter((d) => d.itemId === item.id);
        const got_it       = itemDocs.filter((d) => d.status === 'got_it').length;
        const needs_review = itemDocs.filter((d) => d.status === 'needs_review').length;
        const lost         = itemDocs.filter((d) => d.status === 'lost').length;
        const total        = itemDocs.length;
        const struggleRate = pct(needs_review + lost, total);
        return { item, total, got_it, needs_review, lost, struggleRate };
      })
      .sort((a, b) => b.struggleRate - a.struggleRate);
  }, [allItems, docs]);

  const alertItems = aggregates.filter((a) => a.total > 0 && a.struggleRate >= 50);
  const totalRespondents = new Set(docs.map((d) => d.userId)).size;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">אנליטיקה</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">תובנות הבנה</h1>
        <p className="mt-1 text-sm text-slate-500">
          מעקב real-time אחרי רמת ההבנה של סטודנטים לפי הגדרות ומשפטים
        </p>
      </div>

      {/* Summary bar */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Users className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-wider">סטודנטים ענו</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-slate-950">{totalRespondents}</p>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-wider">פריטים קריטיים (≥50% מתקשים)</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-rose-700">{alertItems.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-wider">פריטים עם נתונים</p>
          </div>
          <p className="mt-1 text-3xl font-bold text-slate-950">
            {aggregates.filter((a) => a.total > 0).length}
            <span className="mr-1 text-base font-normal text-slate-400">/ {aggregates.length}</span>
          </p>
        </div>
      </div>

      {/* Week filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setWeekFilter(null)}
          className={cn(
            'rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
            weekFilter === null
              ? 'bg-slate-950 text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300',
          )}
        >
          כל השבועות
        </button>
        {weeks.map((w) => (
          <button
            key={w.id}
            onClick={() => setWeekFilter(w.id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
              weekFilter === w.id
                ? 'bg-slate-950 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300',
            )}
          >
            שבוע {w.number}
          </button>
        ))}
      </div>

      {/* Alert section */}
      {alertItems.length > 0 && (
        <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <p className="text-sm font-bold text-rose-800">
              {alertItems.length} פריטים שבהם יותר מ-50% מהסטודנטים מתקשים
            </p>
          </div>
          <div className="space-y-2">
            {alertItems.map((a) => (
              <div key={a.item.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{a.item.title}</p>
                  <p className="text-xs text-slate-500">שבוע {a.item.weekId.match(/\d+/)?.[0]}</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="text-rose-600">{a.struggleRate}% מתקשים</span>
                  <span className="text-slate-400">{a.total} תגובות</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full list */}
      {fbLoading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-slate-400">טוען נתונים...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {aggregates.map((a) => (
            <ItemInsightRow key={a.item.id} agg={a} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Row component ────────────────────────────────────────────────────────────

function ItemInsightRow({ agg }: { agg: ItemAggregate }) {
  const { item, total, got_it, needs_review, lost, struggleRate } = agg;
  const hasData = total > 0;

  const kindLabels: Record<string, string> = {
    definition: 'הגדרה', theorem: 'משפט', formula: 'נוסחה', concept: 'מושג',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-4 shadow-sm transition',
        hasData && struggleRate >= 50
          ? 'border-rose-200'
          : hasData
          ? 'border-slate-200'
          : 'border-slate-100 opacity-60',
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Item info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
              {kindLabels[item.kind] ?? item.kind}
            </span>
            <span className="text-[10px] text-slate-400">שבוע {item.weekId.match(/\d+/)?.[0]}</span>
          </div>
          <p className="mt-1 truncate text-sm font-semibold text-slate-900">{item.title}</p>
        </div>

        {/* Stats */}
        {hasData ? (
          <div className="flex items-center gap-4 text-xs">
            {(['got_it', 'needs_review', 'lost'] as FeedbackStatus[]).map((s) => {
              const cfg = STATUS_CONFIG[s];
              const Icon = cfg.icon;
              const count = agg[s];
              return (
                <div key={s} className={cn('flex items-center gap-1', cfg.text)}>
                  <Icon className="h-3.5 w-3.5" />
                  <span className="font-semibold">{pct(count, total)}%</span>
                  <span className="text-slate-400">({count})</span>
                </div>
              );
            })}
            <span className="text-slate-400">{total} ענו</span>
          </div>
        ) : (
          <span className="text-xs text-slate-300">אין תגובות עדיין</span>
        )}
      </div>

      {/* Stacked bar */}
      {hasData && (
        <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="bg-emerald-400 transition-all"
            style={{ width: `${pct(got_it, total)}%` }}
          />
          <div
            className="bg-amber-400 transition-all"
            style={{ width: `${pct(needs_review, total)}%` }}
          />
          <div
            className="bg-rose-400 transition-all"
            style={{ width: `${pct(lost, total)}%` }}
          />
        </div>
      )}
    </div>
  );
}
