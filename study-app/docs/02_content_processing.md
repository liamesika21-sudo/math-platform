# עיבוד תוכן – העלאת PDF ויצירת Cards

## מה קורה כשמעלים הרצאה או תרגול?

זהו התהליך המרכזי שהופך PDF של מרצה לתוכן חי בתוך הפלטפורמה.

---

## שלב 1: העלאת הקובץ

**דרך ממשק האדמין:** `/admin/[courseId]/curriculum`

הקובץ מועלה דרך drag-and-drop או בחירת קבצים.

### מה קורה ב-backend:
**API:** `POST /api/admin/curriculum/upload`

1. מקבל `FormData` עם:
   - הקובץ עצמו (PDF)
   - `courseId` – מזהה הקורס
   - `type` – `lecture` / `tutorial` / `homework` / `exam`
   - `week` – מספר השבוע (1–13)

2. מעלה את הקובץ ל-**Firebase Storage** בנתיב:
   ```
   courses/{courseId}/week{N}/{type}/{filename}
   ```

3. שומר מטאדטה ב-**Firestore**:
   ```
   courses/{courseId}/content/{docId}
   {
     filename: "lecture_week3.pdf",
     type: "lecture",
     week: 3,
     status: "uploaded",
     url: "https://storage.googleapis.com/...",
     storagePath: "courses/logic/week3/lecture/...",
     uploadedAt: timestamp
   }
   ```

---

## שלב 2: ניתוח AI

**לחיצה על "Analyze with AI"** מפעילה:
**API:** `POST /api/admin/curriculum/analyze`

### תהליך מלא:

```
Firestore (metadata) ──► download PDF from Storage
                               │
                               ▼
                         pdf-parse library
                         (extract raw text, max 60,000 chars)
                               │
                               ▼
                         OpenAI GPT-4o
                         (structured extraction)
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
              הרצאה (lecture)     תרגול/שיעורי בית/מבחן
              ────────────────    ─────────────────────
              theory items        questions
              (definitions,       (number, content,
               theorems, etc.)     difficulty)
                    │                     │
                    └──────────┬──────────┘
                               ▼
                  Firestore: courses/{courseId}/generatedContent/{weekId}
                  {
                    theoryItems: [...],
                    tutorialQuestions: [...],
                    homeworkQuestions: [...],
                    examQuestions: [...]
                  }
```

### מה OpenAI מחזיר?

#### עבור הרצאות (lecture):
```json
{
  "theoryItems": [
    {
      "kind": "definition",
      "title": "קבוצה",
      "content": "קבוצה היא אוסף של אובייקטים הנקראים איברים...",
      "sourcePage": 3
    },
    {
      "kind": "theorem",
      "title": "משפט קנטור",
      "content": "לכל קבוצה A, |A| < |P(A)|",
      "sourcePage": 7
    }
  ]
}
```

#### עבור תרגול/שיעורי בית/מבחן:
```json
{
  "questions": [
    {
      "number": 1,
      "content": "הוכח כי לכל קבוצות A, B: A ∩ B ⊆ A",
      "difficulty": "easy",
      "sourcePage": 2
    },
    {
      "number": 3,
      "content": "הוכח את משפט ה-Schroeder-Bernstein",
      "difficulty": "hard",
      "sourcePage": 5
    }
  ]
}
```

---

## שלב 3: הנתונים חיים במערכת

### איפה נשמר הכל?

```
Firestore
└── courses/
    └── {courseId}/
        ├── content/                    ← מטאדטה של קבצים
        │   └── {docId}
        │       ├── filename
        │       ├── type (lecture/tutorial/...)
        │       ├── week (1-13)
        │       ├── status (uploaded → analyzing → analyzed)
        │       └── url
        └── generatedContent/           ← תוכן שנוצר ב-AI
            └── week{N}
                ├── theoryItems[]
                ├── tutorialQuestions[]
                ├── homeworkQuestions[]
                └── examQuestions[]
```

---

## שלב 4: הנתונים נכנסים לצ'אט

כל פעם שסטודנט שולח הודעה בצ'אט, ה-system prompt נבנה מחדש:

### `/api/chat/route.ts` – buildSystemPrompt():

```
1. טוען course metadata (שם, שם קצר)
2. בונה markdown מ-data.ts (תוכן סטטי):
   - סיכומי שבועות
   - נושאים
   - כל פריטי התיאוריה
   - שאלות תרגול
3. טוען מ-Firestore generatedContent (תוכן שהועלה):
   - כל ה-theory items שנוצרו מהPDFs
   - כל השאלות שנוצרו
4. מוסיף הנחיות בעברית לאופן ההדרכה
```

**כלומר:** ברגע שמנתחים PDF, המנטור AI "יודע" על כל ההגדרות והשאלות שבו.

---

## סוגי Cards שנוצרים

| סוג | עברית | מתי נוצר |
|-----|-------|----------|
| `definition` | הגדרה | מהרצאות – הגדרות פורמליות |
| `theorem` | משפט | מהרצאות – משפטים עם הוכחות |
| `formula` | נוסחה | מהרצאות – נוסחאות ופורמולות |
| `concept` | מושג | מהרצאות – מושגים כלליים |

### תצוגת Card לסטודנט:
כל `TheoryItem` מוצג ב-`TheoryItemCard` עם:
- כותרת + תג (הגדרה / משפט / ...)
- תוכן עם rendering של LaTeX
- כפתורי מחוות: `got_it` ✓ | `needs_review` ⚠️ | `lost` ✗
- המחווה נשמרת ב-`theoryFeedback/{docId}` ב-Firestore

---

## סטטוסים של קובץ

```
uploaded ──► [לחיצה על Analyze] ──► analyzing ──► analyzed
                                                    └── (אם שגיאה) → error
```

הסטטוס מוצג בממשק האדמין ומתעדכן בזמן אמת.

---

## נתונים סטטיים vs. דינמיים

| סוג | מקור | עדכון |
|-----|------|-------|
| תוכן קורס בסיסי | `src/lib/math-platform/data.ts` | דרך קוד + deploy |
| תוכן שהועלה | Firestore `generatedContent` | דרך ממשק אדמין, מיידי |
| שאלות/תרגולים ידועים | `src/data/infi-*.ts` | דרך קוד + deploy |
