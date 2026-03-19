# סקירת המערכת הכללית – Infi Learning Platform

## מה זה?

פלטפורמת למידה מבוססת AI לסטודנטים באוניברסיטה, כרגע לשני קורסים:
- **לוגיקה ותורת הקבוצות** (`logic`)
- **מבני נתונים** (`data-structures`)

הפלטפורמה מאפשרת לסטודנטים ללמוד עם מנטור AI, לעקוב אחרי ההתקדמות שלהם, ולגשת לכל חומרי הקורס. לאדמין יש ממשק לניהול תכנים, סטודנטים ומעקב.

---

## מחסנית טכנולוגית

| שכבה | טכנולוגיה |
|------|------------|
| Frontend + Backend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Auth + DB | Firebase Auth, Firestore, Firebase Storage |
| Local Cache | Dexie (IndexedDB בדפדפן) |
| AI | OpenAI GPT-4o |
| Math Rendering | KaTeX / react-katex |
| PDF Processing | pdf-parse, pdfjs-dist |
| Deploy | Vercel (`math-platform-nine.vercel.app`) |

---

## זרימה כללית במערכת

```
אדמין
  └─► מעלה PDF (הרצאה / תרגול / שיעורי בית / מבחן)
        └─► Firebase Storage (שמירה)
              └─► Firestore courses/{id}/content (מטאדטה)
                    └─► AI Analysis (OpenAI GPT-4o)
                          └─► Firestore courses/{id}/generatedContent
                                └─► נטען ל-System Prompt של הצ'אט
                                      └─► סטודנט שואל → מנטור AI עונה

סטודנט
  └─► לוגין (Firebase Auth)
        └─► בוחר קורס
              └─► צ'אט / תיאוריה / שאלות / שיעורי בית
                    └─► מחוות (got_it / needs_review / lost)
                          └─► נשמר ב-Firestore theoryFeedback
                                └─► אדמין רואה בדשבורד
```

---

## משתמשים במערכת

### סטודנט
- מתחבר עם מייל + סיסמה (Firebase Auth)
- ניגש לקורסים שנרשם אליהם
- משתמש בצ'אט AI, קורא תיאוריה, פותר שאלות
- נותן מחוות על פריטי תיאוריה

### אדמין
- Custom Claim ב-Firebase: `admin: true`
- ניגש לכל ממשק הניהול תחת `/admin`
- מעלה חומרים, מנהל סטודנטים, רואה התראות ואנליטיקות
- נוצר דרך הסקריפט `scripts/create-admin.mjs`

### מרצה (חדש)
- ממלא טופס onboarding ב-`/lecturer_onboarding_form`
- השליחה נשמרת ב-Firestore `lecturer_onboarding_submissions` (ללא auth)
- לא צריך חשבון במערכת כדי לשלוח

---

## קורסים – מבנה

כל קורס מורכב מ:

```
Course
├── 13–14 שבועות (weeks)
├── נושאים (topics) לפי שבוע
├── פריטי תיאוריה (theoryItems)
│   └── definition / theorem / formula / concept
├── שאלות (questions)
│   └── tutorial / homework / exam
└── מקורות (source documents)
    └── PDFs שהועלו + תוכן שנוצר ב-AI
```

### קורס לוגיקה (logic)
- צבע: סגול–אינדיגו
- ~25 פריטי תיאוריה: הגדרות, אקסיומות ZFC, משפטים
- שבוע 1: תורת הקבוצות

### קורס מבני נתונים (data-structures)
- צבע: ירוק–טורקיז
- ~50+ פריטי תיאוריה: אלגוריתמים, מבני נתונים, ניתוח מורכבות
- שבוע 1: מבוא לאלגוריתמים ו-ADTs

---

## Environment Variables

```env
# OpenAI
OPENAI_API_KEY=sk-proj-...

# Firebase Client (NEXT_PUBLIC – חשוף לדפדפן)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=reichman-math.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=reichman-math
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=reichman-math.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Firebase Admin (Server-only – לא חשוף)
FIREBASE_PROJECT_ID=reichman-math
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@reichman-math.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=reichman-math.firebasestorage.app
```

---

## URLs

| סביבה | URL |
|--------|-----|
| Production | `https://math-platform-nine.vercel.app` |
| Admin | `https://math-platform-nine.vercel.app/admin` |
| Lecturer Onboarding | `https://math-platform-nine.vercel.app/lecturer_onboarding_form` |
| Firebase Console | `https://console.firebase.google.com/project/reichman-math` |
