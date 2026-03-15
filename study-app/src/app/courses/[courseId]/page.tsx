'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, BookOpenText, Files, Flag, Layers3, NotebookTabs } from 'lucide-react';
import MetricCard from '@/components/platform/MetricCard';
import { getCourseQuestions, getCourseSources, getCourseTheoryItems, getCourseTopics, getCourseWeeks } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { getQuestionMetrics, getWeekCompletion } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

export default function CourseDashboardPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const weeks = getCourseWeeks(courseId);
  const theory = getCourseTheoryItems(courseId);
  const questions = getCourseQuestions(courseId);
  const topics = getCourseTopics(courseId);
  const sources = getCourseSources(courseId);
  const { filteredStates } = useCourseQuestionSession(courseId, questions);
  const metrics = getQuestionMetrics(questions, filteredStates);
  const reviewLaterCount = filteredStates.filter((state) => state.reviewLater).length;
  const solvedIndependentlyCount = filteredStates.filter((state) => state.solvedIndependently).length;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="שאלות בקורס" value={metrics.total} tone="accent" helper="מופרדות לתרגולים, שיעורי בית ומבחנים" />
        <MetricCard label="נפתרו" value={metrics.solved} tone="success" helper={`${solvedIndependentlyCount} נפתרו באופן עצמאי`} />
        <MetricCard label="נותרו" value={metrics.remaining} tone="warning" helper={`${metrics.difficult} סומנו כקשות`} />
        <MetricCard label="לחזרה מאוחרת" value={reviewLaterCount} helper={`${sources.length} מסמכי מקור עוקבים`} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">לוח הקורס</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">התקדמות לפי שבוע</h2>
            </div>
            <Link
              href={`/courses/${courseId}/weekly-study`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              לימוד שבועי
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {weeks.map((week) => {
              const completion = getWeekCompletion(week, filteredStates);
              return (
                <article key={week.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="text-lg font-semibold text-slate-950">{week.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{week.summary}</p>
                    </div>
                    <div className="min-w-56">
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>השלמה</span>
                        <span>{completion}%</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-slate-950 transition-all" style={{ width: `${completion}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {week.reviewHighlights.map((highlight) => (
                      <span key={highlight} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/courses/${courseId}/weeks/${week.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-300 transition hover:ring-slate-950"
                    >
                      פתח שבוע
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <h2 className="text-xl font-semibold text-slate-950">מבנה הקורס</h2>
            <div className="mt-5 grid gap-3">
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-slate-50 p-4">
                <Layers3 className="h-5 w-5 text-sky-600" />
                <div>
                  <p className="font-medium text-slate-950">{weeks.length} יחידות שבועיות</p>
                  <p className="text-sm text-slate-600">כל שבוע הוא ממשק הלימוד המרכזי.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-slate-50 p-4">
                <BookOpenText className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-slate-950">{theory.length} פריטי תיאוריה</p>
                  <p className="text-sm text-slate-600">הגדרות, משפטים, נוסחאות ומושגים — נפרדים מהשאלות.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-slate-50 p-4">
                <NotebookTabs className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-slate-950">{topics.length} נושאי ליבה</p>
                  <p className="text-sm text-slate-600">תבניות ומקורות מקובצים לפי נושא.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] bg-slate-50 p-4">
                <Files className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="font-medium text-slate-950">{sources.length} מסמכי מקור</p>
                  <p className="text-sm text-slate-600">כל שאלה שומרת הפניה למסמך המקורי שלה.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex items-center gap-3">
              <Flag className="h-5 w-5 text-slate-700" />
              <h2 className="text-xl font-semibold text-slate-950">תור לחזרה</h2>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">סומנו כקשות</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{metrics.difficult}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">לחזרה מאוחרת</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{reviewLaterCount}</p>
              </div>
            </div>
            <Link
              href={`/courses/${courseId}/my-questions`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium !text-white transition hover:bg-slate-800"
            >
              פתח את השאלות שלי
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </section>
    </div>
  );
}
