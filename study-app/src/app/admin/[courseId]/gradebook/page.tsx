'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { BookMarked, Download, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function GradebookPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;
  const [search, setSearch] = useState('');
  const weeks = Array.from({ length: 14 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">אנליטיקה</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">ספר ציונים</h1>
          <p className="mt-1 text-sm text-slate-500">ציוני כל הסטודנטים לפי שבועות ומשימות</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300">
          <Download className="h-4 w-4" />
          ייצוא Excel
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="חיפוש סטודנט..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-4 text-sm shadow-sm focus:border-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookMarked className="mb-4 h-14 w-14 text-slate-200" />
          <p className="text-base font-semibold text-slate-400">ספר הציונים ריק</p>
          <p className="mt-1 text-sm text-slate-300">יתמלא אוטומטית כשסטודנטים ירשמו ויתחילו לפתור שאלות</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-emerald-100" /> מעל 80%</div>
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-amber-100" /> 50–80%</div>
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-red-100" /> מתחת 50%</div>
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-slate-100" /> לא הושלם</div>
      </div>
    </div>
  );
}
