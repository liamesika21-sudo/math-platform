'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getTheoryItemsForWeek, getCourseWeeks } from '@/lib/math-platform/data';
import type { CourseId, TheoryItem, TheoryKind } from '@/lib/math-platform/types';

interface FirestoreTheoryItem {
  kind: string;
  title: string;
  content: string;
  sourcePage?: number;
  hidden?: boolean;
  important?: boolean;
  lecturerNote?: string;
}

/**
 * Fetches all generatedContent for a course from Firestore and merges with static data.
 * Returns a Map from static item id → merged TheoryItem (or null if hidden).
 * While loading, returns an empty map (caller should fall back to static data).
 */
export function useFirestoreTheoryItems(courseId: CourseId): Map<string, TheoryItem | null> {
  const [overrideMap, setOverrideMap] = useState<Map<string, TheoryItem | null>>(new Map());

  useEffect(() => {
    getDocs(collection(db, 'courses', courseId, 'generatedContent'))
      .then(snap => {
        if (snap.empty) return;

        const map = new Map<string, TheoryItem | null>();

        snap.forEach(weekDoc => {
          const weekId = weekDoc.id;
          const data = weekDoc.data() as { theoryItems?: FirestoreTheoryItem[] };
          const firestoreItems = data.theoryItems ?? [];
          if (!firestoreItems.length) return;

          const staticItems = getTheoryItemsForWeek(weekId);
          staticItems.forEach((staticItem, i) => {
            const fItem = firestoreItems[i];
            if (!fItem) return;
            if (fItem.hidden) {
              map.set(staticItem.id, null);
            } else {
              map.set(staticItem.id, {
                ...staticItem,
                title: fItem.title ?? staticItem.title,
                content: fItem.content ?? staticItem.content,
                kind: (fItem.kind as TheoryKind) ?? staticItem.kind,
                sourcePage: fItem.sourcePage ?? staticItem.sourcePage,
              });
            }
          });
        });

        setOverrideMap(map);
      })
      .catch(() => { /* silently fall back to static data */ });
  }, [courseId]);

  return overrideMap;
}

/**
 * Applies the override map to a list of static items.
 * Items with null override (hidden) are removed.
 * Items with an override have Firestore fields applied.
 * If overrideMap is empty (still loading), returns staticItems as-is.
 */
export function applyOverrides(
  staticItems: TheoryItem[],
  overrideMap: Map<string, TheoryItem | null>,
): TheoryItem[] {
  if (overrideMap.size === 0) return staticItems;
  return staticItems
    .map(item => {
      if (!overrideMap.has(item.id)) return item;
      return overrideMap.get(item.id) ?? null;
    })
    .filter((item): item is TheoryItem => item !== null);
}
