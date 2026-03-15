'use client';

import { useEffect, useState } from 'react';
import { dbHelpers } from '@/lib/db';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface HealthData {
  totalFiles: number;
  totalPages: number;
  totalDefinitions: number;
  totalTheorems: number;
  totalProofs: number;
  totalHWQuestions: number;
  totalExamQuestions: number;
  lectureCount: number;
  tutorialCount: number;
  homeworkCount: number;
  examCount: number;
}

export default function DataHealth() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealth();
  }, []);

  async function loadHealth() {
    try {
      const files = await dbHelpers.getAllFiles();
      const knowledgeItems = await dbHelpers.getAllKnowledgeItems();
      const hwQuestions = await dbHelpers.getAllHomeworkQuestions();
      const examQuestions = await dbHelpers.getAllExamQuestions();

      const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);
      const definitions = knowledgeItems.filter(k => k.type === 'definition').length;
      const theorems = knowledgeItems.filter(k => ['theorem', 'lemma', 'corollary'].includes(k.type)).length;
      const proofs = knowledgeItems.filter(k => k.type === 'proof').length;

      setHealth({
        totalFiles: files.length,
        totalPages,
        totalDefinitions: definitions,
        totalTheorems: theorems,
        totalProofs: proofs,
        totalHWQuestions: hwQuestions.length,
        totalExamQuestions: examQuestions.length,
        lectureCount: files.filter(f => f.category === 'lecture').length,
        tutorialCount: files.filter(f => f.category === 'tutorial').length,
        homeworkCount: files.filter(f => f.category === 'homework').length,
        examCount: files.filter(f => f.category === 'exam').length,
      });
    } catch (error) {
      console.error('Error loading health data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <XCircle className="text-red-600 dark:text-red-400" size={24} />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">Failed to Load Data</h3>
            <p className="text-sm text-red-700 dark:text-red-300">Cannot read from database</p>
          </div>
        </div>
      </div>
    );
  }

  const hasData = health.totalFiles > 0;
  const hasContent = health.totalDefinitions > 0 || health.totalTheorems > 0;

  return (
    <div className={`rounded-lg border p-6 ${
      !hasData
        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        : !hasContent
        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
        : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {!hasData ? (
          <>
            <XCircle className="text-red-600 dark:text-red-400" size={24} />
            <h3 className="font-bold text-red-900 dark:text-red-100">SYSTEM FAILURE - NO DATA</h3>
          </>
        ) : !hasContent ? (
          <>
            <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            <h3 className="font-bold text-yellow-900 dark:text-yellow-100">WARNING - NO CONTENT EXTRACTED</h3>
          </>
        ) : (
          <>
            <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
            <h3 className="font-bold text-green-900 dark:text-green-100">System Healthy</h3>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <HealthItem label="PDF Files" value={health.totalFiles} critical={health.totalFiles === 0} />
        <HealthItem label="Total Pages" value={health.totalPages} critical={health.totalPages === 0} />
        <HealthItem label="Lectures" value={health.lectureCount} />
        <HealthItem label="Tutorials" value={health.tutorialCount} />
        <HealthItem label="Homework" value={health.homeworkCount} />
        <HealthItem label="Exams" value={health.examCount} />
        <HealthItem label="Definitions" value={health.totalDefinitions} critical={health.totalDefinitions === 0} />
        <HealthItem label="Theorems" value={health.totalTheorems} critical={health.totalTheorems === 0} />
        <HealthItem label="Proofs" value={health.totalProofs} />
        <HealthItem label="HW Questions" value={health.totalHWQuestions} />
        <HealthItem label="Exam Questions" value={health.totalExamQuestions} />
      </div>

      {!hasData && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/40 rounded">
          <p className="text-sm text-red-900 dark:text-red-100 font-semibold">
            Add PDF files to: <code className="bg-red-200 dark:bg-red-800 px-2 py-1 rounded">/Users/liamesika/Desktop/infi/study-app/files</code>
          </p>
          <p className="text-sm text-red-800 dark:text-red-200 mt-2">
            Then refresh the page to auto-process.
          </p>
        </div>
      )}

      {hasData && !hasContent && (
        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/40 rounded">
          <p className="text-sm text-yellow-900 dark:text-yellow-100 font-semibold">
            Files were loaded but no content was extracted.
          </p>
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
            PDFs may be scanned images or have extraction issues.
          </p>
        </div>
      )}
    </div>
  );
}

function HealthItem({ label, value, critical = false }: { label: string; value: number; critical?: boolean }) {
  return (
    <div className={`p-3 rounded ${critical && value === 0 ? 'bg-red-100 dark:bg-red-900/40' : 'bg-white dark:bg-gray-800'}`}>
      <div className={`text-2xl font-bold ${critical && value === 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}
