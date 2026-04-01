'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import {
  Target, AlertTriangle, BookOpen, CheckCircle, ChevronDown, ChevronUp,
  Brain, Calendar, Clock, Zap, Shield, TrendingUp, XCircle, Award, Swords, Eye, Lightbulb, Flame,
} from 'lucide-react';

/* ════════════════════════════════════════════════════
   DATA — Liner Moed A autopsy + Moed B predictions
   ════════════════════════════════════════════════════ */

interface MoedAQ { id:string; label:string; score:number; max:number; diagnosis:string; cat:'perfect'|'good'|'partial'|'fail'|'skip'; }
const moedA: MoedAQ[] = [
  { id:'1.1', label:'הוכחת (AB)C=A(BC) דיסטריביוטיביות', score:11, max:17, diagnosis:'חסר נימוק מעברים אלגבריים בפירוט', cat:'good' },
  { id:'1.2', label:'det(A+B)=det(A-B) סימטרית/אנטי-סימ\'', score:8, max:8, diagnosis:'מושלם!', cat:'perfect' },
  { id:'2.1', label:'ת"ל ⟺ ייצוג יחיד', score:10, max:13, diagnosis:'כיוון נכון, הוכחה לא שלמה', cat:'good' },
  { id:'2.2', label:'מציאת A⁻¹ מעל Z₅', score:9, max:12, diagnosis:'שגיאות חישוב', cat:'good' },
  { id:'3.1', label:'מערכת עם פרמטר a — סיווג פתרונות', score:7, max:13, diagnosis:'אין פתרון מסודר לכל המקרים', cat:'partial' },
  { id:'3.2', label:'Span{u₁+w₁,...}∩W={0}', score:3, max:12, diagnosis:'ביצוע חסר משמעות מתמטית — X על שלבים', cat:'fail' },
  { id:'4.1', label:'(PA)x̄=0 ⟺ Ax̄=0 שקילות מערכות', score:0, max:12, diagnosis:'לא הבנת את הגישה — 0 נקודות', cat:'fail' },
  { id:'4.2.1', label:'dim(U∩W) חישוב', score:2, max:5, diagnosis:'בלאגן גדול', cat:'fail' },
  { id:'4.2.2', label:'U+W = Span{u}+W', score:0, max:8, diagnosis:'0 נקודות — לא ידעת להוכיח', cat:'fail' },
  { id:'5.1', label:'det של מטריצה אנטי-אלכסונית', score:0, max:12, diagnosis:'לא ניסית / ריק', cat:'skip' },
  { id:'5.2', label:'שאלת det/הוכחה', score:0, max:13, diagnosis:'לא ניסית / ריק', cat:'skip' },
];

interface Gap { gap:string; pointsLost:number; fix:string; priority:'critical'|'high'|'medium'; }
const gaps: Gap[] = [
  { gap:'הוכחות על תת-מרחבים / span / dim — לא יודעת לכתוב', pointsLost:21, fix:'שנן 6 משפטים מרכזיים עם proof flows', priority:'critical' },
  { gap:'שאלות 5 דילגת — דטרמיננטות', pointsLost:25, fix:'תרגול det אנטי-אלכסונית, det(AB)=det(A)det(B)', priority:'critical' },
  { gap:'מערכת עם פרמטר — אין שיטה מסודרת', pointsLost:6, fix:'לתרגל: דירוג → מציאת ערכי a → סיווג לכל מקרה', priority:'high' },
  { gap:'שקילות מערכות (PA)x̄=0 ⟺ Ax̄=0', pointsLost:12, fix:'להבין: P הפיכה → Nul(PA)=Nul(A)', priority:'high' },
  { gap:'נימוק מעברים אלגבריים חסר', pointsLost:8, fix:'לכתוב "לפי..." בכל שלב', priority:'medium' },
];

