// Core types for the Infi Study App

export type FileCategory = 'lecture' | 'tutorial' | 'homework' | 'exam';

export interface UploadedFile {
  id: string;
  name: string;
  category: FileCategory;
  indexNumber: number; // e.g., 1, 2, 3... for L01, T02, HW03
  displayTag: string; // e.g., "L01", "T03", "HW07", "EXAM_2022A"
  uploadedAt: Date;
  fileSize: number;
  pageCount: number;
  extractedText: string;
  isProcessed: boolean;
}

export type KnowledgeItemType = 'definition' | 'theorem' | 'lemma' | 'corollary' | 'proof' | 'technique' | 'conclusion';

export type Topic =
  | 'limits'
  | 'continuity'
  | 'derivatives'
  | 'integrals'
  | 'series'
  | 'sequences'
  | 'taylor'
  | 'differential-equations'
  | 'multivariable'
  | 'other';

export interface KnowledgeItem {
  id: string;
  type: KnowledgeItemType;
  title: string; // Auto-generated or user-edited
  verbatimText: string; // EXACT quote from source - NEVER modify
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  sourceSection?: string;
  topics: Topic[];
  whenToUse: string; // Generated triggers - SEPARATE from verbatim
  linkedQuestionIds: string[];
  linkedItemIds: string[]; // Related theorems/proofs
  isInReviewList: boolean;
  likelihoodScore: number; // 0-100
  createdAt: Date;
  lastReviewedAt?: Date;
  reviewCount: number;
}

export interface ExamQuestion {
  id: string;
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  questionNumber: number;
  verbatimText: string;
  topics: Topic[];
  difficulty: 'easy' | 'medium' | 'hard';
  requiredTheorems: string[]; // IDs of knowledge items
  questionPattern: string; // Template/pattern identifier
  solutionSteps?: string[];
  isFromHomework: boolean;
  originalHomeworkId?: string;
}

export interface HomeworkQuestion {
  id: string;
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  homeworkNumber: number;
  questionNumber: number;
  verbatimText: string;
  topics: Topic[];
  difficulty: 'easy' | 'medium' | 'hard';
  requiredTheorems: string[];
  solutionFramework?: string;
  similarityToExams: number; // 0-100
  examLikelihoodScore: number; // 0-100
  matchingExamQuestions: string[]; // IDs
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number; // minutes
  itemsStudied: string[]; // IDs
  questionsAttempted: string[];
  correctAnswers: number;
  mode: 'flashcard' | 'identify-tool' | 'step-solver' | 'exam-sim';
}

export interface StudyPlan {
  id: string;
  examDate: Date;
  hoursPerDay: number;
  weakTopics: Topic[];
  createdAt: Date;
  dailyPlans: DailyPlan[];
}

export interface DailyPlan {
  date: Date;
  tasks: StudyTask[];
  isCompleted: boolean;
}

export interface StudyTask {
  id: string;
  type: 'review-lecture' | 'review-tutorial' | 'memorize-theorem' | 'memorize-proof' | 'practice-set' | 'exam-simulation';
  description: string;
  targetItems: string[]; // File IDs or Knowledge Item IDs
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface PracticeResult {
  id: string;
  itemId: string;
  attemptedAt: Date;
  wasCorrect: boolean;
  timeSpentSeconds: number;
  mode: 'flashcard' | 'identify-tool' | 'step-solver';
}

export interface ExamPattern {
  id: string;
  pattern: string;
  description: string;
  frequency: number;
  exampleQuestionIds: string[];
  relatedTheorems: string[];
  topics: Topic[];
}

export interface AppStats {
  totalFiles: number;
  lectureCount: number;
  tutorialCount: number;
  homeworkCount: number;
  examCount: number;
  totalKnowledgeItems: number;
  totalQuestions: number;
  studyStreak: number;
  lastStudyDate?: Date;
}

// Analysis results
export interface LikelihoodAnalysis {
  topTheorems: KnowledgeItem[];
  topProofs: KnowledgeItem[];
  topDefinitions: KnowledgeItem[];
  gaps: GapItem[];
  lastUpdated: Date;
}

export interface GapItem {
  description: string;
  reason: string;
  suggestedAction: string;
  relatedTopics: Topic[];
}

export interface ExamAnalysis {
  mostCommonTopics: { topic: Topic; frequency: number }[];
  mostUsedTheorems: { theoremId: string; title: string; frequency: number }[];
  typicalStructure: {
    questionCount: number;
    topicDistribution: { topic: Topic; percentage: number }[];
    difficultyDistribution: { difficulty: string; percentage: number }[];
  };
  patterns: ExamPattern[];
}

// For Hebrew RTL support
export type Direction = 'rtl' | 'ltr';
export type Language = 'he' | 'en';
