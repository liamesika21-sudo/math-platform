'use client';

import { useState } from 'react';
import { BookMarked, BrainCircuit, Sigma, ScrollText } from 'lucide-react';
import QuestionPreviewCard from '@/components/platform/QuestionPreviewCard';
import TheoryItemCard from '@/components/platform/TheoryItemCard';
import { useParams } from 'next/navigation';
import { getCourseQuestions, getCourseTopics, getQuestionsForTopic, getTheoryItemsForTopic } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import type { CourseId, TheoryKind } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';

type FilterKind = TheoryKind | 'all';

const kindFilters: { value: FilterKind; label: string; Icon: React.ComponentType<{ className?: string }> | null }[] = [
  { value: 'all',        label: 'הכל',     Icon: null },
  { value: 'definition', label: 'הגדרות',  Icon: BookMarked },
  { value: 'theorem',    label: 'משפטים',  Icon: ScrollText },
  { value: 'formula',    label: 'נוסחאות', Icon: Sigma },
  { value: 'concept',    label: 'מושגים',  Icon: BrainCircuit },
];

const activeStyle: Record<FilterKind, string> = {
  all:        'bg-slate-900 text-white',
  definition: 'bg-sky-600 text-white',
  theorem:    'bg-rose-600 text-white',
  formula:    'bg-amber-500 text-white',
  concept:    'bg-emerald-600 text-white',
};

export default function TopicsPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;
  const topics = getCourseTopics(courseId);
  const allQuestions = getCourseQuestions(courseId);
  const { getState } = useCourseQuestionSession(courseId, allQuestions);

  const [activeKind, setActiveKind] = useState<FilterKind>('all');

  const allTheory = topics.flatMap((t) => getTheoryItemsForTopic(courseId, t.id));
  const counts: Record<FilterKind, number> = {
    all:        allTheory.length,
    definition: allTheory.filter((i) => i.kind === 'definition').length,
    theorem:    allTheory.filter((i) => i.kind === 'theorem').length,
    formula:    allTheory.filter((i) => i.kind === 'formula').length,
    concept:    allTheory.filter((i) => i.kind === 'concept').length,
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">מפת נושאים</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">תבניות, תיאוריה ושאלות קשורות לפי נושא</h2>

        <div className="mt-5 flex flex-wrap gap-2" dir="rtl">
          {kindFilters.map(({ value, label, Icon }) => {
            const isActive = activeKind === value;
            return (
              <button
                key={value}
                onClick={() => setActiveKind(value)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150',
                  isActive
                    ? activeStyle[value]
                    : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
                )}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
                <span className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs font-bold',
                  isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500',
                )}>
                  {counts[value]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {topics.map((topic) => {
        const theory = getTheoryItemsForTopic(courseId, topic.id);
        const filtered = activeKind === 'all' ? theory : theory.filter((i) => i.kind === activeKind);
        const topicQuestions = getQuestionsForTopic(courseId, topic.id);

        if (activeKind !== 'all' && filtered.length === 0) return null;

        return (
          <section key={topic.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">נושא</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-950">{topic.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{topic.summary}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4">
                <p className="text-sm text-slate-500">תבניות פתרון</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.patterns.map((pattern) => (
                    <span key={pattern} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length > 0 && (
              <div className="mt-6 grid gap-4 xl:grid-cols-3">
                {filtered.map((item) => (
                  <TheoryItemCard key={item.id} item={item} />
                ))}
              </div>
            )}

            {activeKind === 'all' && topicQuestions.length > 0 && (
              <div className="mt-6 grid gap-4">
                {topicQuestions.map((question) => (
                  <QuestionPreviewCard key={question.id} courseId={courseId} question={question} state={getState(question.id)} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
