'use client';

import type { BattlePlanTopicProgress } from '@/data/battle-plan-system';
import { battlePlanTopicAxes, getTrackerCompletionLabel } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { BarChart3, BookCheck, Dumbbell, ShieldAlert } from 'lucide-react';

function getStrengthClasses(strength: 'strong' | 'medium' | 'weak') {
  switch (strength) {
    case 'strong':
      return {
        badge: 'bg-emerald-100 text-emerald-700',
        bar: 'bg-emerald-500',
        panel: 'border-emerald-200 bg-emerald-50/50',
      };
    case 'medium':
      return {
        badge: 'bg-amber-100 text-amber-700',
        bar: 'bg-amber-500',
        panel: 'border-amber-200 bg-amber-50/50',
      };
    case 'weak':
    default:
      return {
        badge: 'bg-red-100 text-red-700',
        bar: 'bg-red-500',
        panel: 'border-red-200 bg-red-50/50',
      };
  }
}

export default function ProgressAxisDashboard() {
  const { snapshot, isHydrated } = useBattlePlanTracker();

  const topics: BattlePlanTopicProgress[] = isHydrated
    ? snapshot.topics
    : battlePlanTopicAxes.map((axis) => ({
        ...axis,
        progress: 0,
        strength: 'weak',
        definitionsCount: 0,
        homeworkCount: 0,
        drillCount: 0,
      }));

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-slate-900">Main Progress Axis</h2>
        </div>
        <p className="text-sm text-slate-500">
          Live progress is computed from the Definitions Tracker, Homework Tracker, and Full Question Drill.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => {
          const style = getStrengthClasses(topic.strength);
          return (
            <article key={topic.id} className={`rounded-2xl border p-4 shadow-sm ${style.panel}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">Topic Axis</p>
                  <h3 className="font-bold text-slate-900 leading-tight">{topic.shortLabel}</h3>
                  <p className="text-xs text-slate-500 mt-1">{topic.label}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}>
                  {getTrackerCompletionLabel(topic.progress)}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="font-mono font-semibold text-slate-700">{topic.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${topic.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-white/80 px-3 py-2 border border-white/70">
                  <div className="flex items-center gap-1 text-slate-500">
                    <BookCheck className="h-3.5 w-3.5" />
                    Definitions
                  </div>
                  <div className="mt-1 font-bold text-slate-800">{topic.definitionsCount}</div>
                </div>
                <div className="rounded-xl bg-white/80 px-3 py-2 border border-white/70">
                  <div className="flex items-center gap-1 text-slate-500">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Homework
                  </div>
                  <div className="mt-1 font-bold text-slate-800">{topic.homeworkCount}</div>
                </div>
                <div className="rounded-xl bg-white/80 px-3 py-2 border border-white/70">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Dumbbell className="h-3.5 w-3.5" />
                    Drill
                  </div>
                  <div className="mt-1 font-bold text-slate-800">{topic.drillCount}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
