import QuestionCollectionPage from '@/components/platform/QuestionCollectionPage';
import { getCourseQuestions } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export default async function ExamsPage({
  params,
}: Readonly<{
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const typedCourseId = courseId as CourseId;
  const allQuestions = getCourseQuestions(typedCourseId);
  const examQuestions = allQuestions.filter((question) => question.sourceType === 'exam');

  return (
    <QuestionCollectionPage
      courseId={typedCourseId}
      title="שאלות ממבחנים קודמים"
      description="תצוגה זו מכילה שאלות ממבחנים ישנים בלבד. הן נשמרות נפרדות מתרגולים ושיעורי בית, כך שהתלמיד תמיד יודע מהו מקור ההערכה."
      questions={examQuestions}
      allCourseQuestions={allQuestions}
    />
  );
}
