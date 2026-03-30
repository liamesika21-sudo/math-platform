'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import ProgressAxisDashboard from '@/components/battle-plan/ProgressAxisDashboard';
import TrackerLinkButton from '@/components/battle-plan/TrackerLinkButton';
import { getTrackerResourceSummary } from '@/data/battle-plan-system';
import { useBattlePlanTracker } from '@/hooks/useBattlePlanTracker';
import {
  Target,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Flame,
  Brain,
  Calendar,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  XCircle,
  Award,
  Swords,
  Eye,
  Lightbulb,
} from 'lucide-react';

// ============================================================
// DATA
// ============================================================

interface MoedAQuestion {
  id: string;
  label: string;
  score: number;
  max: number;
  diagnosis: string;
  category: 'perfect' | 'good' | 'partial' | 'fail' | 'skip';
}

const moedAResults: MoedAQuestion[] = [
  { id: '1.1', label: 'הגדרת נגזרת בקטע (ε-δ)', score: 0, max: 2, diagnosis: 'לא ידעת את ההגדרה הפורמלית', category: 'fail' },
  { id: '1.2', label: 'הוכחת משפט קושי לערך הממוצע', score: 0, max: 23, diagnosis: 'ניסיון שגוי — ההוכחה לא שוננה', category: 'fail' },
  { id: '2.1', label: 'הגדרת חסום + תכונת ε של inf', score: 6, max: 13, diagnosis: 'הגדרה OK, הוכחת תכונת ε חלקית', category: 'partial' },
  { id: '2.2', label: 'אי-רציונליות (2x+3)/(3x+2)', score: 10, max: 12, diagnosis: 'טוב. איבדת 2 נק\' על פרט קטן', category: 'good' },
  { id: '3.1', label: 'f לא חסומה מלמטה', score: 10, max: 12, diagnosis: 'לוגיקה טובה, בלבול בטרמינולוגיה', category: 'good' },
  { id: '3.2', label: 'קיום c כך ש-f(c+h)=f(c)', score: 0, max: 13, diagnosis: '"לא בכיוון" — לא זיהית פונקציית עזר', category: 'fail' },
  { id: '4.1', label: 'f\'\'(c) < -8 דרך MVT פעמיים', score: 12, max: 12, diagnosis: 'ציון מושלם!', category: 'perfect' },
  { id: '4.2', label: 'L₁ ≤ L₂ מצפיפות Q', score: 8, max: 13, diagnosis: 'כיוון נכון, לא סגרת את הטיעון', category: 'partial' },
  { id: '5.1', label: 'cos(x) ≥ 1 - x²/2', score: 0, max: 9, diagnosis: 'לא ניסית', category: 'skip' },
  { id: '5.2', label: 'ln(n²/m²) בין 0.124 ל-0.125', score: 0, max: 9, diagnosis: 'לא ניסית', category: 'skip' },
  { id: '5.3', label: 'g=xf חסומה → f חסומה?', score: 0, max: 7, diagnosis: 'לא ניסית', category: 'skip' },
];

interface GapItem {
  gap: string;
  pointsLost: number;
  fix: string;
  priority: 'critical' | 'high' | 'medium';
}

const gaps: GapItem[] = [
  { gap: 'הוכחות משפטים לא שוננו', pointsLost: 23, fix: 'לשנן 10 משפטים עם הוכחות — ימים 1-2', priority: 'critical' },
  { gap: 'שאלה 5 לא נוסתה בכלל', pointsLost: 25, fix: 'ללמוד טכניקת אי-שוויון עם פונקציית עזר', priority: 'critical' },
  { gap: 'טכניקת פונקציית עזר חסרה', pointsLost: 13, fix: 'לתרגל: g(x)=f(x+h)-f(x) + IVT/Rolle', priority: 'critical' },
  { gap: 'צפיפות Q — טיעון לא שלם', pointsLost: 5, fix: 'לתרגל שימוש בסדרות qₙ→x מ-Q', priority: 'high' },
  { gap: 'הגדרות פורמליות חסרות', pointsLost: 2, fix: 'לכתוב כל הגדרה 3 פעמים מזיכרון', priority: 'high' },
  { gap: 'שגיאות טרמינולוגיה קטנות', pointsLost: 6, fix: 'לתרגל כתיבה נקייה עם ציון תנאים', priority: 'medium' },
];

interface TheoremItem {
  id: number;
  name: string;
  nameEn: string;
  statement: string;
  proofSketch: string;
  whyLikely: string;
  source: string;
  probability: number;
}

