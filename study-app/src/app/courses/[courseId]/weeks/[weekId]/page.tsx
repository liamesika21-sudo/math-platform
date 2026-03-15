'use client';
import { useParams } from 'next/navigation';
import MetricCard from '@/components/platform/MetricCard';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import TheoryItemCard from '@/components/platform/TheoryItemCard';
import { getCourseQuestions, getQuestionsForWeek, getTheoryItemsForWeek, getTopicById, getWeekById } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { getQuestionMetrics } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

export default function WeekPage() {
  const params = useParams<{ courseId: string; weekId: string }>();
  const courseId = params.courseId as CourseId;
  const weekId = params.weekId;
  const week = getWeekById(courseId, weekId);
  const allQuestions = getCourseQuestions(courseId);
  const weekQuestions = getQuestionsForWeek(weekId);
  const lectureItems = getTheoryItemsForWeek(weekId);
  const { getState, filteredStates } = useCourseQuestionSession(courseId, allQuestions);

  const metrics = getQuestionMetrics(weekQuestions, filteredStates);
  const grouped = {
    tutorials: weekQuestions.filter((question) => question.sourceType === 'tutorial'),
    homework: weekQuestions.filter((question) => question.sourceType === 'homework'),
    exams: weekQuestions.filter((question) => question.sourceType === 'exam'),
  };

  if (!week) {
    return null;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">סביבת עבודה שבועית</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">{week.title}</h2>
            <p className="mt-3 text-sm leading-8 text-slate-600">{week.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {week.topicIds.map((topicId) => {
                const topic = getTopicById(topicId);
                return topic ? (
                  <span key={topicId} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {topic.title}
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="סה״כ שאלות" value={metrics.total} />
            <MetricCard label="נפתרו" value={metrics.solved} tone="success" />
            <MetricCard label="נותרו" value={metrics.remaining} tone="warning" />
            <MetricCard label="סומנו כקשות" value={metrics.difficult} tone="accent" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">חלק הרצאה</p>
            <h3 className="mt-1 text-2xl font-semibold text-slate-950">הגדרות, משפטים, נוסחאות ומושגים מרכזיים</h3>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {lectureItems.map((item) => (
            <TheoryItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">תרגולים</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">שאלות שהופיעו בדפי התרגול בלבד</h3>
        </div>
        <div className="grid gap-4">
          {grouped.tutorials.map((question) => (
            <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">שיעורי בית</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">תרגילי הבית הרשמיים בלבד</h3>
        </div>
        <div className="grid gap-4">
          {grouped.homework.map((question) => (
            <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">שאלות ממבחנים קודמים</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-950">חומר המבחן נשמר נפרד ומסומן בבירור</h3>
        </div>
        <div className="grid gap-4">
          {grouped.exams.map((question) => (
            <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">חזרה מהירה</p>
        <h3 className="mt-1 text-2xl font-semibold text-slate-950">מושגי חובה ובעיות ליבה לשבוע זה</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {week.reviewHighlights.map((item) => (
            <div key={item} className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-sm leading-7 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
