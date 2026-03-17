'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2,
  Circle,
  Flame,
  Zap,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { getCourseQuestions, getCourseWeeks } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { cn, getDifficultyLabel } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

export default function HomeworkAnalysisPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const typedCourseId = courseId as CourseId;

  const allQuestions = getCourseQuestions(typedCourseId);
  const weeks = getCourseWeeks(typedCourseId);
  const hwQuestions = allQuestions.filter((q) => q.sourceType === 'homework');

  const { getState, setStatus, toggleFlag } = useCourseQuestionSession(typedCourseId, allQuestions);

  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);

  // Group hw questions by weekId
  const weekGroups = useMemo(() => {
    return weeks
      .map((week) => {
        const qs = hwQuestions.filter((q) => q.weekId === week.id);
        return { week, questions: qs };
      })
      .filter((g) => g.questions.length > 0);
  }, [weeks, hwQuestions]);

  // Overall stats
  const overallStats = useMemo(() => {
    const total = hwQuestions.length;
    const solved = hwQuestions.filter((q) => getState(q.id).status === 'solved').length;
    const hard = hwQuestions.filter((q) => getState(q.id).wasHard).length;
    const easy = hwQuestions.filter((q) => getState(q.id).wasEasy).length;
    return { total, solved, hard, easy, pct: total > 0 ? Math.round((solved / total) * 100) : 0 };
  }, [hwQuestions, getState]);

  if (hwQuestions.length === 0) {
    return (
      <div className="space-y-6">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ניתוח</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">מעקב שיעורי בית</h2>
        </section>
        <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-400">אין שיעורי בית זמינים עדיין בקורס זה.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-950/10">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">ניתוח</p>
              <h2 className="text-2xl font-semibold text-slate-950">מעקב שיעורי בית</h2>
              <p className="mt-0.5 text-sm text-slate-500">סמן קל / קשה לכל שאלה — עוקב אחר ההתקדמות לפי שבוע</p>
            </div>
          </div>
          {/* Overall progress bar */}
          <div className="min-w-[200px]">
            <div className="mb-1.5 flex justify-between text-xs text-slate-500">
              <span>{overallStats.solved}/{overallStats.total} נפתרו</span>
              <span>{overallStats.pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{ width: `${overallStats.pct}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Summary chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'סה"כ שאלות', value: overallStats.total, color: 'slate' },
          { label: 'נפתרו', value: overallStats.solved, color: 'emerald' },
          { label: 'סומנו קשות', value: overallStats.hard, color: 'rose' },
          { label: 'סומנו קלות', value: overallStats.easy, color: 'sky' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={cn(
              'rounded-[1.5rem] border p-4',
              color === 'slate' && 'border-slate-200 bg-white',
              color === 'emerald' && 'border-emerald-200 bg-emerald-50',
              color === 'rose' && 'border-rose-200 bg-rose-50',
              color === 'sky' && 'border-sky-200 bg-sky-50',
            )}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-[0.16em]',
              color === 'slate' && 'text-slate-500',
              color === 'emerald' && 'text-emerald-600',
              color === 'rose' && 'text-rose-600',
              color === 'sky' && 'text-sky-600',
            )}>{label}</p>
            <p className={cn('mt-1.5 text-3xl font-bold',
              color === 'slate' && 'text-slate-900',
              color === 'emerald' && 'text-emerald-900',
              color === 'rose' && 'text-rose-900',
              color === 'sky' && 'text-sky-900',
            )}>{value}</p>
          </div>
        ))}
      </div>

      {/* Week sections */}
      <div className="space-y-3">
        {weekGroups.map(({ week, questions }) => {
          const solved = questions.filter((q) => getState(q.id).status === 'solved').length;
          const hard = questions.filter((q) => getState(q.id).wasHard).length;
          const pct = questions.length > 0 ? Math.round((solved / questions.length) * 100) : 0;
          const isOpen = expandedWeek === week.id;

          return (
            <div
              key={week.id}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
            >
              {/* Week header — click to expand */}
              <button
                type="button"
                onClick={() => setExpandedWeek(isOpen ? null : week.id)}
                className="flex w-full items-center gap-4 p-5 text-right"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700">
                  {week.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-slate-950 text-sm">{week.title}</p>
                    {hard > 0 && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                        {hard} קשות
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={cn('h-full rounded-full transition-all', pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{solved}/{questions.length}</span>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </button>

              {/* Questions list */}
              {isOpen && (
                <div className="border-t border-slate-100">
                  {questions.map((q, idx) => {
                    const state = getState(q.id);
                    const isSolved = state.status === 'solved';

                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'flex items-center gap-3 px-5 py-3.5',
                          idx !== questions.length - 1 && 'border-b border-slate-50',
                          isSolved && 'bg-emerald-50/40',
                        )}
                      >
                        {/* Solved toggle */}
                        <button
                          type="button"
                          onClick={() => setStatus(q.id, isSolved ? 'not_started' : 'solved')}
                          className={cn(
                            'shrink-0 transition',
                            isSolved ? 'text-emerald-500' : 'text-slate-300 hover:text-slate-500',
                          )}
                          title={isSolved ? 'בטל פתרון' : 'סמן כנפתר'}
                        >
                          {isSolved ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                        </button>

                        {/* Question info */}
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-sm font-medium truncate', isSolved ? 'text-slate-400 line-through' : 'text-slate-900')}>
                            {q.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-400">{getDifficultyLabel(q.difficulty)}</p>
                        </div>

                        {/* Hard / Easy toggles */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleFlag(q.id, 'wasHard')}
                            className={cn(
                              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition',
                              state.wasHard
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600',
                            )}
                            title="קשה לי"
                          >
                            <Flame className="h-3 w-3" />
                            קשה
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleFlag(q.id, 'wasEasy')}
                            className={cn(
                              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition',
                              state.wasEasy
                                ? 'bg-sky-100 text-sky-700'
                                : 'bg-slate-100 text-slate-500 hover:bg-sky-50 hover:text-sky-600',
                            )}
                            title="קל לי"
                          >
                            <Zap className="h-3 w-3" />
                            קל
                          </button>
                          <Link
                            href={`/courses/${courseId}/questions/${q.id}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-950 hover:text-white"
                            title="פתח שאלה"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
