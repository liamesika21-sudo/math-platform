import { examTopics } from '@/data/infi-practice-by-topic';
import { getExamRelevantQuestions } from '@/data/infi-homework-practice';
import { moedA2026 } from '@/data/infi-exam-2026';
import { getAllWeeks } from '@/data/infi-weeks';
import { battlePlanDefinitions } from '@/data/battle-plan-hebrew';

export type DefinitionStatus = 'know' | 'review' | 'weak';
export type HomeworkStatus = 'solved' | 'not-solved';
export type HomeworkConfidence = 'high' | 'medium' | 'low';
export type DrillDifficulty = 'easy' | 'medium' | 'hard';

export interface DefinitionTrackerItem {
  id: string;
  title: string;
  content: string;
  topicHe: string;
  topicId: string;
  lectures: number[];
  source: string;
}

export interface HomeworkTrackerItem {
  id: string;
  source: string;
  title: string;
  method: string;
  whyLikely: string;
  variation: string;
  probability: number;
  topicIds: string[];
  topicHe: string;
  lectures: number[];
}

export interface DrillQuestionItem {
  id: string;
  title: string;
  prompt: string;
  source: string;
  sourceType: 'homework' | 'exam' | 'recitation';
  topicIds: string[];
  topicHe: string;
  lectures: number[];
}

export interface PatternObservation {
  id: string;
  patternId: string;
  title: string;
  explanation: string;
  rule: string;
  miniExample: string;
  sourceLabel: string;
  sourceType: 'homework' | 'exam' | 'recitation';
  probability: number;
  tags: string[];
}

export interface BattlePlanTopicAxis {
  id: string;
  label: string;
  shortLabel: string;
  lectureStart: number;
  lectureEnd: number;
}

export interface BattlePlanTopicProgress extends BattlePlanTopicAxis {
  progress: number;
  strength: 'strong' | 'medium' | 'weak';
  definitionsCount: number;
  homeworkCount: number;
  drillCount: number;
}

export interface BattlePlanTrackerState {
  definitions: Record<string, DefinitionStatus>;
  homework: Record<string, { status: HomeworkStatus; confidence: HomeworkConfidence }>;
  drill: Record<string, { solved: boolean; difficulty: DrillDifficulty }>;
}

const weeks = getAllWeeks();

function uniqueNumbers(values: number[]) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function inferLecturesForTopicIds(topicIds: string[]) {
  const lectureSet = new Set<number>();
  weeks.forEach((week) => {
    if (week.topics.some((topic) => topicIds.includes(topic))) {
      week.lectures.forEach((lecture) => lectureSet.add(lecture));
    }
  });
  return Array.from(lectureSet).sort((a, b) => a - b);
}

function getLecturesForBattlePlanTopic(topicId: string) {
  if (topicId === 'sets') return [1, 2, 3, 4, 5];
  if (topicId === 'functions') return [5, 6, 7];
  if (topicId === 'limits') return [8, 9, 10, 11, 12, 13, 14, 15];
  if (topicId === 'continuity') return [15, 16, 17, 18];
  return [18, 19, 20, 21, 22, 23];
}

export const definitionTrackerItems: DefinitionTrackerItem[] = battlePlanDefinitions.map((item) => ({
  id: item.id,
  title: item.title,
  content: item.body,
  topicHe: item.topicLabel,
  topicId: item.topicId,
  lectures: getLecturesForBattlePlanTopic(item.topicId),
  source: item.source,
}));