const theorems: TheoremItem[] = [
  {
    id: 1,
    name: 'גזירות גוררת רציפות',
    nameEn: 'Differentiability ⟹ Continuity',
    statement: 'אם f גזירה ב-x₀, אז f רציפה ב-x₀.',
    proofSketch: 'f(x) - f(x₀) = [(f(x)-f(x₀))/(x-x₀)] · (x-x₀) → f\'(x₀)·0 = 0',
    whyLikely: 'לא נבחן במועד א\' 2026. הופיע בסימולציה 2026. קצר וקלאסי.',
    source: 'הרצאה 11, סימולציה 2026 שאלה 1.1.1',
    probability: 90,
  },
  {
    id: 2,
    name: 'משפט רול',
    nameEn: 'Rolle\'s Theorem',
    statement: 'אם f רציפה על [a,b], גזירה על (a,b), ו-f(a)=f(b), אז ∃c∈(a,b) כך ש-f\'(c)=0.',
    proofSketch: 'ויירשטראס → מקס/מין. אם שניהם בקצוות → f קבועה. אחרת, נקודת קיצון פנימית → פרמה → f\'(c)=0.',
    whyLikely: 'בסיס לכל שאלות MVT. גם אם לא נשאל ישירות, הוא המנוע הפנימי של הפתרון.',
    source: 'הרצאה 17',
    probability: 85,
  },
  {
    id: 3,
    name: 'משפט לגרנז\' (ערך ממוצע)',
    nameEn: 'Lagrange MVT',
    statement: 'אם f רציפה על [a,b] וגזירה על (a,b), אז ∃c∈(a,b) כך ש-f\'(c) = (f(b)-f(a))/(b-a).',
    proofSketch: 'פונקציית עזר: g(x) = f(x) - [(f(b)-f(a))/(b-a)]·(x-a). g(a)=g(b)=0 → רול → g\'(c)=0.',
    whyLikely: 'המשפט הנגזרתי הנפוץ ביותר. בסיס ל-Lipschitz, אי-שוויונות, חסם f\'\'.',
    source: 'הרצאה 17, הופיע ב-70% מהבחינות',
    probability: 90,
  },
  {
    id: 4,
    name: 'משפט קושי לערך הממוצע',
    nameEn: 'Cauchy MVT',
    statement: 'אם f,g רציפות על [a,b], גזירות על (a,b), ו-g\'(x)≠0 לכל x∈(a,b), אז g(b)≠g(a) ו-∃c∈(a,b) כך ש-f\'(c)/g\'(c) = (f(b)-f(a))/(g(b)-g(a)).',
    proofSketch: 'שלב 1: g(b)=g(a) → רול → g\'(c)=0, סתירה. שלב 2: h(x) = f(x) - [(f(b)-f(a))/(g(b)-g(a))]·g(x). h(a)=h(b) → רול.',
    whyLikely: 'הפסדת 23 נקודות על זה במועד א\'! גם אם לא ישאלו שוב, הטכניקה חוזרת.',
    source: 'מועד א\' 2026 שאלה 1',
    probability: 60,
  },
  {
    id: 5,
    name: 'צפיפות Q ב-R',
    nameEn: 'Density of Q in R',
    statement: 'לכל a,b∈R כך ש-a<b, קיים q∈Q כך ש-a<q<b.',
    proofSketch: 'תכונת ארכימדס: ∃n∈N עם n > 1/(b-a). אז ∃m∈Z עם a < m/n < b.',
    whyLikely: 'כלי שפה קלאסי. הופיע ב-B2024 שאלה 2, ושימש במועד א\' שאלה 4.2.',
    source: 'הרצאות; B2024 שאלה 2(a)',
    probability: 85,
  },
  {
    id: 6,
    name: 'תכונת ε של sup(A)',
    nameEn: 'ε-property of sup',
    statement: 'תהי A≠∅ חסומה מלמעלה, s חסם עליון. אז s=sup(A) אמ"מ ∀ε>0 ∃a∈A: a > s-ε.',
    proofSketch: '(⟹) s-ε < s, אז s-ε לא חסם עליון → ∃a>s-ε. (⟸) ATC M<s חסם עליון. ε=s-M → ∃a>M, סתירה.',
    whyLikely: 'מועד א\' בחן inf. מועד ב\' כנראה יבחן sup או וריאציה.',
    source: 'מטלה 2 שאלה 1(ב)',
    probability: 80,
  },
  {
    id: 7,
    name: 'נגזרת של פונקציה הפוכה',
    nameEn: 'Inverse Function Derivative',
    statement: 'אם f הפיכה, גזירה ב-x₀, f\'(x₀)≠0, אז (f⁻¹)\'(y₀) = 1/f\'(x₀) כאשר y₀=f(x₀).',
    proofSketch: 'מההגדרה: (f⁻¹)\'(y₀) = lim [f⁻¹(y)-f⁻¹(y₀)]/(y-y₀) = lim (x-x₀)/(f(x)-f(x₀)) = 1/f\'(x₀).',
    whyLikely: 'הופיע ב-B2025 שאלה 2.1.2. לא הופיע במועד א\' 2026.',
    source: 'הרצאה 13; B2025',
    probability: 75,
  },
  {
    id: 8,
    name: 'משפט ערך הביניים (IVT)',
    nameEn: 'Intermediate Value Theorem',
    statement: 'אם f רציפה על [a,b] ו-k בין f(a) ל-f(b), אז ∃c∈(a,b) כך ש-f(c)=k.',
    proofSketch: 'שימוש: הגדר f, חשב ערכי קצה, הראה שהם חוסמים את k, הפעל IVT.',
    whyLikely: 'מופיע ב-70% מהבחינות. הכלי הראשי להוכחת קיום.',
    source: 'הרצאה 6',
    probability: 85,
  },
  {
    id: 9,
    name: 'משפט פרמה',
    nameEn: 'Fermat\'s Theorem',
    statement: 'אם f גזירה ב-x₀ ול-f יש קיצון מקומי ב-x₀, אז f\'(x₀)=0.',
    proofSketch: 'ההוכחה דרך בדיקת גבולות חד-צדדיים של iloraz ההפרשים.',
    whyLikely: 'כלי בסיסי בשאלות "הוכיחו שאין מינימום". הופיע בסימולציה 2026.',
    source: 'הרצאות נגזרות; סימולציה Q5.1.2',
    probability: 70,
  },
  {
    id: 10,
    name: 'משפט ויירשטראס',
    nameEn: 'Weierstrass Extreme Value',
    statement: 'אם f רציפה על [a,b], אז f מקבלת מקסימום ומינימום על [a,b].',
    proofSketch: 'משמש כטענת עזר: f רציפה + קטע סגור → חסומה + מקבלת קיצון.',
    whyLikely: 'תנאי הכרחי ל-Rolle. הופיע ב-B2025 Q4.1.',
    source: 'הרצאה 6; B2025',
    probability: 70,
  },
];

interface HWQuestion {
  id: number;
  source: string;
  title: string;
  method: string;
  whyLikely: string;
  variation: string;
  probability: number;
}

