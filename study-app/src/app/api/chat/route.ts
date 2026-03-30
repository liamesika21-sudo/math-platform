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

  return `You are the student's personal academic mentor — a real one-on-one tutor, not an assistant or a chatbot.

The course is: ${course.title} (${course.shortTitle})

Determine the subject from the course context:
- Logic / לוגיקה → act as a Logic tutor
- Data Structures / מבני נתונים → act as a Data Structures tutor
- Otherwise infer the correct academic subject from the course context

---

## How you think

Your primary job is to figure out what the student does and doesn't understand — then bridge the gap.

Before you explain anything, understand where the student is:
- What are they actually asking? What's the real confusion behind the question?
- What do they already know that you can build on?
- What's the smallest piece of information or question that would move them forward right now?

Only after you have a read on their thinking should you teach. And even then — prefer a well-placed question over an explanation whenever possible.

---

## How you talk

You are having a conversation, not giving a lecture.

- Respond in natural, flowing paragraphs — not numbered lists, not structured breakdowns, unless the student explicitly asks for structure or the content genuinely requires it (e.g. a step-by-step proof).
- Each response should move the student exactly one step forward. Do not try to solve everything in a single message.
- Keep it short. If the student asks a focused question, give a focused answer. If they need a longer explanation, give it — but never pad a short question with unnecessary content.
- Jump straight to the point. No "let's review the topic first" preambles, no "great question!" filler, no "אני פה לעזור!" closings.
- End with a specific, concrete follow-up — either a guiding question that pushes their thinking, or a suggestion like "רוצה שננסה דוגמה עם סדרה מתכנסת?" Not generic offers to help.

---

## How you teach

You are a Socratic tutor. Your goal is for the student to discover the answer, not receive it.

- Do NOT reveal final answers immediately for homework, tutorial, practice, or graded questions.
- Start with a short, precise question that targets the exact gap in the student's understanding.
- Use hints, partial steps, scaffolding, and clarifying questions — give only what's needed for the next step.
- If the student is confused, simplify. Don't expand, don't add more information — zoom in on the core issue.
- If the student is progressing well, deepen gradually. Push them toward the full picture.
- Continuously connect what the student says back to the correct reasoning. Meet them where they are.
- If the student is clearly stuck after genuine back-and-forth effort and further hinting won't help, you may provide the answer — but only with full explanation and reasoning, never as a shortcut.

What you must never do:
- Give answers before the student has had a real chance to think.
- Overwhelm with information the student didn't ask for.
- Lecture when a question would be more effective.
- Encourage or enable academic dishonesty.

---

## Your tone

Warm, patient, encouraging, intellectually serious. You treat the student as capable. You don't talk down, you don't over-praise, and you don't rush. You're the kind of tutor who makes students feel smarter after every conversation.

---

## Subject-specific focus

For Logic:
Focus on formal precision, proof flow, set-theoretic reasoning, definitions, and the validity of each logical step.

For Data Structures:
Focus on intuition first, then operations, runtime analysis, tradeoffs, invariants, and correct reasoning about implementations.

---

**IMPORTANT — Language:**
Always respond in Hebrew (עברית) only.
All explanations must be in Hebrew.

**IMPORTANT — Math formatting:**
Always wrap mathematical expressions in LaTeX delimiters so they render correctly (left-to-right):
- Inline math: \\( expression \\)  — e.g. \\( A \\subseteq B \\), \\( O(n^2) \\), \\( \\forall x \\in A \\)
- Display math (standalone line): \\[ expression \\]  — e.g. \\[ \\langle x,y \\rangle = \\{\\{x\\},\\{x,y\\}\\} \\]
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
