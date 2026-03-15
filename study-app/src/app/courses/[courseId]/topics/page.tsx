'use client';

import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import TheoryItemCard from '@/components/platform/TheoryItemCard';
import { useParams } from 'next/navigation';
import { getCourseQuestions, getCourseTopics, getQuestionsForTopic, getTheoryItemsForTopic } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import type { CourseId } from '@/lib/math-platform/types';

export default function TopicsPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const topics = getCourseTopics(courseId);
  const allQuestions = getCourseQuestions(courseId);
  const { getState } = useCourseQuestionSession(courseId, allQuestions);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">מפת נושאים</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">תבניות, תיאוריה ושאלות קשורות לפי נושא</h2>
      </section>

      {topics.map((topic) => {
        const theory = getTheoryItemsForTopic(courseId, topic.id);
        const topicQuestions = getQuestionsForTopic(courseId, topic.id);

        return (
          <section key={topic.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">נושא</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-950">{topic.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{topic.summary}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4">
                <p className="text-sm text-slate-500">תבניות פתרון</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.patterns.map((pattern) => (
                    <span key={pattern} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {theory.map((item) => (
                <TheoryItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              {topicQuestions.map((question) => (
                <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
