'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { moedBPredictions, moedBInsights, moedATopicDistribution } from '@/data/infi-exam-2026';
import { topicFrequencies } from '@/data/infi-topics';
import { TrendingUp, AlertTriangle, BarChart3, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

type ViewMode = 'predictions' | 'history' | 'distribution';

export default function LikelihoodPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('predictions');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set(['integrals', 'series', 'improper-integrals']));

  function toggleTopic(topic: string) {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  }

  function getLikelihoodColor(likelihood: number) {
    if (likelihood >= 90) return 'bg-red-500';
    if (likelihood >= 70) return 'bg-orange-500';
    if (likelihood >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  }

  function getLikelihoodBorder(likelihood: number) {
    if (likelihood >= 90) return 'border-r-red-500';
    if (likelihood >= 70) return 'border-r-orange-500';
    if (likelihood >= 50) return 'border-r-yellow-500';
    return 'border-r-gray-300';
  }

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">מנוע סבירות למבחן</h1>
          <p className="text-gray-500">
            ניתוח מבוסס מבחני עבר + ניתוח מועד א׳ 2026
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('predictions')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'predictions'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            חיזוי מועד ב׳
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'history'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            שכיחות היסטורית
          </button>
          <button
            onClick={() => setViewMode('distribution')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'distribution'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            מועד א׳ 2026
          </button>
        </div>

        {/* Key Insights */}
        {viewMode === 'predictions' && (
          <>
            <div className="grid gap-3">
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
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    ) : insight.priority === 'high' ? (
                      <TrendingUp className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
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
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                חיזוי נושאים למועד ב׳
              </h2>

              {moedBPredictions.map((prediction) => {
                const isExpanded = expandedTopics.has(prediction.topic);
                return (
                  <div
                    key={prediction.topic}
                    className={`bg-white rounded-xl border border-gray-200 border-r-4 ${getLikelihoodBorder(prediction.likelihood)} overflow-hidden`}
                  >
                    <button
                      onClick={() => toggleTopic(prediction.topic)}
                      className="w-full p-4 text-right"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getLikelihoodColor(prediction.likelihood)}`}>
                          {prediction.likelihood}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{prediction.topicHe}</h3>
                            {!prediction.wasInMoedA && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                לא היה במועד א׳!
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{prediction.reason}</p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp size={20} className="text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400 shrink-0" />
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                        <p className="text-sm text-gray-700">{prediction.reason}</p>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">מה לתרגל:</p>
                          <ul className="space-y-1">
                            {prediction.suggestedPractice.map((item, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-indigo-500 mt-1">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {prediction.relatedHomework.length > 0 && (
                          <p className="text-xs text-gray-500">
                            תרגילי בית קשורים: {prediction.relatedHomework.map(h => `תרגיל ${h}`).join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Historical Frequency */}
        {viewMode === 'history' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              שכיחות נושאים במבחני עבר (2022-2025)
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              מבוסס על ניתוח של 8 מבחנים × ~6 שאלות
            </p>
            {topicFrequencies.map((freq) => (
              <div key={freq.topic} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{freq.topicHe}</h3>
                  <span className="text-sm font-bold text-gray-700">{freq.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      freq.percentage >= 80 ? 'bg-red-500' :
                      freq.percentage >= 60 ? 'bg-orange-500' :
                      freq.percentage >= 40 ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}
                    style={{ width: `${freq.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  הופיע {freq.count} פעמים • דוגמאות: {freq.exampleDescriptions.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Moed A 2026 Distribution */}
        {viewMode === 'distribution' && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              פילוח נושאים — מועד א׳ 2026
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              5 שאלות × 25 נקודות = 100 נקודות סה״כ
            </p>
            {moedATopicDistribution.map((dist, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{dist.topic}</h3>
                  <span className="text-sm font-bold text-gray-700">{dist.count} סעיפים</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dist.questions.map(q => (
                    <span key={q} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">
                      שאלה {q}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* What was missing */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                מה לא הופיע במועד א׳?
              </h3>
              <div className="space-y-2">
                {moedBPredictions.filter(p => !p.wasInMoedA).map(p => (
                  <div key={p.topic} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                    <span className="text-sm text-red-800 font-medium">{p.topicHe}</span>
                    <span className="text-xs text-red-600">— סבירות {p.likelihood}% למועד ב׳</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
