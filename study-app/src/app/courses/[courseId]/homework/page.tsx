import QuestionCollectionPage from '@/components/platform/QuestionCollectionPage';
import { getCourseQuestions } from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export default async function HomeworkPage({
  params,
}: Readonly<{
  params: Promise<{ courseId: string }>;
}>) {
  const { courseId } = await params;
  const typedCourseId = courseId as CourseId;
  const allQuestions = getCourseQuestions(typedCourseId);
  const homeworkQuestions = allQuestions.filter((question) => question.sourceType === 'homework');

  return (
    <QuestionCollectionPage
      courseId={typedCourseId}
      title="שיעורי בית"
      description="תצוגה זו מכילה תרגילי בית רשמיים בלבד ושומרת על מקור השיעור לצורך אמינות ומעקב."
      questions={homeworkQuestions}
      allCourseQuestions={allQuestions}
    />
  );
}
