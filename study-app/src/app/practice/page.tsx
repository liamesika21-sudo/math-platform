'use client';

import { useState, useMemo, useCallback } from 'react';
import Layout from '@/components/Layout';
import { getAllWeeks } from '@/data/infi-weeks';
import { Dumbbell, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Scale, Wrench } from 'lucide-react';

interface FlashcardItem {
  id: string;
  title: string;
  content: string;
  type: 'definition' | 'theorem' | 'technique';
  weekNumber: number;
  weekTitle: string;
}

function buildFlashcardItems(): FlashcardItem[] {
  const weeks = getAllWeeks();
  const items: FlashcardItem[] = [];

  for (const week of weeks) {
    for (let i = 0; i < week.keyDefinitions.length; i++) {
      items.push({
        id: `def-${week.weekNumber}-${i}`,
        title: `הגדרה — ${week.titleHe}`,
        content: week.keyDefinitions[i],
        type: 'definition',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
      });
    }
    for (let i = 0; i < week.keyTheorems.length; i++) {
      items.push({
        id: `thm-${week.weekNumber}-${i}`,
        title: `משפט — ${week.titleHe}`,
        content: week.keyTheorems[i],
        type: 'theorem',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
      });
    }
    for (let i = 0; i < week.keyTechniques.length; i++) {
      items.push({
        id: `tech-${week.weekNumber}-${i}`,
        title: `טכניקה — ${week.titleHe}`,
        content: week.keyTechniques[i],
        type: 'technique',
        weekNumber: week.weekNumber,
        weekTitle: week.titleHe,
      });
    }
  }

  return items;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type PracticeMode = 'flashcard' | 'type-quiz' | null;
type PracticeFilter = 'all' | 'definition' | 'theorem' | 'technique';

export default function PracticePage() {
  const allItems = useMemo(() => buildFlashcardItems(), []);

  const [mode, setMode] = useState<PracticeMode>(null);
  const [filter, setFilter] = useState<PracticeFilter>('all');
  const [sessionItems, setSessionItems] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  const startSession = useCallback((selectedMode: PracticeMode) => {
    let items = filter === 'all' ? allItems : allItems.filter(i => i.type === filter);
    items = shuffleArray(items).slice(0, 20);
    setSessionItems(items);
    setMode(selectedMode);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrect(0);
    setIncorrect(0);
    setSessionComplete(false);
  }, [allItems, filter]);

  function handleAnswer(wasCorrect: boolean) {
    if (wasCorrect) {
      setCorrect(c => c + 1);
    } else {
      setIncorrect(c => c + 1);
    }

    if (currentIndex < sessionItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  }

  function resetSession() {
    setMode(null);
    setCurrentIndex(0);
    setShowAnswer(false);
    setCorrect(0);
    setIncorrect(0);
    setSessionComplete(false);
  }

  const typeIcon = {
    definition: BookOpen,
    theorem: Scale,
    technique: Wrench,
  };

  const typeLabel = {
    definition: 'הגדרה',
    theorem: 'משפט',
    technique: 'טכניקה',
  };

  const typeColor = {
    definition: 'bg-blue-100 text-blue-800',
    theorem: 'bg-purple-100 text-purple-800',
    technique: 'bg-green-100 text-green-800',
  };

  // Session complete screen
  if (sessionComplete) {
    const total = correct + incorrect;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <Layout>
        <div className="p-6 pb-20 lg:pb-6 flex items-center justify-center min-h-[70vh]">
          <div className="text-center max-w-md">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 80 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <span className={`text-3xl font-bold ${
                percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {percentage}%
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">סיימת את התרגול!</h2>
            <p className="text-gray-600 mb-6">
              {correct} נכונות מתוך {total} • {incorrect} שגויות
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => startSession(mode)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                תרגול נוסף
              </button>
              <button
                onClick={resetSession}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                חזרה לתפריט
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Mode selection screen
  if (!mode) {
    const counts = {
      all: allItems.length,
      definition: allItems.filter(i => i.type === 'definition').length,
      theorem: allItems.filter(i => i.type === 'theorem').length,
      technique: allItems.filter(i => i.type === 'technique').length,
    };

    return (
      <Layout>
        <div className="p-6 pb-20 lg:pb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">מצב תרגול</h1>
            <p className="text-gray-600">
              בחר סוג תרגול ותתחיל לתרגל את החומר
            </p>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">סנן לפי סוג:</p>
            <div className="flex flex-wrap gap-2">
              {([['all', 'הכל'], ['definition', 'הגדרות'], ['theorem', 'משפטים'], ['technique', 'טכניקות']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filter === key
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label} ({counts[key]})
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Flashcard Mode */}
            <button
              onClick={() => startSession('flashcard')}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all text-right"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">כרטיסיות</h3>
              <p className="text-gray-600 mb-4">
                תרגל הגדרות ומשפטים עם כרטיסיות. תראה את הנושא ותצטרך לזכור את התוכן המדויק.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <span>התחל תרגול</span>
                <ArrowRight size={20} />
              </div>
            </button>

            {/* Type Quiz Mode */}
            <button
              onClick={() => startSession('type-quiz')}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all text-right"
            >
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">זיהוי סוג</h3>
              <p className="text-gray-600 mb-4">
                תקבל תוכן ותצטרך לזהות אם זו הגדרה, משפט או טכניקה. תרגול על הבנת המבנה.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <span>התחל תרגול</span>
                <ArrowRight size={20} />
              </div>
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-3">פריטים זמינים לתרגול</h3>
            <p className="text-gray-700">
              {counts[filter]} פריטי ידע מ-12 שבועות הקורס, ערבוב אקראי של 20 פריטים בכל סבב
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Practice session
  const currentItem = sessionItems[currentIndex];
  if (!currentItem) return null;

  const Icon = typeIcon[currentItem.type];
  const total = sessionItems.length;

  return (
    <Layout>
      <div className="p-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === 'flashcard' ? 'כרטיסיות' : 'זיהוי סוג'}
            </h1>
            <p className="text-gray-600">
              פריט {currentIndex + 1} מתוך {total}
            </p>
          </div>
          <button
            onClick={resetSession}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <RotateCcw size={16} />
            <span>חזור לתפריט</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Score */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{correct}</div>
            <div className="text-sm text-green-700">נכונות</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{incorrect}</div>
            <div className="text-sm text-red-700">שגויות</div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-8 mb-6 min-h-[300px] flex flex-col justify-center">
          {mode === 'flashcard' && (
            <div>
              {/* Badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${typeColor[currentItem.type]}`}>
                  <Icon size={12} className="inline ml-1" />
                  {typeLabel[currentItem.type]}
                </span>
                <span className="mr-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                  שבוע {currentItem.weekNumber}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">{currentItem.title}</h2>

              {!showAnswer ? (
                <p className="text-gray-500">
                  נסה לזכור את התוכן המדויק לפני שתלחץ על &quot;הצג תשובה&quot;
                </p>
              ) : (
                <div className="bg-blue-50 rounded-lg p-6 border-r-4 border-blue-500">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{currentItem.content}</p>
                </div>
              )}
            </div>
          )}

          {mode === 'type-quiz' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">מה הסוג של הפריט הבא?</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4 border border-gray-200">
                <p className="text-gray-800 leading-relaxed">{currentItem.content}</p>
                <p className="text-xs text-gray-500 mt-2">שבוע {currentItem.weekNumber} — {currentItem.weekTitle}</p>
              </div>

              {!showAnswer ? (
                <p className="text-gray-500 text-sm">
                  חשוב האם זו הגדרה, משפט או טכניקה ואז לחץ &quot;הצג תשובה&quot;
                </p>
              ) : (
                <div className={`rounded-lg p-4 ${typeColor[currentItem.type]} border`}>
                  <p className="font-medium">
                    <Icon size={16} className="inline ml-1" />
                    {typeLabel[currentItem.type]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-medium transition-colors"
            >
              הצג תשובה
            </button>
          ) : (
            <>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={20} />
                <span>לא זכרתי</span>
              </button>
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                <span>זכרתי נכון!</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
