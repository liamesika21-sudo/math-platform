import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let courseId: string | undefined;
  let fileId: string | undefined;

  try {
    const body = await req.json();
    courseId = body.courseId as string;
    fileId = body.fileId as string;

    if (!courseId || !fileId) {
      return NextResponse.json({ error: 'Missing courseId or fileId' }, { status: 400 });
    }

    // 1. Lazy-import firebase-admin
    const { adminDb, adminStorage } = await import('@/lib/firebase-admin');

    // 2. Look up file doc
    const fileDocRef = adminDb
      .collection('courses')
      .doc(courseId)
      .collection('content')
      .doc(fileId);

    const fileSnap = await fileDocRef.get();
    if (!fileSnap.exists) {
      return NextResponse.json({ error: 'File document not found' }, { status: 404 });
    }

    const fileData = fileSnap.data() as {
      storagePath: string;
      filename: string;
      type: 'lecture' | 'tutorial' | 'homework' | 'exam';
      week: number;
    };

    const { storagePath, filename, type, week } = fileData;

    // 3. Set status = 'analyzing'
    await fileDocRef.update({ status: 'analyzing' });

    // 4. Download file buffer from Storage
    const [buffer] = await adminStorage.bucket().file(storagePath).download();

    // 5. Parse PDF text
    let text: string;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfLib = require('pdf-parse') as (buf: Buffer) => Promise<{ text: string }>;
      const parsed = await pdfLib(buffer);
      text = parsed.text;
    } catch {
      text = buffer.toString('utf-8');
    }
    text = text.slice(0, 60000);

    // 6. Build weekId
    const weekId = `${courseId}-week-${week}`;

    // 7. Create OpenAI client
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (type === 'lecture') {
      // 8. Lecture: extract theory items
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'אתה מנתח חומרי לימוד מתמטיקה. החזר JSON בלבד.',
          },
          {
            role: 'user',
            content: `שם קובץ: ${filename}, שבוע: ${week}
טקסט: ${text}
החזר JSON:
{
  "title": "שבוע X — נושא",
  "summary": "2-4 משפטים",
  "topics": ["..."],
  "reviewHighlights": ["...","...","...","..."],
  "theoryItems": [{"kind":"definition"|"theorem"|"formula"|"concept","title":"...","content":"...","sourcePage":null}]
}`,
          },
        ],
      });

      const raw = JSON.parse(completion.choices[0].message.content ?? '{}');

      const theoryItems = ((raw.theoryItems ?? []) as Array<{
        kind: string;
        title: string;
        content: string;
        sourcePage: number | null;
      }>).map((item, i) => ({
        id: `${weekId}-item-${i}`,
        courseId,
        weekId,
        topicId: '',
        sourceDocumentId: fileId,
        kind: item.kind,
        title: item.title,
        content: item.content,
        sourceName: filename,
        sourcePage: item.sourcePage,
      }));

      const generatedContentRef = adminDb
        .collection('courses')
        .doc(courseId)
        .collection('generatedContent')
        .doc(weekId);

      await generatedContentRef.set(
        {
          weekId,
          weekNumber: week,
          courseId,
          title: raw.title ?? '',
          summary: raw.summary ?? '',
          topics: raw.topics ?? [],
          reviewHighlights: raw.reviewHighlights ?? [],
          theoryItems,
          status: 'done',
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    } else if (type === 'tutorial' || type === 'homework' || type === 'exam') {
      // 9. Tutorial / homework / exam: extract questions
      const typeLabels: Record<string, string> = {
        tutorial: 'תרגול',
        homework: 'שיעורי בית',
        exam: 'מבחן',
      };
      const typeLabel = typeLabels[type];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: 'אתה מנתח חומרי לימוד מתמטיקה. החזר JSON בלבד.',
          },
          {
            role: 'user',
            content: `סוג: ${typeLabel}, שבוע: ${week}
טקסט: ${text}
החזר JSON:
{
  "questions": [{"number":"1","title":null,"content":"...","difficulty":"easy"|"medium"|"hard","sourcePage":null}]
}`,
          },
        ],
      });

      const raw = JSON.parse(completion.choices[0].message.content ?? '{}');

      const questions = ((raw.questions ?? []) as Array<{
        number: string;
        title: string | null;
        content: string;
        difficulty: 'easy' | 'medium' | 'hard';
        sourcePage: number | null;
      }>).map((q, i) => ({
        id: `${weekId}-${type}-q${i}`,
        courseId,
        weekId,
        topicId: '',
        sourceDocumentId: fileId,
        sourceType: type,
        number: q.number,
        title: q.title ?? `שאלה ${i + 1}`,
        content: q.content,
        difficulty: q.difficulty,
        isRequired: false,
        isExamFrequent: false,
        systemTags: [],
        sourceName: filename,
        sourcePage: q.sourcePage,
      }));

      const questionKey =
        type === 'tutorial'
          ? 'tutorialQuestions'
          : type === 'homework'
          ? 'homeworkQuestions'
          : 'examQuestions';

      const generatedContentRef = adminDb
        .collection('courses')
        .doc(courseId)
        .collection('generatedContent')
        .doc(weekId);

      await generatedContentRef.set(
        {
          [questionKey]: questions,
          status: 'done',
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    }

    // 10. Set file doc status = 'analyzed'
    await fileDocRef.update({
      status: 'analyzed',
      analyzedAt: new Date().toISOString(),
    });

    // 11. Return success
    return NextResponse.json({ success: true, weekId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Analyze error:', message);

    // 12. Try to set file doc status = 'error'
    try {
      if (courseId && fileId) {
        const { adminDb } = await import('@/lib/firebase-admin');
        await adminDb
          .collection('courses')
          .doc(courseId)
          .collection('content')
          .doc(fileId)
          .update({ status: 'error', errorMessage: message });
      }
    } catch {
      // ignore secondary error
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
