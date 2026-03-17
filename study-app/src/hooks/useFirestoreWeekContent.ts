'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TheoryItem, PlatformQuestion } from '@/lib/math-platform/types';

interface FirestoreWeekData {
  title?: string;
  summary?: string;
  topics?: string[];
  reviewHighlights?: string[];
  theoryItems?: TheoryItem[];
  tutorialQuestions?: PlatformQuestion[];
  homeworkQuestions?: PlatformQuestion[];
  examQuestions?: PlatformQuestion[];
  status?: string;
}

export function useFirestoreWeekContent(courseId: string, weekId: string) {
  const [data, setData] = useState<FirestoreWeekData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, 'courses', courseId, 'generatedContent', weekId);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setData(snap.data() as FirestoreWeekData);
      } else {
        setData(null);
      }
      setLoading(false);
    }, () => { setLoading(false); });
    return unsub;
  }, [courseId, weekId]);

  return { data, loading };
}
