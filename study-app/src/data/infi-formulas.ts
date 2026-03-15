// Key Calculus 1 Formulas - organized by topic

export interface Formula {
  formula: string;
  name: string;
  nameHe: string;
  category: string;
}

export interface FormulaCategory {
  id: string;
  title: string;
  titleHe: string;
  formulas: Formula[];
}

export const formulaCategories: FormulaCategory[] = [
  {
    id: 'limits',
    title: 'Important Limits',
    titleHe: 'גבולות חשובים',
    formulas: [
      { formula: 'lim(x→0) sin(x)/x = 1', name: 'Sinc limit', nameHe: 'גבול סינק', category: 'limits' },
      { formula: 'lim(n→∞) (1+1/n)^n = e', name: 'Euler limit', nameHe: 'גבול אוילר', category: 'limits' },
      { formula: 'lim(x→0) (1+x)^(1/x) = e', name: 'Euler limit (function)', nameHe: 'גבול אוילר (פונקציה)', category: 'limits' },
      { formula: 'lim(x→0) (e^x - 1)/x = 1', name: 'Exponential limit', nameHe: 'גבול אקספוננציאלי', category: 'limits' },
      { formula: 'lim(x→0) ln(1+x)/x = 1', name: 'Logarithmic limit', nameHe: 'גבול לוגריתמי', category: 'limits' },
      { formula: 'lim(x→0) (1-cos x)/x² = 1/2', name: 'Cosine limit', nameHe: 'גבול קוסינוס', category: 'limits' },
      { formula: 'lim(x→∞) (1+a/x)^(bx) = e^(ab)', name: 'Generalized Euler', nameHe: 'אוילר מוכלל', category: 'limits' },
    ],
  },
  {
    id: 'derivatives',
    title: 'Derivative Rules',
    titleHe: 'כללי גזירה',
    formulas: [
      { formula: "(x^n)' = n·x^(n-1)", name: 'Power rule', nameHe: 'כלל החזקה', category: 'derivatives' },
      { formula: "(e^x)' = e^x", name: 'Exponential', nameHe: 'אקספוננט', category: 'derivatives' },
      { formula: "(a^x)' = a^x · ln(a)", name: 'General exponential', nameHe: 'אקספוננט כללי', category: 'derivatives' },
      { formula: "(ln x)' = 1/x", name: 'Natural log', nameHe: 'לוגריתם טבעי', category: 'derivatives' },
      { formula: "(sin x)' = cos x", name: 'Sine', nameHe: 'סינוס', category: 'derivatives' },
      { formula: "(cos x)' = -sin x", name: 'Cosine', nameHe: 'קוסינוס', category: 'derivatives' },
      { formula: "(tan x)' = 1/cos²(x)", name: 'Tangent', nameHe: 'טנגנס', category: 'derivatives' },
      { formula: "(arcsin x)' = 1/√(1-x²)", name: 'Arcsine', nameHe: 'ארקסינוס', category: 'derivatives' },
      { formula: "(arctan x)' = 1/(1+x²)", name: 'Arctangent', nameHe: 'ארקטנגנס', category: 'derivatives' },
      { formula: "(f·g)' = f'g + fg'", name: 'Product rule', nameHe: 'כלל המכפלה', category: 'derivatives' },
      { formula: "(f/g)' = (f'g - fg')/g²", name: 'Quotient rule', nameHe: 'כלל המנה', category: 'derivatives' },
      { formula: "(f∘g)' = f'(g(x))·g'(x)", name: 'Chain rule', nameHe: 'כלל השרשרת', category: 'derivatives' },
    ],
  },
  {
    id: 'taylor',
    title: 'Taylor Series',
    titleHe: 'טורי טיילור',
    formulas: [
      { formula: 'e^x = Σ x^n/n! (n=0→∞)', name: 'Exponential series', nameHe: 'טור אקספוננט', category: 'taylor' },
      { formula: 'sin x = Σ (-1)^n · x^(2n+1)/(2n+1)!', name: 'Sine series', nameHe: 'טור סינוס', category: 'taylor' },
      { formula: 'cos x = Σ (-1)^n · x^(2n)/(2n)!', name: 'Cosine series', nameHe: 'טור קוסינוס', category: 'taylor' },
      { formula: 'ln(1+x) = Σ (-1)^(n+1) · x^n/n', name: 'Log series', nameHe: 'טור לוגריתם', category: 'taylor' },
      { formula: '1/(1-x) = Σ x^n (|x|<1)', name: 'Geometric series', nameHe: 'טור הנדסי', category: 'taylor' },
      { formula: '(1+x)^α = Σ C(α,n)·x^n', name: 'Binomial series', nameHe: 'טור בינומי', category: 'taylor' },
      { formula: 'arctan x = Σ (-1)^n · x^(2n+1)/(2n+1)', name: 'Arctan series', nameHe: 'טור ארקטנגנס', category: 'taylor' },
    ],
  },
  {
    id: 'series-tests',
    title: 'Series Convergence Tests',
    titleHe: 'מבחני התכנסות טורים',
    formulas: [
      { formula: 'lim|a(n+1)/a(n)| < 1 → מתכנס', name: 'Ratio test', nameHe: "מבחן דלמבר (המנה)", category: 'series' },
      { formula: 'lim|a(n)|^(1/n) < 1 → מתכנס', name: 'Root test', nameHe: 'מבחן קושי (השורש)', category: 'series' },
      { formula: '0 ≤ aₙ ≤ bₙ, Σbₙ מתכנס → Σaₙ מתכנס', name: 'Comparison test', nameHe: 'מבחן ההשוואה', category: 'series' },
      { formula: 'lim(aₙ/bₙ) = L > 0 → שניהם מתכנסים או שניהם מתבדרים', name: 'Limit comparison', nameHe: 'מבחן ההשוואה הגבולי', category: 'series' },
      { formula: 'aₙ↓0 ומונוטונית → Σ(-1)^n·aₙ מתכנס', name: 'Leibniz test', nameHe: 'מבחן לייבניץ', category: 'series' },
      { formula: 'f↓, f≥0: Σf(n) מתכנס ⟺ ∫f(x)dx מתכנס', name: 'Integral test', nameHe: 'מבחן האינטגרל', category: 'series' },
      { formula: 'Σ 1/n^p: מתכנס ⟺ p > 1', name: 'p-series', nameHe: 'טור p', category: 'series' },
      { formula: 'R = 1/lim sup|aₙ|^(1/n)', name: 'Radius of convergence', nameHe: 'רדיוס התכנסות', category: 'series' },
    ],
  },
  {
    id: 'theorems',
    title: 'Key Theorems',
    titleHe: 'משפטים מרכזיים',
    formulas: [
      { formula: 'f רציפה ב-[a,b], f(a)·f(b)<0 → ∃c: f(c)=0', name: 'IVT', nameHe: 'משפט ערך הביניים', category: 'theorems' },
      { formula: 'f רציפה ב-[a,b] → f מקבלת מקסימום ומינימום', name: 'EVT', nameHe: 'משפט ערכי הקיצון', category: 'theorems' },
      { formula: "f גזירה ב-(a,b), רציפה ב-[a,b] → ∃c: f'(c)=(f(b)-f(a))/(b-a)", name: 'MVT', nameHe: 'משפט הערך הממוצע (לגראנז\')', category: 'theorems' },
      { formula: "f(a)=f(b), f גזירה → ∃c∈(a,b): f'(c)=0", name: "Rolle's theorem", nameHe: 'משפט רול', category: 'theorems' },
      { formula: "lim f/g = lim f'/g' (0/0 or ∞/∞)", name: "L'Hôpital's rule", nameHe: 'כלל לופיטל', category: 'theorems' },
      { formula: 'f(x) = Σ f^(k)(a)/k! · (x-a)^k + Rₙ(x)', name: "Taylor's theorem", nameHe: 'משפט טיילור', category: 'theorems' },
      { formula: "Rₙ(x) = f^(n+1)(c)/(n+1)! · (x-a)^(n+1)", name: 'Lagrange remainder', nameHe: 'שארית לגראנז\'', category: 'theorems' },
    ],
  },
];

export const allFormulas: Formula[] = formulaCategories.flatMap(c => c.formulas);

export function getFormulasByCategory(categoryId: string): Formula[] {
  return formulaCategories.find(c => c.id === categoryId)?.formulas || [];
}
