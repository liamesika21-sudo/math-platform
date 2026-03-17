'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Bot,
  BookOpen,
  Eye,
  Flag,
  Lock,
  LogIn,
  LogOut,
  MessageSquare,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Zap,
} from 'lucide-react';
import { courses, questions, sourceDocuments, theoryItems, weeks } from '@/lib/math-platform/data';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/math-platform/utils';

export default function HomePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const totalQuestions = questions.length;
  const totalSources = sourceDocuments.length;
  const totalWeeks = weeks.length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_28%),linear-gradient(180deg,#f8fbfc_0%,#f5f7f7_100%)]">

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-slate-950">פלטפורמת לימוד</span>
          </div>

          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <User className="h-3.5 w-3.5 text-slate-600" />
                </div>
                <span className="text-sm text-slate-600">{user.displayName ?? user.email?.split('@')[0]}</span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
              >
                <LogOut className="h-3.5 w-3.5" />
                התנתק
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white! transition hover:bg-slate-800"
            >
              <LogIn className="h-4 w-4" />
              התחברות לפלטפורמה
            </Link>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ─── Hero ─── */}
        <section className="rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-950/15 sm:px-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                לימוד מונחה-קורס עם AI
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                לומדים חכם יותר,<br />
                <span className="bg-linear-to-r from-sky-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  לא קשה יותר.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                פלטפורמה מובנית לפי קורס ושבוע — עם מנחה AI שמכיר את כל ההרצאות, עוזר לך לחשוב, ולא מגלה תשובות.
                כל הפעילות שלך שקופה למרצים כדי שיוכלו לעזור לך טוב יותר.
              </p>
              {!user && !loading && (
                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  <LogIn className="h-4 w-4" />
                  התחבר כדי להתחיל
                </Link>
              )}
            </div>

            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              {[
                { label: 'קורסים', value: courses.length },
                { label: 'שבועות', value: totalWeeks },
                { label: 'שאלות', value: totalQuestions },
                { label: 'מקורות', value: totalSources },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AI Mentor section ─── */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-linear-to-br from-emerald-50 via-teal-50 to-sky-50 p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">פעיל עכשיו</p>
                  <h2 className="text-2xl font-semibold text-slate-950">מנחה AI — איך הוא עובד</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.5rem] border border-emerald-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                    <BookOpen className="h-4.5 w-4.5 text-emerald-700" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-950">מכיר את כל החומר</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    ה-AI מבוסס על ההרצאות, התרגולים ומבני הקורס שלך בדיוק. אפשר לשאול אותו ישירות על כל נושא שנלמד — הוא יודע בדיוק מה כוסה ומתי.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-sky-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100">
                    <MessageSquare className="h-4.5 w-4.5 text-sky-700" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-950">שואל, לא מגלה</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    המנחה לא יתן לך את הפתרון — הוא ישאל שאלות שיעזרו לך להגיע אליו בעצמך. זה לא חיסרון, זו הדרך היחידה ללמוד באמת.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                    <Zap className="h-4.5 w-4.5 text-amber-700" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-950">שאל על מה שנלמד</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    בלבול בהגדרה מההרצאה? תקוע בתרגיל? פשוט שאל את המנחה. הוא יסביר בהקשר של הקורס שלך — לא תשובות גנריות.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-rose-200 bg-white p-5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100">
                    <Eye className="h-4.5 w-4.5 text-rose-700" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-950">שקיפות מלאה</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    כל שיחה עם ה-AI נשמרת. אם יש תוכן חריג, המרצים יראו זאת ויתייחסו. זה מגן עליך ועל כולם.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Transparency & monitoring ─── */}
        <section className="mt-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-950">שקיפות ומעקב — מה רואים המרצים</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <Flag className="h-5 w-5 text-amber-500" />
                <h3 className="mt-3 font-semibold text-slate-950">סימונים בשאלות</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  כל שאלה שסימנת (קשה, לחזרה, לשאול בצ'אט) מועברת למרצים. אם שאלה רבים מסמנים כקשה — המרצה יראה ויתייחס בכיתה.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <TrendingUp className="h-5 w-5 text-sky-500" />
                <h3 className="mt-3 font-semibold text-slate-950">התקדמות אישית</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  המרצים רואים את ההתקדמות הכללית של הקורס — כמה שאלות נפתרו, אילו נושאים מאתגרים — כדי לדייק את ההוראה.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <Eye className="h-5 w-5 text-rose-500" />
                <h3 className="mt-3 font-semibold text-slate-950">שיחות AI</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  אם יש תוכן חריג בשיחה עם המנחה — מילות מפתח מסוימות — המרצה מקבל התראה ויוכל לפנות אליך ישירות.
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              * המטרה אינה פיקוח אלא סיוע — כדי שהמרצים יוכלו לעזור לסטודנטים שנתקעים לפני שהם מוותרים.
            </p>
          </div>
        </section>

        {/* ─── Course cards ─── */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">קורסים</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">בחר קורס כדי להתחיל</h2>
            </div>
            {!user && !loading && (
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 lg:flex">
                <Lock className="h-3.5 w-3.5" />
                דורש התחברות
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {courses.map((course) => {
              const courseWeeks = weeks.filter((w) => w.courseId === course.id).length;
              const courseQuestions = questions.filter((q) => q.courseId === course.id).length;
              const courseTheory = theoryItems.filter((t) => t.courseId === course.id).length;
              const courseSources = sourceDocuments.filter((d) => d.courseId === course.id).length;

              return (
                <article
                  key={course.id}
                  className={cn(
                    'rounded-[2rem] border border-slate-200 bg-linear-to-br p-6 shadow-sm shadow-slate-200/60 transition',
                    course.surface,
                    !user && !loading && 'opacity-80',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-r ${course.accent} text-xl font-semibold text-white shadow-lg`}>
                        {course.icon}
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{course.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{course.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {courseWeeks} שבועות
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: 'תיאוריה', value: courseTheory },
                      { label: 'שאלות', value: courseQuestions },
                      { label: 'מקורות', value: courseSources },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-2xl bg-white/80 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-6 text-sm leading-7 text-slate-600">{course.description}</p>

                  {user ? (
                    <Link
                      href={`/courses/${course.id}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white! transition hover:bg-slate-800"
                    >
                      כניסה לקורס
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-slate-950 hover:text-slate-950"
                    >
                      <Lock className="h-4 w-4" />
                      התחבר כדי להיכנס
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <footer className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} פלטפורמת לימוד · כל הפעילות נשמרת ונראית למרצים · שיחות AI נשמרות 72 שעות</p>
        </footer>
      </div>
    </main>
  );
}
