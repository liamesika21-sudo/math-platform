import type { CourseWeek, PlatformQuestion, TheoryItem, UserQuestionState } from '@/lib/math-platform/types';

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function getDifficultyLabel(difficulty: PlatformQuestion['difficulty']) {
  switch (difficulty) {
    case 'easy':
      return 'קל';
    case 'medium':
      return 'בינוני';
    case 'hard':
      return 'קשה';
    default:
      return difficulty;
  }
}

export function getSourceTypeLabel(sourceType: PlatformQuestion['sourceType']) {
  switch (sourceType) {
    case 'tutorial':
      return 'תרגולים';
    case 'homework':
      return 'שיעורי בית';
    case 'exam':
      return 'שאלות ממבחנים';
    case 'lecture':
      return 'תיאוריה ומושגים';
    default:
      return sourceType;
  }
}

export function getQuestionMetrics(questions: PlatformQuestion[], states: UserQuestionState[]) {
  const stateMap = new Map(states.map((state) => [state.questionId, state]));

  const solved = questions.filter((question) => {
    const state = stateMap.get(question.id);
    return state?.status === 'solved' || state?.solvedIndependently;
  }).length;

  const difficult = questions.filter((question) => stateMap.get(question.id)?.wasHard).length;

  return {
    total: questions.length,
    solved,
    remaining: Math.max(0, questions.length - solved),
    difficult,
  };
}

export function getWeekCompletion(week: CourseWeek, states: UserQuestionState[]) {
  const questionIds = [...week.tutorialQuestionIds, ...week.homeworkQuestionIds, ...week.examQuestionIds];
  const stateMap = new Map(states.map((state) => [state.questionId, state]));
  const solved = questionIds.filter((questionId) => {
    const state = stateMap.get(questionId);
    return state?.status === 'solved' || state?.solvedIndependently;
  }).length;

  return questionIds.length === 0 ? 0 : Math.round((solved / questionIds.length) * 100);
}

export function groupTheoryByKind(items: TheoryItem[]) {
  return {
    definitions: items.filter((item) => item.kind === 'definition'),
    theorems: items.filter((item) => item.kind === 'theorem'),
    formulas: items.filter((item) => item.kind === 'formula'),
    concepts: items.filter((item) => item.kind === 'concept'),
  };
}
