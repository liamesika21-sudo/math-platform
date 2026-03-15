'use client';

// =============================================
// Print-Friendly Summary: Infi Weeks 10-12
// Lectures 19-23, Recitations 10-13
// =============================================

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-100 px-1 rounded text-sm print:bg-transparent">{children}</span>;
}

function Def({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-blue-700">הגדרה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Thm({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-green-600 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-green-700">משפט:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Lemma({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-teal-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-teal-700">למה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Claim({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-emerald-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-emerald-700">טענה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Corollary({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-orange-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-orange-700">מסקנה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Proof({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded p-3 text-sm space-y-2 print:break-inside-avoid print:bg-white print:border-gray-300">
      <div className="font-bold text-gray-700 text-xs mb-1">הוכחה:</div>
      {children}
      <div className="text-left font-bold text-gray-500">&#8718;</div>
    </div>
  );
}

function Remark({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-amber-400 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1 text-amber-700">הערה:</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Example({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-cyan-500 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="text-cyan-700">דוגמה:</span> {title}</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-bold border-b-2 border-gray-400 pb-1 mt-8 mb-4 print:break-after-avoid">
      {title}
    </h2>
  );
}

// =============================================
// Main Print Page
// =============================================

export default function PrintWeeks10to12Page() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 11pt; }
          * { box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          h2 { page-break-after: avoid; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          .print\\:bg-white { background: white !important; }
          .print\\:bg-transparent { background: transparent !important; }
          .print\\:border-gray-300 { border-color: #d1d5db !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div dir="rtl" className="print-page max-w-4xl mx-auto p-6 bg-white text-black space-y-2">

        {/* Print Button */}
        <div className="no-print flex justify-between items-center mb-4">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
          >
            הדפס עמוד
          </button>
          <a href="/" className="text-indigo-600 underline text-sm">חזרה לעמוד הראשי</a>
        </div>

        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-2xl font-bold">סיכום נגזרות ומשפטי ערך הביניים — גרסת הדפסה</h1>
          <p className="text-gray-600 mt-1">חשבון אינפיניטסימלי 1 — שבועות 10–12 (הרצאות 19–23, תרגולים 10–13)</p>
        </div>

        {/* ================================================== */}
        {/* LECTURE 19: Derivative Definition & Basic Rules */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 19: הגדרת הנגזרת וכללי גזירה" />

        <Def title="נגזרת של פונקציה בנקודה">
          <p>תהי <M>f</M> פונקציה המוגדרת בסביבה של <M>x₀ ∈ ℝ</M>.</p>
          <p>נאמר ש-f <strong>גזירה</strong> (דיפרנציאבילית) ב-<M>x₀</M> אם קיים הגבול:</p>
          <p className="text-center font-mono mt-1">f&apos;(x₀) = lim_{'{x→x₀}'} [f(x) − f(x₀)] / (x − x₀)</p>
          <p>סימון שקול: <M>f&apos;(x₀) = lim_{'{h→0}'} [f(x₀+h) − f(x₀)] / h</M></p>
        </Def>

        <Example title="חישוב נגזרת מההגדרה: f(x) = √x">
          <p>עבור <M>x₀ {'>'} 0</M>:</p>
          <p className="text-center font-mono">lim_{'{h→0}'} [√(x₀+h) − √x₀] / h = lim_{'{h→0}'} h / [h(√(x₀+h) + √x₀)] = 1/(2√x₀)</p>
        </Example>

        <Thm title="נגזרות בסיסיות (מההגדרה)">
          <p><strong>(i)</strong> <M>(x)&apos; = 1</M></p>
          <p><strong>(ii)</strong> <M>(C)&apos; = 0</M> לכל קבוע <M>C</M></p>
          <p><strong>(iii)</strong> <M>(sin x)&apos; = cos x</M></p>
          <p><strong>(iv)</strong> <M>(cos x)&apos; = −sin x</M></p>
          <p><strong>(v)</strong> <M>(ln x)&apos; = 1/x</M> לכל <M>x {'>'} 0</M></p>
          <Proof>
            <p><strong>(iii) הוכחת (sin x)&apos;:</strong></p>
            <p className="text-center font-mono">[sin(x₀+h) − sin(x₀)] / h = [2·cos((2x₀+h)/2)·sin(h/2)] / h</p>
            <p className="text-center font-mono">= cos(x₀ + h/2) · sin(h/2)/(h/2) → cos(x₀) · 1 = cos(x₀)</p>
            <p className="mt-2"><strong>(v) הוכחת (ln x)&apos;:</strong></p>
            <p className="text-center font-mono">[ln(x₀+h) − ln(x₀)] / h = ln((x₀+h)/x₀) / h = ln(1 + h/x₀) / h</p>
            <p>נציב <M>t = h/x₀</M>:</p>
            <p className="text-center font-mono">= ln(1+t) / (t·x₀) = [1/x₀] · ln(1+t)/t → 1/x₀</p>
          </Proof>
        </Thm>

        <Thm title="גזירות ← רציפות">
          <p>אם f גזירה ב-<M>x₀</M>, אזי f רציפה ב-<M>x₀</M>.</p>
          <Proof>
            <p className="text-center font-mono">lim_{'{x→x₀}'} f(x) = lim_{'{x→x₀}'} [(f(x)−f(x₀))/(x−x₀) · (x−x₀) + f(x₀)]</p>
            <p className="text-center font-mono">= f&apos;(x₀) · 0 + f(x₀) = f(x₀)</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>ההפך לא נכון!</strong> פונקציה יכולה להיות רציפה אך לא גזירה.</p>
          <p><strong>דוגמה:</strong> <M>f(x) = |x|</M> רציפה ב-0 אך לא גזירה ב-0 (הנגזרות החד-צדדיות שונות: <M>1 ≠ −1</M>).</p>
          <p><strong>דוגמאות נוספות:</strong> <M>D(x)</M> (פונקציית דיריכלה) לא גזירה ב-0; <M>sign(x)</M> לא גזירה ב-0.</p>
        </Remark>

        <Thm title="כללי אריתמטיקה של נגזרות">
          <p>יהיו <M>f, g</M> גזירות ב-<M>x₀</M>. אזי:</p>
          <p><strong>(i) חיבור/חיסור:</strong> <M>(f ± g)&apos;(x₀) = f&apos;(x₀) ± g&apos;(x₀)</M></p>
          <p><strong>(ii) כפל (לייבניץ):</strong> <M>(f·g)&apos;(x₀) = f&apos;(x₀)·g(x₀) + f(x₀)·g&apos;(x₀)</M></p>
          <p><strong>(iii) חילוק:</strong> <M>(f/g)&apos;(x₀) = [f&apos;(x₀)·g(x₀) − f(x₀)·g&apos;(x₀)] / g²(x₀)</M>, בתנאי <M>g(x₀) ≠ 0</M></p>
          <Proof>
            <p><strong>(ii) הוכחת כלל המכפלה:</strong></p>
            <p className="text-center font-mono">lim [f(x)g(x) − f(x₀)g(x₀)] / (x−x₀)</p>
            <p>מוסיפים וגורעים <M>f(x)·g(x₀)</M>:</p>
            <p className="text-center font-mono">= lim [f(x)·(g(x)−g(x₀)) + g(x₀)·(f(x)−f(x₀))] / (x−x₀)</p>
            <p className="text-center font-mono">= f(x₀)·g&apos;(x₀) + g(x₀)·f&apos;(x₀)</p>
            <p>(כי <M>f(x) → f(x₀)</M> מגזירות ← רציפות)</p>
            <p className="mt-2"><strong>(iii) הוכחת כלל החילוק:</strong></p>
            <p>תחילה נוכיח ש-<M>(1/g)&apos;(x₀) = −g&apos;(x₀)/g²(x₀)</M>:</p>
            <p className="text-center font-mono">[1/g(x) − 1/g(x₀)] / (x−x₀) = [g(x₀)−g(x)] / [(x−x₀)·g(x)·g(x₀)]</p>
            <p className="text-center font-mono">→ −g&apos;(x₀) / g²(x₀)</p>
            <p>ואז <M>(f/g)&apos; = (f · (1/g))&apos;</M> מכלל המכפלה.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 1 — (c·f)&apos; = c·f&apos;">
          <p>לכל קבוע <M>c ∈ ℝ</M> ופונקציה f גזירה: <M>(c·f)&apos;(x₀) = c·f&apos;(x₀)</M>.</p>
        </Corollary>

        <Corollary title="מסקנה 2 — (xⁿ)&apos; = n·xⁿ⁻¹ (עבור n ∈ ℕ)">
          <p>לכל <M>n ∈ ℕ</M> ולכל <M>x ∈ ℝ</M>: <M>(xⁿ)&apos; = n·xⁿ⁻¹</M>.</p>
          <Proof>
            <p><strong>באינדוקציה:</strong> עבור n=1: <M>(x)&apos; = 1 = 1·x⁰</M>.</p>
            <p>צעד: <M>(x^{'{n+1}'})&apos; = (x · xⁿ)&apos; = 1·xⁿ + x·n·xⁿ⁻¹ = (n+1)·xⁿ</M>.</p>
          </Proof>
        </Corollary>

        <Corollary title="מסקנה 3 — (tg x)&apos; = 1/cos²x">
          <p><M>(tg x)&apos; = (sin x / cos x)&apos; = [cos²x + sin²x] / cos²x = 1/cos²x</M></p>
        </Corollary>

        {/* ================================================== */}
        {/* LECTURE 20: Inverse Function Derivative & Chain Rule */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 20: נגזרת פונקציה הופכית וכלל השרשרת" />

        <Thm title="נגזרת פונקציה הופכית">
          <p>תהי f חח&quot;ע ורציפה בסביבת <M>x₀</M>, ותהי f גזירה ב-<M>x₀</M> עם <M>f&apos;(x₀) ≠ 0</M>.</p>
          <p>נסמן <M>y₀ = f(x₀)</M>. אזי <M>f⁻¹</M> גזירה ב-<M>y₀</M> ומתקיים:</p>
          <p className="text-center font-mono text-base mt-1">(f⁻¹)&apos;(y₀) = 1 / f&apos;(x₀)</p>
          <Proof>
            <p>נסמן <M>g = f⁻¹</M>. צ&quot;ל: <M>lim_{'{y→y₀}'} [g(y) − g(y₀)] / (y − y₀) = 1/f&apos;(x₀)</M>.</p>
            <p>נציב <M>y = f(x)</M>, כך ש-<M>g(y) = x</M>, <M>g(y₀) = x₀</M>:</p>
            <p className="text-center font-mono">[g(y)−g(y₀)] / (y−y₀) = (x−x₀) / (f(x)−f(x₀)) = 1 / [(f(x)−f(x₀))/(x−x₀)]</p>
            <p>כאשר <M>y → y₀</M> אזי <M>x → x₀</M> (מרציפות ההופכית), ולכן:</p>
            <p className="text-center font-mono">→ 1 / f&apos;(x₀)</p>
          </Proof>
        </Thm>

        <Thm title="(eˣ)&apos; = eˣ">
          <p>לכל <M>x ∈ ℝ</M>: <M>(eˣ)&apos; = eˣ</M>.</p>
          <Proof>
            <p><M>g(x) = ln x</M>, אזי <M>g⁻¹(y) = eʸ</M>.</p>
            <p>ממשפט הנגזרת ההופכית: <M>(eʸ)&apos; = 1/g&apos;(eʸ) = 1/(1/eʸ) = eʸ</M>.</p>
          </Proof>
        </Thm>

        <Thm title="(arctg x)&apos; = 1/(1+x²)">
          <Proof>
            <p><M>g(x) = tg x</M>, אזי <M>g⁻¹(y) = arctg y</M>.</p>
            <p>נסמן <M>x₀ = arctg y₀</M>, אזי <M>tg(x₀) = y₀</M>.</p>
            <p className="text-center font-mono">(arctg)&apos;(y₀) = 1/g&apos;(x₀) = 1/(1/cos²x₀) = cos²x₀</p>
            <p>מכיוון ש-<M>cos²x₀ = 1/(1+tg²x₀) = 1/(1+y₀²)</M>:</p>
            <p className="text-center font-mono">(arctg y₀)&apos; = 1/(1+y₀²)</p>
          </Proof>
        </Thm>

        <Thm title="(arcsin x)&apos; = 1/√(1−x²)">
          <p>לכל <M>x ∈ (−1, 1)</M>: <M>(arcsin x)&apos; = 1/√(1−x²)</M>.</p>
        </Thm>

        <Thm title="(arccos x)&apos; = −1/√(1−x²)">
          <p>לכל <M>x ∈ (−1, 1)</M>: <M>(arccos x)&apos; = −1/√(1−x²)</M>.</p>
        </Thm>

        <Def title="נגזרת בקטע סגור [a,b]">
          <p>f גזירה ב-<M>[a,b]</M> אם f גזירה ב-<M>(a,b)</M>, וכן קיימות הנגזרות החד-צדדיות:</p>
          <p><M>f&apos;(a) = lim_{'{x→a⁺}'} [f(x)−f(a)]/(x−a)</M> ו-<M>f&apos;(b) = lim_{'{x→b⁻}'} [f(x)−f(b)]/(x−b)</M></p>
        </Def>

        <Thm title="כלל השרשרת (Chain Rule)">
          <p>תהי f גזירה ב-<M>x₀</M> עם <M>f(x₀) = y₀</M>, ותהי g גזירה ב-<M>y₀</M>. אזי <M>g∘f</M> גזירה ב-<M>x₀</M> ומתקיים:</p>
          <p className="text-center font-mono text-base mt-1">(g∘f)&apos;(x₀) = g&apos;(y₀) · f&apos;(x₀)</p>
          <Proof>
            <p>נגדיר פונקציית עזר <M>ψ</M>:</p>
            <p className="text-center font-mono">ψ(x) = {'{'} [g(f(x))−g(f(x₀))] / [f(x)−f(x₀)]  אם f(x) ≠ f(x₀)</p>
            <p className="text-center font-mono">{'         '}g&apos;(y₀){'                              '}אם f(x) = f(x₀)</p>
            <p className="mt-2"><strong>שלב 1:</strong> <M>ψ(x₀) = g&apos;(y₀)</M> (מההגדרה).</p>
            <p><strong>שלב 2:</strong> ψ רציפה ב-<M>x₀</M>: אם <M>f(x) ≠ f(x₀)</M> אזי <M>ψ(x) = [g(f(x))−g(y₀)]/[f(x)−y₀]</M> ובגבול <M>x→x₀</M> מקבלים <M>g&apos;(y₀)</M>.</p>
            <p><strong>שלב 3:</strong> לכל <M>x ≠ x₀</M>:</p>
            <p className="text-center font-mono">[g(f(x))−g(f(x₀))] / (x−x₀) = ψ(x) · [f(x)−f(x₀)] / (x−x₀)</p>
            <p>בגבול <M>x→x₀</M>: <M>ψ(x₀) · f&apos;(x₀) = g&apos;(y₀) · f&apos;(x₀)</M>.</p>
          </Proof>
        </Thm>

        <Example title="דוגמאות לכלל השרשרת">
          <p><M>[sin(x²)]&apos; = cos(x²) · 2x</M></p>
          <p><M>[cos(1/x)]&apos; = −sin(1/x) · (−1/x²) = sin(1/x)/x²</M></p>
          <p><M>[ln(x²)]&apos; = (1/x²) · 2x = 2/x</M></p>
          <p><M>[e^(x²)]&apos; = e^(x²) · 2x</M></p>
          <p><M>[e^(1/x)]&apos; = e^(1/x) · (−1/x²)</M></p>
        </Example>

        {/* ================================================== */}
        {/* LECTURE 21: Advanced Derivatives, Fermat, Rolle, MVT */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 21: נגזרות מתקדמות, פרמה, רול ולגראנז&apos;" />

        <Thm title="(xᵅ)&apos; = α·xᵅ⁻¹ לכל α ∈ ℝ">
          <p>לכל <M>α ∈ ℝ</M> ולכל <M>x {'>'} 0</M>: <M>(xᵅ)&apos; = α·xᵅ⁻¹</M>.</p>
          <Proof>
            <p><M>xᵅ = e^(α·ln x)</M>. לפי כלל השרשרת:</p>
            <p className="text-center font-mono">(xᵅ)&apos; = e^(α·ln x) · α/x = xᵅ · α/x = α·xᵅ⁻¹</p>
          </Proof>
        </Thm>

        <Thm title="(aˣ)&apos; = ln(a)·aˣ">
          <p>לכל <M>a {'>'} 0</M> ולכל <M>x ∈ ℝ</M>: <M>(aˣ)&apos; = ln(a)·aˣ</M>.</p>
          <Proof>
            <p><M>aˣ = e^(x·ln a)</M>. לפי כלל השרשרת: <M>(aˣ)&apos; = e^(x·ln a) · ln a = ln(a)·aˣ</M>.</p>
          </Proof>
        </Thm>

        <Thm title="(log_a(x))&apos; = 1/(ln(a)·x)">
          <p>לכל <M>a {'>'} 0, a ≠ 1</M> ולכל <M>x {'>'} 0</M>: <M>(log_a(x))&apos; = 1/(ln(a)·x)</M>.</p>
          <Proof>
            <p><M>log_a(x) = ln(x)/ln(a)</M>. לכן: <M>(log_a(x))&apos; = (1/ln a) · (1/x) = 1/(ln(a)·x)</M>.</p>
          </Proof>
        </Thm>

        <Thm title="משפט פרמה (Fermat)">
          <p>תהי f מוגדרת בסביבת <M>x₀</M>. אם <M>x₀</M> נקודת קיצון מקומי של f ו-f גזירה ב-<M>x₀</M>, אזי <M>f&apos;(x₀) = 0</M>.</p>
          <Proof>
            <p>נניח ש-<M>x₀</M> מקסימום מקומי. קיים <M>δ {'>'} 0</M> כך שלכל <M>x ∈ (x₀−δ, x₀+δ)</M>: <M>f(x) ≤ f(x₀)</M>.</p>
            <p>עבור <M>x {'>'} x₀</M>: <M>[f(x)−f(x₀)]/(x−x₀) ≤ 0</M>, ובגבול <M>x→x₀⁺</M>: <M>f&apos;(x₀) ≤ 0</M>.</p>
            <p>עבור <M>x {'<'} x₀</M>: <M>[f(x)−f(x₀)]/(x−x₀) ≥ 0</M>, ובגבול <M>x→x₀⁻</M>: <M>f&apos;(x₀) ≥ 0</M>.</p>
            <p>מכאן: <M>f&apos;(x₀) = 0</M>.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה — קיצון בנקודת שפה">
          <p>אם f רציפה ב-<M>[a,b)</M>, גזירה ב-<M>(a,b)</M>, ו-<M>x₀ ∈ (a,b)</M> מקסימום מקומי של <M>f|_{'{[a,b)}'}</M>, אזי <M>f&apos;(x₀) = 0</M>.</p>
        </Corollary>

        <Thm title="משפט רול (Rolle)">
          <p>תהי f רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M>, ו-<M>f(a) = f(b)</M>.</p>
          <p>אזי קיימת <M>c ∈ (a,b)</M> כך ש-<M>f&apos;(c) = 0</M>.</p>
          <Proof>
            <p>ממשפט ויירשטראס, f מקבלת מקסימום ומינימום ב-<M>[a,b]</M>.</p>
            <p>אם <M>max = min</M>, אזי f קבועה ולכן <M>f&apos;(c) = 0</M> לכל <M>c ∈ (a,b)</M>.</p>
            <p>אחרת, לפחות אחד מהם (max או min) מתקבל בנקודה פנימית <M>c ∈ (a,b)</M> (כי <M>f(a) = f(b)</M>, לא ייתכן ששניהם מתקבלים רק בקצוות).</p>
            <p>ממשפט פרמה: <M>f&apos;(c) = 0</M>.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה — חד-חד-ערכיות מ-f&apos; ≠ 0">
          <p>תהי f רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M>, ו-<M>f&apos;(x) ≠ 0</M> לכל <M>x ∈ (a,b)</M>.</p>
          <p>אזי f חח&quot;ע ב-<M>[a,b]</M>.</p>
          <Proof>
            <p>בשלילה: נניח <M>f(x₁) = f(x₂)</M> עבור <M>x₁ ≠ x₂</M>. ממשפט רול על <M>[x₁,x₂]</M>: קיים <M>c</M> עם <M>f&apos;(c) = 0</M>. סתירה.</p>
          </Proof>
        </Corollary>

        <Example title="eˣ + 2x = sin x — פתרון יחיד">
          <p>נגדיר <M>g(x) = eˣ + 2x − sin x</M>. אזי <M>g&apos;(x) = eˣ + 2 − cos x ≥ e⁰ + 2 − 1 = 2 {'>'} 0</M>.</p>
          <p><strong>קיום:</strong> <M>g(0) = 1 {'>'} 0</M>, <M>g(−2) = e⁻² − 4 − sin(−2) {'<'} 0</M>. מ-IVT קיים פתרון.</p>
          <p><strong>יחידות:</strong> <M>g&apos;(x) {'>'} 0</M> לכל x, ולכן g חח&quot;ע (ממסקנת רול), ולכן פתרון יחיד.</p>
        </Example>

        <Thm title="משפט הערך הממוצע (לגראנז&apos;, MVT)">
          <p>תהי f רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>.</p>
          <p>אזי קיימת <M>c ∈ (a,b)</M> כך ש:</p>
          <p className="text-center font-mono text-base mt-1">f&apos;(c) = [f(b) − f(a)] / (b − a)</p>
          <Proof>
            <p>נגדיר <M>α = [f(b)−f(a)]/(b−a)</M> ו-<M>g(x) = f(x) − α·x</M>.</p>
            <p>אזי <M>g(a) = f(a) − α·a</M> ו-<M>g(b) = f(b) − α·b</M>.</p>
            <p>בדיקה: <M>g(a) = g(b)</M> (מהגדרת α).</p>
            <p>g רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>, ולכן ממשפט רול: קיים <M>c ∈ (a,b)</M> עם:</p>
            <p className="text-center font-mono">0 = g&apos;(c) = f&apos;(c) − α ⟹ f&apos;(c) = α = [f(b)−f(a)]/(b−a)</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>רול הוא מקרה פרטי של לגראנז&apos;:</strong> כאשר <M>f(a) = f(b)</M>, אגף ימין = 0.</p>
          <p><strong>פרשנות גיאומטרית:</strong> קיימת נקודה שבה המשיק מקביל למיתר.</p>
        </Remark>

        <Corollary title="מסקנות מונוטוניות מ-MVT">
          <p>תהי f רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>. אזי:</p>
          <p><strong>(i)</strong> <M>f&apos; ≥ 0</M> ב-<M>(a,b)</M> ⟹ f עולה ב-<M>[a,b]</M></p>
          <p><strong>(ii)</strong> <M>f&apos; ≤ 0</M> ב-<M>(a,b)</M> ⟹ f יורדת ב-<M>[a,b]</M></p>
          <p><strong>(iii)</strong> <M>f&apos; = 0</M> ב-<M>(a,b)</M> ⟹ f קבועה ב-<M>[a,b]</M></p>
          <p><strong>(iv)</strong> <M>f&apos; {'>'} 0</M> ב-<M>(a,b)</M> ⟹ f עולה ממש ב-<M>[a,b]</M></p>
          <p><strong>(v)</strong> <M>f&apos; {'<'} 0</M> ב-<M>(a,b)</M> ⟹ f יורדת ממש ב-<M>[a,b]</M></p>
          <Proof>
            <p><strong>הוכחת (i):</strong> יהיו <M>a ≤ x₁ {'<'} x₂ ≤ b</M>. מ-MVT: קיים <M>c ∈ (x₁,x₂)</M> עם</p>
            <p className="text-center font-mono">f(x₂) − f(x₁) = f&apos;(c)·(x₂−x₁) ≥ 0</p>
            <p>ולכן <M>f(x₂) ≥ f(x₁)</M>, כלומר f עולה.</p>
            <p className="mt-2"><strong>הוכחת (v):</strong> באופן דומה, <M>f(x₂) − f(x₁) = f&apos;(c)·(x₂−x₁) {'<'} 0</M>.</p>
          </Proof>
        </Corollary>

        {/* ================================================== */}
        {/* LECTURE 22: MVT Applications & Inequalities */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 22: יישומי MVT ואי-שוויונות" />

        <Example title="הוכחה: eˣ ≥ 1+x לכל x ≥ 0">
          <p>נגדיר <M>f(x) = eˣ − 1 − x</M>. אזי <M>f&apos;(x) = eˣ − 1 ≥ 0</M> לכל <M>x ≥ 0</M>.</p>
          <p>לכן f עולה ב-<M>[0,∞)</M>, ומכיוון ש-<M>f(0) = 0</M>, נקבל <M>f(x) ≥ 0</M> לכל <M>x ≥ 0</M>.</p>
        </Example>

        <Corollary title="מסקנה 3 — |sin x − sin y| ≤ |x − y| ו-|cos x − cos y| ≤ |x − y|">
          <Proof>
            <p>מ-MVT על <M>f(t) = sin t</M> בקטע <M>[x,y]</M> (בה&quot;כ <M>x {'<'} y</M>):</p>
            <p className="text-center font-mono">(sin y − sin x)/(y − x) = cos(c)</p>
            <p>לכל c: <M>|cos(c)| ≤ 1</M>, ולכן <M>|sin y − sin x| ≤ |y − x|</M>.</p>
            <p>באופן דומה עבור cos עם <M>|(−sin(c))| ≤ 1</M>.</p>
          </Proof>
        </Corollary>

        <Corollary title="מסקנה 4 — x/(1+x) ≤ ln(1+x) ≤ x לכל x > −1">
          <Proof>
            <p>מ-MVT על <M>f(t) = ln(1+t)</M> בקטע <M>[0,x]</M> (עבור <M>x {'>'} 0</M>):</p>
            <p className="text-center font-mono">ln(1+x)/x = f&apos;(c) = 1/(1+c)</p>
            <p>לכל <M>0 {'<'} c {'<'} x</M>: <M>1/(1+x) {'<'} 1/(1+c) {'<'} 1</M>, ולכן:</p>
            <p className="text-center font-mono">x/(1+x) {'<'} ln(1+x) {'<'} x</p>
            <p className="mt-1">עבור <M>−1 {'<'} x {'<'} 0</M>: <M>x {'<'} c {'<'} 0</M> ולכן <M>1/(1+c) {'<'} 1 {'<'} 1/(1+x)</M> (ההפוך), ובכפל ב-<M>x {'<'} 0</M> מתהפכים אי-השוויונות ומקבלים את אותה תוצאה.</p>
          </Proof>
        </Corollary>

        <Thm title="f עולה וגזירה ⟹ f&apos; ≥ 0">
          <p>תהי f עולה ב-<M>(a,b)</M> וגזירה ב-<M>x₀ ∈ (a,b)</M>. אזי <M>f&apos;(x₀) ≥ 0</M>.</p>
          <Proof>
            <p>לכל <M>x {'>'} x₀</M>: <M>[f(x)−f(x₀)]/(x−x₀) ≥ 0</M> (כי f עולה ו-<M>x−x₀ {'>'} 0</M>).</p>
            <p>בגבול <M>x→x₀⁺</M>: <M>f&apos;(x₀) ≥ 0</M>.</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>f&apos; ≥ 0 לא מונע עלייה ממש!</strong> למשל <M>f(x) = x³</M>: <M>f&apos;(x) = 3x² ≥ 0</M> ו-<M>f&apos;(0) = 0</M>, אבל f עולה ממש (כי f חח&quot;ע).</p>
        </Remark>

        {/* ================================================== */}
        {/* LECTURE 23: Cauchy MVT & L'Hôpital */}
        {/* ================================================== */}
        <SectionHeader title="הרצאה 23: משפט קושי ולופיטל" />

        <Example title="x/ln(x) ≥ e לכל x > 1">
          <p>נגדיר <M>f(x) = x/ln(x) − e</M> לכל <M>x {'>'} 1</M>. <M>f&apos;(x) = (ln(x)−1)/ln²(x)</M>.</p>
          <p><M>f&apos;(x) = 0</M> ⟺ <M>x = e</M>. f יורדת ב-<M>(1,e)</M> ועולה ב-<M>(e,∞)</M>.</p>
          <p>מינימום ב-<M>x = e</M>: <M>f(e) = e/1 − e = 0</M>. לכן <M>f(x) ≥ 0</M>.</p>
        </Example>

        <Thm title="משפט קושי (Cauchy&apos;s MVT)">
          <p>תהיינה f, g רציפות ב-<M>[a,b]</M> וגזירות ב-<M>(a,b)</M>, ו-<M>g&apos;(x) ≠ 0</M> לכל <M>x ∈ (a,b)</M>.</p>
          <p>אזי <M>g(a) ≠ g(b)</M> וקיימת <M>c ∈ (a,b)</M> כך ש:</p>
          <p className="text-center font-mono text-base mt-1">[f(b)−f(a)] / [g(b)−g(a)] = f&apos;(c) / g&apos;(c)</p>
          <Proof>
            <p>ראשית, <M>g(a) ≠ g(b)</M> כי אחרת ממשפט רול ∃c עם <M>g&apos;(c)=0</M> — סתירה.</p>
            <p>נגדיר <M>α = [f(b)−f(a)]/[g(b)−g(a)]</M> ו-<M>h(x) = f(x) − α·g(x)</M>.</p>
            <p>בדיקה:</p>
            <p className="text-center font-mono">h(a) = f(a) − α·g(a), {'  '}h(b) = f(b) − α·g(b)</p>
            <p>מהגדרת α: <M>h(a) = h(b)</M>.</p>
            <p>h רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>. ממשפט רול: ∃<M>c ∈ (a,b)</M> עם:</p>
            <p className="text-center font-mono">0 = h&apos;(c) = f&apos;(c) − α·g&apos;(c) ⟹ α = f&apos;(c)/g&apos;(c)</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>לגראנז&apos; הוא מקרה פרטי של קושי:</strong> כאשר <M>g(x) = x</M>, מתקבל <M>[f(b)−f(a)]/(b−a) = f&apos;(c)/1</M>.</p>
        </Remark>

        <Thm title="כלל לופיטל (L&apos;Hôpital) — צורת 0/0">
          <p>תהיינה f, g מוגדרות בסביבה מנוקבת של <M>x₀</M>, עם:</p>
          <p>(i) <M>lim_{'{x→x₀}'} f(x) = lim_{'{x→x₀}'} g(x) = 0</M></p>
          <p>(ii) f, g גזירות בסביבה מנוקבת של <M>x₀</M>, <M>g&apos;(x) ≠ 0</M> בסביבה זו</p>
          <p>(iii) <M>lim_{'{x→x₀}'} f&apos;(x)/g&apos;(x)</M> קיים (סופי או <M>±∞</M>)</p>
          <p>אזי:</p>
          <p className="text-center font-mono text-base mt-1">lim_{'{x→x₀}'} f(x)/g(x) = lim_{'{x→x₀}'} f&apos;(x)/g&apos;(x)</p>
          <Proof>
            <p>נגדיר <M>f(x₀) = g(x₀) = 0</M> (מרציפות). עבור <M>x</M> בסביבת <M>x₀</M>, נשתמש בקושי על <M>[x₀, x]</M>:</p>
            <p className="text-center font-mono">f(x)/g(x) = [f(x)−f(x₀)]/[g(x)−g(x₀)] = f&apos;(c)/g&apos;(c)</p>
            <p>כאשר <M>c</M> בין <M>x₀</M> ל-<M>x</M>. כש-<M>x→x₀</M> גם <M>c→x₀</M>, ולכן:</p>
            <p className="text-center font-mono">lim f(x)/g(x) = lim f&apos;(c)/g&apos;(c) = lim f&apos;(x)/g&apos;(x)</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>הרחבות:</strong> הכלל תקף גם עבור <M>x→x₀⁻</M>, <M>x→x₀</M> (דו-צדדי), <M>x→∞</M>, <M>x→−∞</M>.</p>
          <p><strong>צורת ∞/∞:</strong> ניתן להחליף את תנאי (i) ב-<M>lim g(x) = ∞</M>.</p>
        </Remark>

        <Example title="דוגמאות לופיטל">
          <p><strong>(1)</strong> <M>lim_{'{x→0}'} sin(x)/x = lim cos(x)/1 = 1</M></p>
          <p><strong>(2)</strong> <M>lim_{'{x→0}'} ln(1+x)/x = lim [1/(1+x)]/1 = 1</M></p>
          <p><strong>(3)</strong> <M>lim_{'{x→0}'} (eˣ−1)/x = lim eˣ/1 = 1</M></p>
          <p><strong>(4)</strong> <M>lim_{'{x→0}'} (eˣ−1−x)/x² = lim (eˣ−1)/(2x) = lim eˣ/2 = 1/2</M></p>
          <p><strong>(5)</strong> <M>lim_{'{x→0}'} arctg(x)/x = lim [1/(1+x²)]/1 = 1</M></p>
          <p><strong>(6)</strong> <M>lim_{'{x→∞}'} eˣ/x⁵ = ... = lim eˣ/120 = ∞</M> (5 פעמים לופיטל)</p>
          <p><strong>(7)</strong> <M>lim_{'{x→0⁺}'} x·ln(x) = lim ln(x)/(1/x) = lim (1/x)/(−1/x²) = lim (−x) = 0</M></p>
        </Example>

        <Remark>
          <p><strong>לופיטל לא תמיד עובד!</strong></p>
          <p><M>lim_{'{x→∞}'} sin(x)/x</M> — לא ניתן להשתמש בלופיטל כי <M>lim sin(x) ≠ 0</M> ו-<M>lim sin(x) ≠ ∞</M>.</p>
          <p>התשובה: <M>lim_{'{x→∞}'} sin(x)/x = 0</M> (מכלל הסנדוויץ&apos;).</p>
          <p className="mt-1"><M>lim_{'{x→∞}'} √(x²+1)/x</M> — לופיטל מוביל לביטוי מעגלי. פותרים ישירות: <M>= lim √(1+1/x²) = 1</M>.</p>
        </Remark>

        {/* ================================================== */}
        {/* RECITATION 10: IVT & Weierstrass Exercises */}
        {/* ================================================== */}
        <SectionHeader title="תרגול 10: משפט ע&quot;ב ומשפט ויירשטראס" />

        <Example title="תרגול 10, דוגמה 1 — f:[0,1]→[0,1] רציפה, ∃c: f(c) = 2c²−1">
          <p>נגדיר <M>g(x) = f(x) − 2x² + 1</M>. g רציפה מאש&quot;ר.</p>
          <p><M>g(0) = f(0) + 1 ≥ 0</M> (כי <M>f(0) ∈ [0,1]</M>).</p>
          <p><M>g(1) = f(1) − 1 ≤ 0</M> (כי <M>f(1) ∈ [0,1]</M>).</p>
          <p>ממשפט ע&quot;ב המורחב: ∃<M>c ∈ [0,1]</M> עם <M>g(c) = 0</M>, כלומר <M>f(c) = 2c²−1</M>.</p>
        </Example>

        <Example title="תרגול 10, דוגמה 2 — לפולינום ממעלה אי-זוגית יש שורש">
          <p>תהי <M>p(x) = aₙxⁿ + ... + a₁x + a₀</M> כאשר n אי-זוגי ו-<M>aₙ ≠ 0</M>.</p>
          <p><M>lim_{'{x→∞}'} p(x) = ±∞</M> ו-<M>lim_{'{x→−∞}'} p(x) = ∓∞</M> (תלוי בסימן aₙ).</p>
          <p>מ-IVT: קיים שורש.</p>
        </Example>

        <Example title="תרגול 10, דוגמה 3 — Im(f) = ℝ">
          <p>תהי <M>f: ℝ → ℝ</M> רציפה עם <M>lim_{'{x→∞}'} f(x) = ∞</M> ו-<M>lim_{'{x→−∞}'} f(x) = −∞</M>.</p>
          <p>אזי <M>Im(f) = ℝ</M>. (לכל <M>y ∈ ℝ</M>, ∃a,b עם <M>f(a) {'<'} y {'<'} f(b)</M>, ומ-IVT ∃c עם <M>f(c) = y</M>.)</p>
        </Example>

        <Example title="תרגול 10, תרגיל — f רציפה ב-[0,∞) עם lim = L">
          <p>תהי <M>f: [0,∞) → ℝ</M> רציפה עם <M>lim_{'{x→∞}'} f(x) = L</M>.</p>
          <p>אזי f מקבלת מקסימום או מינימום.</p>
          <p><strong>3 מקרים:</strong></p>
          <p>1. ∃<M>x₀</M> עם <M>f(x₀) {'>'} L</M>: בוחרים <M>M</M> גדול מספיק, ממשפט ויירשטראס על <M>[0,M]</M> f מקבלת מקסימום.</p>
          <p>2. ∃<M>x₀</M> עם <M>f(x₀) {'<'} L</M>: באופן דומה f מקבלת מינימום.</p>
          <p>3. <M>f(x) = L</M> לכל x: f קבועה — מקבלת גם מקסימום וגם מינימום.</p>
        </Example>

        {/* ================================================== */}
        {/* RECITATION 11: Derivatives & Rolle Exercises */}
        {/* ================================================== */}
        <SectionHeader title="תרגול 11: נגזרות ומשפט רול" />

        <Example title="תרגול 11, דוגמה 1 — f(x) = x·|x| גזירה בכל ℝ">
          <p>עבור <M>x₀ {'>'} 0</M>: <M>f(x) = x²</M>, לכן <M>f&apos;(x₀) = 2x₀</M>.</p>
          <p>עבור <M>x₀ {'<'} 0</M>: <M>f(x) = −x²</M>, לכן <M>f&apos;(x₀) = −2x₀</M>.</p>
          <p>עבור <M>x₀ = 0</M>: <M>f&apos;(0) = lim_{'{h→0}'} h|h|/h = lim_{'{h→0}'} |h| = 0</M>.</p>
          <p>לכן f גזירה בכל <M>ℝ</M>.</p>
        </Example>

        <Example title="תרגול 11, דוגמה 2 — f(x) = |x²−2x| לא גזירה ב-x₀=2">
          <p>נגזרת מימין: <M>lim_{'{h→0⁺}'} |h²+2h|/h = lim_{'{h→0⁺}'} (h+2) = 2</M></p>
          <p>נגזרת משמאל: <M>lim_{'{h→0⁻}'} |h²+2h|/h = lim_{'{h→0⁻}'} −(h+2) = −2</M></p>
          <p>הנגזרות החד-צדדיות שונות (<M>2 ≠ −2</M>), לכן f לא גזירה ב-<M>x₀ = 2</M>.</p>
        </Example>

        <Example title="(xˣ)&apos; = xˣ(ln x + 1) עבור x > 0">
          <p><M>xˣ = e^(x·ln x)</M>. מכלל השרשרת:</p>
          <p className="text-center font-mono">(xˣ)&apos; = e^(x·ln x) · (ln x + x·(1/x)) = xˣ · (ln x + 1)</p>
        </Example>

        <Example title="תרגול 11 — lim f(x)/x = 0 ⟹ f&apos;(0) = 0">
          <p>אם f רציפה ב-0 ו-<M>lim_{'{x→0}'} f(x)/x = 0</M>, אזי <M>f(0) = 0</M> ו-<M>f&apos;(0) = lim_{'{h→0}'} f(h)/h = 0</M>.</p>
        </Example>

        <Example title="תרגול 11, רול — f גזירה ב-[-1,1], ∃c: f&apos;(c) = 0">
          <p>נתון: <M>f(−1/2) = e, f(0) = −3, f(1) = −1/4</M>.</p>
          <p>מכיוון ש-<M>f(0) = −3 {'<'} −1/4 = f(1)</M>, מ-IVT ∃<M>d ∈ (0,1)</M> עם <M>f(d) = −3</M>.</p>
          <p>עכשיו <M>f(−1/2) = e {'>'} −3 = f(d)</M>, מ-IVT ∃<M>d₂ ∈ (−1/2, d)</M> עם <M>f(d₂) = e</M>.</p>
          <p><M>f(−1/2) = f(d₂) = e</M>, ממשפט רול: ∃<M>c ∈ (−1/2, d₂) ⊂ (−1,1)</M> עם <M>f&apos;(c) = 0</M>.</p>
        </Example>

        <Example title="תרגול 11 — 2x⁵+2x³+x+5=0 פתרון יחיד">
          <p><strong>קיום:</strong> <M>f(x) = 2x⁵+2x³+x+5</M>. <M>f(−1) = −2+(-2)+(−1)+5 = 0</M>... (מ-IVT).</p>
          <p><strong>יחידות:</strong> <M>f&apos;(x) = 10x⁴+6x²+1 {'>'} 0</M> לכל x. לכן f חח&quot;ע, ופתרון יחיד.</p>
        </Example>

        {/* ================================================== */}
        {/* RECITATION 13: MVT Exercises */}
        {/* ================================================== */}
        <SectionHeader title="תרגול 13: יישומי MVT" />

        <Example title="תרגול 13, דוגמה 1 — f:[0,1]→[0,1] רציפה, ∃c: f(c)=2c²−1">
          <p>(חזרה) נגדיר <M>g(x) = f(x) − 2x² + 1</M>. <M>g(0) ≥ 0</M>, <M>g(1) ≤ 0</M>. מ-IVT: ∃c עם <M>g(c)=0</M>.</p>
        </Example>

        <Example title="תרגול 13, דוגמה 2 — f&apos;(x) ≤ 3 ⟹ f(x₂)+3x₁ ≤ f(x₁)+3x₂">
          <p>תהי <M>f: ℝ → ℝ</M> גזירה עם <M>f&apos;(x) ≤ 3</M> לכל <M>x ∈ ℝ</M>.</p>
          <p>צ&quot;ל: לכל <M>x₁ ≤ x₂</M> מתקיים <M>f(x₂)+3x₁ ≤ f(x₁)+3x₂</M>.</p>
          <p>מ-MVT: ∃<M>c ∈ (x₁,x₂)</M> עם <M>[f(x₂)−f(x₁)]/(x₂−x₁) = f&apos;(c) ≤ 3</M>.</p>
          <p>לכן <M>f(x₂)−f(x₁) ≤ 3(x₂−x₁)</M>, כלומר <M>f(x₂)+3x₁ ≤ f(x₁)+3x₂</M>.</p>
        </Example>

        <Example title="תרגול 13, דוגמה 3 — sin(x)/x ≥ 2/π לכל 0 < x ≤ π/2">
          <p>נגדיר <M>f(x) = sin(x)/x</M> לכל <M>0 {'<'} x ≤ π/2</M>.</p>
          <p><M>f&apos;(x) = (x·cos x − sin x)/x²</M>. מכיוון ש-<M>x·cos x ≤ sin x</M> לכל <M>0 {'<'} x ≤ π/2</M>: <M>f&apos;(x) ≤ 0</M>.</p>
          <p>לכן f יורדת ב-<M>(0, π/2]</M>, ולכן:</p>
          <p className="text-center font-mono">sin(x)/x = f(x) ≥ f(π/2) = sin(π/2)/(π/2) = 2/π</p>
        </Example>

        <Example title="תרגול 13, דוגמה 4 — שוויון מקסימומים ⟹ חיתוך">
          <p>יהיו <M>f, g: [a,b] → ℝ</M> רציפות. נגדיר <M>M₁ = max f</M>, <M>M₂ = max g</M>.</p>
          <p><strong>(א)</strong> M₁, M₂ מוגדרים היטב ממשפט ויירשטראס.</p>
          <p><strong>(ב)</strong> אם <M>M₁ = M₂ = M</M>, אזי ∃<M>c ∈ [a,b]</M> עם <M>f(c) = g(c)</M>.</p>
          <p>∃<M>c₁, c₂</M> עם <M>f(c₁) = M, g(c₂) = M</M>. נגדיר <M>h = f − g</M>.</p>
          <p><M>h(c₁) = f(c₁) − g(c₁) = M − g(c₁) ≥ 0</M>, <M>h(c₂) = f(c₂) − g(c₂) = f(c₂) − M ≤ 0</M>.</p>
          <p>מ-IVT: ∃c בין <M>c₁</M> ל-<M>c₂</M> עם <M>h(c) = 0</M>, כלומר <M>f(c) = g(c)</M>.</p>
        </Example>

        {/* ================================================== */}
        {/* HOMEWORK 10 Highlights */}
        {/* ================================================== */}
        <SectionHeader title="תרגיל בית 10: תרגילים נבחרים" />

        <Example title="תרגיל 10.2 — inf עם רציפות חד-צדדית">
          <p>נתון: f מוגדרת ב-<M>[a,b]</M>, רציפה מימין ב-<M>[a,b)</M>, <M>f(a) {'<'} 0, f(b) {'>'} 0</M>.</p>
          <p>מגדירים <M>s = inf{'{x ∈ [a,b] : f(x) > 0}'}</M>.</p>
          <p><strong>(א)</strong> s מוגדר היטב ו-<M>s ∈ [a,b]</M> (הקבוצה לא ריקה כי <M>b</M> בה, וחסומה מלמטה ע&quot;י a).</p>
          <p><strong>(ב)</strong> <M>f(s) ≥ 0</M> (בשלילה: אם <M>f(s) {'<'} 0</M>, מרציפות מימין ∃δ עם <M>f(x) {'<'} 0</M> לכל <M>s ≤ x {'<'} s+δ</M>. מתכונת ε של inf ∃<M>x₁ ∈ A</M> עם <M>s ≤ x₁ {'<'} s+δ</M>, אבל אז <M>f(x₁) {'<'} 0</M> וגם <M>f(x₁) {'>'} 0</M> — סתירה).</p>
        </Example>

        <Example title="תרגיל 10.3 — sup על קטע סגור/פתוח">
          <p><strong>(א)</strong> <M>f(x) {'<'} 1</M> לכל <M>x ∈ [−1,3]</M> ⟹ <M>sup{'{f(x) : x∈[−1,3]}'} {'<'} 1</M>.</p>
          <p>מויירשטראס: ∃<M>x₁</M> עם <M>f(x₁) = max = sup</M>. לכן <M>sup = f(x₁) {'<'} 1</M>.</p>
          <p><strong>(ב)</strong> אפשרי ש-<M>f(x) {'<'} 1</M> לכל <M>x ∈ ℝ</M> אבל <M>sup = 1</M>.</p>
          <p>דוגמה: <M>f(x) = (2/π)·arctan(x)</M> או <M>f(x) = x²/(1+x²)</M>.</p>
        </Example>

        <Example title="תרגיל 10.4 — 0 < f(x) < g(x) ⟹ ∃c < 1: f(x) < c·g(x)">
          <p>נגדיר <M>h(x) = f(x)/g(x)</M>. h רציפה ב-<M>[a,b]</M>, <M>h(x) {'<'} 1</M>.</p>
          <p>מויירשטראס: ∃<M>x₁</M> עם <M>h(x₁) = max h ∈ [a,b]</M>, ו-<M>h(x₁) {'<'} 1</M>.</p>
          <p>נבחר <M>c = (h(x₁)+1)/2 {'<'} 1</M>. אז <M>f(x)/g(x) = h(x) ≤ h(x₁) {'<'} c</M>.</p>
        </Example>

        {/* ================================================== */}
        {/* HOMEWORK 11 Highlights */}
        {/* ================================================== */}
        <SectionHeader title="תרגיל בית 11: תרגילים נבחרים" />

        <Example title="תרגיל 11.2 — אפיון גזירות עם |x−x₀|">
          <p>f גזירה ב-<M>x₀</M> ⟺ ∃<M>α ∈ ℝ</M> עם <M>lim_{'{x→x₀}'} [f(x)−f(x₀)−α(x−x₀)]/|x−x₀| = 0</M>.</p>
          <p>במקרה זה <M>f&apos;(x₀) = α</M>.</p>
        </Example>

        <Example title="תרגיל 11.4a — lim x·[f(x₀+3/x) − f(x₀)]">
          <p>אם f גזירה ב-<M>x₀</M>, אזי:</p>
          <p className="text-center font-mono">lim_{'{x→∞}'} x·[f(x₀+3/x) − f(x₀)] = 3·f&apos;(x₀)</p>
          <p>(הצבה <M>t = 3/x</M>: <M>= lim_{'{t→0⁺}'} 3·[f(x₀+t)−f(x₀)]/t = 3f&apos;(x₀)</M>)</p>
        </Example>

        <Example title="תרגיל 11.4b — xˣ ≥ (1/e)^(1/e) לכל x > 0">
          <p><M>f(x) = xˣ = e^(x·ln x)</M>. <M>f&apos;(x) = xˣ(ln x + 1) = 0</M> ⟺ <M>x = 1/e</M>.</p>
          <p>f יורדת ב-<M>(0, 1/e)</M> ועולה ב-<M>(1/e, ∞)</M>. מינימום ב-<M>x = 1/e</M>:</p>
          <p className="text-center font-mono">f(1/e) = (1/e)^(1/e)</p>
        </Example>

        <Example title="תרגיל 11.4d — eˣ + 2sin(x) + x² = 2 — לכל היותר 2 פתרונות">
          <p>נגדיר <M>f(x) = eˣ + 2sin(x) + x²</M>. בשלילה: נניח 3 פתרונות <M>x₁ {'<'} x₂ {'<'} x₃</M>.</p>
          <p>מרול (פעמיים): ∃<M>y₁, y₂</M> עם <M>f&apos;(y₁) = f&apos;(y₂) = 0</M>.</p>
          <p>מרול שוב: ∃c עם <M>f&apos;&apos;(c) = 0</M>.</p>
          <p>אבל <M>f&apos;&apos;(x) = eˣ − 2sin(x) + 2 ≥ eˣ {'>'} 0</M> (כי <M>−2sin(x) + 2 ≥ 0</M>). סתירה.</p>
        </Example>

        <Example title="תרגיל 11.5b — f גזירה, f&apos;(x₀)=0 ⟹ |f| גזירה ב-x₀ עם |f|&apos;(x₀)=0">
          <p>מנתון: <M>lim |[f(x)−f(x₀)]/(x−x₀)| = 0</M>.</p>
          <p>מאי-שוויון המשולש ההפוך: <M>||f(x)|−|f(x₀)|| ≤ |f(x)−f(x₀)|</M>.</p>
          <p>מכלל הסנדוויץ&apos;: <M>lim ||f(x)|−|f(x₀)||/|x−x₀| = 0</M>, ולכן <M>|f|&apos;(x₀) = 0</M>.</p>
        </Example>

        <Example title="תרגיל 11.6 — lim f = ∞ בקצוות (−2,2)">
          <p><strong>(א)</strong> f רציפה ⟹ f מקבלת מינימום ב-<M>(−2,2)</M>.</p>
          <p>מהגבולות: ∃<M>δ₁, δ₂</M> כך ש-<M>f(x) {'>'} |f(0)|+1</M> בסביבות הקצוות.</p>
          <p>מויירשטראס על <M>[−2+δ₁, 2−δ₂]</M>: ∃מינימום <M>x₁</M> עם <M>f(x₁) ≤ f(0)</M>.</p>
          <p>לכל x בסביבות הקצוות: <M>f(x) {'>'} f(0) ≥ f(x₁)</M>. לכן <M>x₁</M> מינימום גלובלי.</p>
          <p className="mt-1"><strong>(ב)</strong> f גזירה ⟹ לכל <M>r ∈ ℝ</M> ∃<M>c ∈ (−2,2)</M> עם <M>f&apos;(c) = r</M>.</p>
          <p>נגדיר <M>F(x) = f(x) − rx</M>. <M>lim F = ∞</M> בקצוות. מסעיף (א): F מקבלת מינימום ב-c.</p>
          <p>מפרמה: <M>F&apos;(c) = 0</M>, כלומר <M>f&apos;(c) = r</M>.</p>
        </Example>

        {/* ================================================== */}
        {/* HOMEWORK 12 Highlights */}
        {/* ================================================== */}
        <SectionHeader title="תרגיל בית 12: תרגילים נבחרים" />

        <Example title="תרגיל 12.1 — arctan(x) + arctan(1/x) = π/2 לכל x > 0">
          <p>נגדיר <M>f(x) = arctan(x) + arctan(1/x)</M>.</p>
          <p><M>f&apos;(x) = 1/(1+x²) + 1/(1+1/x²)·(−1/x²) = 1/(1+x²) − 1/(x²+1) = 0</M>.</p>
          <p>לכן f קבועה. <M>f(1) = π/4 + π/4 = π/2</M>.</p>
        </Example>

        <Example title="תרגיל 12.2a — arctan(x) < x לכל x > 0">
          <p>נגדיר <M>f(x) = arctan(x) − x</M>. <M>f(0) = 0</M>, <M>f&apos;(x) = 1/(1+x²) − 1 {'<'} 0</M> לכל <M>x {'>'} 0</M>.</p>
          <p>לכן f יורדת ממש ב-<M>(0,∞)</M>, ולכן <M>f(x) {'<'} f(0) = 0</M>.</p>
        </Example>

        <Example title="תרגיל 12.2b — eˣ/(1+x)^(1+x) < 1 לכל x > 0">
          <p>נגדיר <M>f(x) = e^(x−(1+x)ln(1+x))</M>. <M>f(0) = 1</M>.</p>
          <p><M>f&apos;(x) = f(x)·[1 − ln(1+x) − 1] = −f(x)·ln(1+x) {'<'} 0</M> לכל <M>x {'>'} 0</M>.</p>
          <p>לכן f יורדת ממש, ולכן <M>f(x) {'<'} f(0) = 1</M>.</p>
        </Example>

        <Example title="תרגיל 12.2c — 1 + 2ln(x) ≤ x² לכל x > 0">
          <p>נגדיר <M>f(x) = 1 + 2ln(x) − x²</M>. <M>f&apos;(x) = 2/x − 2x = (2−2x²)/x</M>.</p>
          <p><M>f&apos;(x) = 0</M> ⟺ <M>x = 1</M>. f עולה ב-<M>(0,1]</M>, יורדת ב-<M>[1,∞)</M>.</p>
          <p>מקסימום ב-<M>x = 1</M>: <M>f(1) = 1 + 0 − 1 = 0</M>. לכן <M>f(x) ≤ 0</M>.</p>
        </Example>

        <Example title="תרגיל 12.3 — f&apos; ≥ α > 0, f(0) < 0 ⟹ שורש יחיד ב-[0, −f(0)/α]">
          <p>מ-MVT: ∃<M>c ∈ (0, −f(0)/α)</M> עם <M>[f(−f(0)/α)−f(0)]/(−f(0)/α) = f&apos;(c) ≥ α</M>.</p>
          <p>לכן <M>f(−f(0)/α) ≥ −f(0) + f(0) = 0</M>.</p>
          <p><M>f(0) {'<'} 0 ≤ f(−f(0)/α)</M>, מ-IVT: ∃שורש. יחידות: <M>f&apos; {'>'} 0</M> ⟹ f חח&quot;ע.</p>
        </Example>

        <Example title="תרגיל 12.4 — f(0)=1, f(1)=3, f(2)=2 ⟹ ∃c: f&apos;&apos;(c) < 0">
          <p>מ-MVT על <M>[0,1]</M>: ∃<M>c₁ ∈ (0,1)</M> עם <M>f&apos;(c₁) = (3−1)/(1−0) = 2</M>.</p>
          <p>מ-MVT על <M>[1,2]</M>: ∃<M>c₂ ∈ (1,2)</M> עם <M>f&apos;(c₂) = (2−3)/(2−1) = −1</M>.</p>
          <p>מ-MVT על f&apos; ב-<M>[c₁,c₂]</M>: ∃<M>c ∈ (c₁,c₂)</M> עם <M>f&apos;&apos;(c) = (−1−2)/(c₂−c₁) {'<'} 0</M>.</p>
        </Example>

        <Example title="תרגיל 12.5 — f&apos;(x₀)=0, f&apos;&apos;(x₀)>0 ⟹ x₀ מינימום מקומי">
          <p><M>f&apos;&apos;(x₀) = lim f&apos;(x)/(x−x₀) {'>'} 0</M>.</p>
          <p>∃<M>δ₁ {'>'} 0</M>: לכל <M>x₀ {'<'} x {'<'} x₀+δ₁</M>: <M>f&apos;(x)/(x−x₀) {'>'} 0</M> ⟹ <M>f&apos;(x) {'>'} 0</M> ⟹ f עולה.</p>
          <p>∃<M>δ₂ {'>'} 0</M>: לכל <M>x₀−δ₂ {'<'} x {'<'} x₀</M>: <M>f&apos;(x)/(x−x₀) {'>'} 0</M> ⟹ <M>f&apos;(x) {'<'} 0</M> ⟹ f יורדת.</p>
          <p>f יורדת לפני <M>x₀</M> ועולה אחריו ⟹ <M>x₀</M> מינימום מקומי.</p>
        </Example>

        <Example title="תרגיל 12.6b — f&apos; ≥ c > 0 לכל x ⟹ lim f = ∞ ו-lim f = −∞">
          <p>מ-MVT: לכל <M>x {'>'} 0</M>: <M>f(x) ≥ c·x + f(0) → ∞</M>.</p>
          <p>לכל <M>x {'<'} 0</M>: <M>f(x) ≤ c·x + f(0) → −∞</M>.</p>
        </Example>

        {/* ================================================== */}
        {/* SUMMARY CHEAT SHEET */}
        {/* ================================================== */}
        <SectionHeader title="גיליון סיכום — כל הנוסחאות" />

        <div className="border border-gray-400 rounded p-4 font-mono text-sm space-y-3 print:break-inside-avoid">

          <div>
            <p className="font-bold mb-1"># טבלת נגזרות</p>
            <p>(C)&apos; = 0 {'          '}(x)&apos; = 1 {'          '}(xⁿ)&apos; = n·xⁿ⁻¹</p>
            <p>(xᵅ)&apos; = α·xᵅ⁻¹ {'    '}(eˣ)&apos; = eˣ {'        '}(aˣ)&apos; = ln(a)·aˣ</p>
            <p>(ln x)&apos; = 1/x {'    '}(log_a x)&apos; = 1/(ln(a)·x)</p>
            <p>(sin x)&apos; = cos x {'  '}(cos x)&apos; = −sin x {'  '}(tg x)&apos; = 1/cos²x</p>
            <p>(arcsin x)&apos; = 1/√(1−x²) {'  '}(arccos x)&apos; = −1/√(1−x²)</p>
            <p>(arctg x)&apos; = 1/(1+x²)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># כללי גזירה</p>
            <p>(f±g)&apos; = f&apos;±g&apos; {'       '}(c·f)&apos; = c·f&apos;</p>
            <p>(f·g)&apos; = f&apos;g+fg&apos; {'     '}(f/g)&apos; = (f&apos;g−fg&apos;)/g²</p>
            <p>(g∘f)&apos;(x₀) = g&apos;(f(x₀))·f&apos;(x₀) {'  '}(כלל השרשרת)</p>
            <p>(f⁻¹)&apos;(y₀) = 1/f&apos;(x₀) {'              '}(נגזרת הופכית)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># משפטים מרכזיים</p>
            <p>גזירה ⟹ רציפה (ההפך לא נכון!)</p>
            <p>פרמה: קיצון מקומי + גזירה ⟹ f&apos;(x₀) = 0</p>
            <p>רול: f(a)=f(b), רציפה+גזירה ⟹ ∃c: f&apos;(c)=0</p>
            <p>לגראנז&apos;: רציפה+גזירה ⟹ ∃c: f&apos;(c)=[f(b)−f(a)]/(b−a)</p>
            <p>קושי: ∃c: [f(b)−f(a)]/[g(b)−g(a)] = f&apos;(c)/g&apos;(c)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># מונוטוניות</p>
            <p>f&apos; ≥ 0 ⟹ f עולה {'      '}f&apos; ≤ 0 ⟹ f יורדת</p>
            <p>f&apos; = 0 ⟹ f קבועה {'     '}f&apos; {'>'} 0 ⟹ f עולה ממש</p>
            <p>f&apos; ≠ 0 ⟹ f חח&quot;ע (ממסקנת רול)</p>
          </div>

          <div>
            <p className="font-bold mb-1"># לופיטל (0/0 או ∞/∞)</p>
            <p>lim f/g = lim f&apos;/g&apos; {'  '}(בתנאי שהגבול של f&apos;/g&apos; קיים)</p>
            <p>תקף עבור: x→x₀±, x→x₀, x→±∞</p>
          </div>

          <div>
            <p className="font-bold mb-1"># אי-שוויונות חשובים</p>
            <p>eˣ ≥ 1+x {'              '}(לכל x ≥ 0)</p>
            <p>|sin x − sin y| ≤ |x−y| {'  '}|cos x − cos y| ≤ |x−y|</p>
            <p>x/(1+x) ≤ ln(1+x) ≤ x {'  '}(לכל x {'>'} −1)</p>
            <p>arctan(x) {'<'} x {'          '}(לכל x {'>'} 0)</p>
            <p>xˣ ≥ (1/e)^(1/e) {'        '}(לכל x {'>'} 0)</p>
          </div>

        </div>

      </div>
    </>
  );
}