export const homeworkTrackerItems: HomeworkTrackerItem[] = [
  {
    id: 'hw-bp-1',
    source: 'מטלה 1 שאלה 6',
    title: 'אי-רציונליות של שבר לינארי',
    method: 'נניח בשלילה שרציונלי, נפתור עבור x, נגיע לסתירה.',
    whyLikely: 'מועד א׳ 2026 שאלה 2.2 כמעט זהה. זה אחד הדפוסים החוזרים ביותר.',
    variation: 'ביטוי עם שורש, שבר לינארי שונה, או סעיף "הוכח או הפרך".',
    probability: 90,
    topicIds: ['real-numbers', 'supremum-infimum'],
    topicHe: 'המספרים הממשיים • אי-רציונליות',
    lectures: [1, 2, 3, 4, 5],
  },
  {
    id: 'hw-bp-2',
    source: 'מטלה 2 שאלה 1(ב)',
    title: 'תכונת ε של inf/sup',
    method: 'הוכחת שקילות דרך חסם וסתירה.',
    whyLikely: 'מועד א׳ בחן inf. הווריאציה למועד ב׳ צפויה להיות sup או השוואת קבוצות.',
    variation: 'sup במקום inf, או השוואה בין sup(A) ו-sup(B).',
    probability: 85,
    topicIds: ['real-numbers', 'supremum-infimum'],
    topicHe: 'sup / inf',
    lectures: [1, 2, 3, 4, 5],
  },
  {
    id: 'hw-bp-3',
    source: 'מטלה 2 שאלה 6',
    title: 'sup/inf של קבוצה מותמרת',
    method: 'מצא מועמד, הראה שהוא חסם, וסגור עם תכונת ε.',
    whyLikely: 'זה דפוס בחינתי קבוע במספר מועדים שונים.',
    variation: 'החלפת הטרנספורמציה או מעבר מ-sup ל-inf.',
    probability: 80,
    topicIds: ['real-numbers', 'supremum-infimum'],
    topicHe: 'sup / inf',
    lectures: [1, 2, 3, 4, 5],
  },
  {
    id: 'hw-bp-4',
    source: 'מטלה 8 שאלה 6',
    title: 'אי-חסימות מיחס גבול',
    method: 'שימוש במונוטוניות ובגבול כדי לכפות התנהגות באינסוף.',
    whyLikely: 'מועד א׳ 2026 שאלה 3.1 בנויה כמעט ישירות על הרעיון הזה.',
    variation: 'אותו מנגנון עם יחס אחר או טענת נכון/לא נכון.',
    probability: 70,
    topicIds: ['limits', 'derivatives', 'mean-value'],
    topicHe: 'גבולות • מונוטוניות',
    lectures: [8, 9, 10, 11, 12, 13, 14, 15, 16],
  },
  {
    id: 'hw-bp-5',
    source: 'מטלה 9 שאלה 4',
    title: 'f(1)=2 מתנאי גבול',
    method: 'סתירה, רציפות, בחירת נקודה מתנאי ∀ε∀δ∃x, ואי-שוויון המשולש.',
    whyLikely: 'כבר חזר במספר מבחנים וסימולציה. דפוס חזק מאוד.',
    variation: 'נקודה אחרת, ערך אחר, או רציפות חד-צדדית.',
    probability: 85,
    topicIds: ['limits', 'continuity'],
    topicHe: 'גבולות • רציפות',
    lectures: [8, 9, 10, 11, 12, 15, 16, 17, 18],
  },
  {
    id: 'hw-bp-6',
    source: 'מטלה 10 שאלה 2',
    title: 'inf{x : f(x)>0} + רציפות',
    method: 'הגדרת inf, הוכחת קיום, רציפות, וסתירה באמצעות סביבה.',
    whyLikely: 'שילוב קלאסי של inf עם רציפות ו־ε-property.',
    variation: 'sup, רציפות מימין בלבד, או החלפת הסימן.',
    probability: 75,
    topicIds: ['real-numbers', 'continuity'],
    topicHe: 'sup / inf • רציפות',
    lectures: [5, 6, 9, 10, 11, 12],
  },
  {
    id: 'hw-bp-7',
    source: 'מטלה 11 שאלה 5(ב)',
    title: '|f| גזירה כאשר f′(x₀)=0',
    method: 'סנדוויץ׳ על ההפרש של הערכים המוחלטים.',
    whyLikely: 'חזר בסימולציה 2026 ולא נבחן כך ישירות במועד א׳.',
    variation: 'אותו רעיון עם פונקציה קרובה או ניסוח "הוכח או הפרך".',
    probability: 70,
    topicIds: ['derivatives', 'limits'],
    topicHe: 'נגזרות • גבולות',
    lectures: [13, 14, 15, 16, 17, 18, 19, 20],
  },
  {
    id: 'hw-bp-8',
    source: 'מטלה 12 שאלה 1',
    title: 'arctan(x)+arctan(1/x)=π/2',
    method: 'פונקציית עזר, גזירה, קבועה, והצבה בנקודה נוחה.',
    whyLikely: 'שאלה קצרה, אלגנטית, וחוזרת בגרסאות שונות.',
    variation: 'שימוש בתוך אי-שוויון או הוכחת זהות קשורה.',
    probability: 75,
    topicIds: ['derivatives', 'mean-value'],
    topicHe: 'נגזרות • זהויות',
    lectures: [18, 19, 20, 21, 22, 23],
  },
  {
    id: 'hw-bp-9',
    source: 'מטלה 12 שאלה 2',
    title: 'אי-שוויון דרך פונקציית עזר',
    method: 'בניית h(x), בדיקת h(0), חישוב h′, ואז מונוטוניות/קיצון.',
    whyLikely: 'אותה משפחה כמו שאלה 5.1 במועד א׳.',
    variation: 'sin(x)≤x, eˣ≥1+x, arctan(x)<x, 2ln(x)≤x²+1.',
    probability: 90,
    topicIds: ['derivatives', 'mean-value'],
    topicHe: 'אי-שוויונות • פונקציית עזר',
    lectures: [18, 19, 20, 21, 22, 23],
  },
  {
    id: 'hw-bp-10',
    source: 'מטלה 12 שאלה 4',
    title: 'חסם נגזרת שנייה דרך MVT פעמיים',
    method: 'שני שימושים ב-MVT ואז MVT נוסף על f′.',
    whyLikely: 'כבר הופיע כמעט זהה במועד א׳. סוג השאלה עדיין חזק למועד ב׳ בוריאציה.',
    variation: 'סימן שונה, חסם שונה, או ערכי פונקציה שונים.',
    probability: 80,
    topicIds: ['derivatives', 'mean-value'],
    topicHe: 'MVT • נגזרת שנייה',
    lectures: [18, 19, 20, 21, 22, 23],
  },
];

