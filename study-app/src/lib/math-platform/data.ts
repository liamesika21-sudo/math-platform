import type {
  Course,
  CourseId,
  CourseTopic,
  CourseWeek,
  PlatformQuestion,
  SourceDocument,
  TheoryItem,
} from '@/lib/math-platform/types';

const sourceId = (courseId: CourseId, weekNumber: number, type: SourceDocument['type']) =>
  `${courseId}-w${weekNumber}-${type}`;

const theoryId = (courseId: CourseId, weekNumber: number, slug: string) =>
  `${courseId}-w${weekNumber}-${slug}`;

const questionId = (courseId: CourseId, weekNumber: number, slug: string) =>
  `${courseId}-w${weekNumber}-${slug}`;

// Suppress unused variable warnings — helpers used for future data entry
void sourceId; void theoryId; void questionId;

export const courses: Course[] = [
  {
    id: 'logic',
    title: 'לוגיקה ותורת הקבוצות',
    shortTitle: 'לוגיקה',
    subtitle: 'לוגיקה פרופוזיציונית, תורת הקבוצות, יחסים ופונקציות',
    description:
      'סביבת עבודה מובנית ללוגיקה ותורת הקבוצות — הגדרות, משפטים, הוכחות ותרגולים לפי שבוע.',
    accent: 'from-violet-500 via-purple-500 to-indigo-500',
    surface: 'from-violet-50 via-white to-indigo-50',
    icon: '∀',
  },
  {
    id: 'data-structures',
    title: 'מבני נתונים',
    shortTitle: 'מבני נתונים',
    subtitle: 'מערכים, רשימות, עצים, גרפים ואלגוריתמים בסיסיים',
    description:
      'סביבת לימוד למבני נתונים המפרידה בין תיאוריה, מימוש ותרגולים — לפי שבוע ונושא.',
    accent: 'from-emerald-500 via-teal-500 to-cyan-500',
    surface: 'from-emerald-50 via-white to-cyan-50',
    icon: '⬡',
  },
];

// Content will be populated via the admin upload interface
export const topics: CourseTopic[] = [];
export const weeks: CourseWeek[] = [];
export const questions: PlatformQuestion[] = [];
export const theoryItems: TheoryItem[] = [];
export const sourceDocuments: SourceDocument[] = [];

// ─── Helper functions ────────────────────────────────────────────────────────

export function getCourseById(courseId: CourseId) {
  return courses.find((course) => course.id === courseId);
}

export function getCourseTopics(courseId: CourseId) {
  return topics.filter((topic) => topic.courseId === courseId);
}

export function getCourseWeeks(courseId: CourseId) {
  return weeks.filter((week) => week.courseId === courseId);
}

export function getCourseQuestions(courseId: CourseId) {
  return questions.filter((question) => question.courseId === courseId);
}

export function getCourseTheoryItems(courseId: CourseId) {
  return theoryItems.filter((item) => item.courseId === courseId);
}

export function getCourseSources(courseId: CourseId) {
  return sourceDocuments.filter((document) => document.courseId === courseId);
}

export function getWeekById(courseId: CourseId, weekId: string) {
  return getCourseWeeks(courseId).find((week) => week.id === weekId);
}

export function getQuestionById(courseId: CourseId, questionIdValue: string) {
  return getCourseQuestions(courseId).find((question) => question.id === questionIdValue);
}

export function getTheoryItemsForWeek(weekId: string) {
  return theoryItems.filter((item) => item.weekId === weekId);
}

export function getQuestionsForWeek(weekId: string) {
  return questions.filter((question) => question.weekId === weekId);
}

export function getTopicById(topicId: string) {
  return topics.find((topic) => topic.id === topicId);
}

export function getQuestionsForTopic(courseId: CourseId, topicId: string) {
  return getCourseQuestions(courseId).filter((question) => question.topicId === topicId);
}

export function getTheoryItemsForTopic(courseId: CourseId, topicId: string) {
  return getCourseTheoryItems(courseId).filter((item) => item.topicId === topicId);
}

export function getSourceDocumentById(documentId: string) {
  return sourceDocuments.find((document) => document.id === documentId);
}
