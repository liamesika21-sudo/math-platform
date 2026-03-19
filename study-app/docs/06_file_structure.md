# מבנה הקבצים – פירוט מלא

## מפת הפרויקט

```
study-app/
│
├── src/
│   ├── app/                         ← Next.js App Router (עמודים + API)
│   ├── components/                  ← React Components
│   ├── contexts/                    ← React Contexts (Global State)
│   ├── hooks/                       ← Custom Hooks
│   ├── lib/                         ← Utilities, Firebase, Core Logic
│   ├── data/                        ← נתונים סטטיים (JSON/TS)
│   └── types/                       ← TypeScript Interfaces
│
├── scripts/                         ← סקריפטים חד-פעמיים
├── docs/                            ← תיעוד (תיקיה זו!)
├── public/                          ← Static assets
│
├── firestore.rules                  ← Firestore Security Rules
├── firestore.indexes.json           ← Firestore Indexes
├── storage.rules                    ← Firebase Storage Rules
├── firebase.json                    ← Firebase Project Config
├── .env.local                       ← API Keys & Config (לא ב-git!)
├── next.config.ts                   ← Next.js Config
├── package.json
└── tsconfig.json
```

---

## src/app/ – עמודים ו-API

### עמודי סטודנט
```
app/
├── page.tsx                         ← דף בית (בחירת קורס)
├── layout.tsx                       ← Root layout
├── login/page.tsx                   ← התחברות סטודנט
│
├── courses/
│   ├── page.tsx                     ← רשימת קורסים
│   └── [courseId]/
│       ├── page.tsx                 ← דשבורד קורס
│       ├── layout.tsx               ← Layout עם CourseGuard
│       ├── chat/page.tsx            ← צ'אט עם מנטור AI
│       ├── homework/page.tsx        ← שיעורי בית
│       ├── exams/page.tsx           ← מבחנים
│       ├── topics/page.tsx          ← נושאים לפי שבוע
│       ├── weeks/[weekId]/page.tsx  ← תוכן שבוע ספציפי
│       ├── tutorials/page.tsx       ← שאלות תרגול
│       ├── questions/[questionId]/  ← שאלה בודדת
│       ├── my-questions/page.tsx    ← שאלות שסימנתי
│       ├── review-center/page.tsx   ← מרכז חזרה
│       ├── sources/page.tsx         ← מקורות ומסמכים
│       ├── homework-analysis/       ← ניתוח שיעורי בית
│       ├── mentor/page.tsx          ← הנחיית מנטור
│       └── weekly-study/page.tsx    ← תוכנית לימוד שבועית
│
├── lecturer_onboarding_form/page.tsx ← טופס onboarding למרצים
│
└── [utility pages]
    ├── exams/                        ← הכנה לבחינות
    ├── homework/                     ← מעקב שיעורי בית
    ├── practice/                     ← מצב תרגול
    ├── study-plan/                   ← תוכנית לימוד
    ├── knowledge/                    ← בסיס ידע
    ├── formulas/                     ← דף נוסחאות
    ├── theorems/                     ← רשימת משפטים
    └── health/                       ← בדיקת בריאות מערכת
```

### עמודי אדמין
```
app/admin/
├── page.tsx                         ← בחירת קורס
├── login/page.tsx                   ← התחברות אדמין
├── layout.tsx                       ← Admin layout עם Auth guard
└── [courseId]/
    ├── page.tsx                     ← דשבורד קורס
    ├── layout.tsx                   ← Layout עם Sidebar
    ├── curriculum/page.tsx          ← העלאת חומרים
    ├── students/page.tsx            ← ניהול סטודנטים
    ├── questions/page.tsx           ← בנק שאלות
    ├── assignments/page.tsx         ← מטלות
    ├── gradebook/page.tsx           ← ציונים
    ├── analytics/page.tsx           ← אנליטיקות
    ├── alerts/page.tsx              ← התראות צ'אט
    ├── mistakes/page.tsx            ← טעויות נפוצות
    ├── insights/page.tsx            ← תובנות
    ├── adaptive/page.tsx            ← למידה אדפטיבית
    └── topics/page.tsx              ← ניהול נושאים
```

### API Routes
```
app/api/
├── chat/route.ts                    ← POST: שליחת הודעה למנטור AI
├── extract/route.ts                 ← POST: חילוץ טקסט מ-PDF
├── files/
│   ├── read/route.ts                ← POST: קריאת PDF ממערכת קבצים
│   └── scan/route.ts                ← POST: סריקת תיקיית PDFs
└── admin/
    ├── curriculum/
    │   ├── upload/route.ts          ← POST: העלאת PDF
    │   └── analyze/route.ts         ← POST: ניתוח AI
    └── students/
        ├── route.ts                 ← GET: רשימת סטודנטים
        └── import/route.ts          ← POST: ייבוא בצובר
```

---

## src/components/ – קומפוננטות

