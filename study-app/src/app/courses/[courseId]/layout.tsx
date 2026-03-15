import { notFound } from 'next/navigation';
import CourseShell from '@/components/platform/CourseShell';
import { courseIds, getCourseById } from '@/lib/math-platform/data';

export function generateStaticParams() {
  return courseIds.map((courseId) => ({ courseId }));
}

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const course = getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <CourseShell course={course}>{children}</CourseShell>;
}
