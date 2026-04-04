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
const TASKS_KEY = 'triple-battle-tasks-v1';

function loadState(): Record<string, Status> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}
function saveState(s: Record<string, Status>) {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}
function loadTasks(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(TASKS_KEY) || '{}'); } catch { return {}; }
}
function saveTasks(s: Record<string, boolean>) {
  if (typeof window !== 'undefined') localStorage.setItem(TASKS_KEY, JSON.stringify(s));
}

/* ─── DAILY PLAN ─── */
interface DayTask { id: string; subject: Subject; task: string; hours: number; }
interface DayPlan { date: string; weekday: string; phase: number; tasks: DayTask[]; isExam?: Subject; }

const dailyPlan: DayPlan[] = [
  // ── Phase 1: Infi focus (Apr 3-28) ──
  { date:'3/4', weekday:'חמישי', phase:1, tasks:[
    { id:'d3a1', subject:'infi', task:'הגדרות: inf, sup, חסום, צפיפות — כתבי כל אחת 3 פעמים', hours:2 },
    { id:'d3a2', subject:'infi', task:'חזרה על הוכחות רול + לגראנז\' + קושי', hours:1.5 },
    { id:'d3a3', subject:'bdida', task:'קראי סיכום: תחשיבי פסוקים + פרדיקטים', hours:1.5 },
    { id:'d3a4', subject:'liner', task:'קראי סיכום 6 משפטים מועד ב\'', hours:1 },
  ]},
  { date:'4/4', weekday:'שישי', phase:1, tasks:[
    { id:'d4a1', subject:'infi', task:'IVT: תרגלי 3 שאלות — פונקציית עזר + בדיקת סימנים + IVT', hours:2 },
    { id:'d4a2', subject:'infi', task:'הגדרות מהזיכרון: גזירות, רציפות, חסום מלרע/מלעיל', hours:1 },
    { id:'d4a3', subject:'bdida', task:'תרגלי שאלות שקילות פסוקים + דה-מורגן', hours:1 },
    { id:'d4a4', subject:'liner', task:'Rank-Nullity: קראי הוכחה + כתבי פעם אחת', hours:1 },
  ]},
  { date:'5/4', weekday:'שבת', phase:1, tasks:[
    { id:'d5a1', subject:'infi', task:'שאלות לגראנז\' על f\'\': תרגלי 3 שאלות דומות ל-4.1', hours:2 },
    { id:'d5a2', subject:'infi', task:'דוגמאות נגדיות: תרגלי T/F ממבחני 2022-2025', hours:1.5 },
    { id:'d5a3', subject:'bdida', task:'קומבינטוריקה: כללי מכפלה, בינום, כלילה-הדחה', hours:1 },
    { id:'d5a4', subject:'liner', task:'3 המשפטים (dim=n → בסיס⟺בת"ל⟺פורשים): קראי', hours:1 },
  ]},
  { date:'6/4', weekday:'ראשון', phase:1, tasks:[
    { id:'d6a1', subject:'infi', task:'צפיפות Q + גבולות: תרגלי מועד א\' 2022 שאלה 5(b)', hours:2 },
    { id:'d6a2', subject:'infi', task:'אפיון inf: כתבי הוכחה מהזיכרון (שני הכיוונים)', hours:1 },
    { id:'d6a3', subject:'bdida', task:'פונקציות: חח"ע, על, הרכבה — שאלות מ-2024B', hours:1.5 },
    { id:'d6a4', subject:'liner', task:'טבלת הפיכות: למדי את כל התנאים השקולים', hours:1 },
  ]},
  { date:'7/4', weekday:'שני', phase:1, tasks:[
    { id:'d7a1', subject:'infi', task:'חזרה על הגדרות (כתיבה מהזיכרון) + הוכחת הרכבת גבולות', hours:2 },
    { id:'d7a2', subject:'infi', task:'תרגול: שאלות אי-שוויונות עם פונקציות עזר', hours:1.5 },
    { id:'d7a3', subject:'bdida', task:'יחסים: רפלקסיבי, סימטרי, טרנזיטיבי, אנטי-סימטרי', hours:1.5 },
    { id:'d7a4', subject:'liner', task:'det(AB)=det(A)det(B): קראי הוכחה', hours:1 },
  ]},
  { date:'8/4', weekday:'שלישי', phase:1, tasks:[
    { id:'d8a1', subject:'infi', task:'כל ההגדרות מהזיכרון — כתבי בלי להסתכל', hours:1 },
    { id:'d8a2', subject:'infi', task:'הוכחות: רול + לגראנז\' + קושי — מהזיכרון בלי להסתכל', hours:2 },
    { id:'d8a3', subject:'bdida', task:'יחסי שקילות: מחלקות + קבוצה מנה (2022A, 2025B)', hours:1.5 },
    { id:'d8a4', subject:'liner', task:'Row rank = Col rank: קראי הוכחה', hours:1 },
  ]},
  { date:'9/4', weekday:'רביעי', phase:1, tasks:[
    { id:'d9a1', subject:'infi', task:'סימולציה #1: מבחן 2024A — 3 שעות בתנאי מבחן!', hours:3 },
    { id:'d9a2', subject:'infi', task:'ניתוח סימולציה: מה טעיתי? למה?', hours:1 },
    { id:'d9a3', subject:'bdida', task:'אינדוקציה: רגילה + חזקה (2024A, 2024B)', hours:1 },
    { id:'d9a4', subject:'liner', task:'חזרה על הוכחות 1-3 מהזיכרון', hours:0.5 },
  ]},
  { date:'10/4', weekday:'חמישי', phase:1, tasks:[
    { id:'d10a1', subject:'infi', task:'תיקון טעויות מסימולציה #1 — חזרה ממוקדת', hours:2 },
    { id:'d10a2', subject:'infi', task:'תרגול IVT + פונקציות עזר (עוד 2-3 שאלות)', hours:1.5 },
    { id:'d10a3', subject:'bdida', task:'סדר חלקי: דיאגרמת האסה, מינימלי/מקסימלי', hours:1.5 },
    { id:'d10a4', subject:'liner', task:'תרגלי שאלת הוכחה מ-2024 מועד ב\'', hours:1 },
  ]},
  { date:'11/4', weekday:'שישי', phase:1, tasks:[
    { id:'d11a1', subject:'infi', task:'כל ההוכחות מהזיכרון — רול, לגראנז\', קושי, הרכבה, inf', hours:2 },
    { id:'d11a2', subject:'infi', task:'צפיפות Q: כתבי הוכחה מהזיכרון', hours:1 },
    { id:'d11a3', subject:'bdida', task:'Hall\'s Marriage: למדי המשפט + תרגלי matching יציב', hours:1.5 },
    { id:'d11a4', subject:'liner', task:'קראי מבחן 2024 מועד ב\' — ראי מה שואלים', hours:1 },
  ]},
  { date:'12/4', weekday:'שבת', phase:1, tasks:[
    { id:'d12a1', subject:'infi', task:'סימולציה #2: מבחן 2025A — 3 שעות', hours:3 },
    { id:'d12a2', subject:'infi', task:'ניתוח סימולציה #2', hours:1 },
    { id:'d12a3', subject:'bdida', task:'שובך היונים + דוגמאות (2025B)', hours:1 },
    { id:'d12a4', subject:'liner', task:'פתרי 2 שאלות חישוב (det, מרחבי עמודות)', hours:1 },
  ]},
  { date:'13/4', weekday:'ראשון', phase:1, tasks:[
    { id:'d13a1', subject:'infi', task:'תיקון טעויות סימולציה #2 + חזרה IVT', hours:2 },
    { id:'d13a2', subject:'infi', task:'תרגול: שאלות ε-δ + הגדרות', hours:1.5 },
    { id:'d13a3', subject:'bdida', task:'חזרה כללית: שאלות פתוחות מ-2023B', hours:1.5 },
    { id:'d13a4', subject:'liner', task:'הוכחות 4-6 מהזיכרון', hours:1 },
  ]},
  { date:'14/4', weekday:'שני', phase:1, tasks:[
    { id:'d14a1', subject:'infi', task:'הגדרות — כתבי 5 פעמים כל אחת', hours:1.5 },
    { id:'d14a2', subject:'infi', task:'שאלות T/F (הוכח/הפרך) ממבחני 2022-2025', hours:2 },
    { id:'d14a3', subject:'bdida', task:'10 שאלות אמריקאיות מנושאים שונים', hours:1 },
    { id:'d14a4', subject:'liner', task:'Steinitz + השלמה לבסיס: קראי', hours:1 },
  ]},
  { date:'15/4', weekday:'שלישי', phase:1, tasks:[
    { id:'d15a1', subject:'infi', task:'תרגול מעורב: 2-3 שאלות מסוגים שונים', hours:2 },
    { id:'d15a2', subject:'infi', task:'הוכחת גזירות פונקציה הופכית', hours:1 },
    { id:'d15a3', subject:'bdida', task:'חזרה: הגדרות יחסים + קומבינטוריקה', hours:1.5 },
    { id:'d15a4', subject:'liner', task:'T/F מלינארית 2024', hours:1 },
  ]},
  { date:'16/4', weekday:'רביעי', phase:1, tasks:[
    { id:'d16a1', subject:'infi', task:'סימולציה #3: מבחן 2025B — 3 שעות', hours:3 },
    { id:'d16a2', subject:'infi', task:'ניתוח סימולציה #3', hours:1 },
    { id:'d16a3', subject:'bdida', task:'שאלה פתוחה: אינדוקציה + יחסי שקילות', hours:1 },
    { id:'d16a4', subject:'liner', task:'שאלות בסיס + dim ממבחן 2023', hours:1 },
  ]},
  { date:'17/4', weekday:'חמישי', phase:1, tasks:[
    { id:'d17a1', subject:'infi', task:'תיקון טעויות חוזרות מסימולציות 1-3', hours:2 },
    { id:'d17a2', subject:'infi', task:'תרגול הנושא הכי חלש שלך', hours:1.5 },
    { id:'d17a3', subject:'bdida', task:'פתרי שאלות פתוחות מ-2022B', hours:1.5 },
    { id:'d17a4', subject:'liner', task:'תרגלי: בסיס, dim, rank ממבחנים', hours:1 },
  ]},
  { date:'18/4', weekday:'שישי', phase:1, tasks:[
    { id:'d18a1', subject:'infi', task:'סימולציה #4: מבחן 2023A — 3 שעות', hours:3 },
    { id:'d18a2', subject:'infi', task:'ניתוח סימולציה #4', hours:1 },
    { id:'d18a3', subject:'bdida', task:'שאלות פתוחות מ-2021A + 2021B', hours:1 },
    { id:'d18a4', subject:'liner', task:'Rank-Nullity + Invertibility מהזיכרון', hours:1 },
  ]},
  { date:'19/4', weekday:'שבת', phase:1, tasks:[
    { id:'d19a1', subject:'infi', task:'חזרה ממוקדת על הנושא הכי חלש', hours:2 },
    { id:'d19a2', subject:'infi', task:'הגדרות + הוכחות מהזיכרון — כל מה שלמדת', hours:1.5 },
    { id:'d19a3', subject:'bdida', task:'מבחן שלם — חלק אמריקאי', hours:1.5 },
    { id:'d19a4', subject:'liner', task:'מבחן 2025 מועד ב\' (שאלות 1-2)', hours:1 },
  ]},
  { date:'20/4', weekday:'ראשון', phase:1, tasks:[
    { id:'d20a1', subject:'infi', task:'סימולציה #5: מבחן 2023B — 3 שעות', hours:3 },
    { id:'d20a2', subject:'infi', task:'ניתוח סימולציה #5', hours:1 },
    { id:'d20a3', subject:'bdida', task:'Hall\'s Marriage + סדר חלקי — שאלות נוספות', hours:1 },
    { id:'d20a4', subject:'liner', task:'דטרמיננטות: חישוב + תכונות', hours:1 },
  ]},
  { date:'21/4', weekday:'שני', phase:1, tasks:[
    { id:'d21a1', subject:'infi', task:'כל ההוכחות מהזיכרון ברצף — בלי לעצור', hours:2 },
    { id:'d21a2', subject:'infi', task:'תרגול אחרון: 2-3 שאלות מסוגים שונים', hours:1.5 },
    { id:'d21a3', subject:'bdida', task:'CNF/DNF + שקילויות — חזרה', hours:1 },
    { id:'d21a4', subject:'liner', task:'העתקות ליניאריות — חזרה', hours:1 },
  ]},
  { date:'22/4', weekday:'שלישי', phase:1, tasks:[
    { id:'d22a1', subject:'infi', task:'סימולציה #6: מבחן 2022B — 3 שעות', hours:3 },
    { id:'d22a2', subject:'infi', task:'ניתוח סימולציה #6', hours:1 },
    { id:'d22a3', subject:'bdida', task:'נושאים חלשים — תרגול', hours:1 },
    { id:'d22a4', subject:'liner', task:'חזרה כללית', hours:0.5 },
  ]},
  { date:'23/4', weekday:'רביעי', phase:1, tasks:[
    { id:'d23a1', subject:'infi', task:'חזרה על כל מה שטעית בסימולציות 1-6', hours:2 },
    { id:'d23a2', subject:'infi', task:'רשימת "דברים לזכור" — כתבי על דף', hours:1 },
    { id:'d23a3', subject:'bdida', task:'מבחן שלם — שאלות פתוחות', hours:1.5 },
    { id:'d23a4', subject:'liner', task:'הוכחות מהזיכרון — כל 6', hours:1 },
  ]},
  { date:'24/4', weekday:'חמישי', phase:1, tasks:[
    { id:'d24a1', subject:'infi', task:'סימולציה אחרונה #7 — בתנאי מבחן אמיתיים', hours:3 },
    { id:'d24a2', subject:'infi', task:'ניתוח אחרון', hours:1 },
    { id:'d24a3', subject:'bdida', task:'30 דק\' חזרה קלה', hours:0.5 },
  ]},
  { date:'25/4', weekday:'שישי', phase:1, tasks:[
    { id:'d25a1', subject:'infi', task:'חזרה ממוקדת: הגדרות + הוכחות מהזיכרון בלבד', hours:2.5 },
    { id:'d25a2', subject:'bdida', task:'30 דק\' חזרה קלה', hours:0.5 },
  ]},
  { date:'26/4', weekday:'שבת', phase:1, tasks:[
    { id:'d26a1', subject:'infi', task:'חזרה על כל הטעויות מהסימולציות — רשימה סופית', hours:2 },
  ]},
  { date:'27/4', weekday:'ראשון', phase:1, tasks:[
    { id:'d27a1', subject:'infi', task:'חזרה קלה: הגדרות + 2-3 שאלות מפתח בלבד', hours:1.5 },
  ]},
  { date:'28/4', weekday:'שני', phase:1, tasks:[
    { id:'d28a1', subject:'infi', task:'חזרה אחרונה: רק הגדרות + הוכחות קצרות. לישון מוקדם!', hours:1 },
  ]},
  { date:'29/4', weekday:'שלישי', phase:1, isExam:'infi', tasks:[] },

  // ── Phase 2: Bdida focus (Apr 30 - May 6) ──
  { date:'30/4', weekday:'רביעי', phase:2, tasks:[
    { id:'d30a1', subject:'bdida', task:'חזרה מרוכזת: כל ההגדרות + שקילויות + CNF/DNF', hours:3 },
    { id:'d30a2', subject:'bdida', task:'תרגול: 15 שאלות אמריקאיות מנושאים שונים', hours:2 },
    { id:'d30a3', subject:'liner', task:'הוכחה אחת מהזיכרון + שאלת חישוב', hours:1 },
  ]},
  { date:'1/5', weekday:'חמישי', phase:2, tasks:[
    { id:'d31a1', subject:'bdida', task:'קומבינטוריקה אינטנסיבית: בינום, כלילה-הדחה, שובך', hours:3 },
    { id:'d31a2', subject:'bdida', task:'תרגול: שאלות פתוחות אינדוקציה (2024A, 2024B, 2020B)', hours:2 },
    { id:'d31a3', subject:'liner', task:'תרגלי שאלת חישוב (det / בסיס)', hours:1 },
  ]},
  { date:'2/5', weekday:'שישי', phase:2, tasks:[
    { id:'d32a1', subject:'bdida', task:'יחסי שקילות + סדר חלקי — מחלקות, האסה', hours:3 },
    { id:'d32a2', subject:'bdida', task:'פונקציות: הוכחות חח"ע/על עם הרכבה', hours:2 },
    { id:'d32a3', subject:'liner', task:'הוכחה אחת מהזיכרון', hours:1 },
  ]},
  { date:'3/5', weekday:'שבת', phase:2, tasks:[
    { id:'d33a1', subject:'bdida', task:'סימולציה: מבחן 2024B בדידה — 3 שעות', hours:3 },
    { id:'d33a2', subject:'bdida', task:'ניתוח סימולציה: מה טעיתי?', hours:1 },
    { id:'d33a3', subject:'bdida', task:'חזרה על נושאים חלשים שעלו', hours:1.5 },
    { id:'d33a4', subject:'liner', task:'קראי סיכום נושאים', hours:1 },
  ]},
  { date:'4/5', weekday:'ראשון', phase:2, tasks:[
    { id:'d34a1', subject:'bdida', task:'אינדוקציה + פונקציות — שאלות פתוחות', hours:2.5 },
    { id:'d34a2', subject:'bdida', task:'Hall\'s Marriage: תרגלי matching יציב', hours:2 },
    { id:'d34a3', subject:'liner', task:'תרגלי שאלת הוכחה', hours:1 },
  ]},
  { date:'5/5', weekday:'שני', phase:2, tasks:[
    { id:'d35a1', subject:'bdida', task:'סימולציה: מבחן 2025B — 3 שעות', hours:3 },
    { id:'d35a2', subject:'bdida', task:'ניתוח + חזרה על חולשות', hours:1.5 },
    { id:'d35a3', subject:'bdida', task:'חזרה: כל ההגדרות + נוסחאות', hours:1 },
  ]},
  { date:'6/5', weekday:'שלישי', phase:2, tasks:[
    { id:'d36a1', subject:'bdida', task:'חזרה אחרונה: הגדרות + נוסחאות + טעויות מסימולציות', hours:2 },
    { id:'d36a2', subject:'bdida', task:'מעבר על רשימת "דברים לזכור". לישון מוקדם!', hours:1 },
  ]},
  { date:'7/5', weekday:'רביעי', phase:2, isExam:'bdida', tasks:[] },

  // ── Phase 3: Liner focus (May 8-14) ──
  { date:'8/5', weekday:'חמישי', phase:3, tasks:[
    { id:'d38a1', subject:'liner', task:'כל 6 ההוכחות מהזיכרון — כתבי ברצף על דף ריק', hours:2.5 },
    { id:'d38a2', subject:'liner', task:'חישובי בסיס, dim, rank — 5 תרגילים', hours:2 },
    { id:'d38a3', subject:'liner', task:'חזרה על הגדרות: ת"ל, בסיס, rank, העתקה ליניארית', hours:1.5 },
  ]},
  { date:'9/5', weekday:'שישי', phase:3, tasks:[
    { id:'d39a1', subject:'liner', task:'דטרמיננטות: 5 שאלות חישוב (אנטי-אלכסונית, פרמטר, בלוקים)', hours:2.5 },
    { id:'d39a2', subject:'liner', task:'הפיכות: אלגוריתם [A|I], בדיקת הפיכות', hours:2 },
    { id:'d39a3', subject:'liner', task:'מערכת עם פרמטר: דירוג → סיווג מקרים', hours:1.5 },
  ]},
  { date:'10/5', weekday:'שבת', phase:3, tasks:[
    { id:'d40a1', subject:'liner', task:'סימולציה: מבחן 2025 מועד ב\' — 3 שעות', hours:3 },
    { id:'d40a2', subject:'liner', task:'ניתוח סימולציה', hours:1 },
    { id:'d40a3', subject:'liner', task:'חזרה על נושאים חלשים', hours:2 },
  ]},
  { date:'11/5', weekday:'ראשון', phase:3, tasks:[
    { id:'d41a1', subject:'liner', task:'העתקות ליניאריות + גרעין + תמונה', hours:2 },
    { id:'d41a2', subject:'liner', task:'מטריצה מייצגת + שינוי בסיס + מטריצת מעבר', hours:2 },
    { id:'d41a3', subject:'liner', task:'תת-מרחבים: Span, סכום, חיתוך, סכום ישר', hours:2 },
  ]},
  { date:'12/5', weekday:'שני', phase:3, tasks:[
    { id:'d42a1', subject:'liner', task:'סימולציה: מבחן 2024 מועד ב\' — 3 שעות', hours:3 },
    { id:'d42a2', subject:'liner', task:'ניתוח + תיקון', hours:1 },
    { id:'d42a3', subject:'liner', task:'הוכחות מהזיכרון — כל 6', hours:1.5 },
  ]},
  { date:'13/5', weekday:'שלישי', phase:3, tasks:[
    { id:'d43a1', subject:'liner', task:'חזרה על כל הטעויות מ-2 הסימולציות', hours:2 },
    { id:'d43a2', subject:'liner', task:'הוכחות + הגדרות — כתיבה מהזיכרון', hours:2 },
    { id:'d43a3', subject:'liner', task:'תרגול: 3 שאלות מסוגים שונים', hours:2 },
  ]},
  { date:'14/5', weekday:'רביעי', phase:3, tasks:[
    { id:'d44a1', subject:'liner', task:'חזרה אחרונה: הגדרות + הוכחות + נוסחאות. לישון מוקדם!', hours:2 },
  ]},
  { date:'15/5', weekday:'חמישי', phase:3, isExam:'liner', tasks:[] },
];

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */

