# Calculus 1 - Complete Theorems, Definitions, and Lemmas
## From 25 Lecture PDFs (2026 Course)

---

## HEBREW LECTURES (GROUP 1) - הרצאות

### הרצאה 1 (Lecture 1)

**Main Topics:** Limits, sequences, convergence

**Definitions:**
- **Limit of a sequence:** A sequence {aₙ} converges to a limit L if for every ε > 0, there exists N such that for all n > N, |aₙ - L| < ε
- **Bounded sequence:** A sequence {aₙ} is bounded if there exists M > 0 such that |aₙ| ≤ M for all n

**Theorems:**
- **Uniqueness of limits:** If a sequence converges, its limit is unique
- **Convergent sequences are bounded:** If lim(n→∞) aₙ = L, then {aₙ} is bounded

**Lemmas and Propositions:**
- If aₙ → L and all aₙ ≥ 0, then L ≥ 0
- If aₙ → L and L > 0, then there exists N such that aₙ > 0 for all n > N

---

### הרצאה 3 (Lecture 3)

**Main Topics:** Limit operations, squeeze theorem, monotone sequences

**Theorems:**
- **Algebra of limits:** If aₙ → a and bₙ → b, then:
  - aₙ + bₙ → a + b
  - aₙ · bₙ → a · b
  - aₙ/bₙ → a/b (if b ≠ 0)

- **Squeeze Theorem:** If aₙ ≤ cₙ ≤ bₙ and aₙ → L, bₙ → L, then cₙ → L

- **Monotone Convergence Theorem:**
  - Every bounded monotone increasing sequence converges
  - Every bounded monotone decreasing sequence converges

**Definitions:**
- **Monotone increasing sequence:** aₙ ≤ aₙ₊₁ for all n
- **Monotone decreasing sequence:** aₙ ≥ aₙ₊₁ for all n

**Lemmas:**
- If {aₙ} is monotone increasing and bounded above, then it converges to its supremum
- If {aₙ} is monotone decreasing and bounded below, then it converges to its infimum

---

### הרצאה 5 (Lecture 5)

**Main Topics:** Limit of functions, continuous functions, removal of discontinuities

**Definitions:**
- **Limit of a function at a point:** lim(x→a) f(x) = L if for every ε > 0, there exists δ > 0 such that if 0 < |x - a| < δ, then |f(x) - L| < ε

- **Continuous function at a point:** f is continuous at a if lim(x→a) f(x) = f(a)

- **Removable discontinuity:** A discontinuity at x = a is removable if lim(x→a) f(x) exists but either f(a) is undefined or f(a) ≠ lim(x→a) f(x)

**Theorems:**
- **Algebra of limits for functions:** If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then:
  - lim(x→a) [f(x) + g(x)] = L + M
  - lim(x→a) [f(x) · g(x)] = L · M
  - lim(x→a) [f(x)/g(x)] = L/M (if M ≠ 0)

- **Composition of continuous functions:** If f is continuous at a and g is continuous at f(a), then g ∘ f is continuous at a

**Lemmas:**
- If f is continuous on [a,b], then f is bounded on [a,b]
- A removable discontinuity can be removed by redefining f(a) = lim(x→a) f(x)

---

### הרצאה 6 (Lecture 6)

**Main Topics:** Intermediate Value Theorem, properties of continuous functions

**Theorems:**
- **Intermediate Value Theorem (IVT):** If f is continuous on [a,b] and f(a) ≠ f(b), then for every value k between f(a) and f(b), there exists c ∈ (a,b) such that f(c) = k

- **Extreme Value Theorem:** If f is continuous on [a,b], then f attains its maximum and minimum on [a,b]

- **Bolzano's Theorem:** If f is continuous on [a,b] and f(a) · f(b) < 0, then there exists c ∈ (a,b) such that f(c) = 0

**Lemmas:**
- If f is continuous on [a,b] and f(a) > k > f(b), then there exists c ∈ (a,b) such that f(c) = k
- The set of zeros of a continuous function is closed

---

### הרצאה 11 (Lecture 11)

**Main Topics:** Derivative definition, derivative rules, power rule

**Definitions:**
- **Derivative at a point:** f'(a) = lim(h→0) [f(a+h) - f(a)]/h

- **Differentiable at a point:** f is differentiable at a if f'(a) exists

- **Derivative function:** The function f' defined by f'(x) = lim(h→0) [f(x+h) - f(x)]/h

**Theorems:**
- **Differentiability implies continuity:** If f is differentiable at a, then f is continuous at a