```
components/
├── Layout.tsx                       ← Main layout wrapper
├── Providers.tsx                    ← Context providers (Auth, etc.)
├── MathText.tsx                     ← LaTeX/Math rendering (KaTeX)
├── QuestionCard.tsx                 ← כרטיס שאלה
├── KnowledgeCard.tsx                ← כרטיס פריט תיאוריה
├── DataHealth.tsx                   ← מצב בריאות נתונים
│
├── admin/
│   └── AdminSidebar.tsx             ← ניווט צדדי לאדמין
│
└── platform/
    ├── CourseGuard.tsx              ← בדיקת גישה לקורס
    ├── CourseShell.tsx              ← Layout כללי לקורס
    ├── BiDiContent.tsx              ← תמיכה RTL/LTR
    ├── QuestionCollectionPage.tsx   ← דף רשימת שאלות
    ├── QuestionPreviewCard.tsx      ← תצוגה מקדימה של שאלה
    ├── QuestionStateControls.tsx    ← כפתורי מצב שאלה
    ├── TheoryItemCard.tsx           ← כרטיס פריט תיאוריה עם מחוות
    └── MetricCard.tsx               ← כרטיס מדד/סטטיסטיקה
```

---

## src/lib/ – ספריות ולוגיקה

```
lib/
├── firebase.ts                      ← Firebase client init (Auth, Firestore, Storage)
├── firebase-admin.ts                ← Firebase Admin SDK (server-side)
├── db.ts                            ← Dexie IndexedDB schema & helpers
├── analysis.ts                      ← ניתוח נתונים
├── pdf-extractor.ts                 ← עזרי חילוץ PDF
│
└── math-platform/                   ← ❤️ Core Platform Logic
    ├── types.ts                     ← TypeScript interfaces (CourseId, TheoryItem, etc.)
    ├── data.ts                      ← כל נתוני הקורסים (הרצאות, תיאוריה, שאלות)
    ├── build-course-knowledge.ts    ← בונה markdown knowledge base לצ'אט
    ├── session.ts                   ← ניהול sessions
    └── utils.ts                     ← utilities כלליים
```

### `lib/math-platform/data.ts` – הקובץ החשוב ביותר

מכיל כ-2000+ שורות של:
- **`courses[]`** – הגדרות 2 הקורסים עם צבעים, אייקונים, תיאורים
- **`topics[]`** – כל הנושאים עם סיכומים
- **`weeks[]`** – מבנה 14 השבועות של לוגיקה + שבוע 1 של DS
- **`theoryItems[]`** – ~100+ פריטי תיאוריה עם תוכן מלא
- **`questions[]`** – שאלות תרגול עם hints ורמת קושי
- **Helper functions:** `getCourseById()`, `getCourseWeeks()`, `getTheoryItemsForWeek()`, ...

### `lib/db.ts` – Dexie / IndexedDB

שמירה מקומית בדפדפן:
```
Tables:
├── files              ← מטאדטה של קבצים
├── knowledgeItems     ← פריטי תיאוריה
├── examQuestions      ← שאלות מבחן
├── homeworkQuestions  ← שאלות שיעורי בית
├── studySessions      ← מעקב sessions
├── studyPlans         ← תוכניות לימוד
├── practiceResults    ← תוצאות תרגול
└── examPatterns       ← דפוסים שזוהו
```

---

## src/data/ – נתונים סטטיים

קבצי TypeScript עם נתוני קורס חשבון אינפי (הקורס הראשון שנבנה):

```
data/
├── infi-exam-2026.ts          ← שאלות מבחן 2026
├── infi-formulas.ts           ← נוסחאות
├── infi-homework-practice.ts  ← תרגול שיעורי בית
├── infi-practice-by-topic.ts  ← תרגול לפי נושא
├── infi-study-plan.ts         ← תוכנית לימוד
├── infi-topics.ts             ← נושאים
└── infi-weeks.ts              ← שבועות
```

---

## src/contexts/ – Global State

```
contexts/
├── AuthContext.tsx              ← מצב Authentication (Firebase user)
└── TheoryFeedbackContext.tsx    ← מחוות תיאוריה של המשתמש
```

---

## src/hooks/ – Custom Hooks

```
hooks/
├── useAutoInit.ts               ← אתחול אוטומטי בטעינה ראשונה
└── useFirestoreWeekContent.ts   ← טעינת תוכן שבוע מ-Firestore
```

---

## src/types/ – TypeScript Types

```
types/
└── index.ts

Types:
├── FileCategory      ← 'lecture' | 'tutorial' | 'homework' | 'exam'
├── KnowledgeItemType ← 'definition' | 'theorem' | 'lemma' | ...
├── Topic             ← 'limits' | 'derivatives' | 'integrals' | ...
├── Direction         ← 'rtl' | 'ltr'
├── Language          ← 'he' | 'en'
├── UploadedFile      ← interface
├── KnowledgeItem     ← interface
├── ExamQuestion      ← interface
├── HomeworkQuestion  ← interface
├── StudySession      ← interface
├── StudyPlan         ← interface
├── PracticeResult    ← interface
└── ExamPattern       ← interface
```

---

## scripts/

```
scripts/
└── create-admin.mjs    ← יצירת משתמש אדמין ב-Firebase
```

**שימוש:**
```bash
node scripts/create-admin.mjs
```
יוצר: `admin@reichman.ac.il` עם `admin: true` custom claim.
