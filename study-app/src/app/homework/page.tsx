'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { homeworkExercises, getExercisesByRelevance } from '@/data/infi-homework-practice';
import {
  FileQuestion,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Star,
  Filter,
  BookOpen,
  Lightbulb,
} from 'lucide-react';

type FilterMode = 'relevance' | 'order' | 'critical';

export default function HomeworkPage() {
  const [filter, setFilter] = useState<FilterMode>('relevance');
  const [expandedExercises, setExpandedExercises] = useState<number[]>([10, 11, 12]);

  const toggleExercise = (num: number) => {
    setExpandedExercises((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const getExercises = () => {
    switch (filter) {
      case 'relevance':
        return getExercisesByRelevance();
      case 'critical':
        return getExercisesByRelevance().filter(
          (e) => e.moedBRelevance === 'critical' || e.moedBRelevance === 'high'
        );
      case 'order':
      default:
        return homeworkExercises;
    }
  };

  const exercises = getExercises();

  const relevanceColor = (r: string) => {
    switch (r) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const relevanceLabel = (r: string) => {
    switch (r) {
      case 'critical': return 'קריטי';
      case 'high': return 'גבוה';
      case 'medium': return 'בינוני';
      case 'low': return 'נמוך';
      default: return r;
    }
  };

  const relevanceBorder = (r: string) => {
    switch (r) {
      case 'critical': return 'border-r-4 border-r-red-500';
      case 'high': return 'border-r-4 border-r-orange-500';
      case 'medium': return 'border-r-4 border-r-yellow-400';
      case 'low': return 'border-r-4 border-r-gray-300';
      default: return '';
    }
  };

  const totalQuestions = homeworkExercises.reduce((sum, e) => sum + e.questionTypes.length, 0);
  const criticalExercises = homeworkExercises.filter((e) => e.moedBRelevance === 'critical');
  const examRelevantQuestions = homeworkExercises.reduce(
    (sum, e) => sum + e.questionTypes.filter((q) => q.examRelevant).length,
    0
  );

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            שיעורי בית — רשימת תרגול למועד ב׳
          </h1>
          <p className="text-gray-500">
            תרגילים מסודרים לפי רלוונטיות למועד ב׳ על סמך ניתוח מועד א׳
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 rounded-xl border border-red-200 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">
                תרגילים קריטיים למועד ב׳!
              </h3>
              <p className="text-sm text-red-700">
                תרגיל 12 (טורים) הוא הכי קריטי — טורים לא הופיעו כלל במועד א׳.
                גם תרגילים 2, 3 (סדרות), 6 (רב&quot;ש) ו-9 (טיילור) חשובים מאוד.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{homeworkExercises.length}</p>
            <p className="text-xs text-gray-500">תרגילים</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            <p className="text-xs text-gray-500">סה&quot;כ שאלות</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-red-600">{criticalExercises.length}</p>
            <p className="text-xs text-gray-500">תרגילים קריטיים</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-indigo-600">{examRelevantQuestions}</p>
            <p className="text-xs text-gray-500">שאלות רלוונטיות למבחן</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-sm text-gray-500 ml-2">
            <Filter className="w-4 h-4" />
            סינון:
          </div>
          {[
            { id: 'relevance' as FilterMode, label: 'לפי רלוונטיות למועד ב׳' },
            { id: 'critical' as FilterMode, label: 'קריטי + גבוה בלבד' },
            { id: 'order' as FilterMode, label: 'לפי סדר התרגילים' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === f.id
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {exercises.map((ex) => {
            const isExpanded = expandedExercises.includes(ex.exerciseNumber);
            return (
              <div
                key={ex.exerciseNumber}
                className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${relevanceBorder(
                  ex.moedBRelevance
                )}`}
              >
                <button
                  onClick={() => toggleExercise(ex.exerciseNumber)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-right"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                      ex.moedBRelevance === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : ex.moedBRelevance === 'high'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {ex.exerciseNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">
                        תרגיל {ex.exerciseNumber} — {ex.topicHe}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${relevanceColor(
                          ex.moedBRelevance
                        )}`}
                      >
                        {relevanceLabel(ex.moedBRelevance)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {ex.questionTypes.length} שאלות • שבוע {ex.weekNumber}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-3">
                    {/* Moed B Note */}
                    <div className={`rounded-lg p-3 text-sm ${
                      ex.moedBRelevance === 'critical'
                        ? 'bg-red-50 text-red-700'
                        : ex.moedBRelevance === 'high'
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{ex.moedBNote}</span>
                      </div>
                    </div>

                    {/* Questions */}
                    <div className="space-y-2">
                      {ex.questionTypes.map((q) => (
                        <div
                          key={q.id}
                          className={`rounded-lg p-3 flex items-start gap-3 ${
                            q.examRelevant ? 'bg-white border border-gray-200' : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {q.examRelevant ? (
                              <Star className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <BookOpen className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-mono text-xs font-bold text-indigo-600">
                                {q.id}
                              </span>
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded ${
                                  q.difficulty === 'easy'
                                    ? 'bg-green-100 text-green-700'
                                    : q.difficulty === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {q.difficulty === 'easy' ? 'קל' : q.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                              </span>
                              <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                {q.type === 'definition'
                                  ? 'הגדרה'
                                  : q.type === 'proof'
                                  ? 'הוכחה'
                                  : q.type === 'calculation'
                                  ? 'חישוב'
                                  : q.type === 'counterexample'
                                  ? 'דוגמה נגדית'
                                  : 'טכניקה'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900">{q.descriptionHe}</p>
                            {q.tip && (
                              <p className="text-xs text-indigo-600 mt-1 font-medium">
                                {q.tip}
                              </p>
                            )}
                          </div>
                          {q.examRelevant && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
          <h3 className="font-bold text-indigo-900 mb-2">סיכום</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-indigo-700">
            <p>
              <strong>תעדוף ראשון:</strong> תרגיל 12 (טורים — לא הופיע במועד א׳!)
            </p>
            <p>
              <strong>תעדוף שני:</strong> תרגילים 2, 3, 6, 9 (סדרות + רב&quot;ש + טיילור)
            </p>
            <p>
              <strong>תעדוף שלישי:</strong> תרגילים 4, 5, 7, 8, 10, 11 (גבולות + רציפות + נגזרות + MVT)
            </p>
            <p>
              <strong>תעדוף אחרון:</strong> תרגיל 1 (sup/inf — הופיע במועד א׳)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
