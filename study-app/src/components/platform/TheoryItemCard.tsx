import { BookMarked, BrainCircuit, Sigma, ScrollText } from 'lucide-react';
import type { TheoryItem } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';

interface TheoryItemCardProps {
  item: TheoryItem;
}

const styleMap = {
  definition: {
    icon: BookMarked,
    badge: 'bg-sky-100 text-sky-700',
    border: 'border-sky-200',
    label: 'הגדרה',
  },
  theorem: {
    icon: ScrollText,
    badge: 'bg-rose-100 text-rose-700',
    border: 'border-rose-200',
    label: 'משפט',
  },
  formula: {
    icon: Sigma,
    badge: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    label: 'נוסחה',
  },
  concept: {
    icon: BrainCircuit,
    badge: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    label: 'מושג',
  },
};

export default function TheoryItemCard({ item }: TheoryItemCardProps) {
  const style = styleMap[item.kind];
  const Icon = style.icon;

  return (
    <article className={cn('rounded-[1.5rem] border bg-white p-5 shadow-sm shadow-slate-200/60', style.border)}>
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
      <p className="mt-4 text-sm leading-7 text-slate-600">{item.content}</p>
      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
        מקור: {item.sourceName}
      </div>
    </article>
  );
}
