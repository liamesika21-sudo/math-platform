import type {
  KnowledgeItem,
  ExamQuestion,
  HomeworkQuestion,
  ExamPattern,
  ExamAnalysis,
  LikelihoodAnalysis,
  GapItem,
  Topic,
} from '@/types';

// Calculate similarity between two texts (simple Jaccard similarity)
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);

  return (intersection.size / union.size) * 100;
}

// Calculate likelihood score for knowledge items based on exam patterns
export function calculateLikelihoodScores(
  items: KnowledgeItem[],
  examQuestions: ExamQuestion[],
  homeworkQuestions: HomeworkQuestion[]
): KnowledgeItem[] {
  return items.map(item => {
    let score = 0;

    // Factor 1: Frequency in exam questions (40%)
    const examMatches = examQuestions.filter(q =>
      q.requiredTheorems.includes(item.id) ||
      q.topics.some(t => item.topics.includes(t)) ||
      calculateTextSimilarity(q.verbatimText, item.verbatimText) > 30
    );
    const examFrequency = (examMatches.length / Math.max(examQuestions.length, 1)) * 40;

    // Factor 2: Topic overlap with exams (20%)
    const examTopics = new Set(examQuestions.flatMap(q => q.topics));
    const topicOverlap = item.topics.filter(t => examTopics.has(t)).length;
    const topicScore = (topicOverlap / Math.max(item.topics.length, 1)) * 20;

    // Factor 3: Referenced in homework (20%)
    const hwMatches = homeworkQuestions.filter(q =>
      q.requiredTheorems.includes(item.id) ||
      calculateTextSimilarity(q.verbatimText, item.verbatimText) > 25
    );
    const hwScore = (hwMatches.length / Math.max(homeworkQuestions.length, 1)) * 100 * 0.2;

    // Factor 4: Item type importance (20%)
    const typeScores: Record<string, number> = {
      theorem: 20,
      definition: 15,
      proof: 12,
      corollary: 10,
      lemma: 10,
      technique: 8,
      conclusion: 5,
    };
    const typeScore = typeScores[item.type] || 5;

    score = examFrequency + topicScore + hwScore + typeScore;

    return {
      ...item,
      likelihoodScore: Math.min(Math.round(score), 100),
    };
  });
}

// Calculate homework-to-exam likelihood
export function calculateHomeworkLikelihood(
  hwQuestions: HomeworkQuestion[],
  examQuestions: ExamQuestion[]
): HomeworkQuestion[] {
  return hwQuestions.map(hwQ => {
    let score = 0;
    const matchingExams: string[] = [];

    // Factor 1: Direct text similarity to past exam questions (50%)
    for (const examQ of examQuestions) {
      const similarity = calculateTextSimilarity(hwQ.verbatimText, examQ.verbatimText);
      if (similarity > 30) {
        score += similarity * 0.5;
        matchingExams.push(examQ.id);
      }
    }

    // Factor 2: Topic match frequency (30%)
    const topicMatches = examQuestions.filter(q =>
      q.topics.some(t => hwQ.topics.includes(t))
    );
    const topicFrequency = (topicMatches.length / Math.max(examQuestions.length, 1)) * 30;
    score += topicFrequency;

    // Factor 3: Question pattern match (20%)
    const patternMatches = examQuestions.filter(q =>
      q.questionPattern === detectHomeworkPattern(hwQ.verbatimText)
    );
    const patternFrequency = (patternMatches.length / Math.max(examQuestions.length, 1)) * 20;
    score += patternFrequency;

    return {
      ...hwQ,
      examLikelihoodScore: Math.min(Math.round(score), 100),
      matchingExamQuestions: matchingExams,
      similarityToExams: Math.round(score),
    };
  });
}

function detectHomeworkPattern(text: string): string {
  const patterns = [
    { pattern: 'prove-limit', keywords: ['הוכח', 'הראה', 'גבול', 'prove', 'show', 'limit'] },
    { pattern: 'calculate-derivative', keywords: ['חשב', 'נגזרת', 'calculate', 'derivative'] },
    { pattern: 'calculate-integral', keywords: ['חשב', 'אינטגרל', 'calculate', 'integral'] },
    { pattern: 'convergence-test', keywords: ['בדוק', 'התכנסות', 'test', 'convergence'] },
    { pattern: 'continuity-check', keywords: ['רציפות', 'רציף', 'continuous'] },
    { pattern: 'taylor-expansion', keywords: ['טיילור', 'פיתוח', 'taylor'] },
  ];

  for (const { pattern, keywords } of patterns) {
    const matches = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
    if (matches.length >= 2) return pattern;
  }

  return 'general';
}

