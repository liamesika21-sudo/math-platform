'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import {
  examTopics,
  getTopicsByLikelihood,
  getCriticalTopics,
  getTotalExercises,
} from '@/data/infi-practice-by-topic';
import type { ExamTopic, PracticeExercise } from '@/data/infi-practice-by-topic';
import {
  Target,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowUp,
  Flame,
  Star,
  Zap,
  Filter,
} from 'lucide-react';

type ViewMode = 'all' | 'critical' | 'exercises';
type ExpandedState = Record<string, boolean>;

export default function ExamPrepPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [expandedTopics, setExpandedTopics] = useState<ExpandedState>({ series: true });
  const [expandedExercises, setExpandedExercises] = useState<Record<string, boolean>>({});
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});

  const sortedTopics = getTopicsByLikelihood();
  const criticalTopics = getCriticalTopics();
  const totalExercises = getTotalExercises();

  const displayTopics = viewMode === 'critical' ? criticalTopics : sortedTopics;

  function toggleTopic(id: string) {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleExercise(id: string) {
    setExpandedExercises(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSolution(id: string) {
    setShowSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    const all: ExpandedState = {};
    sortedTopics.forEach(t => { all[t.id] = true; });
    setExpandedTopics(all);
  }

  function collapseAll() {
    setExpandedTopics({});
  }

  function getLikelihoodColor(l: number): string {
    if (l >= 90) return 'from-red-500 to-red-600';
    if (l >= 70) return 'from-orange-500 to-orange-600';
    if (l >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-gray-400 to-gray-500';
  }

  function getLikelihoodBg(l: number): string {
    if (l >= 90) return 'bg-red-50 border-red-200';
    if (l >= 70) return 'bg-orange-50 border-orange-200';
    if (l >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
  }

  function getLikelihoodBorder(l: number): string {
    if (l >= 90) return 'border-r-red-500';
    if (l >= 70) return 'border-r-orange-500';
    if (l >= 50) return 'border-r-yellow-500';
    return 'border-r-gray-300';
  }

  function getLabelColor(label: string): string {
    switch (label) {
      case 'הגדרה': return 'bg-blue-100 text-blue-800';
      case 'משפט': return 'bg-purple-100 text-purple-800';
      case 'טכניקה': return 'bg-green-100 text-green-800';
      case 'נוסחה': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getDifficultyInfo(d: string) {
    switch (d) {
      case 'easy': return { label: 'קל', color: 'bg-green-100 text-green-700', stars: 1 };
      case 'medium': return { label: 'בינוני', color: 'bg-yellow-100 text-yellow-700', stars: 2 };
      case 'hard': return { label: 'קשה', color: 'bg-red-100 text-red-700', stars: 3 };
      default: return { label: d, color: 'bg-gray-100 text-gray-700', stars: 1 };
    }
  }

  function getTypeLabel(t: string) {
    switch (t) {
      case 'definition': return 'הגדרה';
      case 'proof': return 'הוכחה';
      case 'calculation': return 'חישוב';
      case 'counterexample': return 'דוגמה נגדית';
      default: return t;
    }
  }

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Flame className="w-7 h-7 text-red-500" />
              מרכז הכנה למבחן — אינפי 1
            </h1>
            <p className="text-gray-500">כל הנושאים מסודרים לפי סבירות + תרגילים עם פתרונות</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={expandAll} className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
              פתח הכל
            </button>
            <button onClick={collapseAll} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              סגור הכל
            </button>
          </div>
        </div>

        {/* Critical Alert */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">נושאים שלא הופיעו במועד א׳ — סבירות גבוהה!</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {sortedTopics.filter(t => !t.wasInMoedA).map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setExpandedTopics(prev => ({ ...prev, [t.id]: true }));
                      document.getElementById(`topic-${t.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    {t.nameHe} ({t.likelihood}%)
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-red-600">{sortedTopics.length}</p>
            <p className="text-xs text-gray-500 mt-1">נושאים</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-orange-600">{criticalTopics.length}</p>
            <p className="text-xs text-gray-500 mt-1">סבירות גבוהה (65%+)</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-indigo-600">{totalExercises}</p>
            <p className="text-xs text-gray-500 mt-1">תרגילים עם פתרונות</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">{sortedTopics.reduce((s, t) => s + t.keyItems.length, 0)}</p>
            <p className="text-xs text-gray-500 mt-1">פריטי ידע</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-sm text-gray-500 ml-2">
            <Filter className="w-4 h-4" />
            תצוגה:
          </div>
          {([
            { id: 'all' as ViewMode, label: 'כל הנושאים', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'critical' as ViewMode, label: 'סבירות גבוהה בלבד', icon: <AlertTriangle className="w-4 h-4" /> },
            { id: 'exercises' as ViewMode, label: 'תרגילים בלבד', icon: <Target className="w-4 h-4" /> },
          ]).map(f => (
            <button
              key={f.id}
              onClick={() => setViewMode(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                viewMode === f.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Probability Overview Bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">סבירות נושאים למועד ב׳</h3>
          <div className="space-y-2">
            {sortedTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setExpandedTopics(prev => ({ ...prev, [topic.id]: true }));
                  document.getElementById(`topic-${topic.id}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 w-32 text-right truncate shrink-0">{topic.nameHe}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-l ${getLikelihoodColor(topic.likelihood)} flex items-center justify-end pr-2`}
                    style={{ width: `${topic.likelihood}%` }}
                  >
                    {topic.likelihood >= 40 && (
                      <span className="text-[10px] text-white font-bold">{topic.likelihood}%</span>
                    )}
                  </div>
                </div>
                {!topic.wasInMoedA && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded shrink-0">חדש!</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TOPICS ===== */}
        <div className="space-y-4">
          {displayTopics.map((topic, topicIndex) => {
            const isExpanded = !!expandedTopics[topic.id];

            return (
              <div
                key={topic.id}
                id={`topic-${topic.id}`}
                className={`bg-white rounded-xl border shadow-sm overflow-hidden border-r-4 ${getLikelihoodBorder(topic.likelihood)}`}
              >
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-right"
                >
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getLikelihoodColor(topic.likelihood)} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                    {topic.likelihood}%
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-gray-900 text-lg">
                        #{topicIndex + 1} {topic.nameHe}
                      </h2>
                      {!topic.wasInMoedA && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium animate-pulse">
                          לא היה במועד א׳!
                        </span>
                      )}
                      {topic.wasInMoedA && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          היה במועד א׳
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{topic.whyImportant}</p>
                    <div className="flex gap-3 mt-1 text-xs text-gray-500">
                      <span>{topic.keyItems.length} פריטי ידע</span>
                      <span>{topic.exercises.length} תרגילים</span>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Topic Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {/* Why Important */}
                    <div className={`p-4 ${getLikelihoodBg(topic.likelihood)} border-b`}>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                        <p className="text-sm font-medium">{topic.whyImportant}</p>
                      </div>
                    </div>

                    {/* Key Items - Only show if not in exercises-only mode */}
                    {viewMode !== 'exercises' && (
                      <div className="p-4 space-y-3 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          מה צריך לדעת
                        </h3>
                        <div className="space-y-2">
                          {topic.keyItems.map((item, i) => (
                            <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
                              <div className="flex items-start gap-2 p-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${getLabelColor(item.label)}`}>
                                  {item.label}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap leading-relaxed">{item.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Exercises */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        תרגילים למבחן ({topic.exercises.length})
                      </h3>
                      <div className="space-y-3">
                        {topic.exercises.map((ex) => {
                          const diffInfo = getDifficultyInfo(ex.difficulty);
                          const isExExpanded = !!expandedExercises[ex.id];
                          const solutionVisible = !!showSolutions[ex.id];

                          return (
                            <div key={ex.id} className="rounded-lg border border-gray-200 overflow-hidden">
                              {/* Exercise Header */}
                              <button
                                onClick={() => toggleExercise(ex.id)}
                                className="w-full p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors text-right"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-gray-900 text-sm">{ex.title}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${diffInfo.color}`}>
                                      {diffInfo.label}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                                      {getTypeLabel(ex.type)}
                                    </span>
                                    {ex.source && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600">
                                        {ex.source}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {isExExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                                )}
                              </button>

                              {/* Exercise Content */}
                              {isExExpanded && (
                                <div className="border-t border-gray-100 p-3 space-y-3">
                                  {/* Question */}
                                  <div className="bg-blue-50 rounded-lg p-3 border-r-4 border-blue-400">
                                    <p className="text-sm font-medium text-blue-900 mb-1">שאלה:</p>
                                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{ex.question}</p>
                                  </div>

                                  {/* Hint */}
                                  {ex.hint && (
                                    <div className="bg-amber-50 rounded-lg p-3 border-r-4 border-amber-400">
                                      <p className="text-sm text-amber-800">
                                        <Lightbulb className="w-3.5 h-3.5 inline ml-1" />
                                        <strong>רמז:</strong> {ex.hint}
                                      </p>
                                    </div>
                                  )}

                                  {/* Solution Toggle */}
                                  <button
                                    onClick={() => toggleSolution(ex.id)}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                      solutionVisible
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                                  >
                                    {solutionVisible ? (
                                      <>
                                        <EyeOff className="w-4 h-4" />
                                        הסתר פתרון
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="w-4 h-4" />
                                        הצג פתרון
                                      </>
                                    )}
                                  </button>

                                  {/* Solution */}
                                  {solutionVisible && (
                                    <div className="bg-green-50 rounded-lg p-3 border-r-4 border-green-500">
                                      <p className="text-sm font-medium text-green-900 mb-1 flex items-center gap-1">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        פתרון:
                                      </p>
                                      <p className="text-sm text-green-800 whitespace-pre-wrap leading-relaxed">{ex.solution}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Exam Tips */}
                    <div className="p-4 bg-amber-50 border-t border-amber-200">
                      <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4" />
                        טיפים למבחן
                      </h4>
                      <ul className="space-y-1">
                        {topic.examTips.map((tip, i) => (
                          <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                            <Star className="w-3 h-3 text-amber-500 mt-1 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Box */}
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
          <h3 className="font-bold text-indigo-900 mb-3">סדר תרגול מומלץ למועד ב׳</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="font-bold text-sm text-gray-900">קריטי — 4 שעות</span>
              </div>
              <p className="text-sm text-gray-600">טורים ומבחני התכנסות (95%)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="font-bold text-sm text-gray-900">גבוה — 2.5 שעות</span>
              </div>
              <p className="text-sm text-gray-600">טיילור ופיתוחי מקלורן (80%)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="font-bold text-sm text-gray-900">גבוה — 2 שעות</span>
              </div>
              <p className="text-sm text-gray-600">סדרות + רב"ש (65-70%)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <span className="font-bold text-sm text-gray-900">בינוני — 1.5 שעות</span>
              </div>
              <p className="text-sm text-gray-600">נגזרות + גבולות + MVT + רציפות (35-50%)</p>
            </div>
          </div>
        </div>

        {/* Golden Rules */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
          <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            12 כללי זהב למבחן
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              'תשובה ללא הנמקה = 0 נקודות',
              'ציינו שם משפט/כלל בכל שלב',
              'בדקו תנאים לפני שימוש במשפט',
              'נתקעתם יותר מ-10 דק? עברו הלאה',
              'התחילו מהשאלות הקלות',
              'הגדרות = נקודות קלות — שננו!',
              'בלופיטל: ודאו 0/0 או ∞/∞',
              'בטור: aₙ→0 לא מספיק להתכנסות',
              'ברב"ש: δ לא תלוי בנקודה — רק ב-ε',
              'בטיילור: אל תשכחו שארית',
              'סדרה רקורסיבית: מונוטוניות + חסימות',
              '5 שאלות, עונים על 4 — תכננו מראש',
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-yellow-800">
                <span className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center text-xs font-bold text-yellow-800 shrink-0">
                  {i + 1}
                </span>
                {rule}
              </div>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
            חזרה למעלה
          </button>
        </div>
      </div>
    </Layout>
  );
}
