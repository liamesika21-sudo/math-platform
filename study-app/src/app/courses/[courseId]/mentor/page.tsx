'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BookOpen,
  Flame,
  MessageSquare,
  Zap,
  HelpCircle,
  ArrowRight,
  Star,
} from 'lucide-react';
import { getCourseQuestions, getCourseTopics, getCourseWeeks } from '@/lib/math-platform/data';
import { useCourseQuestionSession } from '@/lib/math-platform/session';
import { cn } from '@/lib/math-platform/utils';
import type { CourseId } from '@/lib/math-platform/types';

// ─── Socratic guiding questions per topic ────────────────────────────────────
const socraticMap: Record<string, { guiding: string[]; traps: string[]; strategy: string }> = {
  'calc-sequences': {
    guiding: [
      'מה בדיוק דורשת הגדרת ε-N? מי בוחר ε ומי בוחר N?',
      'אם |aₙ − L| < ε לכל n > N, מה זה אומר "פיזית" על הגרף?',
      'מה ההבדל בין סדרה חסומה לסדרה מתכנסת?',
      'כיצד תדע אם סדרה מתכנסת מבלי לחשב את הגבול?',
      'נסח בעצמך את ההבדל בין כלל הסנדוויץ׳ לגבול פשוט.',
    ],
    traps: [
      'N חייב להיות תלוי ב-ε — לא קבוע',
      'סדרה עולה לא חייבת להתכנס ללא חסימה',
      'בלבול בין |aₙ − L| < ε לבין |aₙ| < ε',
    ],
    strategy: 'ε-N: התחל מ-|aₙ − L|, פשט, ואז בחר N = ⌈f(ε)⌉',
  },
  'calc-seq-limits': {
    guiding: [
      'בסדרה רקורסיבית, למה מספיק להוכיח חסום + מונוטוניות?',
      'אם L = lim aₙ ו-aₙ₊₁ = f(aₙ), מה הקשר בין L ל-f(L)?',
      'מה מייחד את הגבול (1+1/n)ⁿ? מה הוא מייצג?',
    ],
    traps: [
      'לא להוכיח שL קיים לפני שמשתמשים בו בנוסחה',
      'בסדרה יורדת — חפש חסום תחתי, לא עליון',
    ],
    strategy: 'רקורסיבית: שלב 1 — חסום | שלב 2 — מונוטוני | שלב 3 — קח גבול',
  },
  'calc-func-limits': {
    guiding: [
      'בהגדרת ε-δ, מי בוחר ε ומי בוחר δ? מי בא ראשון?',
      'מה ההבדל בין "f מוגדרת ב-x₀" לבין "הגבול ב-x₀ קיים"?',
      'כיצד קריטריון היינה עוזר לפרוך קיום גבול?',
    ],
    traps: [
      'ε ניתן לנו, δ אנחנו מוצאים — לא להפך',
      'lim(x→0) sin(1/x): הגבול לא קיים — לא ערך מיוחד',
    ],
    strategy: 'גבולות טריגונומטריים: sin(u)/u → 1 כשu → 0 — הכלי המרכזי',
  },
  'calc-derivative-def': {
    guiding: [
      'מה ההגדרה הפורמלית של f\'(x)? מה ה-h מייצג?',
      'למה גזירות גוררת רציפות, אבל רציפות לא גוררת גזירות?',
      'מדוע |x| אינה גזירה ב-0? הסבר בכלים של הגדרה.',
    ],
    traps: [
      'חייבים לפשט לפני המעבר ל-h→0',
      'גזירה בנקודה: לבדוק גבולות משני הצדדים',
    ],
    strategy: '[f(x+h)−f(x)]/h → פשט אלגברית → גבול ב-h→0',
  },
  'calc-chain-rule': {
    guiding: [
      'בכלל השרשרת, כיצד מזהים פונקציה חיצונית ופנימית?',
      'בנגזרת מרומזת: למה גוזרים y כפונקציה של x?',
      'הסבר אינטואיטיבית מדוע (f∘g)\'(x) = f\'(g(x))·g\'(x).',
    ],
    traps: [
      'לשכוח לכפול בנגזרת הפונקציה הפנימית',
      'dy/dx ≠ 1 — יש לגזור y ביחס ל-x',
    ],
    strategy: 'כלל השרשרת: גזור מבחוץ פנימה, שכבה אחרי שכבה',
  },
  'calc-lhopital-concavity': {
    guiding: [
      'מהי הצורה הבלתי-קצובה שלופיטל פותר? אלו עוד צורות קיימות?',
      'f\'\'(x) > 0 — מה זה אומר על הנגזרת הראשונה? על הגרף?',
      'מה ההבדל בין נקודת פיתול לנקודת קיצון?',
    ],
    traps: [
      'לא לבדוק 0/0 או ∞/∞ לפני הפעלת לופיטל',
      'f\'\'(x₀) = 0 לא מספיק לנקודת פיתול — צריך שינוי סימן',
    ],
    strategy: 'לופיטל: בדוק צורה → גזור מונה ומכנה בנפרד → חזור',
  },
  'calc-antiderivatives': {
    guiding: [
      'מה ההבדל בין אינטגרל מסוים לאינטגרל לא-מסוים?',
      'באינטגרציה בחלקים, כיצד בוחרים u? מה כלל LIATE?',
      'כיצד לדעת מתי להחליף משתנה לעומת IBP?',
    ],
    traps: [
      'לשכוח + C באינטגרל הלא-מסוים',
      'IBP: dv חייב להיות קל לאינטגרל',
    ],
    strategy: 'f(g(x))·g\'(x) → החלפה | x·f(x) → IBP',
  },
  'calc-definite-integral': {
    guiding: [
      'ניסח: מה אומר חלק 1 של משפט היסוד? חלק 2?',
      'כיצד מחשבים שטח בין שתי עקומות?',
      'מה "הטריק" בגזירת ∫₀^(g(x)) f(t) dt?',
    ],
    traps: [
      'לשכוח לעדכן גבולות כשמחליפים משתנה',
      'שטח: חייבים |f−g|, לא f−g',
    ],
    strategy: 'FTC: ∫ₐᵇ f = F(b) − F(a) כאשר F\' = f',
  },
  'calc-integral-techniques': {
    guiding: [
      'כיצד מחליטים שצורה מרוכבת דורשת שברים חלקיים?',
      'מה משמעות "אינטגרל לא תקין מתכנס"?',
      'מדוע x = sin(θ) מועיל בחישוב ∫√(1−x²) dx?',
    ],
    traps: [
      'שברים חלקיים: מעלת מונה < מעלת מכנה לפני הפירוק',
      'אינטגרל לא תקין: חשב כגבול — לא להציב ישר ∞',
    ],
    strategy: 'שברים חלקיים: פרק מכנה → קבע מקדמים → אינטגרל לפי ln',
  },
  'disc-logic': {
    guiding: [
      'מה ההבדל בין ¬(p ∧ q) לבין (¬p ∨ ¬q)?',
      'כיצד שוללים "∀x: P(x)"? ומה עם "∃x: P(x)"?',
      'Contrapositive vs Contradiction: מה ההבדל הבסיסי?',
    ],
    traps: [
      'לבלבל "גרירה" ו"שקילות"',
      'שלילת ∀x P(x): התשובה ∃x ¬P(x), לא ∀x ¬P(x)',
    ],
    strategy: 'שלילת מורכבות: עבוד מחוץ פנימה — שלל כמת, אז גוף',
  },
  'disc-sets': {
    guiding: [
      'מה ההבדל בין x ∈ A ובין {x} ⊆ A?',
      'הוכחת שוויון A = B דורשת שני כיוונים — למה?',
      'מתי A ⊆ B ∩ C שווה ל-A ⊆ B ∧ A ⊆ C?',
    ],
    traps: [
      'לבלבל ∈ ו-⊆: הם לא אותו דבר',
      'הכלה כפולה — שני הכיוונים, לא אחד',
    ],
    strategy: 'הכלה כפולה: "יהי x ∈ A... לכן x ∈ B" — פעמיים',
  },
  'disc-power-sets': {
    guiding: [
      'למה |P(A)| = 2^|A|? נמק קומבינטורית.',
      'מה ההבדל בין x ∈ P(A) ובין x ⊆ A?',
      'האם ∅ תמיד שייך ל-P(A)? הסבר.',
    ],
    traps: [
      'לבלבל קבוצת חזקה עם קבוצה בחזקת n',
      '∅ ∈ P(A) תמיד — זו לא שגיאה',
    ],
    strategy: 'P(A): כל תת-קבוצה — כולל ∅ ו-A עצמה',
  },
  'disc-functions': {
    guiding: [
      'כיצד מוכיחים שפונקציה אינה חד-חד-ערכית? מה מספיק?',
      'הוכחת "f על": מה צריך להראות עבור כל y?',
      'מה קורה להרכבה של שתי חד-חד-ערכיות? ושל שתי על?',
    ],
    traps: [
      'חד-חד-ערכיות: f(a)=f(b) ⟹ a=b — לא a=b ⟹ f(a)=f(b)',
      'סדר הרכבה: (f∘g)(x) = f(g(x)), לא g(f(x))',
    ],
    strategy: 'חד-חד-ערכיות: הנח f(a)=f(b) → הוכח a=b',
  },
  'disc-relations': {
    guiding: [
      'שלוש תכונות יחס שקילות — נסח כל אחת "בעברית פשוטה".',
      'כיצד תוכיח שיחס אינו טרנזיטיבי? מה אתה מחפש?',
      'מה ההבדל בין יחס שקילות לסדר חלקי?',
    ],
    traps: [
      'לבלבל סימטריה עם טרנזיטיביות',
      'דוגמה נגד: קונקרטית ומינימלית',
    ],
    strategy: 'שקילות: רפלקסיבי + סימטרי + טרנזיטיבי — בדוק בנפרד',
  },
  'disc-induction': {
    guiding: [
      'מה ההבדל בין אינדוקציה רגילה לחזקה? מתי כל אחת שימושית?',
      'בשלב האינדוקטיבי — מה בדיוק מותר להניח?',
      'כיצד בונים הוכחת אינדוקציה על אי-שוויון?',
    ],
    traps: [
      'לשכוח להציב n+1 בצד הימני — לא רק בשמאלי',
      'אינדוקציה חזקה: הנח לכל k < n, לא רק k = n−1',
    ],
    strategy: 'מבנה: בסיס → הנח ל-n → הוכח ל-n+1 (עם אלגברה מפורטת)',
  },
  'disc-combinatorics2': {
    guiding: [
      'הכלה-הדחה לשלוש קבוצות: מה הסימן של כל חיתוך?',
      'מניה עם חזרות: מדוע C(n+k−1, k−1)?',
      'derangements: מדוע הנוסחה מושפעת מהכלה-הדחה?',
    ],
    traps: [
      'בהכלה-הדחה: לחסר חיתוכים זוגיים ולהוסיף אי-זוגיים',
      'מניה עם חזרות ≠ C(n,k)',
    ],
    strategy: '|A∪B∪C| = סכום יחיד − סכום זוגות + חיתוך שלושה',
  },
  'disc-pigeonhole': {
    guiding: [
      'כיצד מגדירים "שובכים" ו"יונים" בבעיה נתונה?',
      'שובך יונים מוכלל: n יונים ב-k שובכים — מה מובטח?',
      'תן דוגמה לבעיית תורת מספרים שנפתרת עם שובך יונים.',
    ],
    traps: [
      'המשפט אומר "לפחות" — לא "הכל"',
      'לא לזהות נכון מה הם "שובכים" בבעיה מילולית',
    ],
    strategy: 'זהה n יונים ב-k שובכים → ⌈n/k⌉ יחיד לפחות',
  },
  'la-fields': {
    guiding: [
      'מה ה-8 אקסיומות שהופכות קבוצה לשדה? מי הכי "עדינה"?',
      'כיצד מוכיחים ש-F₂ = {0,1} הוא שדה?',
      'מדוע ℤ אינו שדה?',
    ],
    traps: [
      'המהפך הכפלי נדרש רק לאיברים שאינם אפס',
      'לבדוק סגירות — לעתים שוכחים',
    ],
    strategy: 'שדה: בדוק כל אקסיומה בנפרד, מהסגירות עד המהפכים',
  },
  'la-complex': {
    guiding: [
      'מה z·z̄ שווה? כיצד זה עוזר למצוא z⁻¹?',
      'צורה פולרית: r·e^(iθ) — מה r ומה θ מייצגים?',
      'משפט דה-מואבר: כיצד הוא עוזר לחשב zⁿ?',
    ],
    traps: [
      'ארגומנט: בדוק רביע לפני atan',
      'zⁿ: השתמש בצורה פולרית, לא להכפיל n פעמים',
    ],
    strategy: 'z = r(cosθ + i·sinθ) → zⁿ = rⁿ(cos(nθ) + i·sin(nθ))',
  },
  'la-vectors': {
    guiding: [
      'שלושת דרישות תת-מרחב — מדוע שלושתן נחוצות?',
      'למה מספיק להוכיח "αu + βv ∈ W"?',
      'הספן של קבוצה — האם הוא תמיד תת-מרחב?',
    ],
    traps: [
      'לבדוק שהאפס שייך ל-W לפני כלום',
      'אם W לא מכיל אפס — מיד לא תת-מרחב',
    ],
    strategy: 'תת-מרחב: 0 ∈ W → αu + βv ∈ W לכל u,v ∈ W',
  },
  'la-vector-spaces': {
    guiding: [
      '10 אקסיומות מרחב וקטורי — אלו לרוב נשכחות?',
      'P₂ כמרחב וקטורי: מה "הסקלר" ומה "הוקטור"?',
      'כיצד מוכיחים שקבוצה אינה מרחב וקטורי?',
    ],
    traps: [
      'לבלבל מרחב וקטורי עם תת-מרחב',
      'כל הפרת אקסיומה מספיקה לפריכה',
    ],
    strategy: 'תת-מרחב: דרך קצרה — 0, סגירות | מרחב: כל 10 אקסיומות',
  },
  'la-basis': {
    guiding: [
      'בסיס = פורשת + בלתי-תלויה. מדוע שתיהן נחוצות?',
      'ממד: האם חייב להיות סופי?',
      'כיצד מרחיבים קבוצה בלתי-תלויה לבסיס?',
    ],
    traps: [
      'פורשת לא בהכרח בסיס — יכולה להיות תלויה',
      'ממד: ייחודי לכל מרחב, לא תלוי בבחירת הבסיס',
    ],
    strategy: 'בסיס: בדוק אי-תלות ← מטריצה מדורגת + בדוק פריסה',
  },
  'la-dependence': {
    guiding: [
      'הגדרה: קבוצה תלויה לינארית אם... (נסח בעצמך)',
      'n+1 וקטורים ב-ℝⁿ תמיד תלויים — מדוע?',
      'כיצד שורת-אפס בדירוג מעידה על תלות?',
    ],
    traps: [
      'תלות לינארית: לפחות מקדם אחד שאינו אפס',
      'לדרג ולהסביר מה שורת האפס אומרת',
    ],
    strategy: 'בדיקת תלות: מטריצה + דירוג → שורת אפס = תלות',
  },
  'la-basis-dim': {
    guiding: [
      'למת שטייניץ: |B.I.| ≤ כל פורשת — מה ההשלכה לממד?',
      'dim(U+W) = dim U + dim W − dim(U∩W) — דוגמה ספציפית.',
      'כיצד מוצאים בסיס לתת-מרחב שניתן על ידי משוואות?',
    ],
    traps: [
      'dim(U∩W) ≠ dim U · dim W',
      'כשמרחיבים לבסיס: להוסיף וקטורים עד dim',
    ],
    strategy: 'מצא בסיס: בטא משתנים חופשיים, בנה וקטורי בסיס מהם',
  },
  'la-matrices': {
    guiding: [
      'מה ההבדל בין שורת ציר לשורת אפס?',
      'דרגת מטריצה: מה היא מייצגת?',
      'מתי למערכת יש אינסוף פתרונות? מתי פתרון יחיד?',
    ],
    traps: [
      '0 = 1 בשורה → לא עקבי, עצור כאן',
      'משתנים חופשיים = n − דרגה',
    ],
    strategy: 'דרג → ספור ציריים → בדוק עקביות → כתוב פתרון כללי',
  },
  'la-linear-equations': {
    guiding: [
      'מה תנאי לכך שמערכת משוואות לינאריות תהיה עקבית?',
      'מה ההבדל בין פתרון יחיד לאינסוף פתרונות?',
      'כיצד כותבים פתרון כללי עם פרמטרים?',
    ],
    traps: [
      'לא לשכוח שורת [0...0|b] עם b≠0 מעידה על חוסר עקביות',
      'משתנה חופשי: כל ערך אפשרי, לא "חופשי לבחור ערך ספציפי"',
    ],
    strategy: 'מטריצה מוגדלת → דרג → בדוק עקביות → כתוב פתרון',
  },
};

