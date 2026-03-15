'use client';

import type { UserQuestionState } from '@/lib/math-platform/types';
import { cn } from '@/lib/math-platform/utils';

interface QuestionStateControlsProps {
  state: UserQuestionState;
  onStatusChange: (status: UserQuestionState['status']) => void;
  onToggle: (
    flag: 'wasHard' | 'wasEasy' | 'reviewLater' | 'askChatLater' | 'solvedIndependently'
  ) => void;
}

export default function QuestionStateControls({
  state,
  onStatusChange,
  onToggle,
}: QuestionStateControlsProps) {
  const quickButtons: Array<{
    label: string;
    flag: 'wasHard' | 'wasEasy' | 'reviewLater' | 'askChatLater' | 'solvedIndependently';
    active: boolean;
  }> = [
    { label: 'פתרתי לבד', flag: 'solvedIndependently', active: state.solvedIndependently },
    { label: 'קשה לי', flag: 'wasHard', active: state.wasHard },
    { label: 'קל', flag: 'wasEasy', active: state.wasEasy },
    { label: 'לחזרה מאוחרת', flag: 'reviewLater', active: state.reviewLater },
    { label: 'לשאול בצ\'אט', flag: 'askChatLater', active: state.askChatLater },
  ];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700">סטטוס התקדמות</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { value: 'not_started' as const, label: 'לא התחלתי' },
            { value: 'in_progress' as const, label: 'בתהליך' },
            { value: 'solved' as const, label: 'פתרתי' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStatusChange(option.value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                state.status === option.value
                  ? 'bg-slate-950 text-white!'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700">סימונים מהירים</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickButtons.map((button) => (
            <button
              key={button.flag}
              type="button"
              onClick={() => onToggle(button.flag)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                button.active
                  ? 'border-slate-950 bg-slate-950 text-white!'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
