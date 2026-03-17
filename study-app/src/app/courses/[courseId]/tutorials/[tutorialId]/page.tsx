import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import QuestionCollectionPage from '@/components/platform/QuestionCollectionPage';
import { getCourseQuestions } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export default async function TutorialDetailPage({
  params,
}: Readonly<{ params: Promise<{ courseId: string; tutorialId: string }> }>) {
  const { courseId, tutorialId } = await params;
  const typedCourseId = courseId as CourseId;
  const allQuestions = getCourseQuestions(typedCourseId);
  const tutorialQuestions = allQuestions.filter(
    (q) => q.sourceType === 'tutorial' && q.sourceDocumentId === tutorialId,
  );

  if (tutorialQuestions.length === 0) notFound();

  const tutorialName = tutorialQuestions[0].sourceName;

  return (
    <div className="space-y-6">
      <Link
        href={`/courses/${courseId}/tutorials`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowRight className="h-4 w-4" />
        חזרה לתרגולים
      </Link>

      <QuestionCollectionPage
        courseId={typedCourseId}
        title={tutorialName}
        description={`כל השאלות מ${tutorialName}`}
        questions={tutorialQuestions}
        allCourseQuestions={allQuestions}
      />
    </div>
  );
}
