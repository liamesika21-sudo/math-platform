'use client';

import type { HomeworkQuestion, ExamQuestion } from '@/types';
import { FileText, ExternalLink, TrendingUp } from 'lucide-react';

interface QuestionCardProps {
  question: HomeworkQuestion | ExamQuestion;
  showLikelihood?: boolean;
  onViewSource?: (fileId: string, page: number) => void;
}

export default function QuestionCard({ question, showLikelihood = false, onViewSource }: QuestionCardProps) {
  const isHomework = 'homeworkNumber' in question;
  const likelihoodScore = isHomework ? question.examLikelihoodScore : undefined;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {isHomework ? `תרגיל ${question.homeworkNumber} - שאלה ${question.questionNumber}` : `שאלת מבחן ${question.questionNumber}`}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                question.difficulty === 'hard'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : question.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {question.difficulty === 'hard' ? 'קשה' : question.difficulty === 'medium' ? 'בינוני' : 'קל'}
              </span>
            </div>
          </div>

          {showLikelihood && likelihoodScore !== undefined && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{likelihoodScore}%</span>
            </div>
          )}
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-3">
          {question.topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Question Text */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3 border-r-4 border-purple-500">
          <div className="flex items-start gap-2 mb-2">
            <FileText size={16} className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">נוסח השאלה:</p>
          </div>
          <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {question.verbatimText}
          </div>
        </div>

        {/* Homework-specific: Solution Framework */}
        {isHomework && question.solutionFramework && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">מתודה לפתרון:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{question.solutionFramework}</p>
          </div>
        )}

        {/* Source */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>מקור: {question.sourceFileName}</span>
            <span>•</span>
            <span>עמוד {question.sourcePage}</span>
          </div>
          {onViewSource && (
            <button
              onClick={() => onViewSource(question.sourceFileId, question.sourcePage)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={14} />
              <span>צפה במקור</span>
            </button>
          )}
        </div>

        {/* Homework-specific: Matching exams */}
        {isHomework && question.matchingExamQuestions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              דומה ל-{question.matchingExamQuestions.length} שאלות מבחן קודמות
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
