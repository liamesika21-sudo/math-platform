# Calculus 1 - Quick Reference Guide
## Essential Formulas and Theorems

---

## DERIVATIVE RULES

| Function | Derivative |
|----------|-----------|
| xⁿ | n·xⁿ⁻¹ |
| eˣ | eˣ |
| aˣ | aˣ·ln(a) |
| ln(x) | 1/x |
| logₐ(x) | 1/(x·ln(a)) |
| sin(x) | cos(x) |
| cos(x) | -sin(x) |
| tan(x) | sec²(x) |
| cot(x) | -csc²(x) |
| sec(x) | sec(x)·tan(x) |
| csc(x) | -csc(x)·cot(x) |
| arcsin(x) | 1/√(1-x²) |
| arccos(x) | -1/√(1-x²) |
| arctan(x) | 1/(1+x²) |

---

## DIFFERENTIATION RULES

**Sum Rule:** (f + g)' = f' + g'

**Difference Rule:** (f - g)' = f' - g'

**Product Rule:** (f·g)' = f'·g + f·g'

**Quotient Rule:** (f/g)' = (f'·g - f·g')/g²

**Chain Rule:** (f ∘ g)'(x) = f'(g(x))·g'(x)

**Power Rule with Chain:** d/dx[u(x)]ⁿ = n·[u(x)]ⁿ⁻¹·u'(x)

---

## INTEGRATION FORMULAS

| Function | Antiderivative |
|----------|----------------|
| xⁿ (n ≠ -1) | xⁿ⁺¹/(n+1) + C |
| 1/x | ln\|x\| + C |
| eˣ | eˣ + C |
| aˣ | aˣ/ln(a) + C |
| sin(x) | -cos(x) + C |
| cos(x) | sin(x) + C |
| sec²(x) | tan(x) + C |
| csc²(x) | -cot(x) + C |
| sec(x)tan(x) | sec(x) + C |
| csc(x)cot(x) | -csc(x) + C |
| tan(x) | ln\|sec(x)\| + C |
| cot(x) | ln\|sin(x)\| + C |
| sec(x) | ln\|sec(x) + tan(x)\| + C |
| csc(x) | -ln\|csc(x) + cot(x)\| + C |
| 1/(1+x²) | arctan(x) + C |
| 1/√(1-x²) | arcsin(x) + C |

---

## INTEGRATION TECHNIQUES

**Substitution (u-substitution):**
- Let u = g(x), du = g'(x)dx
- ∫f(g(x))·g'(x)dx = ∫f(u)du

**Integration by Parts:**
- ∫u·dv = uv - ∫v·du
- Choose u and dv using LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential

**Partial Fractions:**
- Decompose proper rational functions into simpler fractions
- Integrate each fraction separately

---

## LIMIT THEOREMS

**Algebra of Limits:**
If lim f(x) = L and lim g(x) = M, then:
- lim[f(x) + g(x)] = L + M
- lim[f(x) - g(x)] = L - M
- lim[f(x)·g(x)] = L·M
- lim[f(x)/g(x)] = L/M (if M ≠ 0)
- lim[f(x)]ⁿ = Lⁿ

**Squeeze Theorem:**
If f(x) ≤ g(x) ≤ h(x) and lim f(x) = lim h(x) = L, then lim g(x) = L

---

## CONTINUITY THEOREMS

**Intermediate Value Theorem (IVT):**
If f is continuous on [a,b] and N is between f(a) and f(b), then there exists c ∈ (a,b) such that f(c) = N

**Extreme Value Theorem:**
If f is continuous on [a,b], then f attains its maximum and minimum on [a,b]

**Bolzano's Theorem:**
If f is continuous on [a,b] and f(a)·f(b) < 0, then there exists c ∈ (a,b) such that f(c) = 0

---

## IMPORTANT THEOREMS ABOUT DERIVATIVES

**Rolle's Theorem:**
If f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists c ∈ (a,b) such that f'(c) = 0

**Mean Value Theorem (MVT):**
If f is continuous on [a,b] and differentiable on (a,b), then there exists c ∈ (a,b) such that:
f'(c) = [f(b) - f(a)]/(b - a)

**Monotonicity Test:**
- If f'(x) > 0 on (a,b), then f is strictly increasing on (a,b)
- If f'(x) < 0 on (a,b), then f is strictly decreasing on (a,b)

**First Derivative Test:**
If f'(c) = 0 or f'(c) doesn't exist:
- If f' changes from + to -, then c is a local maximum
- If f' changes from - to +, then c is a local minimum
- If f' doesn't change sign, neither (check 2nd derivative test or higher)

**Second Derivative Test:**
If f'(c) = 0:
- If f''(c) > 0, then c is a local minimum
- If f''(c) < 0, then c is a local maximum
- If f''(c) = 0, test is inconclusive

**Concavity Test:**
- If f''(x) > 0 on (a,b), then f is concave up on (a,b)
- If f''(x) < 0 on (a,b), then f is concave down on (a,b)

**Inflection Point:**
If f'' changes sign at c, then (c, f(c)) is an inflection point

---

## L'HÔPITAL'S RULE

If lim f(x)/g(x) gives indeterminate form 0/0 or ∞/∞:

lim f(x)/g(x) = lim f'(x)/g'(x) (if the limit on right exists)

Can be applied repeatedly if indeterminate form persists

---

## FUNDAMENTAL THEOREM OF CALCULUS

**Part 1:**
If f is continuous on [a,b] and F is an antiderivative of f, then:
∫ₐᵇ f(x)dx = F(b) - F(a)

**Part 2:**
If f is continuous on [a,b], then:
d/dx[∫ₐˣ f(t)dt] = f(x)

---

