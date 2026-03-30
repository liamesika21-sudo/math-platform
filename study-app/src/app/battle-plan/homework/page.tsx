'use client';

import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { HomeworkConfidence, HomeworkStatus, homeworkTrackerItems } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { ClipboardList, Search, Target } from 'lucide-react';

const statusOptions: Array<{ value: HomeworkStatus; label: string; className: string }> = [
  { value: 'solved', label: 'פתרתי', className: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
  { value: 'not-solved', label: 'עוד לא', className: 'border-red-300 bg-red-50 text-red-700' },
];

const confidenceOptions: Array<{ value: HomeworkConfidence; label: string; className: string }> = [
  { value: 'high', label: 'גבוה', className: 'border-emerald-300 bg-emerald-50 text-emerald-700' },
  { value: 'medium', label: 'בינוני', className: 'border-amber-300 bg-amber-50 text-amber-700' },
  { value: 'low', label: 'נמוך', className: 'border-red-300 bg-red-50 text-red-700' },
];

export default function BattlePlanHomeworkPage() {
  const { state, snapshot, isHydrated, setHomeworkConfidence, setHomeworkStatus } = useBattlePlanTracker();
  const [query, setQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  const topics = useMemo(
    () => Array.from(new Set(homeworkTrackerItems.map((item) => item.topicHe))).sort((a, b) => a.localeCompare(b, 'he')),
    []
  );

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return homeworkTrackerItems.filter((item) => {
      const matchesTopic = topicFilter === 'all' || item.topicHe === topicFilter;
      const matchesQuery =
        normalized.length === 0 ||
        item.title.toLowerCase().includes(normalized) ||
        item.source.toLowerCase().includes(normalized) ||
        item.variation.toLowerCase().includes(normalized) ||
        item.whyLikely.toLowerCase().includes(normalized) ||
        item.topicHe.toLowerCase().includes(normalized);
      return matchesTopic && matchesQuery;
    });
  }, [query, topicFilter]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-amber-600 via-orange-600 to-red-500 p-6 text-white shadow-lg">
          <div className="mb-3 flex items-center gap-3">
            <ClipboardList className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-extrabold">מעקב שאלות בית</h1>
              <p className="mt-1 text-sm text-white/85">
                כל שאלות הבית הקריטיות, עם מקור מדויק, סיבה לבחירה, ומעקב אישי על פתרון וביטחון.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.homework.completionPct : 0}%</div>
              <div className="text-xs text-white/80">פתרתי</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.homework.high : 0}</div>
              <div className="text-xs text-white/80">ביטחון גבוה</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.homework.medium : 0}</div>
              <div className="text-xs text-white/80">ביטחון בינוני</div>
            </div>
            <div className="rounded-xl bg-white/15 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{isHydrated ? snapshot.homework.low : 0}</div>
              <div className="text-xs text-white/80">ביטחון נמוך</div>
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
                placeholder="חפשי לפי מטלה, שאלה, דפוס או וריאציה"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-300 focus:bg-white"
              />
            </label>
            <select
              value={topicFilter}
              onChange={(event) => setTopicFilter(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-300 focus:bg-white"
            >
              <option value="all">כל האשכולות</option>
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
            const entry = state.homework[item.id] ?? {
              status: 'not-solved' as HomeworkStatus,
              confidence: 'medium' as HomeworkConfidence,
            };

            return (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-1 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {item.source}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{item.title}</h2>
                    <p className="mt-1 text-xs text-slate-500">{item.topicHe}</p>
                  </div>
                  <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">{item.probability}%</div>
                </div>

                <div className="space-y-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  <p><span className="font-semibold text-slate-900">מקור:</span> {item.source}</p>
                  <p><span className="font-semibold text-slate-900">למה היא כאן:</span> {item.whyLikely}</p>
                  <p><span className="font-semibold text-slate-900">וריאציה סבירה:</span> {item.variation}</p>
                  <p><span className="font-semibold text-slate-900">מנגנון פתרון:</span> {item.method}</p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setHomeworkStatus(item.id, option.value)}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                          entry.status === option.value
                            ? option.className
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    {confidenceOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setHomeworkConfidence(item.id, option.value)}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                          entry.confidence === option.value
                            ? option.className
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        ביטחון {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            <Target className="mx-auto mb-3 h-6 w-6 text-slate-400" />
            אין כרגע שאלות בית שמתאימות לסינון שבחרת.
          </div>
        )}
      </div>
    </Layout>
  );
}
