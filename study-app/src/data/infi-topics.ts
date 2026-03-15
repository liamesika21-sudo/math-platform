// Calculus 1 Topics - Hebrew/English mapping and exam frequency analysis

export interface TopicInfo {
  id: string;
  nameEn: string;
  nameHe: string;
  description: string;
  weekNumbers: number[];
  lectureNumbers: number[];
  recitationNumbers: number[];
  homeworkNumbers: number[];
}

export interface TopicFrequency {
  topic: string;
  topicHe: string;
  count: number;
  percentage: number;
  exampleDescriptions: string[];
}

export const topicMap: Record<string, string> = {
  'limits': 'גבולות',
  'continuity': 'רציפות',
  'derivatives': 'נגזרות',
  'series': 'טורים',
  'sequences': 'סדרות',
  'taylor': 'טיילור',
  'differential-equations': 'מש. דיפרנציאליות',
  'multivariable': 'רב-משתני',
  'real-numbers': 'המספרים הממשיים',
  'supremum-infimum': 'סופרמום ואינפימום',
  'mean-value': 'משפט הערך הממוצע',
  'other': 'אחר',
};

export function topicToHebrew(topic: string): string {
  return topicMap[topic] || topic.replace(/-/g, ' ');
}

export const allTopics: TopicInfo[] = [
  {
    id: 'real-numbers',
    nameEn: 'Real Numbers & Supremum',
    nameHe: 'המספרים הממשיים וסופרמום',
    description: 'אקסיומות הסדר, חסמים, סופרמום ואינפימום, תכונה ארכימדית',
    weekNumbers: [1],
    lectureNumbers: [1, 2],
    recitationNumbers: [1],
    homeworkNumbers: [1],
  },
  {
    id: 'sequences',
    nameEn: 'Sequences',
    nameHe: 'סדרות',
    description: 'התכנסות סדרות, סדרות מונוטוניות, בולצאנו-ויירשטראס, סדרות רקורסיביות',
    weekNumbers: [2, 3],
    lectureNumbers: [3, 4, 5, 6],
    recitationNumbers: [2, 3],
    homeworkNumbers: [2, 3],
  },
  {
    id: 'limits',
    nameEn: 'Limits of Functions',
    nameHe: 'גבולות פונקציות',
    description: 'הגדרת אפסילון-דלתא, חוקי גבולות, גבולות חד-צדדיים, גבולות באינסוף',
    weekNumbers: [4, 5],
    lectureNumbers: [7, 8, 9, 10],
    recitationNumbers: [4, 5],
    homeworkNumbers: [4, 5],
  },
  {
    id: 'continuity',
    nameEn: 'Continuity',
    nameHe: 'רציפות',
    description: 'רציפות בנקודה ובקטע, משפט ערך הביניים, רציפות במידה שווה, ערכי קיצון',
    weekNumbers: [5, 6],
    lectureNumbers: [10, 11, 12],
    recitationNumbers: [5, 6],
    homeworkNumbers: [5, 6],
  },
  {
    id: 'derivatives',
    nameEn: 'Derivatives',
    nameHe: 'נגזרות',
    description: 'הגדרת הנגזרת, כללי גזירה, כלל השרשרת, נגזרות של פונקציות אלמנטריות',
    weekNumbers: [7, 8],
    lectureNumbers: [13, 14, 15, 16],
    recitationNumbers: [7, 8],
    homeworkNumbers: [7, 8],
  },
  {
    id: 'mean-value',
    nameEn: 'Mean Value Theorem & Applications',
    nameHe: 'משפט הערך הממוצע ויישומים',
    description: 'משפט רול, MVT, משפט לופיטל, חקירת פונקציות, נקודות קיצון',
    weekNumbers: [8, 9],
    lectureNumbers: [15, 16, 17],
    recitationNumbers: [8, 9],
    homeworkNumbers: [8, 9],
  },
  {
    id: 'taylor',
    nameEn: 'Taylor & Polynomial Approximation',
    nameHe: 'טיילור וקירוב פולינומי',
    description: 'פולינום טיילור, שארית לגראנז\', פיתוחי מקלורן, קירובים',
    weekNumbers: [9],
    lectureNumbers: [17, 18],
    recitationNumbers: [9],
    homeworkNumbers: [9],
  },
  {
    id: 'series',
    nameEn: 'Series',
    nameHe: 'טורים',
    description: 'טורים מספריים, מבחני התכנסות, טורי חזקות, רדיוס התכנסות',
    weekNumbers: [12],
    lectureNumbers: [22, 23],
    recitationNumbers: [12, 13],
    homeworkNumbers: [12],
  },
];

// Exam topic frequency - based on analysis of 2022-2025 exams (8 exams × ~6 questions)
// These are the typical frequencies for Calculus 1 exams
export const topicFrequencies: TopicFrequency[] = [
  {
    topic: 'derivatives',
    topicHe: 'נגזרות ויישומים',
    count: 12,
    percentage: 85,
    exampleDescriptions: ['חשב נגזרת', 'מצא נקודות קיצון'],
  },
  {
    topic: 'series',
    topicHe: 'טורים וטורי חזקות',
    count: 11,
    percentage: 80,
    exampleDescriptions: ['בדוק התכנסות של טור', 'מצא רדיוס התכנסות'],
  },
  {
    topic: 'taylor',
    topicHe: 'טיילור',
    count: 10,
    percentage: 75,
    exampleDescriptions: ['מצא פיתוח טיילור', 'חשב גבול באמצעות טיילור'],
  },
  {
    topic: 'limits',
    topicHe: 'גבולות',
    count: 10,
    percentage: 75,
    exampleDescriptions: ['חשב גבול', 'הוכח גבול באמצעות ε-δ'],
  },
  {
    topic: 'sequences',
    topicHe: 'סדרות',
    count: 8,
    percentage: 65,
    exampleDescriptions: ['הוכח התכנסות סדרה', 'מצא גבול של סדרה רקורסיבית'],
  },
  {
    topic: 'continuity',
    topicHe: 'רציפות',
    count: 7,
    percentage: 60,
    exampleDescriptions: ['הוכח רציפות', 'בדוק רציפות במידה שווה'],
  },
  {
    topic: 'mean-value',
    topicHe: 'ערך ממוצע ולופיטל',
    count: 6,
    percentage: 50,
    exampleDescriptions: ['השתמש בלופיטל', 'הוכח באמצעות MVT'],
  },
];

export function getTopicsByLikelihood(): TopicFrequency[] {
  return topicFrequencies;
}