// Analyze exam patterns
export function analyzeExamPatterns(examQuestions: ExamQuestion[]): ExamPattern[] {
  const patternMap = new Map<string, ExamPattern>();

  for (const question of examQuestions) {
    const pattern = question.questionPattern;

    if (!patternMap.has(pattern)) {
      patternMap.set(pattern, {
        id: `pattern-${pattern}`,
        pattern,
        description: getPatternDescription(pattern),
        frequency: 0,
        exampleQuestionIds: [],
        relatedTheorems: [],
        topics: [],
      });
    }

    const patternObj = patternMap.get(pattern)!;
    patternObj.frequency++;
    if (patternObj.exampleQuestionIds.length < 3) {
      patternObj.exampleQuestionIds.push(question.id);
    }
    patternObj.relatedTheorems.push(...question.requiredTheorems);
    question.topics.forEach(t => {
      if (!patternObj.topics.includes(t)) {
        patternObj.topics.push(t);
      }
    });
  }

  return Array.from(patternMap.values()).sort((a, b) => b.frequency - a.frequency);
}

function getPatternDescription(pattern: string): string {
  const descriptions: Record<string, string> = {
    'prove-limit': 'הוכחת גבול באמצעות הגדרת אפסילון-דלתא',
    'calculate-derivative': 'חישוב נגזרת של פונקציה',
    'calculate-integral': 'חישוב אינטגרל מסוים או לא מסוים',
    'convergence-test': 'בדיקת התכנסות של טור או סדרה',
    'continuity-check': 'בדיקת רציפות פונקציה',
    'taylor-expansion': 'פיתוח פונקציה לטור טיילור/מקלורן',
    'find-extrema': 'מציאת נקודות קיצון',
    'prove-theorem': 'הוכחת משפט או טענה',
    general: 'שאלה כללית',
  };
  return descriptions[pattern] || pattern;
}

// Perform full exam analysis
export function performExamAnalysis(
  examQuestions: ExamQuestion[],
  knowledgeItems: KnowledgeItem[]
): ExamAnalysis {
  // Topic frequency
  const topicCounts = new Map<Topic, number>();
  examQuestions.forEach(q => {
    q.topics.forEach(t => {
      topicCounts.set(t, (topicCounts.get(t) || 0) + 1);
    });
  });

  const mostCommonTopics = Array.from(topicCounts.entries())
    .map(([topic, frequency]) => ({ topic, frequency }))
    .sort((a, b) => b.frequency - a.frequency);

  // Theorem usage frequency
  const theoremCounts = new Map<string, { theoremId: string; title: string; frequency: number }>();
  examQuestions.forEach(q => {
    q.requiredTheorems.forEach(theoremId => {
      const item = knowledgeItems.find(ki => ki.id === theoremId);
      if (item) {
        const existing = theoremCounts.get(theoremId);
        if (existing) {
          existing.frequency++;
        } else {
          theoremCounts.set(theoremId, {
            theoremId: theoremId,
            title: item.title,
            frequency: 1,
          });
        }
      }
    });
  });

  const mostUsedTheorems = Array.from(theoremCounts.values())
    .sort((a, b) => b.frequency - a.frequency);

  // Exam structure
  const totalQuestions = examQuestions.length || 1;
  const topicDistribution = mostCommonTopics.map(({ topic, frequency }) => ({
    topic,
    percentage: Math.round((frequency / totalQuestions) * 100),
  }));

  const difficultyCounts = {
    easy: examQuestions.filter(q => q.difficulty === 'easy').length,
    medium: examQuestions.filter(q => q.difficulty === 'medium').length,
    hard: examQuestions.filter(q => q.difficulty === 'hard').length,
  };

  const difficultyDistribution = [
    { difficulty: 'easy', percentage: Math.round((difficultyCounts.easy / totalQuestions) * 100) },
    { difficulty: 'medium', percentage: Math.round((difficultyCounts.medium / totalQuestions) * 100) },
    { difficulty: 'hard', percentage: Math.round((difficultyCounts.hard / totalQuestions) * 100) },
  ];

  const patterns = analyzeExamPatterns(examQuestions);

  return {
    mostCommonTopics,
    mostUsedTheorems,
    typicalStructure: {
      questionCount: totalQuestions,
      topicDistribution,
      difficultyDistribution,
    },
    patterns,
  };
}

