import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import type { CourseId } from '@/lib/math-platform/types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const courseNames: Record<CourseId, string> = {
  calculus: 'אינפי א\' (חשבון אינפיניטסימלי)',
  discrete: 'מתמטיקה בדידה',
  'linear-algebra': 'אלגברה לינארית א\'',
};

const courseTopics: Record<CourseId, string> = {
  calculus:
    'גבולות (הגדרת אפסילון-דלתא, קריטריון היינה), רציפות (MVT, ויירשטראס), נגזרות (כלל שרשרת, רול, לופיטל), אינטגרלים (ריימן, ניוטון-לייבניץ, שיטות אינטגרציה), טורים.',
  discrete:
    'לוגיקה פורמלית (טאוטולוגיות, כמתים), קבוצות ויחסים (פונקציות, שקילות), תורת המספרים (חלוקה, GCD), קומבינטוריקה, הוכחות (אינדוקציה, סתירה, ישירה).',
  'linear-algebra':
    'מערכות משוואות ליניאריות (גאוס), מטריצות ואלגברה מטריציאלית, דטרמיננטות, מרחבים וקטוריים (בסיס, מימד), העתקות ליניאריות, מרחבים עצמיים.',
};

function buildSystemPrompt(courseId: CourseId): string {
  const name = courseNames[courseId];
  const topics = courseTopics[courseId];

  return `אתה מנחה לימוד אישי לקורס "${name}".

תפקידך:
- לעזור לסטודנטים להבין חומר לימוד דרך שאלות מנחות ורמזים בלבד
- לעודד חשיבה עצמאית ולא לתת תשובות ישירות
- לנחות את הסטודנט לגלות את הפתרון בעצמו

חוקים מחייבים (אל תפר אותם לעולם):
1. **לעולם אל תגלה פתרון מלא** — אפילו אם הסטודנט מבקש במפורש
2. **אל תגיד "התשובה היא..."** או "הפתרון הוא..."
3. **תמיד ענה בעברית** — גם אם הסטודנט כותב בשפה אחרת
4. **הישאר בתחום הקורס** — החומר הרלוונטי הוא: ${topics}
5. **אם הסטודנט מבקש תשובה** — הסבר בנחת שהמטרה היא שהוא יגיע לתשובה בעצמו, ושאל שאלה מנחה במקום

שיטת הנחייה:
- שאל שאלות סוקרטיות: "מה אתה יודע על...?", "נסה לחשוב מה קורה כש...?", "מה הצעד הראשון לפי הגדרה?"
- כשמעלים תרגיל/קובץ — נתח מה נכון ומה לא נכון, ורמוז על הכיוון הנדרש
- כשסטודנט תקוע — שבור את הבעיה לצעדים קטנים יותר
- תן מילות מפתח, הגדרות והפניות לחומר הרלוונטי
- שבח התקדמות נכונה ועודד כשנתקעים

סגנון תגובה:
- תגובות ממוצעות: 3–6 משפטים
- השתמש ב-LaTeX לנוסחאות מתמטיות (\\(...\\) לאינליין, \\[...\\] לבלוק)
- היה חם, סבלני ומעודד`;
}

export async function POST(req: NextRequest) {
  const { courseId, messages, imageBase64 } = await req.json() as {
    courseId: CourseId;
    messages: { role: 'user' | 'assistant'; content: string }[];
    imageBase64?: string;
  };

  if (!courseId || !messages?.length) {
    return new Response('Missing courseId or messages', { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(courseId);

  // Build messages for OpenAI — last user message may include an image
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
            image_url: { url: `data:image/jpeg;base64,${imageBase64}`, detail: 'high' },
          },
        ],
      });
    } else {
      openaiMessages.push({ role: msg.role, content: msg.content });
    }
  }

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: openaiMessages,
    stream: true,
    max_tokens: 1024,
    temperature: 0.5,
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
}