const homeworkRelevantQuestions = getExamRelevantQuestions().map(({ exercise, question }) => {
  const week = weeks.find((item) => item.weekNumber === exercise.weekNumber);
  return {
    id: `hw-drill-${question.id}`,
    title: `${exercise.topicHe} — ${question.descriptionHe}`,
    prompt: question.descriptionHe,
    source: `תרגיל ${exercise.exerciseNumber} · שאלה ${question.id}`,
    sourceType: 'homework' as const,
    topicIds: exercise.topics,
    topicHe: exercise.topicHe,
    lectures: week?.lectures ?? [],
  };
});

const topicExercises = examTopics.flatMap((topic) =>
  topic.exercises.map((exercise) => ({
    id: `topic-drill-${exercise.id}`,
    title: exercise.title,
    prompt: exercise.question,
    source: exercise.source ?? `תרגול נושא · ${topic.nameHe}`,
    sourceType: exercise.source?.includes('תרגיל בית')
      ? ('homework' as const)
      : exercise.source?.includes('מועד') || exercise.source?.includes('סימולציה')
      ? ('exam' as const)
      : ('recitation' as const),
    topicIds: [topic.id],
    topicHe: topic.nameHe,
    lectures: inferLecturesForTopicIds([topic.id]),
  }))
);

const examSubParts = moedA2026.flatMap((question) =>
  question.subParts.map((subPart) => ({
    id: `exam-drill-${subPart.id}`,
    title: subPart.descriptionHe,
    prompt: subPart.descriptionHe,
    source: `מועד א׳ 2026 · ${subPart.id}`,
    sourceType: 'exam' as const,
    topicIds: subPart.topics,
    topicHe: subPart.topicsHe.join(' • '),
    lectures: inferLecturesForTopicIds(subPart.topics),
  }))
);

const drillMap = new Map<string, DrillQuestionItem>();

[...homeworkRelevantQuestions, ...topicExercises, ...examSubParts].forEach((item) => {
  const key = `${item.title}::${item.prompt}::${item.source}`;
  if (!drillMap.has(key)) {
    drillMap.set(key, item);
  }
});

export const drillQuestionItems = Array.from(drillMap.values()).sort((a, b) =>
  a.source.localeCompare(b.source, 'he') || a.title.localeCompare(b.title, 'he')
);

export const battlePlanTopicAxes: BattlePlanTopicAxis[] = [
  { id: 'bounds', label: 'הרצאות 1-5 · חסמים קבוצות רציונליים אי־רציונליים', shortLabel: 'חסמים וקבוצות', lectureStart: 1, lectureEnd: 5 },
  { id: 'functions', label: 'הרצאות 5-7 · פונקציות', shortLabel: 'פונקציות', lectureStart: 5, lectureEnd: 7 },
  { id: 'limits', label: 'הרצאות 8-15 · גבולות', shortLabel: 'גבולות', lectureStart: 8, lectureEnd: 15 },
  { id: 'continuity', label: 'הרצאות 15-18 · רציפות', shortLabel: 'רציפות', lectureStart: 15, lectureEnd: 18 },
  { id: 'derivatives', label: 'הרצאות 18-23 · נגזרות', shortLabel: 'נגזרות', lectureStart: 18, lectureEnd: 23 },
];

