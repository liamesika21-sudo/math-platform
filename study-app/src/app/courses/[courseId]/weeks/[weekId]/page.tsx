'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { BookOpen, ClipboardList, GraduationCap, FileCheck2 } from 'lucide-react';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import TheoryItemCard from '@/components/platform/TheoryItemCard';
import {
  getCourseQuestions,
  getQuestionsForWeek,
  getTheoryItemsForWeek,
  getTopicById,
  getWeekById,
} from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import type { CourseId, PlatformQuestion, TheoryKind, UserQuestionState } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';

type LectureFilter = 'all' | TheoryKind;

const FILTERS: { key: LectureFilter; label: string }[] = [
  { key: 'all',        label: 'הכל'      },
  { key: 'definition', label: 'הגדרות'   },
  { key: 'theorem',    label: 'משפטים'   },
  { key: 'formula',    label: 'נוסחאות'  },
  { key: 'concept',    label: 'מושגים'   },
];

export default function WeekPage() {
  const params  = useParams<{ courseId: string; weekId: string }>();
  const courseId = params.courseId as CourseId;
  const weekId   = params.weekId;

  const [lectureFilter, setLectureFilter] = useState<LectureFilter>('all');

  const week         = getWeekById(courseId, weekId);
  const allQuestions = getCourseQuestions(courseId);
  const weekQuestions = getQuestionsForWeek(weekId);
  const lectureItems  = getTheoryItemsForWeek(weekId);
  const { getState }  = useCourseQuestionSession(courseId, allQuestions);

  if (!week) return null;

  const grouped = {
    tutorials: weekQuestions.filter((q) => q.sourceType === 'tutorial'),
    homework:  weekQuestions.filter((q) => q.sourceType === 'homework'),
    exams:     weekQuestions.filter((q) => q.sourceType === 'exam'),
  };

  const counts: Record<LectureFilter, number> = {
    all:        lectureItems.length,
    definition: lectureItems.filter((i) => i.kind === 'definition').length,
    theorem:    lectureItems.filter((i) => i.kind === 'theorem').length,
    formula:    lectureItems.filter((i) => i.kind === 'formula').length,
    concept:    lectureItems.filter((i) => i.kind === 'concept').length,
  };

  const visibleItems =
    lectureFilter === 'all'
      ? lectureItems
      : lectureItems.filter((i) => i.kind === lectureFilter);

  return (
    <div className="space-y-12">

      {/* ── Week header ─────────────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          שבוע {week.number}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">{week.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{week.summary}</p>

        {/* Topic chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {week.topicIds.map((tid) => {
            const topic = getTopicById(tid);
            return topic ? (
              <span
                key={tid}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
              >
                {topic.title}
              </span>
            ) : null;
          })}
        </div>

        {/* Key highlights */}
        {week.reviewHighlights.length > 0 && (
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {week.reviewHighlights.map((hl, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-200 text-[10px] font-bold text-indigo-700">
                  {i + 1}
                </span>
                <p dir="auto" className="text-xs leading-5 text-indigo-900">{hl}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Lecture ─────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        {/* Section header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">חלק הרצאה</p>
            </div>
            <h2 className="mt-0.5 text-xl font-bold text-slate-900">
              הגדרות, משפטים, נוסחאות ומושגים מרכזיים
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map(({ key, label }) => {
              const count  = counts[key];
              const active = lectureFilter === key;
              if (key !== 'all' && count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setLectureFilter(key)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition',
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700',
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                      active ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {visibleItems.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <TheoryItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptySection message="אין פריטים בקטגוריה זו לשבוע זה" />
        )}
      </section>

      {/* ── Tutorials ───────────────────────────────────────────────────── */}
      <QuestionSection
        iconEl={<ClipboardList className="h-4 w-4 text-emerald-500" />}
        label="תרגולים"
        title="שאלות מדפי התרגול"
        questions={grouped.tutorials}
        courseId={courseId}
        getState={getState}
        emptyMessage="טרם נוספו שאלות תרגול לשבוע זה"
      />

      {/* ── Homework ────────────────────────────────────────────────────── */}
      <QuestionSection
        iconEl={<GraduationCap className="h-4 w-4 text-amber-500" />}
        label="שיעורי בית"
        title="תרגילי הבית הרשמיים"
        questions={grouped.homework}
        courseId={courseId}
        getState={getState}
        emptyMessage="טרם נוספו תרגילי בית לשבוע זה"
      />

      {/* ── Exams ───────────────────────────────────────────────────────── */}
      <QuestionSection
        iconEl={<FileCheck2 className="h-4 w-4 text-rose-500" />}
        label="שאלות ממבחנים קודמים"
        title="חומר מבחן — נשמר ומסומן בנפרד"
        questions={grouped.exams}
        courseId={courseId}
        getState={getState}
        emptyMessage="טרם נוספו שאלות מבחן לשבוע זה"
        headerExtra={
          <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
            מבחן
          </span>
        }
      />
    </div>
  );
}

// ── Shared sub-components ────────────────────────────────────────────────────

function EmptySection({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-10">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

interface QuestionSectionProps {
  iconEl: React.ReactNode;
  label: string;
  title: string;
  questions: PlatformQuestion[];
  courseId: CourseId;
  getState: (id: string) => UserQuestionState;
  emptyMessage: string;
  headerExtra?: React.ReactNode;
}

function QuestionSection({
  iconEl, label, title, questions, courseId, getState, emptyMessage, headerExtra,
}: QuestionSectionProps) {
  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          {iconEl}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
          {headerExtra}
        </div>
        <h2 className="mt-0.5 text-xl font-bold text-slate-900">{title}</h2>
      </div>

      {questions.length > 0 ? (
        <div className="grid gap-4">
          {questions.map((q) => (
            <QuestionPreviewCard
              key={q.id}
              courseId={courseId}
              question={q}
              state={getState(q.id)}
            />
          ))}
        </div>
      ) : (
        <EmptySection message={emptyMessage} />
      )}
    </section>
  );
}
