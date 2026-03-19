'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import type { CourseId } from '@/lib/math-platform/types';
import {
  Star, Eye, EyeOff, Save, ChevronDown, ChevronUp,
  CheckCircle, Loader2, MessageSquarePlus, Trash2,
  BookOpen, ClipboardList, FileText, GraduationCap, RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/math-platform/utils';

/* ─── types ─────────────────────────────────────────────────────────── */

interface EditableTheoryItem {
  _id: string;
  kind: string;
  title: string;
  content: string;
  sourcePage?: number;
  hidden?: boolean;
  important?: boolean;
  lecturerNote?: string;
}

interface EditableQuestion {
  _id: string;
  number: number;
  content: string;
  difficulty?: string;
  sourcePage?: number;
  hint?: string;
  hidden?: boolean;
  important?: boolean;
  lecturerNote?: string;
}

interface WeekContent {
  theoryItems: EditableTheoryItem[];
  tutorialQuestions: EditableQuestion[];
  homeworkQuestions: EditableQuestion[];
  examQuestions: EditableQuestion[];
  updatedAt?: string;
  updatedBy?: string;
}

interface WeekState {
  data: WeekContent;
  dirty: boolean;
  saving: boolean;
  saved: boolean;
  error?: string;
}

/* ─── helpers ────────────────────────────────────────────────────────── */

function addIds<T extends object>(arr: T[] | undefined, prefix: string): (T & { _id: string })[] {
  return (arr ?? []).map((item, i) => ({
    _id: (item as { _id?: string })._id ?? `${prefix}-${i}`,
    ...item,
  }));
}

function stripIds<T extends { _id?: string }>(arr: T[]): Omit<T, '_id'>[] {
  return arr.map(({ _id: _, ...rest }) => rest as Omit<T, '_id'>);
}

const KIND_LABELS: Record<string, string> = {
  definition: 'הגדרה',
  theorem: 'משפט',
  formula: 'נוסחה',
  concept: 'מושג',
};

const KIND_COLORS: Record<string, string> = {
  definition: 'bg-blue-100 text-blue-700',
  theorem: 'bg-purple-100 text-purple-700',
  formula: 'bg-orange-100 text-orange-700',
  concept: 'bg-teal-100 text-teal-700',
};

const DIFF_COLORS: Record<string, string> = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700',
};

/* ─── sub-components ─────────────────────────────────────────────────── */

function TheoryItemCard({
  item,
  onChange,
}: {
  item: EditableTheoryItem;
  onChange: (updated: Partial<EditableTheoryItem>) => void;
}) {
  const [showNote, setShowNote] = useState(!!item.lecturerNote);

  return (
    <div className={cn(
      'rounded-xl border bg-white p-4 transition-opacity',
      item.hidden && 'opacity-40'
    )}>
      {/* header row */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', KIND_COLORS[item.kind] ?? 'bg-gray-100 text-gray-600')}>
          {KIND_LABELS[item.kind] ?? item.kind}
        </span>

        {item.important && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            ⭐ חשוב לדעת
          </span>
        )}
        {item.hidden && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
            מוסתר
          </span>
        )}

        <div className="mr-auto flex items-center gap-1">
          <button
            onClick={() => onChange({ important: !item.important })}
            title={item.important ? 'הסר סימון חשוב' : 'סמן כחשוב לדעת'}
            className={cn(
              'rounded-lg p-1.5 transition',
              item.important ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:bg-slate-100 hover:text-amber-400'
            )}
          >
            <Star className="h-4 w-4" fill={item.important ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onChange({ hidden: !item.hidden })}
            title={item.hidden ? 'הצג' : 'הסתר מסטודנטים'}
            className="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-slate-600"
          >
            {item.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setShowNote(v => !v)}
            title="הוסף הערת מרצה"
            className={cn(
              'rounded-lg p-1.5 transition',
              showNote ? 'text-indigo-500 hover:bg-indigo-50' : 'text-slate-300 hover:bg-slate-100 hover:text-indigo-400'
            )}
          >
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* title */}
      <input
        value={item.title}
        onChange={e => onChange({ title: e.target.value })}
        className="mb-2 w-full rounded-lg border border-transparent bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800 transition focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        placeholder="כותרת..."
        dir="rtl"
      />

      {/* content */}
      <textarea
        value={item.content}
        onChange={e => onChange({ content: e.target.value })}
        rows={3}
        className="w-full resize-y rounded-lg border border-transparent bg-slate-50 px-3 py-2 text-sm text-slate-700 transition focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        placeholder="תוכן..."
        dir="rtl"
      />

      {/* lecturer note */}
      {showNote && (
        <textarea
          value={item.lecturerNote ?? ''}
          onChange={e => onChange({ lecturerNote: e.target.value })}
          rows={2}
          className="mt-2 w-full resize-y rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-indigo-800 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="הערת מרצה (לא מוצגת לסטודנטים)..."
          dir="rtl"
        />
      )}
    </div>
  );
}

