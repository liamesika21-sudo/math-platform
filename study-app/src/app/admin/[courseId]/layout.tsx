import AdminSidebar from '@/components/admin/AdminSidebar';
import type { CourseId } from '@/lib/math-platform/types';

export default function CourseAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const courseId = params.courseId as CourseId;

  return (
    <div className="flex min-h-screen flex-row-reverse bg-slate-50">
      <AdminSidebar courseId={courseId} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
