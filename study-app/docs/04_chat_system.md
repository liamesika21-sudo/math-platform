# מערכת הצ'אט – מנטור AI

## סקירה

הצ'אט הוא הלב של הפלטפורמה. מנטור AI בעברית שמדריך סטודנטים מבלי לתת להם תשובות ישירות.

**URL:** `/courses/{courseId}/chat`

---

## זרימת הודעה מלאה

```
סטודנט כותב הודעה
       │
       ▼
בדיקת מילות דגל (flagged keywords)
       │
       ├── [נמצאה מילת דגל] → יוצר chatAlerts/{docId}
       │
       ▼
POST /api/chat
  ├── courseId
  ├── messages[] (היסטוריה)
  └── imageBase64? (תמונה אופציונלית)
       │
       ▼
buildSystemPrompt(courseId)
  ├── 1. טוען course metadata
  ├── 2. בונה knowledge markdown מ-data.ts
  │     ├── סיכומי שבועות
  │     ├── נושאים
  │     ├── כל ה-theory items (הגדרות, משפטים...)
  │     └── שאלות תרגול
  └── 3. מוסיף generatedContent מ-Firestore
        └── תוכן שנוצר מ-PDFs שהועלו
       │
       ▼
OpenAI GPT-4o (streaming)
  ├── model: gpt-4o
  ├── stream: true
  └── messages: [system, ...history, user]
       │
       ▼
ReadableStream → Client
  └── מציג תוכן בזמן אמת תוך כדי קבלה
       │
       ▼
שמירה ב-Firestore: chats/{courseId}_{userId}
  ├── messages[] (כל השיחה)
  └── lastMessageAt: timestamp
```

---

## System Prompt – הוראות למנטור

המנטור מקבל הנחיות בעברית:

### עקרונות ההדרכה:
- **לא לתת תשובות ישירות** – להנחות בשאלות
- **LaTeX למתמטיקה** – `\( inline \)` ו-`\[ display \]`
- **רק עברית** (אלא אם הסטודנט כותב באנגלית)
- **גישה סוקרטית** – שאלות מנחות, לא תשובות מוכנות
- **הכרה בגבולות** – אם שאלה לא קשורה לחומר הקורס, להפנות

### מה המנטור "יודע":
כל פריטי התיאוריה + השאלות של הקורס, בנויים לתוך ה-system prompt כ-markdown.

**לדוגמה:**
```markdown
## שבוע 1: תורת הקבוצות
### הגדרות
**קבוצה**: אוסף של אובייקטים...
**חזקת קבוצה**: קבוצת כל תתי-הקבוצות...

### משפטים
**משפט קנטור**: לכל קבוצה A, |A| < |P(A)|...
```

---

## תמיכה בתמונות

סטודנטים יכולים לצרף תמונה לשאלה (למשל צילום שיעורי בית):

1. בחירת תמונה ב-UI
2. דחיסה + המרה ל-base64
3. שליחה ל-API עם ה-`imageBase64` field
4. OpenAI GPT-4o Vision מנתח גם תמונה וגם טקסט

---

## Firestore – שמירת שיחות

**קולקציה:** `chats/{courseId}_{userId}`

```json
{
  "userId": "uid123",
  "courseId": "logic",
  "messages": [
    { "id": "uuid", "role": "user", "content": "מה זה קבוצת חזקה?" },
    { "id": "uuid", "role": "assistant", "content": "שאלה טובה! לפני שאענה..." }
  ],
  "lastMessageAt": "2025-03-18T..."
}
```

**TTL:** שיחות מסתיימות לאחר 72 שעות.

---

## Chat Alerts – מעקב אחרי מצוקה

כאשר הודעת סטודנט מכילה מילת דגל (לדוג' "לא מבין כלום", "אני אובד"):

**קולקציה:** `chatAlerts/{docId}`
```json
{
  "courseId": "logic",
  "userId": "uid123",
  "userName": "ישראל ישראלי",
  "flaggedWord": "...",
  "messageText": "...",
  "createdAt": "..."
}
```

- האדמין רואה את ההתראות ב-`/admin/{courseId}/alerts`
- מאפשר זיהוי מוקדם של סטודנטים במצוקה

---

## Math Rendering – LaTeX

**קומפוננט:** `src/components/MathText.tsx`

- `\( x^2 + y^2 \)` → inline math
- `\[ \sum_{i=1}^{n} i = \frac{n(n+1)}{2} \]` → display math
- מרונדר ב-KaTeX בזמן אמת בתוך הודעות

---

## Suggestions – הצעות פתיחה

כשהצ'אט ריק, מוצגות 3 הצעות שאלה לפי הקורס:

**לוגיקה:**
- "הסבר לי מה זה הוכחה בשיטת האלכסון של קנטור"
- "מה ההבדל בין ∀ ל-∃?"

**מבני נתונים:**
- "מתי כדאי להשתמש ב-Hash Table לעומת BST?"
- "הסבר Amortized Analysis"

---

## הגנות ו-Security

- כל הודעה דורשת Firebase Auth token תקף
- שיחות פרטיות – כל משתמש רואה רק את שלו (Firestore rules)
- אדמין יכול לקרוא כל שיחה
- אין שמירת מידע רגיש בתוך ה-messages
