'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { LogOut, Users, BookOpen, BarChart2 } from 'lucide-react';

const courses = [
  {
    id: 'calculus',
    title: 'אינפי א׳',
    subtitle: 'חשבון אינפיניטסימלי',
    icon: '∫',
    accent: 'from-sky-500 via-cyan-500 to-teal-500',
    surface: 'from-sky-50 to-cyan-50',
    stats: { students: 0, activeWeek: 1, pending: 0 },
  },
  {
    id: 'discrete',
    title: 'מתמטיקה בדידה',
    subtitle: 'לוגיקה, קבוצות ופונקציות',
    icon: '∀',
    accent: 'from-amber-500 via-orange-500 to-rose-500',
    surface: 'from-amber-50 to-rose-50',
    stats: { students: 0, activeWeek: 1, pending: 0 },
  },
  {
    id: 'linear-algebra',
    title: 'אלגברה לינארית א׳',
    subtitle: 'מרחבים וקטוריים ומטריצות',
    icon: 'A',
    accent: 'from-emerald-500 via-teal-500 to-lime-500',
    surface: 'from-emerald-50 to-lime-50',
    stats: { students: 0, activeWeek: 1, pending: 0 },
  },
];

export default function AdminIndexPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-slate-950/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">פורטל מרצים</p>
            <h1 className="text-lg font-bold text-white">בחר קורס לניהול</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-400 transition hover:border-white/20 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              התנתק
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/admin/${course.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/8"
            >
              {/* Gradient accent bar */}
              <div className={`absolute right-0 top-0 h-full w-1 bg-gradient-to-b ${course.accent}`} />

              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${course.accent} text-2xl font-bold text-white shadow-xl`}>
                {course.icon}
              </div>

              <h2 className="text-lg font-bold text-white">{course.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{course.subtitle}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <Users className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                  <p className="text-lg font-bold text-white">{course.stats.students}</p>
                  <p className="text-[10px] text-slate-500">סטודנטים</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <BookOpen className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                  <p className="text-lg font-bold text-white">שבוע {course.stats.activeWeek}</p>
                  <p className="text-[10px] text-slate-500">פעיל</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <BarChart2 className="mx-auto mb-1 h-4 w-4 text-slate-500" />
                  <p className="text-lg font-bold text-white">{course.stats.pending}</p>
                  <p className="text-[10px] text-slate-500">ממתינים</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end text-xs font-medium text-indigo-400 transition group-hover:text-indigo-300">
                כניסה לניהול ←
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