const hwQuestions: HWQuestion[] = [
  {
    id: 1, source: 'מטלה 1 שאלה 6',
    title: 'אי-רציונליות של שבר לינארי',
    method: 'נניח בשלילה שרציונלי, נפתור עבור x, נגיע לסתירה.',
    whyLikely: 'מועד א\' שאלה 2.2 כמעט זהה. דפוס חוזר ב-8/10 בחינות!',
    variation: 'ביטוי עם √, שורש שלישי, או "הוכח או הפרך".',
    probability: 90,
  },
  {
    id: 2, source: 'מטלה 2 שאלה 1(ב)',
    title: 'תכונת ε של inf/sup',
    method: '(⟹) s-ε לא חסם → ∃a. (⟸) בשלילה: M<s חסם עליון, ε=s-M → סתירה.',
    whyLikely: 'הופיע במועד א\' עם inf. מועד ב\' יבחן sup.',
    variation: 'sup במקום inf, או השוואת sup(A) ו-sup(B).',
    probability: 85,
  },
  {
    id: 3, source: 'מטלה 2 שאלה 6',
    title: 'sup/inf של קבוצה מותמרת',
    method: 'מצא מועמד → הוכח חסם עליון → הוכח תכונת ε.',
    whyLikely: 'B2024 שאלה 4 הייתה B={a/(a+3)}, חישוב sup(B). דפוס זהה.',
    variation: 'B = {f(a) : a∈A} לפונקציה f כלשהי.',
    probability: 80,
  },
  {
    id: 4, source: 'מטלה 8 שאלה 6',
    title: 'אי-חסימות מיחס גבול',
    method: 'שימוש במונוטוניות + נתון הגבול להסקת אי-חסימות.',
    whyLikely: 'מועד א\' שאלה 3.1 נבנתה על שאלה זו.',
    variation: 'גבול נתון שונה, שאלת נכון/לא נכון.',
    probability: 70,
  },
  {
    id: 5, source: 'מטלה 9 שאלה 4',
    title: 'f(1)=2 מתנאי גבול',
    method: 'ATC f(1)≠2. רציפות → δ₁. תנאי ראשון → δ₂. תנאי שני → x₁. משולש → סתירה.',
    whyLikely: 'הופיע 3 פעמים (A2024, B2025, Sim2026). לא במועד א\' 2026!',
    variation: 'נקודה וערך שונים, רציפות חד-צדדית.',
    probability: 85,
  },
  {
    id: 6, source: 'מטלה 10 שאלה 2',
    title: 'inf{x: f(x)>0} + רציפות',
    method: 's=inf{...}. ATC f(s)<0. רציפות → סביבה עם f<0 → סתירה לתכונת ε של inf.',
    whyLikely: 'זהה ל-A2022 שאלה 5. משלב inf + רציפות — קלאסי.',
    variation: 'sup{x: f(x)<0}, רציפות מימין בלבד.',
    probability: 75,
  },
  {
    id: 7, source: 'מטלה 11 שאלה 5(ב)',
    title: '|f| גזירה כש-f\'(x₀)=0',
    method: 'סנדוויץ\': 0 ≤ ||f(x)|-|f(x₀)||/|x-x₀| ≤ |f(x)-f(x₀)|/|x-x₀| → 0.',
    whyLikely: 'זהה לסימולציה 2026 שאלה 3.1. לא במועד א\'.',
    variation: 'תנאי קצת שונה, או שאלת "הוכח או הפרך".',
    probability: 70,
  },
  {
    id: 8, source: 'מטלה 12 שאלה 1',
    title: 'arctan(x)+arctan(1/x)=π/2',
    method: 'הגדר g(x)=arctan(x)+arctan(1/x). g\'(x)=0 → g קבועה. g(1)=π/2.',
    whyLikely: 'זהה ל-B2025 שאלה 3.2. אלגנטי וקצר.',
    variation: 'שימוש כשלב בתוך אי-שוויון.',
    probability: 75,
  },
  {
    id: 9, source: 'מטלה 12 שאלה 2',
    title: 'אי-שוויון דרך פונקציית עזר',
    method: 'h(x) = f(x)-g(x). h(0)=0. h\'(x) ≥ 0 → h עולה → h(x)≥0.',
    whyLikely: 'מועד א\' שאלה 5.1 שייכת למשפחה הזו. דילגת עליה!',
    variation: 'cos(x) ≥ 1-x²/2, sin(x) ≤ x, eˣ ≥ 1+x.',
    probability: 90,
  },
  {
    id: 10, source: 'מטלה 12 שאלה 4',
    title: 'חסם נגזרת שנייה דרך MVT פעמיים',
    method: 'MVT על [a,c] → f\'(c₁). MVT על [c,b] → f\'(c₂). MVT על [c₁,c₂] → f\'\'(c₃).',
    whyLikely: 'קיבלת 12/12 על שאלה כזו במועד א\'! וריאנט צפוי.',
    variation: 'סימן הפוך, חסם שונה, ערכים שונים.',
    probability: 80,
  },
];

interface Prediction {
  id: number;
  topic: string;
  probability: number;
  evidence: string;
  category: 'very-high' | 'high' | 'medium';
}

const predictions: Prediction[] = [
  { id: 1, topic: 'הגדרה פורמלית ε-δ (גבול / רציפות / גזירות)', probability: 95, evidence: '100% מהבחינות כוללות הגדרה', category: 'very-high' },
  { id: 2, topic: '"גזירות גוררת רציפות" — הוכחה', probability: 90, evidence: 'לא במועד א\'. הופיע בסימולציה. קצר.', category: 'very-high' },
  { id: 3, topic: 'הוכחת אי-רציונליות (וריאנט)', probability: 85, evidence: '90% תדירות. מועד א\' = שבר לינארי, ב\' = √ או ³√', category: 'very-high' },
  { id: 4, topic: 'sup/inf עם תכונת ε או טרנספורמציה', probability: 85, evidence: '80% תדירות. מועד א\' = inf, מועד ב\' = sup', category: 'very-high' },
  { id: 5, topic: 'IVT — הוכחת קיום (פונקציית עזר)', probability: 80, evidence: 'לא נבחן ישירות במועד א\'. חוזר ב-70% מהבחינות.', category: 'very-high' },
  { id: 6, topic: 'נגזרת פונקציה הפוכה', probability: 75, evidence: 'B2025 שאלה 2.1.2. לא במועד א\' 2026.', category: 'high' },
  { id: 7, topic: 'f(1)=2 מתנאי גבול', probability: 75, evidence: '3 הופעות (A2024, B2025, Sim2026). לא במועד א\'!', category: 'high' },
  { id: 8, topic: 'Lipschitz מחסם נגזרת: |f\'|≤M → |f(x)-f(y)|≤M|x-y|', probability: 70, evidence: 'לא במועד א\'. Sim2026 + A2025.', category: 'high' },
  { id: 9, topic: 'אי-שוויון דרך פונקציית עזר + נגזרת', probability: 85, evidence: 'מועד א\' Q5.1. דילגת. וריאנט כמעט בטוח.', category: 'very-high' },
  { id: 10, topic: '"הוכח או הפרך" — חסימות / רציפות', probability: 70, evidence: 'דפוס קלאסי של מועד ב\'.', category: 'high' },
];

interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  title: string;
  focus: string;
  blocks: { time: string; task: string; hours: number }[];
  deliverable: string;
}

