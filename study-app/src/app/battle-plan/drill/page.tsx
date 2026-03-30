'use client';

import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { drillQuestionItems, DrillDifficulty } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { FileQuestion, Search, Target } from 'lucide-react';

const difficultyOptions: Array<{ value: DrillDifficulty; label: string; className: string }> = [
  { value: 'easy', label: 'Easy', className: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
  { value: 'medium', label: 'Medium', className: 'border-amber-300 bg-amber-50 text-amber-700' },
  { value: 'hard', label: 'Hard', className: 'border-red-300 bg-red-50 text-red-700' },
];

export default function BattlePlanDrillPage() {
  const { state, snapshot, isHydrated, setDrillDifficulty, setDrillSolved } = useBattlePlanTracker();
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'homework' | 'exam' | 'recitation'>('all');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return drillQuestionItems.filter((item) => {
      const matchesSource = sourceFilter === 'all' || item.sourceType === sourceFilter;
      const matchesQuery =
        normalized.length === 0 ||
        item.title.toLowerCase().includes(normalized) ||
        item.prompt.toLowerCase().includes(normalized) ||
        item.source.toLowerCase().includes(normalized) ||
        item.topicHe.toLowerCase().includes(normalized);
      return matchesSource && matchesQuery;
    });
  }, [query, sourceFilter]);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-violet-600 via-indigo-600 to-blue-500 p-6 text-white shadow-lg">
          <div className="mb-3 flex items-center gap-3">
            <FileQuestion className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-extrabold">Full Question Drill</h1>
              <p className="mt-1 text-sm text-white/85">All relevant questions, no solutions, live solved tracking and difficulty tagging.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.drill.completionPct : 0}%</div>
              <div className="text-xs text-white/80">Solved</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.drill.easy : 0}</div>
              <div className="text-xs text-white/80">Easy-tagged</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.drill.medium : 0}</div>
              <div className="text-xs text-white/80">Medium-tagged</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.drill.hard : 0}</div>
              <div className="text-xs text-white/80">Hard-tagged</div>
            </div>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
            <label className="relative block">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by prompt, source, topic, or keyword"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
              />
            </label>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as 'all' | 'homework' | 'exam' | 'recitation')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white"
            >
              <option value="all">All sources</option>
              <option value="homework">Homework</option>
              <option value="exam">Exams</option>
              <option value="recitation">Recitations</option>
            </select>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const entry = state.drill[item.id] ?? { solved: false, difficulty: 'medium' as DrillDifficulty };
            const sourceStyle =
              item.sourceType === 'exam'
                ? 'bg-red-50 text-red-700'
                : item.sourceType === 'homework'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-sky-50 text-sky-700';

            return (
              <article key={item.id} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${sourceStyle}`}>
                      {item.sourceType}
                    </div>
                    <h2 className="text-base font-bold text-slate-900">{item.title}</h2>
                  </div>
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={entry.solved}
                      onChange={(event) => setDrillSolved(item.id, event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Solved
                  </label>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-sm leading-7 text-slate-700">{item.prompt}</div>
                <div className="mt-3 text-xs text-slate-500">
                  {item.source} • {item.topicHe}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDrillDifficulty(item.id, option.value)}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                        entry.difficulty === option.value
                          ? option.className
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            <Target className="mx-auto mb-3 h-6 w-6 text-slate-400" />
            No questions match the current filter.
          </div>
        )}
      </div>
    </Layout>
  );
}