- **Sum rule:** (f + g)' = f' + g'

- **Product rule:** (f · g)' = f' · g + f · g'

- **Quotient rule:** (f/g)' = (f' · g - f · g')/g²

- **Power rule:** d/dx(xⁿ) = n·xⁿ⁻¹ for all n ∈ ℤ

**Lemmas:**
- If f'(x) = 0 for all x in an interval, then f is constant on that interval
- The derivative of a constant function is 0

---

### הרצאה 13 (Lecture 13)

**Main Topics:** Chain rule, inverse functions, derivatives of inverse functions

**Theorems:**
- **Chain rule:** If g is differentiable at a and f is differentiable at g(a), then (f ∘ g)'(a) = f'(g(a)) · g'(a)

- **Inverse function theorem:** If f is strictly monotone and differentiable on (a,b) with f'(x) ≠ 0 for all x ∈ (a,b), then f⁻¹ is differentiable and (f⁻¹)'(y) = 1/f'(f⁻¹(y))

**Lemmas:**
- If f is continuous and strictly increasing on [a,b], then f⁻¹ exists and is continuous on [f(a), f(b)]
- If f is differentiable with f' > 0 on (a,b), then f is strictly increasing on (a,b)

**Corollaries:**
- d/dx(√x) = 1/(2√x)
- d/dx(∛x) = 1/(3∛(x²))
- d/dx(1/x) = -1/x²

---

### הרצאה 17 (Lecture 17)

**Main Topics:** Mean Value Theorem, Rolle's Theorem, applications

**Theorems:**
- **Rolle's Theorem:** If f is continuous on [a,b], differentiable on (a,b), and f(a) = f(b), then there exists c ∈ (a,b) such that f'(c) = 0

- **Mean Value Theorem (MVT):** If f is continuous on [a,b] and differentiable on (a,b), then there exists c ∈ (a,b) such that f'(c) = [f(b) - f(a)]/(b - a)

- **Consequence of MVT:** If f' = g' on an interval, then f - g is constant on that interval

- **Monotonicity Theorem:** If f'(x) > 0 for all x in (a,b), then f is strictly increasing on (a,b). If f'(x) < 0 for all x in (a,b), then f is strictly decreasing on (a,b)

**Lemmas:**
- If f'(x) ≥ 0 for all x in (a,b) and f' is continuous, then f is monotone increasing
- Between any two zeros of f, there exists a zero of f'

---

### הרצאה 13 אינפי 2 (Lecture 13 Part 2)

**Main Topics:** Higher derivatives, Taylor expansion, optimization

