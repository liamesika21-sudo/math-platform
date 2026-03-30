import Layout from '@/components/Layout';
import MathText from '@/components/MathText';
import { battlePlanTips, battlePlanTopicLabels } from '@/data/battle-plan-hebrew';
import { Lightbulb, Sparkles } from 'lucide-react';

export default function BattlePlanTipsPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6 pb-12">
        <div className="rounded-2xl bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 p-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-extrabold">טיפים זהב</h1>
              <p className="mt-1 text-sm text-white/85">
                רק דפוסים, קיצורי דרך, כללי החלטה ותובנות שחוזרות במבחנים, בתרגולים ובשיעורי הבית.
              </p>
            </div>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">דפוסים שכדאי לזכור ישר</h2>
          </div>

          <div className="space-y-4">
            {battlePlanTips.map((tip) => (
              <article key={tip.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{tip.title}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {tip.topicLabel}
                  </span>
                </div>
                <p className="text-sm leading-7 text-slate-700">{tip.body}</p>
                <div className="mt-3 rounded-xl bg-white p-3 text-sm font-semibold text-slate-900">
                  <MathText text={tip.rule} />
                </div>
                <div className="mt-3 text-xs text-slate-500">{tip.source}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">חלוקת נושאים למעקב</h2>
          <div className="mt-4 space-y-2">
            {battlePlanTopicLabels.map((topic) => (
              <div key={topic.id} className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {topic.label}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
