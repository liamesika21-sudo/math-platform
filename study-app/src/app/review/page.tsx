'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import {
  Crosshair,
  AlertTriangle,
  BookOpen,
  Target,
  Calculator,
  Zap,
  ChevronDown,
  ChevronUp,
  Printer,
  ArrowUp,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: 'rules', title: 'כללי מבחן', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'limits', title: 'גבולות', icon: <Target className="w-4 h-4" /> },
  { id: 'sequences', title: 'סדרות', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'continuity', title: 'רציפות', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'derivatives', title: 'נגזרות', icon: <Calculator className="w-4 h-4" /> },
  { id: 'taylor', title: 'טיילור', icon: <Calculator className="w-4 h-4" /> },
  { id: 'series', title: 'טורים', icon: <Target className="w-4 h-4" /> },
  { id: 'strategy', title: 'אסטרטגיית מבחן', icon: <Zap className="w-4 h-4" /> },
  { id: 'cheatsheet', title: 'דף נוסחאות', icon: <Printer className="w-4 h-4" /> },
];

export default function ReviewPage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['rules']));

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openAll = () => setOpenSections(new Set(sections.map(s => s.id)));
  const closeAll = () => setOpenSections(new Set());

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Crosshair className="w-6 h-6 text-green-600" />
              חזרה למבחן — אינפי 1
            </h1>
            <p className="text-gray-500">סיכום מלא של כל הנושאים + טיפים למבחן</p>
          </div>
          <div className="flex gap-2 no-print">
            <button onClick={openAll} className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
              פתח הכל
            </button>
            <button onClick={closeAll} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              סגור הכל
            </button>
            <button onClick={() => window.print()} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Critical Alert */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 exam-alert">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900">כללי זהב למבחן</h3>
              <ul className="text-sm text-red-800 mt-2 space-y-1 list-disc list-inside">
                <li>תשובה ללא הנמקה = 0 נקודות</li>
                <li>נמקו כל שלב — ציינו את שם המשפט/כלל שאתם משתמשים בו</li>
                <li>בדקו תנאים לפני השימוש במשפט (למשל: גזירות, רציפות)</li>
                <li>אם נתקעתם — עברו לשאלה הבאה וחזרו אח&quot;כ</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 no-print">
          <h3 className="font-semibold text-gray-900 mb-3">ניווט מהיר</h3>
          <div className="flex flex-wrap gap-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  if (!openSections.has(s.id)) toggleSection(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                {s.icon}
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* === SECTIONS === */}

        {/* Limits */}
        <ReviewSection id="limits" title="גבולות" isOpen={openSections.has('limits')} onToggle={() => toggleSection('limits')}>
          <div className="space-y-4">
            <DefinitionBlock title="הגדרת גבול (ε-δ)">
              {`lim(x→a) f(x) = L אם לכל ε>0 קיים δ>0 כך ש:
0 < |x-a| < δ  →  |f(x)-L| < ε`}
            </DefinitionBlock>
            <DefinitionBlock title="גבול באינסוף">
              {`lim(x→∞) f(x) = L אם לכל ε>0 קיים M כך ש:
x > M  →  |f(x)-L| < ε`}
            </DefinitionBlock>
            <TheoremBlock title="משפט היינה">
              {`lim(x→a) f(x) = L  ⟺  לכל סדרה xₙ→a (xₙ≠a) מתקיים f(xₙ)→L
שימוש עיקרי: שלילת קיום גבול — מצא שתי סדרות עם גבולות שונים.`}
            </TheoremBlock>
            <TheoremBlock title="כלל לופיטל">
              {`אם lim f(x)/g(x) הוא מסוג 0/0 או ∞/∞, ו-lim f'(x)/g'(x) קיים, אז:
lim f(x)/g(x) = lim f'(x)/g'(x)

צורות נוספות (המרה):
• 0·∞: כתוב כ-f/(1/g) → 0/0 או ∞/∞
• ∞-∞: צמצם למנה משותפת
• 1^∞, 0^0, ∞^0: השתמש ב-e^(ln(...)) → e^(lim g·ln f)`}
            </TheoremBlock>
            <TechniqueBlock title="גבולות חשובים לשינון">
              {`lim(x→0) sin(x)/x = 1
lim(n→∞) (1+1/n)^n = e
lim(x→0) (e^x - 1)/x = 1
lim(x→0) ln(1+x)/x = 1
lim(x→0) (1-cos x)/x² = 1/2
lim(x→∞) (1+a/x)^(bx) = e^(ab)`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Sequences */}
        <ReviewSection id="sequences" title="סדרות" isOpen={openSections.has('sequences')} onToggle={() => toggleSection('sequences')}>
          <div className="space-y-4">
            <DefinitionBlock title="התכנסות סדרה">
              {`aₙ → L אם לכל ε>0 קיים N∈ℕ כך ש:
n > N  →  |aₙ - L| < ε`}
            </DefinitionBlock>
            <TheoremBlock title="סדרה מונוטונית וחסומה">
              {`סדרה מונוטונית עולה וחסומה מלעיל → מתכנסת
סדרה מונוטונית יורדת וחסומה מלרע → מתכנסת`}
            </TheoremBlock>
            <TheoremBlock title="בולצאנו-ויירשטראס">
              {`כל סדרה חסומה מכילה תת-סדרה מתכנסת.`}
            </TheoremBlock>
            <TheoremBlock title="קריטריון קושי">
              {`סדרה מתכנסת ⟺ לכל ε>0 קיים N כך ש-m,n>N → |aₘ-aₙ|<ε`}
            </TheoremBlock>
            <TechniqueBlock title="סדרה רקורסיבית aₙ₊₁ = f(aₙ)">
              {`1. הנח שהגבול L קיים → פתור L = f(L)
2. הוכח מונוטוניות (אינדוקציה): aₙ₊₁ ≥ aₙ או ≤
3. הוכח חסימות (אינדוקציה): aₙ ≤ M
4. מסקנה: מתכנסת למונוטונית וחסומה → L`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Continuity */}
        <ReviewSection id="continuity" title="רציפות" isOpen={openSections.has('continuity')} onToggle={() => toggleSection('continuity')}>
          <div className="space-y-4">
            <DefinitionBlock title="רציפות בנקודה">
              {`f רציפה ב-a אם lim(x→a) f(x) = f(a)
שלושה תנאים: (1) f(a) מוגדר (2) הגבול קיים (3) שווים`}
            </DefinitionBlock>
            <DefinitionBlock title="רציפות במידה שווה (רב״ש)">
              {`f רב"ש בקטע I אם לכל ε>0 קיים δ>0 כך ש:
|x-y| < δ  →  |f(x)-f(y)| < ε
(δ תלוי רק ב-ε, לא בנקודה!)`}
            </DefinitionBlock>
            <TheoremBlock title="משפט ערך הביניים (IVT)">
              {`f רציפה ב-[a,b], f(a) < c < f(b) → קיים ξ∈(a,b) כך ש-f(ξ) = c
שימוש: הוכחת קיום שורש — הראה f(a)·f(b) < 0`}
            </TheoremBlock>
            <TheoremBlock title="משפט ערכי הקיצון (EVT)">
              {`f רציפה ב-[a,b] → f מקבלת מקסימום ומינימום (מוחלטים) בקטע.`}
            </TheoremBlock>
            <TheoremBlock title="קנטור">
              {`f רציפה בקטע סגור וחסום [a,b] → f רב"ש ב-[a,b]`}
            </TheoremBlock>
            <TechniqueBlock title="שלילת רב״ש">
              {`מצא סדרות xₙ, yₙ כך ש:
|xₙ - yₙ| → 0  אבל  |f(xₙ) - f(yₙ)| ≥ ε₀ > 0
דוגמה: f(x) = sin(1/x) על (0,1)`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Derivatives */}
        <ReviewSection id="derivatives" title="נגזרות ויישומים" isOpen={openSections.has('derivatives')} onToggle={() => toggleSection('derivatives')}>
          <div className="space-y-4">
            <DefinitionBlock title="הגדרת הנגזרת">
              {`f'(a) = lim(h→0) [f(a+h) - f(a)] / h = lim(x→a) [f(x) - f(a)] / (x-a)
גזירה ב-a → רציפות ב-a (אבל לא ההפך!)`}
            </DefinitionBlock>
            <TheoremBlock title="משפט רול">
              {`f רציפה ב-[a,b], גזירה ב-(a,b), f(a)=f(b)
→ קיים c∈(a,b) כך ש-f'(c) = 0`}
            </TheoremBlock>
            <TheoremBlock title="משפט הערך הממוצע (MVT / לגראנז')">
              {`f רציפה ב-[a,b], גזירה ב-(a,b)
→ קיים c∈(a,b) כך ש-f'(c) = [f(b)-f(a)] / (b-a)

יישומים:
• הוכחת אי-שוויונות: f'(c) ≥ m → f(b)-f(a) ≥ m(b-a)
• f'=0 בקטע → f קבועה
• f'>0 בקטע → f עולה ממש`}
            </TheoremBlock>
            <TechniqueBlock title="חקירת פונקציה">
              {`1. תחום הגדרה + סימטריה (זוגית/אי-זוגית)
2. f'(x) = 0 → נקודות חשודות לקיצון
3. f''(x): חיובי = קעורה למעלה, שלילי = קעורה למטה
4. f''(x₀) = 0 + שינוי סימן → נקודת פיתול
5. אסימפטוטות: אנכיות (מכנה=0), אופקיות (x→±∞), משופעות`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Taylor */}
        <ReviewSection id="taylor" title="טיילור" isOpen={openSections.has('taylor')} onToggle={() => toggleSection('taylor')}>
          <div className="space-y-4">
            <DefinitionBlock title="פולינום טיילור">
              {`Pₙ(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)/k! · (x-a)ᵏ
(מקלורן: a=0)`}
            </DefinitionBlock>
            <TheoremBlock title="שארית לגראנז'">
              {`Rₙ(x) = f⁽ⁿ⁺¹⁾(c)/(n+1)! · (x-a)ⁿ⁺¹   לעבור c בין a ו-x
f(x) = Pₙ(x) + Rₙ(x)`}
            </TheoremBlock>
            <TechniqueBlock title="פיתוחי מקלורן חשובים (לשינון!)">
              {`e^x = 1 + x + x²/2! + x³/3! + ...  = Σ xⁿ/n!

sin x = x - x³/3! + x⁵/5! - ...  = Σ (-1)ⁿ x²ⁿ⁺¹/(2n+1)!

cos x = 1 - x²/2! + x⁴/4! - ...  = Σ (-1)ⁿ x²ⁿ/(2n)!

ln(1+x) = x - x²/2 + x³/3 - ...  = Σ (-1)ⁿ⁺¹ xⁿ/n   (|x|≤1, x≠-1)

1/(1-x) = 1 + x + x² + x³ + ...  = Σ xⁿ   (|x|<1)

arctan x = x - x³/3 + x⁵/5 - ...  = Σ (-1)ⁿ x²ⁿ⁺¹/(2n+1)   (|x|≤1)`}
            </TechniqueBlock>
            <TechniqueBlock title="חישוב גבול עם טיילור">
              {`1. זהה את הנקודה (בד"כ x→0)
2. פתח כל פונקציה לטיילור עד הסדר הנדרש
3. פשט (צמצם מונים משותפים)
4. כתוב את התשובה`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Series */}
        <ReviewSection id="series" title="טורים" isOpen={openSections.has('series')} onToggle={() => toggleSection('series')}>
          <div className="space-y-4">
            <DefinitionBlock title="התכנסות טור">
              {`Σaₙ מתכנס אם סדרת הסכומים החלקיים Sₙ = a₁+a₂+...+aₙ מתכנסת.
תנאי הכרחי: Σaₙ מתכנס → aₙ→0 (אבל ההפך לא נכון! דוגמה: Σ1/n)`}
            </DefinitionBlock>
            <TheoremBlock title="מבחני התכנסות — טבלה מלאה">
              {`מבחן דלמבר (מנה): L = lim|aₙ₊₁/aₙ|
  L < 1 → מתכנס מוחלט | L > 1 → מתבדר | L = 1 → לא מכריע
  טוב ל: עצרות, חזקות של n

מבחן קושי (שורש): L = lim|aₙ|^(1/n)
  L < 1 → מתכנס | L > 1 → מתבדר | L = 1 → לא מכריע
  טוב ל: ביטויים עם חזקה n

מבחן ההשוואה: 0 ≤ aₙ ≤ bₙ
  Σbₙ מתכנס → Σaₙ מתכנס

מבחן ההשוואה הגבולי: lim(aₙ/bₙ) = L (0<L<∞)
  → שניהם מתכנסים/מתבדרים

מבחן לייבניץ (טור מתחלף): aₙ↓0 מונוטונית
  → Σ(-1)ⁿaₙ מתכנס

מבחן האינטגרל: f חיובית, יורדת
  Σf(n) מתכנס ⟺ ∫f(x)dx מתכנס

טור p: Σ1/nᵖ מתכנס ⟺ p > 1`}
            </TheoremBlock>
            <TechniqueBlock title="טורי חזקות — רדיוס התכנסות">
              {`Σaₙxⁿ: רדיוס התכנסות R = 1/lim sup|aₙ|^(1/n)
או: R = lim|aₙ/aₙ₊₁| (אם הגבול קיים)

• |x| < R → מתכנס מוחלט
• |x| > R → מתבדר
• |x| = R → בדוק כל קצה בנפרד!`}
            </TechniqueBlock>
          </div>
        </ReviewSection>

        {/* Exam Strategy */}
        <ReviewSection id="strategy" title="אסטרטגיית מבחן" isOpen={openSections.has('strategy')} onToggle={() => toggleSection('strategy')}>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-3">סדר מומלץ לפתרון המבחן</h4>
              <ol className="text-sm text-green-800 space-y-2 list-decimal list-inside">
                <li><strong>סקירה ראשונה (5 דק):</strong> קרא את כל השאלות, סמן קלות/בינוניות/קשות</li>
                <li><strong>שאלות קלות קודם:</strong> תגמור את מה שאתה בטוח בו</li>
                <li><strong>הגדרות:</strong> נקודות קלות — ענה עליהן מיד (2-3 נקודות)</li>
                <li><strong>שאלות טיילור/גבולות/טורים:</strong> השתמש בפיתוחים ומבחנים ידועים</li>
                <li><strong>שאלות הוכחה:</strong> השאר לסוף אם יש זמן</li>
              </ol>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-bold text-amber-900 mb-3">טעויות נפוצות — הימנע!</h4>
              <ul className="text-sm text-amber-800 space-y-2 list-disc list-inside">
                <li>שימוש בלופיטל בלי לבדוק שזה 0/0 או ∞/∞</li>
                <li>שימוש ב-MVT בלי לבדוק רציפות + גזירות</li>
                <li>בטור: aₙ→0 לא מספיק להתכנסות!</li>
                <li>בטיילור: שכחת שארית / שימוש בפיתוח בסדר לא מספיק</li>
                <li>ברב"ש: δ לא צריך לתלות בנקודה — רק ב-ε</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-3">ניהול זמן</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>מבחן 3 שעות, 6 שאלות → בממוצע 30 דק לשאלה</li>
                <li>שאלות קלות: 15-20 דק, שאלות קשות: 35-40 דק</li>
                <li>השאר 10 דק לבדיקה בסוף</li>
                <li>אם נתקעת ביותר מ-10 דק — עבור הלאה!</li>
              </ul>
            </div>
          </div>
        </ReviewSection>

        {/* Cheat Sheet */}
        <ReviewSection id="cheatsheet" title="דף נוסחאות מרוכז" isOpen={openSections.has('cheatsheet')} onToggle={() => toggleSection('cheatsheet')}>
          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto" dir="ltr">
            <pre>{`╔══════════════════════════════════════════════════╗
║              CALCULUS 1 — CHEAT SHEET            ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  DERIVATIVES:                                    ║
║  (xⁿ)' = nxⁿ⁻¹    (eˣ)' = eˣ                  ║
║  (sin x)' = cos x   (cos x)' = -sin x           ║
║  (ln x)' = 1/x      (tan x)' = 1/cos²x         ║
║  (arcsin x)' = 1/√(1-x²)                        ║
║  (arctan x)' = 1/(1+x²)                         ║
║  (fg)' = f'g + fg'  (f/g)' = (f'g-fg')/g²      ║
║  (f∘g)' = f'(g)·g'  (f⁻¹)'(y) = 1/f'(x)       ║
║                                                  ║
║  KEY LIMITS:                                     ║
║  sin(x)/x → 1       (1+1/n)ⁿ → e               ║
║  (eˣ-1)/x → 1       ln(1+x)/x → 1              ║
║  (1-cos x)/x² → 1/2  (1+a/x)^(bx) → e^(ab)    ║
║                                                  ║
║  TAYLOR (at x=0):                                ║
║  eˣ = Σ xⁿ/n!                                   ║
║  sin x = x - x³/3! + x⁵/5! - ...               ║
║  cos x = 1 - x²/2! + x⁴/4! - ...               ║
║  ln(1+x) = x - x²/2 + x³/3 - ...               ║
║  1/(1-x) = 1 + x + x² + ...  (|x|<1)           ║
║  arctan x = x - x³/3 + x⁵/5 - ...              ║
║                                                  ║
║  SERIES TESTS:                                   ║
║  Ratio: lim|aₙ₊₁/aₙ| < 1 → converges           ║
║  Root:  lim|aₙ|^(1/n) < 1 → converges           ║
║  Comparison: 0≤aₙ≤bₙ, Σbₙ conv → Σaₙ conv     ║
║  Limit comp: lim(aₙ/bₙ)=L>0 → same behavior    ║
║  Leibniz: aₙ↓0 → Σ(-1)ⁿaₙ converges            ║
║  p-series: Σ1/nᵖ conv ⟺ p > 1                  ║
║  Radius: R = 1/lim sup|aₙ|^(1/n)                ║
║                                                  ║
║  THEOREMS:                                       ║
║  IVT: f cont [a,b] → attains all values         ║
║  EVT: f cont [a,b] → attains max & min          ║
║  Cantor: f cont [a,b] → unif. continuous         ║
║  MVT: ∃c: f'(c) = (f(b)-f(a))/(b-a)            ║
║  Rolle: f(a)=f(b) → ∃c: f'(c)=0                ║
║  Cauchy: [f(b)-f(a)]/[g(b)-g(a)] = f'(c)/g'(c) ║
║  B-W: bounded seq → convergent subsequence       ║
║  Mon+Bnd → convergent sequence                   ║
╚══════════════════════════════════════════════════╝`}</pre>
          </div>
        </ReviewSection>

        {/* Back to top */}
        <div className="text-center no-print">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            חזרה למעלה
          </button>
        </div>
      </div>
    </Layout>
  );
}

// Helper Components
function ReviewSection({ id, title, isOpen, onToggle, children }: {
  id: string; title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div id={id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="border-t border-gray-100 p-4">{children}</div>}
    </div>
  );
}

function DefinitionBlock({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h4 className="font-semibold text-blue-800 mb-1 text-sm">{title}</h4>
      <div className="verbatim-text text-sm whitespace-pre-wrap">{children}</div>
    </div>
  );
}

function TheoremBlock({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h4 className="font-semibold text-pink-800 mb-1 text-sm">{title}</h4>
      <div className="bg-pink-50 p-3 rounded-md text-sm whitespace-pre-wrap" style={{ borderRight: '3px solid #ec4899' }}>
        {children}
      </div>
    </div>
  );
}

function TechniqueBlock({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h4 className="font-semibold text-amber-800 mb-1 text-sm">{title}</h4>
      <div className="bg-amber-50 p-3 rounded-md text-sm whitespace-pre-wrap" style={{ borderRight: '3px solid #f59e0b' }}>
        {children}
      </div>
    </div>
  );
}
