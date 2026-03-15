'use client';

// =============================================
// Infi 1 — Comprehensive Exam Cheat Sheet
// Style: Dense, compact, matching liner-summary
// =============================================

function Label({ type, children }: { type: 'def' | 'thm' | 'tech' | 'tip' | 'cor' | 'rem'; children: React.ReactNode }) {
  const styles = {
    def: 'bg-blue-100 text-blue-800 border-blue-300',
    thm: 'bg-green-100 text-green-800 border-green-300',
    tech: 'bg-purple-100 text-purple-800 border-purple-300',
    tip: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    cor: 'bg-orange-100 text-orange-800 border-orange-300',
    rem: 'bg-amber-100 text-amber-800 border-amber-300',
  };
  return (
    <span className={`inline-block text-xs font-bold px-1.5 py-0.5 rounded border ${styles[type]} ml-1`}>
      {children}
    </span>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div className="bg-emerald-600 text-white px-3 py-1.5 rounded-t-lg mt-6 mb-2 print:break-after-avoid">
      <h2 className="text-base font-bold">&#9670; {title}</h2>
    </div>
  );
}

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-sm">{children}</span>;
}

function Block({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-b-lg px-3 py-2 mb-1 text-sm space-y-2 print:break-inside-avoid">
      {children}
    </div>
  );
}

function Item({ label, title, children }: { label: 'def' | 'thm' | 'tech' | 'tip' | 'cor' | 'rem'; title: string; children: React.ReactNode }) {
  const labelText = { def: 'הגדרה', thm: 'משפט', tech: 'טכניקה', tip: 'טיפ', cor: 'מסקנה', rem: 'הערה' };
  return (
    <div className="print:break-inside-avoid">
      <p><Label type={label}>{labelText[label]}</Label> <strong>{title}</strong></p>
      <div className="text-sm mr-1">{children}</div>
    </div>
  );
}