function QuestionCard({
  item,
  onChange,
}: {
  item: EditableQuestion;
  onChange: (updated: Partial<EditableQuestion>) => void;
}) {
  const [showNote, setShowNote] = useState(!!item.lecturerNote);
  const [showHint, setShowHint] = useState(!!item.hint);

  return (
    <div className={cn(
      'rounded-xl border bg-white p-4 transition-opacity',
      item.hidden && 'opacity-40'
    )}>
      {/* header */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          שאלה {item.number}
        </span>
        {item.difficulty && (
          <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', DIFF_COLORS[item.difficulty] ?? 'bg-gray-100 text-gray-600')}>
            {item.difficulty === 'easy' ? 'קלה' : item.difficulty === 'medium' ? 'בינונית' : 'קשה'}
          </span>
        )}
        {item.important && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            ⭐ חשוב לדעת
          </span>
        )}
        {item.hidden && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-500">
            מוסתר
          </span>
        )}

        <div className="mr-auto flex items-center gap-1">
          {/* difficulty selector */}
          <select
            value={item.difficulty ?? ''}
            onChange={e => onChange({ difficulty: e.target.value || undefined })}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">קושי...</option>
            <option value="easy">קלה</option>
            <option value="medium">בינונית</option>
            <option value="hard">קשה</option>
          </select>

          <button
            onClick={() => onChange({ important: !item.important })}
            className={cn(
              'rounded-lg p-1.5 transition',
              item.important ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:bg-slate-100 hover:text-amber-400'
            )}
          >
            <Star className="h-4 w-4" fill={item.important ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => onChange({ hidden: !item.hidden })}
            className="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-slate-600"
          >
            {item.hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setShowHint(v => !v)}
            title="רמז"
            className={cn(
              'rounded-lg p-1.5 text-xs font-bold transition',
              showHint ? 'text-orange-500 hover:bg-orange-50' : 'text-slate-300 hover:bg-slate-100 hover:text-orange-400'
            )}
          >
            💡
          </button>
          <button
            onClick={() => setShowNote(v => !v)}
            className={cn(
              'rounded-lg p-1.5 transition',
              showNote ? 'text-indigo-500 hover:bg-indigo-50' : 'text-slate-300 hover:bg-slate-100 hover:text-indigo-400'
            )}
          >
            <MessageSquarePlus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* content */}
      <textarea
        value={item.content}
        onChange={e => onChange({ content: e.target.value })}
        rows={3}
        className="w-full resize-y rounded-lg border border-transparent bg-slate-50 px-3 py-2 text-sm text-slate-700 transition focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        placeholder="תוכן השאלה..."
        dir="rtl"
      />

      {showHint && (
        <textarea
          value={item.hint ?? ''}
          onChange={e => onChange({ hint: e.target.value })}
          rows={2}
          className="mt-2 w-full resize-y rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          placeholder="רמז לסטודנט..."
          dir="rtl"
        />
      )}

      {showNote && (
        <textarea
          value={item.lecturerNote ?? ''}
          onChange={e => onChange({ lecturerNote: e.target.value })}
          rows={2}
          className="mt-2 w-full resize-y rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm text-indigo-800 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="הערת מרצה (פנימית)..."
          dir="rtl"
        />
      )}
    </div>
  );
}

/* ─── section wrapper ─────────────────────────────────────────────────── */

