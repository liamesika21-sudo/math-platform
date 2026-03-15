'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { dbHelpers } from '@/lib/db';
import type { StudyPlan, DailyPlan, StudyTask, Topic } from '@/types';
import { Calendar, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function RoadmapPage() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state
  const [examDate, setExamDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [weakTopics, setWeakTopics] = useState<Topic[]>([]);

  useEffect(() => {
    loadStudyPlan();
  }, []);

  async function loadStudyPlan() {
    try {
      const activePlan = await dbHelpers.getActiveStudyPlan();
      setPlan(activePlan || null);

      if (!activePlan) {
        setShowCreateForm(true);
      }
    } catch (error) {
      console.error('Error loading study plan:', error);
    } finally {
      setLoading(false);
    }
  }

  async function generateStudyPlan() {
    if (!examDate) {
      alert('בחר תאריך מבחן');
      return;
    }

    try {
      const examDateObj = new Date(examDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const daysUntilExam = Math.ceil((examDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntilExam < 1) {
        alert('תאריך המבחן חייב להיות בעתיד');
        return;
      }

      // Get knowledge items
      const items = await dbHelpers.getTopLikelihoodItems(50);
      const allItems = await dbHelpers.getAllKnowledgeItems();
      const hwQuestions = await dbHelpers.getAllHomeworkQuestions();

      // Generate daily plans
      const dailyPlans: DailyPlan[] = [];

      let itemsPerDay = Math.ceil(items.length / daysUntilExam);
      let currentItemIndex = 0;

      for (let day = 0; day < daysUntilExam; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() + day);

        const tasks: StudyTask[] = [];

        // First week: Focus on high-priority theorems
        if (day < 7 && items.length > currentItemIndex) {
          const todayItems = items.slice(currentItemIndex, Math.min(currentItemIndex + itemsPerDay, items.length));

          todayItems.forEach(item => {
            if (item.type === 'theorem' || item.type === 'definition') {
              tasks.push({
                id: uuidv4(),
                type: 'memorize-theorem',
                description: `לשנן: ${item.title}`,
                targetItems: [item.id],
                estimatedMinutes: 15,
                isCompleted: false,
                priority: item.likelihoodScore > 70 ? 'high' : 'medium',
              });
            }
            if (item.type === 'proof' && item.likelihoodScore > 60) {
              tasks.push({
                id: uuidv4(),
                type: 'memorize-proof',
                description: `לשנן הוכחה: ${item.title}`,
                targetItems: [item.id],
                estimatedMinutes: 20,
                isCompleted: false,
                priority: 'high',
              });
            }
          });

          currentItemIndex += itemsPerDay;
        }

        // Add homework practice
        if (hwQuestions.length > 0 && day % 2 === 0) {
          const topHW = hwQuestions
            .sort((a, b) => b.examLikelihoodScore - a.examLikelihoodScore)
            .slice(0, 5);

          tasks.push({
            id: uuidv4(),
            type: 'practice-set',
            description: `פתור ${Math.min(3, topHW.length)} שאלות תרגיל בסבירות גבוהה`,
            targetItems: topHW.slice(0, 3).map(q => q.id),
            estimatedMinutes: 45,
            isCompleted: false,
            priority: 'high',
          });
        }

        // Last few days: Exam simulation
        if (day >= daysUntilExam - 3) {
          tasks.push({
            id: uuidv4(),
            type: 'exam-simulation',
            description: 'סימולציית מבחן מלאה',
            targetItems: [],
            estimatedMinutes: 90,
            isCompleted: false,
            priority: 'high',
          });
        }

        // Review sessions
        if (day % 3 === 2) {
          tasks.push({
            id: uuidv4(),
            type: 'review-lecture',
            description: 'חזור על משפטים והגדרות מההרצאות',
            targetItems: [],
            estimatedMinutes: 30,
            isCompleted: false,
            priority: 'medium',
          });
        }

        dailyPlans.push({
          date,
          tasks,
          isCompleted: false,
        });
      }

      const newPlan: StudyPlan = {
        id: uuidv4(),
        examDate: examDateObj,
        hoursPerDay,
        weakTopics,
        createdAt: new Date(),
        dailyPlans,
      };

      await dbHelpers.saveStudyPlan(newPlan);
      setPlan(newPlan);
      setShowCreateForm(false);
      alert('תכנית הלימוד נוצרה בהצלחה!');
    } catch (error) {
      console.error('Error generating study plan:', error);
      alert('שגיאה ביצירת תכנית לימוד');
    }
  }

  async function toggleTaskCompletion(planId: string, dayIndex: number, taskId: string) {
    if (!plan) return;

    const updatedPlan = { ...plan };
    const task = updatedPlan.dailyPlans[dayIndex].tasks.find(t => t.id === taskId);

    if (task) {
      task.isCompleted = !task.isCompleted;

      // Check if all tasks in the day are completed
      updatedPlan.dailyPlans[dayIndex].isCompleted = updatedPlan.dailyPlans[dayIndex].tasks.every(t => t.isCompleted);

      await dbHelpers.saveStudyPlan(updatedPlan);
      setPlan(updatedPlan);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">טוען...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (showCreateForm || !plan) {
    return (
      <Layout>
        <div className="p-6 pb-20 lg:pb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              צור תכנית לימוד
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              הגדר את פרמטרי הלימוד והמערכת תיצור עבורך תכנית מותאמת אישית
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
            <div className="space-y-6">
              {/* Exam Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תאריך המבחן
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              {/* Hours Per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שעות לימוד ביום: {hoursPerDay}
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 שעה</span>
                  <span>8 שעות</span>
                </div>
              </div>

              {/* Weak Topics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  נושאים שאתה חלש בהם (אופציונלי)
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['limits', 'continuity', 'derivatives', 'integrals', 'series'] as Topic[]).map(topic => (
                    <button
                      key={topic}
                      onClick={() => {
                        if (weakTopics.includes(topic)) {
                          setWeakTopics(weakTopics.filter(t => t !== topic));
                        } else {
                          setWeakTopics([...weakTopics, topic]);
                        }
                      }}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        weakTopics.includes(topic)
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateStudyPlan}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                צור תכנית לימוד
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIndex = plan.dailyPlans.findIndex(dp => {
    const planDate = new Date(dp.date);
    planDate.setHours(0, 0, 0, 0);
    return planDate.getTime() === today.getTime();
  });

  return (
    <Layout>
      <div className="p-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">תכנית הלימוד שלך</h1>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus size={16} />
              <span>תכנית חדשה</span>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            מבחן ב-{new Date(plan.examDate).toLocaleDateString('he-IL')} • {plan.hoursPerDay} שעות ביום
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">התקדמות כללית</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plan.dailyPlans.filter(dp => dp.isCompleted).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ימים הושלמו</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.dailyPlans.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">סה"כ ימים</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round((plan.dailyPlans.filter(dp => dp.isCompleted).length / plan.dailyPlans.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">אחוז השלמה</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {plan.dailyPlans.length - todayIndex}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ימים נותרו</div>
            </div>
          </div>
        </div>

        {/* Daily Plans */}
        <div className="space-y-4">
          {plan.dailyPlans.map((dailyPlan, dayIndex) => {
            const planDate = new Date(dailyPlan.date);
            const isToday = todayIndex === dayIndex;
            const isPast = planDate < today;
            const completedTasks = dailyPlan.tasks.filter(t => t.isCompleted).length;

            return (
              <div
                key={dayIndex}
                className={`bg-white dark:bg-gray-800 rounded-lg border-2 ${
                  isToday
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700'
                } p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className={isToday ? 'text-blue-600' : 'text-gray-400'} size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {planDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
                        {isToday && <span className="text-blue-600 mr-2">(היום)</span>}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {completedTasks} מתוך {dailyPlan.tasks.length} משימות הושלמו
                      </p>
                    </div>
                  </div>
                  {dailyPlan.isCompleted && (
                    <CheckCircle2 className="text-green-600" size={24} />
                  )}
                </div>

                <div className="space-y-2">
                  {dailyPlan.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        task.isCompleted
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-gray-50 dark:bg-gray-900'
                      }`}
                    >
                      <button
                        onClick={() => toggleTaskCompletion(plan.id, dayIndex, task.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="text-green-600" size={20} />
                        ) : (
                          <Circle className="text-gray-400" size={20} />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          task.isCompleted
                            ? 'line-through text-gray-500'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            task.priority === 'high'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                              : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {task.priority === 'high' ? 'גבוה' : task.priority === 'medium' ? 'בינוני' : 'נמוך'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {task.estimatedMinutes} דקות
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
