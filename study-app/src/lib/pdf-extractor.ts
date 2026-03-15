import type { KnowledgeItem, KnowledgeItemType, Topic, ExamQuestion, HomeworkQuestion, FileCategory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface ExtractedPage {
  pageNumber: number;
  text: string;
  lines: string[];
}

export interface PDFExtractionResult {
  pageCount: number;
  pages: ExtractedPage[];
  fullText: string;
}

// Extract text from PDF
export async function extractTextFromPDF(pdfData: ArrayBuffer): Promise<PDFExtractionResult> {
  // Dynamic import to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist');

  // Configure worker
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const pages: ExtractedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    const textItems = textContent.items.map((item) => {
      if ('str' in item) {
        return item.str;
      }
      return '';
    });

    const text = textItems.join(' ');
    const lines = text.split(/\n/).filter(line => line.trim());

    pages.push({
      pageNumber: i,
      text,
      lines,
    });
  }

  return {
    pageCount: pdf.numPages,
    pages,
    fullText: pages.map(p => p.text).join('\n\n'),
  };
}

// Hebrew math keywords for detection
const HEBREW_KEYWORDS = {
  definition: ['הגדרה', 'מוגדר', 'נגדיר', 'definition'],
  theorem: ['משפט', 'theorem', 'thm'],
  lemma: ['למה', 'lemma'],
  corollary: ['מסקנה', 'corollary', 'cor'],
  proof: ['הוכחה', 'proof', 'pf', 'נוכיח'],
  technique: ['טכניקה', 'שיטה', 'technique', 'method'],
  conclusion: ['סיכום', 'מסקנה', 'conclusion', 'summary'],
};

const TOPIC_KEYWORDS: Record<Topic, string[]> = {
  limits: ['גבול', 'lim', 'limit', 'גבולות', 'שואף', 'מתכנס'],
  continuity: ['רציפות', 'רציף', 'continuous', 'continuity', 'רצפה'],
  derivatives: ['נגזרת', 'derivative', 'גזירה', 'diff', 'נגזרות', 'גוזר'],
  integrals: ['אינטגרל', 'integral', 'אינטגרציה', 'שטח', 'נפח'],
  series: ['טור', 'series', 'סכום', 'sum', 'טורים', 'התכנסות'],
  sequences: ['סדרה', 'sequence', 'סדרות', 'איבר', 'נוסחת'],
  taylor: ['טיילור', 'taylor', 'מקלורן', 'maclaurin', 'פיתוח'],
  'differential-equations': ['משוואה דיפרנציאלית', 'ode', 'differential equation', 'מד"ר'],
  multivariable: ['רב משתנים', 'multivariable', 'partial', 'נגזרת חלקית', 'גרדיאנט'],
  other: [],
};

// Detect item type from text
function detectItemType(text: string): KnowledgeItemType | null {
  const lowerText = text.toLowerCase();

  for (const [type, keywords] of Object.entries(HEBREW_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword) || lowerText.includes(keyword.toLowerCase())) {
        return type as KnowledgeItemType;
      }
    }
  }
  return null;
}

// Detect topics from text
function detectTopics(text: string): Topic[] {
  const topics: Topic[] = [];
  const lowerText = text.toLowerCase();

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword) || lowerText.includes(keyword.toLowerCase())) {
        if (!topics.includes(topic as Topic)) {
          topics.push(topic as Topic);
        }
        break;
      }
    }
  }

  if (topics.length === 0) {
    topics.push('other');
  }

  return topics;
}

// Generate title from text
function generateTitle(text: string, type: KnowledgeItemType): string {
  // Try to extract a title from common patterns
  const patterns = [
    /(?:הגדרה|משפט|למה|מסקנה|הוכחה)\s*(?:\d+\.?\d*)?[:\s-]*(.{10,60})/i,
    /(?:definition|theorem|lemma|corollary|proof)\s*(?:\d+\.?\d*)?[:\s-]*(.{10,60})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim().substring(0, 60);
    }
  }

  // Fallback: use first meaningful part of text
  const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
  const firstPart = cleanText.substring(0, 60);
  return firstPart.endsWith('.') ? firstPart : firstPart + '...';
}

