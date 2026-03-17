import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
  }

  try {
    const { adminDb } = await import('@/lib/firebase-admin');

    // 1. Fetch active students for the course
    const studentsSnap = await adminDb
      .collection('students')
      .where(`courses.${courseId}.status`, '==', 'active')
      .get();

    // 2. Fetch all theory feedback docs for this course
    const feedbackSnap = await adminDb
      .collection('theoryFeedback')
      .where('courseId', '==', courseId)
      .get();

    // 3. Group feedback counts by userId
    type FeedbackCounts = { got_it: number; needs_review: number; lost: number; total: number };
    const feedbackByUser = new Map<string, FeedbackCounts>();

    for (const doc of feedbackSnap.docs) {
      const data = doc.data();
      const userId: string = data.userId;
      const status: string = data.status;

      if (!feedbackByUser.has(userId)) {
        feedbackByUser.set(userId, { got_it: 0, needs_review: 0, lost: 0, total: 0 });
      }
      const counts = feedbackByUser.get(userId)!;
      counts.total += 1;
      if (status === 'got_it') counts.got_it += 1;
      else if (status === 'needs_review') counts.needs_review += 1;
      else if (status === 'lost') counts.lost += 1;
    }

    // 4. Build the response list
    const students = studentsSnap.docs.map((doc) => {
      const data = doc.data();
      const uid = doc.id;
      const courseData = data.courses?.[courseId] ?? {};

      const feedback: FeedbackCounts = feedbackByUser.get(uid) ?? {
        got_it: 0,
        needs_review: 0,
        lost: 0,
        total: 0,
      };

      return {
        uid,
        name: data.name ?? '',
        email: data.email ?? '',
        studentId: data.studentId ?? '',
        enrolledAt: courseData.enrolledAt ?? '',
        feedback,
      };
    });

    return NextResponse.json({ students });
  } catch (err) {
    console.error('[GET /api/admin/students]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
