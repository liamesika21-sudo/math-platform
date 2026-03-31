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

// ── Cached snapshot to preserve referential equality ──
let cachedRaw: string | null = null;
let cachedState: BattlePlanTrackerState = emptyBattlePlanState;

function readState(): BattlePlanTrackerState {
  if (typeof window === 'undefined') return emptyBattlePlanState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    // Return cached object if the raw string hasn't changed
    if (raw === cachedRaw) return cachedState;
    cachedRaw = raw;
    if (!raw) {
      cachedState = emptyBattlePlanState;
      return cachedState;
    }
    const parsed = JSON.parse(raw) as Partial<BattlePlanTrackerState>;
    cachedState = {
      definitions: parsed.definitions ?? {},
      homework: parsed.homework ?? {},
      drill: parsed.drill ?? {},
    };
    return cachedState;
  } catch {
    cachedState = emptyBattlePlanState;
    return cachedState;
  }
}

function writeState(nextState: BattlePlanTrackerState) {
  if (typeof window === 'undefined') return;
  const raw = JSON.stringify(nextState);
  cachedRaw = raw;
  cachedState = nextState;
  window.localStorage.setItem(STORAGE_KEY, raw);
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