// Generate "when to use" suggestions
function generateWhenToUse(text: string, type: KnowledgeItemType, topics: Topic[]): string {
  const suggestions: string[] = [];

  // Based on topics
  if (topics.includes('limits')) {
    suggestions.push('כאשר צריך לחשב או להוכיח גבולות');
  }
  if (topics.includes('continuity')) {
    suggestions.push('כאשר בודקים רציפות של פונקציה');
  }
  if (topics.includes('derivatives')) {
    suggestions.push('כאשר מחשבים או משתמשים בנגזרות');
  }
  if (topics.includes('integrals')) {
    suggestions.push('כאשר מחשבים אינטגרלים');
  }
  if (topics.includes('series')) {
    suggestions.push('כאשר עובדים עם טורים והתכנסות');
  }
  if (topics.includes('sequences')) {
    suggestions.push('כאשר עובדים עם סדרות');
  }
  if (topics.includes('taylor')) {
    suggestions.push('כאשר צריך פיתוח טיילור/מקלורן');
  }

  // Based on type
  switch (type) {
    case 'definition':
      suggestions.push('כאשר צריך להגדיר מושג בצורה פורמלית');
      break;
    case 'theorem':
      suggestions.push('כאשר צריך להשתמש בתוצאה ידועה');
      break;
    case 'proof':
      suggestions.push('כאשר צריך להוכיח טענה דומה');
      break;
    case 'technique':
      suggestions.push('כאשר צריך טכניקה מסוימת לפתרון');
      break;
  }

  return suggestions.join('. ') || 'יש להשתמש בהקשר המתאים';
}

// Extract knowledge items from text
export function extractKnowledgeItems(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string
): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];

  for (const page of pages) {
    const text = page.text;

    // Split by common delimiters that might indicate new items
    const segments = text.split(/(?=הגדרה|משפט|למה|מסקנה|הוכחה|Definition|Theorem|Lemma|Corollary|Proof)/i);

    for (const segment of segments) {
      if (segment.trim().length < 20) continue;

      const type = detectItemType(segment);
      if (!type) continue;

      const topics = detectTopics(segment);
      const title = generateTitle(segment, type);
      const whenToUse = generateWhenToUse(segment, type, topics);

      const item: KnowledgeItem = {
        id: uuidv4(),
        type,
        title,
        verbatimText: segment.trim(), // EXACT text - never modify
        sourceFileId: fileId,
        sourceFileName: fileName,
        sourcePage: page.pageNumber,
        topics,
        whenToUse,
        linkedQuestionIds: [],
        linkedItemIds: [],
        isInReviewList: false,
        likelihoodScore: 50, // Default, will be calculated later
        createdAt: new Date(),
        reviewCount: 0,
      };

      items.push(item);
    }
  }

  return items;
}

// Extract questions from homework
export function extractHomeworkQuestions(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string,
  homeworkNumber: number
): HomeworkQuestion[] {
  const questions: HomeworkQuestion[] = [];
  let questionNumber = 0;

  for (const page of pages) {
    const text = page.text;

    // Look for question markers
    const questionPatterns = [
      /(?:שאלה|תרגיל|question|exercise|q\.?\s*)\s*(\d+)/gi,
      /(\d+)\s*[.)]/g,
    ];

    for (const pattern of questionPatterns) {
      const matches = text.matchAll(pattern);

      for (const match of matches) {
        questionNumber++;
        const startIndex = match.index || 0;

        // Get text until next question or end of significant content
        const endIndex = text.indexOf('\n\n', startIndex + 100) || text.length;
        const questionText = text.substring(startIndex, Math.min(endIndex, startIndex + 500)).trim();

        if (questionText.length < 20) continue;

        const topics = detectTopics(questionText);

        const question: HomeworkQuestion = {
          id: uuidv4(),
          sourceFileId: fileId,
          sourceFileName: fileName,
          sourcePage: page.pageNumber,
          homeworkNumber,
          questionNumber,
          verbatimText: questionText,
          topics,
          difficulty: 'medium', // Will be analyzed later
          requiredTheorems: [],
          similarityToExams: 0,
          examLikelihoodScore: 50, // Default
          matchingExamQuestions: [],
        };

        questions.push(question);
      }
    }
  }

  return questions;
}