const studyPlan: DayPlan[] = [
  {
    day: 1, date: '30.3', weekday: 'שני', title: 'הגדרות + שינון משפטים',
    focus: 'ביום הראשון סוגרים את הפער הכי כואב: הגדרות ומשפטים בעל פה.',
    blocks: [
      { time: '08:00-10:00', task: 'שינון כל ההגדרות הפורמליות. כתיבה 3 פעמים מזיכרון.', hours: 2 },
      { time: '10:00-12:00', task: 'שינון משפטים 1-5: גזירות⟹רציפות, Rolle, MVT, Cauchy, צפיפות Q. עם הוכחות.', hours: 2 },
      { time: '13:00-15:00', task: 'שינון משפטים 6-10: ε-sup, פונקציה הפוכה, IVT, פרמה, ויירשטראס.', hours: 2 },
      { time: '15:00-17:00', task: 'מבחן עצמי: סגור הכל, כתוב 10 משפטים + הוכחות על דף ריק. תקן.', hours: 2 },
    ],
    deliverable: 'יכולת לכתוב את כל 10 המשפטים עם הוכחות מזיכרון.',
  },
  {
    day: 2, date: '31.3', weekday: 'שלישי', title: 'תיקון טעויות מועד א\'',
    focus: 'פותרים מחדש כל שאלה שנכשלת בה במועד א\'.',
    blocks: [
      { time: '08:00-10:00', task: 'שאלה 1: הגדרת נגזרת ε-δ + הוכחת Cauchy MVT מאפס.', hours: 2 },
      { time: '10:00-12:00', task: 'שאלה 3.2: פונקציית עזר g(x)=f(x+h)-f(x) + IVT. פתרון מלא.', hours: 2 },
      { time: '13:00-15:00', task: 'שאלה 4.2: צפיפות Q + גבולות. ואז: B2022 שאלה 5 (דומה).', hours: 2 },
      { time: '15:00-17:00', task: 'שאלה 5: cos(x)≥1-x²/2, שאלת ln, דוגמה נגדית g=xf.', hours: 2 },
    ],
    deliverable: 'כל שאלות מועד א\' נפתרות נכון.',
  },
  {
    day: 3, date: '1.4', weekday: 'רביעי', title: 'שאלות בית 1-5',
    focus: 'שאלות הבית עם הסבירות הגבוהה ביותר להופיע.',
    blocks: [
      { time: '08:00-10:00', task: 'מטלה 1 שאלה 6 (אי-רציונליות) + מטלה 2 שאלה 1(ב) (ε-inf).', hours: 2 },
      { time: '10:00-12:00', task: 'מטלה 2 שאלה 6 (sup מותמר) + מטלה 8 שאלה 6 (אי-חסימות).', hours: 2 },
      { time: '13:00-15:00', task: 'מטלה 9 שאלה 4: f(1)=2 מתנאי גבול — קריטי! לתרגל משולש.', hours: 2 },
      { time: '15:00-17:00', task: 'חזרה על משפטים 1-10 מזיכרון.', hours: 2 },
    ],
    deliverable: '5 שאלות ליבה פתורות ומובנות.',
  },
  {
    day: 4, date: '2.4', weekday: 'חמישי', title: 'שאלות בית 6-10',
    focus: 'השלמת כל 10 שאלות הבית הקריטיות.',
    blocks: [
      { time: '08:00-10:00', task: 'מטלה 10 שאלה 2 (inf+רציפות) + מטלה 11 שאלה 5(ב) (|f| גזירה).', hours: 2 },
      { time: '10:00-12:00', task: 'מטלה 12 שאלה 1 (arctan) + שאלה 2 (אי-שוויון: arctan(x)<x, eˣ≥1+x, sin(x)≤x).', hours: 2 },
      { time: '13:00-15:00', task: 'מטלה 12 שאלה 4 (MVT פעמיים). פתור 2 וריאנטים מבחינות קודמות.', hours: 2 },
      { time: '15:00-17:00', task: 'יצירת כרטיס "פותחי הוכחות" — 2 שורות ראשונות לכל סוג שאלה.', hours: 2 },
    ],
    deliverable: 'כל 10 שאלות בית פתורות. כרטיס פותחי הוכחות מוכן.',
  },
  {
    day: 5, date: '3.4', weekday: 'שישי', title: 'מבחן תרגול: מועד ב\' 2025',
    focus: 'סימולציה ראשונה בתנאי בחינה.',
    blocks: [
      { time: '08:00-11:00', task: 'פתרון ExamB 2025 בתנאי בחינה. 3 שעות. 4 מתוך 5. בלי חומר.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה עצמית. ניתוח כל טעות: איזה משפט/טכניקה חסרו?', hours: 2 },
      { time: '14:00-16:00', task: 'פתרון מחדש של שאלות שנכשלו. דגש: Q2 (פונקציה הפוכה), Q3 (f(1)=2).', hours: 2 },
    ],
    deliverable: 'ציון עצמי של 70+ בסימולציה ראשונה.',
  },
  {
    day: 6, date: '4.4', weekday: 'שבת', title: 'מבחן תרגול: מועד ב\' 2024',
    focus: 'סימולציה שנייה + חיזוק חולשות.',
    blocks: [
      { time: '08:00-11:00', task: 'פתרון ExamB 2024 בתנאי בחינה.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה. דגש: Q2 (צפיפות, R\\Q צפוף), Q3 (inf+מונוטוניות), Q4 (sup של B).', hours: 2 },
      { time: '14:00-16:00', task: 'פתרון מחדש של טעויות + חזרת משפטים.', hours: 2 },
    ],
    deliverable: 'ציון עצמי 75+. זיהוי דפוסים חוזרים.',
  },
  {
    day: 7, date: '5.4', weekday: 'ראשון', title: 'מבחן תרגול: מועד ב\' 2023 + סיכום שבוע',
    focus: 'סימולציה שלישית וסיכום שבוע ראשון.',
    blocks: [
      { time: '08:00-11:00', task: 'פתרון ExamB 2023 בתנאי בחינה.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה. דגש: Q2(b) (f(c)=f(c-1) פונקציית עזר!), Q3 (sup(A\\B)).', hours: 2 },
      { time: '14:00-16:00', task: 'סיכום שבוע: 10 משפטים מזיכרון + שאלה אחת מכל קטגוריה (5 שאלות).', hours: 2 },
    ],
    deliverable: 'ציון עצמי 80+. שליטה ב-10 משפטים.',
  },
  {
    day: 8, date: '6.4', weekday: 'שני', title: 'מועד ב\' 2022 + תרגול טכניקות',
    focus: 'מבחן נוסף + חידוד טכניקות ספציפיות.',
    blocks: [
      { time: '08:00-10:30', task: 'פתרון ExamB 2022 (פורמט שונה: Parts A/B/C). דגש על True/False.', hours: 2.5 },
      { time: '10:30-12:00', task: 'בדיקה. Q4 (inf(A-B)), Q7 (קמירות), Q8 (Rolle עם H=f+g).', hours: 1.5 },
      { time: '13:00-15:00', task: 'תרגול ממוקד: 5 בעיות פונקציית עזר (Rolle, IVT, אי-שוויון, MVT, Cauchy).', hours: 2 },
      { time: '15:00-17:00', task: 'תרגול ממוקד: 3 בעיות תכונת ε (sup/inf) מבחינות שונות.', hours: 2 },
    ],
    deliverable: 'שליטה בטכניקת פונקציית עזר + תכונת ε.',
  },
  {
    day: 9, date: '7.4', weekday: 'שלישי', title: 'סימולציה 2026 + נקודות תורפה',
    focus: 'הסימולציה הכי קרובה למבחן האמיתי.',
    blocks: [
      { time: '08:00-11:00', task: 'פתרון סימולציה 2026 בתנאי בחינה.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה. Q3.1 (|f| גזירה), Q3.2 (inf=1 ⟹ B לא חסומה), Q4 (arctan + IVT).', hours: 2 },
      { time: '14:00-16:00', task: 'מיקוד ב-3 נושאים החלשים ביותר (לפי 4 מבחני תרגול). תרגול ממוקד.', hours: 2 },
    ],
    deliverable: 'ציון עצמי 85+.',
  },
  {
    day: 10, date: '8.4', weekday: 'רביעי', title: 'מועד א\' 2024+2025 — זיהוי דפוסים',
    focus: 'בחינות מועד א\' לחידוד זיהוי מהיר.',
    blocks: [
      { time: '08:00-10:30', task: 'פתרון ExamA 2025: Q1 (גבול+אי-רציונליות), Q2 (Rolle), Q4 (Lipschitz).', hours: 2.5 },
      { time: '10:30-12:00', task: 'פתרון ExamA 2024: Q2 (צפיפות), Q4 (sup/inf), Q5 (f(1)=2).', hours: 1.5 },
      { time: '13:00-15:00', task: 'תרגול זיהוי: 10 שאלות — כתוב רק 3 שורות ראשונות (זיהוי מנגנון + משפט). לא לפתור.', hours: 2 },
      { time: '15:00-17:00', task: 'חזרה על כל המשפטים מזיכרון.', hours: 2 },
    ],
    deliverable: 'זיהוי מהיר של סוג שאלה + משפט מרכזי תוך 2 דקות.',
  },
  {
    day: 11, date: '9.4', weekday: 'חמישי', title: 'סימולציה מלאה בלחץ',
    focus: 'סימולציה עם שאלות חדשות שלא תרגלת.',
    blocks: [
      { time: '08:00-11:00', task: 'בנה מבחן מ-5 שאלות: הגדרה, sup/inf, IVT/Rolle, אי-שוויון, אי-רציונליות. 3 שעות.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה עצמית. יעד: 85+.', hours: 2 },
      { time: '14:00-16:00', task: 'תרגול ממוקד על מה שנכשל בסימולציה. 3 שאלות נוספות מאותו סוג.', hours: 2 },
    ],
    deliverable: 'ציון 85+ בסימולציה עם שאלות חדשות.',
  },
  {
    day: 12, date: '10.4', weekday: 'שישי', title: '"השאלה שתמיד טועה" — חידוד',
    focus: 'יום מיקוד בחולשות ספציפיות.',
    blocks: [
      { time: '08:00-10:00', task: 'פונקציות עזר: f(c+h)=f(c), f\'(c)+f\'(d)=ערך, cos≥1-x²/2, arctan<x, eˣ≥1+x.', hours: 2 },
      { time: '10:00-12:00', task: 'צפיפות Q: מועד א\' Q4.2, B2024 Q2, A2024 Q1.', hours: 2 },
      { time: '13:00-15:00', task: 'כתיבת הגדרות: גבול, רציפות, גזירות, חסום, sup, inf, עולה, צפוף. בפחות מ-90 שניות כל אחת.', hours: 2 },
      { time: '15:00-17:00', task: 'כתיבת "גיליון פותחי הוכחות" סופי. שינון.', hours: 2 },
    ],
    deliverable: 'אפס נקודות עיוורות. שליטה ב-100% מהטכניקות.',
  },
  {
    day: 13, date: '11.4', weekday: 'שבת', title: 'סימולציה אחרונה',
    focus: 'הסימולציה האחרונה לפני המבחן.',
    blocks: [
      { time: '08:00-11:00', task: 'מבחן מלא עם השאלות הקשות ביותר שלא פתרת. 3 שעות.', hours: 3 },
      { time: '12:00-14:00', task: 'בדיקה. יעד: 90+. כל שאלה מתחת ל-20/25 — פתור מחדש.', hours: 2 },
      { time: '14:00-16:00', task: 'חזרה אחרונה על 10 משפטים. כתיבה נקייה ומלאה.', hours: 2 },
    ],
    deliverable: 'ציון 90+ בסימולציה אחרונה.',
  },
  {
    day: 14, date: '12.4', weekday: 'ראשון', title: 'ערב מבחן',
    focus: 'חזרה קלה בלבד. אסור ללמוד חומר חדש.',
    blocks: [
      { time: '08:00-10:00', task: 'קריאה קלה: כרטיס פותחי הוכחות + גיליון הגדרות.', hours: 2 },
      { time: '10:00-11:00', task: 'תרגול מהיר: 5 שאלות מיני (10 דקות כל אחת), אחת מכל קטגוריה.', hours: 1 },
      { time: '11:00-12:00', task: 'מעבר אחרון על 5 ההגדרות הכי סבירות: גבול, גזירות, רציפות, חסום, צפוף.', hours: 1 },
    ],
    deliverable: 'מנוחה. שינה מוקדמת. מוכנה למלחמה.',
  },
];

