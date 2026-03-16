'use client';

import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
}

function renderMath(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'html',
    });
  } catch {
    return latex;
  }
}

// Splits text into segments: display math \[...\], inline math \(...\), and plain text.
// Also handles $$ ... $$ and $ ... $ delimiters.
function parseSegments(text: string): { type: 'text' | 'inline' | 'display'; content: string }[] {
  const segments: { type: 'text' | 'inline' | 'display'; content: string }[] = [];
  // Match \[...\], \(...\), $$...$$, $...$
  const re = /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ type: 'text', content: text.slice(last, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('\\[') || raw.startsWith('$$')) {
      const inner = raw.startsWith('\\[')
        ? raw.slice(2, -2)
        : raw.slice(2, -2);
      segments.push({ type: 'display', content: inner });
    } else {
      const inner = raw.startsWith('\\(')
        ? raw.slice(2, -2)
        : raw.slice(1, -1);
      segments.push({ type: 'inline', content: inner });
    }
    last = match.index + raw.length;
  }

  if (last < text.length) {
    segments.push({ type: 'text', content: text.slice(last) });
  }

  return segments;
}

// Renders a plain text segment with basic markdown: **bold**, `code`, newlines
function PlainText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} className="rounded bg-black/10 px-1 py-0.5 text-xs font-mono">
              {part.slice(1, -1)}
            </code>
          );
        if (part === '\n') return <br key={i} />;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function MathText({ text, className }: MathTextProps) {
  const segments = parseSegments(text);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === 'display') {
          return (
            <span
              key={i}
              className="my-2 block overflow-x-auto text-center"
              dangerouslySetInnerHTML={{ __html: renderMath(seg.content.trim(), true) }}
            />
          );
        }
        if (seg.type === 'inline') {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{ __html: renderMath(seg.content.trim(), false) }}
            />
          );
        }
        return <PlainText key={i} text={seg.content} />;
      })}
    </span>
  );
}