// Extract questions from exams
export function extractExamQuestions(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  let questionNumber = 0;

  for (const page of pages) {
    const text = page.text;

    // Look for question markers (similar to homework but may have different patterns)
    const questionPatterns = [
      /(?:שאלה|question|q\.?\s*)\s*(\d+)/gi,
      /(\d+)\s*[.)]\s*\(?\s*\d*\s*נקודות?\)?/gi,
    ];

    for (const pattern of questionPatterns) {
      const matches = text.matchAll(pattern);

      for (const match of matches) {
        questionNumber++;
        const startIndex = match.index || 0;

        const endIndex = text.indexOf('\n\n', startIndex + 100) || text.length;
        const questionText = text.substring(startIndex, Math.min(endIndex, startIndex + 600)).trim();

        if (questionText.length < 20) continue;

        const topics = detectTopics(questionText);

        const question: ExamQuestion = {
          id: uuidv4(),
          sourceFileId: fileId,
          sourceFileName: fileName,
          sourcePage: page.pageNumber,
          questionNumber,
          verbatimText: questionText,
          topics,
          difficulty: 'medium',
          requiredTheorems: [],
          questionPattern: detectQuestionPattern(questionText),
          isFromHomework: false,
        };

        questions.push(question);
      }
    }
  }

  return questions;
}

// Detect question pattern/template
function detectQuestionPattern(text: string): string {
  const patterns = [
    { pattern: 'prove-limit', keywords: ['הוכח', 'הראה', 'גבול', 'prove', 'show', 'limit'] },
    { pattern: 'calculate-derivative', keywords: ['חשב', 'נגזרת', 'calculate', 'derivative'] },
    { pattern: 'calculate-integral', keywords: ['חשב', 'אינטגרל', 'calculate', 'integral'] },
    { pattern: 'convergence-test', keywords: ['בדוק', 'התכנסות', 'test', 'convergence', 'converge'] },
    { pattern: 'continuity-check', keywords: ['רציפות', 'רציף', 'continuous', 'continuity'] },
    { pattern: 'taylor-expansion', keywords: ['טיילור', 'פיתוח', 'taylor', 'expand'] },
    { pattern: 'find-extrema', keywords: ['קיצון', 'מקסימום', 'מינימום', 'extrema', 'maximum', 'minimum'] },
    { pattern: 'prove-theorem', keywords: ['הוכח', 'משפט', 'prove', 'theorem'] },
  ];

  for (const { pattern, keywords } of patterns) {
    const matches = keywords.filter(k =>
      text.toLowerCase().includes(k.toLowerCase()) || text.includes(k)
    );
    if (matches.length >= 2) {
      return pattern;
    }
  }

  return 'general';
}

// Analyze file content and auto-categorize
export function suggestCategory(fileName: string, text: string): FileCategory {
  const lowerName = fileName.toLowerCase();
  const lowerText = text.toLowerCase().substring(0, 1000);

  if (lowerName.includes('lecture') || lowerName.includes('הרצאה') || lowerName.includes('lec')) {
    return 'lecture';
  }
  if (lowerName.includes('tutorial') || lowerName.includes('תרגול') || lowerName.includes('rec') || lowerName.includes('tut')) {
    return 'tutorial';
  }
  if (lowerName.includes('hw') || lowerName.includes('homework') || lowerName.includes('תרגיל') || lowerName.includes('שיעורי בית')) {
    return 'homework';
  }
  if (lowerName.includes('exam') || lowerName.includes('מבחן') || lowerName.includes('בחינה') || lowerName.includes('test')) {
    return 'exam';
  }

  // Check content
  if (lowerText.includes('בחינה') || lowerText.includes('exam')) {
    return 'exam';
  }
  if (lowerText.includes('תרגיל בית') || lowerText.includes('homework')) {
    return 'homework';
  }

  return 'lecture'; // Default
}

// Extract index number from filename
export function extractIndexNumber(fileName: string): number {
  const patterns = [
    /(?:lecture|lec|הרצאה|tutorial|tut|rec|תרגול|hw|homework|exam|מבחן)[_\s-]*(\d+)/i,
    /(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = fileName.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return 1;
}

// Generate display tag
export function generateDisplayTag(category: FileCategory, indexNumber: number, fileName?: string): string {
  const prefixes: Record<FileCategory, string> = {
    lecture: 'L',
    tutorial: 'T',
    homework: 'HW',
    exam: 'EXAM',
  };

  const prefix = prefixes[category];
  const paddedIndex = indexNumber.toString().padStart(2, '0');

  if (category === 'exam' && fileName) {
    // Try to extract year/semester info
    const yearMatch = fileName.match(/(20\d{2})/);
    const semesterMatch = fileName.match(/([AB])/i);
    if (yearMatch) {
      return `EXAM_${yearMatch[1]}${semesterMatch ? semesterMatch[1].toUpperCase() : ''}`;
    }
  }

  return `${prefix}${paddedIndex}`;
}
