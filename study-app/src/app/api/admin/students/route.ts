import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
  }

  try {
    const { adminDb } = await import('@/lib/firebase-admin');

    const snapshot = await adminDb
      .collection('students')
      .where(`courses.${courseId}`, '!=', null)
      .get();

    const students = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ students });
  } catch (error) {
    console.error('Get students error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