interface ExamTip {
  trigger: string;
  itIs: string;
  firstMove: string;
}

const examTips: ExamTip[] = [
  { trigger: '"הגדירו..." עם ε,δ', itIs: 'נקודות חינם — הגדרה', firstMove: 'כתוב מיד. אל תחשוב יותר מדי.' },
  { trigger: '"הוכיחו ש-f אי-רציונלי"', itIs: 'הוכחת אי-רציונליות בשלילה', firstMove: '"נניח בשלילה ש-f(x) = p/q ∈ Q..."' },
  { trigger: '"הוכיחו שקיים c כך ש-..."', itIs: 'IVT או Rolle', firstMove: '"נגדיר g(x) = ..."' },
  { trigger: '"הוכיחו ש-f(x) ≥ g(x)"', itIs: 'פונקציית עזר + נגזרת', firstMove: '"נגדיר h(x) = f(x)-g(x). h(0)=..."' },
  { trigger: '"sup/inf של B = ..."', itIs: 'תכונת ε', firstMove: '"נראה ש-s חסם עליון. לתכונת ε:..."' },
  { trigger: 'ערכי f בנקודות + חסם f\'\'', itIs: 'MVT פעמיים', firstMove: '"לפי MVT על [a,b]: f\'(c₁) = ..."' },
  { trigger: '"f(q)≤g(q) לכל q∈Q"', itIs: 'צפיפות Q', firstMove: '"יהי x∈R. לפי צפיפות, ∃qₙ→x..."' },
  { trigger: '"הוכיחו או הפריכו"', itIs: 'חשוב על דוגמה נגדית קודם', firstMove: 'בדוק: f=const, sign(x), x², |x|, 1/x' },
];

