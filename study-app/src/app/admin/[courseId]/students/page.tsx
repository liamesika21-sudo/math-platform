'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
  Users, Upload, Search, Filter, MoreHorizontal,
  CheckCircle2, Clock, XCircle, Download, Plus,
  ChevronDown, Mail, Hash,
} from 'lucide-react';

interface Student {
  uid: string;
  name: string;
  email: string;
  studentId: string;
  enrolledAt: string;
  lastActivity: string;
  progress: number;
  status: 'active' | 'inactive' | 'at-risk';
}

const statusConfig = {
  active: { label: 'פעיל', color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  inactive: { label: 'לא פעיל', color: 'bg-slate-100 text-slate-600', icon: Clock },
  'at-risk': { label: 'בסיכון', color: 'bg-red-50 text-red-600', icon: XCircle },
};

export default function StudentsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [students] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [importMode, setImportMode] = useState<'idle' | 'uploading' | 'preview' | 'done'>('idle');
  const [importRows, setImportRows] = useState<{ name: string; email: string; studentId: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.includes(search)
  );

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMode('uploading');

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.trim().split('\n');
      const rows = lines.slice(1).map((line) => {
        const cols = line.split(',');
        return {
          name: cols[0]?.trim() ?? '',
          email: cols[1]?.trim() ?? '',
          studentId: cols[2]?.trim() ?? '',
        };
      }).filter((r) => r.email);
      setImportRows(rows);
      setImportMode('preview');
    };
    reader.readAsText(file);
  }

  async function handleImportConfirm() {
    // POST to API → Firebase batch create users
    await fetch(`/api/admin/students/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, students: importRows }),
    });
    setImportMode('done');
    setImportRows([]);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">סטודנטים</h1>
          <p className="mt-1 text-sm text-slate-500">{students.length} סטודנטים רשומים</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
          >
            <Upload className="h-4 w-4" />
            ייבוא מ-Excel / SQL
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500">
            <Plus className="h-4 w-4" />
            הוסף ידנית
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Import preview modal */}
      {importMode === 'preview' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-1 text-lg font-bold text-slate-900">אישור ייבוא</h2>
            <p className="mb-4 text-sm text-slate-500">נמצאו {importRows.length} סטודנטים לייבוא</p>

            <div className="mb-4 max-h-64 overflow-y-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-2 text-right">שם</th>
                    <th className="px-4 py-2 text-right">אימייל</th>
                    <th className="px-4 py-2 text-right">ת.ז. / מספר סטודנט</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {importRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-medium text-slate-900">{row.name}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.email}</td>
                      <td className="px-4 py-2.5 text-slate-600">{row.studentId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
              יישלח אימייל לכל סטודנט עם פרטי גישה ראשוניים.
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setImportMode('idle')}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
              >
                ביטול
              </button>
              <button
                onClick={handleImportConfirm}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
              >
                אשר ייבוא
              </button>
            </div>
          </div>
        </div>
      )}

      {importMode === 'done' && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800">הייבוא הושלם בהצלחה. הסטודנטים נוספו ל-Firebase.</p>
        </div>
      )}

      {/* Filters bar */}
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="חיפוש לפי שם, אימייל, ת.ז..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-4 text-sm shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
          <Filter className="h-4 w-4" />
          סינון
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
          <Download className="h-4 w-4" />
          ייצוא
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users className="mb-4 h-14 w-14 text-slate-200" />
            <p className="text-base font-semibold text-slate-400">אין סטודנטים עדיין</p>
            <p className="mt-1 text-sm text-slate-300">ייבא סטודנטים מקובץ Excel או CSV</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20"
            >
              <Upload className="h-4 w-4" />
              ייבא סטודנטים
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3 text-right">
                  <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />סטודנט</div>
                </th>
                <th className="px-6 py-3 text-right">
                  <div className="flex items-center gap-2"><Hash className="h-3.5 w-3.5" />UID</div>
                </th>
                <th className="px-6 py-3 text-right">
                  <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />אימייל</div>
                </th>
                <th className="px-6 py-3 text-right">התקדמות</th>
                <th className="px-6 py-3 text-right">סטטוס</th>
                <th className="px-6 py-3 text-right">פעילות אחרונה</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => {
                const status = statusConfig[student.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={student.uid} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-400">{student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{student.uid.slice(0, 12)}…</td>
                    <td className="px-6 py-4 text-slate-600">{student.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-indigo-600" style={{ width: `${student.progress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.color}`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">{student.lastActivity}</td>
                    <td className="px-6 py-4">
                      <button className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* CSV format hint */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-xs text-slate-500 shadow-sm">
        <span className="font-semibold text-slate-700">פורמט CSV נדרש:</span>{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">name,email,studentId</code>
        {' '}— שורה ראשונה היא כותרת, שורות הבאות הן הנתונים.
      </div>
    </div>
  );
}