interface Theorem { id:number; name:string; fullName:string; topic:string; prob:number; conditions:string[]; flow:string[]; source:string; }
const theorems: Theorem[] = [
  {
    id:1, name:'משפט הדרגה והאפסיות (Rank-Nullity)',
    fullName:'rank(A) + dim(NulA) = n',
    topic:'נושא: מרחב האפס NulA + דרגה (dimension, הרצאות 13-18)',
    prob:95,
    conditions:['A ∈ M_{m×n}(F) — מטריצה כלשהי (לא חייבת להיות ריבועית)','n = מספר העמודות של A'],
    flow:[
      'דרג את A לצורה מדורגת קנונית C (פעולות שורה אלמנטריות)',
      'ספור כניסות מובילות → זה rank(A) = k',
      'ספור משתנים חופשיים → יש n-k כאלה',
      'בנה בסיס ל-NulA: לכל משתנה חופשי, שים 1 בו ו-0 בשאר החופשיים, ופתור את הקשורים',
      'קבלת n-k וקטורים שהם בת"ל (כל אחד עם 1 במקום אחר)',
      'אלה פורשים את NulA → dim(NulA) = n-k',
      'סיכום: rank(A) + dim(NulA) = k + (n-k) = n ∎',
    ],
    source:'הסיכום שלך: עמוד "מרחב האפס" (NulA) + עמוד "dimension" · לא נבחן במועד א\'!',
  },
  {
    id:2, name:'שרשרת השקילויות של מטריצה הפיכה',
    fullName:'A הפיכה ⟺ rank=n ⟺ det≠0 ⟺ עמודות בת"ל ⟺ ...',
    topic:'נושא: הפיכות מטריצות (הרצאות 16-18) + דטרמיננטות (הרצאות 19-26)',
    prob:90,
    conditions:['A ∈ Mₙ(F) — מטריצה ריבועית n×n'],
    flow:[
      'A הפיכה (קיימת B כך ש-AB = BA = Iₙ)',
      '⟺ הצורה הקנונית של A היא Iₙ (מהסיכום: "אלגוריתם היפוך")',
      '⟺ rank(A) = n (כל עמודה עם כניסה מובילה)',
      '⟺ עמודות A בלתי תלויות לינארית',
      '⟺ עמודות A בסיס ל-Fⁿ (כי n וקטורים בת"ל ב-Fⁿ → בסיס)',
      '⟺ Ax̄ = 0̄ → רק פתרון טריוויאלי (מהסיכום: "מסקנה 1")',
      '⟺ NulA = {0̄} (מרחב האפס טריוויאלי)',
      '⟺ ColA = Fⁿ (מרחב העמודות הוא כל Fⁿ)',
      '⟺ A ניתנת לפירוק כמכפלת מטריצות אלמנטריות',
      '⟺ det(A) ≠ 0 (מפרק דטרמיננטות)',
      'בנה שרשרת מעגלית — כל חץ עם נימוק ∎',
    ],
    source:'הסיכום שלך: עמודים "הפיכה"+"אלגוריתם היפוך"+"מסקנות" · הופיע בכל מועד ב\'',
  },
  {
    id:3, name:'משפט השלש (בסיס ⟺ בת"ל מקסימלית ⟺ פורשת מינימלית)',
    fullName:'אם dim(V)=n ויש n וקטורים: בסיס ⟺ בת"ל ⟺ פורשים',
    topic:'נושא: בסיס + dimension (הרצאות 11-15)',
    prob:85,
    conditions:['V מ"ו מעל F עם dim(V) = n','v₁,...,vₙ ∈ V — בדיוק n וקטורים'],
    flow:[
      '(1) בסיס → (2) בת"ל: ישירות מהגדרת בסיס (בסיס = בת"ל + פורשת)',
      '(2) בת"ל → (3) פורשים: בשלילה — נניח לא פורשים → קיים v ∉ Span{v₁,...,vₙ}',
      '→ {v₁,...,vₙ,v} הם n+1 וקטורים בת"ל',
      '→ אבל מסקנה א\' בסיכום שלך: dim(V)=n → כל n+1 וקטורים הם ת"ל. סתירה!',
      '(3) פורשים → (1) בסיס: בשלילה — נניח ת"ל → קיים vⱼ שמיותר (מהסיכום: "ת"ל אומם")',
      '→ n-1 וקטורים פורשים את V',
      '→ אבל מסקנה ב\': dim(V)=n → כל n-1 וקטורים לא פורשים. סתירה! ∎',
    ],
    source:'הסיכום שלך: עמוד "dimension" — "משפט השלש" (14) · הרצאות 13-15',
  },
  {
    id:4, name:'כפליות הדטרמיננטה: det(AB) = det(A)·det(B)',
    fullName:'det(AB) = det(A)·det(B)',
    topic:'נושא: דטרמיננטות — תכונות (הרצאות 19-26)',
    prob:75,
    conditions:['A, B ∈ Mₙ(F) — שתי מטריצות ריבועיות מאותו סדר'],
    flow:[
      'מקרה 1: B לא הפיכה → rank(B) < n',
      '→ rank(AB) ≤ rank(B) < n → AB לא הפיכה',
      '→ det(AB) = 0 = det(A)·0 = det(A)·det(B) ✓',
      'מקרה 2: B הפיכה → מאלגוריתם ההיפוך, B = E₁·E₂···Eₖ (מכפלת מטריצות אלמנטריות)',
      'למה (חובה לדעת): לכל מטריצה אלמנטרית E: det(EA) = det(E)·det(A)',
      '  — כפל שורה ב-c: det(E) = c',
      '  — החלפת שורות: det(E) = -1',
      '  — הוספת כפולה: det(E) = 1',
      'det(AB) = det(A·E₁···Eₖ) = det(A)·det(E₁)···det(Eₖ) = det(A)·det(B) ∎',
    ],
    source:'הסיכום שלך: חסר מהסיכום הנוכחי — נמצא ב-QUICK_REFERENCE · לא נבחן במועד א\'!',
  },
  {
    id:5, name:'דרגת שורות = דרגת עמודות = rank',
    fullName:'dimColA = dimRowA = rankA',
    topic:'נושא: מרחב שורות ומרחב עמודות (הרצאות 16-18)',
    prob:70,
    conditions:['A ∈ M_{m×n}(F)'],
    flow:[
      'חלק 1 — דרגת שורות = rank:',
      'דרג A לצורה קנונית C. פעולות שורה משמרות את מרחב השורות: RowA = RowC',
      'השורות ≠0 של C הן בסיס ל-RowC (הן בת"ל כי כל כניסה מובילה במקום אחר)',
      'מספרן = מספר כניסות מובילות = rankA → dimRowA = rankA',
      'חלק 2 — דרגת עמודות = rank:',
      'עמודות ה-pivot של A (אלה שמתאימות לכניסות מובילות) הן בת"ל',
      'הן פורשות את ColA',
      'מספרן = rankA → dimColA = rankA ∎',
    ],
    source:'הסיכום שלך: עמוד "מרחב שורות ומרחב עמודות" — "משפט: dimColA = dimRowA"',
  },
  {
    id:6, name:'למת ההחלפה של שטייניץ',
    fullName:'אם v₁,...,vₖ בת"ל ו-w₁,...,wₘ פורשים אז k ≤ m',
    topic:'נושא: בסיס + dimension — למה מרכזית (הרצאות 11-12)',
    prob:70,
    conditions:['V מ"ו מעל F','v₁,...,vₖ ∈ V בלתי תלויים לינארית','w₁,...,wₘ ∈ V פורשים את V'],
    flow:[
      'רוצים להוכיח: k ≤ m',
      'v₁ ∈ Span{w₁,...,wₘ} (כי w פורשים) → v₁ = צ"ל של w',
      'החלף את wⱼ (שמקדמו ≠ 0) ב-v₁ → הקבוצה {v₁,w₁,...,wⱼ₋₁,wⱼ₊₁,...,wₘ} עדיין פורשת',
      'חזור עם v₂: הוא צ"ל של הקבוצה החדשה → החלף עוד w',
      'ממשיכים k פעמים. אם k > m: אחרי m החלפות אין יותר w להחליף, אבל עוד יש v בת"ל → סתירה',
      'מסקנה מתבקשת: לכל שני בסיסים של V יש אותו מספר איברים → dim מוגדר היטב ∎',
    ],
    source:'הסיכום שלך: עמוד "בסיס" (הרצאות 11-12) — "למת ההחלפה של שטייניץ"',
  },
];

