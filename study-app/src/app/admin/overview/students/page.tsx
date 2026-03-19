'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  ArrowLeft, Loader2, MessageSquare, BookMarked, LogIn, ClipboardList,
} from 'lucide-react';

interface StudentRow {
  uid: string;
  name: string;
  email: string;
  chatCount: number;
  totalFeedback: number;
  homeworkFeedback: number;
  visitCount: number;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [studentsSnap, chatsSnap, feedbackSnap] = await Promise.all([
        getDocs(collection(db, 'students')),
        getDocs(collection(db, 'chats')),
        getDocs(collection(db, 'theoryFeedback')),
      ]);

      // Build chat count per userId
      const chatCountMap = new Map<string, number>();
      chatsSnap.forEach((d) => {
        const userId = d.data().userId as string | undefined;
        if (userId) {
          chatCountMap.set(userId, (chatCountMap.get(userId) ?? 0) + 1);
        }
      });

      // Build feedback counts per userId
      const feedbackTotalMap = new Map<string, number>();
      const feedbackHwMap = new Map<string, number>();
      feedbackSnap.forEach((d) => {
        const data = d.data();
        const userId = data.userId as string | undefined;
        if (!userId) return;
        feedbackTotalMap.set(userId, (feedbackTotalMap.get(userId) ?? 0) + 1);
        // Homework items: weekIds that contain "hw" or "tutorial" or "trgol"
        const weekId = (data.weekId as string) ?? '';
        if (/hw|homework|tutorial|trgol|תרגול/i.test(weekId)) {
          feedbackHwMap.set(userId, (feedbackHwMap.get(userId) ?? 0) + 1);
        }
      });

      // Build student rows
      const rows: StudentRow[] = [];
      studentsSnap.forEach((d) => {
        const data = d.data();
        rows.push({
          uid: d.id,
          name: (data.name as string) ?? '',
          email: (data.email as string) ?? '',
          chatCount: chatCountMap.get(d.id) ?? 0,
          totalFeedback: feedbackTotalMap.get(d.id) ?? 0,
          homeworkFeedback: feedbackHwMap.get(d.id) ?? 0,
          visitCount: (data.visitCount as number) ?? 0,
        });
      });

      // Sort by name
      rows.sort((a, b) => a.name.localeCompare(b.name, 'he'));
      setStudents(rows);
      setLoading(false);
    }

    load().catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8" dir="rtl">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-2 flex items-center gap-3">
          <Link
            href="/admin/overview"
            className="flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            חזרה לסקירה
          </Link>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">ניהול</p>
        <h1 className="mt-1 text-2xl font-bold text-white">סטודנטים</h1>
        <p className="mt-1 text-sm text-slate-500">{loading ? 'טוען...' : `${students.length} סטודנטים רשומים`}</p>

        {loading && (
          <div className="mt-8 flex items-center gap-2 text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">טוען נתונים...</span>
          </div>
        )}

        {!loading && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-5 py-3 text-right font-medium">#</th>
                  <th className="px-5 py-3 text-right font-medium">שם</th>
                  <th className="px-5 py-3 text-right font-medium">אימייל</th>
                  <th className="px-5 py-3 text-center font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />
                      שיחות צ׳אט
                    </span>
                  </th>
                  <th className="px-5 py-3 text-center font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <BookMarked className="h-3.5 w-3.5" />
                      סימונים (הכל)
                    </span>
                  </th>
                  <th className="px-5 py-3 text-center font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <ClipboardList className="h-3.5 w-3.5" />
                      סימונים (ש״ב)
                    </span>
                  </th>
                  <th className="px-5 py-3 text-center font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <LogIn className="h-3.5 w-3.5" />
                      כניסות
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={s.uid}
                    className="border-b border-white/5 transition hover:bg-white/5"
                  >
                    <td className="px-5 py-3 tabular-nums text-slate-500">{i + 1}</td>
                    <td className="px-5 py-3 font-medium text-white">{s.name || '—'}</td>
                    <td className="px-5 py-3 text-slate-400">{s.email || '—'}</td>
                    <td className="px-5 py-3 text-center">
                      <Badge value={s.chatCount} color="text-sky-400" />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Badge value={s.totalFeedback} color="text-amber-400" />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Badge value={s.homeworkFeedback} color="text-violet-400" />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Badge value={s.visitCount} color="text-emerald-400" />
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                      אין סטודנטים רשומים
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ value, color }: { value: number; color: string }) {
  return (
    <span className={`inline-block min-w-[2rem] rounded-full bg-white/5 px-2.5 py-0.5 text-sm font-semibold tabular-nums ${color}`}>
      {value}
    </span>
  );
}