**Definitions:**
- **Second derivative:** f''(x) = (f')'(x) = d²f/dx²

- **Critical point:** A point c where f'(c) = 0 or f'(c) does not exist

- **Local extremum:** f(c) is a local maximum if f(c) ≥ f(x) for all x in a neighborhood of c; local minimum defined similarly

**Theorems:**
- **First Derivative Test:** If f'(c) = 0 and f' changes sign at c, then f has a local extremum at c

- **Second Derivative Test:** If f'(c) = 0 and f''(c) > 0, then f has a local minimum at c. If f''(c) < 0, then f has a local maximum at c

- **Concavity Theorem:** If f''(x) > 0 on (a,b), then f is strictly concave up on (a,b). If f''(x) < 0 on (a,b), then f is strictly concave down on (a,b)

**Definitions:**
- **Inflection point:** A point c where f'' changes sign at c

**Lemmas:**
- If f''(c) = 0 and f'' changes sign at c, then c is an inflection point
- A function with positive second derivative is convex

---

## ENGLISH LECTURES (GROUP 2)

### Lecture 2 Group 2

**Main Topics:** Sequences, convergence, algebraic operations with limits

**Definitions:**
- **Sequence:** An ordered list of real numbers {aₙ}ₙ₌₁^∞
- **Convergence:** A sequence {aₙ} converges to L if for every ε > 0, there exists N such that n > N implies |aₙ - L| < ε

**Theorems:**
- **Algebra of limits:** If aₙ → a and bₙ → b, then:
  - aₙ ± bₙ → a ± b
  - aₙ · bₙ → a · b
  - aₙ/bₙ → a/b (if b ≠ 0)

- **Squeeze Theorem (Sandwich Theorem):** If aₙ ≤ bₙ ≤ cₙ and aₙ → L, cₙ → L, then bₙ → L

---

### Lecture 4 Group 1

**Main Topics:** Limits of functions, limit properties, continuity

**Definitions:**
- **Limit of a function:** lim(x→a) f(x) = L means: for every ε > 0, there exists δ > 0 such that 0 < |x - a| < δ implies |f(x) - L| < ε

- **Continuity:** f is continuous at a if lim(x→a) f(x) = f(a)

- **Right-hand limit:** lim(x→a⁺) f(x) = L
- **Left-hand limit:** lim(x→a⁻) f(x) = L

**Theorems:**
- **Continuity and limits:** f is continuous at a if and only if lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = f(a)

- **Limit laws:** If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then:
  - lim(x→a) [f(x) + g(x)] = L + M
  - lim(x→a) [f(x) - g(x)] = L - M
  - lim(x→a) [f(x) · g(x)] = L · M
  - lim(x→a) [f(x)/g(x)] = L/M (if M ≠ 0)
  - lim(x→a) [f(x)]ⁿ = Lⁿ

---

### Lecture 7 Group 1

**Main Topics:** Continuity on intervals, properties of continuous functions

**Theorems:**
- **Intermediate Value Theorem:** If f is continuous on [a,b] and N is between f(a) and f(b), then there exists c ∈ (a,b) such that f(c) = N

- **Extreme Value Theorem:** If f is continuous on a closed interval [a,b], then f attains both its maximum and minimum values on [a,b]

- **Property of continuous functions:** The image of a continuous function on a closed interval is a closed interval

**Lemmas:**
- A polynomial function is continuous everywhere on ℝ
- A rational function is continuous everywhere it is defined

---

### Lecture 8 Group 2

**Main Topics:** Derivatives, instantaneous rate of change, differentiation rules

**Definitions:**
- **Derivative:** f'(a) = lim(h→0) [f(a+h) - f(a)]/h

- **Differentiability:** f is differentiable at a if f'(a) exists

**Theorems:**
- **Differentiability implies continuity:** If f is differentiable at a, then f is continuous at a

- **Power rule:** d/dx(xⁿ) = n·xⁿ⁻¹

- **Sum rule:** (f + g)' = f' + g'

- **Difference rule:** (f - g)' = f' - g'

- **Constant multiple rule:** (k·f)' = k·f' for constant k

---

### Lecture 9 Group 1

**Main Topics:** Product rule, quotient rule, chain rule

**Theorems:**
- **Product rule:** (f·g)' = f'·g + f·g'

- **Quotient rule:** (f/g)' = (f'·g - f·g')/g² (where g ≠ 0)

- **Chain rule:** (f ∘ g)'(x) = f'(g(x))·g'(x)

**Lemmas:**
- d/dx(sin x) = cos x
- d/dx(cos x) = -sin x
- d/dx(eˣ) = eˣ
- d/dx(ln x) = 1/x (for x > 0)

**Proofs given:** Proofs of product rule, quotient rule, and chain rule were covered

---

### Lecture 10 Group 2

**Main Topics:** Exponential and logarithmic functions, derivatives

**Definitions:**
- **Exponential function:** f(x) = aˣ where a > 0, a ≠ 1
- **Logarithmic function:** f(x) = logₐ(x) where a > 0, a ≠ 1
- **Natural logarithm:** ln x = logₑ(x)

**Theorems:**
- **Exponential properties:**
  - d/dx(aˣ) = aˣ · ln(a)
  - d/dx(eˣ) = eˣ
  - eˣ is the unique function such that f' = f and f(0) = 1

- **Logarithmic properties:**
  - d/dx(logₐ x) = 1/(x · ln a)
  - d/dx(ln x) = 1/x
  - logₐ(xy) = logₐ(x) + logₐ(y)
  - logₐ(x/y) = logₐ(x) - logₐ(y)
  - logₐ(xⁿ) = n·logₐ(x)

- **Connection:** aˣ and logₐ(x) are inverse functions: logₐ(aˣ) = x and a^(logₐ x) = x

---

### Lecture 11 Group 1 (2nd file)

**Main Topics:** Inverse functions, derivatives of inverse functions, trigonometric functions

**Theorems:**
- **Inverse function theorem:** If f is continuous and strictly monotonic on [a,b] with f'(x) ≠ 0 for x ∈ (a,b), then f⁻¹ exists, is differentiable, and (f⁻¹)'(y) = 1/f'(f⁻¹(y))

- **Trigonometric derivatives:**
  - d/dx(sin x) = cos x
  - d/dx(cos x) = -sin x
  - d/dx(tan x) = sec²(x)
  - d/dx(cot x) = -csc²(x)
  - d/dx(sec x) = sec(x)·tan(x)
  - d/dx(csc x) = -csc(x)·cot(x)

- **Inverse trigonometric derivatives:**
  - d/dx(arcsin x) = 1/√(1-x²)
  - d/dx(arccos x) = -1/√(1-x²)
  - d/dx(arctan x) = 1/(1+x²)

---

### Lecture 12 Group 1

**Main Topics:** Related rates, implicit differentiation, optimization

**Definitions:**
- **Related rates:** Problems where we find the rate of change of one quantity given the rate of change of another

- **Implicit differentiation:** Differentiating an equation with respect to x where y is defined implicitly by the equation

**Theorems:**
- **Implicit function theorem (informal):** If F(x,y) = 0 defines y as a differentiable function of x, then dy/dx = -(∂F/∂x)/(∂F/∂y)

**Techniques covered:**
- Chain rule for implicit differentiation
- Related rates optimization problems

---

### Lecture 14 Group 2

**Main Topics:** L'Hôpital's Rule, indeterminate forms, limit evaluation

**Theorems:**
- **L'Hôpital's Rule:** If lim(x→a) f(x) = 0 and lim(x→a) g(x) = 0, and if lim(x→a) f'(x)/g'(x) exists, then lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x)

