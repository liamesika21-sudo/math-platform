import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const courseId = formData.get('courseId') as string;
    const files = formData.getAll('files') as File[];

    if (!courseId || !files.length) {
      return NextResponse.json({ error: 'Missing courseId or files' }, { status: 400 });
    }

    const { adminDb } = await import('@/lib/firebase-admin');
    const results = [];

    for (const file of files) {
      const type = formData.get(`type_${file.name}`) as string;
      const week = Number(formData.get(`week_${file.name}`));

      if (!type || !week) continue;

      // Save metadata to Firestore (actual file storage → Firebase Storage or local)
      const docRef = await adminDb.collection('content').add({
        courseId,
        filename: file.name,
        type,
        week,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        processed: false,
      });

      results.push({ id: docRef.id, filename: file.name, type, week });
    }

    return NextResponse.json({ uploaded: results.length, files: results });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
