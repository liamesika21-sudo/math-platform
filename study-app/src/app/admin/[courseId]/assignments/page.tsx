'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ClipboardList, Plus, Calendar, Users, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  week: number;
  dueDate: string;
  submissions: number;
  total: number;
  status: 'upcoming' | 'active' | 'closed';
}

const statusConfig = {
  upcoming: { label: 'קרוב', color: 'bg-slate-100 text-slate-600', icon: Clock },
  active: { label: 'פעיל', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  closed: { label: 'נסגר', color: 'bg-amber-50 text-amber-700', icon: AlertTriangle },
};

export default function AssignmentsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;
  const [assignments] = useState<Assignment[]>([]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">מטלות</h1>
          <p className="mt-1 text-sm text-slate-500">ניהול שיעורי בית ומטלות הגשה</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500">
          <Plus className="h-4 w-4" />
          מטלה חדשה
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
          <ClipboardList className="mb-4 h-14 w-14 text-slate-200" />
          <p className="text-base font-semibold text-slate-400">אין מטלות עדיין</p>
          <p className="mt-1 text-sm text-slate-300">צור מטלה חדשה כדי להתחיל</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => {
            const cfg = statusConfig[a.status];
            const Icon = cfg.icon;
            return (
              <div key={a.id} className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                  <ClipboardList className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{a.title}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.dueDate}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {a.submissions}/{a.total} הגשות</span>
                  </div>
                </div>
                <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-600" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.color}`}>
                  <Icon className="h-3 w-3" />
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
