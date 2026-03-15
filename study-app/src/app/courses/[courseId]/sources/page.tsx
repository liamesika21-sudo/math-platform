import { getCourseSources, getTopicById } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export default async function SourcesPage({
  params,
}: Readonly<{
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const typedCourseId = courseId as CourseId;
  const sources = getCourseSources(typedCourseId);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">ניהול מקורות</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">מסמכי המקור העוקבים לקורס זה</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          כל שאלה ופריט תיאוריה מצביעים לאחד ממסמכי המקור הבאים. סטטוס החילוץ, השבוע, הסוג וקישורי הנושא גלויים תמיד — כך שהתלמיד יודע על מה בנויה הפלטפורמה.
        </p>
      </section>

      <section className="grid gap-4">
        {sources.map((source) => (
          <article key={source.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                    {source.type === 'lecture' ? 'הרצאה' : source.type === 'tutorial' ? 'תרגול' : source.type === 'homework' ? 'שיעורי בית' : 'מבחן'}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${source.processed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {source.processed ? 'עובד' : 'ממתין'}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">{source.name}</h3>
                <p className="mt-2 text-sm text-slate-500">שבוע: {source.weekId.replace(/^[^-]+-week-/, 'שבוע ')}</p>
              </div>
              <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4">
                <p className="text-sm text-slate-500">סטטוס חילוץ</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{source.processed ? 'מוכן' : 'בתור'}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">שם המסמך</p>
                <p className="mt-2 font-medium text-slate-950">{source.name}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">סוג</p>
                <p className="mt-2 font-medium text-slate-950">
                  {source.type === 'lecture' ? 'הרצאה' : source.type === 'tutorial' ? 'תרגול' : source.type === 'homework' ? 'שיעורי בית' : 'מבחן'}
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">נושאים מקושרים</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {source.topicIds.map((topicId) => {
                    const topic = getTopicById(topicId);
                    return (
                      <span key={topicId} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        {topic?.title ?? topicId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
