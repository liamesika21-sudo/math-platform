'use client';

// =============================================
// סיכום משפטים והוכחות — אינפי 1
// sup/inf, תכונת ε, פרמה, רול, לגראנז', קושי,
// ויירשטראס, ערך הביניים, ערך הביניים המורחב
// =============================================

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-50 px-1 rounded text-sm print:bg-transparent">{children}</span>;
}

function TheoremCard({ title, color, children }: { title: string; color: 'green' | 'blue' | 'purple' | 'rose' | 'amber' | 'teal' | 'indigo'; children: React.ReactNode }) {
  const colors = {
    green:  { border: 'border-green-500',  bg: 'bg-green-50',  header: 'bg-green-600',  text: 'text-green-800' },
    blue:   { border: 'border-blue-500',   bg: 'bg-blue-50',   header: 'bg-blue-600',   text: 'text-blue-800' },
    purple: { border: 'border-purple-500', bg: 'bg-purple-50', header: 'bg-purple-600', text: 'text-purple-800' },
    rose:   { border: 'border-rose-500',   bg: 'bg-rose-50',   header: 'bg-rose-600',   text: 'text-rose-800' },
    amber:  { border: 'border-amber-500',  bg: 'bg-amber-50',  header: 'bg-amber-600',  text: 'text-amber-800' },
    teal:   { border: 'border-teal-500',   bg: 'bg-teal-50',   header: 'bg-teal-600',   text: 'text-teal-800' },
    indigo: { border: 'border-indigo-500', bg: 'bg-indigo-50', header: 'bg-indigo-600', text: 'text-indigo-800' },
  };
  const c = colors[color];
  return (
    <div className={`rounded-lg border-2 ${c.border} my-5 print:break-inside-avoid`}>
      <div className={`${c.header} text-white px-4 py-2 rounded-t-md`}>
        <h3 className="font-bold text-base">{title}</h3>
      </div>
      <div className={`${c.bg} px-4 py-3 rounded-b-md space-y-2 text-sm`}>
        {children}
      </div>
    </div>
  );
}

function ProofBlock({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mt-2 bg-white border border-gray-300 rounded-lg p-3 text-sm space-y-2 print:break-inside-avoid">
      <div className="font-bold text-gray-700 text-xs border-b border-gray-200 pb-1 mb-2">
        {title || 'הוכחה'}:
      </div>
      {children}
      <div className="text-left font-bold text-gray-400 text-lg">&#8718;</div>
    </div>
  );
}