export default function TripleBattlePlanPage() {
  const [tab, setTab] = useState<'overview' | 'schedule' | 'theorems' | 'definitions'>('overview');
  const [filter, setFilter] = useState<Subject | 'all'>('all');
  const [statusMap, setStatusMap] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [tasksDone, setTasksDone] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState<number>(1);

  useEffect(() => { setStatusMap(loadState()); setTasksDone(loadTasks()); }, []);

  function setStatus(id: string, s: Status) {
    const next = { ...statusMap, [id]: s };
    setStatusMap(next);
    saveState(next);
  }

  function toggleTask(id: string) {
    const next = { ...tasksDone, [id]: !tasksDone[id] };
    setTasksDone(next);
    saveTasks(next);
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

  // Schedule stats
  const allTasks = dailyPlan.flatMap(d => d.tasks);
  const phaseTasks = (p: number) => dailyPlan.filter(d => d.phase === p).flatMap(d => d.tasks);
  const doneTasks = allTasks.filter(t => tasksDone[t.id]).length;
  const phaseDone = (p: number) => phaseTasks(p).filter(t => tasksDone[t.id]).length;

  const tabs = [
    { id: 'overview' as const, label: 'סקירה כללית', icon: <Target className="w-4 h-4" /> },
    { id: 'schedule' as const, label: `לוח משימות (${doneTasks}/${allTasks.length})`, icon: <Calendar className="w-4 h-4" /> },
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

        {/* ═══════════════ SCHEDULE TAB ═══════════════ */}
        {tab === 'schedule' && (
          <div className="space-y-4">
            {/* Phase selector */}
            <div className="flex gap-2">
              {[1, 2, 3].map(p => {
                const labels = ['מיקוד אינפי', 'מיקוד בדידה', 'מיקוד לינארית'];
                const colors = ['bg-emerald-500', 'bg-amber-500', 'bg-violet-500'];
                const pt = phaseTasks(p);
                const pd = phaseDone(p);
                return (
                  <button key={p} onClick={() => setActivePhase(p)}
                    className={`flex-1 rounded-xl border-2 p-3 transition-all ${activePhase === p ? 'border-slate-800 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:bg-white'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`${colors[p - 1]} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>פאזה {p}</span>
                      <span className="text-xs font-bold text-slate-600">{labels[p - 1]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-black text-slate-800">{pd}/{pt.length}</div>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${colors[p - 1]}`} style={{ width: `${pt.length ? (pd / pt.length) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Days in active phase */}
            {dailyPlan.filter(d => d.phase === activePhase).map(day => {
              const dayTasks = day.tasks;
              const dayDone = dayTasks.filter(t => tasksDone[t.id]).length;
              const allDayDone = dayTasks.length > 0 && dayDone === dayTasks.length;

              return (
                <div key={day.date} className={`bg-white rounded-xl border ${allDayDone ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'} overflow-hidden`}>
                  {/* Day header */}
                  <div className={`px-4 py-3 border-b ${day.isExam ? 'bg-red-50 border-red-200' : allDayDone ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'} flex items-center gap-3`}>
                    <div className="text-center min-w-[50px]">
                      <div className="text-lg font-black text-slate-800">{day.date}</div>
                      <div className="text-[10px] font-bold text-slate-400">{day.weekday}</div>
                    </div>
                    {day.isExam ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Flame className="w-5 h-5 text-red-500" />
                        <span className="font-bold text-red-700 text-sm">מבחן {SUBJECT_META[day.isExam].label}!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-1">
                        {allDayDone && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                        <span className={`text-sm font-bold ${allDayDone ? 'text-emerald-700' : 'text-slate-600'}`}>
                          {dayDone}/{dayTasks.length} משימות
                        </span>
                        <div className="flex-1 max-w-[120px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${dayTasks.length ? (dayDone / dayTasks.length) * 100 : 0}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tasks */}
                  {dayTasks.length > 0 && (
                    <div className="divide-y divide-slate-50">
                      {dayTasks.map(task => {
                        const m = SUBJECT_META[task.subject];
                        const done = tasksDone[task.id];
                        return (
                          <div key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 ${done ? 'opacity-60' : ''}`}>
                            <div className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                              {done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <span className={`${m.bg} text-white text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0`}>{m.label}</span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm ${done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task.task}</div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                              <Clock className="w-3 h-3" />
                              {task.hours}h
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Overall progress */}
            <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
              <div className="text-xs text-slate-400 mb-1">התקדמות כוללת</div>
              <div className="text-3xl font-black">{doneTasks}/{allTasks.length}</div>
              <div className="h-3 bg-slate-700 rounded-full mt-2 overflow-hidden max-w-md mx-auto">
                <div className="h-full bg-gradient-to-l from-emerald-400 to-emerald-500 rounded-full transition-all" style={{ width: `${allTasks.length ? (doneTasks / allTasks.length) * 100 : 0}%` }} />
              </div>
              <div className="text-xs text-slate-400 mt-1">{Math.round(allTasks.length ? (doneTasks / allTasks.length) * 100 : 0)}% הושלם</div>
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
