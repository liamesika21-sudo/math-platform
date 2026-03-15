'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import {
  moedA2026,
  moedATopicDistribution,
  moedBPredictions,
  moedBInsights,
  moedBPracticeOrder,
} from '@/data/infi-exam-2026';
import {
  FileSearch,
  ChevronDown,
  ChevronUp,
  Target,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  Lightbulb,
  BarChart3,
  ListOrdered,
} from 'lucide-react';

type Tab = 'moedA' | 'predictions' | 'practice';

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('predictions');
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(qNum) ? prev.filter((n) => n !== qNum) : [...prev, qNum]
    );
  };

  const difficultyLabel = (d: string) =>
    d === 'easy' ? 'קל' : d === 'medium' ? 'בינוני' : 'קשה';
  const difficultyColor = (d: string) =>
    d === 'easy'
      ? 'bg-green-100 text-green-800'
      : d === 'medium'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';

  const typeLabel = (t: string) => {
    switch (t) {
      case 'definition': return 'הגדרה';
      case 'proof': return 'הוכחה';
      case 'calculation': return 'חישוב';
      case 'counterexample': return 'דוגמה נגדית';
      default: return t;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">ניתוח מבחנים וחיזוי מועד ב׳</h1>
          <p className="text-gray-500">ניתוח מועד א׳ 2026 + חיזוי נושאים למועד ב׳</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-0">
          {[
            { id: 'predictions' as Tab, label: 'חיזוי מועד ב׳', icon: <Target className="w-4 h-4" /> },
            { id: 'moedA' as Tab, label: 'סיכום מועד א׳', icon: <FileSearch className="w-4 h-4" /> },
            { id: 'practice' as Tab, label: 'סדר תרגול', icon: <ListOrdered className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* PREDICTIONS TAB */}
        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {/* Key Insights */}
            <div className="space-y-3">
              {moedBInsights.map((insight, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border ${
                    insight.priority === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : insight.priority === 'high'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {insight.priority === 'critical' ? (
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    ) : insight.priority === 'high' ? (
                      <Lightbulb className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className={`font-bold mb-1 ${
                        insight.priority === 'critical' ? 'text-red-900' :
                        insight.priority === 'high' ? 'text-orange-900' : 'text-blue-900'
                      }`}>
                        {insight.titleHe}
                      </h3>
                      <p className={`text-sm ${
                        insight.priority === 'critical' ? 'text-red-700' :
                        insight.priority === 'high' ? 'text-orange-700' : 'text-blue-700'
                      }`}>
                        {insight.descriptionHe}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Predictions List */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                חיזוי נושאים למועד ב׳
              </h2>
              <div className="space-y-3">
                {moedBPredictions.map((pred) => (
                  <div
                    key={pred.topic}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Likelihood Badge */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                            pred.likelihood >= 90
                              ? 'bg-red-500'
                              : pred.likelihood >= 70
                              ? 'bg-orange-500'
                              : pred.likelihood >= 50
                              ? 'bg-yellow-500'
                              : 'bg-gray-400'
                          }`}
                        >
                          {pred.likelihood}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{pred.topicHe}</h3>
                            {pred.wasInMoedA ? (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                היה במועד א׳
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                                לא היה במועד א׳!
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{pred.reason}</p>
                        </div>
                      </div>

                      {/* Likelihood Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            pred.likelihood >= 90
                              ? 'bg-red-500'
                              : pred.likelihood >= 70
                              ? 'bg-orange-500'
                              : pred.likelihood >= 50
                              ? 'bg-yellow-500'
                              : 'bg-gray-400'
                          }`}
                          style={{ width: `${pred.likelihood}%` }}
                        />
                      </div>

                      {/* Practice Suggestions */}
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 mb-1">מה לתרגל:</p>
                        {pred.suggestedPractice.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {pred.relatedHomework.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-50">
                          <p className="text-xs text-gray-500">
                            תרגילי בית רלוונטיים:{' '}
                            {pred.relatedHomework.map((hw) => `תרגיל ${hw}`).join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOED A TAB */}
        {activeTab === 'moedA' && (
          <div className="space-y-6">
            {/* Exam Info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-indigo-600" />
                מועד א׳ 2026 — חשבון אינפיניטסימלי 1
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500">שאלות</p>
                  <p className="font-bold text-gray-900 text-lg">5</p>
                  <p className="text-xs text-gray-400">צריך לענות על 4</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500">ניקוד</p>
                  <p className="font-bold text-gray-900 text-lg">25</p>
                  <p className="text-xs text-gray-400">נקודות לשאלה</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500">זמן</p>
                  <p className="font-bold text-gray-900 text-lg">3</p>
                  <p className="text-xs text-gray-400">שעות</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-gray-500">חומר עזר</p>
                  <p className="font-bold text-gray-900 text-lg">אין</p>
                  <p className="text-xs text-gray-400">ללא חומר</p>
                </div>
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                התפלגות נושאים במועד א׳
              </h2>
              <div className="space-y-3">
                {moedATopicDistribution.map((item) => (
                  <div key={item.topic} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.topic}</span>
                        <span className="text-sm text-gray-500">{item.count} סעיפים</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(item.count / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What was NOT tested */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  מה לא הופיע במועד א׳ (צפוי במועד ב׳!):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['טורים', 'סדרות', 'רב"ש', 'טיילור (שאלה מלאה)'].map(
                    (topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200"
                      >
                        {topic}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Question-by-Question Breakdown */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                פירוט שאלות — מועד א׳ 2026
              </h2>
              <div className="space-y-3">
                {moedA2026.map((q) => {
                  const isExpanded = expandedQuestions.includes(q.questionNumber);
                  return (
                    <div
                      key={q.questionNumber}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(q.questionNumber)}
                        className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-right"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold flex-shrink-0">
                          {q.questionNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-gray-900">
                              שאלה {q.questionNumber}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor(q.difficulty)}`}>
                              {difficultyLabel(q.difficulty)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {q.totalPoints} נקודות
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {q.mainTopicsHe.map((t) => (
                              <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-100 p-4 space-y-4">
                          {q.subParts.map((part) => (
                            <div key={part.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="font-mono text-sm font-bold text-indigo-600">
                                  {part.id}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                  {typeLabel(part.type)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {part.points} נקודות
                                </span>
                              </div>
                              <p className="text-sm font-medium text-gray-900 mb-2">
                                {part.descriptionHe}
                              </p>
                              <div className="bg-white rounded-lg p-3 border border-gray-200">
                                <p className="text-xs font-medium text-gray-500 mb-1">סיכום הפתרון:</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {part.solutionSummary}
                                </p>
                              </div>
                              {part.keyTheorems.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  <span className="text-xs text-gray-500">משפטים בשימוש:</span>
                                  {part.keyTheorems.map((thm) => (
                                    <span
                                      key={thm}
                                      className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full"
                                    >
                                      {thm}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE ORDER TAB */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-indigo-900">סדר תרגול מומלץ למועד ב׳</h3>
                  <p className="text-sm text-indigo-700">
                    סדר זה מבוסס על ניתוח מועד א׳ 2026 ודפוסים מ-8 מבחנים קודמים.
                    התחילו מלמעלה ותעבדו למטה.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {moedBPracticeOrder.map((item) => (
                <div
                  key={item.rank}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 ${
                        item.rank <= 2
                          ? 'bg-red-500'
                          : item.rank <= 4
                          ? 'bg-orange-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.topicHe}</h3>
                      <p className="text-sm text-gray-500">~{item.hours} שעות תרגול</p>
                    </div>
                    {item.rank <= 2 && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                        קריטי
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {item.items.map((task, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Study Hours */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-sm text-gray-500">סה&quot;כ שעות תרגול מומלצות</p>
              <p className="text-3xl font-bold text-gray-900">
                {moedBPracticeOrder.reduce((sum, i) => sum + i.hours, 0)}
              </p>
              <p className="text-sm text-gray-500">שעות</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
