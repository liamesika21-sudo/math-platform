'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import type { CourseId } from '@/lib/math-platform/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type FeedbackStatus = 'got_it' | 'needs_review' | 'lost';

export interface FeedbackDoc {
  courseId: string;
  weekId: string;
  itemId: string;
  userId: string;
  status: FeedbackStatus;
  updatedAt: Timestamp;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface TheoryFeedbackContextValue {
  /** itemId → status for the current user */
  feedback: Record<string, FeedbackStatus>;
  setFeedback: (itemId: string, weekId: string, status: FeedbackStatus | null) => Promise<void>;
  loading: boolean;
}

const TheoryFeedbackContext = createContext<TheoryFeedbackContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TheoryFeedbackProvider({
  courseId,
  children,
}: {
  courseId: CourseId;
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [feedback, setFeedbackMap] = useState<Record<string, FeedbackStatus>>({});
  const [loading, setLoading] = useState(true);

  // Real-time subscription to this user's feedback for the course
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'theoryFeedback'),
      where('courseId', '==', courseId),
      where('userId', '==', user.uid),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const map: Record<string, FeedbackStatus> = {};
        snap.forEach((d) => {
          const data = d.data() as FeedbackDoc;
          map[data.itemId] = data.status;
        });
        setFeedbackMap(map);
        setLoading(false);
      },
      (err) => {
        console.error('[TheoryFeedback] onSnapshot error:', err.code, err.message);
        setLoading(false);
      },
    );

    return unsub;
  }, [user, courseId]);

  const setFeedback = useCallback(
    async (itemId: string, weekId: string, status: FeedbackStatus | null) => {
      if (!user) return;
      // Deterministic doc ID — allows cheap upsert, no duplicates
      const docId = `${courseId}__${itemId}__${user.uid}`;
      const ref = doc(db, 'theoryFeedback', docId);

      try {
        if (status === null) {
          await deleteDoc(ref);
        } else {
          await setDoc(ref, {
            courseId,
            weekId,
            itemId,
            userId: user.uid,
            status,
            updatedAt: Timestamp.now(),
          } satisfies FeedbackDoc);
        }
      } catch (err: unknown) {
        const e = err as { code?: string; message?: string };
        console.error('[TheoryFeedback] write error:', e.code, e.message);
      }
    },
    [user, courseId],
  );

  return (
    <TheoryFeedbackContext.Provider value={{ feedback, setFeedback, loading }}>
      {children}
    </TheoryFeedbackContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const NO_OP_CTX: TheoryFeedbackContextValue = {
  feedback: {},
  setFeedback: async () => {},
  loading: false,
};

/** Safe to call outside provider — returns no-op context so cards still render. */
export function useTheoryFeedback() {
  return useContext(TheoryFeedbackContext) ?? NO_OP_CTX;
}
