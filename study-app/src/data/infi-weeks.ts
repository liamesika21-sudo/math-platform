// Week-by-week Calculus 1 course content

export interface WeekContent {
  weekNumber: number;
  title: string;
  titleHe: string;
  lectures: number[];
  recitations: number[];
  homeworks: number[];
  topics: string[];
  topicsHe: string[];
  summary: string;
  keyDefinitions: string[];
  keyTheorems: string[];
  keyTechniques: string[];
  examTips?: string[];
}

export const weeksData: WeekContent[] = [
  {
    weekNumber: 1,
    title: 'Real Numbers & Supremum',
    titleHe: 'המספרים הממשיים וסופרמום',
    lectures: [1, 2],
    recitations: [1],
    homeworks: [1],
    topics: ['real-numbers', 'supremum-infimum'],
    topicsHe: ['המספרים הממשיים', 'סופרמום ואינפימום'],
    summary: 'אקסיומות השדה הסדור, חסם עליון ותחתון, סופרמום ואינפימום, תכונה ארכימדית, צפיפות הרציונליים',
    keyDefinitions: [
      'סופרמום: sup(A) = החסם העליון הקטן ביותר של A',
      'אינפימום: inf(A) = החסם התחתון הגדול ביותר של A',
      'תכונה ארכימדית: לכל x∈ℝ קיים n∈ℕ כך ש-n > x',
    ],
    keyTheorems: [
      'אקסיומת השלמות: כל קבוצה לא-ריקה וחסומה מלעיל ב-ℝ מקבלת סופרמום ב-ℝ',
      'צפיפות הרציונליים: בין כל שני ממשיים קיים רציונלי',
    ],
    keyTechniques: [
      'הוכחת sup: הראה חסם עליון + לכל ε>0 קיים a∈A כך ש-a > sup(A)-ε',
    ],
  },
  {
    weekNumber: 2,
    title: 'Sequences - Convergence',
    titleHe: 'סדרות - התכנסות',
    lectures: [3, 4],
    recitations: [2],
    homeworks: [2],
    topics: ['sequences'],
    topicsHe: ['סדרות'],
    summary: 'הגדרת התכנסות סדרה, חוקי אריתמטיקה של גבולות, סדרות חסומות, משפט הסנדוויץ\'',
    keyDefinitions: [
      'התכנסות: aₙ→L אם לכל ε>0 קיים N כך שלכל n>N: |aₙ-L| < ε',
      'סדרה חסומה: קיים M כך ש-|aₙ| ≤ M לכל n',
    ],
    keyTheorems: [
      'חוקי אריתמטיקה: lim(aₙ±bₙ) = lim aₙ ± lim bₙ, lim(aₙ·bₙ) = lim aₙ · lim bₙ',
      'משפט הסנדוויץ\': aₙ ≤ bₙ ≤ cₙ, lim aₙ = lim cₙ = L → lim bₙ = L',
      'סדרה מתכנסת → חסומה',
    ],
    keyTechniques: [
      'הוכחת התכנסות: מצא N = f(ε) כך ש-|aₙ-L| < ε',
    ],
  },
  {
    weekNumber: 3,
    title: 'Sequences - Monotone & Bolzano-Weierstrass',
    titleHe: 'סדרות מונוטוניות ובולצאנו-ויירשטראס',
    lectures: [5, 6],
    recitations: [3],
    homeworks: [3],
    topics: ['sequences'],
    topicsHe: ['סדרות מונוטוניות', 'בולצאנו-ויירשטראס'],
    summary: 'סדרות מונוטוניות, משפט בולצאנו-ויירשטראס, סדרות רקורסיביות, lim sup ו-lim inf',
    keyDefinitions: [
      'סדרה מונוטונית עולה: aₙ ≤ aₙ₊₁ לכל n',
      'תת-סדרה: סדרה aₙₖ כאשר n₁ < n₂ < n₃ < ...',
      'lim sup aₙ = lim(n→∞) sup{aₖ : k≥n}',
    ],
    keyTheorems: [
      'סדרה מונוטונית וחסומה → מתכנסת',
      'בולצאנו-ויירשטראס: כל סדרה חסומה מכילה תת-סדרה מתכנסת',
      'קושי: סדרה מתכנסת ⟺ סדרת קושי',
    ],
    keyTechniques: [
      'סדרה רקורסיבית: הוכח מונוטוניות + חסימות → מתכנסת, ואז חשב L = lim aₙ',
    ],
  },
  {
    weekNumber: 4,
    title: 'Limits of Functions',
    titleHe: 'גבולות פונקציות',
    lectures: [7, 8],
    recitations: [4],
    homeworks: [4],
    topics: ['limits'],
    topicsHe: ['גבולות פונקציות'],
    summary: 'הגדרת ε-δ, חוקי גבולות, גבולות חד-צדדיים, גבולות באינסוף, היינה',
    keyDefinitions: [
      'lim(x→a) f(x) = L: לכל ε>0 קיים δ>0 כך ש-0<|x-a|<δ → |f(x)-L|<ε',
      'גבול חד-צדדי: lim(x→a⁺), lim(x→a⁻)',
      'lim(x→∞) f(x) = L: לכל ε>0 קיים M כך ש-x>M → |f(x)-L|<ε',
    ],
    keyTheorems: [
      'חוקי גבולות: סכום, מכפלה, מנה (אם המכנה ≠ 0)',
      'היינה: lim(x→a) f(x) = L ⟺ לכל סדרה xₙ→a, f(xₙ)→L',
      'משפט הסנדוויץ\' לפונקציות',
    ],
    keyTechniques: [
      'הוכחת ε-δ: מצא δ = g(ε) המתאים',
      'שימוש בהיינה לשלילת קיום גבול: מצא שתי סדרות עם גבולות שונים',
    ],
    examTips: ['שאלות ε-δ מופיעות כמעט בכל מבחן - תרגלו היטב!'],
  },
  {
    weekNumber: 5,
    title: 'Continuity',
    titleHe: 'רציפות',
    lectures: [9, 10],
    recitations: [5],
    homeworks: [5],
    topics: ['continuity', 'limits'],
    topicsHe: ['רציפות', 'גבולות'],
    summary: 'רציפות בנקודה ובקטע, סוגי אי-רציפות, משפט ערך הביניים, משפט ערכי הקיצון',
    keyDefinitions: [
      'רציפות בנקודה: lim(x→a) f(x) = f(a)',
      'רציפות בקטע: רציפה בכל נקודה פנימית + רציפות חד-צדדית בקצוות',
    ],
    keyTheorems: [
      'IVT: f רציפה ב-[a,b], f(a)<c<f(b) → ∃ξ∈(a,b): f(ξ)=c',
      'EVT: f רציפה ב-[a,b] → f מקבלת מקסימום ומינימום',
      'הרכבת פונקציות רציפות → רציפה',
    ],
    keyTechniques: [
      'הוכחת קיום שורש: השתמש ב-IVT עם f(a)·f(b) < 0',
    ],
  },
  {
    weekNumber: 6,
    title: 'Uniform Continuity',
    titleHe: 'רציפות במידה שווה',
    lectures: [11, 12],
    recitations: [6],
    homeworks: [6],
    topics: ['continuity'],
    topicsHe: ['רציפות במידה שווה'],
    summary: 'הגדרת רציפות במידה שווה, משפט קנטור, קריטריון לאי-רציפות במ"ש, ליפשיץ',
    keyDefinitions: [
      'רב"ש: לכל ε>0 קיים δ>0 כך ש-|x-y|<δ → |f(x)-f(y)|<ε (δ לא תלוי בנקודה!)',
      'ליפשיץ: |f(x)-f(y)| ≤ L·|x-y| לכל x,y (L קבוע)',
    ],
    keyTheorems: [
      'קנטור: f רציפה ב-[a,b] (סגור וחסום) → f רב"ש ב-[a,b]',
      'ליפשיץ → רב"ש → רציפה',
    ],
    keyTechniques: [
      'שלילת רב"ש: מצא סדרות xₙ,yₙ עם |xₙ-yₙ|→0 אבל |f(xₙ)-f(yₙ)|≥ε₀',
    ],
  },
  {
    weekNumber: 7,
    title: 'Derivatives - Definition & Rules',
    titleHe: 'נגזרות - הגדרה וכללים',
    lectures: [13, 14],
    recitations: [7],
    homeworks: [7],
    topics: ['derivatives'],
    topicsHe: ['נגזרות'],
    summary: 'הגדרת הנגזרת, כללי גזירה, כלל השרשרת, נגזרות פונקציות אלמנטריות, נגזרת של פונקציה הפוכה',
    keyDefinitions: [
      "f'(a) = lim(x→a) [f(x)-f(a)]/(x-a) = lim(h→0) [f(a+h)-f(a)]/h",
      'גזירה → רציפות (אבל לא ההפך!)',
    ],
    keyTheorems: [
      'כלל השרשרת: (f∘g)\'(x) = f\'(g(x))·g\'(x)',
      'כלל המכפלה: (f·g)\' = f\'g + fg\'',
      'נגזרת פונקציה הפוכה: (f⁻¹)\'(y) = 1/f\'(x) כאשר y=f(x)',
    ],
    keyTechniques: [
      'גזירה מהגדרה: חשב את הגבול lim[f(a+h)-f(a)]/h',
      'גזירה לוגריתמית: ln שני הצדדים וגזור',
    ],
  },
  {
    weekNumber: 8,
    title: 'Applications of Derivatives',
    titleHe: 'יישומי נגזרות',
    lectures: [15, 16],
    recitations: [8],
    homeworks: [8],
    topics: ['derivatives', 'mean-value'],
    topicsHe: ['יישומי נגזרות', 'ערך ממוצע'],
    summary: 'משפט רול, משפט הערך הממוצע, כלל לופיטל, נקודות קיצון, קעירות',
    keyDefinitions: [
      'נקודת קיצון מקומי: f\'(c)=0 או f\' לא קיימת',
      'קעירות: f קעורה כלפי מעלה אם f\'\' > 0',
      'נקודת פיתול: שינוי כיוון הקעירות',
    ],
    keyTheorems: [
      'רול: f(a)=f(b), f רציפה ב-[a,b] וגזירה ב-(a,b) → ∃c: f\'(c)=0',
      'MVT: ∃c∈(a,b): f\'(c) = [f(b)-f(a)]/(b-a)',
      'לופיטל: lim f/g = lim f\'/g\' (בתנאים 0/0 או ∞/∞)',
    ],
    keyTechniques: [
      'חקירת פונקציה: תחום, סימטריה, f\', f\'\', אסימפטוטות',
      'לופיטל: זהה את הצורה (0/0, ∞/∞, 0·∞, ∞-∞, 1^∞, 0^0, ∞^0)',
    ],
    examTips: ['לופיטל + MVT = שאלות שחוזרות כמעט תמיד במבחן'],
  },
  {
    weekNumber: 9,
    title: 'Taylor Polynomial',
    titleHe: 'פולינום טיילור',
    lectures: [17, 18],
    recitations: [9],
    homeworks: [9],
    topics: ['taylor'],
    topicsHe: ['טיילור'],
    summary: 'פולינום טיילור, שארית לגראנז\', פיתוחי מקלורן, חישוב גבולות באמצעות טיילור',
    keyDefinitions: [
      'פולינום טיילור: Pₙ(x) = Σ f⁽ᵏ⁾(a)/k! · (x-a)ᵏ',
      'שארית לגראנז\': Rₙ(x) = f⁽ⁿ⁺¹⁾(c)/(n+1)! · (x-a)ⁿ⁺¹',
    ],
    keyTheorems: [
      'משפט טיילור: f(x) = Pₙ(x) + Rₙ(x)',
      'אם Rₙ(x)→0 אז f(x) = Σ f⁽ᵏ⁾(a)/k! · (x-a)ᵏ',
    ],
    keyTechniques: [
      'חישוב גבול עם טיילור: פתח את הפונקציות לטיילור ופשט',
      'שימוש בפיתוחים ידועים: e^x, sin, cos, ln(1+x), 1/(1-x)',
    ],
    examTips: ['שאלת טיילור מופיעה ב-75% מהמבחנים. שננו את הפיתוחים!'],
  },
  {
    weekNumber: 12,
    title: 'Series & Power Series',
    titleHe: 'טורים וטורי חזקות',
    lectures: [23],
    recitations: [12, 13],
    homeworks: [12],
    topics: ['series', 'taylor'],
    topicsHe: ['טורים', 'טורי חזקות'],
    summary: 'טורים מספריים, מבחני התכנסות, התכנסות מוחלטת ובתנאי, טורי חזקות, רדיוס התכנסות',
    keyDefinitions: [
      'Σaₙ מתכנס אם סדרת הסכומים החלקיים Sₙ = Σₖ₌₁ⁿ aₖ מתכנסת',
      'התכנסות מוחלטת: Σ|aₙ| מתכנס',
      'התכנסות בתנאי: Σaₙ מתכנס אבל Σ|aₙ| מתבדר',
      'רדיוס התכנסות: R = 1/lim sup|aₙ|^(1/n)',
    ],
    keyTheorems: [
      'תנאי הכרחי: Σaₙ מתכנס → aₙ→0 (ההפך לא נכון!)',
      'מבחן דלמבר: lim|aₙ₊₁/aₙ| < 1 → מתכנס',
      'מבחן קושי: lim|aₙ|^(1/n) < 1 → מתכנס',
      'לייבניץ: aₙ↓0 → Σ(-1)^n·aₙ מתכנס',
      'התכנסות מוחלטת → התכנסות (ההפך לא נכון)',
    ],
    keyTechniques: [
      'בחר את המבחן הנכון: דלמבר לעצרות, קושי לחזקות, השוואה ל-1/n^p',
      'טור חזקות: מצא R, בדוק קצוות בנפרד',
    ],
    examTips: ['שאלת טורים מופיעה ב-80% מהמבחנים. דעו את כל המבחנים!'],
  },
];

export function getAllWeeks(): WeekContent[] {
  return weeksData;
}

export function getWeekContent(weekNumber: number): WeekContent | undefined {
  return weeksData.find(w => w.weekNumber === weekNumber);
}
