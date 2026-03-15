'use client';

import { useState, useEffect } from 'react';

// =============================================
// תוכנית לימוד משפטים והוכחות — 16 ימים
// כל המשפטים וההוכחות מהרצאות ותרגולים
// =============================================

function M({ children }: { children: React.ReactNode }) {
  return <span className="font-mono bg-gray-50 px-1 rounded text-sm print:bg-transparent">{children}</span>;
}

interface Theorem {
  name: string;
  statement: React.ReactNode;
  proof: React.ReactNode;
}

interface DayData {
  day: number;
  title: string;
  courseWeek: string;
  lectureRef: string;
  theorems: Theorem[];
}

const STUDY_DAYS: DayData[] = [
  // ===== DAY 1 =====
  {
    day: 1,
    title: 'תורת המספרים הבסיסית',
    courseWeek: 'שבוע 1-2',
    lectureRef: 'הרצאה 1',
    theorems: [
      {
        name: 'משפט 2 (סגירות חלוקה)',
        statement: <p>אם <M>a|b</M> ו-<M>a|c</M> אזי <M>a|(b±c)</M></p>,
        proof: <p>מהיות <M>a|b</M> קיים <M>k∈Z</M> כך ש-<M>b=ka</M>. מהיות <M>a|c</M> קיים <M>l∈Z</M> כך ש-<M>c=la</M>. לכן <M>b±c = ka±la = (k±l)a</M>, ומסגירות Z, <M>a|(b±c)</M>.</p>,
      },
      {
        name: 'משפט 5 (חלוקה במכפלה)',
        statement: <p>אם <M>a|(bc)</M> ו-<M>a,b</M> זרים אזי <M>a|c</M></p>,
        proof: <p>מבזו קיימים <M>x,y∈Z</M> כך ש-<M>ax+by=1</M>. נכפיל ב-<M>c</M>: <M>axc+byc=c</M>. מהיות <M>a|(bc)</M>: <M>bc=ka</M>, לכן <M>c=axc+kay=(xc+ky)a</M>, ולכן <M>a|c</M>.</p>,
      },
      {
        name: 'למה של אוקלידס',
        statement: <p><M>p</M> ראשוני ו-<M>p|(ab)</M> אזי <M>p|a</M> או <M>p|b</M></p>,
        proof: <p>נניח <M>p∤a</M>. מהיות <M>p</M> ראשוני, <M>a</M> ו-<M>p</M> זרים. מ-<M>p|(ab)</M> וממשפט 5, <M>p|b</M>.</p>,
      },
      {
        name: 'מסקנה 3',
        statement: <p><M>p</M> ראשוני ו-<M>p|n²</M> אזי <M>p|n</M></p>,
        proof: <p>נובע מאוקלידס עם <M>a=b=n</M>.</p>,
      },
    ],
  },
  // ===== DAY 2 =====
  {
    day: 2,
    title: 'סגירות Q ו-√2 אי-רציונלי',
    courseWeek: 'שבוע 1-2',
    lectureRef: 'הרצאות 1-2',
    theorems: [
      {
        name: 'משפט 8 (סגירות Q)',
        statement: <p><M>q₁,q₂∈Q</M> אזי <M>q₁±q₂, q₁·q₂, q₁/q₂ ∈ Q</M></p>,
        proof: <p><M>q₁=n₁/m₁</M>, <M>q₂=n₂/m₂</M>. חיבור: <M>(n₁m₂±n₂m₁)/(m₁m₂)∈Q</M>. כפל: <M>(n₁n₂)/(m₁m₂)∈Q</M>. חילוק (<M>q₂≠0</M>): <M>(n₁m₂)/(m₁n₂)∈Q</M>.</p>,
      },
      {
        name: 'משפט 3 (√2 אי-רציונלי)',
        statement: <p><M>√2 ∉ Q</M></p>,
        proof: <><p><strong>הוכחה בשלילה:</strong> נניח <M>√2=n/m</M> כאשר <M>n,m</M> זרים. אז <M>2=n²/m²</M>, לכן <M>n²=2m²</M>, לכן <M>2|n²</M>, לכן <M>2|n</M> (ממסקנה 3).</p><p>נכתוב <M>n=2k</M>, נציב: <M>4k²=2m²</M>, לכן <M>m²=2k²</M>, לכן <M>2|m</M>. סתירה לכך ש-<M>n,m</M> זרים.</p></>,
      },
      {
        name: 'טענה מהתרגול: r+q אי-רציונלי',
        statement: <p><M>r∈R\Q</M>, <M>q∈Q</M> אזי <M>r+q∈R\Q</M></p>,
        proof: <p><strong>הוכחה בשלילה:</strong> נניח <M>r+q=p∈Q</M>, אז <M>r=p-q∈Q</M> מסגירות. סתירה.</p>,
      },
    ],
  },
  // ===== DAY 3 =====
  {
    day: 3,
    title: 'סופרמום ואינפימום',
    courseWeek: 'שבוע 1-2',
    lectureRef: 'הרצאה 3',
    theorems: [
      {
        name: 'משפט 3 (קיום ויחידות sup)',
        statement: <p><M>A≠∅</M> חסומה מלעיל → קיים <M>sup(A)</M> יחיד</p>,
        proof: <><p>נגדיר <M>{'B={M∈R: M חסם מלעיל של A}'}</M>. <M>B≠∅</M> (A חסומה) ו-<M>A≤B</M>.</p><p>מאקסיומת השלמות קיים <M>S̄∈R</M> כך ש-<M>{'a≤S̄≤M'}</M> לכל <M>a∈A, M∈B</M>.</p><p>(i) <M>S̄</M> חסם מלעיל: <M>a≤S̄</M> לכל <M>a∈A</M>. (ii) מינימלי: <M>M∈B ⟹ S̄≤M</M>.</p></>,
      },
      {
        name: 'משפט 5 (תכונת ε של sup)',
        statement: <p><M>S̄</M> חסם מלעיל של A. אזי <M>S̄=sup(A)</M> ⟺ לכל <M>{'ε>0'}</M> קיים <M>a∈A</M> כך ש-<M>{'a>S̄-ε'}</M></p>,
        proof: <><p><strong>כיוון ⟸:</strong> נניח בשלילה <M>{'M<S̄'}</M> חסם מלעיל. עבור <M>{'ε=S̄-M>0'}</M> קיים <M>a₁∈A</M> עם <M>{'a₁>S̄-(S̄-M)=M'}</M>. סתירה.</p><p><strong>כיוון ⟹:</strong> <M>{'S̄-ε<S̄'}</M> אינו חסם מלעיל, לכן קיים <M>a∈A</M> עם <M>{'a>S̄-ε'}</M>.</p></>,
      },
      {
        name: 'טענה מתרגול 3: sup(A+B)',
        statement: <p><M>sup(A+B) = sup(A)+sup(B)</M></p>,
        proof: <><p>(1) חסם: <M>x=a+b≤sup(A)+sup(B)</M>.</p><p>(2) ε: לכל <M>{'ε>0'}</M> קיימים <M>{'a₁>sup(A)-ε/2'}</M>, <M>{'b₁>sup(B)-ε/2'}</M>, לכן <M>{'a₁+b₁>sup(A)+sup(B)-ε'}</M>.</p></>,
      },
    ],
  },
  // ===== DAY 4 =====
  {
    day: 4,
    title: 'ארכימדס ומשפטים על Z',
    courseWeek: 'שבוע 1-2',
    lectureRef: 'הרצאה 4',
    theorems: [
      {
        name: 'משפט 2a (ארכימדס)',
        statement: <p>N לא חסומה מלעיל</p>,
        proof: <p><strong>הוכחה בשלילה:</strong> נניח N חסומה מלעיל. קיים <M>S̄=sup(N)</M>. מתכונת ε קיים <M>n₁∈N</M> עם <M>{'n₁>S̄-1'}</M>, אז <M>{'n₁+1>S̄'}</M> וגם <M>n₁+1∈N</M>. סתירה.</p>,
      },
      {
        name: 'משפט 3 (ארכימדס הפוך)',
        statement: <p>לכל <M>{'ε>0'}</M> קיים <M>n∈N</M> כך ש-<M>{'1/n<ε'}</M></p>,
        proof: <p>מארכימדס קיים <M>n∈N</M> עם <M>{'n>1/ε'}</M>, לכן <M>{'1/n<ε'}</M>.</p>,
      },
      {
        name: 'משפט 4 (משפט המקסימום ל-Z)',
        statement: <p><M>A⊆Z</M>, <M>A≠∅</M>, A חסומה מלעיל → קיים <M>max(A)</M></p>,
        proof: <p>קיים <M>S̄=sup(A)</M>. מתכונת ε: קיים <M>a₁∈A</M> עם <M>{'a₁>S̄-1'}</M>. נניח בשלילה <M>{'a>a₁'}</M> עבור <M>a∈A</M>. מהיות <M>a,a₁∈Z</M>: <M>{'a≥a₁+1>S̄'}</M>. סתירה.</p>,
      },
    ],
  },
  // ===== DAY 5 =====
  {
    day: 5,
    title: 'צפיפות Q ו-R\\Q, ערך מוחלט',
    courseWeek: 'שבוע 3',
    lectureRef: 'הרצאה 5',
    theorems: [
      {
        name: 'משפט 1 (Q צפופה ב-R)',
        statement: <p>לכל <M>{'x<y'}</M> קיים <M>q∈Q</M> עם <M>{'x<q<y'}</M></p>,
        proof: <><p>מארכימדס הפוך קיים <M>m∈N</M> עם <M>{'1/m<y-x'}</M>. נגדיר <M>n=⌊mx⌋+1</M>. אז <M>q=n/m</M>.</p><p>(i) <M>{'q>x'}</M> כי <M>{'n>mx'}</M>. (ii) <M>{'q<y'}</M> כי <M>n≤mx+1</M>, אז <M>{'q≤x+1/m<y'}</M>.</p></>,
      },
      {
        name: 'משפט 2 (R\\Q צפופה ב-R)',
        statement: <p>לכל <M>{'x<y'}</M> קיים <M>r∈R\Q</M> עם <M>{'x<r<y'}</M></p>,
        proof: <p>מצפיפות Q קיים <M>q∈Q</M> עם <M>{'x-√2<q<y-√2'}</M>. נגדיר <M>r=q+√2∈R\Q</M>. אז <M>{'x<r<y'}</M>.</p>,
      },
      {
        name: 'משפט 5 (אי-שוויון המשולש)',
        statement: <p><M>|x+y|≤|x|+|y|</M></p>,
        proof: <p>אם <M>x+y≥0</M>: <M>|x+y|=x+y≤|x|+|y|</M>. אם <M>{'x+y<0'}</M>: <M>|x+y|=-(x+y)=(-x)+(-y)≤|-x|+|-y|=|x|+|y|</M>.</p>,
      },
      {
        name: 'אי-שוויון המשולש ההפוך',
        statement: <p><M>||x|-|y|| ≤ |x-y|</M></p>,
        proof: <p><M>|x|=|x-y+y|≤|x-y|+|y|</M>, לכן <M>|x|-|y|≤|x-y|</M>. באופן סימטרי <M>|y|-|x|≤|y-x|=|x-y|</M>.</p>,
      },
    ],
  },
  // ===== DAY 6 =====
  {
    day: 6,
    title: 'יחידות הגבול',
    courseWeek: 'שבוע 4',
    lectureRef: 'הרצאה 8',
    theorems: [
      {
        name: 'משפט 1 (יחידות הגבול)',
        statement: <p><M>L₁,L₂</M> גבולות של <M>f</M> ב-∞ אזי <M>L₁=L₂</M></p>,
        proof: <p><strong>הוכחה בשלילה:</strong> נניח <M>L₁≠L₂</M>. נבחר <M>ε=|L₁-L₂|/2</M>. קיימים <M>M₁,M₂</M>. לכל <M>{'x>max{M₁,M₂}'}</M>: <M>{'|L₁-L₂|=|L₁-f(x)+f(x)-L₂|≤|f(x)-L₁|+|f(x)-L₂|<ε+ε=|L₁-L₂|'}</M>. סתירה.</p>,
      },
    ],
  },
  // ===== DAY 7 =====
  {
    day: 7,
    title: 'אש"ג חיבור וכפל',
    courseWeek: 'שבוע 5',
    lectureRef: 'הרצאה 9',
    theorems: [
      {
        name: 'משפט 3 (אש"ג ±)',
        statement: <p><M>lim(f±g) = L₁±L₂</M></p>,
        proof: <p>לכל <M>{'ε>0'}</M>, קיימים <M>δ₁,δ₂</M> עם <M>{'|f(x)-L₁|<ε/2'}</M> ו-<M>{'|g(x)-L₂|<ε/2'}</M>. עבור <M>{'δ=min{δ₁,δ₂}'}</M>: <M>{'|f(x)±g(x)-(L₁±L₂)|≤|f(x)-L₁|+|g(x)-L₂|<ε'}</M>.</p>,
      },
      {
        name: 'טענת עזר 1 (חסימות מקומית)',
        statement: <p><M>lim f=L</M> → <M>|f(x)|≤1+|L|</M> בסביבה</p>,
        proof: <p>קיים <M>δ</M> עם <M>{'|f(x)-L|<1'}</M>, לכן <M>{'|f(x)|=|f(x)-L+L|≤|f(x)-L|+|L|<1+|L|'}</M>.</p>,
      },
      {
        name: 'משפט 3 (אש"ג כפל)',
        statement: <p><M>lim(f·g) = L₁·L₂</M></p>,
        proof: <p><M>|fg-L₁L₂|=|fg-fL₂+fL₂-L₁L₂|≤|f||g-L₂|+|L₂||f-L₁|</M> <M>{'≤(1+|L₁|)·ε/(2(1+|L₁|))+|L₂|·ε/(2(|L₂|+1))≤ε'}</M>.</p>,
      },
      {
        name: 'טענת עזר 2 (חסימות מלמטה)',
        statement: <p><M>L≠0</M> → <M>|f(x)|≥|L|/2</M> בסביבה</p>,
        proof: <p><M>{'|f(x)|≥|L|-|f(x)-L|>|L|-|L|/2=|L|/2'}</M>.</p>,
      },
    ],
  },
  // ===== DAY 8 =====
  {
    day: 8,
    title: 'דיריכלה, מונוטוניות הגבול, שורש',
    courseWeek: 'שבוע 5',
    lectureRef: 'הרצאה 10',
    theorems: [
      {
        name: 'משפט (דיריכלה)',
        statement: <p><M>lim D(x)</M> לא קיים (D פונקציית דיריכלה)</p>,
        proof: <p><strong>הוכחה בשלילה:</strong> נניח <M>lim D(x)=L</M>. עבור <M>ε=1/2</M>: מצפיפות Q קיים <M>q</M> עם <M>{'|1-L|<1/2'}</M>, ומצפיפות <M>R\Q</M> קיים <M>r</M> עם <M>{'|0-L|<1/2'}</M>. לכן <M>{'L>1/2'}</M> וגם <M>{'L<1/2'}</M>. סתירה.</p>,
      },
      {
        name: 'משפט 2 (מונוטוניות הגבול)',
        statement: <p><M>f(x)≤g(x)</M> → <M>lim f≤lim g</M></p>,
        proof: <p><strong>הוכחה בשלילה:</strong> נניח <M>{'L₁>L₂'}</M>. נגדיר <M>h=f-g≤0</M>. <M>{'lim h=L₁-L₂>0'}</M>. עבור <M>ε=L₁-L₂</M>: <M>{'0≥h(x)>L-L=0'}</M>. סתירה.</p>,
      },
      {
        name: 'משפט 3 (אש"ג שורש)',
        statement: <p><M>lim √f(x) = √L</M></p>,
        proof: <><p><strong>מקרה <M>{'L>0'}</M>:</strong> <M>{'|√f(x)-√L|=|f(x)-L|/(√f(x)+√L)≤|f(x)-L|/√L<ε'}</M>.</p><p><strong>מקרה <M>L=0</M>:</strong> <M>{'√f(x)<√(ε²)=ε'}</M>.</p></>,
      },
    ],
  },
  // ===== DAY 9 =====
  {
    day: 9,
    title: 'סנדוויץ\' וגבולות באינסוף',
    courseWeek: 'שבוע 6',
    lectureRef: 'הרצאות 11-12',
    theorems: [
      {
        name: 'משפט 1 (סנדוויץ\')',
        statement: <p><M>h(x)≤f(x)≤g(x)</M>, <M>lim h=lim g=L</M> → <M>lim f=L</M></p>,
        proof: <p>לכל <M>{'ε>0'}</M> קיימים <M>δ₁,δ₂</M> עם <M>{'g(x)<L+ε'}</M> ו-<M>{'h(x)>L-ε'}</M>. עבור <M>{'δ=min{δ₁,δ₂}'}</M>: <M>{'L-ε<h(x)≤f(x)≤g(x)<L+ε'}</M>.</p>,
      },
      {
        name: 'משפט 3 (חסומה כפול אפס)',
        statement: <p><M>f</M> חסומה, <M>lim g=0</M> → <M>lim(fg)=0</M></p>,
        proof: <p><M>|f(x)|≤K</M>, לכן <M>0≤|f(x)g(x)|≤K|g(x)|→0</M>, מסנדוויץ&apos;.</p>,
      },
      {
        name: 'משפט 4 (גבולות חד-צדדיים)',
        statement: <p><M>lim f(x)</M> קיים ⟺ שני הגבולות החד-צדדיים קיימים ושווים</p>,
        proof: <p>נובע ישירות מהגדרת הגבול.</p>,
      },
      {
        name: 'משפט 3 (1/∞=0) ומשפט 4 (1/0⁺=∞)',
        statement: <><p><M>lim f=∞</M> → <M>lim 1/f=0</M></p><p><M>{'lim f=0, f>0'}</M> → <M>lim 1/f=∞</M></p></>,
        proof: <><p><strong>1/∞=0:</strong> <M>{'f(x)>1/ε'}</M>, לכן <M>{'|1/f(x)|<ε'}</M>.</p><p><strong>1/0⁺=∞:</strong> <M>{'|f(x)|<1/K'}</M>, לכן <M>{'1/f(x)>K'}</M>.</p></>,
      },
    ],
  },
  // ===== DAY 10 =====
  {
    day: 10,
    title: 'הגבול המפורסם והרכבת גבולות',
    courseWeek: 'שבוע 7',
    lectureRef: 'הרצאה 13',
    theorems: [
      {
        name: 'למה 1 (אי-שוויון סינוס)',
        statement: <p>לכל <M>{'0<x<π/2'}</M>: <M>x·cos(x) ≤ sin(x) ≤ x</M></p>,
        proof: <p>מהשוואת שטחים גיאומטרית במעגל היחידה.</p>,
      },
      {
        name: 'משפט 2 (הגבול המפורסם)',
        statement: <p><M>lim(x→0) sin(x)/x = 1</M></p>,
        proof: <p>מלמה 1: <M>cos(x)≤sin(x)/x≤1</M>. כש-<M>x→0</M>: <M>cos(x)→1</M>, וממשפט הסנדוויץ&apos; <M>sin(x)/x→1</M>.</p>,
      },
      {
        name: 'גבול (cos(x)-1)/x²',
        statement: <p><M>lim(x→0) (cos(x)-1)/x² = -1/2</M></p>,
        proof: <p><M>(cos(x)-1)/x² = (cos²x-1)/(x²(cosx+1)) = -sin²x/(x²(cosx+1)) = -(sinx/x)²·1/(cosx+1) → -1·1/2 = -1/2</M>.</p>,
      },
      {
        name: 'משפט 3 (החלפת משתנה / הרכבה)',
        statement: <p><M>lim(x→x₀) f=L</M>, <M>lim(y→L) g=L₁</M> → <M>lim(x→x₀)(g∘f)=L₁</M></p>,
        proof: <p>לכל <M>{'ε>0'}</M>, קיים <M>δ₁</M> עם <M>{'|g(y)-L₁|<ε'}</M> כש-<M>{'0<|y-L|<δ₁'}</M>. קיים <M>δ₂</M> עם <M>{'|f(x)-L|<δ₁'}</M>. עבור <M>δ=δ₂</M>: <M>{'|(g∘f)(x)-L₁|<ε'}</M>.</p>,
      },
    ],
  },
  // ===== DAY 11 =====
  {
    day: 11,
    title: 'גבולות פונקציות מונוטוניות',
    courseWeek: 'שבוע 7',
    lectureRef: 'הרצאה 14',
    theorems: [
      {
        name: 'משפט 1 (גבולות מונוטוניות)',
        statement: <p><M>f</M> עולה ב-<M>[a,b)</M> → <M>lim(x→b⁻)f(x) = sup Im(f)</M></p>,
        proof: <p><strong>Im(f) חסומה:</strong> <M>S̄=sup Im(f)</M>. מתכונת ε קיים <M>x₁</M> עם <M>{'f(x₁)>S̄-ε'}</M>. נבחר <M>δ=b-x₁</M>. לכל <M>{'x₁<x<b'}</M>: <M>{'|f(x)-S̄|=S̄-f(x)≤S̄-f(x₁)<ε'}</M>.</p>,
      },
      {
        name: 'משפט 2 (arctg)',
        statement: <p><M>lim(x→∞)arctg(x)=π/2</M></p>,
        proof: <p>עבור <M>{'ε<π/2'}</M>: <M>M=tg(π/2-ε)</M>. לכל <M>{'x>M'}</M>: <M>{'arctg(x)>arctg(M)=π/2-ε'}</M>.</p>,
      },
      {
        name: 'משפט 3 (אקספוננט)',
        statement: <p><M>{'a>1'}</M> → <M>lim(x→∞)aˣ=∞</M>, <M>lim(x→-∞)aˣ=0</M></p>,
        proof: <p>נובע ממונוטוניות וחוסר חסימות של <M>aˣ</M> עבור <M>{'a>1'}</M>.</p>,
      },
    ],
  },
  // ===== DAY 12 =====
  {
    day: 12,
    title: 'e ורציפות פונקציות אלמנטריות',
    courseWeek: 'שבוע 8',
    lectureRef: 'הרצאות 15-16',
    theorems: [
      {
        name: 'משפט (Euler מוכלל)',
        statement: <p><M>lim(x→∞)(1+r/x)ˣ = eʳ</M></p>,
        proof: <p>הצבה <M>t=x/r</M>: <M>(1+1/t)^(tr) = [(1+1/t)^t]^r → e^r</M>.</p>,
      },
      {
        name: 'משפט (רציפות sin)',
        statement: <p><M>sin(x)</M> רציפה לכל <M>x₀</M></p>,
        proof: <p><M>lim(x→x₀)sin(x) = lim(t→0)sin(t+x₀) = sin(t)cos(x₀)+cos(t)sin(x₀) → 0·cos(x₀)+1·sin(x₀) = sin(x₀)</M>.</p>,
      },
      {
        name: 'משפט (אש"ג רציפות)',
        statement: <p><M>f,g</M> רציפות → <M>f±g, f·g, f/g</M> (<M>g≠0</M>) רציפות</p>,
        proof: <p>נובע מאריתמטיקה של גבולות: הרכבת גבולות עם הערך בנקודה.</p>,
      },
    ],
  },
  // ===== DAY 13 =====
  {
    day: 13,
    title: 'ערך הביניים ונקודת שבת',
    courseWeek: 'שבוע 9',
    lectureRef: 'הרצאה 18',
    theorems: [
      {
        name: 'משפט 4 (ערך הביניים - IVT)',
        statement: <p><M>f</M> רציפה ב-<M>[a,b]</M>, <M>{'f(a)·f(b)<0'}</M> → קיים <M>c∈(a,b)</M> עם <M>f(c)=0</M></p>,
        proof: <>
          <p><strong>מקרה <M>{'f(a)<0<f(b)'}</M>:</strong> נגדיר <M>{'A={x∈[a,b]: f(x)<0}'}</M>. <M>A≠∅</M> (<M>a∈A</M>), חסומה ע&quot;י <M>b</M>. נגדיר <M>c=sup(A)</M>.</p>
          <p>(i) נניח <M>{'f(c)<0'}</M>: <M>f</M> רציפה מימין, קיים <M>{'x₁>c'}</M> עם <M>{'f(x₁)<0'}</M>, לכן <M>x₁∈A</M>. סתירה ל-<M>c=sup(A)</M>.</p>
          <p>(ii) נניח <M>{'f(c)>0'}</M>: <M>f</M> רציפה משמאל, קיים <M>δ₂</M> עם <M>{'f(x)>0'}</M> לכל <M>x∈(c-δ₂,c]</M>. אבל קיים <M>x₂∈A</M> עם <M>{'x₂>c-δ₂'}</M>, לכן <M>{'f(x₂)>0'}</M>. סתירה ל-<M>x₂∈A</M>.</p>
          <p>לכן <M>f(c)=0</M>.</p>
        </>,
      },
      {
        name: 'משפט 1 (IVT מורחב)',
        statement: <p><M>f</M> רציפה ב-<M>[a,b]</M>, <M>r</M> בין <M>f(a)</M> ל-<M>f(b)</M> → קיים <M>c</M> עם <M>f(c)=r</M></p>,
        proof: <p><M>g(x)=f(x)-r</M> מחליפה סימן, מ-IVT קיים <M>c</M> עם <M>g(c)=0</M>, כלומר <M>f(c)=r</M>.</p>,
      },
      {
        name: 'משפט 2 (נקודת שבת)',
        statement: <p><M>f</M> רציפה ב-<M>[a,b]</M>, <M>Im(f)⊆[a,b]</M> → קיים <M>c</M> עם <M>f(c)=c</M></p>,
        proof: <p><M>g(x)=f(x)-x</M>. <M>g(a)=f(a)-a≥0</M>, <M>g(b)=f(b)-b≤0</M>. מ-IVT קיים <M>c</M> עם <M>g(c)=0</M>.</p>,
      },
    ],
  },
  // ===== DAY 14 =====
  {
    day: 14,
    title: 'כלל השרשרת ונגזרת פונקציה הפוכה',
    courseWeek: 'שבועות 10-12',
    lectureRef: 'הרצאות 19-20',
    theorems: [
      {
        name: 'משפט (כלל השרשרת)',
        statement: <p><M>(g∘f)&apos;(x₀) = g&apos;(f(x₀))·f&apos;(x₀)</M></p>,
        proof: <p>מהגדרת הנגזרת וממשפט ההרכבה של גבולות.</p>,
      },
      {
        name: 'משפט (נגזרת פונקציה הפוכה)',
        statement: <p><M>(f⁻¹)&apos;(y₀) = 1/f&apos;(x₀)</M> כאשר <M>y₀=f(x₀)</M></p>,
        proof: <p>מכלל השרשרת על <M>f⁻¹(f(x))=x</M>: <M>(f⁻¹)&apos;(f(x₀))·f&apos;(x₀)=1</M>.</p>,
      },
    ],
  },
  // ===== DAY 15 =====
  {
    day: 15,
    title: 'פרמה, רול ולגראנז\'',
    courseWeek: 'שבועות 10-12',
    lectureRef: 'הרצאה 21',
    theorems: [
      {
        name: 'משפט פרמה',
        statement: <p><M>f</M> מקבלת קיצון מקומי ב-<M>c</M>, <M>f</M> גזירה ב-<M>c</M> → <M>f&apos;(c)=0</M></p>,
        proof: <>
          <p><strong>נניח <M>c</M> מקסימום מקומי:</strong> קיים <M>{'δ>0'}</M> כך שלכל <M>x∈(c-δ,c+δ)</M>: <M>f(x)≤f(c)</M>.</p>
          <p><strong>מימין:</strong> <M>{'x>c'}</M> ⟹ <M>(f(x)-f(c))/(x-c) ≤ 0</M> ⟹ <M>f&apos;(c) ≤ 0</M>.</p>
          <p><strong>משמאל:</strong> <M>{'x<c'}</M> ⟹ <M>(f(x)-f(c))/(x-c) ≥ 0</M> ⟹ <M>f&apos;(c) ≥ 0</M>.</p>
          <p>לכן <M>f&apos;(c)=0</M>.</p>
        </>,
      },
      {
        name: 'משפט רול',
        statement: <p><M>f</M> רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M>, <M>f(a)=f(b)</M> → קיים <M>c∈(a,b)</M> עם <M>f&apos;(c)=0</M></p>,
        proof: <>
          <p>מויירשטראס <M>f</M> מקבלת מקס ומינימום.</p>
          <p><strong>מקרה 1:</strong> שניהם בקצוות → <M>f</M> קבועה (<M>f(a)=f(b)</M>) ו-<M>f&apos;=0</M> בכל נקודה.</p>
          <p><strong>מקרה 2:</strong> יש קיצון פנימי <M>c∈(a,b)</M> → מפרמה <M>f&apos;(c)=0</M>.</p>
        </>,
      },
      {
        name: 'משפט לגראנז\' (MVT)',
        statement: <p><M>f</M> רציפה ב-<M>[a,b]</M>, גזירה ב-<M>(a,b)</M> → קיים <M>c∈(a,b)</M> עם <M>f&apos;(c)=(f(b)-f(a))/(b-a)</M></p>,
        proof: <>
          <p>נגדיר <M>g(x)=f(x)-[(f(b)-f(a))/(b-a)]·(x-a)-f(a)</M>.</p>
          <p>אז <M>g(a)=g(b)=0</M>, <M>g</M> רציפה וגזירה.</p>
          <p>מרול קיים <M>c</M> עם <M>g&apos;(c)=0</M>, כלומר <M>f&apos;(c)=(f(b)-f(a))/(b-a)</M>.</p>
        </>,
      },
    ],
  },
  // ===== DAY 16 =====
  {
    day: 16,
    title: 'קושי ולופיטל',
    courseWeek: 'שבועות 10-12',
    lectureRef: 'הרצאה 23',
    theorems: [
      {
        name: 'משפט קושי (MVT מוכלל)',
        statement: <p><M>f,g</M> רציפות ב-<M>[a,b]</M>, גזירות ב-<M>(a,b)</M>, <M>g&apos;≠0</M> → קיים <M>c</M> עם <M>f&apos;(c)/g&apos;(c)=(f(b)-f(a))/(g(b)-g(a))</M></p>,
        proof: <>
          <p>נגדיר <M>h(x)=f(x)-[(f(b)-f(a))/(g(b)-g(a))]·g(x)</M>.</p>
          <p><M>h(a)=h(b)</M>, מרול קיים <M>c</M> עם <M>h&apos;(c)=0</M>.</p>
          <p>כלומר <M>f&apos;(c)=[(f(b)-f(a))/(g(b)-g(a))]·g&apos;(c)</M>.</p>
        </>,
      },
      {
        name: 'משפט לופיטל (0/0)',
        statement: <p><M>lim f/g</M> בצורת 0/0, <M>lim f&apos;/g&apos; = L</M> → <M>lim f/g = L</M></p>,
        proof: <p>משפט קושי על הקטע <M>[x₀,x]</M>: <M>f(x)/g(x) = f&apos;(c)/g&apos;(c)</M> לאיזה <M>c</M>. כש-<M>x→x₀</M>, גם <M>c→x₀</M>, לכן <M>f&apos;(c)/g&apos;(c)→L</M>.</p>,
      },
    ],
  },
];

