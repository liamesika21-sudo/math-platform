'use client';

import { useState, useMemo } from 'react';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import MetricCard from '@/components/platform/MetricCard';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { cn, getQuestionMetrics } from '@/lib/math-platform/utils';
import type { CourseId, PlatformQuestion } from '@/lib/math-platform/types';

interface QuestionCollectionPageProps {
  courseId: CourseId;
  title: string;
  description: string;
  questions: PlatformQuestion[];
  allCourseQuestions: PlatformQuestion[];
}

function weekNum(weekId: string) {
  return parseInt(weekId.split('-week-')[1] ?? '0', 10);
}

export default function QuestionCollectionPage({
  courseId,
  title,
  description,
  questions,
  allCourseQuestions,
}: QuestionCollectionPageProps) {
  const { getState, filteredStates } = useCourseQuestionSession(courseId, allCourseQuestions);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const weekNumbers = useMemo(() => {
    const nums = [...new Set(questions.map((q) => weekNum(q.weekId)))];
    return nums.sort((a, b) => a - b);
  }, [questions]);

  const displayedQuestions = useMemo(() => {
    const sorted = [...questions].sort((a, b) => weekNum(a.weekId) - weekNum(b.weekId));
    if (selectedWeek === null) return sorted;
    return sorted.filter((q) => weekNum(q.weekId) === selectedWeek);
  }, [questions, selectedWeek]);

  const metrics = getQuestionMetrics(displayedQuestions, filteredStates);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ספריית שאלות</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedWeek(null)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition',
              selectedWeek === null
                ? 'bg-slate-950 text-white!'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            הכל
          </button>
          {weekNumbers.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setSelectedWeek(selectedWeek === num ? null : num)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition',
                selectedWeek === num
                  ? 'bg-slate-950 text-white!'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              שבוע {num}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="שאלות" value={metrics.total} />
        <MetricCard label="נפתרו" value={metrics.solved} tone="success" />
        <MetricCard label="נותרו" value={metrics.remaining} tone="warning" />
        <MetricCard label="סומנו כקשות" value={metrics.difficult} tone="accent" />
      </section>

      <section className="grid gap-4">
        {displayedQuestions.map((question) => (
          <QuestionPreviewCard
            key={question.id}
            courseId={courseId}
            question={question}
            state={getState(question.id)}
          />
        ))}
      </section>
    </div>
  );
}