// ============================================================
// COMPONENT
// ============================================================

function getCategoryColor(cat: MoedAQuestion['category']) {
  switch (cat) {
    case 'perfect': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'good': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'partial': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'fail': return 'bg-red-100 text-red-800 border-red-300';
    case 'skip': return 'bg-gray-100 text-gray-500 border-gray-300';
  }
}

function getCategoryLabel(cat: MoedAQuestion['category']) {
  switch (cat) {
    case 'perfect': return 'מושלם';
    case 'good': return 'טוב';
    case 'partial': return 'חלקי';
    case 'fail': return 'נכשל';
    case 'skip': return 'דילוג';
  }
}

function getProbColor(prob: number) {
  if (prob >= 85) return 'bg-red-500';
  if (prob >= 70) return 'bg-orange-500';
  if (prob >= 50) return 'bg-yellow-500';
  return 'bg-gray-400';
}

function getProbBg(prob: number) {
  if (prob >= 85) return 'bg-red-50 border-red-200';
  if (prob >= 70) return 'bg-orange-50 border-orange-200';
  return 'bg-yellow-50 border-yellow-200';
}

function buildTaskHref(day: number, blockIndex: number, task: string, dayTitle: string) {
  if (task.includes('שינון כל ההגדרות')) {
    return '/battle-plan/definitions';
  }

  const params = new URLSearchParams({
    day: String(day),
    block: String(blockIndex + 1),
    dayTitle,
    task,
  });

  return `/battle-plan/task?${params.toString()}`;
}

function getPrimaryTaskSummaryResource(task: string, dayNumber: number): 'definitions' | 'homework' | 'drill' | null {
  if (task.includes('שינון כל ההגדרות') || task.includes('כתיבת הגדרות') || task.includes('הגדרות הכי סבירות')) {
    return 'definitions';
  }

  if (task.includes('מטלה') || task.includes('שאלות בית') || dayNumber === 3 || dayNumber === 4) {
    return 'homework';
  }

  if (
    task.includes('שאלה') ||
    task.includes('פתרון') ||
    task.includes('פתרון מחדש') ||
    task.includes('מבחן') ||
    task.includes('סימולציה') ||
    task.includes('תרגול')
  ) {
    return 'drill';
  }

  return null;
}

function getTaskLinkLabel(task: string) {
  if (task.includes('שינון כל ההגדרות')) return 'לכל ההגדרות';
  if (task.includes('משפטים')) return 'למשפטים של המשימה';
  if (task.includes('מטלה') || task.includes('שאלות בית')) return 'לשאלות של המשימה';
  return 'למשימה הייעודית';
}

