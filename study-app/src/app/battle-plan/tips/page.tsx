import Layout from '@/components/Layout';
import { buildAutomaticImportantPatterns, goldenTipSeeds, patternObservations } from '@/data/battle-plan-system';
import { AlertTriangle, BrainCircuit, Lightbulb, Sparkles } from 'lucide-react';

const importantPatterns = buildAutomaticImportantPatterns();

export default function BattlePlanTipsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-lg">
          <div className="mb-3 flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-amber-300" />
            <div>
              <h1 className="text-2xl font-extrabold">Golden Tips</h1>
              <p className="mt-1 text-sm text-white/80">Patterns, decision rules, shortcuts, and repeated exam engines. No theory recap.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{goldenTipSeeds.length}</div>
              <div className="text-xs text-white/70">Core rules</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{importantPatterns.filter((item) => item.important).length}</div>
              <div className="text-xs text-white/70">Important patterns</div>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <div className="text-2xl font-bold">{patternObservations.length}</div>
              <div className="text-xs text-white/70">Detected pattern sources</div>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold">Decision Rules</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {goldenTipSeeds.map((tip) => (
              <article key={tip.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{tip.explanation}</p>
                <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">{tip.rule}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-bold">Important Pattern</h2>
          </div>
          <div className="grid gap-4">
            {importantPatterns
              .filter((item) => item.important)
              .map((item) => (
                <article key={item.patternId} className="rounded-2xl border border-red-200 bg-red-50/70 p-5 shadow-sm">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="mb-2 inline-flex rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700">
                        Important Pattern
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
                      <div className="text-lg font-bold text-red-600">{item.probability}%</div>
                      <div className="text-[11px] text-slate-500">{item.frequency} repeats • {item.sourceTypes} source types</div>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item.explanation}</p>
                  <div className="mt-3 rounded-xl bg-white p-3 text-sm font-semibold text-slate-900">{item.rule}</div>
                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    {item.examples.map((example) => (
                      <div key={example} className="rounded-xl border border-red-100 bg-white/90 p-3 text-sm text-slate-700">
                        {example}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <BrainCircuit className="h-5 w-5 text-indigo-500" />
            <h2 className="text-xl font-bold">Pattern Evidence Across Material</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {patternObservations.map((item) => (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{item.probability}%</div>
                </div>
                <p className="text-sm leading-7 text-slate-600">{item.explanation}</p>
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-900">{item.rule}</div>
                <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm text-indigo-800">{item.miniExample}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{item.sourceLabel}</span>
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
