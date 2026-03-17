import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import {
  getCourseById,
  getCourseWeeks,
  getCourseTopics,
  getTheoryItemsForWeek,
} from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export const runtime = 'nodejs';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(courseId: CourseId): string {
  const course = getCourseById(courseId);
  if (!course) return 'אתה מנחה אקדמי.';

  const weeks = getCourseWeeks(courseId);
  // getCourseTopics is imported for potential future prompt enrichment
  getCourseTopics(courseId);

  const weekLines = weeks
    .map((week) => {
      const theoryItems = getTheoryItemsForWeek(week.id);
      const theoryPart =
        theoryItems.length > 0
          ? `\n  נושאי תיאוריה: ${theoryItems.map((t) => t.title).join(', ')}`
          : '';
      return `שבוע ${week.number}: ${week.title}\n  ${week.summary}${theoryPart}`;
    })
    .join('\n\n');

  return `אתה מנחה אקדמי חכם ואמפתי של הקורס: ${course.title}.

**מידע על הקורס:**
- שם: ${course.shortTitle}
- תיאור: ${course.description}

**נושאים ושבועות הקורס:**
${weekLines}

**כללים מחייבים:**
1. לעולם אל תגלה תשובות מוכנות, פתרונות מלאים, או הוכחות ישירות
2. השתמש בשיטה סוקרטית — שאל שאלות מנחות שיעזרו לסטודנט לחשוב בעצמו
3. ניתן לתת רמזים, לכוון, להסביר מושגים — אך לא לפתור
4. ענה תמיד בעברית בלבד
5. התייחס רק לחומר שנלמד בקורס זה
6. אם מועלית תמונה של תרגיל — סייע להבנת הגישה, לא לפתרון
7. היה ידידותי, מעודד, ותומך

זכור: מטרתך לעזור לסטודנט להגיע לתשובה בעצמו, לא לתת לו אותה.`;
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

    const systemPrompt = buildSystemPrompt(courseId as CourseId);

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