const WEEK_GROUPS = [
  { label: 'ימים 1-5: בסיס — מספרים, סופרמום, צפיפות', days: [1, 2, 3, 4, 5], color: 'blue' as const },
  { label: 'ימים 6-9: גבולות — הגדרות, אריתמטיקה, סנדוויץ\'', days: [6, 7, 8, 9], color: 'purple' as const },
  { label: 'ימים 10-13: רציפות — טריגו, IVT, ויירשטראס', days: [10, 11, 12, 13], color: 'teal' as const },
  { label: 'ימים 14-16: נגזרות — רול, לגראנז\', לופיטל', days: [14, 15, 16], color: 'rose' as const },
];

const GROUP_COLORS = {
  blue: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
  purple: { bg: 'bg-purple-600', light: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
  teal: { bg: 'bg-teal-600', light: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-800' },
  rose: { bg: 'bg-rose-600', light: 'bg-rose-50', border: 'border-rose-400', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-800' },
};

const STORAGE_KEY = 'theorems-study-progress';

export default function TheoremsStudyPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [openProofs, setOpenProofs] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<number, boolean>>({});

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch { /* ignore */ }
  }, [completed]);

  const toggleCompleted = (key: string) => {
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleProof = (key: string) => {
    setOpenProofs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDay = (day: number) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const totalTheorems = STUDY_DAYS.reduce((sum, d) => sum + d.theorems.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / totalTheorems) * 100);

  const expandAll = () => {
    const allDays: Record<number, boolean> = {};
    const allProofs: Record<string, boolean> = {};
    STUDY_DAYS.forEach(d => {
      allDays[d.day] = true;
      d.theorems.forEach((_, ti) => {
        allProofs[`${d.day}-${ti}`] = true;
      });
    });
    setOpenDays(allDays);
    setOpenProofs(allProofs);
  };

  const collapseAll = () => {
    setOpenDays({});
    setOpenProofs({});
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 10pt; }
          * { box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          @page { margin: 1.2cm; }
          details { display: block !important; }
          details[open] summary ~ * { display: block !important; }
        }
      `}</style>

      <div dir="rtl" className="print-page max-w-4xl mx-auto p-6 bg-white text-black">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">תוכנית לימוד משפטים והוכחות</h1>
          <p className="text-gray-500 mt-1 text-sm">16 ימים · ~{totalTheorems} משפטים עם הוכחות · מההרצאות והתרגולים</p>
        </div>

        {/* Controls */}
        <div className="no-print flex flex-wrap gap-3 mb-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              פתח הכל
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              סגור הכל
            </button>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
            >
              הדפס
            </button>
          </div>
          <button
            onClick={() => { setCompleted({}); localStorage.removeItem(STORAGE_KEY); }}
            className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            אפס התקדמות
          </button>
        </div>

        {/* Progress Bar */}
        <div className="no-print mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>התקדמות: {completedCount}/{totalTheorems} משפטים</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-l from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Week Groups */}
        {WEEK_GROUPS.map(group => {
          const colors = GROUP_COLORS[group.color];
          const groupDays = STUDY_DAYS.filter(d => group.days.includes(d.day));
          const groupTotal = groupDays.reduce((s, d) => s + d.theorems.length, 0);
          const groupDone = groupDays.reduce((s, d) => s + d.theorems.filter((_, ti) => completed[`${d.day}-${ti}`]).length, 0);

          return (
            <div key={group.label} className="mb-8">
              {/* Group Header */}
              <div className={`${colors.bg} text-white px-4 py-3 rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base">{group.label}</h2>
                  <span className="text-white/80 text-xs">{groupDone}/{groupTotal} הושלמו</span>
                </div>
              </div>

              <div className={`border-2 border-t-0 ${colors.border} rounded-b-lg divide-y divide-gray-100`}>
                {groupDays.map(dayData => {
                  const dayOpen = openDays[dayData.day] ?? false;
                  const dayDone = dayData.theorems.filter((_, ti) => completed[`${dayData.day}-${ti}`]).length;
                  const dayTotal = dayData.theorems.length;

                  return (
                    <div key={dayData.day}>
                      {/* Day Header (clickable) */}
                      <button
                        onClick={() => toggleDay(dayData.day)}
                        className={`w-full text-right px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                          dayDone === dayTotal && dayTotal > 0 ? 'bg-green-50/50' : ''
                        }`}
                      >
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.bg} text-white flex items-center justify-center text-sm font-bold`}>
                          {dayData.day}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm">{dayData.title}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${colors.badge} font-medium`}>{dayData.courseWeek}</span>
                            <span className="text-xs text-gray-400">{dayData.lectureRef}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 max-w-[120px] bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`${colors.bg} h-1.5 rounded-full transition-all duration-300`}
                                style={{ width: `${dayTotal > 0 ? (dayDone / dayTotal) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{dayDone}/{dayTotal}</span>
                          </div>
                        </div>
                        <span className={`text-gray-400 transition-transform ${dayOpen ? 'rotate-180' : ''}`}>
                          &#9660;
                        </span>
                      </button>

                      {/* Day Content (expandable) */}
                      {dayOpen && (
                        <div className="px-4 pb-4 space-y-3">
                          {dayData.theorems.map((theorem, ti) => {
                            const key = `${dayData.day}-${ti}`;
                            const isCompleted = completed[key];
                            const proofOpen = openProofs[key] ?? false;

                            return (
                              <div
                                key={key}
                                className={`rounded-lg border-2 transition-colors print:break-inside-avoid ${
                                  isCompleted
                                    ? 'border-green-300 bg-green-50/50'
                                    : `${colors.border} ${colors.light}`
                                }`}
                              >
                                {/* Theorem Header */}
                                <div className="px-4 py-3">
                                  <div className="flex items-start gap-3">
                                    {/* Checkbox */}
                                    <button
                                      onClick={() => toggleCompleted(key)}
                                      className={`no-print flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                                        isCompleted
                                          ? 'bg-green-500 border-green-500 text-white'
                                          : 'border-gray-300 hover:border-gray-400'
                                      }`}
                                    >
                                      {isCompleted && '✓'}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                      <div className={`font-bold text-sm ${isCompleted ? 'line-through text-gray-400' : colors.text}`}>
                                        {theorem.name}
                                      </div>
                                      <div className={`text-sm mt-1 ${isCompleted ? 'text-gray-400' : ''}`}>
                                        {theorem.statement}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Proof Toggle */}
                                  <button
                                    onClick={() => toggleProof(key)}
                                    className="mt-2 mr-9 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                  >
                                    {proofOpen ? '▲ הסתר הוכחה' : '▼ הצג הוכחה'}
                                  </button>
                                </div>

                                {/* Proof Content */}
                                {proofOpen && (
                                  <div className="mx-4 mb-3 mr-13 bg-white border border-gray-200 rounded-lg p-3 text-sm space-y-2 print:break-inside-avoid">
                                    <div className="font-bold text-gray-700 text-xs border-b border-gray-200 pb-1 mb-2">
                                      הוכחה:
                                    </div>
                                    {theorem.proof}
                                    <div className="text-left font-bold text-gray-400 text-lg">&#8718;</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Summary */}
        <div className="mt-8 bg-gray-50 border-2 border-gray-200 rounded-lg p-5 print:break-inside-avoid">
          <h3 className="font-bold text-lg mb-3">סיכום כמותי</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {WEEK_GROUPS.map(group => {
              const groupDays = STUDY_DAYS.filter(d => group.days.includes(d.day));
              const count = groupDays.reduce((s, d) => s + d.theorems.length, 0);
              const colors = GROUP_COLORS[group.color];
              return (
                <div key={group.color} className={`${colors.light} rounded-lg p-3 text-center`}>
                  <div className={`text-2xl font-bold ${colors.text}`}>{count}</div>
                  <div className={`text-xs ${colors.text}`}>ימים {group.days[0]}-{group.days[group.days.length - 1]}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <strong>שרשרת ההוכחות:</strong> ויירשטראס → פרמה → רול → לגראנז&apos; → קושי → לופיטל
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          <p>תוכנית לימוד משפטים והוכחות — אינפי 1 · כל המשפטים מההרצאות והתרגולים</p>
        </div>
      </div>
    </>
  );
}
