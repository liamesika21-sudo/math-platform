# Firebase – Collections, Rules & Storage

## Firestore Collections

### 1. `students/{uid}`
מידע על כל סטודנט במערכת.

```
students/
└── {firebaseUid}/
    ├── name: string
    ├── email: string
    ├── studentId: string          ← ת.ז / מספר סטודנט
    └── courses/
        └── {courseId}/
            ├── status: 'active' | 'inactive'
            └── enrolledAt: timestamp
```

**מי כותב:** אדמין (דרך import), Firebase Admin SDK
**מי קורא:** הסטודנט עצמו, אדמין

---

### 2. `courses/{courseId}/content/{docId}`
מטאדטה על קבצים שהועלו לקורס.

```
courses/
└── {courseId}/
    └── content/
        └── {docId}/
            ├── filename: string
            ├── type: 'lecture' | 'tutorial' | 'homework' | 'exam'
            ├── week: number (1-13)
            ├── status: 'uploaded' | 'analyzing' | 'analyzed' | 'error'
            ├── errorMessage?: string
            ├── url: string               ← public download URL
            ├── storagePath: string       ← path in Firebase Storage
            └── uploadedAt: timestamp
```

**מי כותב:** אדמין דרך `/api/admin/curriculum/upload`
**מי קורא:** אדמין, מערכת הניתוח

---

### 3. `courses/{courseId}/generatedContent/{weekId}`
תוכן שנוצר ב-AI מניתוח PDFs.

```
courses/
└── {courseId}/
    └── generatedContent/
        └── week{N}/              ← לדוג' "week3"
            ├── theoryItems[]:
            │   ├── kind: 'definition' | 'theorem' | 'formula' | 'concept'
            │   ├── title: string
            │   ├── content: string
            │   └── sourcePage: number
            ├── tutorialQuestions[]:
            │   ├── number: number
            │   ├── content: string
            │   ├── difficulty: 'easy' | 'medium' | 'hard'
            │   └── sourcePage: number
            ├── homeworkQuestions[]: [...]
            └── examQuestions[]: [...]
```

**מי כותב:** `/api/admin/curriculum/analyze` (OpenAI)
**מי קורא:** `/api/chat` (לבניית system prompt), ממשק הסטודנט

---

### 4. `theoryFeedback/{docId}`
מחוות של סטודנטים על פריטי תיאוריה.

```
theoryFeedback/
└── {courseId}_{userId}_{theoryItemId}/
    ├── courseId: string
    ├── userId: string
    ├── theoryItemId: string
    ├── status: 'got_it' | 'needs_review' | 'lost'
    └── updatedAt: timestamp
```

**מי כותב:** סטודנט (עם Auth)
**מי קורא:** הסטודנט עצמו, אדמין

---

### 5. `chats/{courseId}_{userId}`
היסטוריית שיחות עם המנטור AI.

```
chats/
└── {courseId}_{userId}/           ← לדוג' "logic_uid123"
    ├── userId: string
    ├── courseId: string
    ├── messages[]:
    │   ├── id: string (uuid)
    │   ├── role: 'user' | 'assistant'
    │   ├── content: string
    │   └── imagePreview?: string
    └── lastMessageAt: timestamp
```

**מי כותב:** `/api/chat` לאחר כל שיחה
**מי קורא:** הסטודנט עצמו, אדמין
**TTL:** 72 שעות

---

### 6. `chatAlerts/{docId}`
התראות שנוצרות כשסטודנט כותב מילות דגל.

```
chatAlerts/
└── {uuid}/
    ├── courseId: string
    ├── userId: string
    ├── userName: string
    ├── flaggedWord: string
    ├── messageText: string
    └── createdAt: timestamp
```

**מי כותב:** כל משתמש מחובר (בצד הלקוח, בזמן שליחת הודעה)
**מי קורא:** אדמין בלבד

---

### 7. `lecturer_onboarding_submissions/{docId}`
טפסי onboarding שמרצים מילאו.

```
lecturer_onboarding_submissions/
└── {uuid}/
    ├── name: string
    ├── email: string
    ├── course_name: string
    ├── semester: string
    ├── [+ כל שאר שדות הטופס]
    └── submittedAt: timestamp
```

**מי כותב:** כל אחד (public – ללא Auth)
**מי קורא:** אדמין בלבד

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isAdmin() {
      return request.auth != null && request.auth.token.admin == true;
    }
    function isAuthed() {
      return request.auth != null;
    }

    // סטודנטים – כל אחד קורא/כותב למסמך שלו
    match /students/{uid} {
      allow read, write: if isAuthed() && request.auth.uid == uid;
      allow read, write: if isAdmin();
    }

    // מחוות תיאוריה – סטודנטים מנהלים שלהם, אדמין קורא הכל
    match /theoryFeedback/{docId} {
      allow read: if isAdmin();
      allow read: if isAuthed() && resource.data.userId == request.auth.uid;
      allow create: if isAuthed()
        && request.resource.data.userId == request.auth.uid
        && request.resource.data.status in ['got_it', 'needs_review', 'lost'];
      allow update: if isAuthed() && resource.data.userId == request.auth.uid
        && request.resource.data.status in ['got_it', 'needs_review', 'lost'];
      allow delete: if isAuthed() && resource.data.userId == request.auth.uid;
    }

    // קורסים – סטודנטים קוראים, אדמין כותב
    match /courses/{courseId} {
      allow read: if isAuthed();
      allow write: if isAdmin();
      match /content/{docId} {
        allow read: if isAuthed();
        allow write: if isAdmin();
      }
      match /generatedContent/{weekId} {
        allow read: if isAuthed();
        allow write: if isAdmin();
      }
    }

    // צ'אטים – כל משתמש רואה שלו, אדמין רואה הכל
    match /chats/{docId} {
      allow read: if isAuthed() && resource.data.userId == request.auth.uid;
      allow create: if isAuthed() && request.resource.data.userId == request.auth.uid;
      allow update: if isAuthed() && resource.data.userId == request.auth.uid;
      allow delete: if isAuthed() && resource.data.userId == request.auth.uid;
      allow read, write: if isAdmin();
    }

    // התראות – כל מחובר יוצר, אדמין מנהל
    match /chatAlerts/{docId} {
      allow create: if isAuthed();
      allow read, write: if isAdmin();
    }

    // טופס מרצים – ציבורי לכתיבה, אדמין לקריאה
    match /lecturer_onboarding_submissions/{docId} {
      allow create: if true;
      allow read, write: if isAdmin();
    }
  }
}
```

---

## Firebase Storage

### מבנה התיקיות:
```
courses/
└── {courseId}/
    └── week{N}/
        └── {type}/
            └── {filename}.pdf
```

**דוגמה:**
```
courses/logic/week3/lecture/intro_to_sets.pdf
courses/logic/week3/tutorial/exercises_week3.pdf
courses/data-structures/week1/homework/hw1.pdf
```

### הגדרות גישה (storage.rules):
- **קריאה ציבורית** – כל מי שיש לו URL יכול לקרוא
- **כתיבה** – אדמין בלבד

---

## Firestore Indexes

| קולקציה | שדות | סוג |
|----------|-------|-----|
| `theoryFeedback` | courseId ASC, userId ASC | Composite |
| `theoryFeedback` | courseId ASC, updatedAt DESC | Composite |
| `content` (collection group) | week ASC, type ASC | Collection Group |
| `chats` | courseId ASC, lastMessageAt DESC | Composite |
| `chatAlerts` | courseId ASC, createdAt DESC | Composite |
