'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { dbHelpers } from '@/lib/db';

interface DebugInfo {
  resolvedFilesDir: string;
  doesPathExist: boolean;
  scannedPDFs: Array<{ name: string; path: string; size: number }>;
  scanError: string | null;
  selectedPDF: {
    name: string;
    totalPages: number;
    pages: Array<{ pageNum: number; text: string; error?: string }>;
    extractionError: string | null;
  } | null;
  dbCounts: {
    filesCount: number;
    extractedItemsCount: number;
    questionsCount: number;
    definitionsCount: number;
    theoremsCount: number;
    proofsCount: number;
    homeworkQuestionsCount: number;
    examQuestionsCount: number;
  };
}

export default function DebugPage() {
  const [debug, setDebug] = useState<DebugInfo | null>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedPDFPath, setSelectedPDFPath] = useState<string>('');

  useEffect(() => {
    loadDebugInfo();
  }, []);

  async function loadDebugInfo() {
    try {
      // Scan files
      const scanResponse = await fetch('/api/files/scan');
      const scanData = await scanResponse.json();

      // Get DB counts
      const files = await dbHelpers.getAllFiles();
      const knowledgeItems = await dbHelpers.getAllKnowledgeItems();
      const hwQuestions = await dbHelpers.getAllHomeworkQuestions();
      const examQuestions = await dbHelpers.getAllExamQuestions();

      const definitions = knowledgeItems.filter(k => k.type === 'definition');
      const theorems = knowledgeItems.filter(k => ['theorem', 'lemma', 'corollary'].includes(k.type));
      const proofs = knowledgeItems.filter(k => k.type === 'proof');

      setDebug({
        resolvedFilesDir: '/Users/liamesika/Desktop/infi/study-app/files',
        doesPathExist: !scanData.error,
        scannedPDFs: scanData.files || [],
        scanError: scanData.error || null,
        selectedPDF: null,
        dbCounts: {
          filesCount: files.length,
          extractedItemsCount: knowledgeItems.length,
          questionsCount: hwQuestions.length + examQuestions.length,
          definitionsCount: definitions.length,
          theoremsCount: theorems.length,
          proofsCount: proofs.length,
          homeworkQuestionsCount: hwQuestions.length,
          examQuestionsCount: examQuestions.length,
        },
      });
    } catch (error) {
      console.error('Debug load error:', error);
      setDebug({
        resolvedFilesDir: '/Users/liamesika/Desktop/infi/study-app/files',
        doesPathExist: false,
        scannedPDFs: [],
        scanError: error instanceof Error ? error.message : 'Unknown error',
        selectedPDF: null,
        dbCounts: {
          filesCount: 0,
          extractedItemsCount: 0,
          questionsCount: 0,
          definitionsCount: 0,
          theoremsCount: 0,
          proofsCount: 0,
          homeworkQuestionsCount: 0,
          examQuestionsCount: 0,
        },
      });
    }
  }

  async function extractSamplePDF(pdfPath: string, pdfName: string) {
    setProcessing(true);
    try {
      const response = await fetch(`/api/files/read?path=${encodeURIComponent(pdfPath)}`);
      const arrayBuffer = await response.arrayBuffer();

      const pdfjsLib = await import('pdfjs-dist');

      // Set worker to local file
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
      }

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      const pages: Array<{ pageNum: number; text: string; error?: string }> = [];
      const maxPages = Math.min(3, totalPages);

      for (let i = 1; i <= maxPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str || '').join(' ');
          const preview = pageText.substring(0, 2000);
          pages.push({ pageNum: i, text: preview });
        } catch (pageError) {
          pages.push({
            pageNum: i,
            text: '',
            error: pageError instanceof Error ? pageError.message : 'Unknown error',
          });
        }
      }

      setDebug(prev => prev ? {
        ...prev,
        selectedPDF: {
          name: pdfName,
          totalPages,
          pages,
          extractionError: null,
        },
      } : null);
    } catch (error) {
      setDebug(prev => prev ? {
        ...prev,
        selectedPDF: {
          name: pdfName,
          totalPages: 0,
          pages: [],
          extractionError: error instanceof Error ? error.message : 'Unknown error',
        },
      } : null);
    } finally {
      setProcessing(false);
    }
  }

  if (!debug) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">Loading debug info...</div>
        </div>
      </Layout>
    );
  }

  const hasData = debug.dbCounts.filesCount > 0;
  const hasExtraction = debug.dbCounts.extractedItemsCount > 0;
  const hasPDFs = debug.scannedPDFs.length > 0;

  return (
    <Layout>
      <div className="p-6 pb-20 lg:pb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">System Debug</h1>

        {/* Status Summary */}
        <div className={`p-6 rounded-lg mb-6 ${
          hasData && hasExtraction ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
          hasPDFs && hasData ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
          'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <h2 className="text-xl font-bold mb-2">
            {hasData && hasExtraction ? '✅ SYSTEM OPERATIONAL' :
             hasPDFs && hasData ? '⚠️ EXTRACTION ISSUE' :
             hasPDFs ? '❌ DATABASE WRITE FAILURE' :
             '❌ SCAN FAILURE'}
          </h2>
          <p className="text-sm">
            {hasData && hasExtraction ? 'Data is indexed and ready.' :
             hasPDFs && hasData ? 'PDFs are stored but no content extracted.' :
             hasPDFs ? 'PDFs found but not stored in database.' :
             'No PDFs detected in source directory.'}
          </p>
        </div>

        {/* 1. File System Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. File System</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Resolved Path:</span>{' '}
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">{debug.resolvedFilesDir}</code>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Path Exists:</span>{' '}
              <span className={debug.doesPathExist ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {debug.doesPathExist ? 'TRUE' : 'FALSE'}
              </span>
            </div>
            {debug.scanError && (
              <div className="text-red-600 dark:text-red-400 mt-2">
                <strong>Scan Error:</strong> {debug.scanError}
              </div>
            )}
          </div>
        </div>

        {/* 2. Scanned PDFs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            2. Scanned PDFs ({debug.scannedPDFs.length} found)
          </h2>
          {debug.scannedPDFs.length === 0 ? (
            <div className="text-red-600 dark:text-red-400 font-bold">
              ❌ NO PDFs FOUND - Check that files exist in the directory
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {debug.scannedPDFs.slice(0, 50).map((pdf, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">{pdf.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">{(pdf.size / 1024).toFixed(1)} KB</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPDFPath(pdf.path);
                      extractSamplePDF(pdf.path, pdf.name);
                    }}
                    disabled={processing}
                    className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm rounded"
                  >
                    Extract Sample
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Sample PDF Extraction */}
        {debug.selectedPDF && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              3. Sample Extraction: {debug.selectedPDF.name}
            </h2>
            {debug.selectedPDF.extractionError ? (
              <div className="text-red-600 dark:text-red-400 font-bold">
                ❌ EXTRACTION ERROR: {debug.selectedPDF.extractionError}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Total Pages:</span>{' '}
                  <span className="font-bold">{debug.selectedPDF.totalPages}</span>
                </div>
                {debug.selectedPDF.pages.map((page) => (
                  <div key={page.pageNum} className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
                    <h3 className="font-bold mb-2">Page {page.pageNum} (first 2,000 chars)</h3>
                    {page.error ? (
                      <div className="text-red-600 dark:text-red-400">Error: {page.error}</div>
                    ) : (
                      <pre className="text-xs whitespace-pre-wrap break-words overflow-x-auto">
                        {page.text || '(empty)'}
                      </pre>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* 4. IndexedDB Counts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. IndexedDB Counts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded ${debug.dbCounts.filesCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.filesCount}</div>
              <div className="text-sm">Files Stored</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.extractedItemsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.extractedItemsCount}</div>
              <div className="text-sm">Total Extracted Items</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.definitionsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.definitionsCount}</div>
              <div className="text-sm">Definitions</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.theoremsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.theoremsCount}</div>
              <div className="text-sm">Theorems</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.proofsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.proofsCount}</div>
              <div className="text-sm">Proofs</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.homeworkQuestionsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.homeworkQuestionsCount}</div>
              <div className="text-sm">HW Questions</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.examQuestionsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.examQuestionsCount}</div>
              <div className="text-sm">Exam Questions</div>
            </div>
            <div className={`p-4 rounded ${debug.dbCounts.questionsCount > 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900'}`}>
              <div className="text-2xl font-bold">{debug.dbCounts.questionsCount}</div>
              <div className="text-sm">Total Questions</div>
            </div>
          </div>

          {debug.dbCounts.filesCount === 0 && debug.scannedPDFs.length > 0 && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/40 rounded text-red-900 dark:text-red-100">
              <strong>❌ DATABASE WRITE FAILURE:</strong> PDFs were scanned but not written to IndexedDB.
              Check browser console for errors.
            </div>
          )}

          {debug.dbCounts.filesCount > 0 && debug.dbCounts.extractedItemsCount === 0 && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/40 rounded text-yellow-900 dark:text-yellow-100">
              <strong>⚠️ EXTRACTION ISSUE:</strong> Files are stored but no knowledge items were extracted.
              PDFs may contain only images or have text extraction failures.
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mr-4"
          >
            Clear LocalStorage & Reload
          </button>
          <button
            onClick={() => loadDebugInfo()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Refresh Debug Info
          </button>
        </div>
      </div>
    </Layout>
  );
}
