'use client';

// =============================================
// Print-Friendly Summary: Infi Weeks 1-3
// Lectures 1-6, Recitations 1-3
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

function Proof({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mt-2 bg-gray-50 border border-gray-200 rounded p-3 text-sm space-y-2 print:break-inside-avoid print:bg-white print:border-gray-300">
      <div className="font-bold text-gray-700 text-xs mb-1">{title || 'הוכחה'}:</div>
      {children}
      <div className="text-left font-bold text-gray-500">&#8718;</div>
    </div>
  );
}

function Remark({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-amber-400 pl-4 py-2 my-3 print:break-inside-avoid">
      <div className="font-bold text-sm mb-1 text-amber-700">{title || 'הערה'}:</div>
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

export default function PrintWeeks1to3Page() {
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
          <h1 className="text-2xl font-bold">אינפי 1 — סיכום שבועות 1-3</h1>
          <p className="text-gray-600 mt-1">הרצאות 1-6, תרגולים 1-3</p>
        </div>

        {/* ============================================= */}
        {/* LECTURE 1 - 28.10.26 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 1 — קבוצות, מספרים טבעיים ושלמים, התחלקות, ראשוניים, רציונליים (28.10.26)" />

        <Def title="קבוצות של מספרים ממשיים">
          <p>קבוצה היא אוסף של אובייקטים (מספרים ממשיים). סימונים:</p>
          <p>• <M>A = {'{'}1, 3, -2{'}'}</M> — שייכות: <M>3 ∈ A</M>, אי-שייכות: <M>4 ∉ A</M></p>
          <p>• קבוצה עם תנאי: <M>C = {'{'}x ∈ A : x {'>'} 0{'}'} = {'{'}1, 3{'}'}</M></p>
          <p>• הקבוצה הריקה: <M>∅ = {'{ }'}</M></p>
        </Def>

        <Remark>
          <p><strong>מסקנה 1:</strong> ספר הופעת האלמנטים אין משנה את הקבוצה. אין חשיבות לסדר/לספר.</p>
          <p><M>{'{'}1, 3{'}'} = {'{'}3, 1{'}'}</M> וגם <M>{'{'}1, 3, 3, 3{'}'} = {'{'}1, 3{'}'}</M></p>
        </Remark>

        <Def title="הכלה ושוויון קבוצות">
          <p>תהיינה <M>A, B</M> שתי קבוצות של מספרים ממשיים.</p>
          <p>• נאמר כי <M>A</M> <strong>מוכלת</strong> ב-<M>B</M> (או ש-<M>A</M> תת קבוצה של <M>B</M>) אם לכל <M>x ∈ A</M> מתקיים <M>x ∈ B</M>. סימון: <M>A ⊆ B</M>.</p>
          <p>• נאמר כי <M>A = B</M> אם <M>A ⊆ B</M> וגם <M>B ⊆ A</M>.</p>
          <p>דוגמאות: <M>{'{'}1, 2, 3{'}'} ⊆ {'{'}2, 7, 3, 1, 3{'}'}</M> — נכון. <M>{'{'}1, 3{'}'} ⊆ {'{'}3, 2, 1{'}'}</M> — נכון. <M>{'{'}1, 4{'}'} ⊄ {'{'}2, 1{'}'}</M>.</p>
        </Def>

        <Def title="פעולות על קבוצות">
          <p>תהיינה <M>A, B</M> שתי קבוצות של מספרים ממשיים. נגדיר את הפעולות:</p>
          <p>(i) <strong>החיתוך</strong> (intersection) של <M>A</M> ו-<M>B</M>: <M>A ∩ B = {'{'}x : x ∈ A, x ∈ B{'}'}</M> (גם וגם)</p>
          <p>(ii) <strong>האיחוד</strong> (union) של <M>A</M> ו-<M>B</M>: <M>A ∪ B = {'{'}x : x ∈ A או x ∈ B{'}'}</M> (או = ∨)</p>
          <p>(iii) <strong>ההפרש</strong>: <M>A \ B = {'{'}x : x ∈ A, x ∉ B{'}'}</M> (שייך ל-A ולא שייך ל-B)</p>
        </Def>

        <Example title="פעולות על קבוצות">
          <p>① <M>{'{'}1, 2, 3{'}'} ∩ {'{'}4, 1, 0{'}'} = {'{'}1{'}'}</M></p>
          <p>② <M>{'{'}1, 2, 3{'}'} ∪ {'{'}4, 1, 0{'}'} = {'{'}1, 2, 3, 4, 0{'}'}</M></p>
          <p>③ <M>{'{'}1, 2, 3{'}'} \ {'{'}4, 1, 0{'}'} = {'{'}2, 3{'}'}</M></p>
          <p>④ <M>{'{'}4, 1, 0{'}'} \ {'{'}1, 2, 3{'}'} = {'{'}4, 0{'}'}</M> (שימו לב: <M>A \ B ≠ B \ A</M>)</p>
        </Example>

        <Def title="קבוצת המספרים הטבעיים ℕ">
          <p>קבוצת המספרים הטבעיים (Naturals) מוגדרת ע&quot;י: <M>ℕ = {'{'}1, 2, 3, ...{'}'}</M></p>
        </Def>

        <Def title="קבוצת המספרים השלמים ℤ">
          <p>קבוצת המספרים השלמים (Integers) מוגדרת ע&quot;י: <M>ℤ = {'{'}0, 1, -1, 2, -2, 3, ...{'}'}</M></p>
        </Def>

        <Thm title="משפט 1 — סגירות ℤ">
          <p>לכל <M>a, b ∈ ℤ</M> מתקיים <M>a + b, a - b, a · b ∈ ℤ</M>.</p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Def title="מחלק (divisor)">
          <p>יהיו <M>a, b ∈ ℤ</M>. נאמר כי <M>a</M> הוא מחלק של <M>b</M> (divisor) אם קיים <M>k ∈ ℤ</M> כך ש-<M>b = k · a</M>. במקרה זה נסמן <M>a | b</M>.</p>
          <p>דוגמאות: ① <M>11 | 33</M> ② <M>11 ∤ 34</M> ③ <M>3 | 9</M> וגם <M>3 | (-9)</M> וגם <M>3 | 0</M> ④ <M>0 ∤ 3</M> וגם <M>0 | 0</M></p>
        </Def>

        <Def title="זוגי ואי-זוגי">
          <p>יהי <M>n ∈ ℤ</M>. נאמר כי <M>n</M> זוגי (even) אם <M>2 | n</M>. נאמר ש-<M>n</M> הוא אי-זוגי (odd) אם <M>2 ∤ n</M>, כלומר <M>2 | (n+1)</M>.</p>
          <p>even: <M>2 | n</M>, odd: <M>2 ∤ n</M> (כלומר <M>2 | (n+1)</M>).</p>
        </Def>

        <Claim title="טענה 2 — n אי-זוגי אם ורק אם n = 2k - 1">
          <p>נניח ש-<M>n</M> הוא אי-זוגי. אזי קיים <M>k ∈ ℤ</M> כך ש-<M>n + 1 = 2k</M>, ולכן <M>n = 2k - 1</M>.</p>
        </Claim>

        <Thm title="משפט 2 — a|b ו-a|c גורר a|(b ± c)">
          <p>יהיו <M>a, b, c ∈ ℤ</M>. נניח ש-<M>a | b</M> וגם <M>a | c</M>. אזי <M>a | (b ± c)</M>.</p>
          <Proof>
            <p>מהיות <M>a | b</M>, קיים <M>k ∈ ℤ</M> כך ש-<M>b = k · a</M>.</p>
            <p>מהיות <M>a | c</M>, קיים <M>l ∈ ℤ</M> כך ש-<M>c = l · a</M>.</p>
            <p>לכן: <M>b ± c = k·a ± l·a = (k ± l)·a</M>.</p>
            <p>מסגירות ℤ, <M>(k ± l) ∈ ℤ</M>, ולכן <M>a | (b ± c)</M>.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 2 — אם a, b אי-זוגיים אזי a ± b זוגיים">
          <p>יהיו <M>a, b ∈ ℤ</M>. אם <M>a, b</M> אי-זוגיים אזי <M>a ± b</M> זוגיים.</p>
        </Corollary>

        <Def title="מספר ראשוני (prime)">
          <p>יהי <M>p ∈ ℕ</M> כך ש-<M>p {'>'} 1</M>. נאמר ש-<M>p</M> ראשוני (prime) אם לכל <M>a ∈ ℕ</M> כך ש-<M>a | p</M> מתקיים <M>a = p</M> או <M>a = 1</M>. אם <M>p</M> לא ראשוני, נאמר ש-<M>p</M> פריק (composite).</p>
          <p>דוגמאות: <M>2, 3, 5, 7, 11, ...</M></p>
        </Def>

        <Thm title="משפט 3 — קיימים אינסוף מספרים ראשוניים">
          <p>קיימים אינסוף מספרים ראשוניים.</p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Def title="זרים (coprime)">
          <p>יהיו <M>a, b ∈ ℤ</M>. נאמר כי <M>a, b</M> זרים (coprime) אם לכל <M>k ∈ ℤ</M> כך ש-<M>k | a</M> וגם <M>k | b</M> מתקיים <M>k = 1</M> או <M>k = -1</M>.</p>
          <p>דוגמאות: ① <M>4, 6</M> לא זרים כי <M>2 | 4</M> וגם <M>2 | 6</M> ② <M>5, 7</M> זרים ③ <M>5, 8</M> זרים</p>
        </Def>

        <Thm title="משפט 4 — זהות בזו (Bezout&apos;s Identity)">
          <p>יהיו <M>a, b ∈ ℤ</M>. נניח ש-<M>a, b</M> זרים. אזי קיימים <M>x, y ∈ ℤ</M> כך ש-<M>ax + by = 1</M>.</p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Example title="דוגמאות לזהות בזו">
          <p>① <M>5, 7</M> זרים: <M>(-4)·5 + (3)·7 = 1</M> וגם <M>(3)·5 + (-2)·7 = 1</M></p>
          <p>② <M>5, 8</M> זרים: <M>(-3)·5 + (2)·8 = 1</M> וגם <M>(5)·5 + (-3)·8 = 1</M></p>
        </Example>

        <Thm title="משפט 5 — a|(b·c) ו-a,b זרים גורר a|c">
          <p>יהיו <M>a, b, c ∈ ℤ</M>. נניח כי: (i) <M>a | (b·c)</M> (ii) <M>a, b</M> זרים. אזי <M>a | c</M>.</p>
          <Proof>
            <p>בהנחית <M>a | (b·c)</M>, קיים <M>k ∈ ℤ</M> כך ש-<M>b·c = k·a</M>.</p>
            <p>מהיות <M>a, b</M> זרים, שמי ממשפט בזו קיימים <M>x, y ∈ ℤ</M> כך ש-<M>ax + by = 1</M>. נכפיל ב-<M>c</M> ונקבל:</p>
            <p><M>c = axc + byc = axc + k·a·y = (xc + ky)·a</M></p>
            <p>מסגירות ℤ, <M>(xc + ky) ∈ ℤ</M>, ולכן <M>a | c</M>.</p>
          </Proof>
        </Thm>

        <Thm title="משפט 6 — הלמה של אויקלידס (Euclid&apos;s Lemma)">
          <p>יהי <M>1 {'<'} p ∈ ℕ</M> ויהיו <M>a, b ∈ ℤ</M>. נניח ש-<M>p</M> ראשוני ו-<M>p | (a·b)</M>. אזי <M>p | a</M> או <M>p | b</M>.</p>
          <Proof>
            <p>נניח כי <M>p ∤ a</M>. נוכיח כי <M>p | b</M>.</p>
            <p>ובכלם: מהיות <M>p ∤ a</M> ומהיות <M>p</M> ראשוני, <M>a</M> ו-<M>p</M> זרים. מכן מהיות <M>p | (a·b)</M> ו-<M>p</M> ו-<M>a</M> זרים, ממשפט 5, <M>p | b</M>.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 3 — p ראשוני ו-p|n² גורר p|n">
          <p>יהי <M>n ∈ ℤ</M> ויהי <M>p</M> מספר ראשוני. אם <M>p | n²</M> אזי <M>p | n</M>.</p>
        </Corollary>

        <Thm title="משפט 7 — המשפט היסודי של האריתמטיקה (FTA)">
          <p>יהי <M>n ∈ ℕ</M> כך ש-<M>n {'>'} 1</M>. אזי קיימים <M>k ∈ ℕ</M> וקיימים מספרים ראשוניים <M>p₁, ..., pₖ</M> כך ש-<M>n = p₁ · ... · pₖ</M>. יתר על כן הפירוק ע&quot;י <M>n</M> זה כדי שינוי הסדר שלהם.</p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Example title="דוגמאות לפירוק לראשוניים">
          <p>① <M>26 = 13 · 2</M> (k=2) ② <M>27 = 3 · 3 · 3</M> (k=3) ③ <M>28 = 7 · 2 · 2</M> (k=3) ④ <M>29 = 29</M> (k=1)</p>
        </Example>

        <Corollary title="מסקנה 4 — כל מספר טבעי גדול מ-1 מתחלק בראשוני">
          <p>יהי <M>n ∈ ℕ</M> כך ש-<M>1 {'<'} n</M>. אזי קיים <M>p</M> ראשוני כך ש-<M>p | n</M>.</p>
        </Corollary>

        <Def title="קבוצת המספרים הרציונליים ℚ">
          <p>קבוצת המספרים הרציונליים מוגדרת ע&quot;י:</p>
          <p><M>ℚ = {'{'}n/m : n, m ∈ ℤ וגם m ≠ 0{'}'}</M></p>
          <p>דוגמאות: ① <M>2/7 ∈ ℚ</M> ② <M>2 = 2/1 ∈ ℚ</M> ③ <M>0.45 = 45/100 ∈ ℚ</M></p>
        </Def>

        <Thm title="משפט 8 — סגירות ℚ">
          <p>לכל <M>q₁, q₂ ∈ ℚ</M> מתקיים <M>q₁ + q₂, q₁ - q₂, q₁ · q₂ ∈ ℚ</M>. יתר על כן, אם <M>q₂ ≠ 0</M> אזי גם <M>q₁/q₂ ∈ ℚ</M>.</p>
          <Proof>
            <p>יהיו <M>q₁, q₂ ∈ ℚ</M>. אכן קיימים <M>n₁, m₁, n₂, m₂ ∈ ℤ</M> כך ש-<M>q₁ = n₁/m₁</M> ו-<M>q₂ = n₂/m₂</M>, וכמובן <M>m₁, m₂ ≠ 0</M>.</p>
            <p><strong>חיבור/חיסור:</strong> <M>q₁ ± q₂ = n₁/m₁ ± n₂/m₂ = (n₁m₂ ± n₂m₁)/(m₁m₂) ∈ ℚ</M></p>
            <p>(מסגירות ℤ, המונה והמכנה שלמים, ו-<M>m₁m₂ ≠ 0</M> כי <M>m₁, m₂ ≠ 0</M>)</p>
            <p><strong>כפל:</strong> <M>q₁ · q₂ = (n₁/m₁) · (n₂/m₂) = (n₁·n₂)/(m₁·m₂) ∈ ℚ</M></p>
            <p>(מסגירות ℤ, ו-<M>m₁·m₂ ≠ 0</M> כי <M>m₁, m₂ ≠ 0</M>)</p>
            <p><strong>חילוק:</strong> אם <M>q₂ ≠ 0</M> אז נניח כי <M>0 ≠ n₂/m₂ = q₂</M>, אכן <M>n₂ ≠ 0</M>. לכן:</p>
            <p><M>q₁/q₂ = (n₁/m₁)/(n₂/m₂) = (n₁·m₂)/(m₁·n₂) ∈ ℚ</M></p>
            <p>(מסגירות ℤ, ו-<M>m₁·n₂ ≠ 0</M> כי <M>m₁, n₂ ≠ 0</M>)</p>
          </Proof>
        </Thm>

        {/* ============================================= */}
        {/* LECTURE 2 - 30.10.25 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 2 — רציונליים (המשך), ממשיים, אי-רציונליים, אקסיומת השלמות (30.10.25)" />

        <Example title="תרגיל 1 — (1+2q³)/(1+q²) ∈ ℚ">
          <p>יהי <M>q ∈ ℚ</M>. הוכיחו כי <M>(1 + 2q³)/(1 + q²) ∈ ℚ</M>.</p>
          <Proof>
            <p>נשים לב כי <M>1 + q² ≥ 1 + 0 {'>'} 0</M>, ולכן <M>1 + q² ≠ 0</M>. אכן <M>(1 + 2q³)/(1 + q²)</M> מספר היטב.</p>
            <p>עתה נשים לב כי <M>1, 2 ∈ ℚ</M>, ולכן מסגירות ℚ: <M>(2 + q + 2q²)/(1 + 3q⁴) ∈ ℚ</M>.</p>
            <p>מונה: <M>1 + 2q³ ∈ ℚ</M> (סגירות). מכנה: <M>1 + q² ∈ ℚ</M> (סגירות) ו-<M>≠ 0</M>. לכן המנה ∈ ℚ.</p>
          </Proof>
        </Example>

        <Def title="הצגה מצומצמת">
          <p>יהיו <M>n, m ∈ ℤ</M> כך ש-<M>m ≠ 0</M>. נאמר שהמספר הרציונלי <M>n/m</M> הוא בהצגה מצומצמת אם <M>n, m</M> זרים.</p>
          <p>דוגמאות: ① <M>4/6</M> לא בהצגה מצומצמת ② <M>2/3</M> כן בהצגה מצומצמת ③ <M>1/3, -3/1, 9/1</M> כולם בהצגה מצומצמת ④ <M>0/2</M> לא בהצגה מצומצמת</p>
        </Def>

        <Claim title="טענה 1 — לכל מספר רציונלי יש הצגה מצומצמת">
          <p>יהי <M>q ∈ ℚ</M>. אזי קיימים <M>n, m ∈ ℤ</M> זרים כך ש-<M>m ≠ 0</M> וכך ש-<M>q = n/m</M>.</p>
          <p>(הסבר: <M>q = n/m = (a·k)/(b·k) = a/b</M>)</p>
        </Claim>

        <Def title="קבוצת המספרים הממשיים ℝ">
          <p>קבוצת המספרים הממשיים מוגדרת ע&quot;י:</p>
          <p><M>ℝ = {'{'}a₀.a₁a₂a₃... : a₀ ∈ ℤ ולכל n ∈ ℕ, aₙ ∈ {'{'}0, 1, ..., 9{'}'}{'}'}</M></p>
          <p>דוגמאות: ① <M>π = 3.14159265... ∈ ℝ</M> ② <M>41.25 = 41.25000... ∈ ℝ</M> ③ <M>1/3 = 0.333... ∈ ℝ</M> ④ <M>1 = 1.000... = 0.999...</M> ⑤ <M>3/2 = 1.5000... = 1.4999...</M></p>
        </Def>

        <Claim title="טענה 2 — בין כל שני מספרים ממשיים יש אינסוף מספרים ממשיים">
          <p>בין כל שני מספרים ממשיים <M>x {'<'} y</M> יש אינסוף מספרים ממשיים.</p>
        </Claim>

        <Claim title="טענה 3 — לציר המספרים אין חורים (ריקה)">
          <p>ציר המספרים אין חורים (ריקה).</p>
        </Claim>

        <Thm title="משפט 1 — ℚ ⊆ ℝ">
          <p><M>ℚ ⊆ ℝ</M></p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 1 — שרשרת ההכלות">
          <p>מתקיים <M>ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ</M>.</p>
        </Corollary>

        <Claim title="טענה 4 — מספרים ממשיים חיוביים">
          <p>מתנהג לפרטת: יהי <M>x ∈ ℝ</M> כך ש-<M>x {'>'} 0</M> (מקיים ספרטת). נרשים: יהי <M>x {'>'} 0</M>.</p>
        </Claim>

        <Def title="מספר אי-רציונלי">
          <p>יהי <M>x ∈ ℝ</M>. נאמר ש-<M>x</M> הוא אי-רציונלי אם <M>x ∉ ℚ</M>. (קבוצת המספרים האי-רציונליים היא <M>ℝ \ ℚ</M>)</p>
        </Def>

        <Thm title="משפט 2 — קיום שורש n-י">
          <p>יהי <M>a ≥ 0</M> ויהי <M>n ∈ ℕ</M>. אזי קיים <M>x ≥ 0</M> יחיד שמקיים <M>xⁿ = a</M>.</p>
          <Proof>
            <p>נוכיח בהמשך.</p>
          </Proof>
        </Thm>

        <Def title="שורש n-י — ⁿ√a">
          <p>יהי <M>a ≥ 0</M> ויהי <M>n ∈ ℕ</M>. נגדיר <M>x = ⁿ√a</M> כאשר <M>x ≥ 0</M> הוא המספר היחיד המקיים <M>xⁿ = a</M> (המובטח לנו ממשפט 2).</p>
          <p>דוגמה: <M>√4 = 2</M></p>
        </Def>

        <Thm title="משפט 3 — √2 הוא אי-רציונלי">
          <p><M>√2</M> הוא אי-רציונלי.</p>
          <Proof>
            <p>הוכיח: ידוע ש-<M>√2 ∈ ℝ</M>. נניח בשלילה כי <M>√2 ∈ ℚ</M>. אכן ממשפטת 1, קיימים <M>n, m ∈ ℤ</M> זרים כך ש-<M>m ≠ 0</M> וכך ש-<M>√2 = n/m</M>. אכן:</p>
            <p><M>2 = (√2)² = (n/m)² = n²/m²</M></p>
            <p>ולכן <M>n² = 2m²</M>. לכן <M>2 | n²</M>.</p>
            <p>ומהיות 2 ראשוני, אזי ממסקנה 3 בהרצאה 1, <M>2 | n</M>. אכן קיים <M>k ∈ ℤ</M> כך ש-<M>n = 2k</M>. נציב במשוואה <M>n² = 2m²</M>:</p>
            <p><M>4k² = (2k)² = 2m²</M></p>
            <p>ולכן <M>m² = 2k²</M>, לכן <M>2 | m²</M>.</p>
            <p>ולכן ממסקנה 3 בהרצאה 1, <M>2 | m</M>.</p>
            <p>קיבלנו כי <M>2 | n</M> וגם <M>2 | m</M>, בסתירה לכך ש-<M>n, m</M> זרים.</p>
          </Proof>
        </Thm>

        <Claim title="טענה 5 — √p אי-רציונלי לכל ראשוני p">
          <p>באותו האופן ניתן להוכיח: לכל מספר ראשוני <M>p</M>, <M>√p</M> הוא אי-רציונלי.</p>
        </Claim>

        <Def title="A ≤ B — יחס סדר בין קבוצות">
          <p>תהיינה <M>∅ ≠ A, B ⊆ ℝ</M>. נאמר כי <M>A ≤ B</M> אם לכל <M>a ∈ A</M> ולכל <M>b ∈ B</M> מתקיים <M>a ≤ b</M>.</p>
          <p>דוגמאות: ① <M>{'{'}1, 2{'}'} ≤ {'{'}3, 4{'}'}</M> ② <M>{'{'}1, 2{'}'} ≤ {'{'}2, 4{'}'}</M> ③ <M>{'{'}1, 2{'}'} ≰ {'{'}1.3, 2.1{'}'}</M></p>
        </Def>

        <Thm title="אקסיומת השלמות (Axiom of Completeness)">
          <p>תהיינה <M>∅ ≠ A, B ⊆ ℝ</M>. נניח כי <M>A ≤ B</M>. אזי קיימת <M>c ∈ ℝ</M> כך שלכל <M>a ∈ A</M> ולכל <M>b ∈ B</M> מתקיים <M>a ≤ c ≤ b</M>.</p>
        </Thm>

        {/* ============================================= */}
        {/* LECTURE 3 - 4.11.25 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 3 — חסמים, מקסימום ומינימום, קטעים, סופרמום (4.11.25)" />

        <Def title="חסומה מלעיל, חסומה מלרע, לא חסומה">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. נאמר כי:</p>
          <p>(i) <M>A</M> <strong>חסומה מלעיל</strong> אם קיים <M>M ∈ ℝ</M> כך שלכל <M>a ∈ A</M> מתקיים <M>a ≤ M</M>. החלק <M>M</M> נקרא חסם מלעיל של <M>A</M>.</p>
          <p>(ii) <M>A</M> <strong>חסומה מלרע</strong> אם קיים <M>m ∈ ℝ</M> כך שלכל <M>a ∈ A</M> מתקיים <M>a ≥ m</M>. החלק <M>m</M> נקרא חסם מלרע של <M>A</M>.</p>
          <p>(iii) <M>A</M> <strong>לא חסומה</strong> אם לא חסומה מלעיל ולא חסומה מלרע. ומגדרל.</p>
        </Def>

        <Def title="איבר מקסימלי">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. יהי <M>ā ∈ A</M>. נאמר כי <M>ā</M> איבר מקסימלי ב-<M>A</M> אם לכל <M>a ∈ A</M> מתקיים <M>a ≤ ā</M>.</p>
        </Def>

        <Def title="איבר מינימלי">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. יהי <M>a̲ ∈ A</M>. נאמר כי <M>a̲</M> איבר מינימלי ב-<M>A</M> אם לכל <M>a ∈ A</M> מתקיים <M>a ≥ a̲</M>.</p>
        </Def>

        <Thm title="משפט 1 — יחידות המקסימום">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. יהיו <M>ā, ã ∈ A</M> ו-<M>ā</M> ו-<M>ã</M> איברים מקסימליים ב-<M>A</M>. אזי <M>ā = ã</M>.</p>
          <Proof>
            <p>מהיות <M>ã ∈ A</M> ו-<M>ā</M> מקסימלי, אזי <M>ã ≤ ā</M>.</p>
            <p>מהיות <M>ā ∈ A</M> ו-<M>ã</M> מקסימלי, אזי <M>ā ≤ ã</M>.</p>
            <p>אכן <M>ā = ã</M>.</p>
          </Proof>
        </Thm>

        <Thm title="משפט 2 — יחידות המינימום">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. יהיו <M>a̲, ã ∈ A</M> ו-<M>a̲</M> ו-<M>ã</M> איברים מינימליים ב-<M>A</M>. אזי <M>a̲ = ã</M>.</p>
          <Proof>
            <p>כמו משפט 1.</p>
          </Proof>
        </Thm>

        <Def title="max A ו-min A">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> ויהי <M>ā ∈ A</M>. נניח ש-<M>ā</M> איבר מקסימלי. נגדיר <M>max A = ā</M>.</p>
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> ויהי <M>a̲ ∈ A</M>. נניח ש-<M>a̲</M> איבר מינימלי. נגדיר <M>min A = a̲</M>.</p>
        </Def>

        <Claim title="טענה 1 — max A ו-min A הם מספרים היטב מוגדרים">
          <p>מיחידות המקסימום והמינימום, <M>max A</M> ו-<M>min A</M> הם מספרים היטב מוגדרים.</p>
        </Claim>

        <Def title="קטעים (intervals)">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>. נגדיר את סוגי הקטעים:</p>
          <p>(i) <strong>הקטע הסגור:</strong> <M>[a, b] = {'{'}x ∈ ℝ : a ≤ x ≤ b{'}'}</M></p>
          <p>(ii) <strong>הקטע הפתוח:</strong> <M>(a, b) = {'{'}x ∈ ℝ : a {'<'} x {'<'} b{'}'}</M></p>
          <p>(iii) <strong>הקטע החצי פתוח:</strong> <M>[a, b) = {'{'}x ∈ ℝ : a ≤ x {'<'} b{'}'}</M></p>
          <p>(iv) <strong>הקטע החצי פתוח:</strong> <M>(a, b] = {'{'}x ∈ ℝ : a {'<'} x ≤ b{'}'}</M></p>
          <p>(v) <strong>הקרן הסגורה/פתוחה מספר לאינסוף:</strong></p>
          <p><M>[a, ∞) = {'{'}x ∈ ℝ : x ≥ a{'}'}</M>, <M>(a, ∞) = {'{'}x ∈ ℝ : x {'>'} a{'}'}</M></p>
          <p><M>(-∞, b] = {'{'}x ∈ ℝ : x ≤ b{'}'}</M>, <M>(-∞, b) = {'{'}x ∈ ℝ : x {'<'} b{'}'}</M></p>
          <p>(vi) קטע נקודה: <M>[a, a] = {'{'}a{'}'}</M></p>
          <p>(vii) הישר הממשי מסומן גם כ-<M>ℝ = (-∞, ∞)</M></p>
          <p>(viii) קטע יקרא חסום אם הוא בצורת סגור או תצי פתוח או תצי סגור, כלומר מהצורה <M>[a,b], (a,b), [a,b), (a,b]</M>.</p>
        </Def>

        <Example title="דוגמאות — max/min של קטעים">
          <p>תהי <M>A = (0, 3]</M>:</p>
          <p>• <M>A</M> חסומה מלעיל ע&quot;י 3. <M>max A = 3</M> (כיוון ש-<M>3 ∈ A</M> ולכל <M>a ∈ A</M> מתקיים <M>a ≤ 3</M>).</p>
          <p>• <M>A</M> חסומה מלרע ע&quot;י 0. אך ב-<M>A</M> אין איבר מינימלי (כי <M>0 ∉ A</M>, ולכל <M>a̲ ∈ A</M> כך ש-<M>0 {'<'} a̲ ≤ 3</M>, הערך <M>a̲/2 ∈ A</M> ו-<M>a̲/2 {'<'} a̲</M>).</p>
          <p>תהי <M>A = [0, 3)</M>:</p>
          <p>• <M>min A = 0</M>. אך ב-<M>A</M> אין מקסימום (כי <M>3 ∉ A</M>, ולכל <M>ā ∈ A</M> כך ש-<M>0 ≤ ā {'<'} 3</M>, הערך <M>(ā+3)/2 ∈ A</M> ו-<M>(ā+3)/2 {'>'} ā</M>).</p>
        </Example>

        <Def title="חסם עליון — סופרמום (supremum / least upper bound)">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> ויהי <M>s̄ ∈ ℝ</M>. נאמר כי <M>s̄</M> הוא חסם עליון (least upper bound) אם מתקיימים התנאים:</p>
          <p>(i) <M>s̄</M> הוא חסם מלעיל של <M>A</M>, כלומר לכל <M>a ∈ A</M> מתקיים <M>a ≤ s̄</M>.</p>
          <p>(ii) <strong>מינימליות:</strong> לכל <M>M ∈ ℝ</M> כך ש-<M>M</M> חסם מלעיל של <M>A</M>, מתקיים <M>s̄ ≤ M</M>.</p>
        </Def>

        <Thm title="משפט 3 — יחידות הסופרמום (החסם העליון)">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. נניח ש-<M>A</M> חסומה מלעיל. אזי קיים <M>s̄ ∈ ℝ</M> כך ש-<M>s̄</M> חסם עליון של <M>A</M>. יתר על כן, הוא יחיד, כלומר, אם <M>s̃ ∈ ℝ</M> הוא גם כן חסם עליון של <M>A</M> אזי <M>s̄ = s̃</M>.</p>
          <Proof>
            <p>נגדיר בקבוצה המשוערת ע&quot;י:</p>
            <p><M>B = {'{'}M ∈ ℝ : M חסם מלעיל של A{'}'}</M></p>
            <p>נשים לב כי <M>B ⊆ ℝ</M> (ברור) וכי <M>B ≠ ∅</M> (כי <M>A</M> חסומה מלעיל). בנוסף נשים לב כי <M>A</M> חסומה מלעיל, כלומר: לכל <M>a ∈ A</M> ולכל <M>M ∈ B</M> מתקיים <M>a ≤ M</M> (כי <M>M</M> חסם מלעיל).</p>
            <p>אכן <M>A ≤ B</M>. אכן מאקסיומת השלמות קיים <M>s̄ ∈ ℝ</M> כך שלכל <M>a ∈ A</M> ולכל <M>M ∈ B</M> מתקיים <M>a ≤ s̄ ≤ M</M>.</p>
            <p>כי <M>s̄</M> חסם עליון של <M>A</M>:</p>
            <p>(i) <strong>חסם מלעיל:</strong> יהי <M>a ∈ A</M>. אזי <M>a ≤ s̄</M> — מ-(*)</p>
            <p>(ii) <strong>מינימליות:</strong> יהי <M>M ∈ ℝ</M> כך ש-<M>M</M> חסם מלעיל. אזי <M>M ∈ B</M>, אכן לכל <M>a ∈ A</M> מתקיים <M>s̄ ≤ M</M> — מ-(**).</p>
            <p>עתה נוכיח את היחידות: נניח כי <M>s̃ ∈ ℝ</M> הוא גם כן חסם עליון של <M>A</M>. נשים לב כי:</p>
            <p>כי <M>s̄</M> חסם מלעיל. בנוסף לכל <M>s̄ ∈ B</M> כי <M>s̃</M> חסם מלעיל מינימלי, מתקיים <M>s̃ ≤ M</M>. אכן <M>s̄ = min B</M>.</p>
            <p>באותו האופן גם <M>s̃ = min B</M>. אכן <M>s̄ = s̃</M>.</p>
          </Proof>
        </Thm>

        {/* ============================================= */}
        {/* LECTURE 4 - 6.11.25 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 4 — תכונת ε, ארכימדיות, רצפה ותקרה (6.11.25)" />

        {/* PLACEHOLDER — will be filled by Edit */}
        <Thm title="משפט 5 — תכונת ה-ε של supA">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> ונניח כי <M>A</M> חסומה מלעיל. יהי <M>s̄ ∈ ℝ</M> ונניח כי <M>s̄</M> הוא חסם מלעיל של <M>A</M>. אזי <M>s̄ = sup A</M> אם&quot;ם לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'>'} s̄ - ε</M>.</p>
          <Proof>
            <p><strong>עזר ערך 1:</strong> יהיו <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M>. אזי:</p>
            <p>(i) <M>(x+y)/2 {'<'} (y+y)/2 = y</M> (כי <M>x {'<'} y</M>)</p>
            <p>(ii) <M>x = (x+x)/2 {'<'} (x+y)/2</M> (כי <M>x {'<'} y</M>)</p>
          </Proof>
        </Thm>

        <Example title="תרגיל 1 — sup(a,b) = b">
          <p>יהיו <M>a, b ∈ ℝ</M> כך ש-<M>a {'<'} b</M>. הוכיחו כי <M>sup(a, b) = b</M>.</p>
          <Proof>
            <p>פתרון: נזכור כי <M>(a, b) = {'{'}x ∈ ℝ : a {'<'} x {'<'} b{'}'}</M></p>
            <p>(i) <strong>חסם מלעיל:</strong> יהי <M>x ∈ (a, b)</M>. אכן <M>x {'<'} b</M> ולכן <M>x ≤ b</M>.</p>
            <p>(ii) <strong>תכונת ה-ε:</strong> יהי <M>ε {'>'} 0</M>. נניח קודם כי <M>ε ≤ b - a</M>. נבחר <M>x = (b - ε + b)/2</M>. נשים לב כי <M>b {'>'} x {'>'} b - ε ≥ a</M> ולכן <M>a {'<'} x {'<'} b</M>, כלומר <M>x ∈ (a,b)</M>.</p>
            <p>עתה נניח כי <M>ε {'>'} b - a</M>. נבחר <M>x = (a + b)/2</M>. אכן <M>a {'<'} x {'<'} b</M>, ולכן <M>x ∈ (a,b)</M>, וכן <M>x {'>'} a {'>'} b - ε</M> (כי <M>ε {'>'} b - a</M>).</p>
          </Proof>
        </Example>

        <Remark>
          <p><strong>הערה 1:</strong> באותו האופן ניתן להוכיח כי <M>inf(a, b) = a</M> וגם <M>inf(a, ∞) = a</M> וגם <M>sup(-∞, b) = b</M> (וכן לכל קטע).</p>
        </Remark>

        <Thm title="משפט 1 — תכונת ה-ε של inf A">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> ונניח כי <M>A</M> חסומה מלרע. יהי <M>s ∈ ℝ</M> ונניח כי <M>s</M> הוא חסם מלרע של <M>A</M>. אזי <M>s = inf A</M> אם&quot;ם לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'<'} s + ε</M>.</p>
          <Proof>
            <p>HW Q1 b.</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>תרשים זרימה:</strong> אקסיומת השלמות → משפט החסם העליון → תכונת הארכימדיות</p>
        </Remark>

        <Thm title="משפט 2 — תכונת הארכימדיות (ℕ לא חסומה מלעיל)">
          <p><M>ℕ</M> לא חסומה מלעיל. כלומר לכל <M>M ∈ ℝ</M> קיים <M>n ∈ ℕ</M> כך ש-<M>n {'>'} M</M>.</p>
          <Proof>
            <p><strong>הוכחה שלילה:</strong> יהי <M>n ∈ ℕ</M>. אכן <M>n {'<'} n + 1</M> (<M>n + 1 ∈ ℕ</M>).</p>
            <p>נניח בשלילה ש-<M>ℕ</M> חסומה מלעיל. נשים לב כי <M>ℕ ⊆ ℝ</M> (כי <M>ℕ ⊆ ℤ ⊆ ℝ</M>) ו-<M>ℕ ≠ ∅</M> (כי <M>1 ∈ ℕ</M>), ולכן ממשפט החסם העליון קיים <M>s̄ ∈ ℝ</M> כך ש-<M>s̄ = sup(ℕ)</M>.</p>
            <p>מתכונת ה-ε של <M>s̄</M>, קיים <M>n₁ ∈ ℕ</M> כך ש-<M>s̄ - 1 {'<'} n₁</M> (עם <M>ε = 1</M>). אכן <M>n₁ + 1 {'>'} s̄</M>.</p>
            <p>אבל <M>n₁ + 1 ∈ ℕ</M>. סתירה לכך ש-<M>s̄</M> חסם מלעיל של <M>ℕ</M>.</p>
          </Proof>
        </Thm>

        <Thm title="משפט 3 — תכונת הארכימדיות ההפוכה (1/n < ε)">
          <p>לכל <M>ε {'>'} 0</M> קיים <M>n ∈ ℕ</M> כך ש-<M>1/n {'<'} ε</M>.</p>
          <Proof>
            <p>יהי <M>ε {'>'} 0</M>. מארכימדיות, קיים <M>n₁ ∈ ℕ</M> כך ש-<M>n₁ {'>'} 1/ε</M>. נבחר <M>n = n₁</M>.</p>
            <p>אזי (*) מתקיים שכל <M>n</M> הרי. אכן:</p>
            <p><M>1/n = 1/n₁ {'<'} 1/(1/ε) = ε</M></p>
          </Proof>
        </Thm>

        <Thm title="משפט 4 — משפט המקסימום (עבור ℤ)">
          <p>תהי <M>∅ ≠ A ⊆ ℤ</M>. נניח כי <M>A</M> חסומה מלעיל. אזי קיים ב-<M>A</M> איבר מקסימלי.</p>
          <Proof>
            <p>הוכחת: הנחית מהיות <M>∅ ≠ A ⊆ ℝ</M> (כי <M>ℤ ⊆ ℝ</M>)</p>
            <p>חסומה מלעיל, אזי ממשפט החסם העליון קיים <M>s̄ ∈ ℝ</M> כך ש-<M>s̄ = sup(A)</M>.</p>
            <p>מתכונת ה-ε של <M>s̄</M>, קיים <M>a₁ ∈ A</M> כך ש-<M>a₁ {'>'} s̄ - 1</M>. (*)</p>
            <p>נבחר <M>ā = a₁</M> ונוכיח כי <M>ā</M> איבר מקסימלי ונסים.</p>
            <p>יהי <M>a ∈ A</M>. נניח בשלילה כי <M>a {'>'} ā</M>. מהיות <M>a, ā ∈ ℤ</M> ו-<M>a {'>'} ā</M> אזי <M>a ≥ ā + 1</M>.</p>
            <p>אכן <M>a ≥ ā + 1 = a₁ + 1 {'>'} s̄</M> (מ-(*))</p>
            <p>סתירה לכך ש-<M>s̄</M> הוא חסם מלעיל של <M>A</M>.</p>
          </Proof>
        </Thm>

        <Thm title="משפט 5 — משפט המינימום (עבור ℤ)">
          <p>תהי <M>∅ ≠ A ⊆ ℤ</M>. נניח כי <M>A</M> חסומה מלרע. אזי קיים ב-<M>A</M> איבר מינימלי.</p>
          <Proof>
            <p>באופן דומה.</p>
          </Proof>
        </Thm>

        <Def title="רצפה (floor) — ⌊x⌋">
          <p>יהי <M>x ∈ ℝ</M>. נגדיר את החלק השלם התחתון (floor) ע&quot;י:</p>
          <p><M>⌊x⌋ = max{'{'}n ∈ ℤ : n ≤ x{'}'}</M></p>
        </Def>

        <Def title="תקרה (ceiling) — ⌈x⌉">
          <p>יהי <M>x ∈ ℝ</M>. נגדיר את החלק השלם העליון (ceiling) ע&quot;י:</p>
          <p><M>⌈x⌉ = min{'{'}n ∈ ℤ : n ≥ x{'}'}</M></p>
          <p>דוגמאות: ① <M>⌊5⌋ = 5, ⌊5.9⌋ = 5, ⌊5.1⌋ = 5</M> ② <M>⌈5.1⌉ = 6, ⌈6⌉ = 6, ⌈-2.9⌉ = -2</M></p>
        </Def>

        <Claim title="טענה 2 — ⌊x⌋ מוגדרת היטב">
          <p>נגדיר <M>A = {'{'}n ∈ ℤ : n ≤ x{'}'}</M>. נשים לב כי <M>A ⊆ ℤ</M> (ברור) וחסומה מלעיל ע&quot;י <M>x</M>. מארכימדיות, קיים <M>n₁ ∈ ℕ</M> כך ש-<M>n₁ {'>'} -x</M>. נבחר <M>n = -n₁</M>. נשים לב כי <M>n ∈ ℤ</M> ובנוסף <M>n = -n₁ {'<'} -(-x) = x</M>, כלומר <M>n ≤ x</M>, ולכן <M>n ∈ A</M>. אכן <M>A ≠ ∅</M>. אכן ממשפט המקסימום <M>max A</M> קיים ולכן <M>⌊x⌋</M> מוגדר היטב. באופן דומה, <M>⌈x⌉</M> מוגדר היטב.</p>
        </Claim>

        <Thm title="משפט 6 — x - 1 < ⌊x⌋ ≤ x">
          <p>לכל <M>x ∈ ℝ</M> מתקיים: (i) <M>⌊x⌋ ≤ x</M> (ii) <M>x - 1 {'<'} ⌊x⌋</M>.</p>
          <Proof>
            <p>יהי <M>x ∈ ℝ</M>.</p>
            <p>(i) <M>⌊x⌋ = max{'{'}n ∈ ℤ : n ≤ x{'}'} ∈ {'{'}n ∈ ℤ : n ≤ x{'}'}</M>, ולכן <M>⌊x⌋ ≤ x</M>.</p>
            <p>(ii) נניח בשלילה כי <M>⌊x⌋ ≤ x - 1</M>. אכן <M>⌊x⌋ + 1 ≤ x</M>, ולכן <M>⌊x⌋ + 1 ∈ {'{'}n ∈ ℤ : n ≤ x{'}'}</M>. בסתירה למקסימליות של <M>⌊x⌋</M>.</p>
          </Proof>
        </Thm>

        {/* ============================================= */}
        {/* LECTURE 5 - 11.11.26 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 5 — צפיפות, פונקציות (11.11.26)" />

        <Def title="צפופה (dense) ב-ℝ">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. נאמר ש-<M>A</M> צפופה ב-<M>ℝ</M> אם לכל <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M>, קיים <M>a ∈ A</M> כך ש-<M>x {'<'} a {'<'} y</M>.</p>
        </Def>

        <Example title="תרגיל 1 — A לא צפופה ב-ℝ">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M>. הגדירו את המושג: <M>A</M> לא צפופה ב-<M>ℝ</M>.</p>
          <p><strong>פתרון:</strong> נאמר כי <M>A</M> לא צפופה ב-<M>ℝ</M> אם קיימים <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M> ולכל <M>a ∈ A</M> מתקיים <M>a ≤ x</M> או <M>a ≥ y</M>.</p>
          <p>דוגמה: <M>ℝ</M> צפופה ב-<M>ℝ</M> (כי לכל <M>x {'<'} y</M> יש מספר ממשי, למשל <M>z = (x+y)/2</M>).</p>
        </Example>

        <Thm title="משפט 1 — צפיפות ℚ ב-ℝ">
          <p><M>ℚ</M> צפופה ב-<M>ℝ</M>. כלומר לכל <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M>, קיים <M>q ∈ ℚ</M> כך ש-<M>x {'<'} q {'<'} y</M>.</p>
          <Proof>
            <p>יהיו <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M>.</p>
            <p>מארכימדיות ההפוכה, קיים <M>m₁ ∈ ℕ</M> כך ש-<M>1/m₁ {'<'} y - x</M>.</p>
            <p>נבחר <M>n₁ = ⌊m₁x⌋ + 1</M> ונגדיר <M>q = n₁/m₁</M>. נשים לב ש-<M>q ∈ ℚ</M>. עתה נוכיח כי <M>x {'<'} q {'<'} y</M>.</p>
            <p>(i) <M>q = n₁/m₁ = (⌊m₁x⌋ + 1)/m₁ {'>'} (m₁x - 1 + 1)/m₁ = x</M></p>
            <p>(כי <M>⌊z⌋ {'>'} z - 1</M>)</p>
            <p>(ii) <M>q = n₁/m₁ = (⌊m₁x⌋ + 1)/m₁ ≤ (m₁x + 1)/m₁ = x + 1/m₁ {'<'} y</M></p>
            <p>(כי <M>⌊z⌋ ≤ z</M> ו-<M>1/m₁ {'<'} y - x</M>)</p>
          </Proof>
        </Thm>

        <Thm title="משפט 2 — צפיפות ℝ\ℚ ב-ℝ">
          <p><M>ℝ \ ℚ</M> צפופה ב-<M>ℝ</M>.</p>
          <Proof>
            <p>יהיו <M>x, y ∈ ℝ</M> כך ש-<M>x {'<'} y</M>.</p>
            <p>מצפיפות <M>ℚ</M>, קיים <M>q ∈ ℚ</M> כך ש-<M>x - √2 {'<'} q {'<'} y - √2</M>.</p>
            <p>נבחר <M>r = q + √2 ∈ ℝ \ ℚ</M> (מ&quot;ק). אכן:</p>
            <p><M>x {'<'} √2 + q = r {'<'} y</M></p>
            <p>ולכן <M>x {'<'} r {'<'} y</M>.</p>
          </Proof>
        </Thm>

        <Def title="פונקציה (function)">
          <p>תהיינה <M>∅ ≠ A, B ⊆ ℝ</M>. פונקציה <M>f: A → B</M> היא מסומנת ב-<M>f</M> מ-<M>A</M> ל-<M>B</M> ומגדירה שאריות התאמה כך שלכל <M>x ∈ A</M> קיים <M>y ∈ B</M> יחיד. <M>A</M> נקראת תחום ההגדרה (domain). <M>B</M> נקראת הטווח (range). לכל <M>x ∈ A</M> נסמן <M>f(x) = y</M> כאשר <M>y ∈ B</M>. הוא ה-<M>y</M> היחיד המתאים ל-<M>x</M>.</p>
        </Def>

        <Def title="תמונה (image) של f">
          <p>תהי <M>f: A → B</M>. התמונה של <M>f</M> מוגדרת כאריות הקבוצה:</p>
          <p><M>Im f = {'{'}f(x) : x ∈ A{'}'}</M></p>
        </Def>

        <Def title="המישור האוקלידי ℝ²">
          <p>המישור האוקלידי מוגדר כאריות הקבוצה:</p>
          <p><M>ℝ² = {'{'} (x, y) : x, y ∈ ℝ {'}'}</M></p>
        </Def>

        <Def title="גרף של פונקציה">
          <p>תהי כה <M>f: A → B</M>. הגרף של <M>f</M> מוגדר כאריות הקבוצה:</p>
          <p><M>Gf = {'{'} (x, f(x)) : x ∈ A {'}'} ⊆ ℝ²</M></p>
        </Def>

        <Def title="שוויון פונקציות">
          <p>תהיינה <M>f₁: A₁ → B₁</M> ו-<M>f₂: A₂ → B₂</M> שתי פונקציות. נאמר כי <M>f₁ = f₂</M> אם:</p>
          <p>(i) <M>A₁ = A₂</M></p>
          <p>(ii) לכל <M>x ∈ A₁</M> מתקיים <M>f₁(x) = f₂(x)</M>.</p>
        </Def>

        <Remark>
          <p><strong>הערה 1:</strong> נכלל לשנות את <M>B</M> מבלי לשנות את הפונקציה. אכן מתעניין שאילה (כלומר אם כן מאליין אחרות) ש-<M>B = ℝ</M>.</p>
        </Remark>

        <Def title="חד-חד ערכית (injective / one-to-one)">
          <p>תהי <M>f: A → B</M>. נאמר כי:</p>
          <p>(i) <M>f</M> חח&quot;ע (one-to-one / injective) אם לכל <M>x₁, x₂ ∈ A</M> כך ש-<M>f(x₁) = f(x₂)</M> מתקיים <M>x₁ = x₂</M>.</p>
          <p>(ii) <M>f</M> על <M>B</M> (onto B / surjective) אם <M>Im f = B</M>.</p>
        </Def>

        <Def title="מונוטוניות">
          <p>תהי <M>f: A → B</M>. נאמר כי:</p>
          <p>(i) <M>f</M> <strong>עולה</strong> ב-<M>A</M> אם לכל <M>x₁, x₂ ∈ A</M> כך ש-<M>x₁ {'<'} x₂</M> מתקיים <M>f(x₁) ≤ f(x₂)</M>.</p>
          <p>(ii) <M>f</M> <strong>יורדת</strong> ב-<M>A</M> אם לכל <M>x₁, x₂ ∈ A</M> כך ש-<M>x₁ {'<'} x₂</M> מתקיים <M>f(x₁) ≥ f(x₂)</M>.</p>
          <p>(iii) <M>f</M> <strong>עולה ממש</strong> ב-<M>A</M> אם לכל <M>x₁, x₂ ∈ A</M> כך ש-<M>x₁ {'<'} x₂</M> מתקיים <M>f(x₁) {'<'} f(x₂)</M>.</p>
          <p>(iv) <M>f</M> <strong>יורדת ממש</strong> ב-<M>A</M> אם לכל <M>x₁, x₂ ∈ A</M> כך ש-<M>x₁ {'<'} x₂</M> מתקיים <M>f(x₁) {'>'} f(x₂)</M>.</p>
          <p>(v) <M>f</M> <strong>מונוטונית</strong> אם היא עולה או יורדת.</p>
          <p>(vi) <M>f</M> <strong>מונוטונית ממש</strong> אם היא עולה ממש או יורדת ממש.</p>
        </Def>

        <Def title="פונקציה קבועה (constant)">
          <p>תהי <M>f: A → B</M>. נאמר ש-<M>f</M> קבועה (constant) ב-<M>A</M> אם קיים <M>c ∈ ℝ</M> כך שלכל <M>x ∈ A</M> מתקיים <M>f(x) = c</M>.</p>
        </Def>

        <Def title="פונקצית הזהות (identity)">
          <p>פונקצית הזהות (identity) מוגדרת ע&quot;י <M>id: ℝ → ℝ</M> כך שלכל <M>x ∈ ℝ</M> מתקיים <M>id(x) = x</M>.</p>
        </Def>

        {/* ============================================= */}
        {/* LECTURE 6 - 13.11.25 */}
        {/* ============================================= */}
        <SectionHeader title="הרצאה 6 — פונקציה מעריכית, לוגריתם, ערך מוחלט (13.11.25)" />

        <Def title="פונקציה מעריכית (exponential)">
          <p>פונקציה <M>f: ℝ → ℝ</M> תקרא מעריכית אם קיים <M>0 {'<'} a ≠ 1</M> כך שלכל <M>x ∈ ℝ</M> מתקיים <M>f(x) = aˣ</M>.</p>
        </Def>

        <Thm title="משפט 1 — תכונות בסיסיות של פונקציה מעריכית">
          <p>יהי <M>0 {'<'} a ≠ 1</M> ותהי <M>f: ℝ → ℝ</M> הפונקציה המוגדרת ע&quot;י <M>f(x) = aˣ</M> לכל <M>x ∈ ℝ</M>. אזי:</p>
          <p>(i) <M>f(x) {'>'} 0</M> לכל <M>x ∈ ℝ</M></p>
          <p>(ii) אם <M>a {'>'} 1</M>, <M>f</M> עולה ממש. ואם <M>0 {'<'} a {'<'} 1</M>, <M>f</M> יורדת ממש.</p>
          <p>(iii) <M>Im f = (0, ∞)</M></p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Remark>
          <p><strong>הערה 1:</strong> אם <M>f</M> מונוטונית ממש אזי <M>f</M> חח&quot;ע.</p>
          <table className="text-xs border border-gray-300 w-full mt-1">
            <thead><tr><th className="border p-1">מונוטונית</th><th className="border p-1">על</th><th className="border p-1">חח&quot;ע</th><th className="border p-1">Im f</th><th className="border p-1">תחום הגדרה</th><th className="border p-1">f</th></tr></thead>
            <tbody><tr><td className="border p-1">כן</td><td className="border p-1">כן</td><td className="border p-1">לא</td><td className="border p-1">(0, ∞)</td><td className="border p-1">ℝ</td><td className="border p-1">מעריכית</td></tr></tbody>
          </table>
        </Remark>

        <Thm title="משפט 2 — חוקי חזקות (פעולות של פונקציות מעריכיות)">
          <p>יהיו <M>0 {'<'} a, b ≠ 1</M>. אזי לכל <M>x, y ∈ ℝ</M> מתקיים:</p>
          <p>(i) <M>aˣ⁺ʸ = aˣ · aʸ</M></p>
          <p>(ii) <M>aˣ⁻ʸ = aˣ / aʸ</M></p>
          <p>(iii) <M>(aˣ)ʸ = (aʸ)ˣ = aˣ·ʸ</M></p>
          <p>(iv) <M>aˣ · bˣ = (a·b)ˣ</M></p>
          <p>(v) <M>aˣ / bˣ = (a/b)ˣ</M></p>
          <p>(vi) לכל <M>2 ≤ n ∈ ℕ</M> מתקיים <M>a^(1/n) = ⁿ√a</M></p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Corollary title="מסקנה 1 — תכונות השורש">
          <p>לכל <M>x, y {'>'} 0</M> ולכל <M>2 ≤ n, m ∈ ℕ</M> מתקיים:</p>
          <p>(i) <M>ⁿ√x · ⁿ√y = ⁿ√(x·y)</M></p>
          <p>(ii) <M>ⁿ√x / ⁿ√y = ⁿ√(x/y)</M></p>
          <p>(iii) <M>ᵐ√(ⁿ√x) = ⁿᵐ√x</M></p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Corollary>

        <Def title="פונקציה הפיכה (invertible)">
          <p>תהי <M>f: A → B</M>. נאמר כי <M>f</M> הפיכה אם <M>f</M> חח&quot;ע ועל.</p>
        </Def>

        <Remark>
          <p><strong>הערה 2:</strong> אם <M>f: A → B</M> חח&quot;ע, אזי ניתן להפוך את כיווני החיצים של <M>f</M> ולקבל פונקציה.</p>
        </Remark>

        <Def title="פונקציה הופכית (inverse)">
          <p>תהי <M>f: A → B</M> חח&quot;ע. הפונקציה ההופכית של <M>f</M> מסומנת ב-<M>f⁻¹: B → A</M>, ומוגדרת ע&quot;י: לכל <M>y ∈ B</M>, <M>f⁻¹(y) = x</M> כאשר <M>x ∈ A</M> הוא הערך היחיד ב-<M>A</M> שמקיים <M>f(x) = y</M>.</p>
        </Def>

        <Remark>
          <p><strong>הערה 3:</strong> לכל <M>x ∈ A</M> מתקיים <M>f⁻¹(f(x)) = x</M> וגם לכל <M>y ∈ B</M> מתקיים <M>f(f⁻¹(y)) = y</M>.</p>
        </Remark>

        <Remark>
          <p><strong>הערה 4:</strong> תמיד ניתן לשנות את הטווח ולהקטין ל-<M>B = Im f</M>. אכן לא פונקציה הוא תמיד על התמונה שלה.</p>
        </Remark>

        <Def title="לוגריתם (logarithm)">
          <p>יהי <M>0 {'<'} a ≠ 1</M>. נגדיר: <M>log_a: (0, ∞) → ℝ</M> ע&quot;י: לכל <M>y {'>'} 0</M> נגדיר <M>log_a(y) = x</M> כאשר <M>x ∈ ℝ</M> הוא הערך היחיד שמקיים <M>aˣ = y</M>.</p>
          <p>דוגמאות: ① <M>log₅(25) = 2, log₅(1/125) = -3</M> ② <M>log₅(5ˣ) = x</M> לכל <M>x ∈ ℝ</M>, <M>5^(log₅(y)) = y</M> לכל <M>y {'>'} 0</M></p>
          <table className="text-xs border border-gray-300 w-full mt-1">
            <thead><tr><th className="border p-1">מונוטונית</th><th className="border p-1">על</th><th className="border p-1">חח&quot;ע</th><th className="border p-1">Im f</th><th className="border p-1">תחום הגדרה</th><th className="border p-1">f</th></tr></thead>
            <tbody><tr><td className="border p-1">כן</td><td className="border p-1">כן</td><td className="border p-1">כן</td><td className="border p-1">ℝ</td><td className="border p-1">(0, ∞)</td><td className="border p-1">log_a</td></tr></tbody>
          </table>
        </Def>

        <Thm title="משפט 4 — תכונות הלוגריתם">
          <p>יהיו <M>0 {'<'} a, b ≠ 1</M>. אזי:</p>
          <p>(i) לכל <M>x, y {'>'} 0</M> מתקיים <M>log_a(x·y) = log_a(x) + log_a(y)</M></p>
          <p>(ii) לכל <M>x, y {'>'} 0</M> מתקיים <M>log_a(x/y) = log_a(x) - log_a(y)</M></p>
          <p>(iii) לכל <M>x {'>'} 0</M> ולכל <M>y ∈ ℝ</M> מתקיים <M>log_a(xʸ) = y · log_a(x)</M></p>
          <p>(iv) לכל <M>x {'>'} 0</M> מתקיים <M>log_b(x) = log_a(x) / log_a(b)</M> (המרת בסיס)</p>
          <Proof>
            <p>לא נוכיח.</p>
          </Proof>
        </Thm>

        <Def title="ערך מוחלט (absolute value)">
          <p>נגדיר את פונקצית הערך המוחלט ע&quot;י: לכל <M>x ∈ ℝ</M>:</p>
          <p><M>|x| = x</M> אם <M>x ≥ 0</M></p>
          <p><M>|x| = -x</M> אם <M>x {'<'} 0</M></p>
          <p>דוגמאות: <M>|5| = 5</M>, <M>|-3| = -(-3) = 3</M></p>
        </Def>

        <Thm title="משפט 5 — תכונות בסיסיות של ערך מוחלט">
          <p>לכל <M>x, y ∈ ℝ</M> מתקיים:</p>
          <p>(i) <M>|x| ≥ 0</M></p>
          <p>(ii) <M>|-x| = |x|</M></p>
          <p>(iii) <M>|x - y| = |y - x|</M></p>
          <p>(iv) <M>-|x| ≤ x ≤ |x|</M></p>
          <p>(v) <M>|x| = √(x²)</M></p>
        </Thm>

        {/* ============================================= */}
        {/* RECITATIONS */}
        {/* ============================================= */}
        <SectionHeader title="תרגול 1 — שלילת משפטים, התחלקות, הוכחות" />

        <Remark>
          <p><strong>שלילת משפטים:</strong> סימונים שכיחים: ∀ = לכל, ∃ = קיים.</p>
          <p>• הדרך הישירה לשלול טענת &quot;לכל&quot; היא ע&quot;י מציאת דוגמא נגדית (קיים).</p>
          <p>• הדרך הישירה לשלול טענת &quot;קיים&quot; היא ע&quot;י להראות שהטענה לא מתקיימת (לכל).</p>
        </Remark>

        <Example title="שלילת משפטים — תרגילים 1-5">
          <p><strong>1.</strong> קיים <M>x ∈ ℕ</M> כך ש-<M>5x = 15</M>. מוגדרת היטב כי <M>x</M> הוגדר.</p>
          <p><strong>שלילה:</strong> לכל <M>x ∈ ℕ</M> מתקיים <M>5x ≠ 15</M>.</p>
          <p><strong>2.</strong> מתקיים <M>(x + 4)² = x² + 8x + 16</M>. אינה מוגדרת היטב כי <M>x</M> לא הוגדר.</p>
          <p><strong>3.</strong> לכל <M>y ∈ ℚ</M> מתקיים <M>π {'<'} y + 2</M>. מוגדרת היטב כי <M>y</M> הוגדר.</p>
          <p><strong>שלילה:</strong> קיים <M>y ∈ ℚ</M> כך ש-<M>π ≥ y + 2</M>.</p>
          <p><strong>4.</strong> קיים <M>y ∈ ℕ</M> כך שמתקיים <M>y ≤ 0</M>. מוגדרת היטב כי <M>y</M> הוגדר.</p>
          <p><strong>שלילה:</strong> לכל <M>y ∈ ℕ</M> מתקיים <M>y {'>'} 0</M>.</p>
          <p><strong>5.</strong> קיים <M>n ∈ ℕ</M> כך שלכל <M>r ∈ ℝ</M> מתקיים <M>n - 4 {'<'} r</M>. מוגדרת היטב כי <M>n, r</M> הוגדרו.</p>
          <p><strong>שלילה:</strong> לכל <M>n ∈ ℕ</M> קיים <M>r ∈ ℝ</M> כך ש-<M>r ≤ n - 4</M>.</p>
        </Example>

        <Example title="תרגיל התחלקות — k|(n+4) ו-k|(2n+1) גורר k=7">
          <p>יהיו <M>k, n ∈ ℕ</M> כך ש-<M>k {'>'} 1</M>. ננניח ש-<M>k | (n + 4)</M> וגם <M>k | (2n + 1)</M>. הוכיחו ש-<M>k = 7</M>.</p>
          <Proof>
            <p>היות ש-<M>k | (n + 4)</M> וגם <M>k | (2n + 1)</M> אז מהמשפט הקודם נקבל ש-<M>k</M> מחלק גם את החיסור שלהם: <M>2n + 1 - (n + 4) = n - 3</M>, כלומר <M>k | (n - 3)</M>.</p>
            <p>היות ש-<M>k | (n + 4)</M> וגם <M>k | (n - 3)</M> אז מהמשפט הקודם נקבל ש-<M>k</M> מחלק גם את החיסור שלהם: <M>n + 4 - (n - 3) = 7</M>, כלומר <M>k | 7</M>.</p>
            <p>היות ש-<M>k {'>'} 1</M> ו-7 מספר ראשוני, אז בהכרח <M>k = 7</M>.</p>
          </Proof>
        </Example>

        <Claim title="r + q ∈ ℝ\ℚ כאשר r ∈ ℝ\ℚ ו-q ∈ ℚ">
          <p><strong>טענה:</strong> יהי <M>q ∈ ℚ</M> ויהי <M>r ∈ ℝ \ ℚ</M>, אזי <M>r + q ∈ ℝ \ ℚ</M>.</p>
          <Proof>
            <p><strong>הערה:</strong> אין לנו אפשרות ישירה להראות שמספר הוא אי רציונלי, לכן נשתמש בהוכחה <strong>בשלילה</strong>: ננניח שהטענה ההפוכה נכונה ונראה שמקבלים סתירה (בדרך כלל על אחד מהנתונים) ולכן הטענה המקורית נכונה.</p>
            <p>ננניח בשלילה ש-<M>r + q ∈ ℚ</M>, לכן קיים <M>p ∈ ℚ</M> כך ש-<M>r + q = p</M>. לכן <M>r = p - q</M>.</p>
            <p>מסגירות הרציונליים, נוכל לומר כי <M>p - q ∈ ℚ</M> ולכן <M>r</M> רציונלי.</p>
            <p>סתירה לנתון! לכן ההיפך מההנחה שלנו נכון, כלומר <M>r + q ∈ ℝ \ ℚ</M>.</p>
          </Proof>
        </Claim>

        <Corollary title="1 + √2 מספר אי רציונלי">
          <p><M>1 + √2</M> מספר אי רציונלי.</p>
        </Corollary>

        <Example title="הוכח או הפרך">
          <p><strong>1.</strong> יהי <M>r ∈ ℝ \ ℚ</M>, אזי <M>r² ∈ ℝ \ ℚ</M>.</p>
          <p><strong>פתרון:</strong> הטענה לא נכונה. נבחר <M>r = √2 ∈ ℝ \ ℚ</M>. אבל <M>r² = 2 ∈ ℚ</M>.</p>
          <p><strong>2.</strong> יהי <M>q ∈ ℚ</M> ויהי <M>r ∈ ℝ \ ℚ</M>, אזי <M>r · q ∈ ℝ \ ℚ</M>.</p>
          <p><strong>פתרון:</strong> הטענה לא נכונה. נבחר <M>r = √2 ∈ ℝ \ ℚ</M>, <M>q = 0 ∈ ℚ</M>. אבל <M>r · q = 0 ∈ ℚ</M>.</p>
        </Example>

        <Claim title="ⁿ√r ∈ ℝ\ℚ כאשר 0 < r ∈ ℝ\ℚ">
          <p>יהי <M>0 {'<'} r ∈ ℝ \ ℚ</M> ויהי <M>1 {'<'} n ∈ ℕ</M>, אזי <M>ⁿ√r ∈ ℝ \ ℚ</M>.</p>
          <Proof>
            <p>ננניח בשלילה ש-<M>ⁿ√r ∈ ℚ</M>, לכן קיים <M>q ∈ ℚ</M> כך שמתקיים <M>ⁿ√r = q</M>.</p>
            <p>כעת נעלה את שני הצדדים בחזקת <M>n</M> ונקבל <M>r = qⁿ</M>.</p>
            <p>מסגירות הרציונליים, נוכל לומר כי <M>qⁿ ∈ ℚ</M> ולכן <M>r</M> רציונלי.</p>
            <p>סתירה לנתון! לכן ההיפך מההנחה שלנו נכון, כלומר <M>ⁿ√r ∈ ℝ \ ℚ</M>.</p>
          </Proof>
        </Claim>

        <Example title="הפרכה — תרגיל 4">
          <p><strong>4.</strong> יהיו <M>x, y, z, w ∈ ℝ \ {'{'}0{'}'}</M> וכך ש-<M>x · y = w · z</M>, אזי <M>y/z ∈ ℚ</M>.</p>
          <p><strong>פתרון:</strong> הטענה לא נכונה. נבחר <M>x = z = 1/⁴√2</M>, <M>w = y = ⁴√2</M>.</p>
          <p>נשים לב ש-<M>x · y = (1/⁴√2) · ⁴√2 = 1 = w · z</M> (כלומר <M>x · y = w · z</M>).</p>
          <p>אבל <M>y/z = ⁴√2/(1/⁴√2) = ⁴√2 · ⁴√2 = √2 ∈ ℝ \ ℚ</M>.</p>
        </Example>

        <SectionHeader title="תרגול 2 — חסמים, סופרמום ואינפימום, ארכימדיות" />

        <Remark>
          <p><strong>תזכורת — הגדרות:</strong></p>
          <p>• תהי <M>∅ ≠ A ⊆ ℝ</M>, ויהי <M>ā ∈ A</M>. נאמר כי <M>ā</M> איבר מקסימלי ב-<M>A</M> אם לכל <M>a ∈ A</M> מתקיים <M>a ≤ ā</M>. נאמר כי <M>a̲</M> איבר מינימלי ב-<M>A</M> אם לכל <M>a ∈ A</M> מתקיים <M>a ≥ a̲</M>.</p>
          <p>• <M>A</M> חסומה מלעיל אם קיים <M>M ∈ ℝ</M> כך שלכל <M>a ∈ A</M> מתקיים <M>a ≤ M</M>. חסומה מלרע אם קיים <M>m ∈ ℝ</M> כך שלכל <M>a ∈ A</M> מתקיים <M>a ≥ m</M>.</p>
          <p>• <M>s̄</M> הוא sup(A) אם: (1) <M>s̄</M> חסם מלעיל של <M>A</M>, כלומר לכל <M>a ∈ A</M> מתקיים <M>a ≤ s̄</M>. (2) <M>s̄</M> מינימלי, כלומר לכל <M>M ∈ ℝ</M> כך ש-<M>M</M> חסם מלעיל של <M>A</M> מתקיים <M>s̄ ≤ M</M>.</p>
        </Remark>

        <Remark>
          <p><strong>תכונת ε של sup:</strong> תהי <M>∅ ≠ A ⊆ ℝ</M> ונניח כי <M>A</M> חסומה מלעיל. יהי <M>s̄ ∈ ℝ</M> ונניח כי <M>s̄</M> הוא חסם מלעיל של <M>A</M>. אזי <M>s̄ = sup(A)</M> אם&quot;ם לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'>'} s̄ - ε</M>.</p>
          <p><strong>תכונת ε של inf:</strong> תהי <M>∅ ≠ A ⊆ ℝ</M>. יהי <M>s ∈ ℝ</M> ונניח כי <M>s</M> חסם מלרע של <M>A</M>. אזי <M>s = inf(A)</M> אם&quot;ם לכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'<'} s + ε</M>.</p>
          <p><strong>ארכימדיות:</strong> <M>ℕ</M> אינה חסומה מלעיל. כלומר לכל <M>M ∈ ℝ</M> קיים <M>n ∈ ℕ</M> כך ש-<M>n {'>'} M</M>.</p>
        </Remark>

        <Example title="תרגיל — sup(A) ≤ q < 1">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> קבוצה חסומה מלעיל. ננניח שקיים <M>q {'<'} 1</M> כך שלכל <M>a ∈ A</M> מתקיים <M>a ≤ q</M>. הוכיחו כי <M>sup(A) {'<'} 1</M>.</p>
          <Proof>
            <p>ראשית נשים לב ש-<M>A</M> חסומה מלעיל ולא ריקה ולכן ממשפט החסם העליון מתקיים <M>sup(A) ∈ ℝ</M>.</p>
            <p>היות שלכל <M>a ∈ A</M> מתקיים <M>a ≤ q</M>, אזי <M>q</M> הוא חסם מלעיל של <M>A</M>.</p>
            <p>sup(A) הוא חסם מלעיל מינימלי ולכן מתקיים <M>sup(A) ≤ q {'<'} 1</M>.</p>
            <p>(החסם מלעיל הקטן ביותר, קטן או שווה מכל חסם מלעיל אחר).</p>
          </Proof>
        </Example>

        <Claim title="טענה — sup(A) ∈ A אם ורק אם יש איבר מקסימלי ב-A">
          <p>תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלעיל. הוכיחו כי <M>sup(A) ∈ A</M> אם ורק אם יש איבר מקסימלי ב-<M>A</M>.</p>
          <Proof>
            <p><strong>⇒</strong> ננניח כי <M>sup(A) ∈ A</M> ונוכיח כי קיים ב-<M>A</M> איבר מקסימלי.</p>
            <p>נסמן ב-<M>ā</M> את האיבר המקסימלי. האיבר המקסימלי שייך לקבוצה ולכן <M>ā ∈ A</M>. נראה כי <M>ā = sup(A)</M>.</p>
            <p>1. <M>ā</M> הוא האיבר המקסימלי, לכל <M>a ∈ A</M> מתקיים <M>a ≤ ā</M>, ולכן <M>ā</M> הוא חסם מלעיל של <M>A</M>.</p>
            <p>2. כעת נראה שהוא החסם מלעיל הקטן ביותר. ננניח בשלילה שקיים <M>M ∈ ℝ</M> חסם מלעיל קטן יותר, כלומר <M>M {'<'} ā</M>. היות ש-<M>M</M> הוא חסם מלעיל, אזי לכל <M>a ∈ A</M> מתקיים <M>a ≤ M</M>. היות ש-<M>ā ∈ A</M> אזי <M>ā ≤ M</M>. סתירה!</p>
            <p>לכן <M>sup(A) = ā</M> ולכן <M>sup(A) ∈ A</M> (כי <M>ā ∈ A</M>).</p>
            <p><strong>⇐</strong> ננניח כי <M>sup(A) ∈ A</M>. נוכיח כי <M>sup(A)</M> הוא האיבר המקסימלי.</p>
            <p>לכל <M>a ∈ A</M> מתקיים <M>a ≤ sup(A)</M> (כי הוא חסם מלעיל). ו-<M>sup(A) ∈ A</M>. לכן <M>sup(A)</M> הוא איבר מקסימלי.</p>
          </Proof>
        </Claim>

        <Remark>
          <p><strong>הערה:</strong> שימו לב שבעצם הוכחנו שבמקרה זה sup(A) הוא האיבר המקסימלי. כלומר אם sup(A) שייך לקבוצה, אז הוא בהכרח גם האיבר המקסימלי. כלומר אם יש איבר מקסימלי ב-<M>A</M>, אז הוא בהכרח גם הסופרימום (חסם עליון).</p>
          <p><strong>הערה נוספת:</strong> באותו האופן ניתן להוכיח את המשפט: תהי <M>∅ ≠ A ⊆ ℝ</M> חסומה מלרע, אזי <M>inf(A) ∈ A</M> אם ורק אם יש איבר מינימלי ב-<M>A</M>.</p>
        </Remark>

        <Example title="A = {(n+5)/(n+10) : n ∈ ℕ} — חישוב sup, inf, min, max">
          <p>עבור הקבוצה <M>A = {'{'} (n+5)/(n+10) : n ∈ ℕ {'}'}</M>, חשבו את sup(A), inf(A), min(A), max(A) או הוכיחו שאינם קיימים.</p>
          <Proof>
            <p><strong>פתרון:</strong> נשים לב שלכל <M>n ∈ ℕ</M> מתקיים <M>(n+5)/(n+10) {'<'} (n+10)/(n+10) = 1</M>. לכן 1 הוא חסם מלעיל של <M>A</M>.</p>
            <p><strong>sup(A) = 1:</strong> נשתמש בתכונת ε של החסם העליון, נרצה להראות שלכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> כך ש-<M>a {'>'} 1 - ε</M>.</p>
            <p>כלומר, לכל <M>ε {'>'} 0</M> קיים <M>n ∈ ℕ</M> כך ש-<M>(n+5)/(n+10) {'>'} 1 - ε</M>.</p>
            <p><M>n + 5 {'>'} n + 10 - n·ε - 10·ε</M> → <M>n·ε {'>'} 5 - 10·ε</M> → <M>n {'>'} (5 - 10·ε)/ε</M></p>
            <p>יהי <M>ε {'>'} 0</M>. נבחר <M>n ∈ ℕ</M>, מארכימדיות קיים כזה <M>n</M> כך ש-<M>n {'>'} (5 - 10·ε)/ε</M>, ונקבל <M>(n+5)/(n+10) {'>'} 1 - ε</M>.</p>
            <p>ולכן <M>sup(A) = 1</M>.</p>
            <p>היות ש-1 לא שייך ל-<M>A</M> (כי לכל <M>n</M>, <M>(n+5)/(n+10) {'<'} 1</M>), מהטענה הקודמת שהוכחנו לקבוצה אין מקסימום.</p>
            <p><strong>inf(A) = min(A) = 6/11:</strong> נוכיח שעבור <M>n = 1</M> מקבלים את האיבר המינימלי. נציב <M>n = 1</M> ונקבל <M>(1+5)/(1+10) = 6/11</M>.</p>
            <p>ננניח בשלילה שקיים <M>n ∈ ℕ</M> כך ש-<M>(n+5)/(n+10) {'<'} 6/11</M>. אז <M>11n + 55 {'<'} 6n + 60</M>, כלומר <M>5n {'<'} 5</M>, כלומר <M>n {'<'} 1</M>. סתירה לכך ש-<M>n ∈ ℕ</M>.</p>
            <p>לכן לכל <M>n ∈ ℕ</M> מתקיים <M>(n+5)/(n+10) ≥ 6/11</M>.</p>
            <p>ולכן <M>6/11</M> הוא חסם מלרע של <M>A</M> ו-<M>6/11 ∈ A</M>, אזי <M>min(A) = 6/11</M> ולכן גם <M>inf(A) = 6/11</M>.</p>
          </Proof>
        </Example>

        <Example title="inf(A) = inf(B) — הוכחה">
          <p>תהיינה <M>∅ ≠ A, B ⊆ ℝ</M> שתי קבוצות חסומות מלרע. ננניח כי:</p>
          <p><M>∀ε {'>'} 0, ∀a ∈ A ∃b ∈ B : b {'<'} a + ε</M></p>
          <p>ננניח בנוסף כי: <M>∀ε {'>'} 0, ∀b ∈ B ∃a ∈ A : a {'<'} b + ε</M></p>
          <p>הוכיחו כי <M>inf(A) = inf(B)</M>.</p>
          <Proof>
            <p>ראשית נשים לב ש-<M>A</M> חסומה מלרע ולא ריקה ולכן ממשפט החסם התחתון מתקיים <M>inf(A) ∈ ℝ</M>.</p>
            <p>שנית נשים לב ש-<M>B</M> חסומה מלרע ולא ריקה ולכן ממשפט החסם התחתון מתקיים <M>inf(B) ∈ ℝ</M>.</p>
            <p>ננניח בשלילה ש-<M>inf(A) ≠ inf(B)</M>, לכן <M>inf(A) {'<'} inf(B)</M> או <M>inf(B) {'<'} inf(A)</M>.</p>
            <p><strong>מקרה:</strong> <M>inf(A) {'<'} inf(B)</M>:</p>
            <p>מתכונת האפסילון של inf(A) קיים <M>a₁ ∈ A</M> שעבורו <M>a₁ {'<'} inf(A) + [inf(B) - inf(A)] = inf(B)</M>.</p>
            <p>היות שלכל <M>ε {'>'} 0</M>, לכל <M>a ∈ A</M> קיים <M>b₁ ∈ B</M> שעבורו <M>b₁ {'<'} a₁ + [inf(B) - a₁] = inf(B)</M>.</p>
            <p>קיבלנו שקיים <M>b₁ ∈ B</M> שעבורו <M>b₁ {'<'} inf(B)</M>. סתירה!</p>
            <p>באותו האופן מוכיחים עבור <M>inf(B) {'<'} inf(A)</M> (נחליף בין האותיות).</p>
          </Proof>
        </Example>

        <SectionHeader title="תרגול 3 — אינפימום, סכום מינקובסקי, צפיפות" />

        {/* --- תרגיל: שלילת אינפימום --- */}
        <Example title="תרגיל — שלילת המושג &quot;s הוא החסם התחתון של A&quot;">
          <p>
            תהי <M>∅ ≠ A ⊆ ℝ</M> קבוצה חסומה מלרע ויהי <M>s ∈ ℝ</M>.
          </p>
          <p>הגדירו את המושג: <M>s</M> אינו החסם התחתון של <M>A</M>.</p>
          <Proof title="פתרון">
            <p>
              נאמר כי <M>s</M> אינו החסם התחתון של <M>A</M> אם קיים <M>a ∈ A</M> כך ש <M>a {'<'} s</M>,
            </p>
            <p>
              או אם קיים <M>m ∈ ℝ</M> כך ש <M>m {'>'} s</M> ולכל <M>a ∈ A</M> מתקיים <M>m ≤ a</M>.
            </p>
          </Proof>
        </Example>

        {/* --- תרגיל: sup, inf, min, max של A={xy/(x²+y²)} --- */}
        <Example title="תרגיל — חישוב sup, inf, min, max">
          <p>
            עבור הקבוצה הבאה, חשבו את <M>sup(A), inf(A), min(A), max(A)</M> או הוכיחו שאינם קיימים.
          </p>
          <p className="text-center my-1">
            <M>{'A = \\{ xy/(x² + y²) : x,y > 0 \\}'}</M>
          </p>

          <Proof title="פתרון">
            <p className="font-bold">חסם מלעיל:</p>
            <p>
              נשים לב שלכל <M>x, y {'>'} 0</M> מתקיים:
            </p>
            <p className="text-center my-1">
              <M>(x − y)² ≥ 0 ⇒ x² − 2xy + y² ≥ 0 ⇒ x² + y² ≥ 2xy</M>
            </p>
            <p>
              מכיוון ש <M>x, y {'>'} 0</M> נחלק ב <M>x² + y²</M>:
            </p>
            <p className="text-center my-1">
              <M>1/2 ≥ xy/(x² + y²)</M>
            </p>
            <p>
              לכן <M>A</M> חסומה מלעיל על ידי <M>1/2</M>.
            </p>

            <p className="font-bold mt-2">הערך 1/2 מתקבל:</p>
            <p>
              נציב <M>x = y = 1</M> ונקבל <M>1·1/(1² + 1²) = 1/2</M>.
            </p>
            <p>
              לכן <M>1/2 ∈ A</M>, ולכן <M>max(A) = 1/2</M> ו־<M>sup(A) = 1/2</M>.
            </p>

            <p className="font-bold mt-2">חסם מלרע:</p>
            <p>
              נשים לב שלכל <M>x, y {'>'} 0</M> מתקיים <M>xy/(x² + y²) {'>'} 0</M> (חלוקה של שני מספרים חיוביים).
            </p>
            <p>
              לכן <M>A</M> חסומה מלרע על ידי <M>0</M>.
            </p>

            <p className="font-bold mt-2">הוכחת inf(A) = 0:</p>
            <p>
              הוכחנו כי <M>0</M> הוא חסם מלרע של <M>A</M>, כעת נראה שהוא החסם התחתון, כלומר נוכיח ש <M>inf(A) = 0</M>.
            </p>
            <p>
              ניעזר בתכונת האפסילון של החסם התחתון. נרצה להראות שלכל <M>ε {'>'} 0</M> קיים <M>a ∈ A</M> שעבורו:
            </p>
            <p className="text-center my-1">
              <M>a {'<'} 0 + ε = ε</M>
            </p>
            <p>
              כלומר, לכל <M>ε {'>'} 0</M> קיימים <M>x, y {'>'} 0</M> כך ש:
            </p>
            <p className="text-center my-1">
              <M>xy/(x² + y²) {'<'} ε</M>
            </p>
            <p>
              נבחר <M>x = 1</M> ו־<M>y = ε</M>. (צריך להראות שקיימים <M>x, y {'>'} 0</M>). נקבל:
            </p>
            <p className="text-center my-1">
              <M>1·ε/(1² + ε²) = ε/(1 + ε²)</M>
            </p>
            <p>
              נשים לב ש <M>1 + ε² {'>'} 1</M> ולכן:
            </p>
            <p className="text-center my-1">
              <M>ε/(1 + ε²) {'<'} ε/1 = ε</M>
            </p>
            <p>
              ולכן <M>inf(A) = 0</M> (כי הוא חסם מלרע שמקיים את תכונת האפסילון).
            </p>
            <p>
              היות ש <M>0 ∉ A</M>, אין איבר מינימלי ב <M>A</M>.
            </p>
          </Proof>
        </Example>

        {/* --- הגדרה: סכום מינקובסקי --- */}
        <Def title="סכום מינקובסקי">
          <p>
            תהיינה <M>∅ ≠ A, B ⊆ ℝ</M>. נגדיר את הפעולה הבאה:
          </p>
          <p className="text-center my-1">
            <M>{'A + B = \\{ a + b : a ∈ A, b ∈ B \\}'}</M>
          </p>
        </Def>

        <Example title="דוגמה — סכום מינקובסקי">
          <p>
            אם <M>{'A = \\{3, 7\\}'}</M> ו־<M>{'B = \\{4, 11\\}'}</M>, אז <M>{'A + B = \\{7, 14, 11, 18\\}'}</M>.
          </p>
        </Example>

        {/* --- טענה: sup(A+B) = sup(A) + sup(B) --- */}
        <Claim title="טענה — sup(A+B) = sup(A) + sup(B)">
          <p>
            יהיו <M>∅ ≠ A, B ⊆ ℝ</M> קבוצות חסומות מלעיל, ו <M>A + B</M> חסומה מלעיל. אזי:
          </p>
          <p className="text-center my-1">
            <M>sup(A + B) = sup(A) + sup(B)</M>
          </p>
        </Claim>

        <Proof title="הוכחה (שיטת תכונת האפסילון)">
          <p>
            היות ש <M>A</M> חסומה מלעיל ולא ריקה, אזי ממשפט החסם העליון מתקיים <M>sup(A) ∈ ℝ</M>.
          </p>
          <p>
            היות ש <M>B</M> חסומה מלעיל ולא ריקה, אזי ממשפט החסם העליון מתקיים <M>sup(B) ∈ ℝ</M>.
          </p>

          <p className="font-bold mt-2">1. חסם מלעיל:</p>
          <p>
            יהי <M>x ∈ A + B</M>. לכן קיימים <M>a ∈ A</M> ו <M>b ∈ B</M> כך ש <M>x = a + b</M> ולכן:
          </p>
          <p className="text-center my-1">
            <M>x = a + b ≤ sup(A) + sup(B)</M>
          </p>
          <p>
            ולכן <M>sup(A) + sup(B)</M> הוא חסם מלעיל של <M>A + B</M>.
          </p>

          <p className="font-bold mt-2">2. תכונת האפסילון:</p>
          <p>
            יהי <M>ε {'>'} 0</M>.
          </p>
          <p>
            מתכונת האפסילון של <M>sup(A)</M> קיים <M>a₁ ∈ A</M> שעבורו:
          </p>
          <p className="text-center my-1">
            <M>a₁ {'>'} sup(A) − ε/2</M>
          </p>
          <p>
            ומתכונת האפסילון של <M>sup(B)</M> קיים <M>b₁ ∈ B</M> שעבורו:
          </p>
          <p className="text-center my-1">
            <M>b₁ {'>'} sup(B) − ε/2</M>
          </p>
          <p>
            נבחר <M>x = a₁ + b₁</M>. לכן <M>x ∈ A + B</M> וגם:
          </p>
          <p className="text-center my-1">
            <M>x = a₁ + b₁ {'>'} sup(A) − ε/2 + sup(B) − ε/2 = sup(A) + sup(B) − ε</M>
          </p>
          <p>
            לכן <M>sup(A) + sup(B)</M> הוא החסם העליון של <M>A + B</M> (כי הוא חסם מלעיל שמקיים את תכונת האפסילון).
          </p>
          <p className="text-center my-1">
            <M>sup(A + B) = sup(A) + sup(B)</M>
          </p>
        </Proof>

        <Proof title="דרך נוספת להוכיח את 2 (הוכחת מינימליות)">
          <p>
            נניח בשלילה שקיים <M>M ∈ ℝ</M> חסם מלעיל של <M>A + B</M> כך ש <M>M {'<'} sup(A) + sup(B)</M>.
          </p>
          <p>
            לכן:
          </p>
          <p className="text-center my-1">
            <M>M − sup(B) {'<'} sup(A)</M>
          </p>
          <p>
            לכן ממינימליות של <M>sup(A)</M>, <M>M − sup(B)</M> הוא לא חסם מלעיל של <M>A</M> ולכן קיים <M>a₁ ∈ A</M> כך ש:
          </p>
          <p className="text-center my-1">
            <M>a₁ {'>'} M − sup(B) ⇒ M − a₁ {'<'} sup(B)</M>
          </p>
          <p>
            ולכן ממינימליות של <M>sup(B)</M>, <M>M − a₁</M> הוא לא חסם מלעיל של <M>B</M> ולכן קיים <M>b₁ ∈ B</M> כך ש:
          </p>
          <p className="text-center my-1">
            <M>b₁ {'>'} M − a₁</M>
          </p>
          <p>
            נבחר <M>x = a₁ + b₁ ∈ A + B</M>. לכן:
          </p>
          <p className="text-center my-1">
            <M>x = a₁ + b₁ {'>'} a₁ + M − a₁ = M</M>
          </p>
          <p>
            סתירה לכך ש <M>M</M> הוא חסם מלעיל של <M>A + B</M>.
          </p>
        </Proof>

        {/* --- צפיפות --- */}
        <Remark title="תזכורת — קבוצה צפופה">
          <p>
            תהי <M>∅ ≠ A ⊆ ℝ</M>. נאמר ש <M>A</M> צפופה ב <M>ℝ</M> אם לכל <M>x, y ∈ ℝ</M> כך ש <M>x {'<'} y</M> קיים <M>a ∈ A</M> כך ש <M>x {'<'} a {'<'} y</M>.
          </p>
        </Remark>

        <Example title="תרגיל — צפיפות הקבוצה {n³/m³}">
          <p>
            הוכיחו כי הקבוצה <M>{'A = \\{ n³/m³ : n, m ∈ ℤ, m ≠ 0 \\}'}</M> צפופה ב <M>ℝ</M>.
          </p>
          <Proof title="פתרון">
            <p>
              יהיו <M>x, y ∈ ℝ</M> כך ש <M>x {'<'} y</M>. מצפיפות הרציונליים קיימים <M>n, m ∈ ℤ</M>, <M>m ≠ 0</M> כך ש:
            </p>
            <p className="text-center my-1">
              <M>∛x {'<'} n/m {'<'} ∛y</M>
            </p>
            <p>
              נעלה את כל הצדדים בחזקת 3 ונקבל:
            </p>
            <p className="text-center my-1">
              <M>x {'<'} n³/m³ {'<'} y</M>
            </p>
            <p>
              נבחר <M>a = n³/m³</M>. נשים לב ש <M>a ∈ A</M> ומתקיים <M>x {'<'} a {'<'} y</M>.
            </p>
          </Proof>
        </Example>

        <Remark title="הערה — טעות נפוצה בתרגיל הצפיפות">
          <p>
            פתרון שגוי: יהיו <M>x, y ∈ ℝ</M> כך ש <M>x {'<'} y</M>. נשים לב שקיימים <M>n, m ∈ ℤ</M>, <M>m ≠ 0</M> כך ש <M>n³/m³ ∈ ℚ</M> ולכן מצפיפות הרציונליים מתקיים <M>x {'<'} n³/m³ {'<'} y</M>.
          </p>
          <p>
            מהי הטעות? מצפיפות הרציונליים אנחנו יודעים שקיים מספר רציונלי בין כל שני מספרים, אבל אנחנו לא יכולים לומר שהמספר הרציונלי שנמצא ביניהם הוא בהכרח מהצורה <M>n³/m³</M> או כל צורה אחרת שהיא לא <M>n/m</M>.
          </p>
        </Remark>

      </div>
    </>
  );
}
