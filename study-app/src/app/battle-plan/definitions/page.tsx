'use client';

import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import MathText from '@/components/MathText';
import { battlePlanDefinitions, battlePlanTopicLabels } from '@/data/battle-plan-hebrew';
import { DefinitionStatus } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { BookOpenCheck, Search } from 'lucide-react';

const statusOptions: Array<{
  value: DefinitionStatus;
  label: string;
  className: string;
}> = [
  { value: 'know', label: 'יודעת מעולה', className: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
  { value: 'review', label: 'צריך חזרה', className: 'border-amber-300 bg-amber-50 text-amber-700' },
  { value: 'weak', label: 'על הפנים', className: 'border-red-300 bg-red-50 text-red-700' },
];

export default function BattlePlanDefinitionsPage() {
  const { state, snapshot, isHydrated, setDefinitionStatus } = useBattlePlanTracker();
  const [query, setQuery] = useState('');

  const filteredDefinitions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return battlePlanDefinitions;
    return battlePlanDefinitions.filter((item) =>
      [item.title, item.body, item.topicLabel, item.source].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="h-8 w-8 text-emerald-300" />
            <div>
              <h1 className="text-2xl font-extrabold">הגדרות הקורס</h1>
              <p className="mt-1 text-sm text-white/80">
                הדף הזה בנוי לפי סדר הנושאים בקורס, עם ניסוחים ללמידה ישירה ומעקב אישי על כל הגדרה.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.knowPct : 0}%</div>
              <div className="text-xs text-white/70">יודעת מעולה</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.reviewPct : 0}%</div>
              <div className="text-xs text-white/70">צריך חזרה</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.weakPct : 0}%</div>
              <div className="text-xs text-white/70">על הפנים</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="חפשי הגדרה, נושא או מקור"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white"
            />
          </label>
        </div>

        <div className="space-y-8">
          {battlePlanTopicLabels.map((topic) => {
            const items = filteredDefinitions.filter((item) => item.topicId === topic.id);
            if (items.length === 0) return null;

            return (
              <section key={topic.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">{topic.label}</h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item) => {
                    const selected = state.definitions[item.id] ?? 'weak';
                    return (
                      <article key={item.id} className="py-5 first:pt-5 last:pb-1">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                            <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-8 text-slate-800">
                              <MathText text={item.body} />
                            </div>
                            <div className="mt-3 text-xs text-slate-500">{item.source}</div>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
                            {statusOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => setDefinitionStatus(item.id, option.value)}
                                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                                  selected === option.value
                                    ? option.className
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
