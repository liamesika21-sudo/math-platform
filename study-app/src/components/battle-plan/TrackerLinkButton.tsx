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
      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
    >
      <span className="text-slate-500">{getResourceIcon(resource)}</span>
      <span>{label}</span>
      {(meta || completionPct !== undefined) && (
        <span className="text-slate-400">
          {completionPct !== undefined ? `${completionPct}%` : null}
          {completionPct !== undefined && meta ? ' · ' : null}
          {meta}
        </span>
      )}
      <ArrowUpLeft className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
