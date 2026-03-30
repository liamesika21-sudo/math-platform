'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import {
  BattlePlanTrackerState,
  buildTrackerSnapshot,
  DefinitionStatus,
  DrillDifficulty,
  emptyBattlePlanState,
  HomeworkConfidence,
  HomeworkStatus,
} from '@/data/battle-plan-system';

const STORAGE_KEY = 'battle-plan-tracker-v1';
const EVENT_NAME = 'battle-plan-tracker-updated';

function readState(): BattlePlanTrackerState {
  if (typeof window === 'undefined') return emptyBattlePlanState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyBattlePlanState;
    const parsed = JSON.parse(raw) as Partial<BattlePlanTrackerState>;
    return {
      definitions: parsed.definitions ?? {},
      homework: parsed.homework ?? {},
      drill: parsed.drill ?? {},
    };
  } catch {
    return emptyBattlePlanState;
  }
}

function writeState(nextState: BattlePlanTrackerState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextState }));
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const syncState = () => callback();

  window.addEventListener('storage', syncState);
  window.addEventListener(EVENT_NAME, syncState);
  window.addEventListener('focus', syncState);

  return () => {
    window.removeEventListener('storage', syncState);
    window.removeEventListener(EVENT_NAME, syncState);
    window.removeEventListener('focus', syncState);
  };
}

export function useBattlePlanTracker() {
  const state = useSyncExternalStore(subscribe, readState, () => emptyBattlePlanState);
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const updateState = useCallback((updater: (current: BattlePlanTrackerState) => BattlePlanTrackerState) => {
    const next = updater(readState());
    writeState(next);
  }, []);

  const setDefinitionStatus = useCallback((id: string, status: DefinitionStatus) => {
    updateState((current) => ({
      ...current,
      definitions: {
        ...current.definitions,
        [id]: status,
      },
    }));
  }, [updateState]);

  const setHomeworkStatus = useCallback((id: string, status: HomeworkStatus) => {
    updateState((current) => ({
      ...current,
      homework: {
        ...current.homework,
        [id]: {
          status,
          confidence: current.homework[id]?.confidence ?? 'medium',
        },
      },
    }));
  }, [updateState]);

  const setHomeworkConfidence = useCallback((id: string, confidence: HomeworkConfidence) => {
    updateState((current) => ({
      ...current,
      homework: {
        ...current.homework,
        [id]: {
          status: current.homework[id]?.status ?? 'not-solved',
          confidence,
        },
      },
    }));
  }, [updateState]);

  const setDrillSolved = useCallback((id: string, solved: boolean) => {
    updateState((current) => ({
      ...current,
      drill: {
        ...current.drill,
        [id]: {
          solved,
          difficulty: current.drill[id]?.difficulty ?? 'medium',
        },
      },
    }));
  }, [updateState]);

  const setDrillDifficulty = useCallback((id: string, difficulty: DrillDifficulty) => {
    updateState((current) => ({
      ...current,
      drill: {
        ...current.drill,
        [id]: {
          solved: current.drill[id]?.solved ?? false,
          difficulty,
        },
      },
    }));
  }, [updateState]);

  const resetAll = useCallback(() => {
    updateState(() => emptyBattlePlanState);
  }, [updateState]);

  const snapshot = useMemo(() => buildTrackerSnapshot(state), [state]);

  return {
    state,
    snapshot,
    isHydrated,
    setDefinitionStatus,
    setHomeworkStatus,
    setHomeworkConfidence,
    setDrillSolved,
    setDrillDifficulty,
    resetAll,
  };
}