function Step({ n, children }: { n: number | string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">{n}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Def({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-r-4 border-blue-500 pr-4 py-2 my-4 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">הגדרה</span> <span className="text-blue-900">{title}</span></div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function Remark({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-r-4 border-amber-400 pr-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-xs mb-1 text-amber-700">הערה:</div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

function SectionDivider({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mt-10 mb-6 print:break-before-auto">
      <div className="bg-gradient-to-l from-gray-800 to-gray-900 text-white px-5 py-3 rounded-lg">
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-gray-300 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Corollary({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-r-4 border-orange-500 pr-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1"><span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">מסקנה</span> <span className="text-orange-900">{title}</span></div>
      <div className="text-sm space-y-1">{children}</div>
    </div>
  );
}

// =============================================
// Main Page
// =============================================

export default function PrintTheoremsPage() {
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
          .print\\:bg-transparent { background: transparent !important; }
          .print\\:break-before-auto { break-before: auto; }
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
        <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-2xl font-bold">אינפי 1 — משפטים והוכחות</h1>
          <p className="text-gray-500 mt-1 text-sm">sup/inf &bull; תכונת ε &bull; ויירשטראס &bull; ע&quot;ב &bull; פרמה &bull; רול &bull; לגראנז&apos; &bull; קושי</p>
        </div>

        {/* ============================================= */}
        {/* SECTION 1: SUP / INF */}
        {/* ============================================= */}
        <SectionDivider title="חלק א&apos; — חסם עליון (sup) וחסם תחתון (inf)" subtitle="הגדרות, קיום ויחידות" />

        <Def title="חסם מלעיל וחסם מלרע">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>.</p>
          <p><strong>חסום מלעיל:</strong> קיים <M>M ∈ ℝ</M> כך שלכל <M>a ∈ A</M>: <M>a ≤ M</M>. &nbsp; (M נקרא חסם מלעיל)</p>
          <p><strong>חסום מלרע:</strong> קיים <M>m ∈ ℝ</M> כך שלכל <M>a ∈ A</M>: <M>a ≥ m</M>. &nbsp; (m נקרא חסם מלרע)</p>
        </Def>

        <Def title="סופרמום — sup A (חסם עליון)">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלעיל. <M>s̄ ∈ ℝ</M> נקרא <strong>חסם עליון</strong> (supremum) של A אם:</p>
          <p><strong>(1)</strong> <M>s̄</M> חסם מלעיל: לכל <M>a ∈ A</M> מתקיים <M>a ≤ s̄</M>.</p>
          <p><strong>(2)</strong> <M>s̄</M> <strong>מינימלי</strong> בין החסמים מלעיל: לכל חסם מלעיל <M>M</M> של A מתקיים <M>s̄ ≤ M</M>.</p>
          <p>סימון: <M>s̄ = sup A</M>.</p>
        </Def>

        <Def title="אינפימום — inf A (חסם תחתון)">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלרע. <M>s ∈ ℝ</M> נקרא <strong>חסם תחתון</strong> (infimum) של A אם:</p>
          <p><strong>(1)</strong> <M>s</M> חסם מלרע: לכל <M>a ∈ A</M> מתקיים <M>a ≥ s</M>.</p>
          <p><strong>(2)</strong> <M>s</M> <strong>מקסימלי</strong> בין החסמים מלרע: לכל חסם מלרע <M>m</M> של A מתקיים <M>s ≥ m</M>.</p>
          <p>סימון: <M>s = inf A</M>.</p>
        </Def>

        <TheoremCard title="משפט — קיום ויחידות הסופרמום" color="green">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלעיל. אזי קיים <M>s̄ ∈ ℝ</M> יחיד כך ש-<M>s̄ = sup A</M>.</p>
          <ProofBlock>
            <Step n={1}>
              <p>נגדיר <M>B = {'{'}M ∈ ℝ : M חסם מלעיל של A{'}'}</M>. מתקיים <M>B ≠ ∅</M> (כי A חסומה מלעיל).</p>
            </Step>
            <Step n={2}>
              <p>לכל <M>a ∈ A</M> ולכל <M>M ∈ B</M>: <M>a ≤ M</M> (כי M חסם מלעיל). לכן <M>A ≤ B</M>.</p>
            </Step>
            <Step n={3}>
              <p><strong>מאקסיומת השלמות:</strong> קיים <M>s̄ ∈ ℝ</M> כך שלכל <M>a ∈ A</M> ולכל <M>M ∈ B</M>: <M>a ≤ s̄ ≤ M</M>.</p>
            </Step>
            <Step n={4}>
              <p><strong>s̄ חסם עליון:</strong></p>
              <p>(i) חסם מלעיל: לכל <M>a ∈ A</M> מתקיים <M>a ≤ s̄</M> (מצעד 3).</p>
              <p>(ii) מינימליות: לכל חסם מלעיל M של A, מתקיים <M>M ∈ B</M>, ולכן <M>s̄ ≤ M</M> (מצעד 3).</p>
            </Step>
            <Step n={5}>
              <p><strong>יחידות:</strong> אם <M>s̃</M> גם חסם עליון, אז גם <M>s̃ = min B</M> וגם <M>s̄ = min B</M>, לכן <M>s̄ = s̃</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <Remark>
          <p>באותו האופן, אם A חסומה מלרע אזי קיים <M>inf A</M> יחיד.</p>
        </Remark>

        {/* ============================================= */}
        {/* SECTION 2: EPSILON PROPERTY */}
        {/* ============================================= */}
        <SectionDivider title="חלק ב&apos; — תכונת ה-ε" subtitle="אפיון שקול של sup ו-inf" />

        <TheoremCard title="תכונת ה-ε של sup A" color="blue">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלעיל, ויהי <M>s̄</M> חסם מלעיל של A.</p>
          <p className="font-bold text-base text-center my-2">
            <M>s̄ = sup A</M> &nbsp;⟺&nbsp; לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'>'} s̄ - ε</M>
          </p>
          <p className="text-xs text-gray-600">כלומר: אין &quot;רווח&quot; בין s̄ לבין A — תמיד יש איבר של A קרוב ל-s̄ מלמטה.</p>
          <ProofBlock>
            <p className="font-bold text-indigo-700">כיוון ⟸ (תכונת ε ⟹ s̄ = sup A):</p>
            <Step n={1}>
              <p>נניח בשלילה שקיים חסם מלעיל <M>M {'<'} s̄</M>. נבחר <M>ε = s̄ - M {'>'} 0</M>.</p>
            </Step>
            <Step n={2}>
              <p>מתכונת ε: קיים <M>a ∈ A</M> כך ש-<M>a {'>'} s̄ - ε = s̄ - (s̄ - M) = M</M>.</p>
            </Step>
            <Step n={3}>
              <p>קיבלנו <M>a {'>'} M</M> כאשר <M>a ∈ A</M> — סתירה לכך ש-M חסם מלעיל של A.</p>
            </Step>
            <p className="font-bold text-indigo-700 mt-3">כיוון ⟹ (s̄ = sup A ⟹ תכונת ε):</p>
            <Step n={4}>
              <p>יהי <M>ε {'>'} 0</M>. אזי <M>s̄ - ε {'<'} s̄</M>. מכיוון ש-<M>s̄</M> הוא החסם מלעיל <strong>המינימלי</strong>, המספר <M>s̄ - ε</M> אינו חסם מלעיל.</p>
            </Step>
            <Step n={5}>
              <p>לכן קיים <M>a ∈ A</M> כך ש-<M>a {'>'} s̄ - ε</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <TheoremCard title="תכונת ה-ε של inf A" color="blue">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלרע, ויהי <M>s</M> חסם מלרע של A.</p>
          <p className="font-bold text-base text-center my-2">
            <M>s = inf A</M> &nbsp;⟺&nbsp; לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'<'} s + ε</M>
          </p>
          <p className="text-xs text-gray-600">כלומר: אין &quot;רווח&quot; בין s לבין A — תמיד יש איבר של A קרוב ל-s מלמעלה.</p>
          <ProofBlock>
            <p>ההוכחה סימטרית להוכחת תכונת ε של sup:</p>
            <p className="font-bold text-indigo-700">כיוון ⟸:</p>
            <Step n={1}>
              <p>נניח בשלילה שקיים חסם מלרע <M>m {'>'} s</M>. נבחר <M>ε = m - s {'>'} 0</M>.</p>
            </Step>
            <Step n={2}>
              <p>מתכונת ε: קיים <M>a ∈ A</M> כך ש-<M>a {'<'} s + ε = s + (m - s) = m</M>.</p>
            </Step>
            <Step n={3}>
              <p>קיבלנו <M>a {'<'} m</M> כאשר <M>a ∈ A</M> — סתירה לכך ש-m חסם מלרע.</p>
            </Step>
            <p className="font-bold text-indigo-700 mt-3">כיוון ⟹:</p>
            <Step n={4}>
              <p>יהי <M>ε {'>'} 0</M>. <M>s + ε {'>'} s</M>. מכיוון ש-<M>s</M> הוא החסם מלרע <strong>המקסימלי</strong>, <M>s + ε</M> אינו חסם מלרע, לכן קיים <M>a ∈ A</M> עם <M>a {'<'} s + ε</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        {/* ============================================= */}
        {/* SECTION 3: WEIERSTRASS */}
        {/* ============================================= */}
        <SectionDivider title="חלק ג&apos; — משפט ויירשטראס (Weierstrass)" subtitle="פונקציה רציפה על קטע סגור וחסום מקבלת מקסימום ומינימום" />

        <TheoremCard title="משפט ויירשטראס — Extreme Value Theorem" color="purple">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>, ותהי <M>f</M> פונקציה המוגדרת ב-<M>[a,b]</M>.</p>
          <p>נניח ש-<M>f</M> <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי f מקבלת <strong>מקסימום ומינימום</strong> ב-<M>[a,b]</M>
          </p>
          <p>כלומר: קיימות <M>x₁, x₂ ∈ [a,b]</M> כך שלכל <M>x ∈ [a,b]</M>: <M>f(x₂) ≤ f(x) ≤ f(x₁)</M>.</p>
          <ProofBlock>
            <p>לא נוכיח (מוכח ע&quot;י קומפקטיות).</p>
          </ProofBlock>
        </TheoremCard>

        <Remark>
          <p><strong>שני התנאים חיוניים:</strong></p>
          <p>• <strong>ללא &quot;סגור&quot;:</strong> <M>f(x) = 1/x</M> על <M>(0,1]</M> — רציפה אך לא חסומה, אין מקסימום.</p>
          <p>• <strong>ללא &quot;רציפה&quot;:</strong> <M>f(x) = x</M> אם <M>x {'<'} 1</M> ו-<M>f(1) = 0</M> על <M>[0,1]</M> — אין מקסימום.</p>
        </Remark>

        {/* ============================================= */}
        {/* SECTION 4: IVT */}
        {/* ============================================= */}
        <SectionDivider title="חלק ד&apos; — משפט ערך הביניים (IVT)" subtitle="Bolzano + הגרסה המורחבת" />

        <TheoremCard title="משפט ערך הביניים — גרסת בולצאנו" color="teal">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>, ותהי <M>f</M> פונקציה המוגדרת ב-<M>[a,b]</M>.</p>
          <p>נניח ש-<M>f</M> <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p>נניח בנוסף כי <M>f(a) · f(b) {'<'} 0</M> (כלומר, לf ערכים עם סימנים שונים בקצוות).</p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי קיימת <M>c ∈ (a,b)</M> כך ש-<M>f(c) = 0</M>
          </p>
          <ProofBlock>
            <p className="font-bold text-teal-700">מקרה: <M>f(a) {'<'} 0 {'<'} f(b)</M> (המקרה ההפוך סימטרי)</p>

            <Step n={1}>
              <p><strong>הגדרת הקבוצה:</strong> נגדיר <M>A = {'{'}x ∈ [a,b] : f(x) {'<'} 0{'}'}</M>.</p>
              <p>• <M>A ≠ ∅</M> כי <M>a ∈ A</M> (שכן <M>f(a) {'<'} 0</M>).</p>
              <p>• <M>A ⊆ [a,b]</M> לכן A חסומה מלעיל ע&quot;י b.</p>
            </Step>

            <Step n={2}>
              <p><strong>הגדרת c:</strong> נגדיר <M>c = sup A</M>. מתקיים <M>a ≤ c ≤ b</M>.</p>
            </Step>

            <Step n={3}>
              <p><strong>נוכיח: <M>f(c) = 0</M></strong> (ע&quot;י שלילת שני המקרים האחרים):</p>
            </Step>

            <Step n="i">
              <p><strong>נניח בשלילה <M>f(c) {'<'} 0</M>:</strong></p>
              <p>מהיות <M>f(c) {'<'} 0</M> ו-<M>f(b) {'>'} 0</M>, נקבל <M>c ≠ b</M>, לכן <M>a ≤ c {'<'} b</M>.</p>
              <p>f רציפה מימין ב-c, לכן קיים <M>δ₁ {'>'} 0</M> כך שלכל <M>c {'<'} x {'<'} c + δ₁</M>: <M>f(x) {'<'} 0</M>.</p>
              <p>נבחר <M>x₁ = (c + c + δ₁)/2</M>. מתקיים <M>c {'<'} x₁ {'<'} c + δ₁</M> ולכן <M>f(x₁) {'<'} 0</M>, לכן <M>x₁ ∈ A</M>.</p>
              <p>אבל <M>x₁ {'>'} c = sup A</M> — <strong>סתירה!</strong></p>
            </Step>

            <Step n="ii">
              <p><strong>נניח בשלילה <M>f(c) {'>'} 0</M>:</strong></p>
              <p>מהיות <M>f(c) {'>'} 0</M> ו-<M>f(a) {'<'} 0</M>, נקבל <M>c ≠ a</M>, לכן <M>a {'<'} c ≤ b</M>.</p>
              <p>f רציפה משמאל ב-c, לכן קיים <M>δ₂ {'>'} 0</M> כך שלכל <M>c - δ₂ {'<'} x ≤ c</M>: <M>f(x) {'>'} 0</M>.</p>
              <p>מכיוון ש-<M>c = sup A</M>, קיים (מתכונת ε) <M>x₂ ∈ A</M> כך ש-<M>x₂ {'>'} c - δ₂</M>.</p>
              <p>לכן <M>c - δ₂ {'<'} x₂ ≤ c</M>, ולכן <M>f(x₂) {'>'} 0</M>.</p>
              <p>אבל <M>x₂ ∈ A</M> ולכן <M>f(x₂) {'<'} 0</M> — <strong>סתירה!</strong></p>
            </Step>

            <Step n={4}>
              <p>שללנו <M>f(c) {'<'} 0</M> ו-<M>f(c) {'>'} 0</M>. לכן <M>f(c) = 0</M>.</p>
              <p>בנוסף, <M>f(c) = 0 ≠ f(a)</M> ו-<M>f(c) = 0 ≠ f(b)</M>, לכן <M>c ≠ a, b</M>, כלומר <M>a {'<'} c {'<'} b</M>.</p>
            </Step>

            <p className="mt-2 font-bold text-teal-700">מקרה: <M>f(a) {'>'} 0 {'>'} f(b)</M>:</p>
            <Step n={5}>
              <p>נגדיר <M>g(x) = -f(x)</M>. אז g רציפה מאש&quot;ר ובנוסף <M>g(a) {'<'} 0 {'<'} g(b)</M>.</p>
              <p>מהמקרה הראשון, קיימת <M>c ∈ (a,b)</M> עם <M>g(c) = 0</M>, לכן <M>-f(c) = 0</M>, לכן <M>f(c) = 0</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <TheoremCard title="משפט ערך הביניים המורחב" color="teal">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>, ותהי <M>f</M> <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p>יהי <M>r ∈ ℝ</M>. נניח כי r נמצא בין <M>f(a)</M> ל-<M>f(b)</M>, כלומר:</p>
          <p className="text-center"><M>f(a) ≤ r ≤ f(b)</M> &nbsp;או&nbsp; <M>f(b) ≤ r ≤ f(a)</M></p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי קיימת <M>c ∈ [a,b]</M> כך ש-<M>f(c) = r</M>
          </p>
          <ProofBlock>
            <Step n={1}>
              <p>אם <M>f(a) = r</M> נבחר <M>c = a</M>. אם <M>f(b) = r</M> נבחר <M>c = b</M>. נסיים.</p>
            </Step>
            <Step n={2}>
              <p>אחרת, נניח כי <M>f(a) {'<'} r {'<'} f(b)</M> (או <M>f(b) {'<'} r {'<'} f(a)</M>).</p>
            </Step>
            <Step n={3}>
              <p>נגדיר <M>g(x) = f(x) - r</M> לכל <M>x ∈ [a,b]</M>. g רציפה מאש&quot;ר.</p>
            </Step>
            <Step n={4}>
              <p><strong>אם <M>f(a) {'<'} r {'<'} f(b)</M>:</strong></p>
              <p><M>g(a) = f(a) - r {'<'} 0</M> &nbsp;ו-&nbsp; <M>g(b) = f(b) - r {'>'} 0</M>.</p>
            </Step>
            <Step n={5}>
              <p><strong>אם <M>f(b) {'<'} r {'<'} f(a)</M>:</strong></p>
              <p><M>g(a) = f(a) - r {'>'} 0</M> &nbsp;ו-&nbsp; <M>g(b) = f(b) - r {'<'} 0</M>.</p>
            </Step>
            <Step n={6}>
              <p>בשני המקרים <M>g(a) · g(b) {'<'} 0</M>. ממשפט ע&quot;ב (בולצאנו) קיימת <M>c ∈ (a,b)</M> עם <M>g(c) = 0</M>.</p>
              <p>לכן <M>f(c) - r = 0</M>, כלומר <M>f(c) = r</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <TheoremCard title="משפט נקודת השבת (Fixed Point)" color="teal">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>, ותהי <M>f</M> <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p>נניח בנוסף כי <M>Im f ⊆ [a,b]</M> (כלומר, לכל <M>x ∈ [a,b]</M>: <M>a ≤ f(x) ≤ b</M>).</p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי קיימת <M>c ∈ [a,b]</M> כך ש-<M>f(c) = c</M>
          </p>
          <ProofBlock>
            <Step n={1}>
              <p>נגדיר <M>g(x) = f(x) - x</M> לכל <M>x ∈ [a,b]</M>. g רציפה מאש&quot;ר.</p>
            </Step>
            <Step n={2}>
              <p><M>g(a) = f(a) - a ≥ a - a = 0</M> &nbsp;(כי <M>f(a) ∈ Im f ⊆ [a,b]</M> ולכן <M>f(a) ≥ a</M>).</p>
            </Step>
            <Step n={3}>
              <p><M>g(b) = f(b) - b ≤ b - b = 0</M> &nbsp;(כי <M>f(b) ∈ Im f ⊆ [a,b]</M> ולכן <M>f(b) ≤ b</M>).</p>
            </Step>
            <Step n={4}>
              <p><M>g(b) ≤ 0 ≤ g(a)</M>. ממשפט ערך הביניים המורחב, קיימת <M>c ∈ [a,b]</M> עם <M>g(c) = 0</M>.</p>
              <p>לכן <M>f(c) - c = 0</M>, כלומר <M>f(c) = c</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        {/* ============================================= */}
        {/* SECTION 5: FERMAT */}
        {/* ============================================= */}
        <SectionDivider title="חלק ה&apos; — משפט פרמה (Fermat)" subtitle="תנאי הכרחי לנקודת קיצון של פונקציה גזירה" />

        <Def title="קיצון מקומי">
          <p>תהי <M>f: D → ℝ</M> ויהי <M>x₀ ∈ D</M>.</p>
          <p>(i) <M>x₀</M> נקודת <strong>מקסימום</strong> של f אם לכל <M>x ∈ D</M>: <M>f(x) ≤ f(x₀)</M>.</p>
          <p>(ii) <M>x₀</M> נקודת <strong>מינימום</strong> של f אם לכל <M>x ∈ D</M>: <M>f(x) ≥ f(x₀)</M>.</p>
          <p>(iii) <M>x₀</M> נקודת <strong>קיצון</strong> (extremum) של f אם x₀ מקסימום או מינימום של f.</p>
        </Def>

        <TheoremCard title="משפט פרמה (Fermat)" color="rose">
          <p>תהי f מוגדרת בסביבת <M>x₀</M>. נניח ש:</p>
          <p><strong>(1)</strong> <M>x₀</M> <strong>נקודת קיצון מקומי</strong> של f.</p>
          <p><strong>(2)</strong> f <strong>גזירה</strong> ב-<M>x₀</M>.</p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי <M>f&apos;(x₀) = 0</M>
          </p>
          <ProofBlock>
            <p className="font-bold text-rose-700">נניח ש-x₀ מקסימום מקומי (מינימום — באופן דומה).</p>
            <Step n={1}>
              <p>קיים <M>δ {'>'} 0</M> כך שלכל <M>x ∈ (x₀ - δ, x₀ + δ)</M>: <M>f(x) ≤ f(x₀)</M>.</p>
              <p>לכן: <M>f(x) - f(x₀) ≤ 0</M> לכל x בסביבה.</p>
            </Step>
            <Step n={2}>
              <p><strong>מימין:</strong> עבור <M>x {'>'} x₀</M> (ולכן <M>x - x₀ {'>'} 0</M>):</p>
              <p className="text-center font-mono bg-white rounded px-2 py-1"><M>[f(x) - f(x₀)] / (x - x₀) ≤ 0</M></p>
              <p>בגבול <M>x → x₀⁺</M> נקבל: <M>f&apos;(x₀) ≤ 0</M>.</p>
            </Step>
            <Step n={3}>
              <p><strong>משמאל:</strong> עבור <M>x {'<'} x₀</M> (ולכן <M>x - x₀ {'<'} 0</M>):</p>
              <p className="text-center font-mono bg-white rounded px-2 py-1"><M>[f(x) - f(x₀)] / (x - x₀) ≥ 0</M></p>
              <p>בגבול <M>x → x₀⁻</M> נקבל: <M>f&apos;(x₀) ≥ 0</M>.</p>
            </Step>
            <Step n={4}>
              <p>מכיוון ש-<M>f&apos;(x₀) ≤ 0</M> וגם <M>f&apos;(x₀) ≥ 0</M>, נקבל: <M>f&apos;(x₀) = 0</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <Remark>
          <p><strong>ההפך לא נכון!</strong> <M>f&apos;(x₀) = 0</M> לא גורר שx₀ קיצון. למשל: <M>f(x) = x³</M>, <M>f&apos;(0) = 0</M> אבל 0 אינה נקודת קיצון.</p>
        </Remark>

        {/* ============================================= */}
        {/* SECTION 6: ROLLE */}
        {/* ============================================= */}
        <SectionDivider title="חלק ו&apos; — משפט רול (Rolle)" subtitle="מקרה פרטי של לגראנז' — כאשר f(a) = f(b)" />

        <TheoremCard title="משפט רול (Rolle)" color="amber">
          <p>תהי f המקיימת:</p>
          <p><strong>(1)</strong> f <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p><strong>(2)</strong> f <strong>גזירה</strong> ב-<M>(a,b)</M>.</p>
          <p><strong>(3)</strong> <M>f(a) = f(b)</M>.</p>
          <p className="font-bold text-base text-center my-2 bg-white rounded p-2">
            אזי קיימת <M>c ∈ (a,b)</M> כך ש-<M>f&apos;(c) = 0</M>
          </p>
          <ProofBlock>
            <Step n={1}>
              <p><strong>ממשפט ויירשטראס:</strong> f רציפה ב-<M>[a,b]</M> סגור וחסום, לכן f מקבלת מקסימום ומינימום ב-<M>[a,b]</M>.</p>
            </Step>
            <Step n={2}>
              <p><strong>מקרה 1:</strong> max = min. אזי f <strong>קבועה</strong> ב-<M>[a,b]</M>, ולכן <M>f&apos;(c) = 0</M> לכל <M>c ∈ (a,b)</M>.</p>
            </Step>
            <Step n={3}>
              <p><strong>מקרה 2:</strong> max ≠ min. מכיוון ש-<M>f(a) = f(b)</M>, לא ייתכן ששני הערכים (max ו-min) מתקבלים <strong>רק</strong> בקצוות a, b.</p>
              <p>לכן לפחות אחד מהם מתקבל בנקודה פנימית <M>c ∈ (a,b)</M>.</p>
            </Step>
            <Step n={4}>
              <p>c היא נקודת קיצון מקומי בפנים הקטע, ו-f גזירה ב-c. <strong>ממשפט פרמה:</strong> <M>f&apos;(c) = 0</M>.</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        {/* ============================================= */}
        {/* SECTION 7: LAGRANGE */}
        {/* ============================================= */}
        <SectionDivider title="חלק ז&apos; — משפט לגראנז&apos; (Lagrange / MVT)" subtitle="משפט הערך הממוצע — הכללה של רול" />

        <TheoremCard title="משפט הערך הממוצע — לגראנז&apos; (MVT)" color="green">
          <p>תהי f המקיימת:</p>
          <p><strong>(1)</strong> f <strong>רציפה</strong> ב-<M>[a,b]</M>.</p>
          <p><strong>(2)</strong> f <strong>גזירה</strong> ב-<M>(a,b)</M>.</p>
          <p className="font-bold text-lg text-center my-3 bg-white rounded p-2">
            אזי קיימת <M>c ∈ (a,b)</M> כך ש-<M>f&apos;(c) = [f(b) − f(a)] / (b − a)</M>
          </p>
          <p className="text-xs text-gray-600"><strong>פרשנות גיאומטרית:</strong> קיימת נקודה על הגרף שבה המשיק מקביל למיתר המחבר את (a,f(a)) ל-(b,f(b)).</p>
          <ProofBlock>
            <Step n={1}>
              <p><strong>הגדרת פונקציית עזר:</strong> נגדיר <M>α = [f(b) - f(a)] / (b - a)</M> (שיפוע המיתר).</p>
              <p>ונגדיר: <M>g(x) = f(x) - α · x</M>.</p>
            </Step>
            <Step n={2}>
              <p><strong>בדיקה ש-g(a) = g(b):</strong></p>
              <p><M>g(a) = f(a) - α · a</M></p>
              <p><M>g(b) = f(b) - α · b = f(b) - [f(b)-f(a)]/(b-a) · b</M></p>
              <p>חישוב: <M>g(b) = f(b) - α·b</M> ו-<M>g(a) = f(a) - α·a</M></p>
              <p><M>g(b) - g(a) = [f(b) - f(a)] - α(b-a) = [f(b)-f(a)] - [f(b)-f(a)] = 0</M></p>
              <p>לכן <M>g(a) = g(b)</M>.</p>
            </Step>
            <Step n={3}>
              <p>g רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M> (כסכום/הפרש פונקציות). <strong>ממשפט רול:</strong> קיימת <M>c ∈ (a,b)</M> עם <M>g&apos;(c) = 0</M>.</p>
            </Step>
            <Step n={4}>
              <p><M>g&apos;(x) = f&apos;(x) - α</M>, לכן:</p>
              <p className="text-center font-mono bg-white rounded px-2 py-1"><M>0 = g&apos;(c) = f&apos;(c) - α &nbsp;⟹&nbsp; f&apos;(c) = α = [f(b) - f(a)] / (b - a)</M></p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <Corollary title="מסקנות מונוטוניות מ-MVT">
          <p>תהי f רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>. אזי:</p>
          <p><strong>(i)</strong> <M>f&apos; ≥ 0</M> ב-<M>(a,b)</M> ⟹ f <strong>עולה</strong> ב-<M>[a,b]</M></p>
          <p><strong>(ii)</strong> <M>f&apos; ≤ 0</M> ב-<M>(a,b)</M> ⟹ f <strong>יורדת</strong> ב-<M>[a,b]</M></p>
          <p><strong>(iii)</strong> <M>f&apos; = 0</M> ב-<M>(a,b)</M> ⟹ f <strong>קבועה</strong> ב-<M>[a,b]</M></p>
          <p><strong>(iv)</strong> <M>f&apos; {'>'} 0</M> ב-<M>(a,b)</M> ⟹ f <strong>עולה ממש</strong> ב-<M>[a,b]</M></p>
          <p><strong>(v)</strong> <M>f&apos; {'<'} 0</M> ב-<M>(a,b)</M> ⟹ f <strong>יורדת ממש</strong> ב-<M>[a,b]</M></p>
        </Corollary>

        <Remark>
          <p><strong>רול הוא מקרה פרטי של לגראנז&apos;:</strong> כאשר <M>f(a) = f(b)</M>, אגף ימין = 0, ולכן <M>f&apos;(c) = 0</M>.</p>
        </Remark>

        {/* ============================================= */}
        {/* SECTION 8: CAUCHY */}
        {/* ============================================= */}
        <SectionDivider title="חלק ח&apos; — משפט קושי (Cauchy MVT)" subtitle="הכללה של לגראנז' — יחס בין שתי פונקציות" />

        <TheoremCard title="משפט קושי — משפט הערך הממוצע המוכלל (Cauchy&apos;s MVT)" color="indigo">
          <p>תהיינה <M>f, g</M> המקיימות:</p>
          <p><strong>(1)</strong> f, g <strong>רציפות</strong> ב-<M>[a,b]</M>.</p>
          <p><strong>(2)</strong> f, g <strong>גזירות</strong> ב-<M>(a,b)</M>.</p>
          <p><strong>(3)</strong> <M>g&apos;(x) ≠ 0</M> לכל <M>x ∈ (a,b)</M>.</p>
          <p className="font-bold text-lg text-center my-3 bg-white rounded p-2">
            אזי <M>g(a) ≠ g(b)</M> וקיימת <M>c ∈ (a,b)</M> כך ש-<M>[f(b)−f(a)] / [g(b)−g(a)] = f&apos;(c) / g&apos;(c)</M>
          </p>
          <ProofBlock>
            <Step n={0}>
              <p><strong>ראשית:</strong> <M>g(a) ≠ g(b)</M>, כי אחרת ממשפט רול על g קיימת <M>c</M> עם <M>g&apos;(c) = 0</M> — סתירה לתנאי (3).</p>
            </Step>
            <Step n={1}>
              <p><strong>הגדרת פונקציית עזר:</strong> נגדיר <M>α = [f(b) - f(a)] / [g(b) - g(a)]</M>.</p>
              <p>ונגדיר: <M>h(x) = f(x) - α · g(x)</M>.</p>
            </Step>
            <Step n={2}>
              <p><strong>בדיקה ש-h(a) = h(b):</strong></p>
              <p><M>h(a) = f(a) - α · g(a)</M>, &nbsp; <M>h(b) = f(b) - α · g(b)</M>.</p>
              <p><M>h(b) - h(a) = [f(b)-f(a)] - α · [g(b)-g(a)] = [f(b)-f(a)] - [f(b)-f(a)] = 0</M></p>
              <p>לכן <M>h(a) = h(b)</M>.</p>
            </Step>
            <Step n={3}>
              <p>h רציפה ב-<M>[a,b]</M> וגזירה ב-<M>(a,b)</M>. <strong>ממשפט רול:</strong> קיימת <M>c ∈ (a,b)</M> עם <M>h&apos;(c) = 0</M>.</p>
            </Step>
            <Step n={4}>
              <p><M>h&apos;(x) = f&apos;(x) - α · g&apos;(x)</M>, לכן:</p>
              <p className="text-center font-mono bg-white rounded px-2 py-1"><M>0 = f&apos;(c) - α · g&apos;(c) &nbsp;⟹&nbsp; α = f&apos;(c) / g&apos;(c)</M></p>
              <p>(חלוקה ב-<M>g&apos;(c)</M> חוקית כי <M>g&apos;(c) ≠ 0</M> מתנאי (3)).</p>
            </Step>
          </ProofBlock>
        </TheoremCard>

        <Remark>
          <p><strong>לגראנז&apos; הוא מקרה פרטי של קושי:</strong> כאשר <M>g(x) = x</M>, מתקבל <M>[f(b)−f(a)]/(b−a) = f&apos;(c)/1 = f&apos;(c)</M>.</p>
        </Remark>

        {/* ============================================= */}
        {/* SUMMARY CHAIN */}
        {/* ============================================= */}
        <SectionDivider title="שרשרת ההוכחות" subtitle="הקשר הלוגי בין המשפטים" />

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-5 my-4 print:break-inside-avoid">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">אקסיומה</span>
              <span><strong>אקסיומת השלמות</strong> → קיום ויחידות sup (ו-inf)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">sup</span>
              <span><strong>תכונת ε</strong> — אפיון שקול של sup ו-inf</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-purple-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">רציפות</span>
              <span><strong>ויירשטראס</strong> — רציפה על [a,b] ⟹ מקבלת max ו-min</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-teal-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">רציפות</span>
              <span><strong>ע&quot;ב (בולצאנו)</strong> — משתמש ב-sup + תכונת ε + רציפות</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-teal-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">ע&quot;ב</span>
              <span><strong>ע&quot;ב המורחב</strong> — נובע ישירות מבולצאנו (ע&quot;י g(x) = f(x) - r)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-rose-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">נגזרות</span>
              <span><strong>פרמה</strong> — גזירה + קיצון ⟹ f&apos;(x₀) = 0 (מגבולות חד-צדדיים)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-amber-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">פרמה + ויירשטראס</span>
              <span><strong>רול</strong> — f(a)=f(b) + ויירשטראס ⟹ קיצון פנימי ⟹ פרמה</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">רול</span>
              <span><strong>לגראנז&apos;</strong> — g(x) = f(x) - αx ⟹ g(a) = g(b) ⟹ רול</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded font-bold text-xs whitespace-nowrap">רול</span>
              <span><strong>קושי</strong> — h(x) = f(x) - α·g(x) ⟹ h(a) = h(b) ⟹ רול</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
          <p>סיכום משפטים והוכחות — אינפי 1</p>
        </div>
      </div>
    </>
  );
}
