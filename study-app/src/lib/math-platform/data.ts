import type {
  Course,
  CourseId,
  CourseTopic,
  CourseWeek,
  PlatformQuestion,
  SourceDocument,
  TheoryItem,
} from '@/lib/math-platform/types';

const sourceId = (courseId: CourseId, weekNumber: number, type: SourceDocument['type']) =>
  `${courseId}-w${weekNumber}-${type}`;

const theoryId = (courseId: CourseId, weekNumber: number, slug: string) =>
  `${courseId}-w${weekNumber}-${slug}`;

const questionId = (courseId: CourseId, weekNumber: number, slug: string) =>
  `${courseId}-w${weekNumber}-${slug}`;

// Suppress unused variable warnings — helpers used for future data entry
void sourceId; void theoryId; void questionId;

export const courses: Course[] = [
  {
    id: 'logic',
    title: 'לוגיקה ותורת הקבוצות',
    shortTitle: 'לוגיקה',
    subtitle: 'לוגיקה פרופוזיציונית, תורת הקבוצות, יחסים ופונקציות',
    description:
      'סביבת עבודה מובנית ללוגיקה ותורת הקבוצות — הגדרות, משפטים, הוכחות ותרגולים לפי שבוע.',
    accent: 'from-violet-500 via-purple-500 to-indigo-500',
    surface: 'from-violet-50 via-white to-indigo-50',
    icon: '∀',
  },
  {
    id: 'data-structures',
    title: 'מבני נתונים',
    shortTitle: 'מבני נתונים',
    subtitle: 'מערכים, רשימות, עצים, גרפים ואלגוריתמים בסיסיים',
    description:
      'סביבת לימוד למבני נתונים המפרידה בין תיאוריה, מימוש ותרגולים — לפי שבוע ונושא.',
    accent: 'from-emerald-500 via-teal-500 to-cyan-500',
    surface: 'from-emerald-50 via-white to-cyan-50',
    icon: '⬡',
  },
];

// ─── Logic — Week 1 ──────────────────────────────────────────────────────────

export const topics: CourseTopic[] = [
  {
    id: 'logic-w1-naive-set-theory',
    courseId: 'logic',
    weekId: 'logic-w1',
    title: 'תורת הקבוצות הנאיבית',
    summary: 'הגדרת קבוצה כאוסף של עצמים, סימונים בסיסיים, פרדוקס ראסל וגבולות התיאוריה הנאיבית.',
    patterns: ['הגדרת שייכות ∈', 'תת-קבוצה ⊆', 'שוויון קבוצות'],
  },
  {
    id: 'logic-w1-zfc',
    courseId: 'logic',
    weekId: 'logic-w1',
    title: 'מערכת האקסיומות ZFC',
    summary: 'תורת הקבוצות האקסיומטית של צרמלו-פרנקל עם אקסיומת הבחירה — הבסיס הפורמלי של המתמטיקה.',
    patterns: ['אקסיומות ZFC', 'ייצוג ישויות מתמטיות', 'זוג סדור'],
  },
];

export const sourceDocuments: SourceDocument[] = [
  {
    id: 'logic-w1-lecture',
    courseId: 'logic',
    weekId: 'logic-w1',
    type: 'lecture',
    name: 'הרצאה 1 — תורת הקבוצות הנאיבית והאקסיומטית',
    topicIds: ['logic-w1-naive-set-theory', 'logic-w1-zfc'],
    processed: true,
  },
];

