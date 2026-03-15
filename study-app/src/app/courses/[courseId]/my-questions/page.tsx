'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import MetricCard from '@/components/platform/MetricCard';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import { getCourseQuestions } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import type { CourseId, PlatformQuestion } from '@/lib/math-platform/types';

type TabId = 'review_later' | 'difficult' | 'unsolved' | 'must_know' | 'exam_frequent';

export default function MyQuestionsPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const allQuestions = getCourseQuestions(courseId);
  const { getState } = useCourseQuestionSession(courseId, allQuestions);
  const [tab, setTab] = useState<TabId>('review_later');

  const difficult = allQuestions.filter((question) => getState(question.id).wasHard);
  const reviewLater = allQuestions.filter((question) => getState(question.id).reviewLater);
  const unsolved = allQuestions.filter((question) => {
    const state = getState(question.id);
    return state.status !== 'solved' && !state.solvedIndependently;
  });
  const mustKnow = allQuestions.filter((question) => question.systemTags.includes('Must Know'));
  const examFrequent = allQuestions.filter((question) => question.isExamFrequent);

  const tabItems = {
    review_later: reviewLater,
    difficult,
    unsolved,
    must_know: mustKnow,
    exam_frequent: examFrequent,
  } satisfies Record<TabId, PlatformQuestion[]>;

  const tabConfig: Array<{ id: TabId; label: string }> = [
    { id: 'review_later', label: 'לחזרה מאוחרת' },
    { id: 'difficult', label: 'סומנו כקשות' },
    { id: 'unsolved', label: 'שאלות לא פתורות' },
    { id: 'must_know', label: 'חובה לדעת' },
    { id: 'exam_frequent', label: 'נפוץ במבחן' },
  ];

  const currentQuestions = tabItems[tab];

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">השאלות שלי</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">סביבת החזרה האישית שלך</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          דף זה משלב את הסימונים שלך עם עדיפויות מוגדרות-מערכת, כך שתוכל לחזור על נושאים חלשים, עבודה לא גמורה וחומר נפוץ במבחן — ללא חיפוש ידני.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="לחזרה מאוחרת" value={tabItems.review_later.length} tone="warning" />
        <MetricCard label="סומנו כקשות" value={tabItems.difficult.length} tone="accent" />
        <MetricCard label="לא פתורות" value={tabItems.unsolved.length} />
        <MetricCard label="חובה + נפוץ במבחן" value={tabItems.must_know.length + tabItems.exam_frequent.length} tone="success" />
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-wrap gap-2">
          {tabConfig.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.id ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
            ))
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
              אין שאלות בלשונית זו לסשן הנוכחי.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
