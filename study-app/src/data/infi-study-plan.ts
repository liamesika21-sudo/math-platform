// Study plan for Calculus 1 - מועד ב preparation

export interface StudyDay {
  date: string;
  dayName: string;
  dayNameHe: string;
  isStudyDay: boolean;
  topics: StudyTopic[];
  tasks: StudyTask[];
}

export interface StudyTopic {
  name: string;
  nameHe: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'practice' | 'memorize' | 'exam-simulation';
  estimatedMinutes: number;
  resources: string[];
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  focus: string;
  days: StudyDay[];
}

export function generateStudyPlan(): WeekPlan[] {
  return [
    {
      weekNumber: 1,
      startDate: '2026-02-13',
      endDate: '2026-02-20',
      focus: 'הכנה אינטנסיבית למועד ב\' - חשבון אינפיניטסימלי',
      days: [
        {
          date: '2026-02-13',
          dayName: 'Friday',
          dayNameHe: 'שישי',
          isStudyDay: true,
          topics: [
            { name: 'limits', nameHe: 'גבולות', priority: 'high', estimatedHours: 2 },
            { name: 'sequences', nameHe: 'סדרות', priority: 'high', estimatedHours: 2 },
            { name: 'continuity', nameHe: 'רציפות', priority: 'medium', estimatedHours: 1.5 },
          ],
          tasks: [
            {
              id: 'fri-1',
              title: 'חזרה על גבולות',
              description: 'הגדרת ε-δ, חוקי גבולות, גבולות חשובים, לופיטל',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 7-10', 'תרגולים 4-5'],
            },
            {
              id: 'fri-2',
              title: 'תרגול גבולות ממבחנים',
              description: 'פתור 5 שאלות גבולות ממבחני עבר',
              type: 'practice',
              estimatedMinutes: 75,
              resources: ['מבחן 2024 מועד ב', 'מבחן 2023 מועד א'],
            },
            {
              id: 'fri-3',
              title: 'חזרה על סדרות',
              description: 'התכנסות, מונוטוניות, בולצאנו-ויירשטראס, סדרות רקורסיביות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 3-6', 'תרגולים 2-3'],
            },
            {
              id: 'fri-4',
              title: 'שינון גבולות חשובים',
              description: 'sin(x)/x, (1+1/n)^n, e^x-1/x ועוד',
              type: 'memorize',
              estimatedMinutes: 20,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'fri-5',
              title: 'חזרה על רציפות',
              description: 'הגדרה, IVT, EVT, רציפות במידה שווה',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאות 10-12'],
            },
          ],
        },
        {
          date: '2026-02-14',
          dayName: 'Saturday',
          dayNameHe: 'שבת',
          isStudyDay: true,
          topics: [
            { name: 'derivatives', nameHe: 'נגזרות', priority: 'high', estimatedHours: 3 },
            { name: 'mean-value', nameHe: 'ערך ממוצע + לופיטל', priority: 'high', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'sat-1',
              title: 'חזרה על נגזרות',
              description: 'כללי גזירה, שרשרת, מכפלה, מנה, נגזרות פונקציות אלמנטריות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 13-16'],
            },
            {
              id: 'sat-2',
              title: 'תרגול נגזרות ממבחנים',
              description: 'פתור 5 שאלות נגזרות + יישומים ממבחנים',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחנים 2022-2025'],
            },
            {
              id: 'sat-3',
              title: 'משפט הערך הממוצע + רול',
              description: 'חזרה על MVT, משפט רול, יישומים, הוכחות',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאות 15-17'],
            },
            {
              id: 'sat-4',
              title: 'לופיטל - תרגול',
              description: 'פתור 5 גבולות עם לופיטל (0/0, ∞/∞, 0·∞, 1^∞)',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['תרגילי בית 8-9'],
            },
            {
              id: 'sat-5',
              title: 'שינון כללי גזירה',
              description: 'חזרה על טבלת נגזרות',
              type: 'memorize',
              estimatedMinutes: 20,
              resources: ['דף נוסחאות'],
            },
          ],
        },
        {
          date: '2026-02-15',
          dayName: 'Sunday',
          dayNameHe: 'ראשון',
          isStudyDay: true,
          topics: [
            { name: 'taylor', nameHe: 'טיילור', priority: 'high', estimatedHours: 2.5 },
            { name: 'series', nameHe: 'טורים', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'sun-1',
              title: 'חזרה על טיילור',
              description: 'פולינום טיילור, שארית לגראנז\', פיתוחי מקלורן של פונקציות יסודיות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 17-18'],
            },
            {
              id: 'sun-2',
              title: 'שינון פיתוחי טיילור',
              description: 'e^x, sin, cos, ln(1+x), 1/(1-x), arctan',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'sun-3',
              title: 'תרגול טיילור ממבחנים',
              description: 'חישוב גבולות עם טיילור, קירובים, שארית',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['מבחנים 2023-2025'],
            },
            {
              id: 'sun-4',
              title: 'חזרה על טורים',
              description: 'מבחני התכנסות: דלמבר, קושי, השוואה, לייבניץ, טור p',
              type: 'review',
              estimatedMinutes: 75,
              resources: ['הרצאות 22-23', 'תרגולים 12-13'],
            },
            {
              id: 'sun-5',
              title: 'תרגול טורים',
              description: 'פתור 6 שאלות טורים ומבחני התכנסות',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['תרגילי בית 12'],
            },
          ],
        },
        {
          date: '2026-02-16',
          dayName: 'Monday',
          dayNameHe: 'שני',
          isStudyDay: true,
          topics: [
            { name: 'series', nameHe: 'טורי חזקות + רדיוס התכנסות', priority: 'high', estimatedHours: 2.5 },
            { name: 'continuity', nameHe: 'רציפות במידה שווה', priority: 'high', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'mon-1',
              title: 'טורי חזקות',
              description: 'רדיוס התכנסות, בדיקת קצוות, התכנסות מוחלטת ובתנאי',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 22-23', 'תרגולים 12-13'],
            },
            {
              id: 'mon-2',
              title: 'תרגול טורי חזקות',
              description: 'פתור 4 שאלות רדיוס התכנסות + קצוות',
              type: 'practice',
              estimatedMinutes: 75,
              resources: ['תרגילי בית 12'],
            },
            {
              id: 'mon-3',
              title: 'שינון מבחני התכנסות',
              description: 'שנן את כל מבחני ההתכנסות + תנאים',
              type: 'memorize',
              estimatedMinutes: 25,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'mon-4',
              title: 'חזרה על רציפות במידה שווה',
              description: 'הגדרת רב"ש, משפט קנטור, שלילת רב"ש, ליפשיץ',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 11-12', 'תרגילי בית 6'],
            },
            {
              id: 'mon-5',
              title: 'תרגול רב"ש',
              description: 'הוכחות רב"ש ושלילת רב"ש - 4 שאלות',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['תרגילי בית 5-6'],
            },
          ],
        },
        {
          date: '2026-02-17',
          dayName: 'Tuesday',
          dayNameHe: 'שלישי',
          isStudyDay: true,
          topics: [
            { name: 'other', nameHe: 'סימולציית מבחן + חזרה', priority: 'high', estimatedHours: 4 },
          ],
          tasks: [
            {
              id: 'tue-1',
              title: 'חזרה מהירה על נוסחאות',
              description: 'עבור על כל הנוסחאות - גבולות, נגזרות, טיילור, טורים',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'tue-2',
              title: 'סימולציית מבחן מלאה',
              description: 'פתור מבחן שלם בתנאי מבחן אמיתיים (3 שעות)',
              type: 'exam-simulation',
              estimatedMinutes: 180,
              resources: ['סימולציה 2026 / מבחן 2024 מועד ב'],
            },
            {
              id: 'tue-3',
              title: 'ניתוח טעויות',
              description: 'עבור על כל הטעויות מהסימולציה, הבן מה השתבש',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הפתרון שלך'],
            },
          ],
        },
        {
          date: '2026-02-18',
          dayName: 'Wednesday',
          dayNameHe: 'רביעי',
          isStudyDay: true,
          topics: [
            { name: 'other', nameHe: 'נקודות חולשה + סימולציה שנייה', priority: 'high', estimatedHours: 4 },
          ],
          tasks: [
            {
              id: 'wed-1',
              title: 'תרגול נקודות חולשה',
              description: 'התמקד בנושאים שבהם טעית בסימולציה',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['לפי הניתוח מאתמול'],
            },
            {
              id: 'wed-2',
              title: 'סימולציה שנייה',
              description: 'מבחן נוסף בתנאי מבחן',
              type: 'exam-simulation',
              estimatedMinutes: 180,
              resources: ['מבחן 2025 מועד ב / 2023 מועד ב'],
            },
          ],
        },
        {
          date: '2026-02-19',
          dayName: 'Thursday',
          dayNameHe: 'חמישי',
          isStudyDay: true,
          topics: [
            { name: 'other', nameHe: 'חזרה אחרונה', priority: 'high', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'thu-1',
              title: 'שינון נוסחאות אחרון',
              description: 'עבור על כל הנוסחאות, פיתוחי טיילור, מבחני התכנסות',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'thu-2',
              title: 'חזרה על שאלות מפתח',
              description: 'עבור על 5 שאלות מפתח שחוזרות על עצמן',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['שאלות מסומנות'],
            },
            {
              id: 'thu-3',
              title: 'מנוחה לפני המבחן',
              description: 'הפסק ללמוד 3-4 שעות לפני השינה. שינה טובה = ביצוע טוב',
              type: 'review',
              estimatedMinutes: 0,
              resources: [],
            },
          ],
        },
      ],
    },
  ];
}

export const studyStats = {
  totalHours: 30,
  daysUntilExam: 7,
  topicsToReview: 9,
  practiceQuestionsTarget: 50,
  examSimulations: 2,
};

export const examInfo = {
  courseName: 'חשבון אינפיניטסימלי 1',
  examType: 'מועד ב\'',
  examDate: '2026-02-20',
  duration: 180,
  totalPoints: 100,
  questionsCount: 6,
  allowedMaterials: 'ללא חומר עזר',
};
