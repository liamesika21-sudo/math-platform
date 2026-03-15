'use client';

import Link from 'next/link';
import { ArrowUpRight, CircleDot, Flag, Sparkles } from 'lucide-react';
import type { PlatformQuestion, UserQuestionState } from '@/lib/math-platform/types';
import { cn, getDifficultyLabel, getSourceTypeLabel } from '@/lib/math-platform/utils';

interface QuestionPreviewCardProps {
  courseId: string;
  question: PlatformQuestion;
  state: UserQuestionState;
}

export default function QuestionPreviewCard({ courseId, question, state }: QuestionPreviewCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {getSourceTypeLabel(question.sourceType)}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {getDifficultyLabel(question.difficulty)}
        </span>
        {question.systemTags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              tag === 'Must Know' && 'bg-rose-100 text-rose-700',
              tag === 'Frequently Appears in Exams' && 'bg-amber-100 text-amber-700',
              tag === 'Core Problem' && 'bg-sky-100 text-sky-700',
              tag === 'Advanced Difficulty' && 'bg-violet-100 text-violet-700',
              tag === 'Important' && 'bg-emerald-100 text-emerald-700'
            )}
          >
            {tag === 'Must Know' ? 'חובה לדעת' :
             tag === 'Frequently Appears in Exams' ? 'נפוץ במבחן' :
             tag === 'Core Problem' ? 'בעיית ליבה' :
             tag === 'Advanced Difficulty' ? 'קושי מתקדם' :
             tag === 'Important' ? 'חשוב' : tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{question.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">{question.content}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
          {state.reviewLater ? <Flag className="h-4 w-4" /> : <CircleDot className="h-4 w-4" />}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <span>מקור: {question.sourceName}</span>
        <span>סטטוס: {state.solvedIndependently ? 'נפתר באופן עצמאי' : state.status === 'not_started' ? 'לא התחיל' : state.status === 'in_progress' ? 'בתהליך' : 'נפתר'}</span>
        {state.wasHard ? <span className="inline-flex items-center gap-1 text-rose-600"><Sparkles className="h-3.5 w-3.5" />סומן כקשה</span> : null}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {question.hint ? <span>רמז זמין</span> : null}
          {question.solution ? <span>פתרון מלא זמין</span> : null}
        </div>
        <Link
          href={`/courses/${courseId}/questions/${question.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          פתח שאלה
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
