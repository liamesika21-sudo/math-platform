'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Users, BookOpen, ClipboardList, AlertTriangle,
  TrendingUp, CheckCircle2, Clock, Activity,
  ArrowUpRight, HelpCircle, Upload,
} from 'lucide-react';
import type { CourseId } from '@/lib/math-platform/types';

const courseNames: Record<CourseId, string> = {
  calculus: 'אינפי א׳',
  discrete: 'מתמטיקה בדידה',
  'linear-algebra': 'אלגברה לינארית א׳',
};

function StatCard({
  label, value, sub, icon: Icon, trend, href,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; trend?: string; href?: string;
}) {
  const content = (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-950">{value}</p>
        <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
      </div>
      {href && (
        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
          צפה בפרטים <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      )}
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function QuickActionCard({
  title, description, href, icon: Icon, color,
}: {
  title: string; description: string; href: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
    >
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-sm text-slate-500">{description}</p>
      </div>
      <ArrowUpRight className="mr-auto h-4 w-4 flex-shrink-0 text-slate-300" />
    </Link>
  );
}

export default function CourseDashboardPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const base = `/admin/${courseId}`;
  const courseName = courseNames[courseId as CourseId] ?? courseId;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">לוח בקרה</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-950">{courseName}</h1>
        <p className="mt-2 text-sm text-slate-500">סקירה כללית של הקורס, הסטודנטים והתוכן</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="סטודנטים רשומים" value={0} sub="בסמסטר הנוכחי" icon={Users} href={`${base}/students`} />
        <StatCard label="שאלות במערכת" value={0} sub="מכל הסוגים" icon={HelpCircle} href={`${base}/questions`} />
        <StatCard label="מטלות פעילות" value={0} sub="ממתינות להגשה" icon={ClipboardList} href={`${base}/assignments`} />
        <StatCard label="שבוע נוכחי" value="שבוע 1" sub="מתוך 14 שבועות" icon={BookOpen} href={`${base}/curriculum`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">פעולות מהירות</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickActionCard
              title="העלאת תוכן שבועי"
              description="הרצאה, תרגול, שיעורי בית"
              href={`${base}/curriculum`}
              icon={Upload}
              color="bg-indigo-600"
            />
            <QuickActionCard
              title="ייבוא סטודנטים"
              description="העלאת קובץ Excel/SQL"
              href={`${base}/students`}
              icon={Users}
              color="bg-sky-600"
            />
            <QuickActionCard
              title="הוספת שאלה חדשה"
              description="שאלה לבנק השאלות"
              href={`${base}/questions`}
              icon={HelpCircle}
              color="bg-emerald-600"
            />
            <QuickActionCard
              title="צפייה בטעויות נפוצות"
              description="ניתוח מוקדי קושי"
              href={`${base}/mistakes`}
              icon={AlertTriangle}
              color="bg-amber-600"
            />
          </div>
        </div>

        {/* Activity feed placeholder */}
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">פעילות אחרונה</h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Activity className="mb-3 h-10 w-10 text-slate-200" />
              <p className="text-sm font-medium text-slate-400">אין פעילות עדיין</p>
              <p className="mt-1 text-xs text-slate-300">תופיע כאן לאחר הוספת סטודנטים ותוכן</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status overview */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <CheckCircle2 className="h-8 w-8 flex-shrink-0 text-emerald-500" />
          <div>
            <p className="text-lg font-bold text-slate-900">0%</p>
            <p className="text-xs text-slate-500">אחוז השלמה ממוצע</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <Clock className="h-8 w-8 flex-shrink-0 text-amber-500" />
          <div>
            <p className="text-lg font-bold text-slate-900">0 דק׳</p>
            <p className="text-xs text-slate-500">זמן לימוד יומי ממוצע</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <TrendingUp className="h-8 w-8 flex-shrink-0 text-indigo-500" />
          <div>
            <p className="text-lg font-bold text-slate-900">—</p>
            <p className="text-xs text-slate-500">מגמת ביצועים</p>
          </div>
        </div>
      </div>
    </div>
  );
}
