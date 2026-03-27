'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Lightbulb, NotebookPen, Sigma, Sparkles } from 'lucide-react';
import QuestionStateControls from '@/components/platform/QuestionStateControls';
import { getCourseQuestions, getQuestionById, getTopicById, getWeekById } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { getDifficultyLabel, getSourceTypeLabel } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

const colorMap = {
  amber: {
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    content: 'text-amber-900',
    hoverBg: 'hover:bg-amber-100',
  },
  emerald: {
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    content: 'text-emerald-950',
    hoverBg: 'hover:bg-emerald-100',
  },
} as const;

function RevealBlock({ icon, label, labelClosed, colorScheme, content }: {
  icon: React.ReactNode;
  label: string;
  labelClosed: string;
  colorScheme: keyof typeof colorMap;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  const c = colorMap[colorScheme];

  return (
    <div className={`mt-6 rounded-[1.5rem] border ${c.border} ${c.bg} overflow-hidden`}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex w-full items-center justify-between p-5 ${c.hoverBg} transition-colors cursor-pointer`}
      >
        <div className={`flex items-center gap-2 ${c.text}`}>
          {icon}
          <p className="text-sm font-semibold uppercase tracking-[0.18em]">
            {open ? label : labelClosed}
          </p>
        </div>
        <div className={c.text}>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className={`text-sm leading-7 ${c.content}`}>{content}</p>
        </div>
      )}
    </div>
  );
}

export default function QuestionPage() {
  const params = useParams<{ courseId: string; questionId: string }>();
  const courseId = params.courseId as CourseId;
  const question = getQuestionById(courseId, params.questionId);
  const allQuestions = getCourseQuestions(courseId);
  const { getState, setNotes, setStatus, toggleFlag } = useCourseQuestionSession(courseId, allQuestions);

  if (!question) {
    return null;
  }

  const state = getState(question.id);
  const topic = getTopicById(question.topicId);
  const week = getWeekById(courseId, question.weekId);

  // Prev/next navigation for same sourceType + same week
  const siblings = allQuestions.filter(
    (q) => q.sourceType === question.sourceType && q.weekId === question.weekId
  );
  const currentIdx = siblings.findIndex((q) => q.id === question.id);
  const prevQuestion = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const nextQuestion = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Link href={`/courses/${courseId}`} className="transition hover:text-slate-950">
            לוח בקרה
          </Link>
          <span>/</span>
          {week ? (
            <>
              <Link href={`/courses/${courseId}/weeks/${week.id}`} className="transition hover:text-slate-950">
                {week.title}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="text-slate-950">{question.title}</span>
        </div>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {getSourceTypeLabel(question.sourceType)}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {getDifficultyLabel(question.difficulty)}
              </span>
              {question.systemTags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                  {tag === 'Must Know' ? 'חובה לדעת' :
                   tag === 'Frequently Appears in Exams' ? 'נפוץ במבחן' :
                   tag === 'Core Problem' ? 'בעיית ליבה' :
                   tag === 'Advanced Difficulty' ? 'קושי מתקדם' :
                   tag === 'Important' ? 'חשוב' : tag}
                </span>
              ))}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{question.title}</h1>
            <div className="mt-4 grid gap-3 text-sm text-slate-500 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">קורס</p>
                <p className="mt-2 font-medium text-slate-950">{courseId.replace('-', ' ')}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">שבוע</p>
                <p className="mt-2 font-medium text-slate-950">{week?.title ?? question.weekId}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">נושא</p>
                <p className="mt-2 font-medium text-slate-950">{topic?.title ?? question.topicId}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">מקור</p>
                <p className="mt-2 font-medium text-slate-950">{question.sourceName}</p>
              </div>
            </div>
          </div>

          <div className="min-w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 xl:min-w-[22rem]">
            <QuestionStateControls
              state={state}
              onStatusChange={(status) => setStatus(question.id, status)}
              onToggle={(flag) => toggleFlag(question.id, flag)}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">הצגת הבעיה</p>
          <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
            <p className="whitespace-pre-line text-base leading-8 text-slate-800">{question.content}</p>
            {question.imageUrl && (
              <div className="mt-5">
                <Image
                  src={question.imageUrl}
                  alt="טבלה לשאלה"
                  width={700}
                  height={350}
                  className="rounded-xl border border-slate-200 max-w-full"
                />
              </div>
            )}
          </div>

          {question.hint ? <RevealBlock
            icon={<Lightbulb className="h-4 w-4" />}
            label="רמז"
            labelClosed="לחץ לחשוף רמז"
            colorScheme="amber"
            content={question.hint}
          /> : null}

          {question.solution ? <RevealBlock
            icon={<Sigma className="h-4 w-4" />}
            label="פתרון מלא"
            labelClosed="לחץ לחשוף פתרון"
            colorScheme="emerald"
            content={question.solution}
          /> : null}
        </article>

        <aside className="space-y-5">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-slate-700" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">מעקב מקור</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">מקור מקורי</p>
                <p className="mt-2 font-medium text-slate-950">{question.sourceName}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">סוג מקור</p>
                <p className="mt-2 font-medium text-slate-950">{getSourceTypeLabel(question.sourceType)}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">נושא מקושר</p>
                <p className="mt-2 font-medium text-slate-950">{topic?.title ?? question.topicId}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex items-center gap-2">
              <NotebookPen className="h-4 w-4 text-slate-700" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">הערות אישיות</p>
            </div>
            <textarea
              value={state.notes}
              onChange={(event) => setNotes(question.id, event.target.value)}
              placeholder="הוסף תזכורת, תבנית שגיאה או צעד הבא."
              className="mt-4 min-h-40 w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
            />
          </div>
        </aside>
      </section>

      <section className="flex items-center justify-between gap-4">
        <Link
          href={`/courses/${courseId}/weeks/${question.weekId}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          חזרה לשבוע
        </Link>

        {siblings.length > 1 && (
          <div className="flex items-center gap-2">
            {prevQuestion ? (
              <Link
                href={`/courses/${courseId}/questions/${prevQuestion.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                <ChevronRight className="h-4 w-4" />
                שאלה קודמת
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 px-4 py-2 text-sm font-medium text-slate-300">
                <ChevronRight className="h-4 w-4" />
                שאלה קודמת
              </span>
            )}
            <span className="text-xs text-slate-400">{currentIdx + 1}/{siblings.length}</span>
            {nextQuestion ? (
              <Link
                href={`/courses/${courseId}/questions/${nextQuestion.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                שאלה הבאה
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 px-4 py-2 text-sm font-medium text-slate-300">
                שאלה הבאה
                <ChevronLeft className="h-4 w-4" />
              </span>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
