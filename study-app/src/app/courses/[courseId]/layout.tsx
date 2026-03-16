import { notFound } from 'next/navigation';
import CourseShell from '@/components/platform/CourseShell';
import { courses, getCourseById } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export default async function CourseLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const course = getCourseById(courseId as CourseId);

  if (!course) {
    notFound();
  }

  return <CourseShell course={course}>{children}</CourseShell>;
}
