'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
  Upload, BookOpen, HelpCircle, ClipboardList, FileText,
  CheckCircle2, Eye, Send, X, Plus, ChevronDown, Folder,
} from 'lucide-react';

type ContentType = 'lecture' | 'tutorial' | 'homework' | 'exam';

interface PendingFile {
  id: string;
  file: File;
  type: ContentType | null;
  week: number | null;
  preview: boolean;
}

const typeConfig: Record<ContentType, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  lecture: { label: 'הרצאה', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200', icon: BookOpen },
  tutorial: { label: 'תרגול', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: HelpCircle },
  homework: { label: 'שיעורי בית', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: ClipboardList },
  exam: { label: 'מבחן', color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: FileText },
};

const WEEKS = Array.from({ length: 14 }, (_, i) => i + 1);

export default function CurriculumPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [publishedWeeks] = useState<number[]>([]);
  const [activeWeek, setActiveWeek] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const newPending: PendingFile[] = Array.from(files)
      .filter((f) => f.name.endsWith('.pdf'))
      .map((f) => ({
        id: `${f.name}-${Date.now()}`,
        file: f,
        type: guessType(f.name),
        week: activeWeek,
        preview: false,
      }));
    setPendingFiles((prev) => [...prev, ...newPending]);
  }

  function guessType(filename: string): ContentType | null {
    const lower = filename.toLowerCase();
    if (lower.includes('lecture') || lower.includes('הרצאה') || lower.match(/^l\d/)) return 'lecture';
    if (lower.includes('tutorial') || lower.includes('תרגול') || lower.match(/^t\d/)) return 'tutorial';
    if (lower.includes('hw') || lower.includes('homework') || lower.includes('שיעורי')) return 'homework';
    if (lower.includes('exam') || lower.includes('מבחן')) return 'exam';
    return null;
  }

  function updateFile(id: string, patch: Partial<PendingFile>) {
    setPendingFiles((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeFile(id: string) {
    setPendingFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const readyToPublish = pendingFiles.filter((f) => f.type && f.week);
  const hasUntagged = pendingFiles.some((f) => !f.type || !f.week);

  async function handlePublish() {
    setSubmitting(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append('courseId', courseId);
    for (const pf of readyToPublish) {
      formData.append('files', pf.file);
      formData.append(`type_${pf.file.name}`, pf.type!);
      formData.append(`week_${pf.file.name}`, String(pf.week!));
    }
    try {
      const res = await fetch('/api/admin/curriculum/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error ?? 'שגיאה בהעלאה');
      } else {
        setPublished(readyToPublish.map((f) => f.id));
        setPendingFiles([]);
      }
    } catch {
      setUploadError('שגיאת רשת — נסה שוב');
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ניהול</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">תכנית לימודים</h1>
          <p className="mt-1 text-sm text-slate-500">העלה תוכן שבועי וסווג אותו לפי סוג</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">שבוע פעיל:</label>
          <select
            value={activeWeek}
            onChange={(e) => setActiveWeek(Number(e.target.value))}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm focus:border-indigo-300 focus:outline-none"
          >
            {WEEKS.map((w) => (
              <option key={w} value={w}>שבוע {w}</option>
            ))}
          </select>
        </div>
      </div>

      {uploadError && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <X className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm font-medium text-red-800">שגיאה בהעלאה: {uploadError}</p>
        </div>
      )}

      {published.length > 0 && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" />
          <p className="text-sm font-medium text-emerald-800">
            {published.length} קבצים פורסמו בהצלחה לשבוע {activeWeek}.
          </p>
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`mb-6 rounded-2xl border-2 border-dashed transition ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-white'}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
      >
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
            <Upload className="h-7 w-7 text-indigo-600" />
          </div>
          <p className="text-base font-semibold text-slate-700">גרור קבצים PDF לכאן</p>
          <p className="mt-1 text-sm text-slate-400">או בחר קבצים / תיקייה</p>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              <Plus className="h-4 w-4" />
              בחר קבצים
            </button>
            <button
              onClick={() => folderInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              <Folder className="h-4 w-4" />
              בחר תיקייה
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
          <input ref={folderInputRef} type="file" accept=".pdf" multiple className="hidden"
            // @ts-expect-error – non-standard attribute for folder upload
            webkitdirectory="true"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Pending files */}
      {pendingFiles.length > 0 && (
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700">{pendingFiles.length} קבצים ממתינים לסיווג</h2>
            {hasUntagged && (
              <p className="text-xs text-amber-600">יש לסווג את כל הקבצים לפני פרסום</p>
            )}
          </div>

          <div className="space-y-3">
            {pendingFiles.map((pf) => (
              <div key={pf.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {/* File name */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{pf.file.name}</p>
                  <p className="text-xs text-slate-400">{(pf.file.size / 1024).toFixed(0)} KB</p>
                </div>

                {/* Week selector */}
                <select
                  value={pf.week ?? ''}
                  onChange={(e) => updateFile(pf.id, { week: Number(e.target.value) })}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none"
                >
                  <option value="">שבוע...</option>
                  {WEEKS.map((w) => <option key={w} value={w}>שבוע {w}</option>)}
                </select>

                {/* Type selector */}
                <div className="flex items-center gap-1.5">
                  {(Object.entries(typeConfig) as [ContentType, typeof typeConfig[ContentType]][]).map(([type, cfg]) => {
                    const Icon = cfg.icon;
                    const selected = pf.type === type;
                    return (
                      <button
                        key={type}
                        onClick={() => updateFile(pf.id, { type })}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${selected ? cfg.bg + ' ' + cfg.color : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>

                {/* Preview + Remove */}
                <div className="flex items-center gap-2">
                  <button className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => removeFile(pf.id)} className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Publish bar */}
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-indigo-900">{readyToPublish.length} מתוך {pendingFiles.length} קבצים מוכנים לפרסום</p>
              {hasUntagged && <p className="text-xs text-indigo-500">{pendingFiles.length - readyToPublish.length} קבצים עדיין לא סווגו</p>}
            </div>
            <button
              onClick={handlePublish}
              disabled={readyToPublish.length === 0 || submitting}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {submitting ? 'מפרסם...' : 'פרסם לאתר'}
            </button>
          </div>
        </div>
      )}

      {/* Week overview */}
      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-500">סטטוס שבועות</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {WEEKS.map((w) => {
            const done = publishedWeeks.includes(w);
            return (
              <button
                key={w}
                onClick={() => setActiveWeek(w)}
                className={`rounded-2xl border p-4 text-center transition ${
                  w === activeWeek
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                    : done
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <p className="text-xs font-medium text-slate-500">שבוע</p>
                <p className="text-2xl font-bold text-slate-900">{w}</p>
                {done ? (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 className="h-3 w-3" /> פורסם
                  </span>
                ) : (
                  <span className="mt-1 text-[10px] text-slate-400">ריק</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