export default function BattlePlanPage() {
  const [activeTab, setActiveTab] = useState<'autopsy' | 'predictions' | 'theorems' | 'homework' | 'plan' | 'exam'>('autopsy');
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true });
  const [expandedTheorems, setExpandedTheorems] = useState<Record<number, boolean>>({});
  const { state, isHydrated } = useBattlePlanTracker();

  const totalLost = moedAResults.reduce((s, q) => s + (q.max - q.score), 0);
  const resourceSummaries = useMemo(
    () => ({
      definitions: getTrackerResourceSummary(state, 'definitions'),
      homework: getTrackerResourceSummary(state, 'homework'),
      drill: getTrackerResourceSummary(state, 'drill'),
    }),
    [state]
  );

  const tabs = [
    { id: 'autopsy' as const, label: 'ניתוח מועד א\'', icon: <Target className="w-4 h-4" /> },
    { id: 'predictions' as const, label: 'תחזיות', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'theorems' as const, label: '10 משפטים', icon: <Brain className="w-4 h-4" /> },
    { id: 'homework' as const, label: '10 שאלות בית', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'plan' as const, label: 'תוכנית 14 יום', icon: <Calendar className="w-4 h-4" /> },
    { id: 'exam' as const, label: 'חשיבה בבחינה', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">

        {/* ─── Hero ─── */}
        <div className="bg-gradient-to-l from-red-600 via-orange-600 to-amber-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Swords className="w-8 h-8" />
            <h1 className="text-2xl font-extrabold">BATTLE PLAN — מועד ב׳ 2026</h1>
          </div>
          <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
            מסמך אסטרטגי מבוסס על ניתוח מועד א׳ שלך (46/100), הצלבה עם 10 בחינות קודמות, 12 מטלות בית, סימולציה, ותרגולים.
            <br />המטרה: למקסם את הסיכוי ל-100 במועד ב׳.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-bold">46</div>
              <div className="text-xs text-white/80">מועד א׳</div>
            </div>
            <div className="flex items-center">
              <div className="text-3xl">→</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-bold">100</div>
              <div className="text-xs text-white/80">יעד מועד ב׳</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center mr-auto">
              <div className="text-2xl font-bold">+{totalLost}</div>
              <div className="text-xs text-white/80">נקודות לשיפור</div>
            </div>
          </div>
        </div>

        {/* ─── Tab Navigation ─── */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB: Autopsy ─── */}
        {activeTab === 'autopsy' && (
          <div className="space-y-4">
            {/* Score breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  פירוט ציון מועד א׳ — 46/100
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {moedAResults.map(q => (
                  <div key={q.id} className="flex items-center gap-3 px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${getCategoryColor(q.category)}`}>
                      {getCategoryLabel(q.category)}
                    </span>
                    <span className="font-mono text-sm text-slate-500 w-8">{q.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">{q.label}</div>
                      <div className="text-xs text-slate-500">{q.diagnosis}</div>
                    </div>
                    <div className="text-left font-mono text-sm font-bold">
                      <span className={q.score === q.max ? 'text-emerald-600' : q.score === 0 ? 'text-red-500' : 'text-amber-600'}>
                        {q.score}
                      </span>
                      <span className="text-slate-400">/{q.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  5 הפערים שעלו לך 54 נקודות
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {gaps.map((g, i) => (
                  <div key={i} className={`rounded-lg border p-3 ${
                    g.priority === 'critical' ? 'bg-red-50 border-red-200' :
                    g.priority === 'high' ? 'bg-amber-50 border-amber-200' :
                    'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-800">{g.gap}</span>
                      <span className="font-mono text-sm font-bold text-red-600">-{g.pointsLost} נק׳</span>
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      {g.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What you do well */}
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
                <Award className="w-5 h-5" />
                מה אתה כבר עושה טוב
              </h3>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> MVT פעמיים → ציון מושלם 12/12 על שאלה 4.1</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> הוכחות אי-רציונליות → 10/12 על שאלה 2.2</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> מניפולציית גבולות → 10/12 על שאלה 3.1</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> הפער הוא לא ביכולת — הוא בשינון ובטכניקות</li>
              </ul>
            </div>
          </div>
        )}

        {/* ─── TAB: Predictions ─── */}
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  10 תחזיות למועד ב׳ 2026
                </h2>
                <p className="text-xs text-slate-500 mt-1">מבוסס על הצלבה עם 10 בחינות + סימולציה + 12 מטלות</p>
              </div>
              <div className="p-4 space-y-3">
                {predictions.map(p => (
                  <div key={p.id} className={`rounded-lg border p-3 ${getProbBg(p.probability)}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-800">{p.topic}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${getProbColor(p.probability)}`} style={{ width: `${p.probability}%` }} />
                        </div>
                        <span className="font-mono text-sm font-bold">{p.probability}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-600">{p.evidence}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What WON'T appear */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-slate-400" />
                סיכוי נמוך (כבר הופיע במועד א׳)
              </h3>
              <ul className="space-y-1 text-sm text-slate-500">
                <li>Cauchy MVT כשאלת הוכחה עצמאית (כבר שאלה 1)</li>
                <li>f(x)/f(-x) = -1 ואי-חסימות (כבר שאלה 3.1)</li>
                <li>f′′(c) &lt; -8 עם אותם ערכים (כבר שאלה 4.1)</li>
                <li>cos(x) ≥ 1 - x²/2 בדיוק (כבר שאלה 5.1)</li>
              </ul>
            </div>
          </div>
        )}

        {/* ─── TAB: Theorems ─── */}
        {activeTab === 'theorems' && (
          <div className="space-y-3">
            <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
              <p className="text-sm text-indigo-800 font-medium">
                <Brain className="w-4 h-4 inline ml-1" />
                10 משפטים לשינון מדויק. כל משפט צריך להיכתב מזיכרון עם הוכחה מלאה.
              </p>
            </div>
            {theorems.map(t => (
              <div key={t.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedTheorems(prev => ({ ...prev, [t.id]: !prev[t.id] }))}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 text-right">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getProbColor(t.probability)}`}>
                      {t.id}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.nameEn} — {t.probability}% סיכוי</div>
                    </div>
                  </div>
                  {expandedTheorems[t.id] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {expandedTheorems[t.id] && (
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-1">ניסוח</div>
                      <div className="text-sm text-slate-800 bg-slate-50 rounded-lg p-3 leading-relaxed" dir="rtl">{t.statement}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-1">סקיצת הוכחה</div>
                      <div className="text-sm text-slate-700 bg-blue-50 rounded-lg p-3 leading-relaxed font-mono text-xs" dir="ltr">{t.proofSketch}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-1">למה זה צפוי</div>
                      <div className="text-sm text-slate-600">{t.whyLikely}</div>
                    </div>
                    <div className="text-xs text-slate-400">מקור: {t.source}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: Homework ─── */}
        {activeTab === 'homework' && (
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <p className="text-sm text-amber-800 font-medium">
                <Flame className="w-4 h-4 inline ml-1" />
                10 שאלות מש״ב שהסיכוי שיופיעו (או דומות) הכי גבוה. פתרו כל אחת!
              </p>
            </div>
            {hwQuestions.map(q => (
              <div key={q.id} className={`bg-white rounded-xl border overflow-hidden ${getProbBg(q.probability)}`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getProbColor(q.probability)}`}>
                        {q.id}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{q.title}</div>
                        <div className="text-xs text-slate-500">{q.source}</div>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold">{q.probability}%</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold text-slate-600">שיטה: </span><span className="text-slate-700">{q.method}</span></div>
                    <div><span className="font-semibold text-slate-600">למה צפוי: </span><span className="text-slate-700">{q.whyLikely}</span></div>
                    <div><span className="font-semibold text-slate-600">וריאציה: </span><span className="text-slate-700">{q.variation}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: 14-Day Plan ─── */}
        {activeTab === 'plan' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Calendar className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-slate-900">14</div>
                <div className="text-xs text-slate-500">ימי הכנה</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                <div className="text-2xl font-bold text-slate-900">8</div>
                <div className="text-xs text-slate-500">שעות ביום</div>
              </div>
            </div>

            <ProgressAxisDashboard />

            <div className="flex flex-wrap gap-2">
              <TrackerLinkButton
                href={resourceSummaries.definitions.href}
                label={resourceSummaries.definitions.label}
                completionPct={isHydrated ? resourceSummaries.definitions.completionPct : 0}
                meta={resourceSummaries.definitions.meta}
                resource="definitions"
              />
              <TrackerLinkButton
                href={resourceSummaries.homework.href}
                label={resourceSummaries.homework.label}
                completionPct={isHydrated ? resourceSummaries.homework.completionPct : 0}
                meta={resourceSummaries.homework.meta}
                resource="homework"
              />
              <TrackerLinkButton
                href={resourceSummaries.drill.href}
                label={resourceSummaries.drill.label}
                completionPct={isHydrated ? resourceSummaries.drill.completionPct : 0}
                meta={resourceSummaries.drill.meta}
                resource="drill"
              />
              <TrackerLinkButton
                href="/battle-plan/tips"
                label="טיפים זהב"
                resource="tips"
              />
            </div>

            {studyPlan.map(day => {
              return (
                <div key={day.day} className={`bg-white rounded-xl border overflow-hidden ${
                  day.day <= 4 ? 'border-red-200' : day.day <= 7 ? 'border-amber-200' : day.day <= 13 ? 'border-blue-200' : 'border-emerald-200'
                }`}>
                  <button
                    onClick={() => setExpandedDays(prev => ({ ...prev, [day.day]: !prev[day.day] }))}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-right">
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        day.day <= 4 ? 'bg-red-500' : day.day <= 7 ? 'bg-amber-500' : day.day <= 13 ? 'bg-blue-500' : 'bg-emerald-500'
                      }`}>
                        {day.day}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">{day.title}</div>
                        <div className="text-xs text-slate-500">{day.weekday} {day.date} | {day.blocks.reduce((s, b) => s + b.hours, 0)} שעות</div>
                      </div>
                    </div>
                    {expandedDays[day.day] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {expandedDays[day.day] && (
                    <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                      <p className="text-sm text-slate-600 italic">{day.focus}</p>

                      <div className="space-y-2">
                        {day.blocks.map((block, i) => {
                          const taskHref = buildTaskHref(day.day, i, block.task, day.title);
                          const summaryResource = getPrimaryTaskSummaryResource(block.task, day.day);
                          const summary = summaryResource ? resourceSummaries[summaryResource] : null;

                          return (
                            <div key={i} className="flex gap-3 text-sm">
                              <span className="font-mono text-xs text-slate-400 w-24 flex-shrink-0 pt-0.5" dir="ltr">{block.time}</span>
                              <div className="flex-1">
                                <div className="text-slate-700">{block.task}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <Link
                                    href={taskHref}
                                    className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
                                  >
                                    <span>{getTaskLinkLabel(block.task)}</span>
                                    {summary && (
                                      <span className="text-slate-400">
                                        {isHydrated ? summary.completionPct : 0}% · {summary.meta}
                                      </span>
                                    )}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-emerald-50 rounded-lg p-3 text-sm text-emerald-800 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">תוצר: </span>{day.deliverable}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ─── TAB: Exam Thinking ─── */}
        {activeTab === 'exam' && (
          <div className="space-y-4">
            {/* Quick identification */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-500" />
                  זיהוי מהיר — אם רואים... אז זה...
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {examTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-3 text-sm">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{tip.trigger}</div>
                      <div className="text-slate-500 text-xs">{tip.itIs}</div>
                    </div>
                    <div className="bg-indigo-50 text-indigo-800 rounded-lg px-3 py-1 text-xs font-mono flex-shrink-0 flex items-center max-w-[200px]" dir="rtl">
                      {tip.firstMove}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time management */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-500" />
                חלוקת זמן בבחינה (3 שעות)
              </h3>
              <div className="space-y-2">
                {[
                  { time: '0:00–0:10', task: 'קרא את כל 5 השאלות. בחר 4. סמן.', color: 'bg-purple-100 text-purple-800' },
                  { time: '0:10–0:50', task: 'שאלה 1 (הכי קלה שלך)', color: 'bg-blue-100 text-blue-800' },
                  { time: '0:50–1:30', task: 'שאלה 2', color: 'bg-blue-100 text-blue-800' },
                  { time: '1:30–2:10', task: 'שאלה 3', color: 'bg-blue-100 text-blue-800' },
                  { time: '2:10–2:50', task: 'שאלה 4', color: 'bg-blue-100 text-blue-800' },
                  { time: '2:50–3:00', task: 'ביקורת: תנאים, חילוק באפס, אי-ריקות', color: 'bg-amber-100 text-amber-800' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono text-xs w-20 text-slate-500 flex-shrink-0" dir="ltr">{item.time}</span>
                    <span className={`text-sm px-3 py-1.5 rounded-lg ${item.color} flex-1`}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical mistakes */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-4">
              <h3 className="font-bold text-red-800 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5" />
                טעויות קריטיות להימנע (מהמועד א׳ שלך)
              </h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>אל תכתוב &quot;ברור ש-&quot; — הבודק הוריד נקודות על זה ב-Q4.2</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>תמיד ציין תנאי משפט לפני שימוש: &quot;מכיוון ש-f רציפה על [a,b] וגזירה על (a,b), לפי MVT...&quot;</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>לפני חילוק — הוכח שהמכנה לא אפס (Cauchy MVT: g(b)≠g(a))</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>בפונקציית עזר — בדוק את שני הקצוות: h(a)=?, h(b)=?</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>אל תבלבל &quot;לא חסומה מלמעלה&quot; עם &quot;לא חסומה מלמטה&quot; (עלה לך 2 נק׳ ב-Q3.1)</span></li>
                <li className="flex items-start gap-2"><XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> <span>ב-&quot;הוכח או הפרך&quot;: נסה דוגמה נגדית קודם! f=const, sign(x), x², |x|, 1/x, sin(1/x)</span></li>
              </ul>
            </div>

            {/* When to skip */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5" />
                מתי לדלג על שאלה
              </h3>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• לא מזהה את מנגנון השאלה אחרי 3 דקות</li>
                <li>• תקוע יותר מ-8 דקות בלי מבנה</li>
                <li>• השאלה דורשת טריק שלא עולה</li>
                <li>• <strong>חזור רק אחרי שסגרת 3 שאלות יציבות!</strong></li>
              </ul>
            </div>

            {/* Selection strategy */}
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5" />
                אסטרטגיית בחירת שאלות
              </h3>
              <ol className="space-y-1 text-sm text-emerald-700 list-decimal list-inside">
                <li>תמיד תענה על שאלת ההגדרה — גם 2 נקודות זה חינם</li>
                <li>תמיד תענה על הסוג הכי חזק שלך — MVT / הוכחות אלגבריות</li>
                <li>דלג על השאלה עם הטריק הלא מוכר</li>
                <li>עדיף 25+25+25+25 על 4 שאלות מאשר 20+15+15+10 על 4 שאלות</li>
              </ol>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