## PROPERTIES OF DEFINITE INTEGRALS

- ∫ₐᵃ f(x)dx = 0
- ∫ₐᵇ f(x)dx = -∫ᵦₐ f(x)dx
- ∫ₐᵇ c·dx = c(b-a)
- ∫ₐᵇ [f(x) + g(x)]dx = ∫ₐᵇ f(x)dx + ∫ₐᵇ g(x)dx
- ∫ₐᵇ c·f(x)dx = c·∫ₐᵇ f(x)dx
- If f(x) ≤ g(x) on [a,b], then ∫ₐᵇ f(x)dx ≤ ∫ₐᵇ g(x)dx
- ∫ₐᶜ f(x)dx + ∫ᶜᵇ f(x)dx = ∫ₐᵇ f(x)dx

---

## APPLICATIONS OF INTEGRATION

**Area between curves:**
A = ∫ₐᵇ |f(x) - g(x)|dx

**Volume by disk method (rotation about x-axis):**
V = π∫ₐᵇ [R(x)]²dx

**Volume by washer method (rotation about x-axis):**
V = π∫ₐᵇ {[R(x)]² - [r(x)]²}dx

**Volume by shell method (rotation about y-axis):**
V = 2π∫ₐᵇ x·f(x)dx

**Arc length:**
L = ∫ₐᵇ √(1 + [f'(x)]²)dx

---

## SPECIAL LIMITS

- lim(x→0) sin(x)/x = 1
- lim(x→0) (1 - cos(x))/x² = 1/2
- lim(x→0) (eˣ - 1)/x = 1
- lim(n→∞) (1 + 1/n)ⁿ = e
- lim(x→∞) (1 + a/x)ˣ = eᵃ

---

## SEQUENCE THEOREMS

**Monotone Convergence Theorem:**
Every bounded monotone sequence converges

**Algebra of limits for sequences:**
If aₙ → a and bₙ → b, then:
- aₙ ± bₙ → a ± b
- aₙ·bₙ → a·b
- aₙ/bₙ → a/b (if b ≠ 0)

**Squeeze Theorem (for sequences):**
If aₙ ≤ cₙ ≤ bₙ and aₙ → L, bₙ → L, then cₙ → L

---

## INVERSE FUNCTION THEOREM

If f is continuous and strictly monotonic on [a,b] with f'(x) ≠ 0 for x ∈ (a,b), then:
- f⁻¹ exists and is continuous
- (f⁻¹)'(y) = 1/f'(f⁻¹(y))

---

## KEY LOGARITHMIC IDENTITIES

- ln(xy) = ln(x) + ln(y)
- ln(x/y) = ln(x) - ln(y)
- ln(xⁿ) = n·ln(x)
- logₐ(x) = ln(x)/ln(a)
- aˣ = e^(x·ln(a))

---

## EXPONENTIAL PROPERTIES

- eˣ·eʸ = e^(x+y)
- eˣ/eʸ = e^(x-y)
- (eˣ)ʸ = e^(xy)
- e⁰ = 1
- e⁻ˣ = 1/eˣ

---

## TRIGONOMETRIC IDENTITIES (Essential for Integration)

**Pythagorean Identities:**
- sin²(x) + cos²(x) = 1
- 1 + tan²(x) = sec²(x)
- 1 + cot²(x) = csc²(x)

**Double angle formulas:**
- sin(2x) = 2sin(x)cos(x)
- cos(2x) = cos²(x) - sin²(x) = 2cos²(x) - 1 = 1 - 2sin²(x)

**Power reduction formulas:**
- sin²(x) = (1 - cos(2x))/2
- cos²(x) = (1 + cos(2x))/2

---

## CALCULUS 1 CURRICULUM OUTLINE

1. **Limits and Continuity** (Lectures 1-6, Hebrew; Lectures 2, 4, 7)
   - Sequences and convergence
   - Function limits
   - Continuity
   - Intermediate Value Theorem
   - Extreme Value Theorem

2. **Derivatives** (Lectures 8-13, Hebrew; Lectures 8-12)
   - Definition and interpretation
   - Differentiation rules
   - Chain rule
   - Inverse function derivatives
   - Applications: related rates, implicit differentiation

3. **Applications of Derivatives** (Lectures 14-17, Hebrew; Lectures 14-18)
   - L'Hôpital's Rule
   - Monotonicity and extrema
   - Concavity and inflection points
   - Curve sketching
   - Optimization problems

4. **Integration** (Lectures 19-23, Hebrew; Lectures 19-23)
   - Antiderivatives and indefinite integrals
   - Definite integrals
   - Fundamental Theorem of Calculus
   - Integration techniques (substitution, by parts, partial fractions)
   - Applications: area, volume, arc length

---

## NOTES ON PROOFS GIVEN IN CLASS

The following major theorems had complete proofs given in lecture:

**In Hebrew Lectures:**
- Monotone Convergence Theorem
- Squeeze Theorem
- Intermediate Value Theorem
- Rolle's Theorem
- Mean Value Theorem
- Chain rule
- Inverse function theorem
- First and Second Derivative Tests
- Fundamental Theorem of Calculus (both parts)

**In English Lectures:**
- Limit algebra theorems
- Continuity preservation
- Intermediate Value Theorem
- Extreme Value Theorem
- Derivative rules (sum, product, quotient)
- Chain rule
- L'Hôpital's Rule
- Monotonicity test
- First and Second Derivative Tests
- Integration by substitution
- Fundamental Theorem of Calculus
- Integration by parts (technique)

---

**Document Status:** Complete compilation of all theorems, definitions, lemmas, and propositions from 25 Calculus 1 lectures covering the complete calculus curriculum from limits through applications of integration.
