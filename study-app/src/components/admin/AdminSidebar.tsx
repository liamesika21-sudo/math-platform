'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BookOpen,
  HelpCircle,
  Layers,
  BookMarked,
  BarChart2,
  AlertTriangle,
  BrainCircuit,
  Bell,
  LogOut,
  ChevronLeft,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

const courseLabels: Record<CourseId, { title: string; icon: string; accent: string }> = {
  logic: { title: 'לוגיקה ותורת הקבוצות', icon: '∀', accent: 'from-violet-500 to-indigo-500' },
  'data-structures': { title: 'מבני נתונים', icon: '⬡', accent: 'from-emerald-500 to-cyan-500' },
};

const navSections = [
  {
    label: 'סקירה כללית',
    items: [
      { key: 'dashboard', href: '', label: 'לוח בקרה', icon: LayoutDashboard },
    ],
  },
  {
    label: 'ניהול',
    items: [
      { key: 'students', href: '/students', label: 'סטודנטים', icon: Users },
      { key: 'assignments', href: '/assignments', label: 'מטלות', icon: ClipboardList },
      { key: 'curriculum', href: '/curriculum', label: 'תכנית לימודים', icon: BookOpen },
      { key: 'questions', href: '/questions', label: 'שאלות', icon: HelpCircle },
      { key: 'topics', href: '/topics', label: 'נושאים ושיעורים', icon: Layers },
    ],
  },
  {
    label: 'אנליטיקה',
    items: [
      { key: 'gradebook', href: '/gradebook', label: 'ספר ציונים', icon: BookMarked },
      { key: 'analytics', href: '/analytics', label: 'ניתוח נתונים', icon: BarChart2 },
      { key: 'insights', href: '/insights', label: 'תובנות הבנה', icon: Lightbulb },
      { key: 'alerts', href: '/alerts', label: 'התראות צ׳אט', icon: Bell },
      { key: 'mistakes', href: '/mistakes', label: 'ניתוח טעויות', icon: AlertTriangle },
      { key: 'adaptive', href: '/adaptive', label: 'אלגוריתם אדפטיבי', icon: BrainCircuit },
    ],
  },
];

interface AdminSidebarProps {
  courseId: CourseId;
}

export default function AdminSidebar({ courseId }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useAuth();
  const course = courseLabels[courseId];
  const base = `/admin/${courseId}`;

  async function handleSignOut() {
    await signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-l border-slate-800 bg-slate-950">
      {/* Course header */}
      <div className="border-b border-slate-800 px-4 py-5">
        <Link href="/admin" className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-white">
          <ChevronLeft className="h-3.5 w-3.5" />
          כל הקורסים
        </Link>
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-lg', course.accent)}>
            {course.icon}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400">פורטל מרצה</div>
            <div className="text-sm font-semibold text-white">{course.title}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const href = `${base}${item.href}`;
                const active = pathname === href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                      active
                        ? 'bg-indigo-600 text-white! shadow-lg shadow-indigo-500/20'
                        : 'text-slate-300! hover:bg-slate-800 hover:text-white!'
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-slate-800 px-4 py-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
            {user?.email?.[0]?.toUpperCase() ?? 'מ'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white">{user?.email}</p>
            <p className="text-[10px] text-slate-400">מרצה</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          התנתקות
        </button>
      </div>
    </aside>
  );
}
