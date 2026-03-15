import QuestionCollectionPage from '@/components/platform/QuestionCollectionPage';
import { getCourseQuestions } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export default async function TutorialsPage({
  params,
}: Readonly<{
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const typedCourseId = courseId as CourseId;
  const allQuestions = getCourseQuestions(typedCourseId);
  const tutorialQuestions = allQuestions.filter((question) => question.sourceType === 'tutorial');

  return (
    <QuestionCollectionPage
      courseId={typedCourseId}
      title="תרגולים"
      description="תצוגה זו מכילה שאלות מדפי התרגול הרשמיים בלבד. היא לא מערבבת שיעורי בית או שאלות מבחן."
      questions={tutorialQuestions}
      allCourseQuestions={allQuestions}
    />
  );
}
