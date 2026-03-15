import Link from 'next/link';
import { ArrowRight, BookOpenCheck, BrainCircuit, Files, Layers3, MessageSquareDashed, Sparkles, Telescope } from 'lucide-react';
import { courses, questions, sourceDocuments, theoryItems, weeks } from '@/lib/math-platform/data';

export default function HomePage() {
  const totalQuestions = questions.length;
  const totalSources = sourceDocuments.length;
  const totalWeeks = weeks.length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.12),_transparent_28%),linear-gradient(180deg,_#f8fbfc_0%,_#f5f7f7_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-950/15 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                נקודת כניסה מאוחדת למתמטיקה
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                לימוד מונחה-קורס, לא גלישה בקבצים.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                בחר קורס, התקדם שבוע אחרי שבוע, למד תיאוריה בנפרד מתרגולים, שיעורי בית ומבחנים — ושמור סביבת חזרה אישית חיה ללא צורך בהתחברות.
              </p>
            </div>

            <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">קורסים</p>
                <p className="mt-2 text-3xl font-semibold">{courses.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">שבועות</p>
                <p className="mt-2 text-3xl font-semibold">{totalWeeks}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">שאלות</p>
                <p className="mt-2 text-3xl font-semibold">{totalQuestions}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">מקורות</p>
                <p className="mt-2 text-3xl font-semibold">{totalSources}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Course cards */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">בחר קורס</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">לוח בקרה אחד, שלושה מסלולי לימוד מובנים</h2>
            </div>
            <div className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 lg:block">
              הפרדת מקורות נאכפת בכל תצוגת קורס.
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className={`rounded-[2rem] border border-slate-200 bg-gradient-to-br ${course.surface} p-6 shadow-sm shadow-slate-200/60`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${course.accent} text-xl font-semibold text-white shadow-lg`}>
                      {course.icon}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-950">{course.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{course.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {weeks.filter((week) => week.courseId === course.id).length} שבועות
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">תיאוריה</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {theoryItems.filter((item) => item.courseId === course.id).length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">שאלות</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {questions.filter((question) => question.courseId === course.id).length}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">מקורות</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {sourceDocuments.filter((document) => document.courseId === course.id).length}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600">{course.description}</p>

                <Link
                  href={`/courses/${course.id}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium !text-white transition hover:bg-slate-800"
                >
                  כניסה לקורס
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Platform model */}
        <section className="mt-10">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">תקן הפלטפורמה</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">מודל הלימוד עוקב אחרי קורס &#8594; שבוע &#8594; נושא &#8594; שאלה</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <Layers3 className="h-5 w-5 text-sky-600" />
                <h3 className="mt-3 font-semibold text-slate-950">לימוד שבועי כסביבת העבודה המרכזית</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">כל שבוע מציג תיאוריה, תרגולים, שיעורי בית, חומר מבחן, התקדמות וסיגנלי חזרה בתצוגה ממוקדת אחת.</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <Files className="h-5 w-5 text-amber-600" />
                <h3 className="mt-3 font-semibold text-slate-950">הפרדת מקורות קפדנית</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">תרגולים מכילים חומר תרגול בלבד, שיעורי בית מכילים שיעורי בית בלבד, ומבחנים ישנים נשמרים מבודדים ועם מעקב מקור.</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <BookOpenCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-3 font-semibold text-slate-950">מעקב ברמת שאלה</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">אפשר לסמן פתרתי, פתרתי לבד, קשה, קל, לחזרה מאוחרת ולשאול בצ'אט — ישירות מדף השאלה.</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 p-5">
                <BrainCircuit className="h-5 w-5 text-rose-600" />
                <h3 className="mt-3 font-semibold text-slate-950">סביבת חזרה אישית</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">השאלות שלי אוספת חומר שסימנת ושאלות בעדיפות מערכת לפני אחת נקיה לחזרה.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon: AI Mentor */}
        <section className="mt-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 shadow-2xl shadow-slate-950/20 sm:p-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-500/15 via-cyan-500/10 to-transparent blur-3xl" />
            </div>

            <div className="relative">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400">
                    <Telescope className="h-3.5 w-3.5" />
                    בקרוב
                  </div>
                  <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    מנטור AI
                    <span className="mr-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      למתמטיקה
                    </span>
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                    הפלטפורמה תתפתח לסביבת לימוד מונחית מלאה עם מורה AI בנוי ישירות לתוך מבנה הקורס — מבוסס על חומרי הקורס הרשמיים שלך ומאורגן לפי שבוע.
                  </p>
                </div>

                <div className="hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:block lg:min-w-60">
                  <MessageSquareDashed className="h-6 w-6 text-emerald-400" />
                  <p className="mt-3 text-sm font-medium text-white">לא צ'אטבוט רגיל</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    ה-AI יתבסס אך ורק על חומרי ההרצאות, התרגולים, שיעורי הבית והמבחנים שנמצאים בפלטפורמה זו.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                    <span className="text-base font-bold">∫</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">הסבר חומר הרצאה</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    שאל על כל הגדרה או משפט מחומר ההרצאה השבועי. ה-AI מסביר בהקשר ומקשר בחזרה למקור.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <span className="text-base font-bold">?</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">הנחיה בפתרון תרגילים</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    קבל רמזים שלב-אחרי-שלב לתרגולים ושיעורי בית — בלי לקפוץ ישר לפתרון המלא.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <span className="text-base font-bold">★</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">הכנה למבחן</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    חזור על שאלות מבחן עם ה-AI שמסביר תבניות, טעויות נפוצות והתיאוריה מאחורי כל פתרון.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                    <span className="text-base font-bold">&#9873;</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">חזרה על שאלות מסומנות</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    ה-AI יעבור על שאלות שסימנת כקשות או "לשאול בצ'אט" ויעבוד איתך עליהן אחת-אחת.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                  <p className="text-sm leading-6 text-slate-300">
                    מנטור ה-AI יהיה מבוסס על מבנה הקורס של הפלטפורמה — אותה ארגון שבועי, אותם מסמכי מקור, ואותה מאגר השאלות שכבר לומדים איתו.
                  </p>
                </div>
                <div className="flex-shrink-0 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  בפיתוח
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
