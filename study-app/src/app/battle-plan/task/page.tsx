'use client';

import Link from 'next/link';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import MathText from '@/components/MathText';
import {
  battlePlanDefinitions,
  battlePlanTheorems,
  battlePlanTips,
} from '@/data/battle-plan-hebrew';
import {
  DrillDifficulty,
  HomeworkConfidence,
  HomeworkStatus,
  drillQuestionItems,
  homeworkTrackerItems,
} from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { ArrowUpLeft, BookOpenCheck, ClipboardList, FileQuestion, Lightbulb, ScrollText } from 'lucide-react';

const definitionAliasMap: Array<{ alias: string; ids: string[] }> = [
  { alias: 'גבול', ids: ['def-limit-point', 'def-right-limit', 'def-left-limit', 'def-limit-infinity', 'def-infinite-limit'] },
  { alias: 'רציפות', ids: ['def-continuity', 'def-right-continuity', 'def-left-continuity'] },
  { alias: 'גזירות', ids: ['def-derivative', 'def-differentiable', 'def-differentiable-interval'] },
  { alias: 'חסום', ids: ['def-upper-bound', 'def-lower-bound'] },
  { alias: 'sup', ids: ['def-sup'] },
  { alias: 'inf', ids: ['def-inf'] },
  { alias: 'עולה', ids: ['def-increasing'] },
  { alias: 'צפוף', ids: ['def-dense'] },
];

function extractHomeworkMatches(task: string) {
  const matches = task.match(/מטלה\s+\d+\s+שאלה\s+[0-9]+(?:\([^)]+\))?/g) ?? [];
  return homeworkTrackerItems.filter((item) => matches.some((match) => item.source.startsWith(match)));
}

function extractDefinitionMatches(task: string) {
  if (task.includes('שינון כל ההגדרות')) {
    return battlePlanDefinitions;
  }

  const matchedIds = new Set<string>();
  definitionAliasMap.forEach((entry) => {
    if (task.includes(entry.alias)) {
      entry.ids.forEach((id) => matchedIds.add(id));
    }
  });

  if (matchedIds.size === 0 && task.includes('הגדרות')) {
    return battlePlanDefinitions.filter((item) =>
      ['חסם', 'צפופה', 'גבול', 'רציפות', 'נגזרת', 'גזירה'].some((keyword) => item.title.includes(keyword))
    );
  }

  return battlePlanDefinitions.filter((item) => matchedIds.has(item.id));
}

function extractTheoremMatches(task: string) {
  if (task.includes('משפטים 1-5')) return battlePlanTheorems.filter((item) => item.id >= 1 && item.id <= 5);
  if (task.includes('משפטים 6-10')) return battlePlanTheorems.filter((item) => item.id >= 6 && item.id <= 10);
  if (task.includes('10 משפטים') || task.includes('משפטים 1-10')) return battlePlanTheorems;
  if (task.includes('משפטים')) return battlePlanTheorems;
  return [];
}

function extractDrillMatches(task: string) {
  const normalized = task.toLowerCase();
  const yearMatches = task.match(/20\d{2}/g) ?? [];

  return drillQuestionItems.filter((item) => {
    if (yearMatches.length > 0 && yearMatches.some((year) => item.source.includes(year) || item.title.includes(year))) {
      return true;
    }
    if (normalized.includes('מועד א׳') && item.source.includes('מועד א׳ 2026')) return true;
    if (normalized.includes('סימולציה') && (item.source.includes('סימולציה') || item.title.includes('סימולציה'))) return true;
    if (normalized.includes('פונקציית עזר') && (item.prompt.includes('פונקציית עזר') || item.title.includes('פונקציית עזר'))) return true;
    if (normalized.includes('צפיפות') && (item.prompt.includes('צפיפות') || item.title.includes('צפיפות') || item.source.includes('צפיפות'))) return true;
    if (normalized.includes('אי-שוויון') && (item.prompt.includes('אי-שוויון') || item.title.includes('אי-שוויון'))) return true;
    if (normalized.includes('תרגול מהיר')) return item.sourceType !== 'recitation';
    return false;
  });
}

