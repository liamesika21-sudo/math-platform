// Comprehensive practice exercises organized by topic and exam probability
// Each topic includes: key content summary + practice problems with solutions

export interface PracticeExercise {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'definition' | 'proof' | 'calculation' | 'counterexample';
  question: string;
  hint?: string;
  solution: string;
  source?: string; // e.g., "מועד א 2026 שאלה 1", "תרגיל בית 12"
}

export interface TopicKeyItem {
  label: string; // 'הגדרה' | 'משפט' | 'טכניקה' | 'נוסחה'
  title: string;
  content: string;
}

export interface ExamTopic {
  id: string;
  nameHe: string;
  likelihood: number; // 0-100 for Moed B
  wasInMoedA: boolean;
  color: string; // tailwind color prefix
  icon: string; // emoji
  whyImportant: string;
  keyItems: TopicKeyItem[];
  exercises: PracticeExercise[];
  examTips: string[];
}

export const examTopics: ExamTopic[] = [
  // ===== 1. SERIES - 95% =====
  {
    id: 'series',
    nameHe: 'טורים ומבחני התכנסות',
    likelihood: 95,
    wasInMoedA: false,
    color: 'red',
    icon: '🔴',
    whyImportant: 'לא הופיע כלל במועד א\'! שכיחות 80% במבחנים. כמעט בוודאות יופיע במועד ב\'.',
    keyItems: [
      { label: 'הגדרה', title: 'התכנסות טור', content: 'Σaₙ מתכנס אם סדרת הסכומים החלקיים Sₙ = Σₖ₌₁ⁿ aₖ מתכנסת' },
      { label: 'הגדרה', title: 'התכנסות מוחלטת', content: 'Σ|aₙ| מתכנס. התכנסות מוחלטת → התכנסות (ההפך לא נכון!)' },
      { label: 'הגדרה', title: 'התכנסות בתנאי', content: 'Σaₙ מתכנס אבל Σ|aₙ| מתבדר. דוגמה: Σ(-1)ⁿ/n' },
      { label: 'משפט', title: 'תנאי הכרחי', content: 'Σaₙ מתכנס → aₙ→0. ההפך לא נכון! (דוגמה: Σ1/n מתבדר למרות ש-1/n→0)' },
      { label: 'משפט', title: 'מבחן דלמבר (המנה)', content: 'L = lim|aₙ₊₁/aₙ|. אם L<1 → מתכנס מוחלט. L>1 → מתבדר. L=1 → לא מכריע.\nטוב ל: עצרות, חזקות של n.' },
      { label: 'משפט', title: 'מבחן קושי (השורש)', content: 'L = lim|aₙ|^(1/n). אם L<1 → מתכנס. L>1 → מתבדר. L=1 → לא מכריע.\nטוב ל: ביטויים עם (...)ⁿ.' },
      { label: 'משפט', title: 'מבחן ההשוואה', content: '0 ≤ aₙ ≤ bₙ לכל n. אם Σbₙ מתכנס → Σaₙ מתכנס. אם Σaₙ מתבדר → Σbₙ מתבדר.' },
      { label: 'משפט', title: 'מבחן ההשוואה הגבולי', content: 'lim(aₙ/bₙ) = L כאשר 0<L<∞ → שניהם מתכנסים או שניהם מתבדרים.' },
      { label: 'משפט', title: 'מבחן לייבניץ', content: 'אם aₙ↓0 מונוטונית → Σ(-1)ⁿaₙ מתכנס (בתנאי).' },
      { label: 'נוסחה', title: 'טור p', content: 'Σ 1/nᵖ: מתכנס ⟺ p > 1. דוגמאות: Σ1/n מתבדר, Σ1/n² מתכנס.' },
      { label: 'נוסחה', title: 'רדיוס התכנסות', content: 'טור חזקות Σaₙxⁿ: R = 1/lim sup|aₙ|^(1/n) או R = lim|aₙ/aₙ₊₁|.\n|x|<R → מתכנס מוחלט. |x|>R → מתבדר. |x|=R → בדוק בנפרד!' },
    ],
    exercises: [
      {
        id: 's1',
        title: 'מבחן דלמבר - עצרות',
        difficulty: 'medium',
        type: 'calculation',
        question: 'בדוק התכנסות: Σ n!/nⁿ',
        hint: 'חשב lim (n+1)!/(n+1)ⁿ⁺¹ · nⁿ/n!',
        solution: 'L = lim aₙ₊₁/aₙ = lim (n+1)!/(n+1)ⁿ⁺¹ · nⁿ/n! = lim nⁿ/(n+1)ⁿ = lim (n/(n+1))ⁿ = lim 1/(1+1/n)ⁿ = 1/e < 1.\nלכן הטור מתכנס.',
        source: 'תרגיל בית 12',
      },
      {
        id: 's2',
        title: 'מבחן קושי - חזקות',
        difficulty: 'medium',
        type: 'calculation',
        question: 'בדוק התכנסות: Σ (n/(2n+1))ⁿ',
        hint: 'חשב lim |aₙ|^(1/n)',
        solution: 'L = lim (n/(2n+1))^(n·1/n) = lim n/(2n+1) = 1/2 < 1.\nלכן הטור מתכנס לפי מבחן קושי.',
        source: 'תרגיל בית 12',
      },
      {
        id: 's3',
        title: 'השוואה גבולית',
        difficulty: 'medium',
        type: 'calculation',
        question: 'בדוק התכנסות: Σ 1/(n²+3n+1)',
        hint: 'השווה ל-Σ1/n²',
        solution: 'lim [1/(n²+3n+1)] / [1/n²] = lim n²/(n²+3n+1) = 1 > 0.\nכיוון ש-Σ1/n² מתכנס (טור p עם p=2>1), גם Σ1/(n²+3n+1) מתכנס.',
        source: 'תרגיל בית 12',
      },
      {
        id: 's4',
        title: 'לייבניץ - התכנסות בתנאי',
        difficulty: 'medium',
        type: 'calculation',
        question: 'בדוק האם Σ (-1)ⁿ/√n מתכנס. מוחלט או בתנאי?',
        solution: 'aₙ = 1/√n: מונוטונית יורדת ושואפת ל-0 → לפי לייבניץ הטור מתכנס.\nהתכנסות מוחלטת: Σ1/√n = Σ1/n^(1/2) מתבדר (p=1/2<1).\nלכן: מתכנס בתנאי.',
      },
      {
        id: 's5',
        title: 'רדיוס התכנסות',
        difficulty: 'hard',
        type: 'calculation',
        question: 'מצא רדיוס התכנסות ובדוק קצוות: Σ xⁿ/n',
        hint: 'R = lim|aₙ/aₙ₊₁|, ואז בדוק x=1 ו-x=-1 בנפרד',
        solution: 'R = lim (1/n)/(1/(n+1)) = lim (n+1)/n = 1.\nקצה x=1: Σ1/n = טור הרמוני → מתבדר.\nקצה x=-1: Σ(-1)ⁿ/n → מתכנס לפי לייבניץ.\nתחום התכנסות: [-1, 1).',
        source: 'תרגיל בית 12',
      },
      {
        id: 's6',
        title: 'הוכחת התבדרות',
        difficulty: 'easy',
        type: 'proof',
        question: 'הוכח שהטור Σ n/(n+1) מתבדר.',
        solution: 'aₙ = n/(n+1) → 1 ≠ 0. לפי התנאי ההכרחי (aₙ→0), הטור מתבדר.',
      },
    ],
    examTips: [
      'שאלה על טורים כמעט בטוח תופיע — תרגלו את כל המבחנים!',
      'דלמבר טוב לעצרות, קושי לחזקות, השוואה ל-1/nᵖ',
      'אל תשכחו: aₙ→0 הוא תנאי הכרחי בלבד!',
      'בטור חזקות: תמיד בדקו את הקצוות בנפרד',
      'הכי שכיח במבחן: "בדוק התכנסות" + "מצא רדיוס התכנסות"',
    ],
  },

  // ===== 2. TAYLOR - 80% =====
  {
    id: 'taylor',
    nameHe: 'טיילור ופיתוח מקלורן',
    likelihood: 80,
    wasInMoedA: true,
    color: 'orange',
    icon: '🟠',
    whyImportant: 'הופיע חלקית במועד א\' (אי-שוויון עם cos). צפוי שיופיע שאלת טיילור מלאה עם פיתוח ושארית.',
    keyItems: [
      { label: 'הגדרה', title: 'פולינום טיילור', content: 'Pₙ(x) = Σₖ₌₀ⁿ f⁽ᵏ⁾(a)/k! · (x-a)ᵏ\nמקלורן = טיילור סביב a=0.' },
      { label: 'משפט', title: 'שארית לגראנז\'', content: 'Rₙ(x) = f⁽ⁿ⁺¹⁾(c)/(n+1)! · (x-a)ⁿ⁺¹ כאשר c בין a ל-x.\nf(x) = Pₙ(x) + Rₙ(x)' },
      { label: 'נוסחה', title: 'פיתוח eˣ', content: 'eˣ = 1 + x + x²/2! + x³/3! + ... = Σ xⁿ/n!  (לכל x)' },
      { label: 'נוסחה', title: 'פיתוח sin x', content: 'sin x = x - x³/3! + x⁵/5! - ... = Σ (-1)ⁿ x²ⁿ⁺¹/(2n+1)!' },
      { label: 'נוסחה', title: 'פיתוח cos x', content: 'cos x = 1 - x²/2! + x⁴/4! - ... = Σ (-1)ⁿ x²ⁿ/(2n)!' },
      { label: 'נוסחה', title: 'פיתוח ln(1+x)', content: 'ln(1+x) = x - x²/2 + x³/3 - ... = Σ (-1)ⁿ⁺¹ xⁿ/n  (|x|≤1, x≠-1)' },
      { label: 'נוסחה', title: 'פיתוח 1/(1-x)', content: '1/(1-x) = 1 + x + x² + x³ + ... = Σ xⁿ  (|x|<1)' },
      { label: 'נוסחה', title: 'פיתוח arctan x', content: 'arctan x = x - x³/3 + x⁵/5 - ... = Σ (-1)ⁿ x²ⁿ⁺¹/(2n+1)  (|x|≤1)' },
      { label: 'טכניקה', title: 'חישוב גבול עם טיילור', content: '1. זהה נקודה (בד"כ x→0)\n2. פתח כל פונקציה לטיילור עד הסדר הנדרש\n3. פשט (צמצם מונים)\n4. רשום תשובה' },
    ],
    exercises: [
      {
        id: 't1',
        title: 'חישוב גבול עם טיילור',
        difficulty: 'medium',
        type: 'calculation',
        question: 'חשב: lim(x→0) (eˣ - 1 - x) / x²',
        hint: 'פתח eˣ עד סדר 2',
        solution: 'eˣ = 1 + x + x²/2 + O(x³)\neˣ - 1 - x = x²/2 + O(x³)\n(eˣ - 1 - x)/x² = 1/2 + O(x) → 1/2',
        source: 'תרגיל בית 9',
      },
      {
        id: 't2',
        title: 'גבול עם sin ו-cos',
        difficulty: 'hard',
        type: 'calculation',
        question: 'חשב: lim(x→0) (sin x - x·cos x) / x³',
        hint: 'פתח sin ו-cos עד סדר 3',
        solution: 'sin x = x - x³/6 + O(x⁵)\ncos x = 1 - x²/2 + O(x⁴)\nx·cos x = x - x³/2 + O(x⁵)\nsin x - x·cos x = (x - x³/6) - (x - x³/2) = x³/3 + O(x⁵)\n(sin x - x·cos x)/x³ → 1/3',
      },
      {
        id: 't3',
        title: 'שארית לגראנז\'',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח: |sin x - x + x³/6| ≤ |x|⁵/120 לכל x.',
        hint: 'השתמש בשארית לגראנז\' סדר 4 של sin',
        solution: 'P₃(x) = x - x³/6 (פולינום מקלורן של sin מסדר 3)\nR₃(x) = sin⁽⁴⁾(c)/4! · x⁴ = (±sin c)/24 · x⁴\nאבל sin x = P₃(x) + R₄(x) כאשר:\nR₄(x) = cos(c)/5! · x⁵, |cos(c)| ≤ 1\nלכן |sin x - x + x³/6| = |R₄(x)| ≤ |x|⁵/120.',
        source: 'תרגיל בית 9',
      },
      {
        id: 't4',
        title: 'פיתוח סביב נקודה',
        difficulty: 'medium',
        type: 'calculation',
        question: 'מצא פיתוח טיילור של f(x) = √x סביב a=4 עד סדר 2.',
        solution: 'f(x) = √x, f(4) = 2\nf\'(x) = 1/(2√x), f\'(4) = 1/4\nf\'\'(x) = -1/(4x^(3/2)), f\'\'(4) = -1/32\nP₂(x) = 2 + (1/4)(x-4) + (-1/32)/2! · (x-4)²\n= 2 + (x-4)/4 - (x-4)²/64',
      },
      {
        id: 't5',
        title: 'הוכחת אי-שוויון (כמו במועד א\')',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח: cos(x) ≥ 1 - x²/2 לכל x≥0.',
        hint: 'הגדר f(x) = cos(x) - 1 + x²/2, הראה f(x)≥0 ע"י ניתוח נגזרות',
        solution: 'f(x) = cos(x) - 1 + x²/2\nf\'(x) = -sin(x) + x\nf\'\'(x) = -cos(x) + 1 ≥ 0 (כי cos(x) ≤ 1)\n→ f\' עולה, f\'(0) = 0 → f\'(x) ≥ 0 לכל x≥0\n→ f עולה, f(0) = 0 → f(x) ≥ 0 לכל x≥0.',
        source: 'מועד א\' 2026 שאלה 5.1',
      },
    ],
    examTips: [
      'שננו את 6 הפיתוחים הידועים — הם מופיעים כמעט תמיד!',
      'שאלת גבול עם טיילור: פתחו עד הסדר שמבטל את ה-0 במונה ובמכנה',
      'אי-שוויון עם טיילור: השתמשו בשארית לגראנז\' להערכה',
      'זכרו: פיתוח sin מכיל רק חזקות אי-זוגיות, cos רק זוגיות',
    ],
  },

  // ===== 3. SEQUENCES - 70% =====
  {
    id: 'sequences',
    nameHe: 'סדרות',
    likelihood: 70,
    wasInMoedA: false,
    color: 'orange',
    icon: '🟡',
    whyImportant: 'לא הופיע במועד א\'! שכיחות 65% במבחנים. סדרות רקורסיביות = שאלה קלאסית.',
    keyItems: [
      { label: 'הגדרה', title: 'התכנסות סדרה', content: 'aₙ → L אם לכל ε>0 קיים N∈ℕ כך שלכל n>N: |aₙ-L| < ε' },
      { label: 'משפט', title: 'סדרה מונוטונית וחסומה', content: 'סדרה מונוטונית עולה וחסומה מלעיל → מתכנסת.\nסדרה מונוטונית יורדת וחסומה מלרע → מתכנסת.' },
      { label: 'משפט', title: 'בולצאנו-ויירשטראס', content: 'כל סדרה חסומה מכילה תת-סדרה מתכנסת.' },
      { label: 'משפט', title: 'משפט הסנדוויץ\'', content: 'aₙ ≤ bₙ ≤ cₙ ו-lim aₙ = lim cₙ = L → lim bₙ = L' },
      { label: 'משפט', title: 'קריטריון קושי', content: 'סדרה מתכנסת ⟺ לכל ε>0 קיים N כך שלכל m,n>N: |aₘ-aₙ| < ε' },
      { label: 'טכניקה', title: 'סדרה רקורסיבית', content: '1. הנח גבול L קיים → פתור L = f(L)\n2. הוכח מונוטוניות (אינדוקציה)\n3. הוכח חסימות (אינדוקציה)\n4. מסקנה: מתכנסת → L' },
    ],
    exercises: [
      {
        id: 'seq1',
        title: 'סדרה רקורסיבית — קלאסי!',
        difficulty: 'hard',
        type: 'proof',
        question: 'תהי a₁ = 1, aₙ₊₁ = √(2 + aₙ). הוכח שהסדרה מתכנסת ומצא את גבולה.',
        hint: 'הראה שהסדרה עולה וחסומה ע"י 2, ואז פתור L = √(2+L)',
        solution: 'מונוטוניות (אינדוקציה): a₁=1, a₂=√3>1=a₁. הנחה: aₙ₊₁>aₙ.\naₙ₊₂ = √(2+aₙ₊₁) > √(2+aₙ) = aₙ₊₁. ✓\n\nחסימות (אינדוקציה): a₁=1<2. הנחה: aₙ<2.\naₙ₊₁ = √(2+aₙ) < √(2+2) = 2. ✓\n\nהסדרה עולה וחסומה → מתכנסת.\nגבול: L = √(2+L) → L² = 2+L → L²-L-2=0 → (L-2)(L+1)=0.\nL=2 (L=-1 לא אפשרי כי aₙ>0).',
        source: 'תרגיל בית 3',
      },
      {
        id: 'seq2',
        title: 'הוכחת התכנסות מהגדרה',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח מהגדרה: lim (3n+1)/(n+2) = 3',
        hint: 'צריך למצוא N כפונקציה של ε',
        solution: '|aₙ - 3| = |(3n+1)/(n+2) - 3| = |(3n+1-3n-6)/(n+2)| = 5/(n+2).\nנדרש: 5/(n+2) < ε → n > 5/ε - 2.\nבחר N = ⌈5/ε - 2⌉. לכל n>N: |aₙ-3| = 5/(n+2) < ε. ✓',
        source: 'תרגיל בית 2',
      },
      {
        id: 'seq3',
        title: 'סנדוויץ\'',
        difficulty: 'medium',
        type: 'calculation',
        question: 'חשב: lim sin(n)/n',
        solution: '-1/n ≤ sin(n)/n ≤ 1/n.\nlim(-1/n) = 0 = lim(1/n).\nלפי הסנדוויץ\': lim sin(n)/n = 0.',
      },
      {
        id: 'seq4',
        title: 'בולצאנו-ויירשטראס',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח: אם aₙ חסומה ולכל תת-סדרה מתכנסת שלה הגבול הוא L, אז aₙ→L.',
        hint: 'הוכחה בשלילה: הנח aₙ לא שואפת ל-L, בנה תת-סדרה שמתכנסת למשהו אחר',
        solution: 'בשלילה: aₙ לא שואפת ל-L → קיים ε₀>0 ואינסוף אינדקסים nₖ כך ש-|aₙₖ-L|≥ε₀.\nהתת-סדרה aₙₖ חסומה (כי aₙ חסומה) → לפי ב"ו יש תת-תת-סדרה מתכנסת ל-L\' כלשהו.\nמ-|aₙₖ-L|≥ε₀ → |L\'-L|≥ε₀ → L\'≠L.\nאבל זו תת-סדרה של aₙ שמתכנסת ל-L\'≠L — סתירה להנחה.',
        source: 'תרגיל בית 3',
      },
    ],
    examTips: [
      'סדרה רקורסיבית = השאלה הכי קלאסית על סדרות במבחן!',
      'תמיד: מונוטוניות + חסימות באינדוקציה, ואז פתרון L=f(L)',
      'הוכחת ε-N: מצא N כפונקציה של ε, הראה שזה עובד',
      'בולצאנו-ויירשטראס: שימושי בשאלות הוכחה על קיום תת-סדרות',
    ],
  },

  // ===== 4. UNIFORM CONTINUITY - 65% =====
  {
    id: 'uniform-continuity',
    nameHe: 'רציפות במידה שווה',
    likelihood: 65,
    wasInMoedA: false,
    color: 'yellow',
    icon: '🟡',
    whyImportant: 'רציפות רגילה הופיעה (IVT) אבל רב"ש לא נבדקה. צפוי כשאלת הגדרה + הוכחה.',
    keyItems: [
      { label: 'הגדרה', title: 'רציפות במידה שווה (רב"ש)', content: 'f רב"ש ב-I אם לכל ε>0 קיים δ>0 כך שלכל x,y∈I:\n|x-y| < δ → |f(x)-f(y)| < ε\n(δ תלוי רק ב-ε, לא בנקודה!)' },
      { label: 'הגדרה', title: 'ההבדל מרציפות רגילה', content: 'רציפות: לכל x₀, לכל ε, קיים δ(ε,x₀)\nרב"ש: לכל ε, קיים δ(ε) — δ אחיד לכל הנקודות!' },
      { label: 'הגדרה', title: 'ליפשיץ', content: '|f(x)-f(y)| ≤ L·|x-y| לכל x,y. (L = קבוע ליפשיץ)\nליפשיץ → רב"ש (בחר δ=ε/L)' },
      { label: 'משפט', title: 'משפט קנטור', content: 'f רציפה בקטע סגור וחסום [a,b] → f רב"ש ב-[a,b].\nהמשפט הכי חשוב! זוכרים: סגור+חסום+רציפה = רב"ש.' },
      { label: 'טכניקה', title: 'שלילת רב"ש', content: 'מצא סדרות xₙ, yₙ כך ש:\n|xₙ-yₙ| → 0 אבל |f(xₙ)-f(yₙ)| ≥ ε₀ > 0\nדוגמה קלאסית: x² על (0,∞), sin(1/x) על (0,1)' },
    ],
    exercises: [
      {
        id: 'uc1',
        title: 'הוכחת רב"ש מהגדרה',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח ש-f(x) = √x רב"ש ב-[0,∞).',
        hint: 'השתמש ב: |√x-√y| = |x-y|/(√x+√y) ≤ |x-y|/√|x-y| = √|x-y|',
        solution: 'לכל ε>0, בחר δ=ε².\nאם |x-y|<δ:\n|√x-√y| = |x-y|/(√x+√y) ≤ √|x-y| < √δ = ε. ✓\n(השתמשנו ב: |√x-√y|·(√x+√y) = |x-y| ו-(√x+√y) ≥ √|x-y|)',
        source: 'תרגיל בית 6',
      },
      {
        id: 'uc2',
        title: 'שלילת רב"ש — קלאסי!',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח ש-f(x) = x² אינה רב"ש ב-ℝ.',
        hint: 'בחר xₙ = n, yₙ = n + 1/n',
        solution: 'בחר xₙ = n, yₙ = n + 1/n.\n|xₙ-yₙ| = 1/n → 0.\n|f(xₙ)-f(yₙ)| = |n² - (n+1/n)²| = |n² - n² - 2 - 1/n²| = 2 + 1/n² ≥ 2.\nלכן עבור ε₀=2: |xₙ-yₙ|→0 אבל |f(xₙ)-f(yₙ)|≥2 → f לא רב"ש.',
        source: 'תרגיל בית 6',
      },
      {
        id: 'uc3',
        title: 'ליפשיץ → רב"ש',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח ש-f(x) = sin(x) היא ליפשיץ (ולכן רב"ש) ב-ℝ.',
        solution: '|sin(x)-sin(y)| = |2cos((x+y)/2)·sin((x-y)/2)| ≤ 2·|sin((x-y)/2)| ≤ 2·|(x-y)/2| = |x-y|.\nלכן f ליפשיץ עם L=1 → רב"ש.',
      },
      {
        id: 'uc4',
        title: 'שימוש בקנטור',
        difficulty: 'easy',
        type: 'proof',
        question: 'הוכח ש-f(x) = x³ + sin(x) רב"ש ב-[0,10].',
        solution: 'f רציפה ב-[0,10] (הרכבה וסכום של רציפות).\n[0,10] הוא קטע סגור וחסום.\nלפי משפט קנטור: f רב"ש ב-[0,10]. ✓',
      },
    ],
    examTips: [
      'תדעו את ההגדרה ואת ההבדל מרציפות רגילה!',
      'שלילת רב"ש: תמיד דרך סדרות. בחרו xₙ,yₙ חכם.',
      'משפט קנטור: רציפה + [a,b] סגור חסום = רב"ש. קל!',
      'ליפשיץ → רב"ש → רציפה (כיוון אחד בלבד!)',
    ],
  },

  // ===== 5. DERIVATIVES - 50% =====
  {
    id: 'derivatives',
    nameHe: 'נגזרות — הגדרה, כללים וחישוב',
    likelihood: 50,
    wasInMoedA: true,
    color: 'blue',
    icon: '🔵',
    whyImportant: 'הופיע בהרחבה במועד א\'. פחות צפוי כשאלה עצמאית אבל יכול להופיע כחלק משאלה אחרת.',
    keyItems: [
      { label: 'הגדרה', title: 'הנגזרת', content: 'f\'(a) = lim(h→0) [f(a+h)-f(a)]/h = lim(x→a) [f(x)-f(a)]/(x-a)\nגזירה ב-a → רציפות ב-a (אבל לא ההפך!)' },
      { label: 'נוסחה', title: 'טבלת נגזרות', content: '(xⁿ)\' = nxⁿ⁻¹  |  (eˣ)\' = eˣ  |  (aˣ)\' = aˣ·ln(a)\n(ln x)\' = 1/x  |  (sin x)\' = cos x  |  (cos x)\' = -sin x\n(tan x)\' = 1/cos²x  |  (arcsin x)\' = 1/√(1-x²)\n(arctan x)\' = 1/(1+x²)' },
      { label: 'נוסחה', title: 'כללי גזירה', content: '(f±g)\' = f\'±g\'  |  (f·g)\' = f\'g + fg\'  |  (f/g)\' = (f\'g-fg\')/g²\n(f∘g)\'(x) = f\'(g(x))·g\'(x) — כלל השרשרת\n(f⁻¹)\'(y) = 1/f\'(x) — נגזרת פונקציה הפוכה' },
      { label: 'טכניקה', title: 'גזירה מהגדרה', content: 'כשמבקשים "מהגדרה": חשב את הגבול lim[f(a+h)-f(a)]/h.\nאסור להשתמש בכללי גזירה — רק בגבול!' },
      { label: 'טכניקה', title: 'גזירה לוגריתמית', content: 'עבור f(x)^g(x):\ny = f^g → ln y = g·ln f → y\'/y = g\'·ln f + g·f\'/f\nדוגמה: xˣ → (xˣ)\' = xˣ(ln x + 1)' },
    ],
    exercises: [
      {
        id: 'd1',
        title: 'גזירה מהגדרה',
        difficulty: 'medium',
        type: 'calculation',
        question: 'חשב מהגדרה את הנגזרת של f(x) = x³ בנקודה x=2.',
        solution: 'f\'(2) = lim(h→0) [(2+h)³ - 8]/h\n= lim(h→0) [8+12h+6h²+h³-8]/h\n= lim(h→0) [12h+6h²+h³]/h\n= lim(h→0) (12+6h+h²) = 12.',
      },
      {
        id: 'd2',
        title: 'כלל השרשרת',
        difficulty: 'medium',
        type: 'calculation',
        question: 'מצא נגזרת: f(x) = sin(eˣ² + ln(x))',
        solution: 'f\'(x) = cos(eˣ²+ln x) · (eˣ²·2x + 1/x)\n= cos(eˣ²+ln x) · (2x·eˣ² + 1/x)',
      },
      {
        id: 'd3',
        title: 'גזירה לוגריתמית',
        difficulty: 'hard',
        type: 'calculation',
        question: 'מצא נגזרת: f(x) = xˢⁱⁿˣ (x>0)',
        solution: 'y = x^(sin x)\nln y = sin(x)·ln(x)\ny\'/y = cos(x)·ln(x) + sin(x)/x\ny\' = x^(sin x) · [cos(x)·ln(x) + sin(x)/x]',
      },
      {
        id: 'd4',
        title: 'נגזרת פונקציה הפוכה',
        difficulty: 'medium',
        type: 'calculation',
        question: 'תהי f(x) = x³+x. מצא (f⁻¹)\'(2).',
        hint: 'f(1) = 2, לכן (f⁻¹)\'(2) = 1/f\'(1)',
        solution: 'f(1) = 1+1 = 2, לכן f⁻¹(2) = 1.\nf\'(x) = 3x²+1 → f\'(1) = 4.\n(f⁻¹)\'(2) = 1/f\'(1) = 1/4.',
        source: 'תרגיל בית 7',
      },
    ],
    examTips: [
      'שננו את טבלת הנגזרות — חייבים לדעת בע"פ',
      'גזירה מהגדרה: אם כתוב "מהגדרה" — רק דרך גבול!',
      'גזירה לוגריתמית: כל פעם שיש f(x)^g(x) — קחו ln משני הצדדים',
      'נגזרת פונקציה הפוכה: מצאו x כך ש-f(x)=y, ואז 1/f\'(x)',
    ],
  },

  // ===== 6. LIMITS - 50% =====
  {
    id: 'limits',
    nameHe: 'גבולות פונקציות',
    likelihood: 50,
    wasInMoedA: true,
    color: 'blue',
    icon: '🔵',
    whyImportant: 'הופיע במועד א\' (שאלות 3,4). יכול להופיע בגרסה שונה — ε-δ, היינה, לופיטל.',
    keyItems: [
      { label: 'הגדרה', title: 'גבול ε-δ', content: 'lim(x→a) f(x) = L אם לכל ε>0 קיים δ>0 כך ש:\n0 < |x-a| < δ → |f(x)-L| < ε' },
      { label: 'הגדרה', title: 'גבול באינסוף', content: 'lim(x→∞) f(x) = L אם לכל ε>0 קיים M כך ש:\nx > M → |f(x)-L| < ε' },
      { label: 'משפט', title: 'היינה', content: 'lim(x→a) f(x) = L ⟺ לכל סדרה xₙ→a (xₙ≠a): f(xₙ)→L\nשימוש עיקרי: שלילת גבול — מצא 2 סדרות עם גבולות שונים.' },
      { label: 'משפט', title: 'כלל לופיטל', content: 'lim f/g מסוג 0/0 או ∞/∞, ו-lim f\'/g\' קיים →\nlim f(x)/g(x) = lim f\'(x)/g\'(x)\nצורות: 0·∞ → f/(1/g). ∞-∞ → מנה. 1^∞,0^0,∞^0 → e^(g·ln f)' },
      { label: 'נוסחה', title: 'גבולות חשובים', content: 'sin(x)/x → 1  |  (1+1/n)ⁿ → e  |  (eˣ-1)/x → 1\nln(1+x)/x → 1  |  (1-cos x)/x² → 1/2  |  (1+a/x)^(bx) → e^(ab)' },
    ],
    exercises: [
      {
        id: 'l1',
        title: 'הוכחת ε-δ',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח מהגדרה: lim(x→3) (x²-9)/(x-3) = 6',
        solution: 'לכל ε>0, בחר δ=ε.\n0<|x-3|<δ → |(x²-9)/(x-3) - 6| = |(x+3)(x-3)/(x-3) - 6|\n= |x+3-6| = |x-3| < δ = ε. ✓',
      },
      {
        id: 'l2',
        title: 'שלילת גבול (היינה)',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח שלא קיים lim(x→0) sin(1/x).',
        solution: 'בחר xₙ = 1/(2πn) → 0. f(xₙ) = sin(2πn) = 0 → 0.\nבחר yₙ = 1/(π/2+2πn) → 0. f(yₙ) = sin(π/2+2πn) = 1 → 1.\nקיימות שתי סדרות ששואפות ל-0 אבל הגבולות שונים (0≠1).\nלפי היינה: הגבול לא קיים.',
      },
      {
        id: 'l3',
        title: 'לופיטל — צורות שונות',
        difficulty: 'medium',
        type: 'calculation',
        question: 'חשב: lim(x→0⁺) x·ln(x)',
        hint: 'כתוב כ-ln(x)/(1/x) → ∞/∞',
        solution: 'צורה 0·(-∞). כתוב: x·ln x = ln(x)/(1/x) → -∞/∞.\nלופיטל: lim (1/x)/(-1/x²) = lim (-x) = 0.',
      },
      {
        id: 'l4',
        title: 'לופיטל — 1^∞',
        difficulty: 'hard',
        type: 'calculation',
        question: 'חשב: lim(x→0⁺) (1+x)^(1/x)',
        solution: 'צורה 1^∞. y = (1+x)^(1/x) → ln y = ln(1+x)/x.\nlim(x→0) ln(1+x)/x = 1 (גבול ידוע, או לופיטל: 1/(1+x)/1 → 1).\nלכן y → e¹ = e.',
      },
    ],
    examTips: [
      'הוכחת ε-δ: תמיד תתחילו מהסוף — מה אתם רוצים שיהיה < ε',
      'היינה: הדרך הכי טובה לשלול קיום גבול',
      'לופיטל: תמיד ודאו שהצורה היא 0/0 או ∞/∞!',
      'גבולות ידועים: שננו את כולם — חוסכים זמן במבחן',
    ],
  },

  // ===== 7. MVT & L'HÔPITAL - 40% =====
  {
    id: 'mean-value',
    nameHe: 'משפט הערך הממוצע ולופיטל',
    likelihood: 40,
    wasInMoedA: true,
    color: 'gray',
    icon: '⚪',
    whyImportant: 'הופיע בהרחבה במועד א\' (שאלות 1,4). פחות צפוי אבל עדיין חשוב כחלק משאלה.',
    keyItems: [
      { label: 'משפט', title: 'פרמה', content: 'f מוגדרת בסביבת x₀, ל-f נקודת קיצון מקומי ב-x₀, f גזירה ב-x₀ → f\'(x₀)=0' },
      { label: 'משפט', title: 'רול', content: 'f רציפה ב-[a,b], גזירה ב-(a,b), f(a)=f(b)\n→ קיים c∈(a,b) כך ש-f\'(c) = 0' },
      { label: 'משפט', title: 'לגראנז\' (MVT)', content: 'f רציפה ב-[a,b], גזירה ב-(a,b)\n→ קיים c∈(a,b): f\'(c) = [f(b)-f(a)]/(b-a)' },
      { label: 'משפט', title: 'קושי (MVT מוכלל)', content: 'f,g רציפות ב-[a,b], גזירות ב-(a,b), g\'≠0\n→ קיים c: [f(b)-f(a)]/[g(b)-g(a)] = f\'(c)/g\'(c)' },
      { label: 'טכניקה', title: 'יישומי MVT', content: 'f\'>0 בקטע → f עולה ממש\nf\'=0 בקטע → f קבועה\nהוכחת אי-שוויונות: f\'(c)·(b-a) = f(b)-f(a)' },
    ],
    exercises: [
      {
        id: 'mv1',
        title: 'הוכחת אי-שוויון עם MVT',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח: |sin(a)-sin(b)| ≤ |a-b| לכל a,b∈ℝ.',
        solution: 'לפי לגראנז\' על sin בקטע [a,b]:\nקיים c כך ש-sin(b)-sin(a) = cos(c)·(b-a).\nלכן |sin(b)-sin(a)| = |cos(c)|·|b-a| ≤ |b-a|. ✓\n(כי |cos(c)|≤1)',
      },
      {
        id: 'mv2',
        title: 'הוכחת חד-ח"ע עם נגזרת',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח ש-f(x) = x³ + 3x + 1 חד-חד-ערכית.',
        hint: 'הראה f\'>0, לכן f עולה ממש',
        solution: 'f\'(x) = 3x² + 3 > 0 לכל x∈ℝ.\nלפי MVT: f עולה ממש → f חד-חד-ערכית.',
        source: 'דומה למועד א\' שאלה 1.2.1',
      },
      {
        id: 'mv3',
        title: 'הוכחה עם רול',
        difficulty: 'hard',
        type: 'proof',
        question: 'תהי f גזירה ב-ℝ ו-f\'(x)≠0 לכל x. הוכח ש-f חד-חד-ערכית.',
        solution: 'בשלילה: נניח f(a) = f(b) עבור a≠b.\nf רציפה ב-[a,b] (כי גזירה), גזירה ב-(a,b), f(a)=f(b).\nלפי רול: קיים c∈(a,b) כך ש-f\'(c)=0.\nסתירה ל-f\'(x)≠0 לכל x. ✓',
        source: 'מועד א\' 2026 שאלה 1.2.1',
      },
    ],
    examTips: [
      'הוכחת MVT של קושי — ישירות מההרצאות (15 נקודות במועד א\'!)',
      'שרשרת: פרמה → רול → לגראנז\' → קושי → לופיטל',
      'MVT לאי-שוויונות: f\'(c)·(b-a) = f(b)-f(a), חסום את f\'(c)',
    ],
  },

  // ===== 8. CONTINUITY & IVT - 40% =====
  {
    id: 'continuity',
    nameHe: 'רציפות, IVT ו-EVT',
    likelihood: 40,
    wasInMoedA: true,
    color: 'gray',
    icon: '⚪',
    whyImportant: 'IVT הופיע במועד א\' (שאלה 3.2). יכול להופיע בגרסה שונה.',
    keyItems: [
      { label: 'הגדרה', title: 'רציפות בנקודה', content: 'f רציפה ב-a אם lim(x→a) f(x) = f(a).\n3 תנאים: (1) f(a) מוגדר (2) הגבול קיים (3) שווים.' },
      { label: 'משפט', title: 'ערך הביניים (IVT)', content: 'f רציפה ב-[a,b], f(a)<c<f(b) → קיים ξ∈(a,b): f(ξ)=c.\nשימוש: הוכחת קיום שורש — הראה f(a)·f(b)<0.' },
      { label: 'משפט', title: 'ערכי הקיצון (EVT)', content: 'f רציפה ב-[a,b] → f מקבלת מקסימום ומינימום בקטע.' },
      { label: 'משפט', title: 'הרכבת רציפות', content: 'f רציפה ב-a, g רציפה ב-f(a) → g∘f רציפה ב-a.' },
    ],
    exercises: [
      {
        id: 'c1',
        title: 'שימוש ב-IVT',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח שלמשוואה x³ + x - 1 = 0 יש פתרון ב-(0,1).',
        solution: 'f(x) = x³+x-1 רציפה (פולינום).\nf(0) = -1 < 0.\nf(1) = 1 > 0.\nf(0)·f(1) < 0 → לפי IVT קיים c∈(0,1): f(c) = 0. ✓',
      },
      {
        id: 'c2',
        title: 'IVT מתקדם (כמו מועד א\')',
        difficulty: 'hard',
        type: 'proof',
        question: 'f רציפה ב-[0,1] ומקבלת מקסימום. הוכח שקיים c∈[0,1-h] כך ש-f(c+h)=f(c) (עבור 0<h<1).',
        hint: 'הגדר g(x)=f(x+h)-f(x), בדוק סימנים',
        solution: 'הגדר g(x) = f(x+h) - f(x) על [0,1-h].\ng רציפה (הפרש רציפות).\nנניח x₀∈[0,1] נקודת מקסימום.\nאם x₀ ≤ 1-h: g(x₀) = f(x₀+h)-f(x₀) ≤ 0 (כי x₀ מקסימום).\nוגם g(x₀-h) = f(x₀)-f(x₀-h) ≥ 0.\nלפי IVT: קיים c עם g(c) = 0 → f(c+h) = f(c). ✓',
        source: 'מועד א\' 2026 שאלה 3.2',
      },
      {
        id: 'c3',
        title: 'הוכחת רציפות',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח מהגדרה ש-f(x)=x² רציפה בכל נקודה.',
        solution: 'יהי a∈ℝ. לכל ε>0, נחפש δ>0.\n|f(x)-f(a)| = |x²-a²| = |x-a|·|x+a|.\nאם |x-a|<1 → |x|<|a|+1 → |x+a|<2|a|+1.\nבחר δ = min(1, ε/(2|a|+1)).\n|x-a|<δ → |x²-a²| < δ·(2|a|+1) ≤ ε. ✓',
      },
    ],
    examTips: [
      'IVT: ודאו שהפונקציה רציפה בקטע סגור!',
      'שאלת קיום שורש: חפשו f(a)·f(b)<0',
      'EVT: שימושי להוכחת קיום מקסימום/מינימום',
    ],
  },

  // ===== 9. REAL NUMBERS - 35% =====
  {
    id: 'real-numbers',
    nameHe: 'המספרים הממשיים — sup/inf',
    likelihood: 35,
    wasInMoedA: true,
    color: 'gray',
    icon: '⚪',
    whyImportant: 'הופיע במועד א\' (שאלה 2). פחות סביר שיחזור אבל הגדרות שוות נקודות קלות.',
    keyItems: [
      { label: 'הגדרה', title: 'סופרמום', content: 'sup(A) = החסם העליון הקטן ביותר של A.\ns=sup(A) ⟺ (1) s חסם עליון (2) לכל ε>0 קיים a∈A: a>s-ε' },
      { label: 'הגדרה', title: 'אינפימום', content: 'inf(A) = החסם התחתון הגדול ביותר של A.\ns=inf(A) ⟺ (1) s חסם תחתון (2) לכל ε>0 קיים a∈A: a<s+ε' },
      { label: 'משפט', title: 'אקסיומת השלמות', content: 'כל קבוצה לא-ריקה וחסומה מלעיל ב-ℝ מקבלת סופרמום ב-ℝ.' },
      { label: 'משפט', title: 'תכונה ארכימדית', content: 'לכל x∈ℝ קיים n∈ℕ כך ש-n>x.' },
      { label: 'משפט', title: 'צפיפות הרציונליים', content: 'בין כל שני ממשיים שונים קיים מספר רציונלי.' },
    ],
    exercises: [
      {
        id: 'r1',
        title: 'אפיון sup עם ε',
        difficulty: 'medium',
        type: 'proof',
        question: 'הוכח: s=sup(A) אם"ם s חסם עליון ולכל ε>0 קיים a∈A: a > s-ε.',
        solution: '⇒: s=sup(A) → s חסם עליון. נניח בשלילה: קיים ε₀>0 כך שלכל a∈A: a≤s-ε₀.\nאז s-ε₀ חסם עליון של A, וs-ε₀<s. סתירה לכך ש-s הקטן ביותר.\n\n⇐: s חסם עליון. נניח בשלילה m<s גם חסם עליון.\nבחר ε=s-m>0. קיים a∈A: a>s-ε=m. אבל m חסם עליון → a≤m. סתירה.',
        source: 'דומה למועד א\' שאלה 2.1.2',
      },
      {
        id: 'r2',
        title: 'צפיפות הרציונליים',
        difficulty: 'hard',
        type: 'proof',
        question: 'הוכח: קיימים n,m∈ℕ כך ש-0.124 < ln(n²/m²) < 0.125.',
        hint: 'השתמש בצפיפות ℚ + מונוטוניות של ln',
        solution: 'e^0.124 < e^0.125. לפי צפיפות ℚ קיים r=n/m∈ℚ:\n√(e^0.124) < n/m < √(e^0.125).\nהעלאה בריבוע (חיובי ומונוטוני): e^0.124 < n²/m² < e^0.125.\nln (מונוטונית עולה): 0.124 < ln(n²/m²) < 0.125. ✓',
        source: 'מועד א\' 2026 שאלה 5.2',
      },
    ],
    examTips: [
      'הגדרת sup/inf = נקודות קלות (2-3 נקודות). שננו!',
      'אפיון ε: הדרך הנפוצה ביותר לעבוד עם sup/inf',
      'צפיפות הרציונליים: שימושי בהוכחות מתקדמות',
    ],
  },
];

// Helper functions
export function getTopicsByLikelihood(): ExamTopic[] {
  return [...examTopics].sort((a, b) => b.likelihood - a.likelihood);
}

export function getCriticalTopics(): ExamTopic[] {
  return examTopics.filter(t => t.likelihood >= 65);
}

export function getTotalExercises(): number {
  return examTopics.reduce((sum, t) => sum + t.exercises.length, 0);
}

export function getExercisesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): { topic: ExamTopic; exercise: PracticeExercise }[] {
  const results: { topic: ExamTopic; exercise: PracticeExercise }[] = [];
  for (const topic of examTopics) {
    for (const ex of topic.exercises) {
      if (ex.difficulty === difficulty) {
        results.push({ topic, exercise: ex });
      }
    }
  }
  return results;
}