export const patternObservations: PatternObservation[] = [
  {
    id: 'pattern-exam-1',
    patternId: 'm-vs-delta',
    title: 'When x goes to infinity, choose M large enough',
    explanation: 'Repeated in recitation-style epsilon proofs and in limit-at-infinity questions.',
    rule: 'For x→∞ use M with max constraints; for x→a use δ with min constraints.',
    miniExample: 'Need x>60 and x>4/ε → choose M=max{60, 4/ε}.',
    sourceLabel: 'תרגול 4 · גבולות באינסוף',
    sourceType: 'recitation',
    probability: 92,
    tags: ['limits', 'epsilon-delta', 'm-vs-delta'],
  },
  {
    id: 'pattern-exam-2',
    patternId: 'auxiliary-function',
    title: 'Build one helper function and let the theorem do the work',
    explanation: 'Core pattern behind existence, equality-shift, and inequality questions.',
    rule: 'If the question says "prove there exists c" or compare two expressions, define h(x)=left-right.',
    miniExample: 'h(x)=f(x+h)-f(x), then use IVT or Rolle.',
    sourceLabel: 'מועד א׳ 2026 · שאלה 3.2',
    sourceType: 'exam',
    probability: 95,
    tags: ['ivt', 'rolle', 'auxiliary-function'],
  },
  {
    id: 'pattern-exam-3',
    patternId: 'auxiliary-function',
    title: 'Auxiliary functions are the default for inequalities',
    explanation: 'Homework repeatedly turns inequalities into monotonicity of a helper function.',
    rule: 'For proving f(x)≥g(x), try h(x)=f(x)-g(x), compute h′, then use sign.',
    miniExample: 'h(x)=cos(x)-1+x²/2, h′′≥0, so h′↑ and h↑.',
    sourceLabel: 'מטלה 12 · שאלה 2',
    sourceType: 'homework',
    probability: 93,
    tags: ['derivatives', 'inequalities', 'auxiliary-function'],
  },
  {
    id: 'pattern-exam-4',
    patternId: 'sup-inf-epsilon',
    title: 'sup/inf questions are almost never about computation only',
    explanation: 'They usually require the epsilon characterization, not just a candidate answer.',
    rule: 'Show bound first, then close with the ε-property.',
    miniExample: 'To prove s=sup(A), show a≤s for all a∈A, then for every ε>0 find a>s-ε.',
    sourceLabel: 'מטלה 2 · שאלה 1(ב)',
    sourceType: 'homework',
    probability: 88,
    tags: ['sup-inf', 'epsilon'],
  },
  {
    id: 'pattern-exam-5',
    patternId: 'sup-inf-epsilon',
    title: 'The exam wraps epsilon-properties as proof triggers',
    explanation: 'A short setup line often hides the whole mechanism of the proof.',
    rule: 'If the statement mentions upper/lower bounds and arbitrary ε, think sup/inf immediately.',
    miniExample: 'Assume M<s, pick ε=s-M, contradict upper bound status.',
    sourceLabel: 'מועד א׳ 2026 · שאלה 2.1',
    sourceType: 'exam',
    probability: 90,
    tags: ['sup-inf', 'epsilon'],
  },
  {
    id: 'pattern-exam-6',
    patternId: 'density-q',
    title: 'Density of Q is used to transfer local information to all reals',
    explanation: 'Repeated in proofs about order, limits, and sign around a point.',
    rule: 'If the statement quantifies over q∈Q, finish the proof by choosing a rational inside the relevant neighborhood.',
    miniExample: 'h(x)>0 in a neighborhood; choose q∈Q there; contradict f(q)≤g(q).',
    sourceLabel: 'מועד א׳ 2026 · שאלה 4.2',
    sourceType: 'exam',
    probability: 89,
    tags: ['density', 'limits'],
  },
  {
    id: 'pattern-exam-7',
    patternId: 'density-q',
    title: 'Recitations use density as language, not as a separate topic',
    explanation: 'The recitation style treats density as the bridge between intervals and algebraic claims.',
    rule: 'When you need a concrete number inside an interval, density is often the shortest legal move.',
    miniExample: 'Choose q with a<q<b, then transform q if needed.',
    sourceLabel: 'תרגול 2 · sup/inf וצפיפות',
    sourceType: 'recitation',
    probability: 82,
    tags: ['density', 'real-numbers'],
  },
  {
    id: 'pattern-exam-8',
    patternId: 'irrationality',
    title: 'Irrationality questions almost always end by isolating x',
    explanation: 'This is one of the strongest repeated exam/homework patterns.',
    rule: 'Assume the expression is rational, solve for x, use closure of Q, derive contradiction.',
    miniExample: 'q=(2x+3)/(3x+2) → x=(3-2q)/(3q-2).',
    sourceLabel: 'מועד א׳ 2026 · שאלה 2.2',
    sourceType: 'exam',
    probability: 91,
    tags: ['irrationality', 'contradiction'],
  },
  {
    id: 'pattern-exam-9',
    patternId: 'irrationality',
    title: 'Homework keeps reusing the same irrationality engine',
    explanation: 'The form changes, the contradiction skeleton does not.',
    rule: 'Track the algebra that sends the claimed rational expression back to x.',
    miniExample: 'For linear fractional forms, always check whether the inverse transform has nonzero denominator.',
    sourceLabel: 'מטלה 1 · שאלה 6',
    sourceType: 'homework',
    probability: 90,
    tags: ['irrationality', 'contradiction'],
  },
  {
    id: 'pattern-exam-10',
    patternId: 'mvt-twice',
    title: 'Second-derivative bounds are usually MVT twice, not a direct trick',
    explanation: 'Repeated in homework and the exam with only constants changed.',
    rule: 'First produce two first-derivative values, then compare them via MVT on f′.',
    miniExample: 'Find c₁,c₂ from endpoint slopes, then f′′(ξ)=(f′(c₂)-f′(c₁))/(c₂-c₁).',
    sourceLabel: 'מטלה 12 · שאלה 4',
    sourceType: 'homework',
    probability: 87,
    tags: ['mvt', 'second-derivative'],
  },
  {
    id: 'pattern-exam-11',
    patternId: 'mvt-twice',
    title: 'Exam variants preserve the MVT skeleton and change only the numbers',
    explanation: 'The hidden logic stays fixed even when the statement looks new.',
    rule: 'When three function values are given, test whether the target is a bound on f′ or f′′.',
    miniExample: 'f(0)=0, f(1/2)=2, f(1)=0 → slopes 4 and -4 → second derivative negative enough.',
    sourceLabel: 'מועד א׳ 2026 · שאלה 4.1',
    sourceType: 'exam',
    probability: 88,
    tags: ['mvt', 'second-derivative'],
  },
];

