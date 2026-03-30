'use client';

import type { BattlePlanTopicProgress } from '@/data/battle-plan-system';
import { battlePlanTopicAxes, getTrackerCompletionLabel } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import { BarChart3 } from 'lucide-react';

function getStrengthClasses(strength: 'strong' | 'medium' | 'weak') {
  switch (strength) {
    case 'strong':
      return {
        badge: 'bg-emerald-100 text-emerald-700',
        bar: 'bg-emerald-500',
      };
    case 'medium':
      return {
        badge: 'bg-amber-100 text-amber-700',
        bar: 'bg-amber-500',
      };
    case 'weak':
    default:
      return {
        badge: 'bg-red-100 text-red-700',
        bar: 'bg-red-500',
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
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">ציר שליטה לפי נושאים</h2>
            <p className="text-xs text-slate-500">מבוסס על הגדרות, שאלות בית וחזרת שאלות.</p>
          </div>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => {
          const style = getStrengthClasses(topic.strength);
          return (
            <article key={topic.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 leading-tight">{topic.label}</h3>
                  <p className="mt-1 text-[11px] text-slate-500">
                    הגדרות {topic.definitionsCount} · בית {topic.homeworkCount} · תרגול {topic.drillCount}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.badge}`}>
                  {getTrackerCompletionLabel(topic.progress) === 'Strong'
                    ? 'חזקה'
                    : getTrackerCompletionLabel(topic.progress) === 'Medium'
                    ? 'בינוני'
                    : 'לחזור'}
                </span>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>התקדמות</span>
                  <span className="font-mono font-semibold text-slate-700">{topic.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${topic.progress}%` }} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
