'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight, BookOpenText, CheckCircle2, FileQuestion, GraduationCap } from 'lucide-react';
import MetricCard from '@/components/platform/MetricCard';
import { getCourseQuestions, getCourseWeeks } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { getQuestionMetrics, getWeekCompletion } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

export default function WeeklyStudyPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const courseQuestions = getCourseQuestions(courseId);
  const courseWeeks = getCourseWeeks(courseId);
  const { filteredStates } = useCourseQuestionSession(courseId, courseQuestions);
  const metrics = getQuestionMetrics(courseQuestions, filteredStates);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="יחידות שבועיות" value={courseWeeks.length} helper="נווט לפי התקדמות הקורס" />
        <MetricCard label="נפתרו בסשן הנוכחי" value={metrics.solved} tone="success" helper="תרגולים, שיעורי בית ומבחנים" />
        <MetricCard label="שאלות שנותרו" value={metrics.remaining} tone="warning" />
        <MetricCard label="סומנו כקשות" value={metrics.difficult} tone="accent" />
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">לימוד שבועי</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">בחר שבוע וכנס לממשק הלימוד המלא</h2>
        <div className="mt-6 grid gap-4">
          {courseWeeks.map((week) => {
            const totalQuestions =
              week.tutorialQuestionIds.length + week.homeworkQuestionIds.length + week.examQuestionIds.length;
            const completion = getWeekCompletion(week, filteredStates);

            return (
              <article key={week.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">שבוע {week.number}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{week.title.replace(/^Week \d+ · /, '')}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{week.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {week.reviewHighlights.map((item) => (
                        <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-4 xl:min-w-[27rem]">
                    <div className="rounded-[1.25rem] bg-white p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <BookOpenText className="h-4 w-4 text-sky-600" />
                        תיאוריה
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{week.lectureItemIds.length}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FileQuestion className="h-4 w-4 text-amber-600" />
                        תרגולים
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{week.tutorialQuestionIds.length}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        שיעורי בית
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{week.homeworkQuestionIds.length}</p>
                    </div>
                    <div className="rounded-[1.25rem] bg-white p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <GraduationCap className="h-4 w-4 text-rose-600" />
                        מבחנים
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-slate-950">{week.examQuestionIds.length}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>השלמה</span>
                      <span>{completion}% מתוך {totalQuestions} שאלות</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-slate-950" style={{ width: `${completion}%` }} />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${courseId}/weeks/${week.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium !text-white transition hover:bg-slate-800"
                  >
                    פתח סביבת עבודה שבועית
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
