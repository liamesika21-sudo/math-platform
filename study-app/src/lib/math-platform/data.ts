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
  {
    id: 'logic-w1-tutorial1',
    courseId: 'logic',
    weekId: 'logic-w1',
    type: 'tutorial',
    name: 'תרגול 1 — איחוד וחיתוך גדולים, ZFC, זוג סדור',
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
    tutorialQuestionIds: [
      'logic-w1-t1-q1',
      'logic-w1-t1-q2',
      'logic-w1-t1-q3',
      'logic-w1-t1-q4',
      'logic-w1-t1-q5',
      'logic-w1-t1-q6',
      'logic-w1-t1-q7',
    ],
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

// ─── Logic — Week 2 ──────────────────────────────────────────────────────────

topics.push(
  {
    id: 'logic-w2-cardinality',
    courseId: 'logic',
    weekId: 'logic-w2',
    title: 'עוצמה והשוואת קבוצות',
    summary: 'הגדרת עוצמה (cardinality), קבוצות שקולות באמצעות פונקציית שקילות (bijection), סדר עוצמות ≤ ו-<.',
    patterns: ['עוצמה |A|', 'שקילות A~B', 'סדר עוצמות |A|≤|B|'],
  },
  {
    id: 'logic-w2-functions',
    courseId: 'logic',
    weekId: 'logic-w2',
    title: 'פונקציות — סוגים ותכונות',
    summary: 'פונקציה חלקית ומלאה, חח"ע (injective), על (onto), שקילות (bijection), פונקציה הופכית והרכבה.',
    patterns: ['פונקציה מלאה/חלקית', 'חח"ע ועל', 'הרכבת פונקציות'],
  },
  {
    id: 'logic-w2-equivalence-order',
    courseId: 'logic',
    weekId: 'logic-w2',
    title: 'יחסי שקילות וסדר',
    summary: 'יחס שקילות (רפלקסיבי, סימטרי, טרנזיטיבי), יחס סדר מלא חלש, שקילות קבוצות כיחס שקילות וסדר עוצמות כיחס סדר.',
    patterns: ['יחס שקילות', 'יחס סדר מלא חלש', 'רפלקסיבי/סימטרי/טרנזיטיבי'],
  },
  {
    id: 'logic-w2-finite-infinite',
    courseId: 'logic',
    weekId: 'logic-w2',
    title: 'קבוצות סופיות ואינסופיות',
    summary: 'הגדרת קבוצה אינסופית כשקולה לתת-קבוצה ממש שלה, קבוצה סופית, ומשפטים נלווים.',
    patterns: ['קבוצה אינסופית', 'קבוצה סופית', 'תת-קבוצה של אינסופית'],
  },
);

sourceDocuments.push(
  {
    id: 'logic-w2-lecture',
    courseId: 'logic',
    weekId: 'logic-w2',
    type: 'lecture',
    name: 'הרצאה 2 — השוואת קבוצות',
    topicIds: ['logic-w2-cardinality', 'logic-w2-functions', 'logic-w2-equivalence-order', 'logic-w2-finite-infinite'],
    processed: true,
  },
  {
    id: 'logic-w2-tutorial2',
    courseId: 'logic',
    weekId: 'logic-w2',
    type: 'tutorial',
    name: 'תרגול 2 — עוצמה, קבוצות סופיות ואינסופיות, סדר עוצמות',
    topicIds: ['logic-w2-cardinality', 'logic-w2-equivalence-order', 'logic-w2-finite-infinite'],
    processed: true,
  },
);

weeks.push(
  {
    id: 'logic-w2',
    courseId: 'logic',
    number: 2,
    title: 'השוואת קבוצות',
    summary:
      'כיצד משווים גודל של קבוצות? עוצמה (cardinality), קבוצות שקולות ופונקציית שקילות (bijection). סוגי פונקציות: מלאה, חלקית, חח"ע, על. פונקציה הופכית והרכבה. יחסי שקילות וסדר. סדר עוצמות ≤ ו-<. קבוצות סופיות ואינסופיות.',
    topicIds: ['logic-w2-cardinality', 'logic-w2-functions', 'logic-w2-equivalence-order', 'logic-w2-finite-infinite'],
    lectureItemIds: [
      'logic-w2-def-cardinality',
      'logic-w2-def-equivalent-sets',
      'logic-w2-concept-galileo',
      'logic-w2-def-function',
      'logic-w2-def-total',
      'logic-w2-def-injective',
      'logic-w2-def-surjective',
      'logic-w2-def-bijection',
      'logic-w2-def-partial-total',
      'logic-w2-def-inverse',
      'logic-w2-def-composition',
      'logic-w2-def-equivalence-relation',
      'logic-w2-thm-set-equivalence-is-equiv',
      'logic-w2-def-cardinality-order',
      'logic-w2-thm-onto-iff-leq',
      'logic-w2-thm-leq-weak-total-order',
      'logic-w2-def-strictly-smaller',
      'logic-w2-def-infinite-set',
      'logic-w2-def-finite-set',
      'logic-w2-thm-superset-infinite',
      'logic-w2-thm-equiv-infinite',
    ],
    tutorialQuestionIds: [
      'logic-w2-t2-hw-thm2',
      'logic-w2-t2-q1',
      'logic-w2-t2-q2',
      'logic-w2-t2-q3',
      'logic-w2-t2-q4',
      'logic-w2-t2-q5',
      'logic-w2-t2-q6',
      'logic-w2-t2-q7',
    ],
    homeworkQuestionIds: [],
    examQuestionIds: [],
    reviewHighlights: [
      'עוצמה: |A|=|B| אמ"מ קיימת bijection בין A ל-B',
      'פרדוקס גלילאו — ריבועי הטבעיים שקולים לטבעיים',
      'יחס שקילות: רפלקסיבי + סימטרי + טרנזיטיבי',
      '|A|≤|B| אמ"מ יש פונ׳ מלאה וחח"ע מ-A ל-B',
      'קבוצה אינסופית ⟺ שקולה לתת-קבוצה ממש שלה',
    ],
    lectureSummaryUrl: '/lecture-summaries/logic-w2.html',
  },
);

theoryItems.push(
  // ── Cardinality & Equivalent Sets ─────────────────────────────────────────
  {
    id: 'logic-w2-def-cardinality',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    title: 'עוצמה (Cardinality)',
    kind: 'definition',
    content:
      'ה-"גודל" של קבוצה A יסומן |A| ויכונה עוצמה (cardinality).\n\nדוגמאות:\n• |{8,9,4}| = 3\n• |{10¹⁰⁰, 999}| = 2\n• |{a,b,c,d,e,f}| = 6\n• |ℕ| = ?\n• |ℝ| = ?',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-equivalent-sets',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    title: 'קבוצות שקולות — |A|=|B|, A∼B',
    kind: 'definition',
    content:
      'קבוצות A ו-B הינן שוות עוצמה, או שקולות (equivalent), ונסמן זאת ע"י |A|=|B| או A∼B, אם קיימת פונקציית שקילות (bijection) ביניהן.\n\nכלומר, פונקציה מלאה, חד-חד ערכית ועל מ-A ל-B.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-concept-galileo',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    title: 'הפרדוקס של גלילאו גלילי (1638)',
    kind: 'concept',
    content:
      'הקבוצה של ריבועי המספרים הטבעיים (0², 1², 2², 3², …) מוכלת ממש בקבוצת כל הטבעיים ℕ, אך ישנה התאמה מלאה ביניהן באמצעות הפונקציה f(n)=n².\n\nמשמעות: קבוצה אינסופית יכולה להיות שקולה לתת-קבוצה ממש שלה — תכונה ייחודית לקבוצות אינסופיות.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },

  // ── Functions ─────────────────────────────────────────────────────────────
  {
    id: 'logic-w2-def-function',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'פונקציה',
    kind: 'definition',
    content:
      'פונקציה הינה מיפוי מקבוצה A (התחום) לקבוצה B (הקו-תחום). התחום והקו-תחום יכולים להיות זהים או שונים.\n\nפונקציה חייבת להיות מוגדרת היטב (Well defined): כל איבר בתחום ממופה לעד איבר אחד בקו-תחום.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-total',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'פונקציה מלאה (Total)',
    kind: 'definition',
    content:
      'פונקציה מלאה (total) — כל איברי A ממופים. כלומר, לכל a∈A קיים b∈B כך ש-f(a)=b.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-injective',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'חד-חד ערכית (Injective, 1-1)',
    kind: 'definition',
    content:
      'פונקציה חח"ע (Injective, 1-1) — אין אף איבר ב-B אשר ממופים אליו יותר מאיבר אחד מ-A.\n\nפורמלית: לכל a₁,a₂∈A, אם f(a₁)=f(a₂) אז a₁=a₂.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-surjective',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'על (Onto / Surjective)',
    kind: 'definition',
    content:
      'פונקציה על (Onto / Surjective) — אם יש מיפוי אל כל איברי B. כלומר, לכל b∈B קיים a∈A כך ש-f(a)=b.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-bijection',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'פונקציית שקילות (Bijection)',
    kind: 'definition',
    content:
      'פונקציית שקילות (bijection) היא פונקציה שהיא מלאה, חד-חד ערכית ועל. מסומנת f:A↔B.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-partial-total',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'פונקציה חלקית ומלאה',
    kind: 'definition',
    content:
      'כל פונקציה (שכמובן מוגדרת היטב) הינה פונקציה חלקית (partial function). חלק מהפונקציות החלקיות הינן גם מלאות (total function).\n\nהערה: בקורס מתמטיקה בדידה עסקתם רק בפונקציות מלאות. בקורס זה אנו עוסקים גם בפונקציות שאינן מלאות.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-inverse',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'פונקציה הופכית (Inverse)',
    kind: 'definition',
    content:
      'לפונקציה מלאה ו-חח"ע f:A→B יש פונקציה הופכית (שמאלית) f⁻¹:B→A, שהינה חח"ע ועל (אולי לא מלאה).\n\nלפונקציית שקילות (מלאה, חח"ע ועל) f:A↔B יש פונקציה הופכית f⁻¹:B↔A שהיא גם מלאה, חח"ע ועל.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-composition',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-functions',
    title: 'הרכבת פונקציות (Composition)',
    kind: 'definition',
    content:
      'ההרכבה (composition) של פונקציות f:A→B ו-g:B→C מוגדרת להיות הפונקציה g∘f(x) := g(f(x)).\n\nהרכבה של פונקציות שקילות הינה גם כן פונקציית שקילות.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },

  // ── Equivalence & Order Relations ─────────────────────────────────────────
  {
    id: 'logic-w2-def-equivalence-relation',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: 'יחס שקילות (Equivalence Relation)',
    kind: 'definition',
    content:
      'יחס R הינו יחס שקילות אם הוא:\n• רפלקסיבי (Reflexive): לכל x, xRx.\n• סימטרי (Symmetric): לכל x ו-y, xRy אמ"מ yRx.\n• טרנזיטיבי (Transitive): לכל x, y ו-z, אם xRy ו-yRz אז xRz.\n\nדוגמאות: יחס השוויון "=", אח/אחות של, אותה אזרחות, משולשים דומים.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-thm-set-equivalence-is-equiv',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: 'שקילות קבוצות הוא יחס שקילות',
    kind: 'theorem',
    content:
      'היחס של שקילות קבוצות (אותה העוצמה) הוא אכן יחס שקילות:\n\n• רפלקסיבי: לכל קבוצה A, A∼A (פונקציית הזהות).\n• סימטרי: לכל A ו-B, מתקיים ש- A∼B אמ"מ B∼A (הפונקציה ההופכית).\n• טרנזיטיבי: לכל A, B ו-C, אם A∼B ו-B∼C אז A∼C (הרכבת פונקציות שקילות).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-cardinality-order',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: 'סדר עוצמות — |A|≤|B|',
    kind: 'definition',
    content:
      'קבוצה A קטנה או שוות-עוצמה לקבוצה B, בסימון |A|≤|B|, אם יש פונקציה מלאה ו-חח"ע מ-A ל-B.\n\nהגדרה חלופית: |A|≤|B| אמ"מ יש פונקציה (חלקית או מלאה) מ-B על A.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-thm-onto-iff-leq',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: 'משפט: |A|≤|B| אמ"מ יש פונ׳ מ-B על A',
    kind: 'theorem',
    content:
      'לכל שתי קבוצות לא ריקות A ו-B, מתקיים ש- |A|≤|B| אמ"מ יש פונ׳ מלאה מ-B על A.\n\nהוכחה:\n(א) אם |A|≤|B| אז יש פונ׳ מלאה מ-B על A — בונים פונקציה מ-B שמכסה את כל A.\n(ב) אם יש פונ׳ מ-B על A אז |A|≤|B| — בונים פונ׳ חח"ע מ-A ל-B ע"י בחירת מקור לכל איבר.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-thm-leq-weak-total-order',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: '|A|≤|B| הינו יחס סדר מלא חלש',
    kind: 'theorem',
    content:
      'אכן ניתן להשתמש ביחס השוואת העוצמות כמצופה מיחס סדר. לכל קבוצות A, B ו-C:\n\n• מלא: |A|≤|B| או |B|≤|A|.\n• רפלקסיבי: |A|≤|A|.\n• אנטי-סימטרי: אם |A|≤|B| ו-|B|≤|A| אז |A|=|B|.\n• טרנזיטיבי: אם |A|≤|B| ו-|B|≤|C| אז |A|≤|C|.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-strictly-smaller',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    title: 'קטנה ממש — |A|<|B|',
    kind: 'definition',
    content:
      'עבור קבוצות A ו-B, נגדיר ש-A קטנה ממש מ-B (strictly smaller), ונסמן |A|<|B|, אם |A|≤|B| ו-|A|≠|B|.\n\nכלומר, כאשר קיימת פונ׳ מלאה וחח"ע מ-A ל-B ולא קיימת פונקציית שקילות מ-B ל-A.\n\nדוגמאות:\n• |{4,1,2}| < |{2,8}| ✗\n• |{7,8,9}| < |ℕ| ✓\n• |ℤ| ≮ |ℕ| (כי ℤ∼ℕ)\n• |ℕ| <? |ℝ| (בהמשך...)',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },

  // ── Finite & Infinite Sets ────────────────────────────────────────────────
  {
    id: 'logic-w2-def-infinite-set',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-finite-infinite',
    title: 'קבוצה אינסופית',
    kind: 'definition',
    content:
      'קבוצה הינה אינסופית אם היא שקולה לתת-קבוצה ממש שלה.\n\nדוגמאות: ℕ אינסופית (f(n)=n+1 היא שקילות מ-ℕ ל-ℕ\\{0}), ℝ אינסופית.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-def-finite-set',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-finite-infinite',
    title: 'קבוצה סופית',
    kind: 'definition',
    content:
      'קבוצה הינה סופית אם היא לא אינסופית.\n\nדוגמאות: ∅ סופית, {1,5} סופית, לכל n∈ℕ הקבוצה {0,1,…,n−1} סופית.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-thm-superset-infinite',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-finite-infinite',
    title: 'משפט: על-קבוצה של אינסופית היא אינסופית',
    kind: 'theorem',
    content:
      'אם A אינסופית ו-A ⊆ B אז B אינסופית.\n\nהוכחה: מהיות A אינסופית, קיימות S ⊂ A ו-f:A→S הפיכה. מרחיבים את f ל-B ומקבלים שקילות לתת-קבוצה ממש של B.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
  {
    id: 'logic-w2-thm-equiv-infinite',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-finite-infinite',
    title: 'משפט: שקולה לאינסופית — אינסופית',
    kind: 'theorem',
    content:
      'אם A אינסופית ו-A∼B אז B אינסופית.\n\nמסקנה: אם A סופית ו-A∼B אז B סופית.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'logic-w2-lecture',
  },
);

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
  {
    id: 'ds-w1-linked-lists',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    title: 'רשימות מקושרות ומערכים דינמיים',
    summary: 'מימוש Sequence עם רשימה מקושרת יחידה ועם רשימה מקושרת כפולה. השוואת סיבוכיות עם מערך מעגלי. מערכים דינמיים עם הכפלה וניתוח amortized.',
    patterns: ['Singly Linked List', 'Doubly Linked List', 'Amortized Analysis', 'מערך דינמי'],
  },
);

sourceDocuments.push(
  {
    id: 'ds-w1-lecture',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    type: 'lecture',
    name: 'הרצאה 1 — מבוא: אלגוריתמים, מבני נתונים ו-ADT',
    topicIds: ['ds-w1-intro', 'ds-w1-adt', 'ds-w1-linked-lists'],
    processed: true,
  },
  {
    id: 'ds-w1-tutorial1',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    type: 'tutorial',
    name: 'תרגול 1 — ADT vs Implementation, יסודות מתמטיים, פסאודוקוד',
    topicIds: ['ds-w1-adt', 'ds-w1-linked-lists', 'ds-w1-intro'],
    processed: true,
  },
);

weeks.push({
  id: 'ds-w1',
  courseId: 'data-structures',
  number: 1,
  title: 'מבוא: אלגוריתמים, מבני נתונים ו-ADT',
  summary:
    'מהו אלגוריתם ומהו מבנה נתונים. בעיית המיון ואלגוריתם Insertion Sort. מבני נתונים אלמנטריים (מערך, מחסנית, תור, רשימה מקושרת, עץ). הגדרת ADT ו-Sequence / Stack / Queue / Deque ADTs. מימוש Sequence ADT עם מערך, מערך מעגלי, רשימה מקושרת יחידה וכפולה. מערכים דינמיים עם הכפלה וניתוח amortized.',
  topicIds: ['ds-w1-intro', 'ds-w1-adt', 'ds-w1-linked-lists'],
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
    'ds-w1-impl-singly-linked-list',
    'ds-w1-impl-sll-operations',
    'ds-w1-impl-doubly-linked-list',
    'ds-w1-concept-array-vs-list',
    'ds-w1-concept-dynamic-array',
    'ds-w1-concept-amortized',
  ],
  tutorialQuestionIds: [
    'ds-w1-t1-q1',
    'ds-w1-t1-q2',
    'ds-w1-t1-q3',
    'ds-w1-t1-q4',
    'ds-w1-t1-q5',
  ],
  homeworkQuestionIds: [],
  examQuestionIds: [],
  reviewHighlights: [
    'מבנה נתונים = מבנה + אלגוריתמים; ADT = ממשק לוגי בלבד',
    'Insertion Sort: O(n²) גרוע ביותר, O(n) מקרה הטוב',
    'מערך מעגלי: כל פעולות Insert/Delete-First/Last ב-O(1)',
    'רשימה מקושרת יחידה: Insert-First/Last, Delete-First ב-O(1); Delete/Delete-Last ב-O(n)',
    'רשימה מקושרת כפולה: Delete(A) ב-O(1) כי יש מצביע prev',
    'מערך דינמי (הכפלה): עלות amortized O(1) לInsert-Last; worst-case O(n)',
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

// ── DS Week 1: Linked Lists & Dynamic Arrays ────────────────────────────────
theoryItems.push(
  {
    id: 'ds-w1-impl-singly-linked-list',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'רשימה מקושרת יחידה (Singly Linked List) — מבנה ופעולות',
    kind: 'definition',
    content:
      'מבנה: שני סוגי אובייקטים.\n\nList object (L):\n• L.first — מצביע לצומת הראשון\n• L.last — מצביע לצומת האחרון\n• L.length — מספר האיברים\n\nList-Node object:\n• node.item — הערך המאוחסן\n• node.next — מצביע לצומת הבא (null בסוף)\n\nיתרונות לעומת מערך:\n• גודל לא חסום (unbounded size)\n• אין צורך להקצות מראש\n• סריקה ב-O(n)\n• שרשור (concat) ב-O(1)\n\nחיסרון: אין גישה אקראית O(1) — לא ניתן binary search.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 57,
  },
  {
    id: 'ds-w1-impl-sll-operations',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'רשימה מקושרת יחידה — פעולות ופסאודו-קוד',
    kind: 'concept',
    content:
      'סיבוכיות פעולות:\n• Insert-First(L,b): O(1) — יוצרים צומת B, B.next←L.first, L.first←B\n• Insert-Last(L,b): O(1) — דומה, מעדכן L.last\n• Delete-First(L): O(1) — L.first ← L.first.next\n• Retrieve(L,i): O(i+1) — חצייה מL.first עד הצומת ה-i\n• Insert(L,i,b): O(i+1) — חצייה ואז Insert-After\n• Delete(L,i): O(i+1) — חצייה ל-i−1, אחר כך Delete-After\n• Delete-Last(L): O(n) — חייבים לחצות עד הלפני-אחרון\n\nInsert-After(A,B) — פעולת עזר O(1):\n  B.next ← A.next\n  A.next ← B\n\nDelete-After(A) — O(1):\n  A.next ← A.next.next\n\nConcat(L₁,L₂) — O(1):\n  L₁.last.next ← L₂.first\n  L₁.last ← L₂.last\n  L₁.length ← L₁.length + L₂.length\n\nשימו לב: Delete-First ו-Insert-Last ב-O(1) כי יש L.last ו-L.first.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 61,
  },
  {
    id: 'ds-w1-impl-doubly-linked-list',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'רשימה מקושרת כפולה (Doubly Linked List)',
    kind: 'definition',
    content:
      'כל צומת מכיל שדה prev בנוסף ל-next:\n• node.prev — מצביע לצומת הקודם (null בראשון)\n• node.next — מצביע לצומת הבא (null באחרון)\n\nיתרון מרכזי: מחיקת צומת נתון A ב-O(1) — אין צורך לחצות!\n\nDelete(A) — O(1):\n  A.prev.next ← A.next\n  A.next.prev ← A.prev\n  (שים לב: A עצמו לא משתנה; יש לעדכן L.length ולטפל ב-edge cases)\n\nInsert-After(A,B) — O(1):\n  B.prev ← A\n  B.next ← A.next\n  A.next ← B\n  B.next.prev ← B\n\nתוצאה: Insert/Delete-Last ב-O(1); Concat ב-O(1).\n\nחיסרון: כל צומת צורך זיכרון נוסף לשדה prev.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 71,
  },
  {
    id: 'ds-w1-concept-array-vs-list',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'השוואה: מערך מעגלי לעומת רשימה מקושרת כפולה',
    kind: 'concept',
    content:
      'השוואת סיבוכיות (Circular Array vs. Doubly Linked List):\n\n| פעולה               | מערך מעגלי          | רשימה כפולה         |\n|---------------------|---------------------|---------------------|\n| Insert/Delete-First | O(1)                | O(1)                |\n| Insert/Delete-Last  | O(1)                | O(1)                |\n| Insert/Delete(i)    | O(min{i+1, n−i+1}) | O(min{i+1, n−i+1}) |\n| Retrieve(i)         | O(1)                | O(min{i+1, n−i+1}) |\n| Concat              | O(min{n₁,n₂}+1)    | O(1)                |\n\nמסקנה:\n• מערך מעגלי עדיף ב-Retrieve (גישה אקראית).\n• רשימה כפולה עדיפה ב-Concat ובמחיקת צומת נתון (כשיש מצביע ישיר לצומת).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 75,
  },
  {
    id: 'ds-w1-concept-dynamic-array',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'מערך דינמי — הכפלה בעת מילוי (Doubling)',
    kind: 'concept',
    content:
      'בעיה: מערך מעגלי דורש ידיעת גודל מקסימלי M מראש. מה עושים כשהמערך מתמלא?\n\nפתרון: כשהמערך מלא (length = maxlen) — מקצים מערך חדש בגודל 2M ומעתיקים.\n\nניתוח עלות n פעולות Insert-Last (כש-n=2^k):\n  עלות הכנסות: n\n  עלות העתקות: 1+2+4+...+n/2 = n−1\n  סה"כ: n + (n−1) = O(n)\n\nבמקרה כללי n=2^k+r: עלות ≤ n + 2n−1 = 3n−1 = O(n).\n\nמסקנה: עלות amortized של כל Insert-Last היא O(1).\nעלות worst-case של Insert-Last בודד: O(n) (כשמתרחשת הכפלה).',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 78,
  },
  {
    id: 'ds-w1-concept-amortized',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    title: 'ניתוח Amortized (מופחת)',
    kind: 'definition',
    content:
      'הגדרה: amort(op) הוא חסם amortized לפעולה op אמ"מ לכל n ולכל סדרה של n פעולות:\n  amort(op) ≥ Time(n × op) / n\n\nבמילים: amort(op) מגדיר חסם על העלות הממוצעת לפעולה על פני הסדרה הגרועה ביותר.\n\nשימושיות: כשמה שחשוב הוא זמן הסדרה כולה, לא כל פעולה בנפרד.\n\nהבדל מ-Average Case:\n• Amortized: ממוצע על סדרה גרועה ביותר.\n• Average Case: ממוצע על כל הקלטים האפשריים לפעולה בודדת.\n\nדוגמה — Insert-Last עם הכפלה:\n  worst(Insert-Last) = O(n)\n  amort(Insert-Last) = O(1)\n  Time(n × Insert-Last) ≤ n · amort(Insert-Last) = O(n)\n\nמתי להשתמש ב-worst-case? ביישומים real-time הדורשים כל פעולה בודדת מהירה.',
    sourceName: 'הרצאה 1',
    sourceDocumentId: 'ds-w1-lecture',
    sourcePage: 82,
  },
);

// ─── Data Structures — Week 2 ─────────────────────────────────────────────────

topics.push(
  {
    id: 'ds-w2-amortized',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    title: 'ניתוח Amortized ומערכים דינמיים',
    summary: 'חזרה על מערכים דינמיים עם הכפלה, ניתוח amortized לעומת worst-case ו-average case, עלות Insert-Last עם doubling.',
    patterns: ['amortized O(1)', 'worst-case vs amortized', 'doubling strategy'],
  },
  {
    id: 'ds-w2-priority-queue',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    title: 'Priority Queue ADT',
    summary: 'הגדרת Priority Queue, פעולות Insert, FindMin, DeleteMin, DecreaseKey. מוטיבציה: סדר לפי עדיפות ולא לפי סדר הגעה.',
    patterns: ['Priority Queue', 'Insert/FindMin/DeleteMin', 'DecreaseKey'],
  },
  {
    id: 'ds-w2-trees',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    title: 'עצים — הגדרות וטרמינולוגיה',
    summary: 'הגדרת עץ רקורסיבית ולא-רקורסיבית, טרמינולוגיה: שורש, עלה, הורה, ילד, אח, עומק, גובה, דרגה. עצים בינאריים: מלא, שלם, כמעט-שלם.',
    patterns: ['root/leaf/parent/child', 'depth/height', 'full/complete/almost-complete BT'],
  },
);

sourceDocuments.push(
  {
    id: 'ds-w2-lecture',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    type: 'lecture',
    name: 'הרצאה 2 — Priority Queue, עצים וערמות',
    topicIds: ['ds-w2-amortized', 'ds-w2-priority-queue', 'ds-w2-trees'],
    processed: true,
  },
  {
    id: 'ds-w2-tutorial2',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    type: 'tutorial',
    name: 'תרגול 2 — ניתוח Amortized, Binary Heaps, תור מ-2 מחסניות',
    topicIds: ['ds-w2-amortized', 'ds-w2-priority-queue', 'ds-w2-trees'],
    processed: true,
  },
);

weeks.push({
  id: 'ds-w2',
  courseId: 'data-structures',
  number: 2,
  title: 'Priority Queue, עצים וערמות',
  summary:
    'חזרה על מערכים דינמיים וניתוח amortized. הגדרת Priority Queue ADT ופעולותיו (Insert, FindMin, DeleteMin, DecreaseKey). הגדרת עץ — רקורסיבית ולא-רקורסיבית. טרמינולוגיית עצים: שורש, עלה, הורה, ילד, אח, מסלול, עומק, גובה, דרגה, תת-עץ. עצים בינאריים: מלא (full), שלם (complete), כמעט-שלם (almost-complete).',
  topicIds: ['ds-w2-amortized', 'ds-w2-priority-queue', 'ds-w2-trees'],
  lectureItemIds: [
    'ds-w2-concept-dll-review',
    'ds-w2-concept-circular-vs-dll',
    'ds-w2-concept-dynamic-array-review',
    'ds-w2-concept-doubling-cost',
    'ds-w2-def-worst-case-bound',
    'ds-w2-def-amortized',
    'ds-w2-concept-amortized-vs-average',
    'ds-w2-def-priority-queue',
    'ds-w2-def-tree-recursive',
    'ds-w2-def-tree-nonrecursive',
    'ds-w2-concept-tree-terminology',
    'ds-w2-concept-tree-terminology-2',
    'ds-w2-concept-tree-terminology-3',
    'ds-w2-def-binary-tree',
    'ds-w2-def-full-complete-bt',
  ],
  tutorialQuestionIds: [
    'ds-w2-t2-q1',
    'ds-w2-t2-q2',
    'ds-w2-t2-q3',
    'ds-w2-t2-q4',
  ],
  homeworkQuestionIds: [],
  examQuestionIds: [],
  reviewHighlights: [
    'amortized(Insert-Last) = O(1) עם doubling, אף ש-worst = O(n)',
    'Amortized != Average case — amortized על סדרה, average על התפלגות',
    'Priority Queue: Insert, FindMin, DeleteMin, DecreaseKey',
    'עץ בינארי כמעט-שלם: בסיס ל-Heap',
  ],
  lectureSummaryUrl: '/lecture-summaries/ds-w2.html',
});

theoryItems.push(
  // ── Amortized & Dynamic Arrays (review + formal) ─────────────────────────
  {
    id: 'ds-w2-concept-dll-review',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'חזרה: רשימה מקושרת כפולה — פעולות Delete ו-Insert-After',
    kind: 'concept',
    content:
      'Delete(A) ברשימה מקושרת כפולה:\nA.prev.next <- A.next\nA.next.prev <- A.prev\nסיבוכיות: O(1). הערה: A עצמו לא משתנה, וגם L.length לא מתעדכן אוטומטית.\n\nInsert-After(A,B) — הכנסת צומת B אחרי צומת A:\nB.prev <- A\nB.next <- A.next\nA.next <- B\nB.next.prev <- B\nסיבוכיות: O(1).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 7,
  },
  {
    id: 'ds-w2-concept-circular-vs-dll',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'השוואת סיבוכיות: מערך מעגלי לעומת רשימה מקושרת כפולה',
    kind: 'concept',
    content:
      'טבלת סיבוכיות:\n\n| פעולה | Circular Array | Doubly Linked List |\n|---|---|---|\n| Insert/Delete-First | O(1) | O(1) |\n| Insert/Delete-Last | O(1) | O(1) |\n| Insert/Delete(i) | O(min{i+1, n-i+1}) | O(min{i+1, n-i+1}) |\n| Retrieve(i) | O(1) | O(min{i+1, n-i+1}) |\n| Concatenation | O(min{n1, n2}+1) | O(1) |\n\nיתרון DLL: שרשור ב-O(1). יתרון מערך: גישה אקראית ב-O(1).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 10,
  },
  {
    id: 'ds-w2-concept-dynamic-array-review',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'מערך דינמי עם resizing — הבעיה',
    kind: 'concept',
    content:
      'כשהמערך מלא (length = maxlen), לא ניתן להרחיב אותו — יש להקצות מערך חדש גדול יותר ולהעתיק.\n\nאם מגדילים ב-1 בכל פעם: n פעולות Insert-Last עולות 1+2+...+n = n(n+1)/2 = O(n²).\n\nשאלה: מה הגודל הנכון למערך החדש?',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 11,
  },
  {
    id: 'ds-w2-concept-doubling-cost',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'אסטרטגיית הכפלה (Doubling) — ניתוח עלות',
    kind: 'concept',
    content:
      'כשהמערך מלא — מכפילים את גודלו.\n\nעלות n פעולות Insert-Last (עבור n=2^k):\n(1+1+...+1) + (1+2+4+...+n/2) = n + (n-1) = O(n)\n\nעבור n כללי (n=2^k+r, 0 <= r < 2^k):\n= n + (2^(k+1) - 1) <= n + 2n - 1 = 3n - 1 = O(n)\n\nהעלות ה-amortized של כל פעולה: O(n)/n = O(1).\nהעלות ה-worst-case של פעולה בודדת: O(n) (כשיש העתקה).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 13,
  },
  {
    id: 'ds-w2-def-worst-case-bound',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'חסם Worst-case',
    kind: 'definition',
    content:
      'worst(op) = הזמן המקסימלי לביצוע הפעולה op.\n\nהזמן לביצוע סדרה של n פעולות: Time(n * op) <= n * worst(op).\n\nלפעמים החסם הזה מאוד רופף. למשל:\nworst(Insert-Last) = O(n)\nאבל Time(n * Insert-Last) = O(n), לא O(n²).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 16,
  },
  {
    id: 'ds-w2-def-amortized',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'ניתוח Amortized — הגדרה פורמלית',
    kind: 'definition',
    content:
      'amort(op) הוא חסם amortized על עלות הפעולה op אם לכל n ולכל סדרה של n פעולות op:\n\namort(op) >= Time(n * op) / n\n\nדוגמה: worst(Insert-Last) = O(n), אבל amort(Insert-Last) = O(1).\nלכן: Time(n * Insert-Last) <= n * amort(Insert-Last) = O(n).\n\nAmortized analysis חוסם את הזמן הממוצע לפעולה על פני סדרת ה-worst-case של פעולות.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 17,
  },
  {
    id: 'ds-w2-concept-amortized-vs-average',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    title: 'Amortized Analysis != Average Case Analysis',
    kind: 'concept',
    content:
      'הבדל חשוב:\n\n• Amortized Analysis: חוסם את הזמן הממוצע לפעולה על פני סדרת הפעולות הגרועה ביותר (worst-case sequence). אין הסתברות.\n\n• Average Case Analysis: חוסם את הזמן הממוצע של פעולה בודדת על פני כל הקלטים האפשריים (בהינתן התפלגות).\n\nAmortized שימושי כשהעלות הכוללת של סדרה חשובה יותר מעלות כל פעולה בודדת. למערכות real-time שצריכות כל פעולה מהירה — יש להשתמש ב-worst-case.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 21,
  },

  // ── Priority Queue ADT ────────────────────────────────────────────────────
  {
    id: 'ds-w2-def-priority-queue',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-priority-queue',
    title: 'Priority Queue ADT',
    kind: 'definition',
    content:
      'Priority Queue — ADT לניהול קבוצת איברים כאשר לכל איבר עדיפות (מפתח, key).\n\nפעולות:\n• Insert(x, k) — הכנסת איבר x עם מפתח k.\n• FindMin() — החזרת handle לאיבר עם מפתח מינימלי.\n• DeleteMin() — מחיקת האיבר עם מפתח מינימלי והחזרת handle אליו.\n• DecreaseKey(h, k) — הקטנת המפתח של איבר קיים (לפי handle h) ל-k.\n\nפתרון נאיבי: שמירת סדרה ממוינת לפי עדיפות.\nפתרון יעיל יותר: מבוסס עצים (Heap).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 26,
  },

  // ── Trees ─────────────────────────────────────────────────────────────────
  {
    id: 'ds-w2-def-tree-recursive',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'עץ — הגדרה רקורסיבית',
    kind: 'definition',
    content:
      'עץ הוא קבוצת צמתים (nodes) שהיא:\n• ריקה, או\n• מכילה צומת אחד הנקרא שורש (root) שמצביע לשורשים של אפס או יותר עצים זרים (disjoint) הנקראים תתי-עצים (subtrees).\n\ndisjoint = אין צמתים משותפים בין תתי-העצים.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 28,
  },
  {
    id: 'ds-w2-def-tree-nonrecursive',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'עץ — הגדרה לא-רקורסיבית',
    kind: 'definition',
    content:
      'מבנה בעל רמות (levels):\n• איבר יחיד ברמה העליונה (שורש).\n• כל איבר ברמה i מצביע לאפס או יותר איברים ברמה i+1.\n• כל איבר ברמה i+1 מוצבע ע"י איבר יחיד ברמה i.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 29,
  },
  {
    id: 'ds-w2-concept-tree-terminology',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'טרמינולוגיית עצים — מונחים בסיסיים',
    kind: 'concept',
    content:
      '• Root (שורש): הצומת היחיד ללא הורה.\n• Child (ילד): B הוא ילד של A אם A מצביע ל-B.\n• Parent (הורה): A הוא הורה של B אם A מצביע ל-B.\n• Leaf (עלה): צומת ללא ילדים.\n• Internal node (צומת פנימי): צומת שאינו עלה.\n• Sibling (אח): A ו-B הם אחים אם יש להם אותו הורה.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 31,
  },
  {
    id: 'ds-w2-concept-tree-terminology-2',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'טרמינולוגיית עצים — מסלול, עומק וגובה',
    kind: 'concept',
    content:
      '• Path (מסלול מכוון): סדרה של צמתים שכל צומת הוא הורה של הבא.\n• Length of path (אורך מסלול): מספר הקשתות (edges) במסלול.\n• Ancestor (אב קדמון): A הוא ancestor של B אם קיים מסלול מ-A ל-B. Strict: אורך >= 1. Non-strict: אורך >= 0.\n• Depth (עומק) של צומת N: אורך המסלול מהשורש ל-N.\n• Depth of tree: העומק של הצומת העמוק ביותר.\n• Height (גובה) של צומת N: אורך המסלול הארוך ביותר מ-N לעלה.\n• Height of tree: גובה השורש (= עומק העץ).',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 33,
  },
  {
    id: 'ds-w2-concept-tree-terminology-3',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'טרמינולוגיית עצים — תת-עץ, דרגה, סדר',
    kind: 'concept',
    content:
      '• Subtree rooted at B: תת-העץ שבשורשו B.\n• Path (undirected): מסלול לא-מכוון בין שני צמתים.\n• Degree (דרגה) של צומת A: מספר הילדים של A.\n• Ordered tree: עץ בו מוגדר סדר על ילדי כל צומת.\n• Unordered tree: אין סדר על הילדים.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 34,
  },
  {
    id: 'ds-w2-def-binary-tree',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'עץ בינארי (Binary Tree)',
    kind: 'definition',
    content:
      'עץ בינארי הוא עץ סדור שבו לכל צומת יש לכל היותר שני ילדים (ילד שמאלי וילד ימני).\n\nהעץ הנפוץ ביותר במדעי המחשב.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 35,
  },
  {
    id: 'ds-w2-def-full-complete-bt',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-trees',
    title: 'עצים בינאריים: Full, Complete, Almost-Complete',
    kind: 'definition',
    content:
      '• Full binary tree: כל צומת הוא בדרגה 2 או 0 (כל צומת פנימי עם בדיוק 2 ילדים).\n• Complete binary tree: עץ מלא (full) שבו כל העלים באותו עומק.\n• Almost-complete binary tree: עץ בינארי שבו ייתכנו צמתים חסרים רק בסוף הרמה העמוקה ביותר (מימין).\n\nעץ almost-complete הוא הבסיס למבנה Heap.',
    sourceName: 'הרצאה 2',
    sourceDocumentId: 'ds-w2-lecture',
    sourcePage: 36,
  },
);

export const questions: PlatformQuestion[] = [
  // ─── Logic Week 1 — Tutorial 1 ─────────────────────────────────────────────
  {
    id: 'logic-w1-t1-q1',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 2,
    title: 'איחוד גדול וחיתוך גדול — מילוי טבלה',
    content:
      'יהיו X, Y קבוצות כלשהן. עבור כל קבוצה A בעמודה השמאלית, מלאו את ערכי ∪A ו-∩A.\n\nסימונים:\n∪A = {a | ∃B ∈ A כך ש-a ∈ B}\n∩A = {a | ∀B ∈ A, a ∈ B}',
    imageUrl: '/images/table-q1.png',
    difficulty: 'easy',
    isRequired: true,
    isExamFrequent: false,
    systemTags: ['Must Know'],
  },
  {
    id: 'logic-w1-t1-q2',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-naive-set-theory',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 3,
    title: 'הוכחה: חיתוך של קטעים פתוחים שווה לקטע סגור',
    content:
      'הוכיחו את השוויון הבא:\n\n∩ₙ₌₁^∞ (−1/n, 1+1/n) = [0, 1]\n\nכלומר, החיתוך של כל הקטעים הפתוחים עבור n = 1, 2, 3, ... שווה לקטע הסגור.\n\nרמז: הוכיחו שוויון על ידי הכלה דו-כיוונית:\n⊆ ו-⊇',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w1-t1-q3',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 5,
    title: 'בניית {1,3,8} מ-{1} ב-ZFC',
    content:
      'נתון: {1} קיים. השתמשו באקסיומות ZFC (ריקה, זוג, איחוד, החזקה, הפרדה, החלפה) כדי להסיק ש-{1,3,8} היא קבוצה.\n\nרמז: בנו קודם כל {3} ו-{8}, ולאחר מכן השתמשו באקסיומת הזוג ואיחוד.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Important'],
  },
  {
    id: 'logic-w1-t1-q4',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 6,
    title: 'תת-קבוצות של {1,...,10} — הפרדה והחלפה',
    content:
      'תנו דוגמאות לתת-קבוצות של {1,...,10} הנוצרות ע"י:\n(א) אקסיומת ההפרדה — {x ∈ {1,...,10} | P(x)} עבור תכונה P כלשהי.\n(ב) אקסיומת ההחלפה — החלפת כל איבר x ב-{1,...,10} ע"י m(x) עבור מיפוי m כלשהו.\n\nהסבירו את ההבדל בין שתי האקסיומות.',
    difficulty: 'medium',
    isRequired: false,
    isExamFrequent: false,
    systemTags: ['Important'],
  },
  {
    id: 'logic-w1-t1-q5',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 7,
    title: 'עצמאות אקסיומת הזוג',
    content:
      'הוכיחו שאקסיומת הזוג (Pairing) אינה נובעת מיתר אקסיומות ZFC (ללא אקסיומת הזוג).\n\nרמז: מצאו מודל (קבוצה של קבוצות) שמקיים את כל שאר האקסיומות אך לא את אקסיומת הזוג.',
    difficulty: 'hard',
    isRequired: false,
    isExamFrequent: false,
    systemTags: ['Advanced Difficulty'],
  },
  {
    id: 'logic-w1-t1-q6',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 8,
    title: '{∅} ואקסיומת היסוד',
    content:
      '(א) הראו ש-{∅} מקיימת את אקסיומת היסוד (Foundation): בכל קבוצה לא ריקה A יש איבר B כך ש-A ∩ B = ∅.\n\n(ב) הוכיחו סתירה: נניח בשלילה שקיימת קבוצה A כך ש-A ∈ A. הסיקו סתירה עם אקסיומת היסוד.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w1-t1-q7',
    courseId: 'logic',
    weekId: 'logic-w1',
    topicId: 'logic-w1-zfc',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'logic-w1-tutorial1',
    sourcePage: 11,
    title: 'זיהוי זוגות סדורים — ⟨x,y⟩ = {{x},{x,y}}',
    content:
      'עבור כל אחת מהקבוצות הבאות, קבעו: האם היא ייצוג חוקי של זוג סדור לפי ⟨x,y⟩ = {{x},{x,y}}? אם כן, מהם x ו-y?\n\n(א) {{x},{y}}\n(ב) {x,{y}}\n(ג) {{y},{x,y}}\n\nרמז: זכרו שמהגדרה ⟨x,y⟩ = {{x},{x,y}}. בדקו אם ניתן לזהות איזו מהקבוצות היא {x} ואיזו היא {x,y}.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },

  // ─── Data Structures Week 1 — Tutorial 1 ───────────────────────────────────
  {
    id: 'ds-w1-t1-q1',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-adt',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'ds-w1-tutorial1',
    sourcePage: 6,
    title: 'ADT: Linked List — הגדרת הממשק',
    content:
      'הגדירו את ה-ADT של Linked List:\n\nObjects: סדרה סופית של List Elements.\n\nOperations:\n• Create list\n• Get the first List Element\n• Insert new List Element as first\n• Delete first List Element\n\nGiven a List Element:\n• Get/Set data\n• Get/Set next List Element',
    difficulty: 'easy',
    isRequired: true,
    isExamFrequent: false,
    systemTags: ['Must Know'],
  },
  {
    id: 'ds-w1-t1-q2',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-linked-lists',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'ds-w1-tutorial1',
    sourcePage: 10,
    title: 'מימוש Linked List באמצעות מערכים (Data + Next arrays)',
    content:
      'הציגו מימוש של Linked List באמצעות שני מערכים: L.D[] (מערך נתונים) ו-L.N[] (מערך אינדקסים).\n\nהמבנה כולל:\n• L.n: גודל המערך\n• L.head: אינדקס האיבר הראשון\n• L.free: אינדקס התא הפנוי הראשון\n• null = -1\n\nכתבו פסאודוקוד עבור InsertFront(L, x) ו-DeleteFront(L).',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'ds-w1-t1-q3',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'ds-w1-tutorial1',
    sourcePage: 16,
    title: 'הוכחה באינדוקציה: סכום סדרה חשבונית Σi = n(n+1)/2',
    content:
      'הוכיחו באינדוקציה: Σᵢ₌₁ⁿ i = n(n+1)/2 לכל n ≥ 1.\n\nBase case: n=1.\nInduction hypothesis: נניח שנכון עבור k.\nInduction step: הוכיחו עבור k+1.',
    difficulty: 'easy',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'ds-w1-t1-q4',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'ds-w1-tutorial1',
    sourcePage: 18,
    title: 'הוכחה שגויה באינדוקציה: כל הסוסים באותו צבע',
    content:
      'נטען: בכל קבוצה של n סוסים, כולם באותו צבע.\n\nBase case: n=1, סוס אחד — באותו צבע. ✓\nInduction step: קבוצה של n+1 סוסים — הורדת האחרון (n סוסים — אותו צבע), הורדת הראשון (n סוסים — אותו צבע), לכן כולם באותו צבע.\n\nמצאו את הטעות בהוכחה.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: false,
    systemTags: ['Must Know'],
    hint: 'מה קורה במעבר מ-n=1 ל-n=2? האם שתי תת-הקבוצות בגודל n חופפות?',
  },
  {
    id: 'ds-w1-t1-q5',
    courseId: 'data-structures',
    weekId: 'ds-w1',
    topicId: 'ds-w1-intro',
    sourceType: 'tutorial',
    sourceName: 'תרגול 1',
    sourceDocumentId: 'ds-w1-tutorial1',
    sourcePage: 4,
    title: 'ADT vs. Implementation — ההבדל',
    content:
      'מה ההבדל בין ADT למימוש (Data Structure)?\n\nADT מגדיר ממשק לוגי: אילו פעולות אפשריות ומה ההתנהגות שלהן.\nData Structure הוא המימוש הקונקרטי: איך מאחסנים את הנתונים ואיך מממשים את הפעולות.\n\nדוגמה: Linked List ADT ניתן למימוש באמצעות Node Objects (עם מצביעים) או באמצעות מערכים (Data + Next arrays).',
    difficulty: 'easy',
    isRequired: true,
    isExamFrequent: false,
    systemTags: ['Must Know'],
  },

  // ─── Data Structures Week 2 — Tutorial 2 ───────────────────────────────────
  {
    id: 'ds-w2-t2-q1',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-priority-queue',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'ds-w2-tutorial2',
    sourcePage: 11,
    title: 'מציאת האיבר השני והשלישי בגודלו ב-Max Heap',
    content:
      'נתון Max Heap.\n\n(2.1) איך מוצאים את ערך האיבר השני בגודלו? מה הסיבוכיות?\n\n(2.2) איך מוצאים את ערך האיבר השלישי בגודלו? מה הסיבוכיות?\n\nרמז: חשבו באילו מיקומים בעץ האיבר יכול להימצא.',
    difficulty: 'easy',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'ds-w2-t2-q2',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-priority-queue',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'ds-w2-tutorial2',
    sourcePage: 50,
    title: 'מציאת k האיברים הגדולים ב-Max Heap בזמן O(k log k)',
    content:
      'נתון Max Heap עם n איברים. הציעו אלגוריתם למציאת k האיברים הגדולים ביותר בזמן O(k log k), ללא שינוי ה-Heap.\n\nרמז: השתמשו ב-Child Collection — מבנה עזר (Heap נוסף) שמחזיק מצביעים לילדים של הצמתים שכבר הוצאו.',
    difficulty: 'hard',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'ds-w2-t2-q3',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-amortized',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'ds-w2-tutorial2',
    sourcePage: 4,
    title: 'ניתוח Amortized של Binary Counter',
    content:
      'נתון מונה בינארי (binary counter) בגודל k ביטים, שמתחיל מ-0.\n\nכל פעולת Increment מעדכנת ביטים. נתחו את העלות ה-amortized של פעולת Increment בודדת על פני n פעולות.\n\nרמז: בדקו כמה פעמים כל ביט משתנה על פני n פעולות Increment.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'ds-w2-t2-q4',
    courseId: 'data-structures',
    weekId: 'ds-w2',
    topicId: 'ds-w2-priority-queue',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'ds-w2-tutorial2',
    sourcePage: 80,
    title: 'מימוש תור (Queue) באמצעות שתי מחסניות (Stacks)',
    content:
      'הציעו מימוש של Queue ADT באמצעות שתי מחסניות בלבד (S1 ו-S2). מותר להשתמש רק בפעולות Stack בסיסיות: Push, Pop, IsEmpty.\n\nכתבו פסאודוקוד ל-Enqueue ו-Dequeue.\n\nנתחו את הסיבוכיות ה-amortized של כל פעולה.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },

  // ─── Logic Week 2 — Tutorial 2 ─────────────────────────────────────────────
  {
    id: 'logic-w2-t2-hw-thm2',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-finite-infinite',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 2,
    title: 'חוב מההרצאה — הוכחת משפט 2: אם A אינסופית ו-A∼B אז B אינסופית',
    content:
      'תהיינה A, B קבוצות. הוכיחו: אם A אינסופית ו-A∼B אז B אינסופית.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q1',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 4,
    title: 'הוכחת שקילות: ℤ∼S כאשר S = {0,2,4,6,8,...}',
    content:
      'נתונה הקבוצה S = {0,2,4,6,8,...}. הוכיחו כי ℤ∼S.\n\nשאלה נוספת: האם השקילות שהראנו מוכיחה ש-S ו-ℤ הן קבוצות אינסופיות לפי ההגדרה?',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q2',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 6,
    title: 'הוכחת שקילות: [0,1]∼(1,3) ∪ [4,8]',
    content:
      'הוכיחו: [0,1] ∼ (1,3) ∪ [4,8].',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q3',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 7,
    title: 'הוכחת שקילות: (−π/2, π/2) ∼ (−∞, ∞)',
    content:
      'הוכיחו: (−π/2, π/2) ∼ (−∞, ∞).',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q4',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 8,
    title: 'הוכחה או הפרכה: A∼B ו-C∼D אז A∩C ∼ B∩D',
    content:
      'הוכיחו או הפריכו: אם A∼B ו-C∼D אז A∩C ∼ B∩D.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q5',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 9,
    title: 'הוכחה או הפרכה: A∼B, C∼D, A∩C=∅, B∩D=∅ אז A∪C ∼ B∪D',
    content:
      'הוכיחו או הפריכו: אם A∼B ו-C∼D ו-A∩C = ∅ ו-B∩D = ∅ אז A∪C ∼ B∪D.',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },
  {
    id: 'logic-w2-t2-q6',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-cardinality',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 11,
    title: 'הוכחת שקילות: (0,1) ∼ [5,9] ∪ [100,108]',
    content:
      'הוכיחו: (0,1) ∼ [5,9] ∪ [100,108].',
    difficulty: 'medium',
    isRequired: true,
    isExamFrequent: false,
    systemTags: ['Must Know'],
  },
  {
    id: 'logic-w2-t2-q7',
    courseId: 'logic',
    weekId: 'logic-w2',
    topicId: 'logic-w2-equivalence-order',
    sourceType: 'tutorial',
    sourceName: 'תרגול 2',
    sourceDocumentId: 'logic-w2-tutorial2',
    sourcePage: 12,
    title: 'יחס שקילות על ℝ: aRb ⟺ ⌊a⌋=⌊b⌋ — הוכחת |ℝ/R| ≤ |ℤ|',
    content:
      'יהי R יחס שקילות על ℝ המוגדר באופן הבא: aRb ⟺ ⌊a⌋ = ⌊b⌋.\n\nהוכיחו |ℝ/R| ≤ |ℤ|.',
    difficulty: 'hard',
    isRequired: true,
    isExamFrequent: true,
    systemTags: ['Must Know', 'Frequently Appears in Exams'],
  },

];

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
