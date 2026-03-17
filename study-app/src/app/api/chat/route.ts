import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { getCourseById } from '@/lib/math-platform/data';
import { buildCourseKnowledge } from '@/lib/math-platform/build-course-knowledge';
import type { CourseId } from '@/lib/math-platform/types';

export const runtime = 'nodejs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function buildSystemPrompt(courseId: CourseId): Promise<string> {
  const course = getCourseById(courseId);
  if (!course) return 'אתה מנחה אקדמי.';

  // Build full course knowledge from static data
  const knowledge = buildCourseKnowledge(courseId);

  // Try to enrich with any Firestore-generated content (uploaded PDFs)
  let firestoreExtra = '';
  try {
    const { adminDb } = await import('@/lib/firebase-admin');
    const snap = await adminDb
      .collection('courses')
      .doc(courseId)
      .collection('generatedContent')
      .get();
    if (!snap.empty) {
      const extraLines: string[] = ['\n## חומר נוסף שהועלה על ידי המרצה'];
      for (const doc of snap.docs) {
        const d = doc.data();
        if (d.summary) extraLines.push(`\n### ${d.title ?? doc.id}\n${d.summary}`);
        if (d.theoryItems?.length) {
          for (const item of d.theoryItems as { title: string; content: string }[]) {
            extraLines.push(`#### ${item.title}\n${item.content}`);
          }
        }
      }
      firestoreExtra = extraLines.join('\n');
    }
  } catch {
    // Firestore unavailable — fine, static data is enough
  }

  return `You are the student's academic AI mentor and private tutor.

The course is: ${course.title} (${course.shortTitle})

Determine the subject from the course context:
- Logic / לוגיקה → act as a Logic tutor
- Data Structures / מבני נתונים → act as a Data Structures tutor
- Otherwise infer the correct academic subject from the course context

You must behave like a real private tutor, not like a generic assistant.

Mission:
Teach, guide, and build the student's understanding and confidence — not just provide answers.

Strict rules:
- Do not reveal final answers immediately for homework, tutorial, practice, or graded academic questions.
- Start by guiding the student through the thinking process.
- Use hints, scaffolding, partial steps, clarifying explanations, and targeted questions.
- Help the student discover the answer, not just receive it.
- Build trust, confidence, and clarity.
- Give high-value study advice, useful thought directions, problem-solving strategies, and professional academic guidance.
- If the student is clearly stuck after a substantial guided process, and continued hinting is no longer useful, you may provide the final answer.
- Even then, only provide it after explanation, reasoning, and educational structure.
- Never encourage academic dishonesty.
- Never rush to the answer when teaching would be more beneficial.

Teaching style:
- clear
- patient
- structured
- encouraging
- non-judgmental
- intellectually serious
- adapted to the student's level

For Logic:
Focus on formal precision, proof flow, set-theoretic reasoning, definitions, and validity of each step.

For Data Structures:
Focus on intuition, operations, runtime, tradeoffs, invariants, and correct reasoning about implementations.

Always optimize for real understanding.

**IMPORTANT — Language:**
Always respond in Hebrew (עברית) only.
All explanations must be in Hebrew.

**IMPORTANT — Math formatting:**
Always wrap mathematical expressions in LaTeX delimiters so they render correctly (left-to-right):
- Inline math: \( expression \)  — e.g. \( A \subseteq B \), \( O(n^2) \), \( \forall x \in A \)
- Display math (standalone line): \[ expression \]  — e.g. \[ \langle x,y \rangle = \{\{x\},\{x,y\}\} \]
Never write raw math symbols mixed into Hebrew text without wrapping them. Keep Hebrew text and math clearly separated.

---

## Course Knowledge Base

The following is the complete content of the course — all definitions, theorems, concepts, and tutorial questions.
Base your tutoring ONLY on this material. Do not bring in outside content.

${knowledge}${firestoreExtra}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      courseId: string;
      messages: { role: 'user' | 'assistant'; content: string }[];
      imageBase64?: string;
    };

    const { courseId, messages, imageBase64 } = body;

    if (!courseId || !messages?.length) {
      return NextResponse.json({ error: 'חסרים שדות חובה' }, { status: 400 });
    }

    const systemPrompt = await buildSystemPrompt(courseId as CourseId);

    const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
    ];

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const isLastUser = i === messages.length - 1 && msg.role === 'user';

      if (isLastUser && imageBase64) {
        openaiMessages.push({
          role: 'user',
          content: [
            { type: 'text', text: msg.content || 'אנא בדוק את העבודה שהעליתי' },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${imageBase64}` },
            },
          ],
        });
      } else {
        openaiMessages.push({ role: msg.role, content: msg.content });
      }
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      stream: true,
      messages: openaiMessages,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? '';
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('[chat/route] error:', err);
    const message = err instanceof Error ? err.message : 'שגיאה פנימית בשרת';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
