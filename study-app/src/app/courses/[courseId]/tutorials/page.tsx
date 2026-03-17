'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { getCourseQuestions } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { cn } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

export default function TutorialsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const typedCourseId = courseId as CourseId;
  const allQuestions = getCourseQuestions(typedCourseId);
  const tutorialQuestions = allQuestions.filter((q) => q.sourceType === 'tutorial');
  const { getState } = useCourseQuestionSession(typedCourseId, allQuestions);

  // Group by sourceDocumentId, preserving order of first appearance
  const tutorialMap = new Map<string, { sourceName: string; count: number; solvedCount: number; weekId: string }>();
  for (const q of tutorialQuestions) {
    if (!tutorialMap.has(q.sourceDocumentId)) {
      tutorialMap.set(q.sourceDocumentId, { sourceName: q.sourceName, count: 0, solvedCount: 0, weekId: q.weekId });
    }
    const entry = tutorialMap.get(q.sourceDocumentId)!;
    entry.count++;
    const state = getState(q.id);
    if (state.status === 'solved' || state.solvedIndependently) entry.solvedCount++;
  }

  const tutorials = Array.from(tutorialMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ספריית שאלות</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">תרגולים</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          בחר תרגול כדי לצפות בכל השאלות שלו.
        </p>
      </section>

      {tutorials.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-slate-400">אין שאלות תרגול זמינות עדיין.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map(([docId, info]) => {
            const progress = info.count > 0 ? Math.round((info.solvedCount / info.count) * 100) : 0;
            const weekNum = info.weekId.match(/w(\d+)/)?.[1];
            return (
              <Link
                key={docId}
                href={`/courses/${courseId}/tutorials/${docId}`}
                className="group flex flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                    <FileQuestion className="h-5 w-5 text-emerald-700" />
                  </div>
                  {weekNum && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      שבוע {weekNum}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">{info.sourceName}</h3>
                <p className="mt-1 text-sm text-slate-500">{info.count} שאלות</p>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                    <span>{info.solvedCount} נפתרו</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn('h-full rounded-full transition-all', progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500')}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100">
                  כנס לתרגול
                  <ArrowLeft className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
