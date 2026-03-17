import AdminSidebar from '@/components/admin/AdminSidebar';
import type { CourseId } from '@/lib/math-platform/types';

export default async function CourseAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const { courseId: courseIdRaw } = await params;
  const courseId = courseIdRaw as CourseId;

  return (
    <div className="flex min-h-screen flex-row-reverse bg-slate-50" dir="rtl">
      <AdminSidebar courseId={courseId} />
      <main className="flex-1 overflow-y-auto" dir="rtl">
        {children}
      </main>
    </div>
  );
}
