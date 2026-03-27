'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import { getCourseQuestions, getCourseWeeks } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { cn } from '@/lib/math-platform/utils';
import type { CourseId, PlatformQuestion } from '@/lib/math-platform/types';

function weekNum(weekId: string) {
  const m = weekId.match(/\d+$/);
  return m ? parseInt(m[0], 10) : 0;
}

interface Assignment {
  weekId: string;
  weekNumber: number;
  weekTitle: string;
  questions: PlatformQuestion[];
}

export default function HomeworkPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const allQuestions = getCourseQuestions(courseId);
  const homeworkQuestions = allQuestions.filter((q) => q.sourceType === 'homework');
  const weeks = getCourseWeeks(courseId);
  const { getState } = useCourseQuestionSession(courseId, allQuestions);

  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

  const assignments = useMemo<Assignment[]>(() => {
    const byWeek = new Map<string, PlatformQuestion[]>();
    for (const q of homeworkQuestions) {
      const list = byWeek.get(q.weekId) ?? [];
      list.push(q);
      byWeek.set(q.weekId, list);
    }
    return [...byWeek.entries()]
      .map(([weekId, questions]) => {
        const week = weeks.find((w) => w.id === weekId);
        return {
          weekId,
          weekNumber: weekNum(weekId),
          weekTitle: week?.title ?? weekId,
          questions,
        };
      })
      .sort((a, b) => a.weekNumber - b.weekNumber);
  }, [homeworkQuestions, weeks]);

  // Assignment selection view
  if (selectedAssignment === null) {
    return (
      <div className="space-y-8">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">שיעורי בית</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">בחרו מטלה</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            בחרו את המטלה שתרצו לעבוד עליה. כל מטלה מכילה את כל השאלות מהתרגיל הרשמי עם רמזים ניתנים לחשיפה.
          </p>
        </section>

        {assignments.length === 0 ? (
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center shadow-sm shadow-slate-200/60">
            <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-4 text-sm text-slate-500">אין מטלות שיעורי בית עדיין.</p>
          </section>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assignments.map((a, idx) => {
              const solved = a.questions.filter((q) => getState(q.id).status === 'solved').length;
              const total = a.questions.length;
              const progress = total > 0 ? Math.round((solved / total) * 100) : 0;

              return (
                <button
                  key={a.weekId}
                  type="button"
                  onClick={() => setSelectedAssignment(idx)}
                  className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 text-right shadow-sm shadow-slate-200/60 transition hover:border-slate-400 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      שבוע {a.weekNumber}
                    </span>
                    {progress === 100 && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950 group-hover:text-slate-700">
                    מטלה {idx + 1}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">{a.weekTitle}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{total} שאלות</span>
                      <span>{solved}/{total} נפתרו</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </section>
        )}
      </div>
    );
  }

  const currentAssignment = assignments[selectedAssignment];

  // Questions view for selected assignment
  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <button
          type="button"
          onClick={() => setSelectedAssignment(null)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          חזרה לכל המטלות
        </button>

        <h2 className="mt-4 text-2xl font-semibold text-slate-950">
          מטלה {selectedAssignment + 1} — שבוע {currentAssignment.weekNumber}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{currentAssignment.weekTitle}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <span>{currentAssignment.questions.length} שאלות</span>
          <span>•</span>
          <span>
            {currentAssignment.questions.filter((q) => getState(q.id).status === 'solved').length} נפתרו
          </span>
        </div>

        {/* Assignment navigation */}
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            disabled={selectedAssignment === 0}
            onClick={() => setSelectedAssignment(selectedAssignment - 1)}
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer',
              selectedAssignment === 0
                ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                : 'border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'
            )}
          >
            <ChevronRight className="h-3 w-3" />
            מטלה קודמת
          </button>
          <button
            type="button"
            disabled={selectedAssignment === assignments.length - 1}
            onClick={() => setSelectedAssignment(selectedAssignment + 1)}
            className={cn(
              'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer',
              selectedAssignment === assignments.length - 1
                ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                : 'border-slate-300 text-slate-700 hover:border-slate-950 hover:text-slate-950'
            )}
          >
            מטלה הבאה
            <ChevronLeft className="h-3 w-3" />
          </button>
        </div>
      </section>

      <section className="grid gap-4">
        {currentAssignment.questions.map((question, idx) => (
          <div key={question.id} className="relative">
            <div className="absolute top-4 right-4 z-10 rounded-full bg-slate-950 px-2.5 py-0.5 text-xs font-bold text-white">
              {idx + 1}
            </div>
            <QuestionPreviewCard
              courseId={courseId}
              question={question}
              state={getState(question.id)}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
