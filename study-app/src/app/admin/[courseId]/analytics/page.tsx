'use client';

import { useParams } from 'next/navigation';
import { BarChart2, Users, Clock, TrendingUp, Activity, BookOpen } from 'lucide-react';

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 text-center">
      <BarChart2 className="mb-2 h-8 w-8 text-slate-200" />
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-[10px] text-slate-300">יוצג לאחר איסוף נתונים</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">אנליטיקה</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">ניתוח נתונים</h1>
        <p className="mt-1 text-sm text-slate-500">מגמות, ביצועים ושימוש בפלטפורמה</p>
      </div>

      {/* KPI row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'ממוצע שאלות ליום', value: '—', icon: Activity, desc: 'לכל הקורס' },
          { label: 'זמן לימוד ממוצע', value: '—', icon: Clock, desc: 'דקות ליום לסטודנט' },
          { label: 'שיעור השלמה', value: '—', icon: TrendingUp, desc: 'ממוצע כל השבועות' },
          { label: 'סטודנטים פעילים', value: '0', icon: Users, desc: '7 ימים אחרונים' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <kpi.icon className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-950">{kpi.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{kpi.label}</p>
            <p className="text-xs text-slate-400">{kpi.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-700">שאלות שנפתרו לפי שבוע</h3>
          <EmptyChart label="גרף שאלות שבועי" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-700">זמן לימוד יומי</h3>
          <EmptyChart label="גרף זמן לימוד" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-700">התפלגות ביצועים</h3>
          <EmptyChart label="התפלגות ציונים" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-700">נושאים פופולריים</h3>
          <EmptyChart label="נושאים עם הכי הרבה שאלות" />
        </div>
      </div>
    </div>
  );
}