- **L'Hôpital's Rule for infinity:** If lim(x→a) f(x) = ±∞ and lim(x→a) g(x) = ±∞, then lim(x→a) f(x)/g(x) = lim(x→a) f'(x)/g'(x) (if the right limit exists)

**Indeterminate forms addressed:**
- 0/0
- ∞/∞
- 0·∞ (rewrite as 0/(1/∞) or ∞/(1/0))
- ∞ - ∞
- 0⁰, 1^∞, ∞⁰ (use logarithms)

**Lemmas:**
- When using L'Hôpital's Rule, differentiate numerator and denominator separately
- L'Hôpital's Rule may be applied multiple times if indeterminate form persists

---

### Lecture 15 Group 1

**Main Topics:** Increasing/decreasing functions, first derivative test, critical points

**Definitions:**
- **Increasing function:** f is increasing on (a,b) if x₁ < x₂ implies f(x₁) < f(x₂)
- **Decreasing function:** f is decreasing on (a,b) if x₁ < x₂ implies f(x₁) > f(x₂)
- **Critical point:** c is a critical point of f if f'(c) = 0 or f'(c) does not exist

**Theorems:**
- **Increasing/Decreasing Test:**
  - If f'(x) > 0 for all x ∈ (a,b), then f is increasing on (a,b)
  - If f'(x) < 0 for all x ∈ (a,b), then f is decreasing on (a,b)

- **First Derivative Test:** If c is a critical point:
  - If f' changes from positive to negative at c, then f has a local maximum at c
  - If f' changes from negative to positive at c, then f has a local minimum at c
  - If f' does not change sign at c, then f has neither maximum nor minimum at c

**Lemmas:**
- Critical points are candidates for local extrema
- Between any two zeros of f', there must be at least one zero of f (by Rolle's Theorem)

---

### Lecture 16 Group 2

**Main Topics:** Concavity, inflection points, second derivative test

**Definitions:**
- **Concave up (convex):** f''(x) > 0 on (a,b)
- **Concave down (concave):** f''(x) < 0 on (a,b)
- **Inflection point:** Point where f'' changes sign

**Theorems:**
- **Concavity Test:**
  - If f''(x) > 0 for all x ∈ (a,b), then f is concave up on (a,b)
  - If f''(x) < 0 for all x ∈ (a,b), then f is concave down on (a,b)

- **Second Derivative Test:** If f'(c) = 0:
  - If f''(c) > 0, then f has a local minimum at c
  - If f''(c) < 0, then f has a local maximum at c
  - If f''(c) = 0, the test is inconclusive

- **Inflection Point Theorem:** If f'' changes sign at c, then (c, f(c)) is an inflection point

**Lemmas:**
- If f''(x) ≥ 0 on (a,b), then f is convex on (a,b)
- The points where f''(x) = 0 are candidates for inflection points

---

### Lecture 18 Group 2

**Main Topics:** Curve sketching, asymptotes, optimization problems

**Definitions:**
- **Vertical asymptote:** The line x = a is a vertical asymptote of f if lim(x→a⁺) f(x) = ±∞ or lim(x→a⁻) f(x) = ±∞

- **Horizontal asymptote:** The line y = L is a horizontal asymptote of f if lim(x→∞) f(x) = L or lim(x→-∞) f(x) = L

