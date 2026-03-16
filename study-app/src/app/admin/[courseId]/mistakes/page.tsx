'use client';

import { useParams } from 'next/navigation';
import { AlertTriangle, TrendingDown, Flame, Lightbulb } from 'lucide-react';

export default function MistakesPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">אנליטיקה</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">ניתוח טעויות</h1>
        <p className="mt-1 text-sm text-slate-500">מוקדי קושי, שאלות בעייתיות ותובנות לשיפור ההוראה</p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <Flame className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-sm font-medium text-slate-700">שאלות עם שיעור כישלון גבוה</p>
          <p className="text-xs text-slate-500">מעל 60% טעויות</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <TrendingDown className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-sm font-medium text-slate-700">נושאים חלשים</p>
          <p className="text-xs text-slate-500">ממוצע מתחת ל-50%</p>
        </div>
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
            <Lightbulb className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">—</p>
          <p className="mt-1 text-sm font-medium text-slate-700">תובנות לשיפור</p>
          <p className="text-xs text-slate-500">המלצות AI</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
        <AlertTriangle className="mb-4 h-14 w-14 text-slate-200" />
        <p className="text-base font-semibold text-slate-400">אין מספיק נתונים עדיין</p>
        <p className="mt-1 max-w-sm text-sm text-slate-300">
          הניתוח יוצג לאחר שסטודנטים יתחילו לפתור שאלות. המערכת תזהה אוטומטית דפוסי טעויות ומוקדי קושי.
        </p>
      </div>
    </div>
  );
}
