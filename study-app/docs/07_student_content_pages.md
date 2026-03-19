# דפי תוכן סטודנט – מדריך מלא

תיעוד הדפים שמוצגים לסטודנט בקורס: דף שבוע ודף נושאים.
שני הדפים מסנכרנים את התוכן עם Firestore בזמן אמת.

---

## סקירת הזרימה

```
data.ts (static)       Firestore generatedContent
      │                        │
      └──────────┬─────────────┘
                 ▼
     useFirestoreTheoryItems()     ← hook משותף
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
 דף שבוע             דף נושאים
/courses/{id}/weeks  /courses/{id}/topics
```

כשהאדמין שומר שינויים ב-`content-review`, הם נכתבים ל-Firestore.
בפעם הבאה שסטודנט נכנס לדף — השינויים מוצגים.

---

## דף שבוע – `/courses/{courseId}/weeks/{weekId}`

**קובץ:** `src/app/courses/[courseId]/weeks/[weekId]/page.tsx`

### מה מוצג:

| חלק | תוכן |
|-----|------|
| **כותרת** | מספר שבוע, כותרת, תקציר, chip-ים של נושאים, highlights |
| **הרצאה** | פריטי תיאוריה (הגדרות, משפטים, נוסחאות, מושגים) עם סינון |
| **תרגולים** | שאלות מדפי תרגול |
| **שיעורי בית** | תרגילי בית רשמיים |
| **מבחנים** | שאלות ממבחנים קודמים |

### סינון פריטי הרצאה:

כפתורי סינון בראש הסקשן:
- **הכל** – כל הפריטים
- **הגדרות** – `kind === 'definition'`
- **משפטים** – `kind === 'theorem'`
- **נוסחאות** – `kind === 'formula'`
- **מושגים** – `kind === 'concept'`

כפתור שמכיל ספירה מוסתר אם אין פריטים מהסוג הזה.

### סינכרון Firestore:

```ts
const overrideMap  = useFirestoreTheoryItems(courseId);
const lectureItems = useMemo(
  () => applyOverrides(getTheoryItemsForWeek(weekId), overrideMap),
  [weekId, overrideMap],
);
```

1. `getTheoryItemsForWeek(weekId)` מחזיר את הפריטים הסטטיים מ-`data.ts`
2. `useFirestoreTheoryItems` מושך את כל ה-`generatedContent` של הקורס
3. `applyOverrides` ממזג — פריטים עם `hidden: true` מסוננים, שאר השינויים (title, content, kind) מוחלים

---

## דף נושאים – `/courses/{courseId}/topics`

**קובץ:** `src/app/courses/[courseId]/topics/page.tsx`

### מה מוצג:

כל הנושאים של הקורס (מ-`data.ts`) בסדר קבוע.
לכל נושא:
- כותרת ותקציר
- תבניות פתרון (pattern chips)
- פריטי תיאוריה (ניתן לסינון לפי kind)
- שאלות הקשורות לנושא

### סינון גלובלי לפי Kind:

כפתורים בראש הדף מסננים את כל הנושאים בבת אחת:
- **הכל** — מציג theory + שאלות
- **הגדרות / משפטים / נוסחאות / מושגים** — מציג רק theory מהסוג; נושא שאין לו פריטים מהסוג נסתר לחלוטין

### סינכרון Firestore:

```ts
const overrideMap = useFirestoreTheoryItems(courseId);

const allTheory = useMemo(
  () => topics.flatMap((t) => applyOverrides(getTheoryItemsForTopic(courseId, t.id), overrideMap)),
  [topics, courseId, overrideMap],
);
```

אותו hook — כל הנושאים מקבלים את אותם overrides מ-Firestore.

---

## Hook משותף – `useFirestoreTheoryItems`

**קובץ:** `src/lib/math-platform/useFirestoreTheoryItems.ts`

### תפקיד:

מושך **פעם אחת** את כל ה-`generatedContent` של קורס מ-Firestore
ובונה `Map<staticItemId, TheoryItem | null>`:

| ערך במפה | משמעות |
|----------|---------|
| `TheoryItem` | פריט עם override מ-Firestore (title/content/kind מעודכנים) |
| `null` | פריט עם `hidden: true` — לא יוצג |
| *(לא קיים במפה)* | אין override — יוצג כפי שהוא מ-`data.ts` |

### לוגיקת מיזוג:

הפריטים ב-Firestore מאוחסנים במערך לפי סדר (index), בהתאמה לסדר ב-`data.ts`.
ההתאמה היא `firestoreItems[i] ↔ staticItems[i]` לכל שבוע.

```ts
staticItems.forEach((staticItem, i) => {
  const fItem = firestoreItems[i];
  if (!fItem) return;                   // אין override
  if (fItem.hidden) {
    map.set(staticItem.id, null);       // מסנן
  } else {
    map.set(staticItem.id, {
      ...staticItem,
      title:      fItem.title      ?? staticItem.title,
      content:    fItem.content    ?? staticItem.content,
      kind:       fItem.kind       ?? staticItem.kind,
      sourcePage: fItem.sourcePage ?? staticItem.sourcePage,
    });
  }
});
```

### Fallback:

אם ה-Map ריק (Firestore לא נטען עדיין, או שאין doc), `applyOverrides` מחזיר את הפריטים הסטטיים כמות שהם.

---

## Firestore – מבנה הנתונים

**Collection:** `courses/{courseId}/generatedContent/{weekId}`

```json
{
  "theoryItems": [
    {
      "kind": "definition",
      "title": "שם ההגדרה",
      "content": "תוכן ההגדרה...",
      "sourcePage": 5,
      "hidden": false,
      "important": true,
      "lecturerNote": "הערה למרצה"
    }
  ],
  "tutorialQuestions": [],
  "homeworkQuestions": [],
  "examQuestions": [],
  "updatedAt": "2026-03-19T10:00:00.000Z",
  "updatedBy": "admin@reichman.ac.il"
}
```

**הרשאות:** `allow read: if isAuthed()` — כל סטודנט מחובר יכול לקרוא.

---

## TheoryItemCard – כרטיסיית תיאוריה

**קובץ:** `src/components/platform/TheoryItemCard.tsx`

כל פריט תיאוריה מוצג בכרטיסייה הכוללת:
- תגית kind (הגדרה / משפט / נוסחה / מושג)
- שם הפריט + תוכן (3 שורות, ניתן להרחיב)
- שם המקור + עמוד

לחיצה פותחת **Modal** עם:
- תוכן מלא
- שבוע ומקור
- הסבר "למה זה חשוב?"
- שורת Feedback (הבנתי / צריך חידוד / לא הבנתי)

### עיצוב לפי Kind:

| Kind | גבול | Badge |
|------|------|-------|
| `definition` | כחול (`sky`) | כחול |
| `theorem` | אדום (`rose`) | אדום |
| `formula` | כתום (`amber`) | כתום |
| `concept` | ירוק (`emerald`) | ירוק |

---

## אבטחה ואותנטיקציה

- כל דפי הקורס עטופים ב-`CourseGuard` — סטודנט לא מחובר מנותב ל-`/login`
- קריאות Firestore מהדפים האלו מבוצעות רק אחרי שה-user מחובר
- Firestore rules מאפשרות read ל-`generatedContent` לכל `isAuthed()`
