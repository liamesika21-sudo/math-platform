'use client';

import { useEffect, useState } from 'react';
import { dbHelpers } from '@/lib/db';
import { extractKnowledgeItems, extractHomeworkQuestions, extractExamQuestions, suggestCategory, extractIndexNumber, generateDisplayTag } from '@/lib/pdf-extractor';
import { calculateLikelihoodScores, linkKnowledgeToQuestions, calculateHomeworkLikelihood } from '@/lib/analysis';
import type { UploadedFile } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface InitStatus {
  isInitialized: boolean;
  isProcessing: boolean;
  currentFile: string | null;
  processedCount: number;
  totalCount: number;
  error: string | null;
}

export function useAutoInit() {
  const [status, setStatus] = useState<InitStatus>({
    isInitialized: false,
    isProcessing: false,
    currentFile: null,
    processedCount: 0,
    totalCount: 0,
    error: null,
  });

  useEffect(() => {
    initializeSystem();
  }, []);

  async function initializeSystem() {
    try {
      // Check if initialization was previously completed successfully
      if (typeof window !== 'undefined') {
        const initComplete = localStorage.getItem('infi-init-complete');
        if (initComplete === 'true') {
          const existingFiles = await dbHelpers.getAllFiles();

          // Verify data actually exists - if not, clear flag and reprocess
          if (existingFiles.length > 0) {
            setStatus({
              isInitialized: true,
              isProcessing: false,
              currentFile: null,
              processedCount: existingFiles.length,
              totalCount: existingFiles.length,
              error: null,
            });
            return;
          } else {
            // Flag was set but no data exists - clear and reprocess
            localStorage.removeItem('infi-init-complete');
          }
        }
      }

      // Start processing
      setStatus(prev => ({ ...prev, isProcessing: true }));

      // Scan source directory
      const response = await fetch('/api/files/scan');
      const data = await response.json();

      if (!data.files || data.files.length === 0) {
        setStatus({
          isInitialized: false,
          isProcessing: false,
          currentFile: null,
          processedCount: 0,
          totalCount: 0,
          error: 'No PDF files found in /files directory',
        });
        return;
      }

      const sourceFiles = data.files;
      setStatus(prev => ({ ...prev, totalCount: sourceFiles.length }));

      // Process all files
      for (let i = 0; i < sourceFiles.length; i++) {
        const sourceFile = sourceFiles[i];
        setStatus(prev => ({ ...prev, currentFile: sourceFile.name, processedCount: i }));

        await processFile(sourceFile);
      }

      // Recalculate all scores
      await recalculateLikelihood();

      // Mark initialization as complete
      if (typeof window !== 'undefined') {
        localStorage.setItem('infi-init-complete', 'true');
      }

      setStatus({
        isInitialized: true,
        isProcessing: false,
        currentFile: null,
        processedCount: sourceFiles.length,
        totalCount: sourceFiles.length,
        error: null,
      });

    } catch (error) {
      console.error('Initialization error:', error);
      setStatus(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    }
  }

  async function processFile(sourceFile: { name: string; path: string; size: number }) {
    const fileId = uuidv4();

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

      // Detect category
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

      await dbHelpers.addFile(uploadedFile);

      // Extract knowledge - VERBATIM
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
    } catch (error) {
      console.error(`Error processing ${sourceFile.name}:`, error);
    }
  }

  async function recalculateLikelihood() {
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

    const updatedHW = calculateHomeworkLikelihood(hwQuestions, examQuestions);
    for (const hw of updatedHW) {
      await dbHelpers.updateHomeworkQuestion(hw.id, {
        examLikelihoodScore: hw.examLikelihoodScore,
        similarityToExams: hw.similarityToExams,
        matchingExamQuestions: hw.matchingExamQuestions,
      });
    }
  }

  return status;
}
