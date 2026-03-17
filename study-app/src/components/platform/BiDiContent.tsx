'use client';

import { Fragment } from 'react';
import { cn } from '@/lib/math-platform/utils';

// Hebrew characters (Unicode block 0590–05FF + FB letters)
const HAS_HEBREW = /[\u05D0-\u05EA\uFB1D-\uFB4E]/;

// Lines that are clearly LTR: no Hebrew AND (contain Latin/math OR start with code keyword)
const CODE_PREFIX = /^(Function |Procedure |Algorithm |for |if |else|while |return |do\b)/;
const ONLY_MATH_CHARS = /^[A-Za-z0-9∈∉⊆⊇⊂⊃∩∪∅←→=≠≤≥≡∀∃¬∧∨⟨⟩⟩∑∏√∞+\-*/^_{}()[\].,!? ₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹]+$/;

function isLtrLine(line: string): boolean {
  const t = line.trimStart();
  if (!t) return false;
  if (HAS_HEBREW.test(t)) return false;       // Any Hebrew → not a pure LTR line
  if (CODE_PREFIX.test(t)) return true;        // Pseudocode keyword
  if (ONLY_MATH_CHARS.test(t)) return true;   // Pure math / formula line
  // Indented line (continuation of pseudocode block) with Latin start
  if (/^(\s{2,}|│|└|├)/.test(line) && /[A-Za-z←→]/.test(t)) return true;
  return false;
}

/**
 * Parses a line that may contain `$...$` explicit math markers.
 * Math segments are wrapped in an LTR isolation span so they never flip
 * inside an RTL sentence (Unicode bidi isolate).
 */
function renderWithMathMarkers(text: string): React.ReactNode {
  if (!text.includes('$')) return text;

  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          return (
            <span
              key={i}
              dir="ltr"
              style={{ unicodeBidi: 'isolate', display: 'inline-block' }}
              className="font-mono"
            >
              {part.slice(1, -1)}
            </span>
          );
        }
        return part ? <Fragment key={i}>{part}</Fragment> : null;
      })}
    </>
  );
}

interface BiDiContentProps {
  text: string;
  className?: string;
  /** Limit visible lines (for card preview) */
  lineClamp?: number;
}

/**
 * Renders mixed Hebrew + math content with correct bidirectional layout.
 *
 * Rules applied per line:
 * - Empty line → vertical spacer
 * - LTR-dominant (pseudocode / pure formula) → dir="ltr" code-block style
 * - Everything else → dir="auto" (browser bidi picks direction from first strong char)
 *
 * Explicit math markers: wrap a math expression in $...$ in the content
 * string to guarantee LTR isolation within an RTL sentence.
 * e.g.  "לכל $x ∈ A$ מתקיים ש-$f(x) > 0$"
 */
export function BiDiContent({ text, className, lineClamp }: BiDiContentProps) {
  const lines = text.split('\n');

  return (
    <div
      className={cn('text-sm', lineClamp ? `line-clamp-${lineClamp}` : undefined, className)}
    >
      {lines.map((line, i) => {
        // Blank line → small gap
        if (!line.trim()) {
          return <span key={i} className="block h-2" aria-hidden />;
        }

        // Pure LTR line (pseudocode / formula block)
        if (isLtrLine(line)) {
          return (
            <span
              key={i}
              dir="ltr"
              className="my-0.5 block rounded-md border-l-2 border-slate-300 bg-slate-50 px-3 py-0.5 font-mono text-xs leading-6 text-slate-700"
            >
              {line.trimStart()}
            </span>
          );
        }

        // Mixed / Hebrew line — dir="auto" lets the browser pick RTL when
        // the first strong character is Hebrew, LTR when it's Latin/digit.
        return (
          <span key={i} dir="auto" className="block leading-7">
            {renderWithMathMarkers(line)}
          </span>
        );
      })}
    </div>
  );
}
