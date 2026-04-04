'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import {
  Swords, Target, Brain, Calendar, CheckCircle, ChevronDown, ChevronUp,
  Clock, Flame, Shield, BookOpen, AlertTriangle, Award, Zap, Star,
} from 'lucide-react';

/* ════════════════════════════════════════════════════
   TYPES & DATA
   ════════════════════════════════════════════════════ */

type Subject = 'infi' | 'bdida' | 'liner';
type Status = 'know' | 'review' | 'weak' | 'none';

interface TheoremItem {
  id: string;
  subject: Subject;
  name: string;
  statement: string;
  proofSteps: string[];
  probability: number;
  appearedIn: string[];
}

interface DefinitionItem {
  id: string;
  subject: Subject;
  name: string;
  content: string;
}

const EXAM_DATES: Record<Subject, Date> = {
  infi: new Date(2026, 3, 29), // April 29
  bdida: new Date(2026, 4, 7), // May 7
  liner: new Date(2026, 4, 15), // May 15
};

const SUBJECT_META: Record<Subject, { label: string; color: string; bg: string; border: string; lightBg: string; gradientFrom: string; gradientTo: string }> = {
  infi: { label: 'אינפי 1', color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500', lightBg: 'bg-emerald-50', gradientFrom: 'from-emerald-600', gradientTo: 'to-teal-500' },
  bdida: { label: 'בדידה', color: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500', lightBg: 'bg-amber-50', gradientFrom: 'from-amber-600', gradientTo: 'to-orange-500' },
  liner: { label: 'לינארית 1', color: 'text-violet-400', bg: 'bg-violet-500', border: 'border-violet-500', lightBg: 'bg-violet-50', gradientFrom: 'from-violet-600', gradientTo: 'to-indigo-500' },
};

/* ─── THEOREMS ─── */
const theorems: TheoremItem[] = [
  // INFI
  { id:'i1', subject:'infi', name:'משפט רול', statement:'f רציפה ב-[a,b], גזירה ב-(a,b), f(a)=f(b) → קיים c כך ש-f\'(c)=0', proofSteps:['הגדרות: f רציפה ב-[a,b] → ויירשטראס → יש מקסימום ומינימום','אם שניהם בקצוות → f קבועה → f\'(c)=0 לכל c','אם קיצון פנימי ב-c ∈ (a,b) → פרמה → f\'(c)=0'], probability:85, appearedIn:['2025A','2022A'] },
  { id:'i2', subject:'infi', name:'משפט לגראנז\'', statement:'f רציפה ב-[a,b], גזירה ב-(a,b) → קיים c: f\'(c) = (f(b)-f(a))/(b-a)', proofSteps:['הגדר h(x) = f(x) - [(f(b)-f(a))/(b-a)]·(x-a)','h רציפה ב-[a,b], גזירה ב-(a,b)','h(a) = f(a), h(b) = f(a) → h(a)=h(b)','רול → קיים c: h\'(c) = 0 → f\'(c) = (f(b)-f(a))/(b-a)'], probability:80, appearedIn:['2026A','2025A'] },
  { id:'i3', subject:'infi', name:'משפט קושי (Cauchy MVT)', statement:'f,g רציפות ב-[a,b], גזירות ב-(a,b), g\'(x)≠0 → קיים c: f\'(c)/g\'(c) = (f(b)-f(a))/(g(b)-g(a))', proofSteps:['g חח"ע (מרול) → g(a)≠g(b) → α מוגדר','הגדר α = (f(b)-f(a))/(g(b)-g(a))','הגדר h(x) = f(x) - αg(x)','h(a) = h(b) (חשבו!)','רול → h\'(c) = 0 → f\'(c) = αg\'(c) → f\'(c)/g\'(c) = α'], probability:90, appearedIn:['2026A'] },
  { id:'i4', subject:'infi', name:'הרכבת גבולות', statement:'lim f(x)=L₁, lim g(y)=L₂, f(x)≠L₁ בסביבה מנוקבת → lim g(f(x))=L₂', proofSteps:['יהי ε>0. מגבול g: קיים δ₁ כך ש-0<|y-L₁|<δ₁ → |g(y)-L₂|<ε','מגבול f: קיים δ₂ כך ש-0<|x-x₀|<δ₂ → |f(x)-L₁|<δ₁','בנוסף f(x)≠L₁ → 0<|f(x)-L₁|<δ₁','הרכב: 0<|x-x₀|<δ₂ → |g(f(x))-L₂|<ε'], probability:75, appearedIn:['2023B'] },
  { id:'i5', subject:'infi', name:'צפיפות Q ב-ℝ', statement:'לכל x<y ב-ℝ קיים q∈Q כך ש-x<q<y', proofSteps:['y-x>0 → ארכימדס → קיים n∈ℕ: 1/n < y-x','נגדיר A = {m∈ℤ : m/n ≤ x}','A חסומה מלעיל → קיים m₀ = max(A)','אזי m₀/n ≤ x < (m₀+1)/n','(m₀+1)/n ≤ x + 1/n < x + (y-x) = y','לכן q = (m₀+1)/n מקיים x < q < y'], probability:85, appearedIn:['2024A','2023A','2022A'] },
  { id:'i6', subject:'infi', name:'אפיון inf בתכונת ε', statement:'s = inf(A) ⟺ s חסם מלרע ∧ ∀ε>0 ∃a∈A: a < s+ε', proofSteps:['⇒: s=inf(A), יהי ε>0. m=s+ε>s → m לא חסם מלרע → ∃a<m=s+ε','⇐: יהי m חסם מלרע, m>s. ε=m-s>0 → ∃a<s+ε=m. סתירה!'], probability:80, appearedIn:['2026A','2025A'] },
  { id:'i7', subject:'infi', name:'גזירות פונקציה הופכית', statement:'f גזירה ב-x₀, f\'(x₀)≠0, f הפיכה, f⁻¹ רציפה ב-y₀=f(x₀) → (f⁻¹)\'(y₀) = 1/f\'(x₀)', proofSteps:['See lectures — הופיע 2022B, 2025B'], probability:70, appearedIn:['2022B','2025B'] },

  // BDIDA
  { id:'b1', subject:'bdida', name:'Hall\'s Marriage Theorem', statement:'matching שלם קיים ⟺ ∀S⊆X: |N(S)| ≥ |S|', proofSteps:['לא צריך להוכיח — רק לדעת להשתמש','לבדוק את תנאי Hall לכל תת-קבוצה','matching יציב: אלגוריתם Gale-Shapley'], probability:70, appearedIn:['2023B','2022B','2019B'] },
  { id:'b2', subject:'bdida', name:'שובך היונים (Pigeonhole)', statement:'n+1 יונים ב-n שובכים → לפחות 2 באותו שובך', proofSteps:['בשלילה: לכל שובך לכל היותר 1 → סה"כ ≤n. סתירה!','הכללה: kn+1 יונים ב-n שובכים → לפחות k+1 באחד'], probability:60, appearedIn:['2025B'] },

  // LINER
  { id:'l1', subject:'liner', name:'Rank-Nullity', statement:'rank(A) + dim(Nul A) = n (n = מספר עמודות)', proofSteps:['דרג A לצורה קנונית C — rank=k כניסות מובילות','n-k משתנים חופשיים','בנה בסיס ל-NulA: לכל חופשי שים 1, שאר 0','n-k וקטורים בת"ל (כל אחד עם 1 במקום אחר)','dim(NulA) = n-k → k + (n-k) = n'], probability:95, appearedIn:['כמעט כל שנה'] },
  { id:'l2', subject:'liner', name:'שרשרת הפיכות', statement:'A הפיכה ⟺ rank=n ⟺ det≠0 ⟺ עמודות בת"ל ⟺ Ax=0 רק טריוויאלי ⟺ ...', proofSteps:['בנה שרשרת מעגלית של גרירות','A הפיכה → rank(A)=n → עמודות בת"ל','→ Ax=0 רק טריוויאלי → Nul={0}','→ Col(A)=Fⁿ → ... → A הפיכה'], probability:90, appearedIn:['כל שנה'] },
  { id:'l3', subject:'liner', name:'משפט השלש', statement:'dim(V)=n, n וקטורים: בסיס ⟺ בת"ל ⟺ פורשים', proofSteps:['בסיס→בת"ל: הגדרה','בת"ל→פורשים: בשלילה, ∃v∉Span → n+1 בת"ל. אבל dim=n → סתירה!','פורשים→בסיס: בשלילה, ת"ל → n-1 פורשים. אבל dim=n → סתירה!'], probability:85, appearedIn:['כמעט כל שנה'] },
  { id:'l4', subject:'liner', name:'det(AB) = det(A)·det(B)', statement:'לכל A,B ריבועיות: det(AB) = det(A)·det(B)', proofSteps:['מקרה 1: B לא הפיכה → rank(AB)<n → det(AB)=0=det(A)·0','מקרה 2: B הפיכה → B=E₁···Eₖ (אלמנטריות)','למה: det(EA) = det(E)·det(A)','det(AB) = det(A)·det(E₁)···det(Eₖ) = det(A)·det(B)'], probability:75, appearedIn:['רוב השנים'] },
  { id:'l5', subject:'liner', name:'Row rank = Column rank', statement:'dim(Col A) = dim(Row A) = rank(A)', proofSteps:['דרג A→C: פעולות שורה משמרות Row space','שורות ≠0 של C הן בסיס ל-RowA → dimRowA = rank','עמודות pivot של A הן בסיס ל-ColA → dimColA = rank'], probability:70, appearedIn:['רוב השנים'] },
  { id:'l6', subject:'liner', name:'למת שטייניץ (Steinitz)', statement:'v₁,...,vₖ בת"ל + w₁,...,wₘ פורשים → k ≤ m', proofSteps:['v₁ ∈ Span{w} → החלף wⱼ ב-v₁ (עדיין פורשים)','חזור k פעמים','אם k>m → אין מספיק w להחליף → סתירה','מסקנה: כל שני בסיסים — אותו גודל → dim מוגדר'], probability:70, appearedIn:['לעיתים'] },
];

/* ─── DEFINITIONS ─── */
const definitions: DefinitionItem[] = [
  { id:'d1', subject:'infi', name:'f גזירה ב-(a,b)', content:'לכל x₀∈(a,b) קיים L∈ℝ כך שלכל ε>0 קיים δ>0: 0<|x-x₀|<δ → |[f(x)-f(x₀)]/(x-x₀) - L| < ε' },
  { id:'d2', subject:'infi', name:'A חסומה מלרע', content:'קיים m∈ℝ כך שלכל a∈A: a ≥ m' },
  { id:'d3', subject:'infi', name:'A חסומה מלעיל', content:'קיים M∈ℝ כך שלכל a∈A: a ≤ M' },
  { id:'d4', subject:'infi', name:'inf(A) = s', content:'s חסם מלרע של A, ולכל חסם מלרע m של A: m ≤ s' },
  { id:'d5', subject:'infi', name:'lim f(x) = L (ε-δ)', content:'לכל ε>0 קיים δ>0: 0<|x-x₀|<δ → |f(x)-L| < ε' },
  { id:'d6', subject:'infi', name:'f רציפה ב-x₀', content:'lim(x→x₀) f(x) = f(x₀)' },
  { id:'d7', subject:'infi', name:'f עולה ב-(a,b)', content:'לכל x₁,x₂∈(a,b): x₁<x₂ → f(x₁) ≤ f(x₂)' },
  { id:'d8', subject:'infi', name:'f לא חסומה מלעיל (בלי שלילה!)', content:'לכל M∈ℝ קיים x כך ש-f(x) > M' },
  { id:'d9', subject:'infi', name:'A צפופה ב-ℝ', content:'לכל x<y∈ℝ קיים a∈A: x < a < y' },
  { id:'d10', subject:'bdida', name:'יחס שקילות', content:'רפלקסיבי (aRa) + סימטרי (aRb→bRa) + טרנזיטיבי (aRb∧bRc→aRc)' },
  { id:'d11', subject:'bdida', name:'סדר חלקי', content:'רפלקסיבי + אנטי-סימטרי (aRb∧bRa→a=b) + טרנזיטיבי' },
  { id:'d12', subject:'bdida', name:'f חח"ע (חד-חד-ערכית)', content:'f(x₁)=f(x₂) → x₁=x₂' },
  { id:'d13', subject:'bdida', name:'f על (על-פונקציה)', content:'לכל y∈Y קיים x∈X: f(x)=y' },
  { id:'d14', subject:'liner', name:'תלות ליניארית', content:'v₁,...,vₙ ת"ל אם קיימים סקלרים לא כולם 0: c₁v₁+...+cₙvₙ = 0' },
  { id:'d15', subject:'liner', name:'בסיס', content:'קבוצה בת"ל שפורשת את V' },
  { id:'d16', subject:'liner', name:'rank(A)', content:'מספר כניסות מובילות בצורה המדורגת הקנונית' },
  { id:'d17', subject:'liner', name:'העתקה ליניארית', content:'T(u+v)=T(u)+T(v) ו-T(cv)=cT(v) לכל u,v∈V, c∈F' },
];

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */

function daysUntil(d: Date): number {
  const now = new Date();
  now.setHours(0,0,0,0);
  return Math.ceil((d.getTime() - now.getTime()) / (1000*60*60*24));
}

function probBadge(p: number) {
  if (p >= 85) return 'bg-red-100 text-red-700 border-red-200';
  if (p >= 70) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-blue-100 text-blue-700 border-blue-200';
}

const STORAGE_KEY = 'triple-battle-plan-v1';

function loadState(): Record<string, Status> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function saveState(s: Record<string, Status>) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */

export default function TripleBattlePlanPage() {
  const [tab, setTab] = useState<'overview' | 'theorems' | 'definitions'>('overview');
  const [filter, setFilter] = useState<Subject | 'all'>('all');
  const [statusMap, setStatusMap] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => { setStatusMap(loadState()); }, []);

  function setStatus(id: string, s: Status) {
    const next = { ...statusMap, [id]: s };
    setStatusMap(next);
    saveState(next);
  }

  function toggleExpand(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const filteredTheorems = filter === 'all' ? theorems : theorems.filter(t => t.subject === filter);
  const filteredDefs = filter === 'all' ? definitions : definitions.filter(d => d.subject === filter);

  // Stats
  const stats = (items: { id: string }[]) => {
    const know = items.filter(i => statusMap[i.id] === 'know').length;
    const review = items.filter(i => statusMap[i.id] === 'review').length;
    const weak = items.filter(i => statusMap[i.id] === 'weak').length;
    const none = items.length - know - review - weak;
    return { know, review, weak, none, total: items.length };
  };

  const thmStats = stats(filteredTheorems);
  const defStats = stats(filteredDefs);

  const statusBtn = (id: string, label: string, s: Status, color: string) => (
    <button
      onClick={() => setStatus(id, statusMap[id] === s ? 'none' : s)}
      className={`px-2 py-0.5 rounded text-xs font-bold border transition-all ${statusMap[id] === s ? color : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
    >
      {label}
    </button>
  );

  const tabs = [
    { id: 'overview' as const, label: 'סקירה כללית', icon: <Target className="w-4 h-4" /> },
    { id: 'theorems' as const, label: `משפטים (${thmStats.know}/${theorems.length})`, icon: <Brain className="w-4 h-4" /> },
    { id: 'definitions' as const, label: `הגדרות (${defStats.know}/${definitions.length})`, icon: <BookOpen className="w-4 h-4" /> },
  ];

  const subjectFilters: { id: Subject | 'all'; label: string }[] = [
    { id: 'all', label: 'הכל' },
    { id: 'infi', label: 'אינפי' },
    { id: 'bdida', label: 'בדידה' },
    { id: 'liner', label: 'לינארית' },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12" dir="rtl">

        {/* ─── Hero ─── */}
        <div className="bg-gradient-to-l from-slate-900 via-indigo-900 to-violet-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Swords className="w-8 h-8" />
            <h1 className="text-2xl font-extrabold">תוכנית קרב משולשת — מועד ב׳ 2026</h1>
          </div>
          <p className="text-white/80 text-sm">אינפי + בדידה + לינארית | יעד: 90+ בכל מקצוע</p>

          {/* Countdown chips */}
          <div className="flex gap-3 mt-5 flex-wrap">
            {(['infi', 'bdida', 'liner'] as Subject[]).map(s => {
              const days = daysUntil(EXAM_DATES[s]);
              const m = SUBJECT_META[s];
              return (
                <div key={s} className="bg-white/10 backdrop-blur rounded-xl px-5 py-3 text-center min-w-[140px]">
                  <div className={`text-xs font-bold ${m.color}`}>{m.label}</div>
                  <div className="text-3xl font-black mt-1">{days}</div>
                  <div className="text-xs text-white/60">ימים</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* ─── Subject Filter ─── */}
        {tab !== 'overview' && (
          <div className="flex gap-1">
            {subjectFilters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === f.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
        {tab === 'overview' && (
          <div className="space-y-5">

            {/* Phase cards */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-500" />3 פאזות — חלוקת הזמן</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {/* Phase 1 */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded">פאזה 1</span>
                    <span className="font-bold text-slate-800">מיקוד אינפי</span>
                    <span className="text-xs text-slate-400 mr-auto">3-28 אפריל (26 יום)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center"><div className="font-bold text-emerald-700">3-4 שעות</div><div className="text-emerald-600">אינפי</div></div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center"><div className="font-bold text-amber-700">1.5 שעות</div><div className="text-amber-600">בדידה</div></div>
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-2 text-center"><div className="font-bold text-violet-700">1 שעה</div><div className="text-violet-600">לינארית</div></div>
                  </div>
                </div>
                {/* Phase 2 */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded">פאזה 2</span>
                    <span className="font-bold text-slate-800">מיקוד בדידה</span>
                    <span className="text-xs text-slate-400 mr-auto">30 אפריל — 6 מאי (7 ימים)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center"><div className="font-bold text-slate-400">—</div><div className="text-slate-400">אינפי (נגמר)</div></div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center"><div className="font-bold text-amber-700">5-6 שעות</div><div className="text-amber-600">בדידה</div></div>
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-2 text-center"><div className="font-bold text-violet-700">1 שעה</div><div className="text-violet-600">לינארית</div></div>
                  </div>
                </div>
                {/* Phase 3 */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-violet-500 text-white text-xs font-bold px-2 py-0.5 rounded">פאזה 3</span>
                    <span className="font-bold text-slate-800">מיקוד לינארית</span>
                    <span className="text-xs text-slate-400 mr-auto">8-14 מאי (7 ימים)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center"><div className="font-bold text-slate-400">—</div><div className="text-slate-400">אינפי</div></div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center"><div className="font-bold text-slate-400">—</div><div className="text-slate-400">בדידה (נגמר)</div></div>
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-2 text-center"><div className="font-bold text-violet-700">6-7 שעות</div><div className="text-violet-600">לינארית</div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject priority cards */}
            {(['infi', 'bdida', 'liner'] as Subject[]).map(s => {
              const m = SUBJECT_META[s];
              const subThms = theorems.filter(t => t.subject === s);
              const subDefs = definitions.filter(d => d.subject === s);
              const tS = stats(subThms);
              const dS = stats(subDefs);
              return (
                <div key={s} className={`bg-white rounded-xl border-2 ${m.border} overflow-hidden`}>
                  <div className={`p-4 bg-gradient-to-l ${m.gradientFrom} ${m.gradientTo} text-white`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg">{m.label} — {EXAM_DATES[s].toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}</h3>
                      <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-lg font-bold">{daysUntil(EXAM_DATES[s])} ימים</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-800">{tS.know}/{tS.total}</div>
                        <div className="text-xs text-slate-500">משפטים ידועים</div>
                        <div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${tS.total ? (tS.know / tS.total) * 100 : 0}%` }} />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-slate-800">{dS.know}/{dS.total}</div>
                        <div className="text-xs text-slate-500">הגדרות ידועות</div>
                        <div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${dS.total ? (dS.know / dS.total) * 100 : 0}%` }} />
                        </div>
                      </div>
                    </div>
                    {tS.weak > 0 && <div className="text-xs text-red-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{tS.weak} משפטים חלשים — צריך חיזוק!</div>}
                  </div>
                </div>
              );
            })}

            {/* Tips */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2"><Zap className="w-5 h-5" />טיפים</h3>
              <ul className="space-y-1 text-sm text-amber-700">
                <li className="flex items-start gap-2"><Star className="w-4 h-4 mt-0.5 flex-shrink-0" />סימולציה אחת בשבוע למקצוע הקרוב — 3 שעות בתנאי מבחן</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 mt-0.5 flex-shrink-0" />הגדרות — כתבי ביד כל יום עד שזה אוטומטי</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 mt-0.5 flex-shrink-0" />הוכחות — תגידי בקול (כאילו את מלמדת)</li>
                <li className="flex items-start gap-2"><Star className="w-4 h-4 mt-0.5 flex-shrink-0" />אף פעם לא מפסיקים מקצוע לגמרי — שעה ברקע שומרת על הזיכרון</li>
              </ul>
            </div>
          </div>
        )}

        {/* ═══════════════ THEOREMS TAB ═══════════════ */}
        {tab === 'theorems' && (
          <div className="space-y-3">
            {/* Stats bar */}
            <div className="flex gap-2 text-xs font-bold">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">יודעת: {thmStats.know}</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">לחזור: {thmStats.review}</span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">חלש: {thmStats.weak}</span>
              <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded">לא סומן: {thmStats.none}</span>
            </div>

            {filteredTheorems.map(thm => {
              const m = SUBJECT_META[thm.subject];
              const isExpanded = expanded[thm.id];
              return (
                <div key={thm.id} className={`bg-white rounded-xl border ${statusMap[thm.id] === 'know' ? 'border-emerald-300' : statusMap[thm.id] === 'weak' ? 'border-red-300' : 'border-slate-200'} overflow-hidden`}>
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`${m.bg} text-white text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5`}>{m.label}</span>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm">{thm.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{thm.statement}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${probBadge(thm.probability)}`}>{thm.probability}%</span>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {statusBtn(thm.id, 'יודעת בע"פ', 'know', 'bg-emerald-100 text-emerald-700 border-emerald-300')}
                      {statusBtn(thm.id, 'צריכה חזרה', 'review', 'bg-amber-100 text-amber-700 border-amber-300')}
                      {statusBtn(thm.id, 'חלש', 'weak', 'bg-red-100 text-red-700 border-red-300')}
                      <button onClick={() => toggleExpand(thm.id)} className="mr-auto flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        שלבי הוכחה
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="text-xs font-bold text-slate-500 mb-2">PROOF FLOW:</div>
                        <ol className="space-y-1 text-sm text-slate-700 list-decimal list-inside">
                          {thm.proofSteps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                        {thm.appearedIn.length > 0 && (
                          <div className="mt-2 text-[10px] text-slate-400">הופיע ב: {thm.appearedIn.join(', ')}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══════════════ DEFINITIONS TAB ═══════════════ */}
        {tab === 'definitions' && (
          <div className="space-y-3">
            {/* Stats bar */}
            <div className="flex gap-2 text-xs font-bold">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">יודעת: {defStats.know}</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">לחזור: {defStats.review}</span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">חלש: {defStats.weak}</span>
            </div>

            {filteredDefs.map(def => {
              const m = SUBJECT_META[def.subject];
              return (
                <div key={def.id} className={`bg-white rounded-xl border ${statusMap[def.id] === 'know' ? 'border-emerald-300' : statusMap[def.id] === 'weak' ? 'border-red-300' : 'border-slate-200'} p-4`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`${m.bg} text-white text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5`}>{m.label}</span>
                    <div className="flex-1">
                      <div className="font-bold text-slate-800 text-sm">{def.name}</div>
                      <div className="text-xs text-slate-600 mt-1 font-mono bg-slate-50 rounded p-2 border border-slate-100">{def.content}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {statusBtn(def.id, 'יודעת', 'know', 'bg-emerald-100 text-emerald-700 border-emerald-300')}
                    {statusBtn(def.id, 'לחזור', 'review', 'bg-amber-100 text-amber-700 border-amber-300')}
                    {statusBtn(def.id, 'חלש', 'weak', 'bg-red-100 text-red-700 border-red-300')}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </Layout>
  );
}
