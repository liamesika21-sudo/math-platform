'use client';

import { BookMarked, BrainCircuit, Sigma, ScrollText, X, Calendar, FileText, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { TheoryItem } from '@/lib/math-platform/types';
import { getWeekById } from '@/lib/math-platform/data';
import { cn } from '@/lib/math-platform/utils';
import { BiDiContent } from '@/components/platform/BiDiContent';

interface TheoryItemCardProps {
  item: TheoryItem;
}

const styleMap = {
  definition: {
    icon: BookMarked,
    badge: 'bg-sky-100 text-sky-700',
    border: 'border-sky-200',
    modalHeader: 'bg-sky-50 border-sky-200',
    iconBg: 'bg-sky-100 text-sky-700',
    label: 'הגדרה',
    importance: 'הגדרות הן הבסיס לכל משפט והוכחה. ידיעת הגדרה מדויקת — כולל תנאי הכרחי ומספיק — היא דרישה מינימלית בכל מבחן.',
  },
  theorem: {
    icon: ScrollText,
    badge: 'bg-rose-100 text-rose-700',
    border: 'border-rose-200',
    modalHeader: 'bg-rose-50 border-rose-200',
    iconBg: 'bg-rose-100 text-rose-700',
    label: 'משפט',
    importance: 'משפטים הם כלי העבודה המרכזיים בפתרון שאלות. הבנת התנאים של המשפט וגבולות השימוש בו — חיונית לציון גבוה.',
  },
  formula: {
    icon: Sigma,
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    modalHeader: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-100 text-amber-700',
    label: 'נוסחה',
    importance: 'נוסחאות חייבות לעמוד על קצה הלשון. בתנאי מבחן — אין זמן לגזור; יש לדעת את הנוסחה ישירות ולדעת מתי להפעיל אותה.',
  },
  concept: {
    icon: BrainCircuit,
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    modalHeader: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-700',
    label: 'מושג',
    importance: 'הבנה אינטואיטיבית של מושגים מרכזיים מאפשרת לפתור שאלות גם כשאין זיכרון מדויק של נוסחה — ולנווט בין גישות פתרון שונות.',
  },
};

function TheoryModal({ item, onClose }: { item: TheoryItem; onClose: () => void }) {
  const style = styleMap[item.kind];
  const Icon = style.icon;

  const weekNumber = parseInt(item.weekId.replace(`${item.courseId}-week-`, ''), 10);
  const week = getWeekById(item.courseId, item.weekId);
  const weekLabel = week ? week.title.replace(/^שבוע \d+ · /, '') : '';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className={cn('rounded-t-[1.75rem] border-b px-6 pt-6 pb-5', style.modalHeader)}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={cn('rounded-2xl p-3', style.iconBg)}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', style.badge)}>
                {style.label}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/80 hover:text-slate-700"
              aria-label="סגור"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h2>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">תוכן</p>
            <BiDiContent text={item.content} className="text-slate-700" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-500">נלמד בשבוע</p>
                <p className="mt-0.5 text-sm font-medium text-slate-800">שבוע {weekNumber}</p>
                {weekLabel && <p className="text-xs text-slate-500">{weekLabel}</p>}
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <div>
                <p className="text-xs font-semibold text-slate-500">מקור</p>
                <p className="mt-0.5 text-xs text-slate-600 wrap-break-word">{item.sourceName}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-semibold text-amber-700">למה זה חשוב?</p>
              <p className="mt-1 text-xs leading-6 text-amber-800">{style.importance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TheoryItemCard({ item }: TheoryItemCardProps) {
  const [open, setOpen] = useState(false);
  const style = styleMap[item.kind];
  const Icon = style.icon;

  return (
    <>
      <article
        className={cn(
          'cursor-pointer rounded-3xl border bg-white p-5 shadow-sm shadow-slate-200/60',
          'transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200/80',
          style.border,
        )}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        aria-label={`פתח פרטים: ${item.title}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', style.badge)}>
              {style.label}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h3>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <BiDiContent text={item.content} lineClamp={3} className="mt-4 text-slate-600" />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
              {item.sourceName}
            </div>
            {item.sourcePage !== undefined && (
              <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-400">
                עמ׳ {item.sourcePage}
              </div>
            )}
          </div>
          <span className="text-xs text-slate-400">לחץ לפרטים ←</span>
        </div>
      </article>

      {open && <TheoryModal item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