export const weeks: CourseWeek[] = [
  {
    id: 'logic-w1',
    courseId: 'logic',
    number: 1,
    title: 'תורת הקבוצות הנאיבית והאקסיומטית',
    summary:
      'מה זו קבוצה? הגדרה נאיבית, סימונים ומונחים בסיסיים. פרדוקס ראסל וכשל התיאוריה הנאיבית. מערכת האקסיומות ZFC כבסיס פורמלי למתמטיקה. ייצוג מספרים וזוגות סדורים ב-ZFC.',
    topicIds: ['logic-w1-naive-set-theory', 'logic-w1-zfc'],
    lectureItemIds: [
      'logic-w1-def-set',
      'logic-w1-def-membership',
      'logic-w1-def-subset',
      'logic-w1-def-equality',
      'logic-w1-concept-russell',
      'logic-w1-concept-selfref',
      'logic-w1-def-zfc-list',
      'logic-w1-axiom-ext',
      'logic-w1-axiom-empty',
      'logic-w1-axiom-pairing',
      'logic-w1-axiom-union',
      'logic-w1-axiom-foundation',
      'logic-w1-axiom-infinity',
      'logic-w1-axiom-powerset',
      'logic-w1-axiom-replacement',
      'logic-w1-axiom-separation',
      'logic-w1-axiom-choice',
      'logic-w1-def-atoms',
      'logic-w1-def-numbers-zfc',
      'logic-w1-def-ordered-pair',
      'logic-w1-thm-ordered-pair',
    ],
    tutorialQuestionIds: [],
    homeworkQuestionIds: [],
    examQuestionIds: [],
    reviewHighlights: [
      'פרדוקס ראסל — למה תורת הקבוצות הנאיבית נכשלת',
      'אקסיומת ההיקפיות — מתי שתי קבוצות שוות',
      'ייצוג זוג סדור: ⟨x,y⟩ = {{x},{x,y}}',
      'ייצוג מספרים: 0=∅, 1={∅}, n={0,...,n−1}',
    ],
  },
];

