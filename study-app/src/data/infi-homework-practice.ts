// Homework Practice List - organized by topic and exam likelihood

export interface HomeworkExercise {
  exerciseNumber: number;
  weekNumber: number;
  topicHe: string;
  topics: string[];
  questionTypes: QuestionItem[];
  moedBRelevance: 'critical' | 'high' | 'medium' | 'low';
  moedBNote: string;
}

export interface QuestionItem {
  id: string;
  descriptionHe: string;
  type: 'definition' | 'proof' | 'calculation' | 'counterexample' | 'technique';
  difficulty: 'easy' | 'medium' | 'hard';
  examRelevant: boolean;
  tip?: string;
}

export const homeworkExercises: HomeworkExercise[] = [
  {
    exerciseNumber: 1,
    weekNumber: 1,
    topicHe: 'המספרים הממשיים, sup/inf',
    topics: ['real-numbers', 'supremum-infimum'],
    moedBRelevance: 'low',
    moedBNote: 'הופיע במועד א\' (שאלה 2). פחות סביר במועד ב\' אבל שננו הגדרות.',
    questionTypes: [
      { id: '1.1', descriptionHe: 'הוכח חסמים לקבוצות', type: 'proof', difficulty: 'easy', examRelevant: true },
      { id: '1.2', descriptionHe: 'מצא sup/inf של קבוצות', type: 'calculation', difficulty: 'medium', examRelevant: true },
      { id: '1.3', descriptionHe: 'הוכחות עם תכונה ארכימדית', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '1.4', descriptionHe: 'צפיפות הרציונליים', type: 'proof', difficulty: 'medium', examRelevant: true, tip: 'הופיע במועד א\' שאלה 5.2!' },
    ],
  },
  {
    exerciseNumber: 2,
    weekNumber: 2,
    topicHe: 'סדרות - התכנסות',
    topics: ['sequences'],
    moedBRelevance: 'high',
    moedBNote: 'סדרות לא הופיעו במועד א\'. צפוי במועד ב\' (65% שכיחות).',
    questionTypes: [
      { id: '2.1', descriptionHe: 'הוכח התכנסות סדרה מהגדרה (ε-N)', type: 'proof', difficulty: 'medium', examRelevant: true, tip: 'שאלת קלאסית במבחנים' },
      { id: '2.2', descriptionHe: 'חוקי אריתמטיקה של גבולות', type: 'calculation', difficulty: 'easy', examRelevant: true },
      { id: '2.3', descriptionHe: 'משפט הסנדוויץ\'', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '2.4', descriptionHe: 'סדרות חסומות', type: 'proof', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 3,
    weekNumber: 3,
    topicHe: 'סדרות מונוטוניות ורקורסיביות',
    topics: ['sequences'],
    moedBRelevance: 'high',
    moedBNote: 'סדרות רקורסיביות = שאלת קלאסית. תרגלו היטב!',
    questionTypes: [
      { id: '3.1', descriptionHe: 'סדרות רקורסיביות: מונוטוניות + חסימות + גבול', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'השאלה הכי קלאסית על סדרות' },
      { id: '3.2', descriptionHe: 'בולצאנו-ויירשטראס', type: 'proof', difficulty: 'hard', examRelevant: true },
      { id: '3.3', descriptionHe: 'סדרת קושי', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '3.4', descriptionHe: 'lim sup ו-lim inf', type: 'calculation', difficulty: 'medium', examRelevant: false },
    ],
  },
  {
    exerciseNumber: 4,
    weekNumber: 4,
    topicHe: 'גבולות פונקציות',
    topics: ['limits'],
    moedBRelevance: 'medium',
    moedBNote: 'גבולות הופיעו במועד א\' אבל יכולים להופיע בגרסה שונה.',
    questionTypes: [
      { id: '4.1', descriptionHe: 'הוכחת גבול ב-ε-δ', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'מופיע כמעט בכל מבחן!' },
      { id: '4.2', descriptionHe: 'שלילת קיום גבול (היינה)', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '4.3', descriptionHe: 'חוקי גבולות', type: 'calculation', difficulty: 'easy', examRelevant: true },
      { id: '4.4', descriptionHe: 'גבולות חד-צדדיים ובאינסוף', type: 'calculation', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 5,
    weekNumber: 5,
    topicHe: 'רציפות',
    topics: ['continuity'],
    moedBRelevance: 'medium',
    moedBNote: 'IVT הופיע במועד א\'. רב"ש לא הופיע - יכול להופיע במועד ב\'.',
    questionTypes: [
      { id: '5.1', descriptionHe: 'הוכחת רציפות מהגדרה', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '5.2', descriptionHe: 'שימוש ב-IVT למציאת שורש', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '5.3', descriptionHe: 'EVT ויישומים', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '5.4', descriptionHe: 'סיווג אי-רציפויות', type: 'technique', difficulty: 'easy', examRelevant: false },
    ],
  },
  {
    exerciseNumber: 6,
    weekNumber: 6,
    topicHe: 'רציפות במידה שווה',
    topics: ['continuity'],
    moedBRelevance: 'high',
    moedBNote: 'רב"ש לא הופיע במועד א\'. צפוי שתהיה שאלה עליו במועד ב\'.',
    questionTypes: [
      { id: '6.1', descriptionHe: 'הוכח רב"ש (מהגדרה או קנטור)', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'חשוב מאוד למועד ב\'!' },
      { id: '6.2', descriptionHe: 'שלילת רב"ש (סדרות)', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'שאלה קלאסית' },
      { id: '6.3', descriptionHe: 'ליפשיץ → רב"ש', type: 'proof', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 7,
    weekNumber: 7,
    topicHe: 'נגזרות - הגדרה וכללים',
    topics: ['derivatives'],
    moedBRelevance: 'medium',
    moedBNote: 'נגזרות הופיעו הרבה במועד א\'. פחות צפוי אבל תדעו את הכללים.',
    questionTypes: [
      { id: '7.1', descriptionHe: 'חישוב נגזרת מהגדרה', type: 'calculation', difficulty: 'medium', examRelevant: true },
      { id: '7.2', descriptionHe: 'כלל השרשרת', type: 'technique', difficulty: 'easy', examRelevant: true },
      { id: '7.3', descriptionHe: 'נגזרת פונקציה הפוכה', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '7.4', descriptionHe: 'גזירות ← רציפות (ההפך לא נכון)', type: 'proof', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 8,
    weekNumber: 8,
    topicHe: 'יישומי נגזרות - MVT ולופיטל',
    topics: ['derivatives', 'mean-value'],
    moedBRelevance: 'medium',
    moedBNote: 'MVT הופיע הרבה במועד א\'. לופיטל יכול להופיע כחלק משאלה.',
    questionTypes: [
      { id: '8.1', descriptionHe: 'שימוש ב-MVT להוכחת אי-שוויונות', type: 'proof', difficulty: 'hard', examRelevant: true },
      { id: '8.2', descriptionHe: 'לופיטל - צורות שונות', type: 'calculation', difficulty: 'medium', examRelevant: true },
      { id: '8.3', descriptionHe: 'משפט רול', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '8.4', descriptionHe: 'חקירת פונקציה (נקודות קיצון, קעירות)', type: 'technique', difficulty: 'medium', examRelevant: false },
    ],
  },
  {
    exerciseNumber: 9,
    weekNumber: 9,
    topicHe: 'טיילור',
    topics: ['taylor'],
    moedBRelevance: 'high',
    moedBNote: 'טיילור הופיע חלקית במועד א\'. צפוי שתהיה שאלת טיילור מלאה במועד ב\'.',
    questionTypes: [
      { id: '9.1', descriptionHe: 'פיתוח טיילור סביב נקודה', type: 'calculation', difficulty: 'medium', examRelevant: true, tip: 'שננו את הפיתוחים הידועים!' },
      { id: '9.2', descriptionHe: 'חישוב גבולות עם טיילור', type: 'calculation', difficulty: 'hard', examRelevant: true, tip: 'שאלה מאוד שכיחה במבחנים' },
      { id: '9.3', descriptionHe: 'שארית לגראנז\' - הערכות', type: 'proof', difficulty: 'hard', examRelevant: true },
      { id: '9.4', descriptionHe: 'קירוב פולינומי', type: 'calculation', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 10,
    weekNumber: 10,
    topicHe: 'נגזרות — הגדרה וכללים מתקדמים',
    topics: ['derivatives'],
    moedBRelevance: 'medium',
    moedBNote: 'נגזרות הופיעו הרבה במועד א\'. פחות צפוי כשאלה עצמאית אבל חשוב כבסיס.',
    questionTypes: [
      { id: '10.1', descriptionHe: 'גזירה מהגדרה — חישוב נגזרת דרך גבול', type: 'calculation', difficulty: 'medium', examRelevant: true },
      { id: '10.2', descriptionHe: 'הוכחת כללי גזירה (מכפלה, מנה)', type: 'proof', difficulty: 'hard', examRelevant: true },
      { id: '10.3', descriptionHe: 'כלל השרשרת — הוכחה ויישומים', type: 'proof', difficulty: 'hard', examRelevant: true },
      { id: '10.4', descriptionHe: 'נגזרת פונקציה הפוכה', type: 'calculation', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 11,
    weekNumber: 11,
    topicHe: 'משפטי ערך ממוצע ויישומים',
    topics: ['derivatives', 'mean-value'],
    moedBRelevance: 'medium',
    moedBNote: 'MVT הופיע הרבה במועד א\'. חזרו על הוכחות ויישומים לאי-שוויונות.',
    questionTypes: [
      { id: '11.1', descriptionHe: 'הוכחות עם משפט רול', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '11.2', descriptionHe: 'יישומי לגראנז\' לאי-שוויונות', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'הופיע במועד א\' שאלה 4.1' },
      { id: '11.3', descriptionHe: 'משפט קושי (MVT מוכלל)', type: 'proof', difficulty: 'hard', examRelevant: true, tip: 'ההוכחה שווה 15 נקודות במועד א\'!' },
      { id: '11.4', descriptionHe: 'כלל לופיטל — כל הצורות', type: 'calculation', difficulty: 'medium', examRelevant: true },
    ],
  },
  {
    exerciseNumber: 12,
    weekNumber: 12,
    topicHe: 'טורים ומבחני התכנסות',
    topics: ['series'],
    moedBRelevance: 'critical',
    moedBNote: 'טורים לא הופיעו כלל במועד א\'! שכיחות 80%. כמעט בוודאות יופיע. תרגלו הכל!',
    questionTypes: [
      { id: '12.1', descriptionHe: 'מבחן דלמבר (המנה)', type: 'technique', difficulty: 'medium', examRelevant: true, tip: 'חובה לדעת!' },
      { id: '12.2', descriptionHe: 'מבחן קושי (השורש)', type: 'technique', difficulty: 'medium', examRelevant: true, tip: 'חובה לדעת!' },
      { id: '12.3', descriptionHe: 'מבחן ההשוואה + השוואה גבולית', type: 'technique', difficulty: 'medium', examRelevant: true },
      { id: '12.4', descriptionHe: 'לייבניץ - התכנסות בתנאי', type: 'proof', difficulty: 'medium', examRelevant: true },
      { id: '12.5', descriptionHe: 'טורי חזקות + רדיוס התכנסות', type: 'calculation', difficulty: 'hard', examRelevant: true, tip: 'שאלה מאוד שכיחה' },
      { id: '12.6', descriptionHe: 'התכנסות מוחלטת vs בתנאי', type: 'proof', difficulty: 'medium', examRelevant: true },
    ],
  },
];

// Get exercises sorted by Moed B relevance
export function getExercisesByRelevance(): HomeworkExercise[] {
  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  return [...homeworkExercises].sort((a, b) => order[a.moedBRelevance] - order[b.moedBRelevance]);
}

// Get only exam-relevant questions from all exercises
export function getExamRelevantQuestions(): { exercise: HomeworkExercise; question: QuestionItem }[] {
  const results: { exercise: HomeworkExercise; question: QuestionItem }[] = [];
  for (const ex of homeworkExercises) {
    for (const q of ex.questionTypes) {
      if (q.examRelevant) {
        results.push({ exercise: ex, question: q });
      }
    }
  }
  return results;
}
