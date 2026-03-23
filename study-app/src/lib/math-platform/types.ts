export type CourseId = 'logic' | 'data-structures';
export type SourceType = 'lecture' | 'tutorial' | 'homework' | 'exam';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionStatus = 'not_started' | 'in_progress' | 'solved';
export type TheoryKind = 'definition' | 'theorem' | 'formula' | 'concept';
export type SystemTag =
  | 'Must Know'
  | 'Frequently Appears in Exams'
  | 'Core Problem'
  | 'Advanced Difficulty'
  | 'Important';

export interface TheoryItem {
  id: string;
  courseId: CourseId;
  weekId: string;
  topicId: string;
  title: string;
  kind: TheoryKind;
  content: string;
  sourceName: string;
  sourceDocumentId: string;
  /** Slide / page number inside the source document */
  sourcePage?: number;
}

export interface PlatformQuestion {
  id: string;
  courseId: CourseId;
  weekId: string;
  topicId: string;
  sourceType: SourceType;
  sourceName: string;
  sourceDocumentId: string;
  /** Slide / page number inside the source document */
  sourcePage?: number;
  title: string;
  content: string;
  difficulty: Difficulty;
  isRequired: boolean;
  isExamFrequent: boolean;
  systemTags: SystemTag[];
  hint?: string;
  solution?: string;
  imageUrl?: string;
}

export interface CourseTopic {
  id: string;
  courseId: CourseId;
  weekId: string;
  title: string;
  summary: string;
  patterns: string[];
}

export interface SourceDocument {
  id: string;
  courseId: CourseId;
  weekId: string;
  type: SourceType;
  name: string;
  topicIds: string[];
  processed: boolean;
}

export interface CourseWeek {
  id: string;
  courseId: CourseId;
  number: number;
  title: string;
  summary: string;
  topicIds: string[];
  lectureItemIds: string[];
  tutorialQuestionIds: string[];
  homeworkQuestionIds: string[];
  examQuestionIds: string[];
  reviewHighlights: string[];
  lectureSummaryUrl?: string;
}

export interface Course {
  id: CourseId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  accent: string;
  surface: string;
  icon: string;
}

export interface UserQuestionState {
  questionId: string;
  status: QuestionStatus;
  wasHard: boolean;
  wasEasy: boolean;
  reviewLater: boolean;
  solvedIndependently: boolean;
  askChatLater: boolean;
  notes: string;
}
