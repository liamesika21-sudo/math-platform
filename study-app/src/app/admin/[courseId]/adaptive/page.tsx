'use client';

import { useParams } from 'next/navigation';
import { BrainCircuit, Sliders, Users, ArrowRight, Zap, Target } from 'lucide-react';

interface AlgorithmRule {
  id: string;
  condition: string;
  action: string;
  enabled: boolean;
}

const defaultRules: AlgorithmRule[] = [
  { id: '1', condition: 'סטודנט נכשל ב-3 שאלות ברצף', action: 'הצג שאלות קלות יותר מאותו נושא', enabled: true },
  { id: '2', condition: 'שיעור הצלחה > 90% בנושא', action: 'קדם לנושא הבא בתכנית', enabled: true },
  { id: '3', condition: 'לא היה פעיל יותר מ-3 ימים', action: 'שלח תזכורת וחזרה קצרה', enabled: false },
  { id: '4', condition: 'שאלת מבחן הצליחה < 50% מהסטודנטים', action: 'הוסף הסבר נוסף ושאלות תרגול', enabled: true },
];

export default function AdaptivePage() {
  const { courseId } = useParams<{ courseId: string }>();
  void courseId;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">אנליטיקה</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">אלגוריתם אדפטיבי</h1>
        <p className="mt-1 text-sm text-slate-500">כללי למידה מותאמת אישית לפי ביצועי הסטודנטים</p>
      </div>

      {/* Status */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <Zap className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">האלגוריתם פעיל</p>
              <p className="text-xs text-emerald-600">{defaultRules.filter(r => r.enabled).length} כללים מופעלים</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">0</p>
              <p className="text-xs text-slate-500">סטודנטים בנתיב מותאם</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <Target className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">—</p>
              <p className="text-xs text-slate-500">שיפור ממוצע בביצועים</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500">כללי האלגוריתם</h2>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm">
            <Sliders className="h-4 w-4" />
            הגדרות מתקדמות
          </button>
        </div>
        <div className="space-y-3">
          {defaultRules.map((rule) => (
            <div key={rule.id} className={`flex items-start gap-4 rounded-2xl border p-5 transition ${rule.enabled ? 'border-indigo-100 bg-white shadow-sm' : 'border-slate-200 bg-slate-50 opacity-60'}`}>
              <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${rule.enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase text-slate-400">אם</span>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm text-slate-700">{rule.condition}</span>
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
                  <span className="text-xs font-semibold uppercase text-slate-400">אז</span>
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-sm text-indigo-700">{rule.action}</span>
                </div>
              </div>
              <button className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${rule.enabled ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}>
                {rule.enabled ? 'פעיל' : 'מושבת'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-5">
        <div className="flex items-start gap-3">
          <BrainCircuit className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
          <div>
            <p className="text-sm font-semibold text-indigo-900">איך זה עובד?</p>
            <p className="mt-1 text-sm text-indigo-700">
              האלגוריתם עוקב אחרי כל פעולה של הסטודנט — שאלות שנפתרו, טעויות, זמן לימוד והיסטוריית צ׳אט.
              על בסיס זה הוא מתאים אוטומטית את רצף הלמידה ורמת הקושי לכל סטודנט בנפרד.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
