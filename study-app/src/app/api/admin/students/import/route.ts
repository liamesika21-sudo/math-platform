import { NextRequest, NextResponse } from 'next/server';

interface StudentRow {
  name: string;
  email: string;
  studentId: string;
}

export async function POST(req: NextRequest) {
  try {
    const { courseId, students }: { courseId: string; students: StudentRow[] } = await req.json();

    if (!courseId || !students?.length) {
      return NextResponse.json({ error: 'Missing courseId or students' }, { status: 400 });
    }

    // Import Firebase Admin lazily to avoid issues during build
    const { adminAuth, adminDb } = await import('@/lib/firebase-admin');

    const results = await Promise.allSettled(
      students.map(async (student) => {
        // Create Firebase Auth user
        let uid: string;
        try {
          const existing = await adminAuth.getUserByEmail(student.email);
          uid = existing.uid;
        } catch {
          const created = await adminAuth.createUser({
            email: student.email,
            displayName: student.name,
            password: generateTempPassword(),
          });
          uid = created.uid;
        }

        // Save to Firestore
        await adminDb.collection('students').doc(uid).set(
          {
            uid,
            name: student.name,
            email: student.email,
            studentId: student.studentId,
            courses: { [courseId]: { enrolledAt: new Date().toISOString(), status: 'active' } },
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );

        return { uid, email: student.email, success: true };
      })
    );

    const succeeded = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json({ succeeded, failed, total: students.length });
  } catch (error) {
    console.error('Student import error:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}

function generateTempPassword(): string {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6).toUpperCase() + '!';
}
