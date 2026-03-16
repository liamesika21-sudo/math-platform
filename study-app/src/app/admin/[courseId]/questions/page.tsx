'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { HelpCircle, Plus, Search, Tag, BarChart2 } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';
type QType = 'tutorial' | 'homework' | 'exam';

interface Question {
  id: string;
  title: string;
  week: number;
  type: QType;
  difficulty: Difficulty;
  topic: string;
  timesAttempted: number;
  successRate: number;
}

const diffColor: Record<Difficulty, string> = {
  easy: 'bg-emerald-50 text-emerald-700',
  medium: 'bg-amber-50 text-amber-700',
  hard: 'bg-red-50 text-red-600',
};
const diffLabel: Record<Difficulty, string> = { easy: 'קלה', medium: 'בינונית', hard: 'קשה' };
const typeLabel: Record<QType, string> = { tutorial: 'תרגול', homework: 'שיעורי בית', exam: 'מבחן' };

export default function QuestionsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;
  const [questions] = useState<Question[]>([]);
  const [search, setSearch] = useState('');

  const filtered = questions.filter(
    (q) => q.title.includes(search) || q.topic.includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">שאלות</h1>
          <p className="mt-1 text-sm text-slate-500">בנק שאלות — תרגול, שיעורי בית ומבחנים</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500">
          <Plus className="h-4 w-4" />
          שאלה חדשה
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="חיפוש שאלות..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-4 text-sm shadow-sm focus:border-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
          <HelpCircle className="mb-4 h-14 w-14 text-slate-200" />
          <p className="text-base font-semibold text-slate-400">אין שאלות עדיין</p>
          <p className="mt-1 text-sm text-slate-300">העלה תוכן בעמוד תכנית לימודים כדי להוסיף שאלות אוטומטית</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 text-right">שאלה</th>
                <th className="px-6 py-3 text-right"><Tag className="inline h-3.5 w-3.5" /> נושא</th>
                <th className="px-6 py-3 text-right">שבוע</th>
                <th className="px-6 py-3 text-right">סוג</th>
                <th className="px-6 py-3 text-right">רמה</th>
                <th className="px-6 py-3 text-right"><BarChart2 className="inline h-3.5 w-3.5" /> הצלחה</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((q) => (
                <tr key={q.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{q.title}</td>
                  <td className="px-6 py-4 text-slate-500">{q.topic}</td>
                  <td className="px-6 py-4 text-slate-500">שבוע {q.week}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{typeLabel[q.type]}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${diffColor[q.difficulty]}`}>{diffLabel[q.difficulty]}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-indigo-600" style={{ width: `${q.successRate}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{q.successRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
