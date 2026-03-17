/**
 * Builds a comprehensive course knowledge markdown string from data.ts.
 * Used by the AI chat route as the core knowledge base in the system prompt.
 */

import {
  getCourseById,
  getCourseWeeks,
  getCourseTopics,
  getCourseQuestions,
  getTheoryItemsForWeek,
} from '@/lib/math-platform/data';
import type { CourseId } from '@/lib/math-platform/types';

export function buildCourseKnowledge(courseId: CourseId): string {
  const course = getCourseById(courseId);
  if (!course) return '';

  const weeks = getCourseWeeks(courseId);
  const topics = getCourseTopics(courseId);
  const allQuestions = getCourseQuestions(courseId);

  const lines: string[] = [];

  lines.push(`# ${course.title}`);
  lines.push(`> ${course.description}`);
  lines.push('');

  for (const week of weeks) {
    lines.push(`## שבוע ${week.number}: ${week.title}`);
    lines.push(week.summary);
    lines.push('');

    if (week.reviewHighlights.length) {
      lines.push('**נקודות מפתח:**');
      for (const h of week.reviewHighlights) lines.push(`- ${h}`);
      lines.push('');
    }

    // Theory items grouped by topic
    const weekTopics = topics.filter((t) => t.weekId === week.id);
    for (const topic of weekTopics) {
      lines.push(`### נושא: ${topic.title}`);
      lines.push(topic.summary);
      lines.push('');

      const items = getTheoryItemsForWeek(week.id).filter((i) => i.topicId === topic.id);
      for (const item of items) {
        const kindLabel =
          item.kind === 'definition' ? 'הגדרה'
          : item.kind === 'theorem' ? 'משפט'
          : item.kind === 'formula' ? 'נוסחה'
          : 'מושג';
        lines.push(`#### [${kindLabel}] ${item.title}`);
        lines.push(item.content);
        lines.push('');
      }
    }

    // Tutorial questions for this week
    const weekQuestions = allQuestions.filter((q) => q.weekId === week.id);
    if (weekQuestions.length) {
      lines.push(`### שאלות תרגול — שבוע ${week.number}`);
      for (const q of weekQuestions) {
        const srcLabel = q.sourceType === 'tutorial' ? 'תרגול' : q.sourceType === 'homework' ? 'שיעורי בית' : q.sourceType;
        lines.push(`#### [${q.difficulty}] (${srcLabel} — ${q.sourceName}): ${q.title}`);
        lines.push(q.content);
        if (q.hint) {
          lines.push(`**רמז:** ${q.hint}`);
        }
        lines.push('');
      }
    }
  }

  return lines.join('\n');
}
