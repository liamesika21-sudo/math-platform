import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const courseId = formData.get('courseId') as string;
    const files = formData.getAll('files') as File[];

    if (!courseId || !files.length) {
      return NextResponse.json({ error: 'Missing courseId or files' }, { status: 400 });
    }

    const { adminDb, adminStorage } = await import('@/lib/firebase-admin');
    const results = [];

    for (const file of files) {
      const type = formData.get(`type_${file.name}`) as string;
      const week = Number(formData.get(`week_${file.name}`));

      if (!type || !week) continue;

      // Upload file to Firebase Storage
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const storagePath = `courses/${courseId}/week${week}/${type}/${file.name}`;
      const bucket = adminStorage.bucket();
      const fileRef = bucket.file(storagePath);

      await fileRef.save(buffer, {
        metadata: { contentType: 'application/pdf' },
      });

      await fileRef.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${storagePath}`;

      // Save metadata + URL to Firestore
      const docRef = await adminDb.collection('courses').doc(courseId)
        .collection('content').add({
          filename: file.name,
          type,
          week,
          size: file.size,
          url: publicUrl,
          storagePath,
          uploadedAt: new Date().toISOString(),
        });

      results.push({ id: docRef.id, filename: file.name, type, week, url: publicUrl });
    }

    return NextResponse.json({ uploaded: results.length, files: results });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Upload error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