function extractTipMatches(task: string) {
  return battlePlanTips.filter((item) =>
    [item.title, item.body, item.rule].some((value) => task.includes('פונקציית עזר') ? value.includes('פונקציית עזר') : false) ||
    (task.includes('צפיפות') && item.title.includes('צפיפות')) ||
    (task.includes('אי-שוויון') && item.title.includes('נגזרת שנייה')) ||
    (task.includes('זיהוי') && item.title.includes('קיים'))
  );
}

const statusOptions: Array<{ value: HomeworkStatus; label: string }> = [
  { value: 'solved', label: 'פתרתי' },
  { value: 'not-solved', label: 'עוד לא' },
];

const confidenceOptions: Array<{ value: HomeworkConfidence; label: string }> = [
  { value: 'high', label: 'גבוהה' },
  { value: 'medium', label: 'בינונית' },
  { value: 'low', label: 'נמוכה' },
];

const difficultyOptions: Array<{ value: DrillDifficulty; label: string }> = [
  { value: 'easy', label: 'קל' },
  { value: 'medium', label: 'בינוני' },
  { value: 'hard', label: 'קשה' },
];

export default function BattlePlanTaskPage() {
  return (
    <Suspense fallback={<Layout><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-slate-400">טוען...</div></div></Layout>}>
      <BattlePlanTaskContent />
    </Suspense>
  );
}

function BattlePlanTaskContent() {
  const searchParams = useSearchParams();
  const task = searchParams.get('task') ?? '';
  const day = searchParams.get('day') ?? '';
  const block = searchParams.get('block') ?? '';
  const dayTitle = searchParams.get('dayTitle') ?? '';

  const {
    state,
    setHomeworkConfidence,
    setHomeworkStatus,
    setDrillDifficulty,
    setDrillSolved,
    setDefinitionStatus,
  } = useBattlePlanTracker();

  const theoremMatches = useMemo(() => extractTheoremMatches(task), [task]);
  const definitionMatches = useMemo(() => extractDefinitionMatches(task), [task]);
  const homeworkMatches = useMemo(() => extractHomeworkMatches(task), [task]);
  const drillMatches = useMemo(() => extractDrillMatches(task), [task]);
  const tipMatches = useMemo(() => extractTipMatches(task), [task]);
  const shouldShowDefinitions = definitionMatches.length > 0;
  const shouldShowAllDefinitions = task.includes('שינון כל ההגדרות');

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <ScrollText className="h-8 w-8 text-sky-300" />
            <div>
              <h1 className="text-2xl font-extrabold">{task || 'דף משימה'}</h1>
              <p className="mt-1 text-sm text-white/80">
                יום {day} · משימה {block}{dayTitle ? ` · ${dayTitle}` : ''}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {shouldShowAllDefinitions && (
              <Link href="/battle-plan/definitions" className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800">
                <BookOpenCheck className="h-3.5 w-3.5" />
                לעמוד ההגדרות המלא
              </Link>
            )}
            {homeworkMatches.length > 0 && (
              <Link href="/battle-plan/homework" className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800">
                <ClipboardList className="h-3.5 w-3.5" />
                למעקב שאלות בית המלא
              </Link>
            )}
            {drillMatches.length > 0 && (
              <Link href="/battle-plan/drill" className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800">
                <FileQuestion className="h-3.5 w-3.5" />
                לחזרת השאלות המלאה
              </Link>
            )}
          </div>
        </div>

        {shouldShowDefinitions && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">הגדרות רלוונטיות</h2>
            <div className="mt-4 space-y-4">
              {definitionMatches.map((item) => (
                  <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-slate-500">{item.topicLabel}</div>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                        <div className="mt-3 text-sm leading-8 text-slate-800">
                          <MathText text={item.body} />
                        </div>
                        <div className="mt-3 text-xs text-slate-500">{item.source}</div>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
                        {[
                          { value: 'know', label: 'יודעת מעולה' },
                          { value: 'review', label: 'צריך חזרה' },
                          { value: 'weak', label: 'על הפנים' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setDefinitionStatus(item.id, option.value as 'know' | 'review' | 'weak')}
                            className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
                              (state.definitions[item.id] ?? 'weak') === option.value
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-200 bg-white text-slate-600'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        )}

        {theoremMatches.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">משפטים למשימה הזאת</h2>
            <div className="mt-4 space-y-5">
              {theoremMatches.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-500">{item.topicLabel}</div>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{item.shortName} — {item.title}</h3>
                  <div className="mt-3 rounded-lg bg-white p-3 text-sm leading-8 text-slate-800 border border-slate-100">
                    <MathText text={item.statement} />
                  </div>

                  {/* ── Conditions ── */}
                  {item.conditions && item.conditions.length > 0 && (
                    <div className="mt-3">
                      <div className="mb-1.5 text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 rounded-sm bg-sky-400" />
                        תנאים לשימוש במשפט
                      </div>
                      <ul className="space-y-1 pr-1">
                        {item.conditions.map((cond, idx) => (
                          <li key={idx} className="flex items-start gap-2 rounded-lg bg-sky-50 border border-sky-200 px-3 py-1.5 text-sm leading-7 text-slate-800">
                            <span className="mt-1.5 text-sky-500 font-bold text-xs flex-shrink-0">✓</span>
                            <MathText text={cond} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── Proof Flow ── */}
                  {item.proofFlow && item.proofFlow.length > 0 && (
                    <div className="mt-4">
                      <div className="mb-2 text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 rounded-sm bg-amber-400" />
                        Flow הוכחה — שלבים לזכור
                      </div>
                      <div className="relative pr-4">
                        {/* Vertical line */}
                        <div className="absolute right-[7px] top-2 bottom-2 w-0.5 bg-amber-300 rounded-full" />

                        <ol className="space-y-2">
                          {item.proofFlow.map((step, idx) => (
                            <li key={idx} className="relative flex items-start gap-3">
                              {/* Dot */}
                              <span className="relative z-10 mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">
                                {idx + 1}
                              </span>
                              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm leading-7 text-slate-800 flex-1">
                                <MathText text={step} />
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-slate-500">{item.source}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {homeworkMatches.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">שאלות בית למשימה הזאת</h2>
            <div className="mt-4 space-y-4">
              {homeworkMatches.map((item) => {
                const entry = state.homework[item.id] ?? { status: 'not-solved' as HomeworkStatus, confidence: 'medium' as HomeworkConfidence };
                return (
                  <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-500">{item.source} · {item.topicHe}</div>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                      <p><span className="font-semibold text-slate-900">למה זאת השאלה:</span> {item.whyLikely}</p>
                      <p><span className="font-semibold text-slate-900">וריאציה סבירה:</span> {item.variation}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setHomeworkStatus(item.id, option.value)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            entry.status === option.value ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {confidenceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setHomeworkConfidence(item.id, option.value)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            entry.confidence === option.value ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          ביטחון {option.label}
                        </button>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {drillMatches.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">שאלות חזרה בלי פתרונות</h2>
            <div className="mt-4 space-y-4">
              {drillMatches.map((item) => {
                const entry = state.drill[item.id] ?? { solved: false, difficulty: 'medium' as DrillDifficulty };
                return (
                  <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-500">{item.source} · {item.topicHe}</div>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.prompt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                        <input
                          type="checkbox"
                          checked={entry.solved}
                          onChange={(event) => setDrillSolved(item.id, event.target.checked)}
                          className="h-4 w-4"
                        />
                        פתרתי
                      </label>
                      {difficultyOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setDrillDifficulty(item.id, option.value)}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            entry.difficulty === option.value ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {tipMatches.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">טיפים זהב שקשורים למשימה</h2>
            <div className="mt-4 space-y-4">
              {tipMatches.map((item) => (
                <article key={item.id} className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <Lightbulb className="h-4 w-4" />
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{item.body}</p>
                  <div className="mt-3 rounded-xl bg-white p-3 text-sm font-semibold text-slate-900">
                    <MathText text={item.rule} />
                  </div>
                  <div className="mt-3 text-xs text-slate-500">{item.source} · {item.topicLabel}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        {theoremMatches.length === 0 && homeworkMatches.length === 0 && drillMatches.length === 0 && !shouldShowDefinitions && tipMatches.length === 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            <p className="text-sm">אין לתוכן הזה התאמה אוטומטית עדיין. אפשר לפתוח את דפי המעקב הכלליים מהעמוד הראשי.</p>
            <Link href="/battle-plan" className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
              חזרה ל־Battle Plan
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}
      </div>
    </Layout>
  );
}
