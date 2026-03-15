'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Brain, ChartColumnBig, FileQuestion, Files, FolderKanban, GraduationCap, House, Layers3, ListChecks, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import type { Course } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';

interface CourseShellProps {
  course: Course;
  children: React.ReactNode;
}

const navIconMap = {
  dashboard: House,
  weekly: Layers3,
  topics: BookOpen,
  tutorials: FileQuestion,
  homework: ListChecks,
  exams: GraduationCap,
  review: ChartColumnBig,
  myQuestions: FolderKanban,
  sources: Files,
  mentor: Brain,
};

export default function CourseShell({ course, children }: CourseShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { key: 'dashboard', href: `/courses/${course.id}`, label: 'לוח בקרה' },
    { key: 'weekly', href: `/courses/${course.id}/weekly-study`, label: 'לימוד שבועי' },
    { key: 'topics', href: `/courses/${course.id}/topics`, label: 'נושאים' },
    { key: 'tutorials', href: `/courses/${course.id}/tutorials`, label: 'תרגולים' },
    { key: 'homework', href: `/courses/${course.id}/homework`, label: 'שיעורי בית' },
    { key: 'exams', href: `/courses/${course.id}/exams`, label: 'מבחנים' },
    { key: 'review', href: `/courses/${course.id}/review-center`, label: 'מרכז חזרה' },
    { key: 'myQuestions', href: `/courses/${course.id}/my-questions`, label: 'השאלות שלי' },
    { key: 'sources', href: `/courses/${course.id}/sources`, label: 'מקורות' },
    { key: 'mentor', href: `/courses/${course.id}/mentor`, label: 'מנחה אישי' },
  ] as const;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(180deg,_#f7fbfc_0%,_#f8fafc_40%,_#f6f7f5_100%)]">
      <div className="border-b border-slate-200/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl font-semibold text-white shadow-lg shadow-slate-950/10">
              {course.icon}
            </Link>
            <div>
              <Link href="/" className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                פלטפורמת לימוד מתמטיקה
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-slate-950">{course.title}</h1>
                <span className={cn('hidden rounded-full bg-gradient-to-r px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:inline-flex', course.accent)}>
                  מצב מובנה
                </span>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              ללא התחברות. המעקב שמור בדפדפן.
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              החלף קורס
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="hidden border-t border-slate-200/80 lg:block">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            {navItems.map((item) => {
              const Icon = navIconMap[item.key];
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition',
                    active
                      ? 'bg-slate-950 text-white! shadow-lg shadow-slate-950/10'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-950'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {open ? (
          <div className="border-t border-slate-200/80 bg-white px-4 py-4 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const Icon = navIconMap[item.key];
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium',
                      active ? 'bg-slate-950 text-white!' : 'bg-slate-50 text-slate-700'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={cn('mb-6 rounded-[2rem] border border-white/70 bg-gradient-to-r px-6 py-6 text-white shadow-xl shadow-slate-300/30', course.accent)}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                <Sparkles className="h-3.5 w-3.5" />
                זרימת לימוד מאוחדת
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{course.shortTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">{course.subtitle}</p>
            </div>
            <p className="max-w-xl text-sm text-white/85">{course.description}</p>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
