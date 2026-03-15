'use client';

import { useMemo, useState } from 'react';
import type { CourseId, PlatformQuestion, QuestionStatus, UserQuestionState } from '@/lib/math-platform/types';

const STORAGE_KEY = 'math-platform-session-states';

type StoredState = Record<string, UserQuestionState>;

function defaultQuestionState(questionId: string): UserQuestionState {
  return {
    questionId,
    status: 'not_started',
    wasHard: false,
    wasEasy: false,
    reviewLater: false,
    solvedIndependently: false,
    askChatLater: false,
    notes: '',
  };
}

function readStorage(): StoredState {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw) as StoredState;
  } catch {
    return {};
  }
}

function writeStorage(value: StoredState) {
  if (typeof window === 'undefined') {
    return;
  }
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getQuestionState(states: StoredState, questionId: string) {
  return states[questionId] ?? defaultQuestionState(questionId);
}

export function useCourseQuestionSession(courseId: CourseId, questions: PlatformQuestion[]) {
  const [states, setStates] = useState<StoredState>(() => readStorage());

  const courseQuestionIds = useMemo(
    () => new Set(questions.filter((question) => question.courseId === courseId).map((question) => question.id)),
    [courseId, questions]
  );

  const updateQuestion = (questionId: string, patch: Partial<UserQuestionState>) => {
    setStates((current) => {
      const next = {
        ...current,
        [questionId]: {
          ...getQuestionState(current, questionId),
          ...patch,
        },
      };
      writeStorage(next);
      return next;
    });
  };

  const setStatus = (questionId: string, status: QuestionStatus) => {
    setStates((current) => {
      const previous = getQuestionState(current, questionId);
      const next = {
        ...current,
        [questionId]: {
          ...previous,
          status,
          solvedIndependently: status === 'solved' ? previous.solvedIndependently : false,
        },
      };
      writeStorage(next);
      return next;
    });
  };

  const toggleFlag = (
    questionId: string,
    flag: 'wasHard' | 'wasEasy' | 'reviewLater' | 'askChatLater' | 'solvedIndependently'
  ) => {
    setStates((current) => {
      const previous = getQuestionState(current, questionId);
      const next = {
        ...current,
        [questionId]: {
          ...previous,
          [flag]: !previous[flag],
          ...(flag === 'solvedIndependently' ? { status: 'solved' as QuestionStatus } : {}),
          ...(flag === 'wasHard' ? { wasEasy: false } : {}),
          ...(flag === 'wasEasy' ? { wasHard: false } : {}),
        },
      };
      writeStorage(next);
      return next;
    });
  };

  const setNotes = (questionId: string, notes: string) => {
    updateQuestion(questionId, { notes });
  };

  const filteredStates = useMemo(
    () =>
      Object.values(states).filter((state) => courseQuestionIds.has(state.questionId)),
    [courseQuestionIds, states]
  );

  return {
    states,
    filteredStates,
    getState: (questionId: string) => getQuestionState(states, questionId),
    setStatus,
    toggleFlag,
    setNotes,
  };
}