export const theoryItems: TheoryItem[] = [
  // ── Naive Set Theory ─────────────────────────────────────────────────────
  {
    id: 'logic-w1-def-set',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'קבוצה (הגדרה נאיבית)',
    kind: 'definition',
    content:
      'קבוצה היא אוסף של עצמים כלשהם. בתורת הקבוצות הנאיבית כל אוסף של עצמים נחשב קבוצה — ללא הגבלה. גישה זו מובילה לסתירות (ראה פרדוקס ראסל), ולכן מחליפים אותה בתורת הקבוצות האקסיומטית.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-def-membership',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'שייכות — x ∈ A',
    kind: 'definition',
    content:
      'x ∈ A פירושו שx הוא איבר של A (x שייך לA, x נמצא בA).\n\nדוגמאות:\n• 5 ∈ {8,5,2}\n• 3 ∉ {8,5,2}\n\nשימו לב: "Include / contain / מכיל" הם מונחים דו-משמעיים — יש להיזהר.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-def-subset',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'תת-קבוצה — A ⊆ B',
    kind: 'definition',
    content:
      'A ⊆ B פירושו שA היא תת-קבוצה של B — כל איבר של A הוא גם איבר של B.\n\nדוגמה: {5,7} ⊆ {5,3,7}',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-def-equality',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'שוויון קבוצות — A = B',
    kind: 'definition',
    content:
      'A = B פירושו שA וB הן אותה הקבוצה — יש להן אותם האיברים בדיוק.\n\nדוגמאות:\n• {5,7,3,3} = {5,3,7}  — כפילויות לא מוסיפות איברים\n• {5,7,3,3} = {7,9,5}? לא, כי 3 ∈ A אך 3 ∉ B',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-concept-russell',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'פרדוקס ראסל (1902)',
    kind: 'concept',
    content:
      'תהא A קבוצה כלשהי. סביר שA ∉ A (קבוצת המספרים הטבעיים, למשל, אינה מספר טבעי).\n\nנגדיר: S = { A | A ∉ A }  — אוסף כל הקבוצות שאינן מכילות את עצמן.\n\nהשאלה: האם S ∈ S?\n• אם S ∈ S — אז לפי ההגדרה S ∉ S. סתירה!\n• אם S ∉ S — אז לפי ההגדרה S ∈ S. סתירה!\n\nמסקנה: תורת הקבוצות הנאיבית (שבה כל אוסף הוא קבוצה) מובילה לסתירה.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-concept-selfref',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    title: 'התייחסות עצמית (Self Reference)',
    kind: 'concept',
    content:
      'פרדוקסים רבים נובעים מהתייחסות עצמית. דוגמה — פרדוקס הספר:\n"בכפר מסויים, כל גבר מגלח את עצמו או שהספר מגלח אותו. אסור שהגבר יתגלח בעצמו וגם הספר יגלחו. יש בכפר ספר אחד — מי מגלח אותו?"\n\nאם הספר מגלח את עצמו — אסור. אם לא מגלח את עצמו — חייב שהספר יגלחו, כלומר הוא עצמו. סתירה.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },

  // ── ZFC Axioms ────────────────────────────────────────────────────────────
  {
    id: 'logic-w1-def-zfc-list',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'מערכת האקסיומות ZFC — רשימה',
    kind: 'concept',
    content:
      'ZFC = Zermelo–Fraenkel + Choice. אקסיומות ה-ZFC:\n\n1. ההיקפיות (Extensionality)\n2. הקבוצה הריקה (Empty Set)\n3. האיחוד (Union)\n4. היסוד / Regularity (Foundation)\n5. האינסוף (Infinity)\n6. החזקה (Power Set)\n7. ההחלפה (Replacement)\n8. הבחירה (Choice)\n— נובעות מהאקסיומות לעיל —\n9. הזוג הלא-סדור (Pairing)\n10. ההפרדה (Separation)',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-ext',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת ההיקפיות (Extensionality)',
    kind: 'definition',
    content:
      'שתי קבוצות A וB שוות (A = B) אם ורק אם יש להן אותם האיברים.\n\nהגדרה: A = B אמ"מ כל איבר של A הוא גם איבר של B ולהפך.\n\nמשפט: A = B אמ"מ A ⊆ B וגם B ⊆ A.\n\nדוגמאות:\n• {1,2,3} = {3,2,1} ✓\n• {5,9,9,5,7} = {7,9,5} ✓  (כפילויות לא משנות)\n• {7,2,4} ≠ {7,3,4}  (2 ∈ A אך 2 ∉ B)',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-empty',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת הקבוצה הריקה (Empty Set)',
    kind: 'definition',
    content:
      'קיימת קבוצה ∅ (או { }) שאין לה איברים.\n\nשאלות חשובות:\n• האם {∅} = ∅? לא! {∅} מכילה איבר אחד (את ∅ עצמה), ואילו ∅ ריקה.\n• האם ∅ ∈ A לכל קבוצה A? לא בהכרח — ∅ היא קבוצה, לא בהכרח איבר של כל קבוצה.\n• האם ∅ ⊆ A לכל קבוצה A? כן! הקבוצה הריקה היא תת-קבוצה של כל קבוצה (ריקנות ואקואית).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-pairing',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת הזוג (Pairing)',
    kind: 'definition',
    content:
      'לכל שתי קבוצות A וB קיימת קבוצה C = {A, B} שאיבריה הם (רק) A וB.\n\nדוגמה: עבור A = {1,5} וB = {7,5,9}, קיימת {{1,5},{7,5,9}}.\n\nיחידון (singleton): קבוצה עם איבר יחיד, כגון {5}, {∅}, {A}.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-union',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת האיחוד (Union)',
    kind: 'definition',
    content:
      'האיחוד של איברי קבוצה מהווה קבוצה.\n\nדוגמאות:\n• איחוד {A,B} = A∪B\n• איחוד {{6,5},{1},{6,9,1}} = {6,5,1,9}',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-foundation',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת היסוד (Foundation / Regularity)',
    kind: 'definition',
    content:
      'בכל קבוצה לא ריקה A יש איבר B כך שA וB הן קבוצות זרות (אין להן איברים משותפים).\n\nמשמעות: אקסיומה זו שוללת את האפשרות שקבוצה תהיה איבר של עצמה — כלומר A ∉ A לכל קבוצה A.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-infinity',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת האינסוף (Infinity)',
    kind: 'definition',
    content:
      'קיימת קבוצה לא ריקה A כך שלכל איבר x של A, גם {x} הוא איבר של A.\n\nמשמעות: קיימת קבוצה אינסופית. ניח שx∈A, אז {x}∈A, ולכן {{x}}∈A, וכן הלאה — תמיד קיים עוד איבר.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-powerset',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת החזקה (Power Set)',
    kind: 'definition',
    content:
      'לכל קבוצה A קיימת קבוצה B שאיבריה הם כל תת-הקבוצות של A.\n\nקבוצת החזקה של A מסומנת P(A) או 2ᴬ.\n\nדוגמאות:\n• A = {x,y}  →  P(A) = {∅, {x}, {y}, {x,y}}  (4 איברים)\n• A = ∅  →  P(∅) = {∅}  (1 איבר)\n• אם |A| = n אז |P(A)| = 2ⁿ',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-replacement',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת ההחלפה (Replacement)',
    kind: 'definition',
    content:
      'לכל קבוצה A ומיפוי m, הקבוצה B הנוצרת מA ע"י החלפת כל איבר x בA באיבר m(x) היא קבוצה.\n\nדוגמה: A = {3,1,7}, m(i) = i+1  →  B = {4,2,8}.\n\nהערה: זו סכימה של אקסיומה — יש מופע של האקסיומה לכל מיפוי m.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-separation',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת ההפרדה (Separation)',
    kind: 'definition',
    content:
      'לכל קבוצה A ותכונה P, קיימת הקבוצה {x∈A | P(x)}.\n\nכלומר: ניתן לסנן תת-קבוצה מקבוצה קיימת לפי תכונה — אך לא ניתן לבנות קבוצה כללית {x | P(x)} בלי קבוצת-כתת קיימת (זה בדיוק מה שמונע את פרדוקס ראסל).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-axiom-choice',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אקסיומת הבחירה (Choice)',
    kind: 'definition',
    content:
      'לכל קבוצה A שאיבריה הם קבוצות לא ריקות, קיימת פונקציית בחירה f: A → ⋃A כך שלכל S∈A מתקיים f(S) ∈ S.\n\nבמילים: ניתן לבחור איבר אחד מכל קבוצה באוסף.\n\nהאקסיומה אינה קונסטרוקטיבית — היא אומרת שפונקציית הבחירה קיימת אך לא מסבירה כיצד לבנותה.\n\nעובדות היסטוריות:\n• קורט גדל הראה ב-1936: האקסיומה עקבית עם ZF.\n• פול כהן הראה ב-1963: שלילת האקסיומה גם עקבית עם ZF.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },

  // ── Atoms & Representing Entities ─────────────────────────────────────────
  {
    id: 'logic-w1-def-atoms',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'אטומים (Urelements)',
    kind: 'definition',
    content:
      'אטומים הם עצמים בסיסיים שאינם קבוצות — איברים שאינם מכילים איברים בעצמם (כמו מספרים טבעיים, פירות וכו\').\n\nב-ZFC הקלאסית אין אטומים מלבד הקבוצה הריקה. בגרסאות אחרות (כגון ZFA) ישנם אטומים.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-def-numbers-zfc',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'ייצוג מספרים ב-ZFC',
    kind: 'definition',
    content:
      'מספרים טבעיים מיוצגים כקבוצות:\n\n• 0 := ∅\n• 1 := {∅} = {0}\n• 2 := {∅, {∅}} = {0, 1}\n• n := {0, 1, 2, ..., n−1}\n\nכלומר: המספר n מיוצג על ידי קבוצה בת n איברים.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-def-ordered-pair',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'זוג סדור (Ordered Pair)',
    kind: 'definition',
    content:
      'האיברים בקבוצה אינם סדורים. לצורך ייצוג זוג סדור ⟨x,y⟩, ההגדרה המקובלת היא:\n\n⟨x,y⟩ := {{x}, {x,y}}\n\nדוגמה: ⟨3,7⟩ = {{3},{3,7}}\n\nהרחבה לסדרות:\n⟨x₁,x₂,...,xₙ⟩ := ⟨x₁,⟨x₂,...,xₙ⟩⟩\n\nדוגמה: ⟨2,3,7⟩ = {{2},{2,{{3},{3,7}}}}',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
  {
    id: 'logic-w1-thm-ordered-pair',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    title: 'משפט: תקינות ייצוג הזוג הסדור',
    kind: 'theorem',
    content:
      '⟨a,b⟩ = ⟨x,y⟩  אמ"מ  a = x וb = y.\n\nמשמעות: ייצוג הזוג הסדור תקין — הוא שומר על הסדר.\n\nהוכחה (סקיצה):\n(⟸) טריוויאלי — אם a=x וb=y אז הקבוצות זהות.\n(⟹) נניח {{a},{a,b}} = {{x},{x,y}}. נפריד לשני מקרים:\n• מקרה I (a=b): מהשוויון נקבל {a} = {x,y}, ולכן a=x=y, ולבסוף a=x וb=y. ✓\n• מקרה II (a≠b): {a} חייב להיות אחד האיברים של D = {{x},{x,y}}. נובע a=x, ומכאן b=y. ✓',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'logic-w1-lecture',
  },
];

// ─── Data Structures — Week 1 ─────────────────────────────────────────────────

topics.push(
  {
    id: 'ds-w1-intro',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    title: 'מבוא: אלגוריתמים ומבני נתונים',
    summary: 'מהו אלגוריתם, מהו מבנה נתונים, פתרון בעיות חישוביות, בעיית המיון, אלגוריתם Insertion Sort.',
    patterns: ['הגדרת אלגוריתם', 'בעיית המיון', 'Insertion Sort'],
  },
  {
    id: 'ds-w1-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    title: 'מבני נתונים בסיסיים ו-ADT',
    summary: 'הגדרת ADT, Sequence/Stack/Queue/Deque ADTs, מבני נתונים אלמנטריים, מימוש Sequence עם מערך ומערך מעגלי.',
    patterns: ['ADT', 'Sequence ADT', 'Stack / Queue / Deque', 'מימוש עם מערך'],
  },
);

sourceDocuments.push({
  id: 'ds-w1-lecture',
  courseId: 'data-structures',
  weekId: 'ds-w1',
  type: 'lecture',
  name: 'הרצאה 1 — מבוא: אלגוריתמים, מבני נתונים ו-ADT',
  topicIds: ['ds-w1-intro', 'ds-w1-adt'],
  processed: true,
});

weeks.push({
  id: 'ds-w1',
  courseId: 'data-structures',
  number: 1,
  title: 'מבוא: אלגוריתמים, מבני נתונים ו-ADT',
  summary:
    'מהו אלגוריתם ומהו מבנה נתונים. בעיית המיון ואלגוריתם Insertion Sort. מבני נתונים אלמנטריים (מערך, מחסנית, תור, רשימה מקושרת, עץ). הגדרת ADT ו-Sequence / Stack / Queue / Deque ADTs. מימוש Sequence ADT עם מערך ומערך מעגלי.',
  topicIds: ['ds-w1-intro', 'ds-w1-adt'],
  lectureItemIds: [
    'ds-w1-def-algorithm',
    'ds-w1-def-data-structure',
    'ds-w1-concept-problem-solving',
    'ds-w1-def-sorting',
    'ds-w1-algo-insertion-sort',
    'ds-w1-concept-pseudocode',
    'ds-w1-def-elementary-ds',
    'ds-w1-def-adt',
    'ds-w1-def-sequence-adt',
    'ds-w1-def-stack-adt',
    'ds-w1-def-queue-adt',
    'ds-w1-def-deque-adt',
    'ds-w1-concept-adt-vs-ds',
    'ds-w1-impl-sequence-array',
    'ds-w1-impl-retrieve-insert-last',
    'ds-w1-impl-insert-at',
    'ds-w1-impl-circular-array',
  ],
  tutorialQuestionIds: [],
  homeworkQuestionIds: [],
  examQuestionIds: [],
  reviewHighlights: [
    'מבנה נתונים = מבנה + אלגוריתמים; ADT = ממשק לוגי בלבד',
    'Insertion Sort: O(n²) גרוע ביותר, O(n) מקרה הטוב',
    'Sequence עם מערך: Retrieve O(1), Insert/Delete-Last O(1), Insert(i)/Delete(i) O(n−i+1)',
    'מערך מעגלי: Insert/Delete-First ו-Insert/Delete-Last כולם O(1)',
  ],
});

theoryItems.push(
  // ── Intro: Algorithms & Data Structures ────────────────────────────────────
  {
    id: 'ds-w1-def-algorithm',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'אלגוריתם',
    kind: 'definition',
    content:
      'אלגוריתם הוא רצף סופי ומוגדר היטב של פעולות לפתרון בעיה חישובית.\n\nמאפיינים:\n• קלט (Input): ערכים המוזנים לאלגוריתם.\n• פלט (Output): ערכים המיוצרים בסיום הריצה.\n• נכונות: לכל קלט חוקי האלגוריתם מייצר את הפלט הנכון.\n• יעילות: הפתרון מבוצע במשאבים סבירים (זמן, זיכרון).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-data-structure',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'מבנה נתונים',
    kind: 'definition',
    content:
      'מבנה נתונים = מבנה לאחסון נתונים + אלגוריתמים לביצוע פעולות עליו.\n\nהמטרה: לאפשר ביצוע פעולות בצורה יעילה.\n\nבמהלך הקורס נלמד: מערך, מחסנית, תור, רשימה מקושרת, עץ בינארי, ערמה, גרפים ועוד.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-concept-problem-solving',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'פתרון בעיה חישובית',
    kind: 'concept',
    content:
      'שלבים לפתרון בעיה חישובית:\n1. הגדרת הבעיה (קלט ↦ פלט).\n2. תכנון אלגוריתם.\n3. הוכחת נכונות (correctness).\n4. ניתוח סיבוכיות (complexity).\n5. מימוש וניפוי שגיאות.\n\nדוגמה: בעיית חיפוש — נתון מערך ומספר x; האם x מופיע במערך? אם כן, באיזה אינדקס?',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-sorting',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'בעיית המיון (Sorting Problem)',
    kind: 'definition',
    content:
      'קלט: סדרה של n מספרים ⟨a₁, a₂, ..., aₙ⟩.\nפלט: תמורה (permutation) של הסדרה ⟨a\'₁, a\'₂, ..., a\'ₙ⟩ כך שa\'₁ ≤ a\'₂ ≤ ... ≤ a\'ₙ.\n\nדוגמה: קלט ⟨31, 41, 59, 26, 41, 58⟩ → פלט ⟨26, 31, 41, 41, 58, 59⟩.\n\nבעיית המיון היא הבסיס ללמידת אלגוריתמים — נדון בה לאורך הקורס.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-algo-insertion-sort',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'Insertion Sort (מיון הכנסה)',
    kind: 'concept',
    content:
      'רעיון: בכל שלב, הכנס את הקלף הבא למקומו הנכון בחלק הממוין.\n\nדוגמה: [3,6,2,8,4]\n• i=1: key=6, [3,6,2,8,4] — 6>3, נשאר במקום\n• i=2: key=2, הזזה ימינה → [2,3,6,8,4]\n• i=3: key=8, [2,3,6,8,4] — 8>6, נשאר\n• i=4: key=4, הזזה ימינה → [2,3,4,6,8]\n\nפסאודו-קוד:\nInsertionSort(A, n):\n  for i ← 1 to n−1 do\n    key ← A[i]\n    j ← i − 1\n    while j ≥ 0 and A[j] > key do\n      A[j+1] ← A[j]\n      j ← j − 1\n    A[j+1] ← key\n\nסיבוכיות:\n• גרוע ביותר (מיון יורד): O(n²)\n• טוב ביותר (ממוין): O(n)',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-concept-pseudocode',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    title: 'פסאודו-קוד (Pseudocode)',
    kind: 'concept',
    content:
      'פסאודו-קוד הוא תיאור אלגוריתם בשפה לא-פורמלית, בין שפה טבעית לבין שפת תכנות.\n\nמטרה: לתאר את האלגוריתם בצורה ברורה ומדויקת מבלי להיקשר לשפת תכנות ספציפית.\n\nמוסכמות נפוצות:\n• השמה: x ← 5\n• לולאות: for, while\n• תנאים: if … then … else\n• פונקציות: Function name(params)\n• כניסה: מרווח (indentation) או │',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },

  // ── ADT & Elementary Data Structures ────────────────────────────────────────
  {
    id: 'ds-w1-def-elementary-ds',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'מבני נתונים אלמנטריים',
    kind: 'concept',
    content:
      'מבני הנתונים הבסיסיים הנפוצים:\n\n• מערך (Array): רצף רציף בזיכרון; גישה אקראית O(1).\n• מחסנית (Stack): LIFO — Last In, First Out.\n• תור (Queue): FIFO — First In, First Out.\n• רשימה מקושרת (Linked List): צמתים המחוברים בפוינטרים.\n• עץ (Tree): מבנה היררכי עם שורש, הורים וילדים.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'ADT — Abstract Data Type (טיפוס נתונים מופשט)',
    kind: 'definition',
    content:
      'ADT מגדיר מה ניתן לעשות על מבנה נתונים — ללא פרטי המימוש.\n\nADT = קבוצת ערכים + קבוצת פעולות מוגדרות עליהם.\n\nהבחנה חשובה:\n• ADT — הממשק הלוגי (מה)\n• Data Structure — מבנה אחסון קונקרטי (איך)\n• Implementation — קוד ספציפי\n\nיתרון: ניתן לשנות מימוש מבלי לשנות קוד המשתמש ב-ADT.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-sequence-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'Sequence ADT',
    kind: 'definition',
    content:
      'Sequence הוא ADT המייצג סדרה סדורה של איברים: S = ⟨a₀, a₁, ..., aₙ₋₁⟩.\n\nפעולות:\n• Build(x₁,...,xₙ) — בניית סדרה מn איברים\n• Length(S) — מספר האיברים\n• Retrieve(S, i) — קריאת האיבר במיקום i (0-based)\n• Store(S, i, b) — עדכון האיבר במיקום i לערך b\n• Insert(S, i, b) — הכנסת b במיקום i; האיברים מi ואילך מוזזים ימינה\n• Delete(S, i) — מחיקת האיבר במיקום i; האיברים שאחריו מוזזים שמאלה\n• Insert-Last(S, b) — הוספה לסוף; שקול לInsert(S, n, b)\n• Delete-Last(S) — מחיקה מהסוף',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-stack-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'Stack ADT (מחסנית)',
    kind: 'definition',
    content:
      'Stack הוא ADT עם מדיניות גישה LIFO — Last In, First Out.\n\nפעולות:\n• Push(S, b) — הכנסת b לראש המחסנית [= Insert-Last]\n• Pop(S) — הוצאת האיבר מראש המחסנית [= Delete-Last]\n• Top(S) — קריאת ראש המחסנית ללא הוצאה [= Retrieve(S, n−1)]\n• IsEmpty(S) — בדיקה אם המחסנית ריקה\n\nמחסנית היא Sequence מוגבל — רק גישה לקצה אחד.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-queue-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'Queue ADT (תור)',
    kind: 'definition',
    content:
      'Queue הוא ADT עם מדיניות גישה FIFO — First In, First Out.\n\nפעולות:\n• Enqueue(Q, b) — הכנסת b לזנב התור [= Insert-Last]\n• Dequeue(Q) — הוצאת האיבר מראש התור [= Delete-First]\n• Head(Q) — קריאת ראש התור ללא הוצאה [= Retrieve(Q, 0)]\n• IsEmpty(Q) — בדיקה אם התור ריק\n\nתור = גישה לשני קצות: הכנסה לסוף, הוצאה מהתחלה.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-def-deque-adt',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'Deque ADT (תור דו-כיווני)',
    kind: 'definition',
    content:
      'Deque (Double-Ended Queue) מאפשר הכנסה והוצאה משני קצות.\n\nפעולות:\n• Insert-First(D, b) — הכנסה לתחילה\n• Delete-First(D) — הוצאה מהתחילה\n• Insert-Last(D, b) — הכנסה לסוף\n• Delete-Last(D) — הוצאה מהסוף\n\nDeque מכליל גם Stack וגם Queue:\n• Stack = Deque עם גישה לקצה אחד בלבד\n• Queue = Deque עם Insert-Last וDelete-First',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-concept-adt-vs-ds',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'ADT לעומת מבנה נתונים לעומת מימוש',
    kind: 'concept',
    content:
      'שלוש רמות של הפשטה:\n\n1. ADT — מה ניתן לעשות (ממשק לוגי, ללא קשר למבנה)\n   דוגמה: Sequence ADT עם Retrieve, Insert, Delete...\n\n2. Data Structure — מבנה האחסון הקונקרטי\n   דוגמה: מימוש Sequence עם מערך, או עם רשימה מקושרת\n\n3. Implementation — קוד ספציפי בשפת תכנות\n   דוגמה: קוד ב-C++/Java/Python\n\nאותו ADT יכול להיות ממומש ע"י מבני נתונים שונים, עם מאפייני ביצועים שונים.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },

  // ── Sequence ADT — Array Implementation ─────────────────────────────────────
  {
    id: 'ds-w1-impl-sequence-array',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'מימוש Sequence עם מערך — סיבוכיות',
    kind: 'concept',
    content:
      'מבנה: שמירת המערך בגודל M (maxlen) ידוע מראש, עם שדה length = n.\n\nסיבוכיות:\n• Retrieve(S, i) — O(1): גישה ישירה לאינדקס\n• Insert-Last(S, b) — O(1): כתיבה לתא [n], הגדלת n\n• Delete-Last(S) — O(1): הקטנת n\n• Insert(S, i, b) — O(n−i+1): יש להזיז n−i איברים ימינה\n• Delete(S, i) — O(n−i+1): יש להזיז n−i−1 איברים שמאלה\n\nמגבלה: יש לדעת את הגודל המקסימלי M מראש.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-impl-retrieve-insert-last',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'פסאודו-קוד: Retrieve ו-Insert-Last (מערך)',
    kind: 'concept',
    content:
      'Function Retrieve(S, i):\n  if i < 0 or i ≥ S.length then error\n  return S.array[i]\n\nFunction Insert-Last(S, b):\n  if S.length = S.maxlen then error\n  S.array[S.length] ← b\n  S.length ← S.length + 1\n\nDelete-Last דומה מאוד: מקטין את S.length ב-1 (האיבר "נעלם" ללא מחיקה אמיתית).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-impl-insert-at',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'פסאודו-קוד: Insert(S, i, b) (מערך)',
    kind: 'concept',
    content:
      'Function Insert(S, i, b):\n  if S.length = S.maxlen then error\n  for j ← S.length − 1 downto i do\n    │ S.array[j + 1] ← S.array[j]\n  S.array[i] ← b\n  S.length ← S.length + 1\n\nהסבר: הזזת כל האיברים החל מאינדקס i ימינה ב-1 (מהסוף לתחילה כדי לא לדרוס ערכים), ואז כתיבת b במיקום i.\n\nסיבוכיות: O(n−i+1) — מזיזים n−i איברים.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
  {
    id: 'ds-w1-impl-circular-array',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    title: 'מימוש Sequence עם מערך מעגלי (Circular Array)',
    kind: 'concept',
    content:
      'מוטיבציה: במערך רגיל, Insert-First וDelete-First הן O(n). המערך המעגלי מאפשר שני הקצות בO(1).\n\nמבנה: מוסיפים שדה start המצביע על תחילת הסדרה הלוגית.\n\nשדות: array, maxlen M, length n, start.\n\nהגישה הלוגית לאינדקס i ממופה לאינדקס פיזי: (start + i) mod maxlen\n\nFunction Retrieve(S, i):\n  if i < 0 or i ≥ S.length then error\n  return S.array[(S.start + i) mod S.maxlen]\n\nהאזור התפוס יכול לעבור את קצה המערך ולהמשיך מהתחילה (wrap around).\n\nתוצאה: Insert/Delete-First ו-Insert/Delete-Last כולם O(1).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
  },
);

export const questions: PlatformQuestion[] = [];

// ─── Helper functions ────────────────────────────────────────────────────────

export function getCourseById(courseId: CourseId) {
  return courses.find((course) => course.id === courseId);
}

export function getCourseTopics(courseId: CourseId) {
  return topics.filter((topic) => topic.courseId === courseId);
}

export function getCourseWeeks(courseId: CourseId) {
  return weeks.filter((week) => week.courseId === courseId);
}

export function getCourseQuestions(courseId: CourseId) {
  return questions.filter((question) => question.courseId === courseId);
}

export function getCourseTheoryItems(courseId: CourseId) {
  return theoryItems.filter((item) => item.courseId === courseId);
}

export function getCourseSources(courseId: CourseId) {
  return sourceDocuments.filter((document) => document.courseId === courseId);
}

export function getWeekById(courseId: CourseId, weekId: string) {
  return getCourseWeeks(courseId).find((week) => week.id === weekId);
}

export function getQuestionById(courseId: CourseId, questionIdValue: string) {
  return getCourseQuestions(courseId).find((question) => question.id === questionIdValue);
}

export function getTheoryItemsForWeek(weekId: string) {
  return theoryItems.filter((item) => item.weekId === weekId);
}

export function getQuestionsForWeek(weekId: string) {
  return questions.filter((question) => question.weekId === weekId);
}

export function getTopicById(topicId: string) {
  return topics.find((topic) => topic.id === topicId);
}

export function getQuestionsForTopic(courseId: CourseId, topicId: string) {
  return getCourseQuestions(courseId).filter((question) => question.topicId === topicId);
}

export function getTheoryItemsForTopic(courseId: CourseId, topicId: string) {
  return getCourseTheoryItems(courseId).filter((item) => item.topicId === topicId);
}

export function getSourceDocumentById(documentId: string) {
  return sourceDocuments.find((document) => document.id === documentId);
}