function Section({
  title, icon, count, hiddenCount, children, defaultOpen,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  hiddenCount: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  if (count === 0) return null;
  return (
    <div className="rounded-2xl border bg-slate-50">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-right"
      >
        <span className="text-slate-500">{icon}</span>
        <span className="flex-1 text-sm font-semibold text-slate-700">{title}</span>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-500 shadow-sm">
          {count} פריטים
        </span>
        {hiddenCount > 0 && (
          <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-400">
            {hiddenCount} מוסתרים
          </span>
        )}
        {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {open && (
        <div className="space-y-3 px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── main page ──────────────────────────────────────────────────────── */

export default function ContentReviewPage() {
  const { courseId } = useParams<{ courseId: CourseId }>();
  const { user } = useAuth();

  const [weeks, setWeeks] = useState<Record<string, WeekState>>({});
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* load all weeks */
  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    getDocs(collection(db, 'courses', courseId, 'generatedContent'))
      .then(snap => {
        const result: Record<string, WeekState> = {};
        snap.forEach(d => {
          const raw = d.data() as Partial<WeekContent>;
          const data: WeekContent = {
            theoryItems: addIds(raw.theoryItems, 'theory'),
            tutorialQuestions: addIds(raw.tutorialQuestions, 'tut'),
            homeworkQuestions: addIds(raw.homeworkQuestions, 'hw'),
            examQuestions: addIds(raw.examQuestions, 'exam'),
            updatedAt: raw.updatedAt,
            updatedBy: raw.updatedBy,
          };
          result[d.id] = { data, dirty: false, saving: false, saved: false };
        });
        setWeeks(result);
        const sorted = Object.keys(result).sort();
        if (sorted.length) setSelectedWeek(sorted[0]);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  /* update a theory item */
  const updateTheoryItem = useCallback((weekId: string, itemId: string, patch: Partial<EditableTheoryItem>) => {
    setWeeks(prev => {
      const w = prev[weekId];
      if (!w) return prev;
      return {
        ...prev,
        [weekId]: {
          ...w,
          dirty: true,
          saved: false,
          data: {
            ...w.data,
            theoryItems: w.data.theoryItems.map(t => t._id === itemId ? { ...t, ...patch } : t),
          },
        },
      };
    });
  }, []);

  /* update a question */
  const updateQuestion = useCallback((weekId: string, section: keyof Pick<WeekContent, 'tutorialQuestions' | 'homeworkQuestions' | 'examQuestions'>, itemId: string, patch: Partial<EditableQuestion>) => {
    setWeeks(prev => {
      const w = prev[weekId];
      if (!w) return prev;
      return {
        ...prev,
        [weekId]: {
          ...w,
          dirty: true,
          saved: false,
          data: {
            ...w.data,
            [section]: (w.data[section] as EditableQuestion[]).map(q => q._id === itemId ? { ...q, ...patch } : q),
          },
        },
      };
    });
  }, []);

  /* save week to Firestore */
  const saveWeek = useCallback(async (weekId: string) => {
    const w = weeks[weekId];
    if (!w) return;
    setWeeks(prev => ({ ...prev, [weekId]: { ...prev[weekId], saving: true, error: undefined } }));
    try {
      const payload = {
        theoryItems: stripIds(w.data.theoryItems),
        tutorialQuestions: stripIds(w.data.tutorialQuestions),
        homeworkQuestions: stripIds(w.data.homeworkQuestions),
        examQuestions: stripIds(w.data.examQuestions),
        updatedAt: new Date().toISOString(),
        updatedBy: user?.email ?? 'unknown',
      };
      await setDoc(doc(db, 'courses', courseId, 'generatedContent', weekId), payload, { merge: true });
      setWeeks(prev => ({ ...prev, [weekId]: { ...prev[weekId], saving: false, dirty: false, saved: true } }));
      setTimeout(() => setWeeks(prev => ({ ...prev, [weekId]: { ...prev[weekId], saved: false } })), 3000);
    } catch (e) {
      setWeeks(prev => ({ ...prev, [weekId]: { ...prev[weekId], saving: false, error: 'שגיאה בשמירה' } }));
    }
  }, [weeks, courseId, user]);

  /* ── render ─────────────────────────────────────────────────────── */

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>טוען תוכן...</span>
      </div>
    );
  }

  const weekIds = Object.keys(weeks).sort();

  if (!weekIds.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
        <RefreshCw className="h-8 w-8" />
        <p className="text-sm">אין תוכן עדיין. יש להעלות ולנתח קבצים בתכנית לימודים קודם.</p>
      </div>
    );
  }

  const w = selectedWeek ? weeks[selectedWeek] : null;

  return (
    <div className="flex h-full flex-col" dir="rtl">
      {/* page header */}
      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-xl font-bold text-slate-800">עריכת תוכן שבועי</h1>
        <p className="mt-1 text-sm text-slate-500">
          ערוך, הסתר, סמן כחשוב, והוסף הערות לתוכן שנוצר ע&quot;י ה-AI.
          השינויים מתעדכנים מיד לסטודנטים לאחר שמירה.
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* week sidebar */}
        <aside className="w-48 flex-shrink-0 overflow-y-auto border-l bg-white py-4">
          {weekIds.map(wid => {
            const state = weeks[wid];
            const total = state.data.theoryItems.length + state.data.tutorialQuestions.length + state.data.homeworkQuestions.length + state.data.examQuestions.length;
            return (
              <button
                key={wid}
                onClick={() => setSelectedWeek(wid)}
                className={cn(
                  'relative flex w-full items-center gap-2 px-4 py-3 text-sm transition',
                  selectedWeek === wid
                    ? 'bg-indigo-50 font-semibold text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                <span className="flex-1 text-right">{wid}</span>
                {state.dirty && (
                  <span className="h-2 w-2 rounded-full bg-amber-400" title="שינויים לא שמורים" />
                )}
                {state.saved && (
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                )}
                <span className="text-xs text-slate-400">{total}</span>
              </button>
            );
          })}
        </aside>

        {/* main content */}
        {w && selectedWeek && (
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* save bar */}
            <div className={cn(
              'flex items-center gap-3 border-b px-6 py-3 transition-colors',
              w.dirty ? 'bg-amber-50' : 'bg-white'
            )}>
              <span className="flex-1 text-xs text-slate-500">
                {w.data.updatedAt
                  ? `עודכן לאחרונה: ${new Date(w.data.updatedAt).toLocaleString('he-IL')} על ידי ${w.data.updatedBy}`
                  : 'טרם נערך'}
              </span>
              {w.error && <span className="text-xs font-medium text-red-500">{w.error}</span>}
              {w.dirty && <span className="text-xs font-medium text-amber-600">יש שינויים שלא נשמרו</span>}
              {w.saved && <span className="flex items-center gap-1 text-xs font-medium text-green-600"><CheckCircle className="h-3.5 w-3.5" />נשמר</span>}
              <button
                onClick={() => saveWeek(selectedWeek)}
                disabled={!w.dirty || w.saving}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition',
                  w.dirty && !w.saving
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                {w.saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                שמור שינויים
              </button>
            </div>

            {/* sections */}
            <div className="flex-1 overflow-y-auto space-y-4 p-6">

              {/* theory items */}
              <Section
                title="תיאוריה – הגדרות, משפטים, נוסחאות, מושגים"
                icon={<BookOpen className="h-4 w-4" />}
                count={w.data.theoryItems.length}
                hiddenCount={w.data.theoryItems.filter(t => t.hidden).length}
                defaultOpen
              >
                {w.data.theoryItems.map(item => (
                  <TheoryItemCard
                    key={item._id}
                    item={item}
                    onChange={patch => updateTheoryItem(selectedWeek, item._id, patch)}
                  />
                ))}
              </Section>

              {/* tutorial questions */}
              <Section
                title="שאלות תרגול"
                icon={<ClipboardList className="h-4 w-4" />}
                count={w.data.tutorialQuestions.length}
                hiddenCount={w.data.tutorialQuestions.filter(q => q.hidden).length}
              >
                {w.data.tutorialQuestions.map(item => (
                  <QuestionCard
                    key={item._id}
                    item={item}
                    onChange={patch => updateQuestion(selectedWeek, 'tutorialQuestions', item._id, patch)}
                  />
                ))}
              </Section>

              {/* homework questions */}
              <Section
                title="שאלות שיעורי בית"
                icon={<FileText className="h-4 w-4" />}
                count={w.data.homeworkQuestions.length}
                hiddenCount={w.data.homeworkQuestions.filter(q => q.hidden).length}
              >
                {w.data.homeworkQuestions.map(item => (
                  <QuestionCard
                    key={item._id}
                    item={item}
                    onChange={patch => updateQuestion(selectedWeek, 'homeworkQuestions', item._id, patch)}
                  />
                ))}
              </Section>

              {/* exam questions */}
              <Section
                title="שאלות מבחן"
                icon={<GraduationCap className="h-4 w-4" />}
                count={w.data.examQuestions.length}
                hiddenCount={w.data.examQuestions.filter(q => q.hidden).length}
              >
                {w.data.examQuestions.map(item => (
                  <QuestionCard
                    key={item._id}
                    item={item}
                    onChange={patch => updateQuestion(selectedWeek, 'examQuestions', item._id, patch)}
                  />
                ))}
              </Section>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
