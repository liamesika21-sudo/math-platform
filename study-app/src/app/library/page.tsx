'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { dbHelpers } from '@/lib/db';
import { extractKnowledgeItems, extractHomeworkQuestions, extractExamQuestions, suggestCategory, extractIndexNumber, generateDisplayTag } from '@/lib/pdf-extractor';
import { calculateLikelihoodScores, linkKnowledgeToQuestions } from '@/lib/analysis';
import type { UploadedFile, FileCategory } from '@/types';
import { RefreshCw, FileText, AlertCircle, CheckCircle2, Clock, Eye } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SourceFile {
  name: string;
  path: string;
  size: number;
  modifiedAt: string;
}

interface ProcessingStatus {
  fileId: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  extractedCount?: number;
}

export default function SourceMonitorPage() {
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [processedFiles, setProcessedFiles] = useState<UploadedFile[]>([]);
  const [processingStatus, setProcessingStatus] = useState<Map<string, ProcessingStatus>>(new Map());
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  useEffect(() => {
    loadProcessedFiles();
    scanSourceDirectory();
  }, []);

  useEffect(() => {
    // Auto-process if no files processed yet and source files are available
    if (!loading && processedFiles.length === 0 && sourceFiles.length > 0 && !processing) {
      // Always process if no data exists, ignore the flag
      localStorage.setItem('infi-auto-processed', 'true');
      processAllFiles();
    }
  }, [loading, processedFiles.length, sourceFiles.length]);

  async function loadProcessedFiles() {
    try {
      const files = await dbHelpers.getAllFiles();
      setProcessedFiles(files);
    } catch (error) {
      console.error('Error loading processed files:', error);
    }
  }

  async function scanSourceDirectory() {
    setScanning(true);
    try {
      const response = await fetch('/api/files/scan');
      const data = await response.json();

      if (data.files) {
        setSourceFiles(data.files);
        setLastScanTime(new Date());
      }
    } catch (error) {
      console.error('Error scanning source directory:', error);
      alert('Failed to scan source directory');
    } finally {
      setScanning(false);
      setLoading(false);
    }
  }

  async function processFile(sourceFile: SourceFile) {
    const fileId = uuidv4();

    setProcessingStatus(prev => new Map(prev).set(fileId, {
      fileId,
      status: 'processing',
      progress: 0,
    }));

    try {
      // Use server-side extraction API (no browser PDF.js issues)
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: sourceFile.path }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Extraction failed');
      }

      const { pages, fullText, pageCount } = result;

      // Auto-detect category
      const category = suggestCategory(sourceFile.name, fullText);
      const indexNumber = extractIndexNumber(sourceFile.name);
      const displayTag = generateDisplayTag(category, indexNumber, sourceFile.name);

      const uploadedFile: UploadedFile = {
        id: fileId,
        name: sourceFile.name,
        category,
        indexNumber,
        displayTag,
        uploadedAt: new Date(),
        fileSize: sourceFile.size,
        pageCount,
        extractedText: fullText,
        isProcessed: true,
      };

      // Save file
      await dbHelpers.addFile(uploadedFile);

      // Extract knowledge items with VERBATIM text
      const knowledgeItems = extractKnowledgeItems(pages, fileId, sourceFile.name);
      if (knowledgeItems.length > 0) {
        await dbHelpers.addKnowledgeItems(knowledgeItems);
      }

      // Extract questions
      if (category === 'homework') {
        const hwQuestions = extractHomeworkQuestions(pages, fileId, sourceFile.name, indexNumber);
        if (hwQuestions.length > 0) {
          await dbHelpers.addHomeworkQuestions(hwQuestions);
        }
      } else if (category === 'exam') {
        const examQuestions = extractExamQuestions(pages, fileId, sourceFile.name);
        if (examQuestions.length > 0) {
          await dbHelpers.addExamQuestions(examQuestions);
        }
      }

      setProcessingStatus(prev => new Map(prev).set(fileId, {
        fileId,
        status: 'completed',
        progress: 100,
        extractedCount: knowledgeItems.length,
      }));

      await loadProcessedFiles();

    } catch (error) {
      console.error('Error processing file:', error);
      setProcessingStatus(prev => new Map(prev).set(fileId, {
        fileId,
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }

  async function processAllFiles() {
    setProcessing(true);

    for (const sourceFile of sourceFiles) {
      // Check if already processed
      const existing = processedFiles.find(f => f.name === sourceFile.name);
      if (existing) continue;

      await processFile(sourceFile);
    }

    // Recalculate likelihood scores
    await recalculateLikelihood();

    setProcessing(false);
  }

  async function recalculateLikelihood() {
    try {
      const knowledgeItems = await dbHelpers.getAllKnowledgeItems();
      const examQuestions = await dbHelpers.getAllExamQuestions();
      const hwQuestions = await dbHelpers.getAllHomeworkQuestions();

      const updatedItems = calculateLikelihoodScores(knowledgeItems, examQuestions, hwQuestions);
      const linkedItems = linkKnowledgeToQuestions(updatedItems, [...examQuestions, ...hwQuestions]);

      for (const item of linkedItems) {
        await dbHelpers.updateKnowledgeItem(item.id, {
          likelihoodScore: item.likelihoodScore,
          linkedQuestionIds: item.linkedQuestionIds,
        });
      }

      // Also calculate homework likelihood
      const { calculateHomeworkLikelihood } = await import('@/lib/analysis');
      const updatedHW = calculateHomeworkLikelihood(hwQuestions, examQuestions);
      for (const hw of updatedHW) {
        await dbHelpers.updateHomeworkQuestion(hw.id, {
          examLikelihoodScore: hw.examLikelihoodScore,
          similarityToExams: hw.similarityToExams,
          matchingExamQuestions: hw.matchingExamQuestions,
        });
      }
    } catch (error) {
      console.error('Error recalculating likelihood:', error);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">סורק את תיקיית המקורות...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ניטור מקורות</h1>
            <div className="flex gap-2">
              <button
                onClick={scanSourceDirectory}
                disabled={scanning}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw size={16} className={scanning ? 'animate-spin' : ''} />
                <span>{scanning ? 'סורק...' : 'סרוק מחדש'}</span>
              </button>
              <button
                onClick={processAllFiles}
                disabled={processing || sourceFiles.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>מעבד...</span>
                  </>
                ) : (
                  <>
                    <FileText size={16} />
                    <span>עבד את כל הקבצים</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            קובצי PDF מתיקיית: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">/Users/liamesika/Desktop/infi/study-app/files</code>
          </p>
          {lastScanTime && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              סריקה אחרונה: {lastScanTime.toLocaleString('he-IL')}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sourceFiles.length}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">קבצים בתיקייה</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{processedFiles.length}</div>
            <div className="text-sm text-green-700 dark:text-green-300">קבצים מעובדים</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {sourceFiles.length - processedFiles.length}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300">ממתינים לעיבוד</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Array.from(processingStatus.values()).filter(s => s.status === 'error').length}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">שגיאות</div>
          </div>
        </div>

        {/* File List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">קבצי מקור</h2>

          {sourceFiles.length === 0 ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
              <AlertCircle size={48} className="mx-auto text-yellow-600 dark:text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                לא נמצאו קבצי PDF
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                הוסף קבצי PDF לתיקייה: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-2 py-1 rounded text-sm">/Users/liamesika/Desktop/infi/study-app/files</code>
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {sourceFiles.map((sourceFile) => {
                const processed = processedFiles.find(f => f.name === sourceFile.name);
                const status = processed
                  ? { status: 'completed' as const, extractedCount: 0 }
                  : Array.from(processingStatus.values()).find(s => s.fileId === sourceFile.name) || null;

                return (
                  <div
                    key={sourceFile.path}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="text-gray-400" size={20} />
                          <h3 className="font-semibold text-gray-900 dark:text-white">{sourceFile.name}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>{(sourceFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          <span>•</span>
                          <span>{new Date(sourceFile.modifiedAt).toLocaleDateString('he-IL')}</span>
                        </div>
                        {processed && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{processed.displayTag}</span>
                            <span className="mx-2">•</span>
                            <span>{processed.pageCount} עמודים</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {processed ? (
                          <>
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                              <span className="text-sm font-medium text-green-700 dark:text-green-300">מעובד</span>
                            </div>
                            <button
                              onClick={() => setSelectedFile(processed)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              title="צפה בקובץ"
                            >
                              <Eye size={20} className="text-gray-600 dark:text-gray-400" />
                            </button>
                          </>
                        ) : status?.status === 'processing' ? (
                          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">מעבד...</span>
                          </div>
                        ) : status?.status === 'error' ? (
                          <div className="flex items-center gap-2 px-3 py-1 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
                            <span className="text-sm font-medium text-red-700 dark:text-red-300">שגיאה</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => processFile(sourceFile)}
                            disabled={processing}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            <Clock size={16} />
                            <span>עבד</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {status?.status === 'error' && status.error && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-700 dark:text-red-300">{status.error}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PDF Viewer Modal */}
        {selectedFile && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFile(null)}>
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedFile.name}</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                    {selectedFile.extractedText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