export const goldenTipSeeds = [
  {
    id: 'seed-1',
    title: 'When x → ∞, choose M by max',
    explanation: 'At infinity you need x large enough to satisfy every inequality at once.',
    rule: 'Collect all requirements of the form x > A, x > B, x > C, then take M=max{A,B,C}.',
  },
  {
    id: 'seed-2',
    title: 'When x → a, choose δ by min',
    explanation: 'Near a finite point you need δ small enough to satisfy every local restriction.',
    rule: 'Collect all requirements of the form |x-a| < A, |x-a| < B, then take δ=min{A,B}.',
  },
  {
    id: 'seed-3',
    title: 'If the question says “exists c”, test IVT / Rolle / MVT before calculating',
    explanation: 'The shortest valid proof is usually a theorem plus one helper function.',
    rule: 'Write the theorem name first, then build h(x) only to satisfy its conditions.',
  },
  {
    id: 'seed-4',
    title: 'For “prove or disprove”, search for a counterexample before proving',
    explanation: 'This saves time and prevents forcing a false theorem.',
    rule: 'Check constant functions, |x|, sign(x), 1/x, x², sin(1/x) before committing to a proof.',
  },
];

export const emptyBattlePlanState: BattlePlanTrackerState = {
  definitions: {},
  homework: {},
  drill: {},
};

export function getDefinitionStatusValue(status: DefinitionStatus) {
  switch (status) {
    case 'know':
      return 1;
    case 'review':
      return 0.5;
    case 'weak':
    default:
      return 0;
  }
}