// Generate likelihood analysis
export function generateLikelihoodAnalysis(
  knowledgeItems: KnowledgeItem[],
  examQuestions: ExamQuestion[],
  homeworkQuestions: HomeworkQuestion[]
): LikelihoodAnalysis {
  const sortedItems = [...knowledgeItems].sort((a, b) => b.likelihoodScore - a.likelihoodScore);

  const topTheorems = sortedItems
    .filter(item => item.type === 'theorem' || item.type === 'lemma' || item.type === 'corollary')
    .slice(0, 15);

  const topProofs = sortedItems.filter(item => item.type === 'proof').slice(0, 10);

  const topDefinitions = sortedItems.filter(item => item.type === 'definition').slice(0, 10);

  // Identify gaps
  const gaps: GapItem[] = [];

  // Gap 1: Topics in exams but low coverage in knowledge base
  const examTopics = new Set(examQuestions.flatMap(q => q.topics));
  const knowledgeTopics = new Set(knowledgeItems.flatMap(ki => ki.topics));

  examTopics.forEach(topic => {
    const itemsForTopic = knowledgeItems.filter(ki => ki.topics.includes(topic));
    const examQuestionsForTopic = examQuestions.filter(q => q.topics.includes(topic));

    if (examQuestionsForTopic.length > 2 && itemsForTopic.length < 3) {
      gaps.push({
        description: `כיסוי חלקי של נושא: ${topic}`,
        reason: `נמצאו ${examQuestionsForTopic.length} שאלות במבחנים אך רק ${itemsForTopic.length} פריטי ידע`,
        suggestedAction: `חפש משפטים והגדרות נוספים הקשורים ל-${topic} בהרצאות ובתרגולים`,
        relatedTopics: [topic],
      });
    }
  });

  // Gap 2: Low practice on high-likelihood items
  topTheorems.slice(0, 5).forEach(theorem => {
    if (theorem.reviewCount < 2) {
      gaps.push({
        description: `משפט בעל סבירות גבוהה ללא תרגול מספיק`,
        reason: `${theorem.title} - נסקר ${theorem.reviewCount} פעמים בלבד`,
        suggestedAction: `תרגל משפט זה במצב התרגול ובשאלות`,
        relatedTopics: theorem.topics,
      });
    }
  });

  return {
    topTheorems,
    topProofs,
    topDefinitions,
    gaps,
    lastUpdated: new Date(),
  };
}

// Link knowledge items to questions
export function linkKnowledgeToQuestions(
  items: KnowledgeItem[],
  questions: (ExamQuestion | HomeworkQuestion)[]
): KnowledgeItem[] {
  return items.map(item => {
    const linkedQuestions = questions.filter(q => {
      // Check if item's topics match question topics
      const topicMatch = q.topics.some(t => item.topics.includes(t));

      // Check text similarity
      const similarity = calculateTextSimilarity(q.verbatimText, item.verbatimText);

      return topicMatch && similarity > 20;
    });

    return {
      ...item,
      linkedQuestionIds: linkedQuestions.map(q => q.id),
    };
  });
}

// Generate study recommendations
export function generateStudyRecommendations(
  knowledgeItems: KnowledgeItem[],
  practiceHistory: Array<{ itemId: string; wasCorrect: boolean }>
): KnowledgeItem[] {
  // Sort by likelihood and weak areas
  return knowledgeItems
    .map(item => {
      const attempts = practiceHistory.filter(p => p.itemId === item.id);
      const correctAttempts = attempts.filter(p => p.wasCorrect).length;
      const accuracy = attempts.length > 0 ? (correctAttempts / attempts.length) * 100 : 100;

      // Prioritize high likelihood + low accuracy
      const priority = item.likelihoodScore * (1 - accuracy / 100);

      return { ...item, priority, accuracy };
    })
    .sort((a, b) => (b as any).priority - (a as any).priority);
}
