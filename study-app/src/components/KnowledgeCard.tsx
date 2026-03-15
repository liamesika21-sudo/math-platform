'use client';

import { useState } from 'react';
import type { KnowledgeItem } from '@/types';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Star, StarOff } from 'lucide-react';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onToggleReview?: (id: string) => void;
  onViewSource?: (fileId: string, page: number) => void;
}

const typeLabels: Record<string, string> = {
  definition: 'הגדרה',
  theorem: 'משפט',
  lemma: 'למה',
  corollary: 'מסקנה',
  proof: 'הוכחה',
  technique: 'טכניקה',
  conclusion: 'סיכום',
};

const typeColors: Record<string, string> = {
  definition: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  theorem: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  lemma: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  corollary: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  proof: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  technique: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  conclusion: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export default function KnowledgeCard({ item, onToggleReview, onViewSource }: KnowledgeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[item.type]}`}>
                {typeLabels[item.type]}
              </span>
              {item.likelihoodScore >= 70 && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  סבירות גבוהה {item.likelihoodScore}%
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
          </div>

          <button
            onClick={() => onToggleReview?.(item.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={item.isInReviewList ? 'הסר מרשימת חזרה' : 'הוסף לרשימת חזרה'}
          >
            {item.isInReviewList ? (
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff size={20} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Verbatim Content */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-3 border-r-4 border-blue-500">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen size={16} className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">תוכן מדויק מהמקור:</p>
          </div>
          <div
            className={`text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap ${
              !isExpanded && item.verbatimText.length > 300 ? 'line-clamp-4' : ''
            }`}
          >
            {item.verbatimText}
          </div>
          {item.verbatimText.length > 300 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  <span>הצג פחות</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  <span>הצג עוד</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* When to Use (Generated) */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 mb-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">מתי להשתמש:</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{item.whenToUse}</p>
        </div>

        {/* Source */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>מקור: {item.sourceFileName}</span>
            <span>•</span>
            <span>עמוד {item.sourcePage}</span>
          </div>
          {onViewSource && (
            <button
              onClick={() => onViewSource(item.sourceFileId, item.sourcePage)}
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={14} />
              <span>צפה במקור</span>
            </button>
          )}
        </div>

        {/* Stats */}
        {item.reviewCount > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            נסקר {item.reviewCount} פעמים
            {item.lastReviewedAt && ` • סקירה אחרונה: ${new Date(item.lastReviewedAt).toLocaleDateString('he-IL')}`}
          </div>
        )}
      </div>
    </div>
  );
}