// ─── Study tips ──────────────────────────────────────────────────────────────
const studyTips = [
  { icon: '⏱️', title: 'שיטת פומודורו', tip: 'לומד 45 דקות + הפסקה 15 דק׳ — יעיל יותר משעה רצופה' },
  { icon: '📝', title: 'קודם ניסיון', tip: 'פתח שאלה לבד לפני שתיגש לרמז — גם ניסיון כושל מחזק' },
  { icon: '🔁', title: 'חזרה מרווחת', tip: 'חזור על חומר ישן כל 2–3 ימים — זיכרון ארוך טווח' },
  { icon: '🎯', title: 'טיפול בחולשות', tip: 'שאלות שסימנת "קשה לי" הן הרווח הגדול — התמקד בהן' },
  { icon: '✍️', title: 'כתיבה אקטיבית', tip: 'כתוב הפתרון בעצמך ממש — גם אחרי שראית רמז' },
  { icon: '🤔', title: 'הכלל הכללי', tip: 'אחרי כל שאלה שאל: מה העיקרון הכללי? לא רק "מה התשובה"' },
  { icon: '📚', title: 'תיאוריה ראשונה', tip: 'לפני תרגול: קרא הגדרות ומשפטים רלוונטיים' },
  { icon: '🧩', title: 'דפוסי מבחן', tip: 'ראה דפוסים בשאלות חוזרות — לא רק פתרונות' },
];

