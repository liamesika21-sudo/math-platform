'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { getAllWeeks } from '@/data/infi-weeks';
import {
  Layers,
  BookOpen,
  Target,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from 'lucide-react';

export default function WeeksPage() {
  const weeks = getAllWeeks();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const totalDefs = weeks.reduce((sum, w) => sum + w.keyDefinitions.length, 0);
  const totalThms = weeks.reduce((sum, w) => sum + w.keyTheorems.length, 0);
  const totalTech = weeks.reduce((sum, w) => sum + w.keyTechniques.length, 0);

  return (
    <Layout>
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            לימוד שבועי
          </h1>
          <p className="text-gray-500">סיכום חומר הלימוד לפי שבועות — {weeks.length} שבועות</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{weeks.length}</p>
                <p className="text-xs text-gray-500">שבועות</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalDefs}</p>
                <p className="text-xs text-gray-500">הגדרות</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalThms}</p>
                <p className="text-xs text-gray-500">משפטים</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalTech}</p>
                <p className="text-xs text-gray-500">טכניקות</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weeks */}
        <div className="space-y-4">
          {weeks.map((week) => {
            const isExpanded = expandedWeek === week.weekNumber;
            return (
              <div key={week.weekNumber} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                  className="w-full p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors text-right"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {week.weekNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{week.titleHe}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{week.summary}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {week.topicsHe.map((t, i) => (
                        <span key={i} className="topic-badge">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>הרצאות: {week.lectures.join(', ')}</span>
                      <span>תרגול: {week.recitations.join(', ')}</span>
                      <span>ש.ב: {week.homeworks.join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="hidden md:flex gap-2 text-xs">
                      <span className="badge-definition px-2 py-1 rounded-full">{week.keyDefinitions.length} הגדרות</span>
                      <span className="badge-theorem px-2 py-1 rounded-full">{week.keyTheorems.length} משפטים</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-4">
                    {week.keyDefinitions.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          הגדרות מרכזיות
                        </h4>
                        <div className="space-y-2">
                          {week.keyDefinitions.map((def, i) => (
                            <div key={i} className="verbatim-text text-sm">{def}</div>
                          ))}
                        </div>
                      </div>
                    )}

                    {week.keyTheorems.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-pink-800 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          משפטים מרכזיים
                        </h4>
                        <div className="space-y-2">
                          {week.keyTheorems.map((thm, i) => (
                            <div key={i} className="bg-pink-50 p-3 rounded-md text-sm" style={{ borderRight: '3px solid #ec4899' }}>
                              {thm}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {week.keyTechniques.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          טכניקות
                        </h4>
                        <div className="space-y-2">
                          {week.keyTechniques.map((tech, i) => (
                            <div key={i} className="bg-amber-50 p-3 rounded-md text-sm" style={{ borderRight: '3px solid #f59e0b' }}>
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {week.examTips && week.examTips.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          טיפ למבחן
                        </h4>
                        {week.examTips.map((tip, i) => (
                          <p key={i} className="text-sm text-red-700">{tip}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
