// Moed A 2026 Exam Analysis & Moed B Predictions

export interface ExamQuestion2026 {
  questionNumber: number;
  subParts: ExamSubPart[];
  totalPoints: number;
  mainTopics: string[];
  mainTopicsHe: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamSubPart {
  id: string;
  points: number;
  description: string;
  descriptionHe: string;
  type: 'definition' | 'proof' | 'calculation' | 'counterexample';
  topics: string[];
  topicsHe: string[];
  keyTheorems: string[];
  solutionSummary: string;
}

export interface MoedBPrediction {
  topic: string;
  topicHe: string;
  likelihood: number; // 0-100
  reason: string;
  wasInMoedA: boolean;
  suggestedPractice: string[];
  relatedHomework: number[];
}

// ==========================================
// MOED A 2026 - Full Exam Breakdown
// ==========================================

export const moedA2026: ExamQuestion2026[] = [
  {
    questionNumber: 1,
    totalPoints: 25,
    mainTopics: ['derivatives', 'mean-value'],
    mainTopicsHe: ['נגזרות', 'משפט הערך הממוצע'],
    difficulty: 'hard',
    subParts: [
      {
        id: '1.1',
        points: 2,
        description: 'Define: f is differentiable on (a,b) using ε,δ',
        descriptionHe: 'הגדר: f גזירה ב-(a,b) באמצעות ε,δ',
        type: 'definition',
        topics: ['derivatives'],
        topicsHe: ['נגזרות'],
        keyTheorems: [],
        solutionSummary: 'f גזירה ב-(a,b) אם לכל x₀∈(a,b) קיים L∈ℝ כך שלכל ε>0 קיים δ>0 כך שלכל 0<|x-x₀|<δ: |[f(x)-f(x₀)]/(x-x₀) - L| < ε',
      },
      {
        id: '1.2.1',
        points: 8,
        description: 'Prove g is injective given g\'(x)≠0',
        descriptionHe: 'הוכח ש-g חד-חד-ערכית בהינתן g\'(x)≠0',
        type: 'proof',
        topics: ['derivatives', 'mean-value'],
        topicsHe: ['נגזרות', 'משפט הערך הממוצע'],
        keyTheorems: ['משפט רול'],
        solutionSummary: 'הוכחה בשלילה: אם g(x₁)=g(x₂) אז לפי רול קיים c עם g\'(c)=0, סתירה',
      },
      {
        id: '1.2.2',
        points: 15,
        description: 'Prove Cauchy MVT: [f(b)-f(a)]/[g(b)-g(a)] = f\'(c)/g\'(c)',
        descriptionHe: 'הוכח את משפט הערך הממוצע של קושי',
        type: 'proof',
        topics: ['mean-value', 'derivatives'],
        topicsHe: ['ערך ממוצע', 'נגזרות'],
        keyTheorems: ['משפט קושי (הערך הממוצע המוכלל)', 'משפט רול'],
        solutionSummary: 'מההרצאות - הגדר h(x) = f(x) - [f(b)-f(a)]/[g(b)-g(a)]·g(x), הראה h(a)=h(b), השתמש ברול',
      },
    ],
  },
  {
    questionNumber: 2,
    totalPoints: 25,
    mainTopics: ['real-numbers', 'supremum-infimum'],
    mainTopicsHe: ['המספרים הממשיים', 'סופרמום ואינפימום'],
    difficulty: 'medium',
    subParts: [
      {
        id: '2.1.1',
        points: 2,
        description: 'Define: A is bounded from below',
        descriptionHe: 'הגדר: A חסומה מלרע',
        type: 'definition',
        topics: ['real-numbers'],
        topicsHe: ['המספרים הממשיים'],
        keyTheorems: [],
        solutionSummary: 'A חסומה מלרע אם קיים m∈ℝ כך שלכל a∈A: a≥m',
      },
      {
        id: '2.1.2',
        points: 11,
        description: 'Prove s=inf(A) iff ∀ε>0 ∃a∈A: a < s+ε',
        descriptionHe: 'הוכח s=inf(A) אם"ם לכל ε>0 קיים a∈A: a < s+ε',
        type: 'proof',
        topics: ['real-numbers', 'supremum-infimum'],
        topicsHe: ['המספרים הממשיים', 'אינפימום'],
        keyTheorems: ['אפיון אינפימום'],
        solutionSummary: '⇒: m=s+ε > s אז m לא חסם תחתון. ⇐: בשלילה m>s, בחר ε=m-s, קבל סתירה',
      },
      {
        id: '2.2.1',
        points: 3,
        description: 'Prove (2x+3)/(3x+2) ≠ 2/3 for x irrational',
        descriptionHe: 'הוכח ש-(2x+3)/(3x+2) ≠ 2/3 עבור x אי-רציונלי',
        type: 'proof',
        topics: ['real-numbers'],
        topicsHe: ['המספרים הממשיים'],
        keyTheorems: [],
        solutionSummary: 'בשלילה: 3(2x+3)=2(3x+2) → 9=4, סתירה',
      },
      {
        id: '2.2.2',
        points: 9,
        description: 'Prove (2x+3)/(3x+2) is irrational for x irrational',
        descriptionHe: 'הוכח ש-(2x+3)/(3x+2) אי-רציונלי עבור x אי-רציונלי',
        type: 'proof',
        topics: ['real-numbers'],
        topicsHe: ['המספרים הממשיים'],
        keyTheorems: ['סגירות הרציונליים לפעולות'],
        solutionSummary: 'בשלילה: q=(2x+3)/(3x+2)∈ℚ → x=(3-2q)/(3q-2)∈ℚ (כי q≠2/3), סתירה',
      },
    ],
  },
  {
    questionNumber: 3,
    totalPoints: 25,
    mainTopics: ['limits', 'continuity'],
    mainTopicsHe: ['גבולות', 'רציפות'],
    difficulty: 'hard',
    subParts: [
      {
        id: '3.1',
        points: 12,
        description: 'Prove f is not bounded from below given lim f(x)/f(-x)=-1',
        descriptionHe: 'הוכח f לא חסומה מלרע בהינתן lim f(x)/f(-x)=-1',
        type: 'proof',
        topics: ['limits'],
        topicsHe: ['גבולות באינסוף'],
        keyTheorems: ['חוקי אריתמטיקה של גבולות'],
        solutionSummary: 'f עולה ולא חסומה מלעיל → lim(x→∞)f(x)=∞. אז lim(x→-∞)f(x) = lim f(t)/[f(t)/f(-t)] = ∞·(-1) = -∞',
      },
      {
        id: '3.2',
        points: 13,
        description: 'Prove ∃c: f(c+h)=f(c) for continuous f attaining maximum',
        descriptionHe: 'הוכח קיום c כך ש-f(c+h)=f(c) עבור f רציפה שמקבלת מקסימום',
        type: 'proof',
        topics: ['continuity'],
        topicsHe: ['רציפות', 'ערך הביניים'],
        keyTheorems: ['משפט ערך הביניים (IVT)'],
        solutionSummary: 'הגדר g(x)=f(x+h)-f(x). ב-x₀ (מקסימום): g(x₀)≤0, g(x₀-h)≥0. לפי IVT קיים c עם g(c)=0',
      },
    ],
  },
  {
    questionNumber: 4,
    totalPoints: 25,
    mainTopics: ['derivatives', 'mean-value', 'limits'],
    mainTopicsHe: ['נגזרות', 'ערך ממוצע', 'גבולות'],
    difficulty: 'hard',
    subParts: [
      {
        id: '4.1',
        points: 12,
        description: 'Prove ∃c: f\'\'(c)<-8 for twice differentiable f',
        descriptionHe: 'הוכח קיום c כך ש-f\'\'(c)<-8 עבור f גזירה פעמיים',
        type: 'proof',
        topics: ['derivatives', 'mean-value'],
        topicsHe: ['נגזרות', 'משפט לגראנז\''],
        keyTheorems: ['משפט לגראנז\''],
        solutionSummary: 'לגראנז\' על [0,½]: f\'(x₁)=4. לגראנז\' על [½,1]: f\'(x₂)=-4. לגראנז\' ל-f\' על [x₁,x₂]: f\'\'(c)=-8/(x₂-x₁)<-8',
      },
      {
        id: '4.2',
        points: 13,
        description: 'Prove L₁≤L₂ given f(q)≤g(q) for all rationals',
        descriptionHe: 'הוכח L₁≤L₂ בהינתן f(q)≤g(q) לכל רציונלי',
        type: 'proof',
        topics: ['limits', 'real-numbers'],
        topicsHe: ['גבולות', 'צפיפות הרציונליים'],
        keyTheorems: ['צפיפות ℚ', 'שימור סימן בגבולות'],
        solutionSummary: 'בשלילה: h=f-g, lim h = L₁-L₂>0. לפי שימור סימן h(x)>0 בסביבה. בחר q רציונלי בסביבה → h(q)>0 אבל f(q)≤g(q) → h(q)≤0, סתירה',
      },
    ],
  },
  {
    questionNumber: 5,
    totalPoints: 25,
    mainTopics: ['derivatives', 'real-numbers', 'limits'],
    mainTopicsHe: ['נגזרות', 'המספרים הממשיים', 'גבולות'],
    difficulty: 'medium',
    subParts: [
      {
        id: '5.1',
        points: 9,
        description: 'Prove cos(x) ≥ 1 - x²/2 for x≥0',
        descriptionHe: 'הוכח cos(x) ≥ 1 - x²/2 לכל x≥0',
        type: 'proof',
        topics: ['derivatives'],
        topicsHe: ['נגזרות', 'אי-שוויונות'],
        keyTheorems: ['פונקציה עולה/יורדת לפי סימן הנגזרת'],
        solutionSummary: 'f(x)=cos(x)-1+x²/2, f\'(x)=-sin(x)+x, f\'\'(x)=-cos(x)+1≥0 → f\' עולה → f\'(x)≥f\'(0)=0 → f עולה → f(x)≥f(0)=0',
      },
      {
        id: '5.2',
        points: 9,
        description: 'Prove ∃n,m∈ℕ: 0.124 < ln(n²/m²) < 0.125',
        descriptionHe: 'הוכח קיום n,m∈ℕ: 0.124 < ln(n²/m²) < 0.125',
        type: 'proof',
        topics: ['real-numbers'],
        topicsHe: ['צפיפות הרציונליים'],
        keyTheorems: ['צפיפות ℚ', 'ln מונוטונית עולה ממש'],
        solutionSummary: 'לפי צפיפות ℚ: ∃n/m בין √e^0.124 ל-√e^0.125. ריבוע ואז ln → 0.124 < ln(n²/m²) < 0.125',
      },
      {
        id: '5.3',
        points: 7,
        description: 'Prove or disprove: g=x·f bounded → f bounded',
        descriptionHe: 'הוכח או הפרך: g=x·f(x) חסומה → f חסומה',
        type: 'counterexample',
        topics: ['limits'],
        topicsHe: ['חסימות', 'דוגמה נגדית'],
        keyTheorems: [],
        solutionSummary: 'הפרכה: f(x)=1/x (x≠0), f(0)=0. אז g(x)=1 (x≠0), g(0)=0 → g חסומה אבל f לא חסומה',
      },
    ],
  },
];

// ==========================================
// MOED A 2026 - Topic Distribution
// ==========================================

export const moedATopicDistribution = [
  { topic: 'נגזרות והגדרת גזירות', count: 4, questions: ['1.1', '1.2.1', '4.1', '5.1'] },
  { topic: 'משפט הערך הממוצע (לגראנז\'/קושי/רול)', count: 3, questions: ['1.2.1', '1.2.2', '4.1'] },
  { topic: 'המספרים הממשיים (sup/inf/חסימות)', count: 3, questions: ['2.1.1', '2.1.2', '5.3'] },
  { topic: 'גבולות ושימור סימן', count: 3, questions: ['3.1', '4.2', '5.2'] },
  { topic: 'רציפות ו-IVT', count: 1, questions: ['3.2'] },
  { topic: 'צפיפות הרציונליים', count: 2, questions: ['4.2', '5.2'] },
  { topic: 'מספרים אי-רציונליים', count: 1, questions: ['2.2.2'] },
];

// ==========================================
// MOED B PREDICTIONS
// ==========================================

export const moedBPredictions: MoedBPrediction[] = [
  {
    topic: 'series',
    topicHe: 'טורים ומבחני התכנסות',
    likelihood: 95,
    reason: 'לא הופיע כלל במועד א\'! נושא שכיח מאוד (80%) שנעדר לחלוטין. צפוי מאוד במועד ב\'.',
    wasInMoedA: false,
    suggestedPractice: [
      'מבחן דלמבר (המנה)',
      'מבחן קושי (השורש)',
      'מבחן ההשוואה + השוואה גבולית',
      'לייבניץ - התכנסות בתנאי',
      'טור p - שננו: מתכנס ⟺ p>1',
      'טורי חזקות - מצאו רדיוס התכנסות',
    ],
    relatedHomework: [12],
  },
  {
    topic: 'taylor',
    topicHe: 'טיילור ופיתוח מקלורן',
    likelihood: 80,
    reason: 'הופיע באופן חלקי בלבד (שאלה 5.1 - אי-שוויון עם cos). צפוי שיופיע שאלת טיילור מלאה עם פיתוח ושארית.',
    wasInMoedA: true,
    suggestedPractice: [
      'פיתוחי מקלורן: e^x, sin, cos, ln(1+x), 1/(1-x), arctan',
      'חישוב גבולות עם טיילור',
      'שארית לגראנז\' - הערכות',
      'טור טיילור סביב נקודה כללית a',
    ],
    relatedHomework: [9],
  },
  {
    topic: 'sequences',
    topicHe: 'סדרות',
    likelihood: 70,
    reason: 'לא הופיע במועד א\'. נושא שכיח (65%) עם שאלות קלאסיות כמו סדרות רקורסיביות ובולצאנו-ויירשטראס.',
    wasInMoedA: false,
    suggestedPractice: [
      'סדרות רקורסיביות: הוכח מונוטוניות + חסימות',
      'חישוב גבול סדרה רקורסיבית',
      'בולצאנו-ויירשטראס',
      'משפט קושי לסדרות',
    ],
    relatedHomework: [2, 3],
  },
  {
    topic: 'continuity',
    topicHe: 'רציפות במידה שווה',
    likelihood: 65,
    reason: 'רציפות רגילה הופיעה (IVT בשאלה 3.2), אבל רציפות במידה שווה לא נבדקה. יכולה להופיע כשאלת הגדרה+הוכחה.',
    wasInMoedA: true,
    suggestedPractice: [
      'הגדרת רב"ש vs רציפות רגילה',
      'משפט קנטור: רציפה בקטע סגור → רב"ש',
      'שלילת רב"ש: מציאת סדרות',
      'ליפשיץ → רב"ש',
    ],
    relatedHomework: [5, 6],
  },
  {
    topic: 'derivatives',
    topicHe: 'נגזרות (הגדרה וחישוב)',
    likelihood: 50,
    reason: 'הופיע בהרחבה במועד א\' (שאלות 1, 4, 5). צפוי פחות במועד ב\' אבל יכול להופיע כחלק משאלה אחרת.',
    wasInMoedA: true,
    suggestedPractice: [
      'גזירה מהגדרה (גבול)',
      'כלל השרשרת ופונקציה הפוכה',
    ],
    relatedHomework: [7, 8],
  },
  {
    topic: 'mean-value',
    topicHe: 'ערך ממוצע (רול/לגראנז\'/קושי)',
    likelihood: 40,
    reason: 'הופיע בהרחבה במועד א\' (שאלות 1 ו-4). צפוי פחות אבל עדיין אפשרי בגרסה שונה.',
    wasInMoedA: true,
    suggestedPractice: [
      'הוכחות עם MVT בגרסאות שונות',
      'לופיטל - כל הצורות',
    ],
    relatedHomework: [8, 9],
  },
  {
    topic: 'real-numbers',
    topicHe: 'sup/inf/חסימות',
    likelihood: 35,
    reason: 'הופיע במועד א\' (שאלה 2). פחות סביר שיחזור על אותו נושא אבל יכול להופיע כחלק קטן.',
    wasInMoedA: true,
    suggestedPractice: [
      'אפיון sup/inf עם ε',
      'תכונה ארכימדית',
    ],
    relatedHomework: [1],
  },
];

// ==========================================
// KEY INSIGHTS FOR MOED B
// ==========================================

export const moedBInsights = [
  {
    titleHe: 'טורים חייבים להופיע',
    descriptionHe: 'גם טורים נעדרו לחלוטין ממועד א\'. עם שכיחות של 80% במבחנים, זה כמעט בטוח יופיע. שננו את כל מבחני ההתכנסות.',
    priority: 'critical' as const,
  },
  {
    titleHe: 'מבנה המבחן: 5 שאלות, בחרו 4',
    descriptionHe: 'במועד א\' היו 5 שאלות וצריך לענות על 4. כל שאלה 25 נקודות. תכננו מראש איזו שאלה לדלג עליה.',
    priority: 'info' as const,
  },
  {
    titleHe: 'הגדרות = נקודות קלות',
    descriptionHe: 'שימו לב ששתי שאלות במועד א\' כללו הגדרה פשוטה ב-2-3 נקודות. שננו את ההגדרות המרכזיות.',
    priority: 'high' as const,
  },
  {
    titleHe: 'הוכחות מההרצאות',
    descriptionHe: 'שאלה 1.2.2 (משפט קושי) היא הוכחה ישירה מההרצאות ב-15 נקודות. חזרו על ההוכחות המרכזיות.',
    priority: 'high' as const,
  },
];

// ==========================================
// PRACTICE PRIORITY LIST FOR MOED B
// ==========================================

export const moedBPracticeOrder = [
  {
    rank: 1,
    topicHe: 'טורים',
    hours: 4,
    items: [
      'שננו את כל מבחני ההתכנסות',
      'טור p + טור הנדסי',
      'מבחן דלמבר + קושי - 4 תרגילים',
      'מבחן ההשוואה + לייבניץ - 4 תרגילים',
      'טורי חזקות + רדיוס התכנסות',
    ],
  },
  {
    rank: 2,
    topicHe: 'טיילור',
    hours: 2.5,
    items: [
      'שננו פיתוחי מקלורן',
      'חישוב גבולות עם טיילור - 3 תרגילים',
      'שארית לגראנז\' - 2 תרגילים',
    ],
  },
  {
    rank: 3,
    topicHe: 'סדרות',
    hours: 2,
    items: [
      'סדרות רקורסיביות - 2 תרגילים',
      'בולצאנו-ויירשטראס',
      'הוכחות עם ε-N',
    ],
  },
  {
    rank: 4,
    topicHe: 'רציפות במידה שווה + הגדרות',
    hours: 1.5,
    items: [
      'הגדרת רב"ש',
      'משפט קנטור',
      'חזרה על הגדרות מרכזיות',
    ],
  },
];