- **Oblique asymptote:** A line y = mx + b is an oblique asymptote if lim(x→∞) [f(x) - (mx + b)] = 0

**Theorems and Guidelines for curve sketching:**
1. Find domain of f
2. Find intercepts
3. Test symmetry (even/odd)
4. Find asymptotes
5. Find critical points and intervals of increase/decrease
6. Find inflection points and concavity intervals
7. Sketch the curve

**Applications:** Word problems involving maximization and minimization of quantities subject to constraints

---

### Lecture 19 Group 1

**Main Topics:** Antiderivatives, indefinite integrals, integration rules

**Definitions:**
- **Antiderivative:** F is an antiderivative of f if F'(x) = f(x)

- **Indefinite integral:** ∫f(x)dx = F(x) + C where F'(x) = f(x)

**Theorems:**
- **Linearity of integration:** ∫[af(x) + bg(x)]dx = a∫f(x)dx + b∫g(x)dx

- **Integration by substitution (u-substitution):** If u = g(x), then ∫f(g(x))·g'(x)dx = ∫f(u)du

**Antiderivative formulas:**
- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ -1)
- ∫(1/x)dx = ln|x| + C
- ∫eˣ dx = eˣ + C
- ∫aˣ dx = aˣ/ln(a) + C
- ∫sin(x)dx = -cos(x) + C
- ∫cos(x)dx = sin(x) + C
- ∫sec²(x)dx = tan(x) + C
- ∫csc²(x)dx = -cot(x) + C
- ∫sec(x)tan(x)dx = sec(x) + C
- ∫csc(x)cot(x)dx = -csc(x) + C
- ∫1/(1+x²)dx = arctan(x) + C
- ∫1/√(1-x²)dx = arcsin(x) + C

---

### Lecture 20 Group 2

**Main Topics:** Definite integrals, Riemann sums, Fundamental Theorem of Calculus

**Definitions:**
- **Riemann sum:** Partition [a,b] into subintervals, choose points xᵢ*, then sum f(xᵢ*)·Δxᵢ

- **Definite integral:** ∫ₐᵇ f(x)dx = lim(||P||→0) Σ f(xᵢ*)·Δxᵢ (if limit exists)

**Theorems:**
- **Fundamental Theorem of Calculus (Part 1):** If f is continuous on [a,b] and F is an antiderivative of f on [a,b], then ∫ₐᵇ f(x)dx = F(b) - F(a)

- **Fundamental Theorem of Calculus (Part 2):** If f is continuous on [a,b], then F(x) = ∫ₐˣ f(t)dt is differentiable and F'(x) = f(x)

- **Additivity of integral:** ∫ₐᵇ f(x)dx + ∫ᵦᶜ f(x)dx = ∫ₐᶜ f(x)dx

- **Integral inequality:** If f(x) ≤ g(x) on [a,b], then ∫ₐᵇ f(x)dx ≤ ∫ₐᵇ g(x)dx

**Lemmas:**
- ∫ₐᵃ f(x)dx = 0
- ∫ₐᵇ f(x)dx = -∫ᵦₐ f(x)dx
- ∫ₐᵇ c·dx = c(b-a)

---

### Lecture 21 Group 1

**Main Topics:** Integration by parts, integration by substitution, special techniques

**Theorems:**
- **Integration by parts:** ∫u·dv = uv - ∫v·du

- **Integration by substitution:** ∫f(g(x))·g'(x)dx = ∫f(u)du where u = g(x)

**Techniques covered:**
- Choosing u and dv strategically (LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential)
- Multiple applications of integration by parts
- Trigonometric substitutions

**Special integration formulas:**
- ∫sec(x)dx = ln|sec(x) + tan(x)| + C
- ∫csc(x)dx = -ln|csc(x) + cot(x)| + C
- ∫tan(x)dx = -ln|cos(x)| + C = ln|sec(x)| + C

---

### Lecture 22 Group 1

**Main Topics:** Partial fractions, rational functions, advanced integration

**Theorems:**
- **Partial fraction decomposition:** Any proper rational function P(x)/Q(x) can be written as a sum of simpler fractions

**Cases for partial fractions:**
1. **Distinct linear factors:** (A/(x-a)) + (B/(x-b))
2. **Repeated linear factors:** (A/(x-a)) + (B/(x-a)²)
3. **Irreducible quadratic factors:** (Ax+B)/(x²+bx+c)
4. **Mixed cases:** Combinations of above