export function getHomeworkStatusValue(entry?: { status: HomeworkStatus; confidence: HomeworkConfidence }) {
  if (!entry || entry.status === 'not-solved') return 0;
  switch (entry.confidence) {
    case 'high':
      return 1;
    case 'medium':
      return 0.8;
    case 'low':
    default:
      return 0.6;
  }
}

export function getDrillStatusValue(entry?: { solved: boolean; difficulty: DrillDifficulty }) {
  if (!entry?.solved) return 0;
  switch (entry.difficulty) {
    case 'hard':
      return 1;
    case 'medium':
      return 0.85;
    case 'easy':
    default:
      return 0.7;
  }
}

export function isLectureInAxis(lectures: number[], axis: BattlePlanTopicAxis) {
  return lectures.some((lecture) => lecture >= axis.lectureStart && lecture <= axis.lectureEnd);
}

export function buildTopicProgress(state: BattlePlanTrackerState): BattlePlanTopicProgress[] {
  return battlePlanTopicAxes.map((axis) => {
    const definitions = definitionTrackerItems.filter((item) => isLectureInAxis(item.lectures, axis));
    const homework = homeworkTrackerItems.filter((item) => isLectureInAxis(item.lectures, axis));
    const drill = drillQuestionItems.filter((item) => isLectureInAxis(item.lectures, axis));

    const defProgress = definitions.length
      ? definitions.reduce((sum, item) => sum + getDefinitionStatusValue(state.definitions[item.id] ?? 'weak'), 0) / definitions.length
      : 0;
    const homeworkProgress = homework.length
      ? homework.reduce((sum, item) => sum + getHomeworkStatusValue(state.homework[item.id]), 0) / homework.length
      : 0;
    const drillProgress = drill.length
      ? drill.reduce((sum, item) => sum + getDrillStatusValue(state.drill[item.id]), 0) / drill.length
      : 0;

    const progress = Math.round(((defProgress * 0.35) + (homeworkProgress * 0.3) + (drillProgress * 0.35)) * 100);
    const strength: BattlePlanTopicProgress['strength'] =
      progress >= 75 ? 'strong' : progress >= 45 ? 'medium' : 'weak';

    return {
      ...axis,
      progress,
      strength,
      definitionsCount: definitions.length,
      homeworkCount: homework.length,
      drillCount: drill.length,
    };
  });
}

export function buildDefinitionSummary(state: BattlePlanTrackerState) {
  const total = definitionTrackerItems.length;
  const know = definitionTrackerItems.filter((item) => (state.definitions[item.id] ?? 'weak') === 'know').length;
  const review = definitionTrackerItems.filter((item) => (state.definitions[item.id] ?? 'weak') === 'review').length;
  const weak = total - know - review;
  return {
    total,
    know,
    review,
    weak,
    knowPct: total ? Math.round((know / total) * 100) : 0,
    reviewPct: total ? Math.round((review / total) * 100) : 0,
    weakPct: total ? Math.round((weak / total) * 100) : 0,
  };
}

export function buildHomeworkSummary(state: BattlePlanTrackerState) {
  const total = homeworkTrackerItems.length;
  const solved = homeworkTrackerItems.filter((item) => state.homework[item.id]?.status === 'solved').length;
  const high = homeworkTrackerItems.filter((item) => state.homework[item.id]?.confidence === 'high').length;
  const medium = homeworkTrackerItems.filter((item) => state.homework[item.id]?.confidence === 'medium').length;
  const low = homeworkTrackerItems.filter((item) => state.homework[item.id]?.confidence === 'low').length;
  return {
    total,
    solved,
    high,
    medium,
    low,
    completionPct: total ? Math.round((solved / total) * 100) : 0,
  };
}

export function buildDrillSummary(state: BattlePlanTrackerState) {
  const total = drillQuestionItems.length;
  const solved = drillQuestionItems.filter((item) => state.drill[item.id]?.solved).length;
  const hard = drillQuestionItems.filter((item) => state.drill[item.id]?.difficulty === 'hard').length;
  const medium = drillQuestionItems.filter((item) => state.drill[item.id]?.difficulty === 'medium').length;
  const easy = drillQuestionItems.filter((item) => state.drill[item.id]?.difficulty === 'easy').length;
  return {
    total,
    solved,
    hard,
    medium,
    easy,
    completionPct: total ? Math.round((solved / total) * 100) : 0,
  };
}