export default function InfiSummaryPage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 10pt; }
          * { box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          @page { margin: 1cm; }
        }
      `}</style>

      <div dir="rtl" className="print-page max-w-5xl mx-auto p-4 bg-white text-black">

        {/* Print Button */}
        <div className="no-print flex justify-between items-center mb-3">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
          >
            הדפס עמוד
          </button>
          <a href="/" className="text-indigo-600 underline text-sm">חזרה לעמוד הראשי</a>
        </div>

        {/* Header */}
        <div className="text-center border-b-2 border-black pb-3 mb-2">
          <h1 className="text-2xl font-bold">סיכום חשבון אינפיניטסימלי 1</h1>
          <p className="text-gray-600 text-sm">הרצאות 1-23 &bull; תרגולים &bull; שיעורי בית &bull; מותאם למבחני 2026</p>
        </div>

        {/* ================================================== */}
        {/* LIMITS */}
        {/* ================================================== */}
        <Section title="גבולות פונקציות — הגדרות וכללים" />
        <Block>
          <Item label="def" title="גבול פונקציה (ε-δ)">
            <p><M>lim_{'{x→x₀}'} f(x) = L</M>: לכל <M>ε{'>'} 0</M> קיים <M>δ{'>'} 0</M> כך שלכל <M>0{'<'}|x−x₀|{'<'}δ</M> מתקיים <M>|f(x)−L|{'<'}ε</M>.</p>
          </Item>
          <Item label="def" title="גבולות חד-צדדיים / באינסוף">
            <p><M>lim_{'{x→x₀⁺}'}</M>: רק <M>x₀{'<'}x{'<'}x₀+δ</M>. <M>lim_{'{x→x₀⁻}'}</M>: רק <M>x₀−δ{'<'}x{'<'}x₀</M>.</p>
            <p><M>lim_{'{x→∞}'} f(x) = L</M>: לכל <M>ε{'>'} 0</M> קיים <M>M</M> כך שלכל <M>x{'>'}M</M>: <M>|f(x)−L|{'<'}ε</M>.</p>
          </Item>
          <Item label="thm" title="יחידות הגבול">
            <p>אם <M>lim f(x) = L₁</M> וגם <M>= L₂</M> אזי <M>L₁ = L₂</M>.</p>
          </Item>
          <Item label="thm" title="חוקי אריתמטיקה של גבולות (AOL)">
            <p><M>lim(f±g) = L₁±L₂</M>. <M>lim(f·g) = L₁·L₂</M>. <M>lim(f/g) = L₁/L₂</M> (אם <M>L₂≠0</M>).</p>
            <p><M>lim(c·f) = c·L</M>. <M>lim|f| = |L|</M>.</p>
          </Item>
          <Item label="thm" title="סנדוויץ&apos; (Squeeze)">
            <p><M>g(x) ≤ f(x) ≤ h(x)</M> בסביבת <M>x₀</M>, <M>lim g = lim h = L</M> ⟹ <M>lim f = L</M>.</p>
          </Item>
          <Item label="thm" title="חסימות × אפס = אפס">
            <p><M>lim f = 0</M>, g חסומה בסביבת <M>x₀</M> ⟹ <M>lim(f·g) = 0</M>.</p>
          </Item>
          <Item label="thm" title="היינה (Heine)">
            <p><M>lim_{'{x→x₀}'} f(x) = L</M> ⟺ לכל סדרה <M>xₙ→x₀</M> (עם <M>xₙ≠x₀</M>) מתקיים <M>f(xₙ)→L</M>.</p>
            <p><strong>שימוש:</strong> שלילת קיום גבול — מצא 2 סדרות עם גבולות שונים.</p>
          </Item>
          <Item label="thm" title="הרכבת גבולות">
            <p>f רציפה ב-<M>x₀</M>, g רציפה ב-<M>f(x₀)</M> ⟹ <M>lim_{'{x→x₀}'} g(f(x)) = g(f(x₀))</M>.</p>
          </Item>
        </Block>

        <Block>
          <Item label="tech" title="גבולות חשובים">
            <div className="font-mono text-sm grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1">
              <p>lim_{'{x→0}'} sin(x)/x = 1</p>
              <p>lim_{'{x→0}'} (1−cos x)/x² = 1/2</p>
              <p>lim_{'{x→0}'} (eˣ−1)/x = 1</p>
              <p>lim_{'{x→0}'} ln(1+x)/x = 1</p>
              <p>lim_{'{x→0}'} (1+x)^(1/x) = e</p>
              <p>lim_{'{x→∞}'} (1+1/x)ˣ = e</p>
              <p>lim_{'{x→0}'} arctg(x)/x = 1</p>
              <p>lim_{'{x→0}'} arcsin(x)/x = 1</p>
              <p>lim_{'{x→∞}'} eˣ/xⁿ = ∞</p>
              <p>lim_{'{x→∞}'} ln(x)/xᵅ = 0 (α{'>'}0)</p>
              <p>lim_{'{x→0⁺}'} x·ln(x) = 0</p>
              <p>lim_{'{x→0⁺}'} xˣ = 1</p>
            </div>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* CONTINUITY */}
        {/* ================================================== */}
        <Section title="רציפות — הגדרות ומשפטים" />
        <Block>
          <Item label="def" title="רציפות בנקודה">
            <p><M>f</M> רציפה ב-<M>x₀</M> אם <M>lim_{'{x→x₀}'} f(x) = f(x₀)</M>. שקול: לכל <M>ε{'>'} 0</M> קיים <M>δ{'>'} 0</M> כך ש-<M>|x−x₀|{'<'}δ ⟹ |f(x)−f(x₀)|{'<'}ε</M>.</p>
          </Item>
          <Item label="thm" title="אריתמטיקה של רציפות (AOC)">
            <p>f, g רציפות ⟹ <M>f±g</M>, <M>f·g</M>, <M>f/g</M> (אם <M>g≠0</M>), <M>f∘g</M> רציפות.</p>
            <p>פונקציות אלמנטריות (<M>eˣ, sin, cos, ln, xᵅ, arctg, ...</M>) רציפות בתחומן.</p>
          </Item>
          <Item label="thm" title="ערך הביניים (IVT)">
            <p>f רציפה ב-<M>[a,b]</M>, <M>f(a){'<'}c{'<'}f(b)</M> ⟹ ∃<M>ξ∈(a,b)</M>: <M>f(ξ)=c</M>.</p>
            <p><strong>שימוש עיקרי:</strong> הוכחת קיום שורש — הראה <M>f(a)·f(b) {'<'} 0</M>.</p>
          </Item>
          <Item label="thm" title="ויירשטראס (EVT / ערכי קיצון)">
            <p>f רציפה ב-<M>[a,b]</M> (סגור וחסום!) ⟹ f מקבלת <strong>מקסימום ומינימום</strong>.</p>
            <p>כלומר ∃<M>c,d∈[a,b]</M>: <M>f(c) ≤ f(x) ≤ f(d)</M> לכל <M>x∈[a,b]</M>.</p>
          </Item>
        </Block>

        <Block>
          <Item label="def" title="רציפות במידה שווה (רב&quot;ש)">
            <p>לכל <M>ε{'>'} 0</M> קיים <M>δ{'>'} 0</M> כך שלכל <M>x,y</M> בתחום: <M>|x−y|{'<'}δ ⟹ |f(x)−f(y)|{'<'}ε</M>.</p>
            <p><strong>ההבדל מרציפות:</strong> δ <strong>לא תלוי בנקודה</strong> — אותו δ עובד לכל x,y!</p>
          </Item>
          <Item label="def" title="ליפשיץ (Lipschitz)">
            <p>∃<M>L{'>'} 0</M> כך שלכל <M>x,y</M>: <M>|f(x)−f(y)| ≤ L·|x−y|</M>.</p>
          </Item>
          <Item label="thm" title="שרשרת: ליפשיץ ⟹ רב&quot;ש ⟹ רציפה (ההפך לא נכון!)">
            <p />
          </Item>
          <Item label="thm" title="קנטור">
            <p>f רציפה ב-<M>[a,b]</M> (<strong>סגור וחסום!</strong>) ⟹ f רב&quot;ש ב-<M>[a,b]</M>.</p>
          </Item>
          <Item label="tech" title="שלילת רב&quot;ש">
            <p>מצא סדרות <M>xₙ, yₙ</M> עם <M>|xₙ−yₙ|→0</M> אבל <M>|f(xₙ)−f(yₙ)| ≥ ε₀</M>.</p>
            <p><strong>דוגמה:</strong> <M>f(x)=sin(1/x)</M> ב-<M>(0,1)</M>: <M>xₙ=1/(2πn), yₙ=1/(2πn+π/2)</M>.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* DERIVATIVES */}
        {/* ================================================== */}
        <Section title="נגזרות — הגדרות, טבלה וכללי גזירה" />
        <Block>
          <Item label="def" title="נגזרת">
            <p><M>f&apos;(x₀) = lim_{'{x→x₀}'} [f(x)−f(x₀)]/(x−x₀) = lim_{'{h→0}'} [f(x₀+h)−f(x₀)]/h</M></p>
          </Item>
          <Item label="thm" title="גזירה ⟹ רציפה (ההפך לא נכון!)">
            <p>דוגמת נגד: <M>|x|</M> רציפה ב-0 אך לא גזירה (נגזרות חד-צדדיות: <M>1≠−1</M>).</p>
          </Item>
        </Block>

        <Block>
          <Item label="tech" title="טבלת נגזרות — לשנן!">
            <div className="font-mono text-sm grid grid-cols-2 gap-x-6 gap-y-0.5 mt-1">
              <p>(C)&apos; = 0</p>
              <p>(x)&apos; = 1</p>
              <p>(xⁿ)&apos; = n·xⁿ⁻¹</p>
              <p>(xᵅ)&apos; = α·xᵅ⁻¹ {'  '}(x{'>'}0)</p>
              <p>(eˣ)&apos; = eˣ</p>
              <p>(aˣ)&apos; = ln(a)·aˣ</p>
              <p>(ln x)&apos; = 1/x</p>
              <p>(log_a x)&apos; = 1/(ln(a)·x)</p>
              <p>(sin x)&apos; = cos x</p>
              <p>(cos x)&apos; = −sin x</p>
              <p>(tg x)&apos; = 1/cos²x</p>
              <p>(cotg x)&apos; = −1/sin²x</p>
              <p>(arcsin x)&apos; = 1/√(1−x²)</p>
              <p>(arccos x)&apos; = −1/√(1−x²)</p>
              <p>(arctg x)&apos; = 1/(1+x²)</p>
              <p>(xˣ)&apos; = xˣ(ln x+1)</p>
            </div>
          </Item>
        </Block>

        <Block>
          <Item label="thm" title="כללי גזירה (AOD)">
            <div className="font-mono text-sm space-y-0.5 mt-1">
              <p>(f±g)&apos; = f&apos;±g&apos; {'          '}(c·f)&apos; = c·f&apos;</p>
              <p>(f·g)&apos; = f&apos;g + fg&apos; {'      '}(כלל לייבניץ)</p>
              <p>(f/g)&apos; = (f&apos;g − fg&apos;)/g² {'  '}(g≠0)</p>
            </div>
          </Item>
          <Item label="thm" title="כלל השרשרת (Chain Rule)">
            <p className="font-mono">(g∘f)&apos;(x₀) = g&apos;(f(x₀)) · f&apos;(x₀)</p>
            <p>דוגמאות: <M>[sin(x²)]&apos; = cos(x²)·2x</M>, <M>[e^(1/x)]&apos; = e^(1/x)·(−1/x²)</M></p>
          </Item>
          <Item label="thm" title="נגזרת פונקציה הופכית">
            <p className="font-mono">(f⁻¹)&apos;(y₀) = 1/f&apos;(x₀) {'  '}כאשר y₀=f(x₀), f&apos;(x₀)≠0</p>
          </Item>
          <Item label="tech" title="גזירה לוגריתמית">
            <p>עבור <M>f(x)=g(x)^{'{h(x)}'}</M>: כתוב <M>f = e^(h·ln g)</M> וגזור בכלל השרשרת.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* MVT */}
        {/* ================================================== */}
        <Section title="משפטי ערך ממוצע — פרמה, רול, לגראנז&apos;, קושי" />
        <Block>
          <Item label="thm" title="פרמה (Fermat)">
            <p><M>x₀</M> קיצון מקומי + f גזירה ב-<M>x₀</M> ⟹ <M>f&apos;(x₀) = 0</M>.</p>
          </Item>
          <Item label="thm" title="רול (Rolle)">
            <p>f רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M>, <M>f(a)=f(b)</M> ⟹ ∃<M>c∈(a,b)</M>: <M>f&apos;(c) = 0</M>.</p>
          </Item>
          <Item label="thm" title="לגראנז&apos; (MVT)">
            <p>f רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M> ⟹ ∃<M>c∈(a,b)</M>:</p>
            <p className="text-center font-mono font-bold">f&apos;(c) = [f(b)−f(a)] / (b−a)</p>
            <p><strong>רול = מקרה פרטי</strong> עם <M>f(a)=f(b)</M>.</p>
          </Item>
          <Item label="thm" title="קושי (Cauchy&apos;s MVT)">
            <p>f, g רציפות ב-<M>[a,b]</M>, גזירות ב-<M>(a,b)</M>, <M>g&apos;(x)≠0</M> ⟹ ∃<M>c∈(a,b)</M>:</p>
            <p className="text-center font-mono font-bold">[f(b)−f(a)] / [g(b)−g(a)] = f&apos;(c) / g&apos;(c)</p>
            <p><strong>לגראנז&apos; = מקרה פרטי</strong> עם <M>g(x)=x</M>.</p>
          </Item>
        </Block>

        <Block>
          <Item label="cor" title="מונוטוניות (מ-MVT)">
            <div className="font-mono text-sm space-y-0.5">
              <p>f&apos; ≥ 0 ב-(a,b) ⟹ f עולה ב-[a,b]</p>
              <p>f&apos; ≤ 0 ב-(a,b) ⟹ f יורדת ב-[a,b]</p>
              <p>f&apos; = 0 ב-(a,b) ⟹ f קבועה ב-[a,b]</p>
              <p>f&apos; {'>'} 0 ב-(a,b) ⟹ f עולה <strong>ממש</strong></p>
              <p>f&apos; {'<'} 0 ב-(a,b) ⟹ f יורדת <strong>ממש</strong></p>
            </div>
          </Item>
          <Item label="cor" title="חד-חד-ערכיות (מרול)">
            <p>f רציפה+גזירה, <M>f&apos;(x)≠0</M> לכל <M>x∈(a,b)</M> ⟹ f חח&quot;ע.</p>
            <p><strong>שימוש:</strong> יחידות פתרון — <M>f&apos;{'>'} 0</M> (או <M>{'<'} 0</M>) בכל התחום ⟹ פתרון יחיד.</p>
          </Item>
          <Item label="thm" title="נגזרת שנייה וקיצון">
            <p><M>f&apos;(x₀)=0</M>, <M>f&apos;&apos;(x₀){'>'} 0</M> ⟹ <M>x₀</M> <strong>מינימום מקומי</strong>.</p>
            <p><M>f&apos;(x₀)=0</M>, <M>f&apos;&apos;(x₀){'<'} 0</M> ⟹ <M>x₀</M> <strong>מקסימום מקומי</strong>.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* L'HÔPITAL */}
        {/* ================================================== */}
        <Section title="כלל לופיטל (L&apos;Hôpital)" />
        <Block>
          <Item label="thm" title="כלל לופיטל">
            <p><M>lim f(x)/g(x)</M> בצורת <M>0/0</M> או <M>∞/∞</M>, ו-<M>lim f&apos;/g&apos;</M> קיים ⟹</p>
            <p className="text-center font-mono font-bold">lim f(x)/g(x) = lim f&apos;(x)/g&apos;(x)</p>
            <p>תקף: <M>x→x₀±</M>, <M>x→x₀</M>, <M>x→±∞</M>.</p>
          </Item>
          <Item label="tech" title="צורות אי-קביעות — איך להמיר">
            <div className="text-sm space-y-0.5">
              <p><strong>0/0, ∞/∞:</strong> ישירות לופיטל.</p>
              <p><strong>0·∞:</strong> כתוב <M>f·g = f/(1/g)</M> או <M>g/(1/f)</M> ← הפוך ל-0/0 או ∞/∞.</p>
              <p><strong>∞−∞:</strong> שבור למכנה משותף או כפול בצמוד.</p>
              <p><strong>1^∞, 0⁰, ∞⁰:</strong> כתוב <M>f^g = e^(g·ln f)</M> ← חשב <M>lim g·ln f</M>.</p>
            </div>
          </Item>
          <Item label="rem" title="מתי לופיטל לא עובד">
            <p>1. אם <M>lim f&apos;/g&apos;</M> לא קיים — לופיטל לא אומר כלום! (למשל <M>sin(x)/x</M> כש-<M>x→∞</M>).</p>
            <p>2. מעגליות — <M>√(x²+1)/x</M> מוביל לחזרה לאותו ביטוי. פתור ישירות.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* INEQUALITIES */}
        {/* ================================================== */}
        <Section title="אי-שוויונות חשובים (מ-MVT)" />
        <Block>
          <div className="font-mono text-sm space-y-1">
            <p><strong>eˣ ≥ 1+x</strong> {'          '}לכל x∈ℝ (שוויון ⟺ x=0)</p>
            <p><strong>|sin x − sin y| ≤ |x−y|</strong> {'  '}לכל x,y∈ℝ (מ-MVT: |cos c|≤1)</p>
            <p><strong>|cos x − cos y| ≤ |x−y|</strong> {'  '}לכל x,y∈ℝ</p>
            <p><strong>x/(1+x) ≤ ln(1+x) ≤ x</strong> {'  '}לכל x{'>'}−1 (מ-MVT על ln(1+t))</p>
            <p><strong>arctan(x) {'<'} x</strong> {'            '}לכל x{'>'}0</p>
            <p><strong>xˣ ≥ (1/e)^(1/e)</strong> {'       '}לכל x{'>'}0 (מינימום ב-x=1/e)</p>
            <p><strong>1+2ln(x) ≤ x²</strong> {'         '}לכל x{'>'}0 (מקסימום ב-x=1)</p>
            <p><strong>eˣ/(1+x)^(1+x) {'<'} 1</strong> {'    '}לכל x{'>'}0</p>
            <p><strong>sin(x)/x ≥ 2/π</strong> {'         '}לכל 0{'<'}x≤π/2</p>
          </div>
          <Item label="tech" title="שיטה להוכחת אי-שוויונות">
            <p>1. הגדר <M>f(x) = צד שמאל − צד ימין</M>. {'  '}2. חשב <M>f&apos;</M> ← מצא min/max.</p>
            <p>3. הראה <M>f(x₀)=0</M> בנקודת הקיצון ← <M>f(x) ≥ 0</M> (או ≤) בכל התחום.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* TAYLOR */}
        {/* ================================================== */}
        <Section title="טיילור — פולינום ושארית" />
        <Block>
          <Item label="def" title="פולינום טיילור מסדר n סביב a">
            <p className="text-center font-mono">Pₙ(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)/k! · (x−a)ᵏ</p>
          </Item>
          <Item label="thm" title="שארית לגראנז&apos;">
            <p className="text-center font-mono">f(x) = Pₙ(x) + Rₙ(x), {'  '}Rₙ(x) = f⁽ⁿ⁺¹⁾(c)/(n+1)! · (x−a)ⁿ⁺¹</p>
            <p>כאשר c בין a ל-x. שימושי להערכת טעות קירוב.</p>
          </Item>
          <Item label="tech" title="פיתוחי מקלורן (a=0) — לשנן!">
            <div className="font-mono text-sm space-y-0.5 mt-1">
              <p>eˣ = 1 + x + x²/2! + x³/3! + ... + xⁿ/n! + ...</p>
              <p>sin x = x − x³/3! + x⁵/5! − ... + (−1)ⁿx²ⁿ⁺¹/(2n+1)! + ...</p>
              <p>cos x = 1 − x²/2! + x⁴/4! − ... + (−1)ⁿx²ⁿ/(2n)! + ...</p>
              <p>ln(1+x) = x − x²/2 + x³/3 − ... + (−1)ⁿ⁺¹xⁿ/n + ... {'  '}(|x|≤1, x≠−1)</p>
              <p>1/(1−x) = 1 + x + x² + x³ + ... + xⁿ + ... {'  '}(|x|{'<'}1)</p>
              <p>(1+x)ᵅ = 1 + αx + α(α−1)x²/2! + ... {'  '}(בינום מוכלל)</p>
              <p>arctg x = x − x³/3 + x⁵/5 − ... {'  '}(|x|≤1)</p>
            </div>
          </Item>
          <Item label="tech" title="חישוב גבול עם טיילור">
            <p>פתח מונה ומכנה לטיילור, צמצם, ופשט. <strong>יעיל יותר מלופיטל</strong> כשצריך כמה פעמים.</p>
            <p>דוגמה: <M>lim_{'{x→0}'} (eˣ−1−x)/x² = lim (x+x²/2+...−x)/x² = 1/2</M>.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* SEQUENCES */}
        {/* ================================================== */}
        <Section title="סדרות — תמצית" />
        <Block>
          <Item label="def" title="התכנסות סדרה">
            <p><M>aₙ→L</M>: לכל <M>ε{'>'} 0</M> קיים <M>N∈ℕ</M> כך שלכל <M>n{'>'}N</M>: <M>|aₙ−L|{'<'}ε</M>.</p>
          </Item>
          <Item label="thm" title="AOL לסדרות">
            <p><M>lim(aₙ±bₙ) = L₁±L₂</M>. <M>lim(aₙ·bₙ) = L₁·L₂</M>. <M>lim(aₙ/bₙ) = L₁/L₂</M> (אם <M>L₂≠0</M>).</p>
          </Item>
          <Item label="thm" title="משפטים מרכזיים">
            <p><strong>מתכנסת ⟹ חסומה</strong> (ההפך לא נכון!). <strong>מונוטונית + חסומה ⟹ מתכנסת</strong>.</p>
            <p><strong>סנדוויץ&apos;:</strong> <M>aₙ ≤ bₙ ≤ cₙ</M>, <M>lim aₙ = lim cₙ = L</M> ⟹ <M>lim bₙ = L</M>.</p>
            <p><strong>בולצאנו-ויירשטראס:</strong> כל סדרה חסומה מכילה <strong>תת-סדרה מתכנסת</strong>.</p>
            <p><strong>קושי:</strong> סדרה מתכנסת ⟺ סדרת קושי (<M>|aₙ−aₘ|→0</M>).</p>
          </Item>
          <Item label="tech" title="סדרה רקורסיבית aₙ₊₁ = f(aₙ)">
            <p>1. הוכח מונוטוניות (אינדוקציה). 2. הוכח חסימות (אינדוקציה). 3. מתכנסת! חשב <M>L = f(L)</M>.</p>
          </Item>
          <Item label="tech" title="גבולות חשובים של סדרות">
            <div className="font-mono text-sm grid grid-cols-2 gap-x-4 gap-y-0.5">
              <p>lim n^(1/n) = 1</p>
              <p>lim a^(1/n) = 1 {'  '}(a{'>'}0)</p>
              <p>lim (1+1/n)ⁿ = e</p>
              <p>lim n!/nⁿ = 0</p>
              <p>lim xⁿ/n! = 0</p>
              <p>lim (n!)^(1/n)/n = 1/e</p>
            </div>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* REALS */}
        {/* ================================================== */}
        <Section title="ממשיים — sup, inf, שלמות" />
        <Block>
          <Item label="def" title="סופרמום ואינפימום">
            <p><M>sup(A)</M> = החסם העליון <strong>הקטן ביותר</strong>. <M>inf(A)</M> = החסם התחתון <strong>הגדול ביותר</strong>.</p>
          </Item>
          <Item label="thm" title="אקסיומת השלמות">
            <p>כל קבוצה לא-ריקה וחסומה מלעיל ב-ℝ <strong>מקבלת סופרמום</strong> ב-ℝ.</p>
          </Item>
          <Item label="tech" title="הוכחת sup(A) = M">
            <p>1. <M>M</M> חסם עליון: <M>a ≤ M</M> לכל <M>a∈A</M>. {'  '}2. תכונת ε: לכל <M>ε{'>'} 0</M> ∃<M>a∈A</M>: <M>a {'>'} M−ε</M>.</p>
          </Item>
          <Item label="thm" title="תכונות נוספות">
            <p><strong>ארכימדי:</strong> לכל <M>x∈ℝ</M> ∃<M>n∈ℕ</M>: <M>n{'>'} x</M>. {'  '}<strong>צפיפות:</strong> בין כל שני ממשיים ∃רציונלי.</p>
          </Item>
        </Block>

        {/* ================================================== */}
        {/* GOLDEN RULES */}
        {/* ================================================== */}
        <div className="bg-yellow-500 text-black px-3 py-1.5 rounded-t-lg mt-6 mb-0 print:break-after-avoid">
          <h2 className="text-base font-bold">&#9733; כללי זהב לבחינה</h2>
        </div>
        <div className="border border-yellow-400 rounded-b-lg px-4 py-3 text-sm space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">1. הגדרות מדויקות!</p>
              <p>&quot;ללא הסבר = 0 נק&apos;&quot;. ציין שם משפט + תנאים.</p>
            </div>
            <div>
              <p className="font-bold">2. הוכחת ε-δ</p>
              <p>מצא <M>δ = g(ε)</M>. &quot;יהי <M>ε{'>'} 0</M>. נבחר <M>δ=...</M>&quot;</p>
            </div>
            <div>
              <p className="font-bold">3. קיום שורש</p>
              <p>הגדר f, הראה <M>f(a)·f(b){'<'} 0</M>, השתמש ב-IVT.</p>
            </div>
            <div>
              <p className="font-bold">4. יחידות פתרון</p>
              <p><M>f&apos;{'>'} 0</M> בכל התחום ⟹ f חח&quot;ע ⟹ פתרון יחיד.</p>
            </div>
            <div>
              <p className="font-bold">5. אי-שוויונות</p>
              <p>הגדר f = הפרש, מצא min/max, הראה <M>f ≥ 0</M>.</p>
            </div>
            <div>
              <p className="font-bold">6. לופיטל</p>
              <p>ודא צורת 0/0 או ∞/∞. <strong>לא תמיד עובד!</strong></p>
            </div>
            <div>
              <p className="font-bold">7. MVT / רול</p>
              <p>בדוק תנאים: <strong>רציפה ב-[a,b] + גזירה ב-(a,b)</strong>.</p>
            </div>
            <div>
              <p className="font-bold">8. ויירשטראס</p>
              <p>רק על <strong>[a,b] סגור וחסום!</strong> לא על (a,b) או ℝ.</p>
            </div>
            <div>
              <p className="font-bold">9. טיילור</p>
              <p>שננו פיתוחים: <M>eˣ, sin, cos, ln(1+x), 1/(1−x)</M>.</p>
            </div>
            <div>
              <p className="font-bold">10. הפרכה</p>
              <p>דוגמת נגד אחת מספיקה! נסו: <M>|x|, D(x), 1/x</M>.</p>
            </div>
          </div>

          <div className="border-t border-yellow-400 pt-2 mt-2">
            <p className="font-bold">11. שרשרת המשפטים: פרמה ⟹ רול ⟹ לגראנז&apos; ⟹ קושי ⟹ לופיטל</p>
            <p className="font-bold">12. שרשרת הרציפות: ליפשיץ ⟹ רב&quot;ש ⟹ רציפה ⟸ גזירה</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-300">
          <p>&bull; סיכום חשבון אינפיניטסימלי 1 &bull; מבוסס על הרצאות, תרגולים ושיעורי בית &bull; בהצלחה! &bull;</p>
        </div>

      </div>
    </>
  );
}
