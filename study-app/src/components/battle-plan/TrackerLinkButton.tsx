'use client';

import Link from 'next/link';
import { ArrowUpLeft, BookOpenCheck, ClipboardList, FileQuestion, Lightbulb } from 'lucide-react';

type ResourceType = 'definitions' | 'homework' | 'drill' | 'tips';

interface TrackerLinkButtonProps {
  href: string;
  label: string;
  completionPct?: number;
  meta?: string;
  resource: ResourceType;
}

function getResourceIcon(resource: ResourceType) {
  switch (resource) {
    case 'definitions':
      return <BookOpenCheck className="h-4 w-4" />;
    case 'homework':
      return <ClipboardList className="h-4 w-4" />;
    case 'drill':
      return <FileQuestion className="h-4 w-4" />;
    case 'tips':
    default:
      return <Lightbulb className="h-4 w-4" />;
  }
}

export default function TrackerLinkButton({
  href,
  label,
  completionPct,
  meta,
  resource,
}: TrackerLinkButtonProps) {
  return (
    <Link
      href={href}
      className="group inline-flex min-w-[180px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          {getResourceIcon(resource)}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800">{label}</div>
          {(meta || completionPct !== undefined) && (
            <div className="text-xs text-slate-500">
              {completionPct !== undefined ? `${completionPct}% complete` : null}
              {completionPct !== undefined && meta ? ' · ' : null}
              {meta}
            </div>
          )}
        </div>
      </div>
      <ArrowUpLeft className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