export function buildAutomaticImportantPatterns() {
  const grouped = new Map<string, PatternObservation[]>();
  patternObservations.forEach((item) => {
    const group = grouped.get(item.patternId) ?? [];
    group.push(item);
    grouped.set(item.patternId, group);
  });

  return Array.from(grouped.entries())
    .map(([patternId, items]) => {
      const sourceTypes = uniqueNumbers(
        items.map((item) => (item.sourceType === 'homework' ? 1 : item.sourceType === 'exam' ? 2 : 3))
      ).length;
      const probability = Math.round(items.reduce((sum, item) => sum + item.probability, 0) / items.length);
      return {
        patternId,
        title: items[0].title,
        explanation: items[0].explanation,
        rule: items[0].rule,
        examples: items.map((item) => `${item.sourceLabel}: ${item.miniExample}`),
        probability,
        frequency: items.length,
        sourceTypes,
        tags: items[0].tags,
        important: items.length >= 2 && sourceTypes >= 2 && probability >= 80,
      };
    })
    .sort((a, b) => b.probability - a.probability || b.frequency - a.frequency);
}

export function getTrackerCompletionLabel(progress: number) {
  if (progress >= 75) return 'Strong';
  if (progress >= 45) return 'Medium';
  return 'Weak';
}

export function getTrackerResourceSummary(state: BattlePlanTrackerState, resource: 'definitions' | 'homework' | 'drill') {
  if (resource === 'definitions') {
    const summary = buildDefinitionSummary(state);
    return {
      label: 'מעקב הגדרות',
      href: '/battle-plan/definitions',
      completionPct: summary.knowPct,
      meta: `${summary.know}/${summary.total}`,
    };
  }
  if (resource === 'homework') {
    const summary = buildHomeworkSummary(state);
    return {
      label: 'מעקב בית',
      href: '/battle-plan/homework',
      completionPct: summary.completionPct,
      meta: `${summary.solved}/${summary.total}`,
    };
  }
  const summary = buildDrillSummary(state);
  return {
    label: 'חזרת שאלות',
    href: '/battle-plan/drill',
    completionPct: summary.completionPct,
    meta: `${summary.solved}/${summary.total}`,
  };
}

export function getBlockResources(task: string, dayNumber: number): Array<'definitions' | 'homework' | 'drill' | 'tips'> {
  const resources = new Set<'definitions' | 'homework' | 'drill' | 'tips'>();
  const normalized = task.toLowerCase();

  if (
    normalized.includes('הגדר') ||
    normalized.includes('שינון') ||
    normalized.includes('משפטים') ||
    normalized.includes('נוסחאות')
  ) {
    resources.add('definitions');
  }

  if (normalized.includes('מטלה') || normalized.includes('שאלות בית')) {
    resources.add('homework');
  }

  if (
    normalized.includes('פתור') ||
    normalized.includes('פתרון') ||
    normalized.includes('שאלה') ||
    normalized.includes('מבחן') ||
    normalized.includes('סימולציה') ||
    normalized.includes('תרגול')
  ) {
    resources.add('drill');
  }

  if (
    normalized.includes('פונקציית עזר') ||
    normalized.includes('צפיפות') ||
    normalized.includes('אי-שוויון') ||
    normalized.includes('זיהוי')
  ) {
    resources.add('tips');
  }

  if (dayNumber === 3 || dayNumber === 4) {
    resources.add('homework');
  }

  return Array.from(resources);
}

export function getResourceLinkMeta(resource: 'definitions' | 'homework' | 'drill' | 'tips') {
  if (resource === 'definitions') {
    return { label: 'מעקב הגדרות', href: '/battle-plan/definitions' };
  }
  if (resource === 'homework') {
    return { label: 'מעקב שאלות בית', href: '/battle-plan/homework' };
  }
  if (resource === 'drill') {
    return { label: 'חזרת שאלות מלאה', href: '/battle-plan/drill' };
  }
  return { label: 'טיפים זהב', href: '/battle-plan/tips' };
}

export function buildTrackerSnapshot(state: BattlePlanTrackerState) {
  return {
    definitions: buildDefinitionSummary(state),
    homework: buildHomeworkSummary(state),
    drill: buildDrillSummary(state),
    topics: buildTopicProgress(state),
  };
}