interface DayPlan { day:number; date:string; weekday:string; title:string; blocks:{time:string;task:string;hours:number}[]; }
const plan: DayPlan[] = [
  { day:1, date:'1.4', weekday:'רביעי', title:'נושא: מרחב האפס NulA + דרגה → משפט Rank-Nullity', blocks:[
    { time:'20:00-21:00', task:'פתח את הסיכום שלך עמוד "NulA" + "dimension". קרא את ההגדרות: NulA = {x̄∈Fⁿ | Ax̄=0̄}, dim(NulA) = מספר משתנים חופשיים. ואז קרא את הוכחת rank(A)+dim(NulA)=n בעמוד של QUICK_REFERENCE_6_PROOFS.', hours:1 },
    { time:'21:00-22:00', task:'כתוב את ההוכחה מזיכרון על דף ריק: דרג→ספור→בנה בסיס ל-NulA→סכום=n. השווה עם הפתרון. חזור על שגיאות.', hours:1 },
  ]},
  { day:2, date:'2.4', weekday:'חמישי', title:'נושא: בסיס + dimension → משפט השלש + למת שטייניץ', blocks:[
    { time:'20:00-21:00', task:'בסיכום שלך: עמוד "בסיס" (הרצאות 11-12) — למת ההחלפה של שטייניץ. ואז עמוד "dimension" (הרצאות 13-15) — משפט השלש (14): בסיס ⟺ בת"ל ⟺ פורשים כאשר dim=n. קרא את שתי ההוכחות.', hours:1 },
    { time:'21:00-21:30', task:'כתוב מזיכרון. תרגל: "יהי V מ"ו עם dim(V)=5 ויהיו v₁,...,v₅ בת"ל. הוכח שהם בסיס של V." (השתמש במשפט השלש)', hours:0.5 },
  ]},
  { day:3, date:'3.4', weekday:'שישי', title:'נושא: דטרמיננטות → det(AB)=det(A)·det(B) + dimColA=dimRowA', blocks:[
    { time:'20:00-21:00', task:'קרא QUICK_REFERENCE הוכחות 4+5. det(AB): 2 מקרים — B לא הפיכה / B הפיכה (פירוק לאלמנטריות). dimColA=dimRowA: דירוג משמר RowA, עמודות pivot = ColA.', hours:1 },
    { time:'21:00-21:30', task:'פתור מועד א\' שאלה 5.1: det של מטריצה אנטי-אלכסונית מסדר 2026. (טיפ: החלף שורות כדי להגיע למטריצה אלכסונית, ספור סימנים)', hours:0.5 },
  ]},
  { day:4, date:'4.4', weekday:'שבת', title:'נושא: מערכות לינאריות עם פרמטר (הרצאות 4-6)', blocks:[
    { time:'20:00-21:30', task:'פתור מועד א\' שאלה 3.1 מחדש. שיטה מסודרת: (1) כתוב מטריצה מורחבת A⁺. (2) דרג לצורה מדורגת. (3) מצא את ערכי a שבהם rank משתנה (בד"כ כשמכנה/שורה מתאפסת). (4) לכל ערך a כתוב: "אין פתרון"/"פתרון יחיד"/"∞ פתרונות" לפי rank(A) vs rank(A⁺). (5) כשיש ∞ — כתוב את הפתרון הכללי G = {x̄₀ + h̄ | h̄ ∈ NulA}.', hours:1.5 },
  ]},
  { day:5, date:'5.4', weekday:'ראשון', title:'נושא: תת-מרחבים, Span, סכום ישר U⊕W (הרצאות 7-10, 13-15)', blocks:[
    { time:'20:00-21:30', task:'פתור מועד א\' Q3.2 + Q4.2 מחדש. Q3.2: הוכח Span{u₁+w₁,...}∩W = {0_V} — השתמש בהגדרת "בת"ל מודולו W" מהסיכום שלך. Q4.2: הוכח U+W = Span{u}+W — השתמש במשפט הממדים הראשון: dim(U+W) = dimU + dimW - dim(U∩W). שים לב להערות הבודק: "ביצוע חסר משמעות" / "תמיד קיימים סקלרים" / "סקלר תמיד מצד שמאל".', hours:1.5 },
  ]},
  { day:6, date:'6.4', weekday:'שני', title:'נושא: הפיכות + שקילות מערכות + מטריצות אלמנטריות (הרצאות 16-18)', blocks:[
    { time:'20:00-21:00', task:'מהסיכום שלך עמוד "הפיכה": אם P הפיכה אז המערכות (PA)x̄=0̄ ו-Ax̄=0̄ שקולות (אותה קבוצת פתרונות). למה? כי P הפיכה → אפשר לכפול משמאל ב-P⁻¹. פתור Q4.1 מחדש. ואז: חזור על אלגוריתם ההיפוך — [A|Iₙ] דירוג עד [Iₙ|A⁻¹].', hours:1 },
    { time:'21:00-21:30', task:'חזרה: כתוב flow של 6 ההוכחות בשורה אחת כל אחד — רק שלבים, בלי פירוט.', hours:0.5 },
  ]},
  { day:7, date:'7.4', weekday:'שלישי', title:'מבחן תרגול: מועד ב\' 2024-25', blocks:[
    { time:'20:00-21:30', task:'פתור מועד ב\' 2024-25 מהתיקייה PAST_EXAMS. 1.5 שעות. בחר 4 מתוך 5 שאלות. בסוף — בדוק תשובות מול הפתרון.', hours:1.5 },
  ]},
  { day:8, date:'8.4', weekday:'רביעי', title:'ניתוח טעויות B2025 + חזרה על חולשות', blocks:[
    { time:'20:00-21:00', task:'עבור על כל שאלה שטעית בה: מה המשפט/הגדרה שחסר? זה rank-nullity? שרשרת הפיכות? בת"ל/ת"ל? תרגל שוב את הסוג שנכשל.', hours:1 },
    { time:'21:00-21:30', task:'כתוב 6 ההוכחות בקצרה מזיכרון. תקן מול QUICK_REFERENCE_6_PROOFS.', hours:0.5 },
  ]},
  { day:9, date:'9.4', weekday:'חמישי', title:'מבחן תרגול: מועד ב\' 2023-24', blocks:[
    { time:'20:00-21:30', task:'פתור מועד ב\' 2023-24 מהתיקייה PAST_EXAMS. דגש: שים לב אם יש שאלת הוכחה של rank-nullity / שרשרת הפיכות / dim. אלה שאלות הכסף.', hours:1.5 },
  ]},
  { day:10, date:'10.4', weekday:'שישי', title:'נושא: דטרמיננטות — חישוב + תכונות (הרצאות 19-26)', blocks:[
    { time:'20:00-21:00', task:'תרגל 5 שאלות det: (1) det אנטי-אלכסונית (2) det של מטריצה עם פרמטר (3) det(AB) מתוך det(A) ו-det(B) (4) det(Aᵗ)=det(A) (5) det בלוקים עליונה/תחתונה. השתמש בקובץ PAST_EXAMS למציאת שאלות.', hours:1 },
    { time:'21:00-21:30', task:'כתוב מזיכרון: הוכחת det(AB)=det(A)·det(B) — 2 המקרים + הלמה על אלמנטריות.', hours:0.5 },
  ]},
  { day:11, date:'11.4', weekday:'שבת', title:'מבחן תרגול: מועד ב\' 2022-23', blocks:[
    { time:'20:00-21:30', task:'פתור מועד ב\' 2022-23. 1.5 שעות. 4 מתוך 5. בדוק תשובות.', hours:1.5 },
  ]},
  { day:12, date:'12.4', weekday:'ראשון', title:'סימולציה 2026 + 2 הנושאים הכי חלשים שלך', blocks:[
    { time:'20:00-21:00', task:'פתור את סימולציית 2026 מתיקייה PAST_EXAMS (אם לא פתרת). בדוק.', hours:1 },
    { time:'21:00-21:30', task:'מיקוד ב-2 הנושאים שנכשלת בהם הכי הרבה ב-3 המבחנים. תרגול נוסף.', hours:0.5 },
  ]},
  { day:13, date:'13.4', weekday:'שני', title:'חזרה סופית — כל 6 ההוכחות + חישובים', blocks:[
    { time:'20:00-21:00', task:'כתוב את 6 ההוכחות ברצף מזיכרון על דף ריק: (1) rank-nullity (2) שרשרת הפיכות (3) משפט השלש (4) det(AB) (5) dimColA=dimRowA (6) שטייניץ. תקן שגיאות.', hours:1 },
    { time:'21:00-21:30', task:'חישובים מהירים: (1) היפוך מטריצה [A|I] (2) חישוב det (3) דירוג מערכת עם פרמטר — סיווג מקרים.', hours:0.5 },
  ]},
  { day:14, date:'14.4', weekday:'שלישי', title:'ערב מבחן — חזרה קלה בלבד', blocks:[
    { time:'20:00-21:00', task:'קרא את קובץ QUICK_REFERENCE_6_PROOFS מהתיקייה LINER. מעבר על ה-flow של כל משפט. אל תפתור שאלות חדשות. אל תלמד נושאים חדשים. מנוחה.', hours:1 },
  ]},
];

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */
function catColor(c:MoedAQ['cat']){switch(c){case'perfect':return'bg-emerald-100 text-emerald-800 border-emerald-300';case'good':return'bg-blue-100 text-blue-800 border-blue-300';case'partial':return'bg-amber-100 text-amber-800 border-amber-300';case'fail':return'bg-red-100 text-red-800 border-red-300';case'skip':return'bg-gray-100 text-gray-500 border-gray-300';}}
function catLabel(c:MoedAQ['cat']){switch(c){case'perfect':return'מושלם';case'good':return'טוב';case'partial':return'חלקי';case'fail':return'נכשל';case'skip':return'דילוג';}}
function probColor(p:number){return p>=85?'bg-red-500':p>=70?'bg-orange-500':'bg-yellow-500';}

