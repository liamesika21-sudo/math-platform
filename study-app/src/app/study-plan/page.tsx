'use client';

import { useState } from 'react';

// =============================================
// Study Plan — Infi 5.3 + Discrete 11.3
// Start: 17.2.2026
// =============================================

type DayStatus = 'pending' | 'done' | 'skipped';

interface DayPlan {
  date: string;         // e.g. "17.2"
  weekday: string;      // e.g. "שני"
  subject: 'infi' | 'discrete' | 'both' | 'exam' | 'rest';
  title: string;
  tasks: string[];
  tip?: string;
  isExam?: boolean;
}

const PLAN: DayPlan[] = [
  // ===== WEEK 1: 17.2 - 22.2 (Mon-Sat) — INFI FOUNDATIONS =====
  {
    date: '17.2', weekday: 'שני', subject: 'infi',
    title: 'גבולות של סדרות',
    tasks: [
      'הגדרת גבול של סדרה (ε-N)',
      'חשבון גבולות: סכום, מכפלה, מנה',
      'משפט הסנדוויץ\'',
      'סדרות מונוטוניות וחסומות',
      'תרגול: 5 תרגילי חישוב גבולות סדרות',
    ],
    tip: 'תתמקדי בהבנת ההגדרה הפורמלית — זה הבסיס להכל',
  },
  {
    date: '18.2', weekday: 'שלישי', subject: 'infi',
    title: 'גבולות של פונקציות',
    tasks: [
      'הגדרת גבול של פונקציה (ε-δ)',
      'גבולות חד-צדדיים',
      'חשבון גבולות פונקציות',
      'גבולות טריגונומטריים: sin(x)/x → 1',
      'תרגול: 5 תרגילי חישוב גבולות פונקציות',
    ],
  },
  {
    date: '19.2', weekday: 'רביעי', subject: 'infi',
    title: 'רציפות',
    tasks: [
      'הגדרת רציפות (lim f(x) = f(x₀))',
      'סוגי אי-רציפות: סליקה, קפיצה, מהותית',
      'חשבון פונקציות רציפות',
      'רציפות של הרכבה',
      'תרגול: דוגמאות לרציפות/אי-רציפות',
    ],
  },
  {
    date: '20.2', weekday: 'חמישי', subject: 'infi',
    title: 'משפטים על רציפות (ויירשטראס + ע"ב)',
    tasks: [
      'משפט ויירשטראס — ניסוח + משמעות',
      'משפט ערך הביניים (בולצאנו) — ניסוח + הוכחה',
      'משפט ערך הביניים המורחב — ניסוח + הוכחה',
      'משפט נקודת השבת — ניסוח + הוכחה',
      'תרגול: שאלות הוכחת קיום שורש',
    ],
    tip: 'השתמשי בעמוד "משפטים והוכחות" באתר — הכל שם מסודר',
  },
  {
    date: '21.2', weekday: 'שישי', subject: 'infi',
    title: 'נגזרות — חלק א\'',
    tasks: [
      'הגדרת נגזרת',
      'כללי גזירה: סכום, מכפלה, מנה, שרשרת',
      'נגזרות של פונקציות אלמנטריות',
      'משפט פרמה — ניסוח + הוכחה',
      'תרגול: 10 תרגילי גזירה',
    ],
  },
  {
    date: '22.2', weekday: 'שבת', subject: 'infi',
    title: 'נגזרות — חלק ב\' (משפטי הערך הממוצע)',
    tasks: [
      'משפט רול — ניסוח + הוכחה',
      'משפט לגראנז\' (MVT) — ניסוח + הוכחה',
      'משפט קושי — ניסוח + הוכחה',
      'מסקנות מונוטוניות מ-MVT',
      'שרשרת ההוכחות: ויירשטראס → פרמה → רול → לגראנז\' → קושי',
    ],
    tip: 'זה הנושא הכי חשוב במבחן — תשקיעי פה',
  },

  // ===== WEEK 2: 23.2 - 28.2 (Sun-Sat) — INFI ADVANCED + PRACTICE =====
  {
    date: '23.2', weekday: 'ראשון', subject: 'infi',
    title: 'לופיטל + אינטגרלים',
    tasks: [
      'כלל לופיטל — 0/0 ו-∞/∞',
      'אינטגרל לא מסוים — טכניקות בסיסיות',
      'אינטגרציה בחלקים',
      'החלפת משתנה',
      'תרגול: 8 אינטגרלים',
    ],
  },
  {
    date: '24.2', weekday: 'שני', subject: 'infi',
    title: 'אינטגרל מסוים + טיילור',
    tasks: [
      'אינטגרל מסוים — הגדרה ומשפט היסוד',
      'טורי טיילור — הנוסחה + השארית',
      'פיתוחי טיילור חשובים: eˣ, sin, cos, ln(1+x), 1/(1-x)',
      'תרגול: שאלות טיילור',
    ],
  },
  {
    date: '25.2', weekday: 'שלישי', subject: 'infi',
    title: 'מבחן ישן #1 באינפי',
    tasks: [
      'לפתור מבחן ישן שלם עם שעון (3 שעות)',
      'לסמן שאלות שלא ידעת',
      'לעבור על הפתרונות ולהבין טעויות',
    ],
    tip: 'אל תסתכלי על פתרונות תוך כדי — תנסי לבד קודם!',
  },
  {
    date: '26.2', weekday: 'רביעי', subject: 'infi',
    title: 'תיקון טעויות + מבחן ישן #2',
    tasks: [
      'חזרה על נושאים שנפלו במבחן #1',
      'לפתור מבחן ישן שני עם שעון',
      'לתעד טעויות חוזרות',
    ],
  },
  {
    date: '27.2', weekday: 'חמישי', subject: 'both',
    title: 'מבחן ישן #3 באינפי + התחלת בדידה',
    tasks: [
      'בוקר: מבחן ישן #3 באינפי',
      'צהריים: סיכום טעויות חוזרות באינפי',
      'ערב: התחלת בדידה — אינדוקציה (הגדרה + 3 דוגמאות)',
    ],
  },
  {
    date: '28.2', weekday: 'שישי', subject: 'both',
    title: 'השלמת אינפי + בדידה קומבינטוריקה',
    tasks: [
      'בוקר: חזרה סופית על נקודות חלשות באינפי',
      'דפי נוסחאות — הכנה לאינפי',
      'ערב: בדידה — קומבינטוריקה (תמורות, צירופים, בינום)',
    ],
  },

  // ===== WEEK 3: 1.3 - 5.3 (Sun-Thu) — INFI FINAL REVIEW =====
  {
    date: '1.3', weekday: 'ראשון', subject: 'infi',
    title: 'חזרה כללית אינפי',
    tasks: [
      'מעבר על כל ההוכחות (עמוד המשפטים)',
      'מעבר על דף נוסחאות',
      'פתירת שאלות בעייתיות מהמבחנים הישנים',
      'חזרה על טכניקות אינטגרציה',
    ],
  },
  {
    date: '2.3', weekday: 'שני', subject: 'infi',
    title: 'מבחן ישן #4 (אחרון!) + חזרה ממוקדת',
    tasks: [
      'מבחן ישן אחרון עם שעון',
      'מעבר על טעויות',
      'חזרה על 3 הנושאים הכי בעייתיים',
    ],
  },
  {
    date: '3.3', weekday: 'שלישי', subject: 'infi',
    title: 'חזרה אחרונה לפני המבחן',
    tasks: [
      'חזרה קלה — דף נוסחאות + הוכחות מרכזיות',
      'מעבר על טעויות מכל המבחנים',
      'לישון מוקדם!',
    ],
    tip: 'אל תלמדי חומר חדש היום — רק חזרה על מה שכבר את יודעת',
  },
  {
    date: '4.3', weekday: 'רביעי', subject: 'rest',
    title: 'יום מנוחה לפני המבחן',
    tasks: [
      'מעבר קצר על דף נוסחאות בבוקר',
      'מנוחה + אוכל טוב',
      'הכנת ציוד למבחן',
    ],
  },
  {
    date: '5.3', weekday: 'חמישי', subject: 'exam',
    title: 'מבחן אינפי',
    tasks: [
      'לקרוא את כל השאלות קודם',
      'להתחיל מהשאלה הכי קלה',
      'לא להיתקע — לעבור הלאה ולחזור',
    ],
    isExam: true,
  },

  // ===== WEEK 3.5: 6.3 - 11.3 — DISCRETE INTENSIVE =====
  {
    date: '6.3', weekday: 'שישי', subject: 'discrete',
    title: 'בדידה — אינדוקציה + יחסים',
    tasks: [
      'אינדוקציה: רגילה + חזקה + מבנית',
      'יחסי שקילות: הגדרה + מחלקות שקילות',
      'יחסי סדר: חלקי, מלא',
      'תרגול: 5 שאלות אינדוקציה + 3 שאלות יחסים',
    ],
  },
  {
    date: '7.3', weekday: 'שבת', subject: 'discrete',
    title: 'בדידה — קומבינטוריקה + עקרונות ספירה',
    tasks: [
      'עקרון ההכלה-הפרדה',
      'פונקציות יוצרות (אם היה בחומר)',
      'עקרון שובך היונים',
      'תרגול: 8 שאלות קומבינטוריקה',
    ],
  },
  {
    date: '8.3', weekday: 'ראשון', subject: 'discrete',
    title: 'בדידה — גרפים',
    tasks: [
      'הגדרות: גרף, דרגה, מסלול, מעגל, קשירות',
      'עצים: הגדרות + תכונות (n-1 צלעות)',
      'גרפים אוילריאנים והמילטוניאנים',
      'גרפים דו-צדדיים + מישוריים (נוסחת אוילר)',
      'תרגול: 5 שאלות גרפים',
    ],
  },
  {
    date: '9.3', weekday: 'שני', subject: 'discrete',
    title: 'מבחן ישן #1 בדידה + חזרה',
    tasks: [
      'מבחן ישן שלם עם שעון',
      'סימון נושאים חלשים',
      'חזרה ממוקדת על מה שנפל',
    ],
  },
  {
    date: '10.3', weekday: 'שלישי', subject: 'discrete',
    title: 'מבחן ישן #2 בדידה + חזרה אחרונה',
    tasks: [
      'מבחן ישן שני עם שעון',
      'מעבר על טעויות',
      'חזרה על נוסחאות ודברים שנופלים',
      'לישון מוקדם!',
    ],
    tip: 'אם נשאר זמן — עוד מבחן ישן שלישי',
  },
  {
    date: '11.3', weekday: 'רביעי', subject: 'exam',
    title: 'מבחן בדידה',
    tasks: [
      'לקרוא את כל השאלות קודם',
      'להתחיל מהשאלה הכי קלה',
      'שאלות אינדוקציה — קלות יחסית, לא לפספס',
    ],
    isExam: true,
  },
];

