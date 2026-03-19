# פאנל האדמין – מדריך מלא

## גישה לאדמין

**URL:** `/admin`

רק משתמשים עם `admin: true` ב-Firebase Custom Claims יכולים לגשת.

### יצירת אדמין חדש:
```bash
cd study-app
node scripts/create-admin.mjs
```

הסקריפט יוצר/מעדכן את המשתמש `admin@reichman.ac.il` ומגדיר לו את ה-claim.

---

## מבנה הניווט

```
/admin
├── [בחירת קורס]
│
└── /admin/{courseId}
    ├── Dashboard          – סיכום כללי
    ├── Curriculum         – העלאת וניהול חומרים
    ├── Students           – ניהול סטודנטים
    ├── Questions          – בנק שאלות
    ├── Assignments        – מטלות
    ├── Gradebook          – ציונים
    ├── Analytics          – אנליטיקות
    ├── Alerts             – התראות מהצ'אט
    ├── Mistakes           – טעויות נפוצות
    ├── Insights           – תובנות לומדים
    ├── Adaptive           – המלצות אדפטיביות
    └── Topics             – ניהול נושאים
```

---

## Dashboard – `/admin/{courseId}`

### מה מוצג:
- **כרטיסי סטטוס:**
  - מספר סטודנטים רשומים
  - מספר שאלות במערכת
  - מטלות פעילות
  - שבוע נוכחי בקורס

- **פעולות מהירות:**
  - העלה תכנית לימודים
  - ייבא סטודנטים
  - הוסף שאלות
  - צפה בטעויות נפוצות

- **מדדים:**
  - אחוז השלמת החומר
  - זמן לימוד יומי ממוצע
  - מגמת ביצועים

---

## Curriculum – `/admin/{courseId}/curriculum`

**הפעולה המרכזית ביותר.**

### העלאת קבצים

1. **גרור ושחרר** PDF לאזור ההעלאה, או **בחר קבצים**
2. המערכת **מנחשת אוטומטית** את סוג הקובץ לפי שם:
   - מכיל "lecture" / "הרצאה" → `lecture`
   - מכיל "tutorial" / "תרגול" → `tutorial`
   - מכיל "hw" / "homework" / "שיעורי בית" → `homework`
   - מכיל "exam" / "מבחן" → `exam`
3. ניתן לשנות ידנית + לבחור שבוע
4. **Upload** → הקובץ עולה ל-Firebase Storage + מטאדטה ל-Firestore

### ניתוח AI

לאחר העלאה, לחץ **"Analyze with AI"** על כל קובץ:
- סטטוס עובר: `uploaded → analyzing → analyzed`
- OpenAI GPT-4o קורא את הטקסט ומחלץ:
  - **הרצאות** → הגדרות, משפטים, נוסחאות, מושגים
  - **תרגולים / שיעורי בית / מבחנים** → שאלות עם דרגת קושי

### ניהול קבצים

- **תצוגה לפי שבוע** – קבצים מקובצים שבוע-שבוע
- **קיפול/פריסה** של כל שבוע
- **מחיקת קובץ** (עם אישור) – מוחק מ-Storage ומ-Firestore
- **לינק לצפייה** בקובץ המקורי
- **אינדיקטור סטטוס** – צבע לפי מצב (מועלה / בניתוח / נותח / שגיאה)

---

## Students – `/admin/{courseId}/students`

### ייבוא סטודנטים בצובר

**API:** `POST /api/admin/students/import`

מקבל JSON/CSV עם:
```json
[
  { "name": "ישראל ישראלי", "email": "israel@university.ac.il", "studentId": "123456789" },
  ...
]
```

**מה קורה:**
1. לכל סטודנט – יצירת/עדכון חשבון Firebase Auth
2. שמירת/עדכון מסמך ב-`students/{uid}`
3. רישום לקורס: `courses[courseId].status = 'active'`

### רשימת סטודנטים

**API:** `GET /api/admin/students?courseId={id}`

מציג לכל סטודנט:
- שם, מייל, מספר סטודנט
- תאריך הרשמה
- **סטטיסטיקת מחוות תיאוריה:**
  - ✓ `got_it` – כמה פריטים הסטודנט מרגיש בטוח
  - ⚠️ `needs_review` – דורש עוד עבודה
  - ✗ `lost` – לא מבין

---

## Alerts – `/admin/{courseId}/alerts`

### מה זה?
כאשר סטודנט כותב בצ'אט הודעה המכילה **מילות דגל** (flagged keywords) שהוגדרו לקורס – נוצר מסמך התראה ב-Firestore.

**קולקציה:** `chatAlerts/{docId}`
```json
{
  "courseId": "logic",
  "userId": "uid123",
  "userName": "ישראל ישראלי",
  "flaggedWord": "לא מבין כלום",
  "messageText": "...",
  "createdAt": timestamp
}
```

### מה האדמין רואה:
- שם הסטודנט + זמן
- ההודעה שהפעילה התראה
- המילה/ביטוי שזוהה
- אפשרות לפנות לסטודנט

---

## Analytics – `/admin/{courseId}/analytics`

נמצא בפיתוח. מיועד להציג:
- כמה סטודנטים למדו כל שבוע
- זמן לימוד ממוצע
- אחוזי הצלחה בשאלות

---

## Mistakes / Insights / Adaptive

שלושה דשבורדים שנמצאים בפיתוח, מיועדים ל:
- **Mistakes** – אילו שאלות הכי קשות (הרבה טעויות)
- **Insights** – תובנות על לומדים בודדים
- **Adaptive** – המלצות אוטומטיות לפי ביצועים

---

## Security

כל route של API עם `/api/admin/` מוגן בשרת:
```typescript
const token = await verifyIdToken(authHeader);
if (!token.admin) return 403 Forbidden;
```

כל דף אדמין מוגן בצד הלקוח:
```typescript
// admin/layout.tsx
if (!user?.admin) redirect('/admin/login');
```

---

## Admin Sidebar – ניווט

`src/components/admin/AdminSidebar.tsx`

- מציג את שם הקורס הנוכחי
- Links לכל הדפים עם אייקונים
- Active state לדף הנוכחי
- כפתור Logout