/* ════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════ */
export default function LinerBattlePlanPage(){
  const[tab,setTab]=useState<'autopsy'|'theorems'|'plan'>('autopsy');
  const[expDays,setExpDays]=useState<Record<number,boolean>>({1:true});
  const[expThm,setExpThm]=useState<Record<number,boolean>>({});

  const tabs=[
    {id:'autopsy' as const,label:'ניתוח מועד א\'',icon:<Target className="w-4 h-4"/>},
    {id:'theorems' as const,label:'6 משפטים + Flows',icon:<Brain className="w-4 h-4"/>},
    {id:'plan' as const,label:'תוכנית 14 יום',icon:<Calendar className="w-4 h-4"/>},
  ];

  return(
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6 pb-12">

        {/* Hero */}
        <div className="bg-gradient-to-l from-violet-700 via-indigo-700 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Swords className="w-8 h-8"/>
            <h1 className="text-2xl font-extrabold">LINER BATTLE PLAN — מועד ב׳ 2026</h1>
          </div>
          <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
            לינארית — 1.5-2 שעות ביום במקביל לאינפי. שינון 6 משפטים + תרגול מבחנים + חיזוק חולשות.
          </p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-bold">50</div>
              <div className="text-xs text-white/80">מועד א׳</div>
            </div>
            <div className="flex items-center"><div className="text-3xl">→</div></div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-bold">85+</div>
              <div className="text-xs text-white/80">יעד מועד ב׳</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-center mr-auto">
              <div className="text-sm font-bold">1.5-2 שעות/יום</div>
              <div className="text-xs text-white/70">במקביל לאינפי</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab===t.id?'bg-slate-900 text-white':'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* ─── Autopsy ─── */}
        {tab==='autopsy'&&(
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2"><Target className="w-5 h-5 text-red-500"/>פירוט ציון מועד א׳ — 50/100</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {moedA.map(q=>(
                  <div key={q.id} className="flex items-center gap-3 px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${catColor(q.cat)}`}>{catLabel(q.cat)}</span>
                    <span className="font-mono text-sm text-slate-500 w-10">{q.id}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">{q.label}</div>
                      <div className="text-xs text-slate-500">{q.diagnosis}</div>
                    </div>
                    <div className="text-left font-mono text-sm font-bold">
                      <span className={q.score===q.max?'text-emerald-600':q.score===0?'text-red-500':'text-amber-600'}>{q.score}</span>
                      <span className="text-slate-400">/{q.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/>5 הפערים שעלו לך 50 נקודות</h2>
              </div>
              <div className="p-4 space-y-3">
                {gaps.map((g,i)=>(
                  <div key={i} className={`rounded-lg border p-3 ${g.priority==='critical'?'bg-red-50 border-red-200':g.priority==='high'?'bg-amber-50 border-amber-200':'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-800">{g.gap}</span>
                      <span className="font-mono text-sm font-bold text-red-600">-{g.pointsLost} נק׳</span>
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0"/>{g.fix}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-2"><Award className="w-5 h-5"/>מה את כבר עושה טוב</h3>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/>det(A+B)=det(A-B) — ציון מלא 8/8</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/>ת"ל ⟺ ייצוג יחיד — 10/13, כיוון נכון</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/>חישוב A⁻¹ — 9/12, שגיאות חישוב קטנות בלבד</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4"/>הבנת תכונות סימטרית/אנטי-סימטרית</li>
              </ul>
            </div>

            {/* What was tested */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2"><XCircle className="w-5 h-5 text-slate-400"/>כבר נבחן במועד א׳ (סבירות נמוכה לחזרה)</h3>
              <ul className="space-y-1 text-sm text-slate-500">
                <li>(AB)C = A(BC) — הוכחת אסוציאטיביות</li>
                <li>(AB)ᵗ = BᵗAᵗ — כפל שחלוף</li>
                <li>det(A+B)=det(A-B) לסימטרית/אנטי-סימ׳</li>
                <li>ת"ל ⟺ ייצוג יחיד</li>
                <li>ℂ כמרחב וקטורי מעל ℝ</li>
              </ul>
            </div>
          </div>
        )}

        {/* ─── Theorems ─── */}
        {tab==='theorems'&&(
          <div className="space-y-3">
            <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
              <p className="text-sm text-indigo-800 font-medium"><Brain className="w-4 h-4 inline ml-1"/>6 משפטים עם הסבירות הגבוהה ביותר. לכל אחד: תנאים + proof flow.</p>
            </div>
            {theorems.map(t=>(
              <div key={t.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={()=>setExpThm(p=>({...p,[t.id]:!p[t.id]}))} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 text-right">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${probColor(t.prob)}`}>{t.id}</span>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-600 font-medium">{t.fullName}</div>
                      <div className="text-xs text-indigo-500 mt-0.5">{t.topic}</div>
                    </div>
                  </div>
                  {expThm[t.id]?<ChevronUp className="w-5 h-5 text-slate-400"/>:<ChevronDown className="w-5 h-5 text-slate-400"/>}
                </button>
                {expThm[t.id]&&(
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                    {/* Conditions */}
                    <div>
                      <div className="mb-1.5 text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-sky-400"/>תנאים</div>
                      <ul className="space-y-1">
                        {t.conditions.map((c,i)=>(
                          <li key={i} className="flex items-start gap-2 rounded-lg bg-sky-50 border border-sky-200 px-3 py-1.5 text-sm text-slate-800"><span className="mt-0.5 text-sky-500 font-bold text-xs">✓</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Flow */}
                    <div>
                      <div className="mb-2 text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-amber-400"/>Flow הוכחה</div>
                      <div className="relative pr-4">
                        <div className="absolute right-[7px] top-2 bottom-2 w-0.5 bg-amber-300 rounded-full"/>
                        <ol className="space-y-2">
                          {t.flow.map((s,i)=>(
                            <li key={i} className="relative flex items-start gap-3">
                              <span className="relative z-10 mt-1.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">{i+1}</span>
                              <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-sm leading-7 text-slate-800 flex-1">{s}</div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">{t.source}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── Plan ─── */}
        {tab==='plan'&&(
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Calendar className="w-6 h-6 text-indigo-500 mx-auto mb-1"/>
                <div className="text-2xl font-bold text-slate-900">14</div>
                <div className="text-xs text-slate-500">ימים</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Clock className="w-6 h-6 text-indigo-500 mx-auto mb-1"/>
                <div className="text-2xl font-bold text-slate-900">1.5-2</div>
                <div className="text-xs text-slate-500">שעות ביום</div>
              </div>
            </div>
            {plan.map(d=>(
              <div key={d.day} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={()=>setExpDays(p=>({...p,[d.day]:!p[d.day]}))} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3 text-right">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${d.day<=3?'bg-violet-500':d.day<=7?'bg-indigo-500':d.day<=13?'bg-blue-500':'bg-emerald-500'}`}>{d.day}</span>
                    <div>
                      <div className="font-bold text-slate-900">{d.title}</div>
                      <div className="text-xs text-slate-500">{d.weekday} {d.date} | {d.blocks.reduce((s,b)=>s+b.hours,0)} שעות</div>
                    </div>
                  </div>
                  {expDays[d.day]?<ChevronUp className="w-5 h-5 text-slate-400"/>:<ChevronDown className="w-5 h-5 text-slate-400"/>}
                </button>
                {expDays[d.day]&&(
                  <div className="px-4 pb-4 space-y-2 border-t border-slate-100 pt-3">
                    {d.blocks.map((b,i)=>(
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="font-mono text-xs text-slate-400 w-24 flex-shrink-0 pt-0.5" dir="ltr">{b.time}</span>
                        <span className="text-slate-700">{b.task}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}
