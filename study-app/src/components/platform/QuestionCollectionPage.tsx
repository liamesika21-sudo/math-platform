'use client';

import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import MetricCard from '@/components/platform/MetricCard';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { getQuestionMetrics } from '@/lib/math-platform/utils';
import type { CourseId, PlatformQuestion } from '@/lib/math-platform/types';

interface QuestionCollectionPageProps {
  courseId: CourseId;
  title: string;
  description: string;
  questions: PlatformQuestion[];
  allCourseQuestions: PlatformQuestion[];
}

export default function QuestionCollectionPage({
  courseId,
  title,
  description,
  questions,
  allCourseQuestions,
}: QuestionCollectionPageProps) {
  const { getState, filteredStates } = useCourseQuestionSession(courseId, allCourseQuestions);
  const metrics = getQuestionMetrics(questions, filteredStates);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ספריית שאלות</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="שאלות" value={metrics.total} />
        <MetricCard label="נפתרו" value={metrics.solved} tone="success" />
        <MetricCard label="נותרו" value={metrics.remaining} tone="warning" />
        <MetricCard label="סומנו כקשות" value={metrics.difficult} tone="accent" />
      </section>

      <section className="grid gap-4">
        {questions.map((question) => (
          <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
        ))}
      </section>
    </div>
  );
}
