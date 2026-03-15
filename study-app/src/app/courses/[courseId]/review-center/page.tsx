'use client';

import { useParams } from 'next/navigation';
import MetricCard from '@/components/platform/MetricCard';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import TheoryItemCard from '@/components/platform/TheoryItemCard';
import { getCourseQuestions, getCourseTheoryItems } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import type { CourseId } from '@/lib/math-platform/types';

export default function ReviewCenterPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const questions = getCourseQuestions(courseId);
  const theory = getCourseTheoryItems(courseId);
  const mustKnowQuestions = questions.filter((question) => question.systemTags.includes('Must Know'));
  const examFrequentQuestions = questions.filter((question) => question.isExamFrequent);
  const coreProblems = questions.filter((question) => question.systemTags.includes('Core Problem'));
  const theoryHighlights = theory.filter((item) => item.kind === 'theorem' || item.kind === 'formula').slice(0, 6);
  const { getState } = useCourseQuestionSession(courseId, questions);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">מרכז חזרה</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">חומר עדיפות גבוהה לחזרה ולהכנה למבחן</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          דף זה מיועד לחזרה ממוקדת: תיאוריה שחובה לדעת, שאלות נפוצות במבחן, ובעיות ליבה שכדאי לשמור חמות לאורך כל הקורס.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="שאלות חובה לדעת" value={mustKnowQuestions.length} tone="accent" />
        <MetricCard label="נפוצות במבחן" value={examFrequentQuestions.length} tone="warning" />
        <MetricCard label="בעיות ליבה" value={coreProblems.length} tone="success" />
        <MetricCard label="תיאוריה מרכזית" value={theoryHighlights.length} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">מושגי חובה</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">תיאוריה שמעגנת את הקורס</h3>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {theoryHighlights.map((item) => (
            <TheoryItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">שאלות נפוצות במבחן</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">תבניות בחינה בתדירות גבוהה</h3>
        </div>
        <div className="grid gap-4">
          {examFrequentQuestions.map((question) => (
            <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">בעיות ליבה</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">שאלות שכדאי לחזור עליהן עד שהתהליך הופך לאוטומטי</h3>
        </div>
        <div className="grid gap-4">
          {coreProblems.map((question) => (
            <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}