function getSubjectColor(subject: DayPlan['subject']) {
  switch (subject) {
    case 'infi': return { bg: 'bg-blue-50', border: 'border-blue-400', badge: 'bg-blue-600', text: 'text-blue-800', label: 'אינפי' };
    case 'discrete': return { bg: 'bg-purple-50', border: 'border-purple-400', badge: 'bg-purple-600', text: 'text-purple-800', label: 'בדידה' };
    case 'both': return { bg: 'bg-amber-50', border: 'border-amber-400', badge: 'bg-amber-600', text: 'text-amber-800', label: 'אינפי + בדידה' };
    case 'exam': return { bg: 'bg-red-50', border: 'border-red-500', badge: 'bg-red-600', text: 'text-red-800', label: 'מבחן' };
    case 'rest': return { bg: 'bg-green-50', border: 'border-green-400', badge: 'bg-green-600', text: 'text-green-800', label: 'מנוחה' };
  }
}

export default function StudyPlanPage() {
  const [statuses, setStatuses] = useState<Record<string, DayStatus>>({});

  const toggleStatus = (date: string) => {
    setStatuses(prev => {
      const current = prev[date] || 'pending';
      const next: DayStatus = current === 'pending' ? 'done' : current === 'done' ? 'skipped' : 'pending';
      return { ...prev, [date]: next };
    });
  };

  const doneCount = Object.values(statuses).filter(s => s === 'done').length;
  const totalDays = PLAN.length;
  const progress = Math.round((doneCount / totalDays) * 100);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 10pt; }
          * { box-shadow: none !important; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          @page { margin: 1.2cm; }
        }
      `}</style>

      <div dir="rtl" className="print-page max-w-4xl mx-auto p-6 bg-white text-black">

        {/* Header */}
        <div className="no-print flex justify-between items-center mb-4">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
          >
            הדפס תוכנית
          </button>
          <a href="/" className="text-indigo-600 underline text-sm">חזרה לעמוד הראשי</a>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">תוכנית לימודים למועד ב&apos;</h1>
          <p className="text-gray-500 mt-1">17.2 — 11.3.2026</p>
          <div className="flex justify-center gap-4 mt-3 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">אינפי — 5.3</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">בדידה — 11.3</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="no-print mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>התקדמות: {doneCount}/{totalDays} ימים</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-l from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="no-print flex gap-3 mb-6 text-xs flex-wrap">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" /> אינפי</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-600 inline-block" /> בדידה</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-600 inline-block" /> שניהם</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-600 inline-block" /> מבחן</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-600 inline-block" /> מנוחה</span>
          <span className="mr-4 text-gray-400">לחצי על יום כדי לסמן: בוצע / דילוג / ממתין</span>
        </div>

        {/* Week Headers + Days */}
        {renderWeek('שבוע 1 — אינפי יסודות', '17.2 - 22.2', PLAN.slice(0, 6), statuses, toggleStatus)}
        {renderWeek('שבוע 2 — אינפי מתקדם + תרגול', '23.2 - 28.2', PLAN.slice(6, 12), statuses, toggleStatus)}
        {renderWeek('שבוע 3 — חזרה סופית + מבחן אינפי', '1.3 - 5.3', PLAN.slice(12, 17), statuses, toggleStatus)}
        {renderWeek('שבוע 4 — בדידה אינטנסיבי + מבחן', '6.3 - 11.3', PLAN.slice(17), statuses, toggleStatus)}

        {/* Summary Stats */}
        <div className="mt-8 bg-gray-50 border-2 border-gray-200 rounded-lg p-5 print:break-inside-avoid">
          <h3 className="font-bold text-lg mb-3">סיכום התוכנית</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-700">13</div>
              <div className="text-blue-600">ימי אינפי</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-700">5</div>
              <div className="text-purple-600">ימי בדידה</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-700">4+</div>
              <div className="text-amber-600">מבחנים ישנים אינפי</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-700">2+</div>
              <div className="text-amber-600">מבחנים ישנים בדידה</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <strong>הכלל הכי חשוב:</strong> מבחנים ישנים &gt; הכל. כל מבחן ישן ששווה יותר מ-5 שעות קריאת חומר.
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200">
          <p>תוכנית לימודים — מועד ב&apos; תשפ&quot;ו</p>
        </div>
      </div>
    </>
  );
}

function renderWeek(title: string, dateRange: string, days: DayPlan[], statuses: Record<string, DayStatus>, toggleStatus: (date: string) => void) {
  return (
    <div className="mb-6">
      <div className="bg-gray-900 text-white px-4 py-2 rounded-t-lg print:break-after-avoid">
        <h2 className="font-bold text-base">{title}</h2>
        <p className="text-gray-400 text-xs">{dateRange}</p>
      </div>
      <div className="border-2 border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-100">
        {days.map(day => {
          const colors = getSubjectColor(day.subject);
          const status = statuses[day.date] || 'pending';
          return (
            <div
              key={day.date}
              onClick={() => toggleStatus(day.date)}
              className={`p-4 cursor-pointer transition-all print:break-inside-avoid ${
                status === 'done' ? 'bg-green-50 opacity-75' :
                status === 'skipped' ? 'bg-gray-100 opacity-50' :
                colors.bg
              } ${day.isExam ? 'ring-2 ring-red-400 ring-inset' : ''}`}
            >
              <div className="flex items-start gap-3">
                {/* Status indicator */}
                <div className={`no-print flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold mt-0.5 ${
                  status === 'done' ? 'bg-green-500 border-green-500 text-white' :
                  status === 'skipped' ? 'bg-gray-400 border-gray-400 text-white' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {status === 'done' ? '\u2713' : status === 'skipped' ? '\u2717' : ''}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`${colors.badge} text-white text-xs px-2 py-0.5 rounded font-bold`}>
                      {colors.label}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">{day.weekday} {day.date}</span>
                    {day.isExam && <span className="text-red-600 font-bold text-sm animate-pulse">&#9733; יום מבחן!</span>}
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-base mt-1 ${status === 'done' ? 'line-through text-gray-500' : ''}`}>
                    {day.title}
                  </h3>

                  {/* Tasks */}
                  <ul className="mt-2 space-y-1">
                    {day.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-gray-400 mt-0.5 flex-shrink-0">{day.isExam ? '\u2022' : '\u25A1'}</span>
                        <span className={status === 'done' ? 'line-through text-gray-400' : ''}>{task}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tip */}
                  {day.tip && (
                    <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded px-3 py-1.5 text-xs text-yellow-800">
                      <strong>טיפ:</strong> {day.tip}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
