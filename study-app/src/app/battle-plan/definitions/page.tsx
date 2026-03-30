'use client';

import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { definitionTrackerItems, DefinitionStatus } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { BookOpenCheck, Search, Target } from 'lucide-react';

const statusOptions: Array<{
  value: DefinitionStatus;
  label: string;
  shortLabel: string;
  className: string;
}> = [
  {
    value: 'know',
    label: 'Know perfectly',
    shortLabel: '✅',
    className: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  },
  {
    value: 'review',
    label: 'Needs review',
    shortLabel: '🟡',
    className: 'border-amber-300 bg-amber-50 text-amber-700',
  },
  {
    value: 'weak',
    label: 'Don’t know',
    shortLabel: '❌',
    className: 'border-red-300 bg-red-50 text-red-700',
  },
];

export default function BattlePlanDefinitionsPage() {
  const { state, snapshot, isHydrated, setDefinitionStatus } = useBattlePlanTracker();
  const [query, setQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  const topics = useMemo(
    () => Array.from(new Set(definitionTrackerItems.map((item) => item.topicHe))).sort((a, b) => a.localeCompare(b, 'he')),
    []
  );

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return definitionTrackerItems.filter((item) => {
      const matchesTopic = topicFilter === 'all' || item.topicHe === topicFilter;
      const matchesQuery =
        normalized.length === 0 ||
        item.title.toLowerCase().includes(normalized) ||
        item.content.toLowerCase().includes(normalized) ||
        item.source.toLowerCase().includes(normalized);
      return matchesTopic && matchesQuery;
    });
  }, [query, topicFilter]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-indigo-600 via-sky-600 to-cyan-500 p-6 text-white shadow-lg">
          <div className="mb-3 flex items-center gap-3">
            <BookOpenCheck className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-extrabold">Definitions Tracker</h1>
              <p className="mt-1 text-sm text-white/85">Track every formal definition in the course and keep the weak ones visible.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.knowPct : 0}%</div>
              <div className="text-xs text-white/80">Known perfectly</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.reviewPct : 0}%</div>
              <div className="text-xs text-white/80">Needs review</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.definitions.weakPct : 0}%</div>
              <div className="text-xs text-white/80">Weak / unknown</div>
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
                placeholder="Search definitions, source, or wording"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white"
              />
            </label>
            <select
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white"
            >
              <option value="all">All topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {filteredItems.map((item) => {
            const selected = state.definitions[item.id] ?? 'weak';
            return (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-1 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {item.topicHe}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    L{item.lectures.join(',')}
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-sm leading-7 text-slate-700">{item.content}</div>
                <div className="mt-3 text-xs text-slate-500">{item.source}</div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
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
                      <span className="ml-1">{option.shortLabel}</span>
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
            No definitions match the current filter.
          </div>
        )}
      </div>
    </Layout>
  );
}
