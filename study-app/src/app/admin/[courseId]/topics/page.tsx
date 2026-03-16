'use client';

import { useParams } from 'next/navigation';
import { Layers, Plus, GripVertical, ChevronDown, BookOpen } from 'lucide-react';

export default function TopicsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">נושאים ושיעורים</h1>
          <p className="mt-1 text-sm text-slate-500">עריכת מבנה הקורס — נושאים, תת-נושאים ושיעורים</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500">
          <Plus className="h-4 w-4" />
          נושא חדש
        </button>
      </div>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
        <Layers className="mb-4 h-14 w-14 text-slate-200" />
        <p className="text-base font-semibold text-slate-400">עץ הנושאים ריק</p>
        <p className="mt-1 text-sm text-slate-300">הנושאים ייווצרו אוטומטית עם העלאת תוכן, או הוסף ידנית</p>
        <button className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm">
          <Plus className="h-4 w-4" />
          הוסף נושא ראשון
        </button>
      </div>
    </div>
  );
}