// ─── Reflection prompts ──────────────────────────────────────────────────────
const reflectionPrompts = [
  'מה ניסיתי לעשות בשאלה? מה היה הגישה שלי?',
  'היכן בדיוק נתקעתי? איזה שלב לא ברור לי?',
  'האם בדקתי את ההגדרות והמשפטים הרלוונטיים?',
  'האם ניסיתי דוגמה פשוטה יותר תחילה?',
  'מה ידעתי על הנושא לפני השאלה? מה חסר לי?',
];

export default function MentorPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId as CourseId;

  const allQuestions = getCourseQuestions(courseId);
  const topics = getCourseTopics(courseId);
  const weeks = getCourseWeeks(courseId);
  const { filteredStates } = useCourseQuestionSession(courseId, allQuestions);

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [showReflectionFeedback, setShowReflectionFeedback] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('weak');

  // ─── Analytics ─────────────────────────────────────────────────────────────
  const analytics = useMemo(() => {
    const total = allQuestions.length;
    const solved = filteredStates.filter((s) => s.status === 'solved').length;
    const inProgress = filteredStates.filter((s) => s.status === 'in_progress').length;
    const hardCount = filteredStates.filter((s) => s.wasHard).length;
    const independentCount = filteredStates.filter((s) => s.solvedIndependently).length;
    const reviewLaterCount = filteredStates.filter((s) => s.reviewLater).length;

    const topicStats = topics
      .map((topic) => {
        const tqs = allQuestions.filter((q) => q.topicId === topic.id);
        const tss = tqs.map((q) => filteredStates.find((s) => s.questionId === q.id));
        const topicSolved = tss.filter((s) => s?.status === 'solved').length;
        const topicHard = tss.filter((s) => s?.wasHard).length;
        const topicTotal = tqs.length;
        const struggleScore = topicHard * 2 + (topicTotal - topicSolved);
        return {
          topic,
          total: topicTotal,
          solved: topicSolved,
          hard: topicHard,
          struggleScore,
          pct: topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0,
        };
      })
      .filter((t) => t.total > 0);

    const weekStats = weeks.map((week) => {
      const wqs = allQuestions.filter((q) => q.weekId === week.id);
      const wSolved = wqs.filter((q) => filteredStates.find((s) => s.questionId === q.id && s.status === 'solved')).length;
      return { week, total: wqs.length, solved: wSolved };
    });

    const weakTopics = [...topicStats].sort((a, b) => b.struggleScore - a.struggleScore).slice(0, 4);
    const strongTopics = [...topicStats].filter((t) => t.pct === 100 && t.total > 0);
    const untouchedWeeks = weekStats.filter((w) => w.solved === 0 && w.total > 0).slice(0, 4);

    return {
      total,
      solved,
      inProgress,
      hardCount,
      independentCount,
      reviewLaterCount,
      topicStats,
      weekStats,
      weakTopics,
      strongTopics,
      untouchedWeeks,
      solvedPct: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  }, [allQuestions, filteredStates, topics, weeks]);

  const currentTopic = selectedTopic ? socraticMap[selectedTopic] : null;
  const currentTopicName = topics.find((t) => t.id === selectedTopic)?.title ?? '';
  const tip = studyTips[tipIndex % studyTips.length];

  function toggleSection(key: string) {
    setExpandedSection((prev) => (prev === key ? null : key));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-950/10">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">כלי הלמידה</p>
              <h2 className="text-2xl font-semibold text-slate-950">המנחה האישי שלך</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                ניתוח מבוסס נתונים · שאלות סוקרטיות · ללא תשובות מוכנות
              </p>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 lg:max-w-xs">
            <p className="font-semibold">הפילוסופיה שלנו</p>
            <p className="mt-1 text-amber-700">המנחה מדריך, לא מגלה. כל שאלה כאן נועדה לעזור לך לחשוב — לא לחסוך את המחשבה.</p>
          </div>
        </div>
      </section>

      {/* Progress overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'שאלות נפתרו',
            value: `${analytics.solved}/${analytics.total}`,
            sub: `${analytics.solvedPct}%`,
            tone: 'emerald',
            icon: CheckCircle2,
          },
          {
            label: 'סומנו כקשות',
            value: analytics.hardCount,
            sub: 'לחיזוק',
            tone: 'rose',
            icon: Flame,
          },
          {
            label: 'פתרתי לבד',
            value: analytics.independentCount,
            sub: 'עצמאי',
            tone: 'sky',
            icon: Star,
          },
          {
            label: 'לחזרה מאוחרת',
            value: analytics.reviewLaterCount,
            sub: 'ממתינות',
            tone: 'amber',
            icon: BookOpen,
          },
        ].map(({ label, value, sub, tone, icon: Icon }) => (
          <div
            key={label}
            className={cn(
              'rounded-[1.5rem] border p-5',
              tone === 'emerald' && 'border-emerald-200 bg-emerald-50',
              tone === 'rose' && 'border-rose-200 bg-rose-50',
              tone === 'sky' && 'border-sky-200 bg-sky-50',
              tone === 'amber' && 'border-amber-200 bg-amber-50'
            )}
          >
            <div className="flex items-center justify-between">
              <p
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.16em]',
                  tone === 'emerald' && 'text-emerald-600',
                  tone === 'rose' && 'text-rose-600',
                  tone === 'sky' && 'text-sky-600',
                  tone === 'amber' && 'text-amber-600'
                )}
              >
                {label}
              </p>
              <Icon
                className={cn(
                  'h-4 w-4',
                  tone === 'emerald' && 'text-emerald-500',
                  tone === 'rose' && 'text-rose-500',
                  tone === 'sky' && 'text-sky-500',
                  tone === 'amber' && 'text-amber-500'
                )}
              />
            </div>
            <p
              className={cn(
                'mt-2 text-3xl font-bold',
                tone === 'emerald' && 'text-emerald-900',
                tone === 'rose' && 'text-rose-900',
                tone === 'sky' && 'text-sky-900',
                tone === 'amber' && 'text-amber-900'
              )}
            >
              {value}
            </p>
            <p
              className={cn(
                'mt-0.5 text-sm',
                tone === 'emerald' && 'text-emerald-700',
                tone === 'rose' && 'text-rose-700',
                tone === 'sky' && 'text-sky-700',
                tone === 'amber' && 'text-amber-700'
              )}
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {/* Weak topics */}
          <CollapsibleSection
            id="weak"
            expanded={expandedSection === 'weak'}
            onToggle={() => toggleSection('weak')}
            icon={<AlertTriangle className="h-5 w-5 text-rose-500" />}
            title="נושאים לחיזוק"
            badge={analytics.weakTopics.length > 0 ? `${analytics.weakTopics.length} נושאים` : undefined}
            badgeTone="rose"
          >
            {analytics.weakTopics.length === 0 ? (
              <div className="rounded-2xl bg-emerald-50 p-5 text-center text-sm text-emerald-700">
                <CheckCircle2 className="mx-auto mb-2 h-6 w-6" />
                אין נושאים חלשים — עבודה מצוינת!
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.weakTopics.map(({ topic, total, solved, hard, pct }) => (
                  <div key={topic.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-slate-950">{topic.title}</p>
                      <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold', pct === 0 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700')}>
                        {pct}% נפתר
                      </span>
                    </div>
                    <div className="mt-2 flex gap-3 text-xs text-slate-500">
                      <span>{solved}/{total} שאלות</span>
                      {hard > 0 && <span className="text-rose-600">{hard} סומנו כקשות</span>}
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={cn('h-full rounded-full transition-all', pct < 30 ? 'bg-rose-400' : pct < 70 ? 'bg-amber-400' : 'bg-emerald-400')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleSection>

          {/* Untouched weeks */}
          <CollapsibleSection
            id="weeks"
            expanded={expandedSection === 'weeks'}
            onToggle={() => toggleSection('weeks')}
            icon={<Target className="h-5 w-5 text-amber-500" />}
            title="שבועות שלא נגעת בהם"
            badge={analytics.untouchedWeeks.length > 0 ? `${analytics.untouchedWeeks.length}` : undefined}
            badgeTone="amber"
          >
            {analytics.untouchedWeeks.length === 0 ? (
              <p className="text-sm text-slate-500">התחלת לעבוד על כל השבועות — המשך כך!</p>
            ) : (
              <div className="space-y-3">
                {analytics.untouchedWeeks.map(({ week, total }) => (
                  <div key={week.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div>
                      <p className="font-medium text-slate-950">{week.title}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{total} שאלות ממתינות</p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                      <ArrowRight className="h-4 w-4 text-amber-700" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleSection>

          {/* Strong topics */}
          {analytics.strongTopics.length > 0 && (
            <CollapsibleSection
              id="strong"
              expanded={expandedSection === 'strong'}
              onToggle={() => toggleSection('strong')}
              icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
              title="נושאים שסיימת"
              badge={`${analytics.strongTopics.length}`}
              badgeTone="emerald"
            >
              <div className="flex flex-wrap gap-2">
                {analytics.strongTopics.map(({ topic }) => (
                  <span key={topic.id} className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800">
                    ✓ {topic.title}
                  </span>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Reflection tool */}
          <CollapsibleSection
            id="reflect"
            expanded={expandedSection === 'reflect'}
            onToggle={() => toggleSection('reflect')}
            icon={<MessageSquare className="h-5 w-5 text-slate-600" />}
            title="כלי רפלקציה"
            description="כתוב את הניסיון שלך — קבל שאלות מנחות, לא תשובות"
          >
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">שאל את עצמך</p>
                <ul className="mt-3 space-y-2">
                  {reflectionPrompts.map((prompt) => (
                    <li key={prompt} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-0.5 text-slate-400">›</span>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => { setReflection(e.target.value); setShowReflectionFeedback(false); }}
                placeholder="תאר את מה שניסית, היכן נתקעת, ומה חשבת שצריך לעשות..."
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-950"
                dir="rtl"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { if (reflection.trim().length > 20) setShowReflectionFeedback(true); }}
                  className={cn(
                    'rounded-full px-5 py-2.5 text-sm font-medium transition',
                    reflection.trim().length > 20
                      ? 'bg-slate-950 text-white! hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  )}
                >
                  קבל שאלות מנחות
                </button>
                {reflection && (
                  <button
                    type="button"
                    onClick={() => { setReflection(''); setShowReflectionFeedback(false); }}
                    className="rounded-full px-4 py-2.5 text-sm text-slate-500 hover:text-slate-950"
                  >
                    נקה
                  </button>
                )}
              </div>
              {showReflectionFeedback && (
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 space-y-3">
                  <p className="text-sm font-semibold text-sky-800">שאלות לחשיבה עמוקה יותר:</p>
                  <ul className="space-y-2 text-sm text-sky-900">
                    <li>› האם אתה בטוח שהגדרת את הבעיה נכון? מה בדיוק נשאל?</li>
                    <li>› איזה משפט או הגדרה הכי קרובים לנושא הזה?</li>
                    <li>› אם תפתור מקרה פשוט יותר — מה תלמד ממנו?</li>
                    <li>› מה ההבדל בין מה שאתה יודע לבין מה שצריך להוכיח?</li>
                    <li>› נסה לצייר את הבעיה — גרף, דיאגרמה, או מספרים קטנים.</li>
                  </ul>
                  <p className="text-xs text-sky-700 border-t border-sky-200 pt-3">
                    💡 המנחה לא נותן תשובות — הוא עוזר לך לחשוב. ניסיון עצמאי הוא הדרך היחידה ללמידה אמיתית.
                  </p>
                </div>
              )}
            </div>
          </CollapsibleSection>
        </div>

        {/* Sidebar: Socratic questions + study tip */}
        <div className="space-y-5">
          {/* Study tip */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">טיפ יומי</p>
              <button
                type="button"
                onClick={() => setTipIndex((i) => i + 1)}
                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
              >
                <RefreshCw className="h-3 w-3" />
                הבא
              </button>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <p className="font-semibold text-slate-950">{tip.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{tip.tip}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-1">
              {studyTips.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTipIndex(i)}
                  className={cn('h-1.5 rounded-full transition-all', tipIndex % studyTips.length === i ? 'w-6 bg-slate-950' : 'w-1.5 bg-slate-200')}
                />
              ))}
            </div>
          </div>

          {/* Socratic questions */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-slate-600" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">שאלות סוקרטיות</p>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              בחר נושא לקבלת שאלות מנחות שיעזרו לך לחשוב — ללא תשובות מוכנות.
            </p>

            <div className="mt-4 max-h-48 overflow-y-auto space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50 p-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id === selectedTopic ? null : topic.id)}
                  className={cn(
                    'w-full rounded-xl px-3 py-2.5 text-right text-sm font-medium transition',
                    selectedTopic === topic.id
                      ? 'bg-slate-950 text-white!'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {topic.title}
                </button>
              ))}
            </div>

            {currentTopic && (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600 flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" />
                    שאל את עצמך — {currentTopicName}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {currentTopic.guiding.map((q) => (
                      <li key={q} className="flex items-start gap-2 text-sm text-sky-900">
                        <span className="mt-0.5 shrink-0 text-sky-400">›</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-600 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    טעויות נפוצות
                  </p>
                  <ul className="mt-3 space-y-2">
                    {currentTopic.traps.map((trap) => (
                      <li key={trap} className="flex items-start gap-2 text-sm text-rose-900">
                        <span className="mt-0.5 shrink-0">⚠</span>
                        {trap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    אסטרטגיה מנצחת
                  </p>
                  <p className="mt-2 text-sm font-medium text-emerald-900">{currentTopic.strategy}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CollapsibleSection helper ───────────────────────────────────────────────
function CollapsibleSection({
  id,
  expanded,
  onToggle,
  icon,
  title,
  description,
  badge,
  badgeTone,
  children,
}: {
  id: string;
  expanded: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  description?: string;
  badge?: string;
  badgeTone?: 'rose' | 'amber' | 'emerald' | 'sky';
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-right"
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-950">{title}</p>
              {badge && (
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    badgeTone === 'rose' && 'bg-rose-100 text-rose-700',
                    badgeTone === 'amber' && 'bg-amber-100 text-amber-700',
                    badgeTone === 'emerald' && 'bg-emerald-100 text-emerald-700',
                    badgeTone === 'sky' && 'bg-sky-100 text-sky-700'
                  )}
                >
                  {badge}
                </span>
              )}
            </div>
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" /> : <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />}
      </button>
      {expanded && <div className="border-t border-slate-100 px-6 pb-6 pt-5">{children}</div>}
    </div>
  );
}