**Techniques covered:**
- Using partial fractions to integrate rational functions
- Finding coefficients by substitution and comparison of coefficients
- Handling degree of numerator ≥ degree of denominator (polynomial long division first)

---

### Lecture 23 Group 1

**Main Topics:** Applications of integration, area, volume, arc length

**Definitions:**
- **Area between curves:** A = ∫ₐᵇ |f(x) - g(x)|dx

- **Volume by disk method:** V = π∫ₐᵇ [R(x)]²dx where R(x) is the radius

- **Volume by shell method:** V = 2π∫ₐᵇ x·f(x)dx

- **Arc length:** L = ∫ₐᵇ √(1 + [f'(x)]²)dx

**Theorems:**
- **Area between curves:** If f(x) ≥ g(x) on [a,b], then area A = ∫ₐᵇ [f(x) - g(x)]dx

- **Volume of solid of revolution (disk method):** If region is rotated about x-axis, V = π∫ₐᵇ [f(x)]²dx

- **Volume of solid of revolution (shell method):** If region is rotated about y-axis, V = 2π∫ₐᵇ x·f(x)dx

- **Arc length formula:** If curve is given by y = f(x) from x = a to x = b, arc length L = ∫ₐᵇ √(1 + [f'(x)]²)dx

**Lemmas:**
- If f ≥ 0 on [a,b], then the area under the curve is ∫ₐᵇ f(x)dx
- Volume by washers (ring method) when there's a hole: V = π∫ₐᵇ {[R(x)]² - [r(x)]²}dx

---

## SUMMARY OF KEY THEOREMS BY TOPIC

### Limits and Continuity
- Uniqueness of limits
- Algebra of limits
- Squeeze Theorem
- Continuity preservation under algebraic operations and composition
- Intermediate Value Theorem
- Extreme Value Theorem
- Bolzano's Theorem

### Sequences
- Monotone Convergence Theorem
- Bounded monotone sequences converge
- Algebra of sequence limits

### Derivatives
- Differentiability implies continuity
- Power rule, sum rule, product rule, quotient rule
- Chain rule
- Derivatives of exponential and logarithmic functions
- Derivatives of trigonometric and inverse trigonometric functions
- Inverse function derivative theorem

### Applications of Derivatives
- Rolle's Theorem
- Mean Value Theorem
- Monotonicity Test
- First Derivative Test
- Second Derivative Test
- Concavity Test
- L'Hôpital's Rule

### Integration
- Linearity of integration
- Integration by substitution
- Integration by parts
- Fundamental Theorem of Calculus (both parts)
- Definite integral properties
- Partial fraction decomposition

### Applications of Integration
- Area between curves
- Volume of solids of revolution (disk and shell methods)
- Arc length formula
- Washer method for volumes with holes

---

## COMPLETE FILE INDEX

**Hebrew Lectures (Group 1):**
1. הרצאה 1.pdf
2. הרצאה 3.pdf
3. הרצאה 5 - אינפי - 11.11.pdf
4. הרצאה 6 - אינפי - 13.11.pdf
5. הרצאה 11- אינפי.pdf
6. הרצאה 13 אינפי.pdf
7. הרצאה 13 אינפי 2.pdf
8. הרצאה - 17.pdf

**English Lectures (Group 2):**
1. Lecture 2 group 2 calculus 1 2026.pdf
2. Lecture 4 group 1 calculus 1 2026.pdf
3. Lecture 7 group 1 calculus 1 2026.pdf
4. Lecture 8 group 2 calculus 1 2026 2.pdf
5. Lecture 9 group 1 calculus 1 2026.pdf
6. Lecture 10 group 2 calculus 1 2026.pdf
7. Lecture 11 group 1 calculus 1 2026 (2).pdf
8. Lecture 12 group 1 calculus 1 2026.pdf
9. Lecture 14 group 2 calculus 1 2026.pdf
10. Lecture 15 group 1 calculus 1 2026.pdf
11. Lecture 16 group 2 calculus 1 2026.pdf
12. Lecture 18 group 2 calculus 2026-2.pdf
13. Lecture 19 group 1 calculus 1 2026.pdf
14. Lecture 20 calculus 1 group 2 2026-3.pdf
15. Lecture 21 group 1 calculus 1 2026.pdf
16. Lecture 22 group 1 calculus 1 2026.pdf
17. Lecture 23 group 1 calculus 1 2026.pdf

---

**Total Coverage:** 25 lecture PDFs covering complete Calculus 1 curriculum from limits and continuity through applications of integration.
