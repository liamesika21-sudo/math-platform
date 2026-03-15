# Calculus 1 - Complete Lecture-by-Lecture Reference
## All Theorems, Definitions, and Lemmas

---

## HEBREW LECTURES (GROUP 1) / הרצאות

### הרצאה 1 (Lecture 1)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 1.pdf

**Main Topics:**
- Number systems and properties
- Sequences (סדרות)
- Convergence of sequences
- Limit definition

**Key Definitions:**
1. **Sequence (סדרה):** An ordered collection of real numbers {aₙ} indexed by natural numbers
2. **Limit of a sequence:** A number L is the limit of {aₙ} if for every ε > 0, there exists N ∈ ℕ such that for all n > N: |aₙ - L| < ε (written as lim(n→∞) aₙ = L)
3. **Convergent sequence:** A sequence that has a limit
4. **Divergent sequence:** A sequence that does not converge

**Key Theorems:**
1. **Uniqueness of limits:** If a sequence converges, then its limit is unique
   - Proof: Assume aₙ → L₁ and aₙ → L₂ with L₁ ≠ L₂. Let ε = |L₁ - L₂|/2. Then by definition, there exist N₁ and N₂ such that for n > max(N₁,N₂), both |aₙ - L₁| < ε and |aₙ - L₂| < ε, which implies |L₁ - L₂| < 2ε = |L₁ - L₂|, a contradiction.

2. **Convergent sequences are bounded:** If lim(n→∞) aₙ = L, then the sequence {aₙ} is bounded
   - That is, there exists M > 0 such that |aₙ| ≤ M for all n

**Key Lemmas:**
1. If aₙ → L and L > 0, then there exists N such that aₙ > 0 for all n > N
2. If aₙ → L and aₙ ≥ 0 for all n, then L ≥ 0
3. If aₙ → 0, then |aₙ| → 0

---

### הרצאה 3 (Lecture 3)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 3.pdf

**Main Topics:**
- Algebraic operations with limits
- Squeeze theorem
- Monotone sequences
- Bounded monotone sequences

**Key Theorems:**

1. **Algebra of limits:** If aₙ → a and bₙ → b, then:
   - (a) aₙ + bₙ → a + b
   - (b) aₙ - bₙ → a - b
   - (c) aₙ · bₙ → a · b
   - (d) aₙ/bₙ → a/b (provided b ≠ 0 and bₙ ≠ 0 for all sufficiently large n)
   - (e) aₙᵏ → aᵏ for any fixed k ∈ ℕ
   - (f) |aₙ| → |a|

2. **Squeeze Theorem (Sandwich Theorem):** If aₙ ≤ cₙ ≤ bₙ for all sufficiently large n, and if aₙ → L and bₙ → L, then cₙ → L
   - Proof given: For any ε > 0, find N₁, N₂ such that for n > N₁: L - ε < aₙ < L + ε and for n > N₂: L - ε < bₙ < L + ε. For n > max(N₁,N₂), we have L - ε < aₙ ≤ cₙ ≤ bₙ < L + ε, so |cₙ - L| < ε.

3. **Monotone Convergence Theorem:**
   - (a) Every bounded monotone increasing sequence converges
   - (b) Every bounded monotone decreasing sequence converges
   - Proof given: The set of terms of a bounded monotone increasing sequence has a supremum S. For any ε > 0, there exists an element aₙ with S - ε < aₙ ≤ S. Since the sequence is increasing, all subsequent terms satisfy S - ε < aₖ ≤ S for k ≥ n, hence |aₖ - S| < ε.

**Key Definitions:**

1. **Monotone increasing (non-decreasing):** aₙ ≤ aₙ₊₁ for all n
2. **Strictly monotone increasing:** aₙ < aₙ₊₁ for all n
3. **Monotone decreasing (non-increasing):** aₙ ≥ aₙ₊₁ for all n
4. **Strictly monotone decreasing:** aₙ > aₙ₊₁ for all n
5. **Bounded sequence:** There exists M > 0 such that |aₙ| ≤ M for all n

**Key Lemmas:**

1. If {aₙ} is monotone increasing and bounded above, then it converges to sup{aₙ}
2. If {aₙ} is monotone decreasing and bounded below, then it converges to inf{aₙ}
3. The limit function preserves weak inequalities: if aₙ ≤ bₙ for all n and aₙ → a, bₙ → b, then a ≤ b

---

### הרצאה 5 (Lecture 5)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 5\ -\ אינפי\ -\ 11.11.pdf

**Main Topics:**
- Limits of functions
- Limit definition and ε-δ formulation
- Continuity
- Removable discontinuities

**Key Definitions:**

1. **Limit of a function at a point:** Let f be defined on an interval containing a (but not necessarily at a). We say lim(x→a) f(x) = L if:
   - For every ε > 0, there exists δ > 0 such that if 0 < |x - a| < δ, then |f(x) - L| < ε

2. **Continuity at a point:** A function f is continuous at a point a if:
   - lim(x→a) f(x) = f(a)
   - This requires: (i) f(a) is defined, (ii) lim(x→a) f(x) exists, (iii) the limit equals f(a)

3. **Removable discontinuity:** A discontinuity at x = a is removable if lim(x→a) f(x) exists but either:
   - f(a) is undefined, or
   - f(a) ≠ lim(x→a) f(x)

4. **Jump discontinuity:** lim(x→a⁻) f(x) exists and lim(x→a⁺) f(x) exists but are not equal

5. **Essential discontinuity:** lim(x→a) f(x) does not exist

**Key Theorems:**

1. **Algebra of function limits:** If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then:
   - (a) lim(x→a) [f(x) + g(x)] = L + M
   - (b) lim(x→a) [f(x) - g(x)] = L - M
   - (c) lim(x→a) [f(x) · g(x)] = L · M
   - (d) lim(x→a) [f(x)/g(x)] = L/M (provided M ≠ 0)
   - (e) lim(x→a) [f(x)]ⁿ = Lⁿ for n ∈ ℕ
   - (f) lim(x→a) ⁿ√f(x) = ⁿ√L (for appropriate functions)

2. **Continuity of algebraic combinations:** If f and g are continuous at a, then:
   - (a) f + g is continuous at a
   - (b) f - g is continuous at a
   - (c) f · g is continuous at a
   - (d) f/g is continuous at a (provided g(a) ≠ 0)

3. **Composition of continuous functions:** If f is continuous at a and g is continuous at f(a), then g ∘ f is continuous at a

4. **Continuity of polynomial and rational functions:**
   - Every polynomial function is continuous at every point in ℝ
   - Every rational function is continuous at every point where the denominator is non-zero

**Key Lemmas:**

1. If lim(x→a) f(x) = L, then lim(x→a) |f(x)| = |L|
2. If f is continuous on a closed interval [a,b], then f is bounded on [a,b]
3. A removable discontinuity at x = a can be removed by defining (or redefining) f(a) = lim(x→a) f(x)

---

### הרצאה 6 (Lecture 6)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 6\ -\ אינפי\ -\ 13.11.pdf

**Main Topics:**
- Intermediate Value Theorem
- Extreme Value Theorem
- Properties of continuous functions
- Bolzano's Theorem

**Key Theorems:**

1. **Intermediate Value Theorem (IVT):** If f is continuous on [a,b] and f(a) ≠ f(b), then for every value k strictly between f(a) and f(b), there exists at least one point c ∈ (a,b) such that f(c) = k
   - More formally: If f is continuous on [a,b], f(a) = A, f(b) = B, and k is between A and B, then ∃c ∈ (a,b): f(c) = k

2. **Extreme Value Theorem:** If f is continuous on a closed interval [a,b], then f attains its maximum value and its minimum value on [a,b]
   - That is, there exist points c, d ∈ [a,b] such that f(c) ≥ f(x) ≥ f(d) for all x ∈ [a,b]

3. **Bolzano's Theorem (Zero Location Theorem):** If f is continuous on [a,b] and f(a) · f(b) < 0 (i.e., f has opposite signs at the endpoints), then there exists at least one point c ∈ (a,b) such that f(c) = 0
   - Proof: This follows directly from IVT with k = 0

4. **Sign Preservation Theorem:** If f is continuous at a and f(a) > 0, then there exists δ > 0 such that f(x) > 0 for all x ∈ (a-δ, a+δ)

5. **Monotone Continuous Function Theorem:** If f is continuous and strictly monotone on [a,b], then the inverse function f⁻¹ exists and is continuous on [f(a), f(b)]

**Key Lemmas:**

1. If f is continuous on [a,b] and f(a) > k > f(b) for some k ∈ ℝ, then there exists c ∈ (a,b) such that f(c) = k
2. If f is continuous on [a,b] and bounded on this interval, then f([a,b]) is a closed interval [m,M] where m = inf f and M = sup f
3. The image of a connected set under a continuous function is connected
4. The set of zeros of a continuous function is closed

---

### הרצאה 11 (Lecture 11)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 11-\ אינפי.pdf

**Main Topics:**
- Definition of derivative
- Derivative as rate of change
- Differentiation rules
- Power rule

**Key Definitions:**

1. **Derivative at a point:** The derivative of f at a point a is:
   - f'(a) = lim(h→0) [f(a+h) - f(a)]/h
   - Alternative form: f'(a) = lim(x→a) [f(x) - f(a)]/(x - a)

2. **Differentiable at a point:** A function f is differentiable at a if f'(a) exists (i.e., the limit above exists and is finite)

3. **Derivative function:** The function f'(x) defined at all points where f is differentiable by: f'(x) = lim(h→0) [f(x+h) - f(x)]/h

4. **Higher derivatives:** f''(x) = (f')'(x), f'''(x) = (f'')'(x), etc.

**Key Theorems:**

1. **Differentiability implies continuity:** If f is differentiable at a, then f is continuous at a
   - Proof: We need to show lim(x→a) f(x) = f(a), i.e., lim(x→a) [f(x) - f(a)] = 0. Note that f(x) - f(a) = [(f(x) - f(a))/(x - a)] · (x - a) → f'(a) · 0 = 0.

2. **Sum rule:** (f + g)'(x) = f'(x) + g'(x)
   - Proof: The derivative of a sum is the sum of derivatives

3. **Difference rule:** (f - g)'(x) = f'(x) - g'(x)

4. **Product rule:** (f · g)'(x) = f'(x) · g(x) + f(x) · g'(x)
   - Proof given: (fg)'(x) = lim(h→0) [f(x+h)g(x+h) - f(x)g(x)]/h. Add and subtract f(x+h)g(x) to get [f(x+h) - f(x)]g(x) + f(x+h)[g(x+h) - g(x)], then take limits.

5. **Quotient rule:** (f/g)'(x) = [f'(x)g(x) - f(x)g'(x)]/[g(x)]² (where g(x) ≠ 0)

6. **Power rule:** d/dx(xⁿ) = n · xⁿ⁻¹ for all n ∈ ℤ
   - For n ∈ ℕ: Proof by induction using product rule
   - For n = -m where m ∈ ℕ: Use quotient rule on xⁿ = 1/xᵐ

7. **Constant multiple rule:** (c · f)'(x) = c · f'(x) for constant c

8. **Constant function rule:** d/dx(c) = 0 for constant c

**Key Lemmas:**

1. If f'(x) = 0 for all x in an interval (a,b), then f is constant on (a,b)
2. The derivative of an even function is odd: if f(-x) = f(x), then f'(-x) = -f'(x)
3. The derivative of an odd function is even: if f(-x) = -f(x), then f'(-x) = f'(x)

---

### הרצאה 13 (Lecture 13)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 13\ אינפי.pdf

**Main Topics:**
- Chain rule
- Inverse functions and their derivatives
- Composite functions

**Key Theorems:**

1. **Chain Rule:** If g is differentiable at a and f is differentiable at g(a), then the composite function (f ∘ g) is differentiable at a, and:
   - (f ∘ g)'(a) = f'(g(a)) · g'(a)
   - In Leibniz notation: If y = f(u) and u = g(x), then dy/dx = (dy/du) · (du/dx)
   - Proof given: (f ∘ g)'(a) = lim(h→0) [f(g(a+h)) - f(g(a))]/h. Let u = g(a+h) - g(a), so g(a+h) = g(a) + u. Then the limit becomes lim(h→0) [f(g(a) + u) - f(g(a))]/h = lim(h→0) [f(g(a) + u) - f(g(a))]/u · u/h = f'(g(a)) · g'(a).

2. **Inverse Function Theorem:** If f is continuous and strictly monotone on an interval (a,b), and if f'(x) ≠ 0 for all x ∈ (a,b), then:
   - f⁻¹ exists and is differentiable on the interval (f(a), f(b))
   - (f⁻¹)'(y) = 1/f'(f⁻¹(y))
   - Alternative form: If x = f⁻¹(y), then dy/dx = f'(x), so dx/dy = 1/f'(x)
   - Proof: By definition, y = f(x) means x = f⁻¹(y). Differentiating implicitly: 1 = f'(x) · (dx/dy), so dx/dy = 1/f'(x).

**Key Corollaries (from Chain Rule):**

1. d/dx(xⁿ) = n·xⁿ⁻¹ (already stated in Lecture 11)
2. d/dx([g(x)]ⁿ) = n·[g(x)]ⁿ⁻¹ · g'(x) (Power rule with chain rule)
3. d/dx(√x) = d/dx(x^(1/2)) = (1/2)x⁻¹/² = 1/(2√x)
4. d/dx(∛x) = d/dx(x^(1/3)) = (1/3)x⁻²/³ = 1/(3∛(x²))
5. d/dx(1/x) = d/dx(x⁻¹) = -x⁻² = -1/x²
6. d/dx([f(x)]⁻¹) = -[f(x)]⁻² · f'(x) (quotient of composition with negative power)

**Key Lemmas:**

1. If f is continuous, strictly increasing on [a,b], then f⁻¹ exists and is continuous on [f(a), f(b)]
2. If f is continuous, strictly decreasing on [a,b], then f⁻¹ exists and is continuous on [f(b), f(a)]
3. If f'(x) > 0 for all x in an interval, then f is strictly increasing on that interval
4. If f'(x) < 0 for all x in an interval, then f is strictly decreasing on that interval

---

### הרצאה 17 (Lecture 17)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ -\ 17.pdf

**Main Topics:**
- Rolle's Theorem
- Mean Value Theorem
- Applications of MVT
- Monotonicity and derivative sign

**Key Theorems:**

1. **Rolle's Theorem:** If f is:
   - Continuous on the closed interval [a,b]
   - Differentiable on the open interval (a,b)
   - And f(a) = f(b)

   Then there exists at least one point c ∈ (a,b) such that f'(c) = 0

   - Proof: If f is constant on [a,b], then f'(c) = 0 for all c ∈ (a,b). If f is not constant, then by the Extreme Value Theorem, f attains its maximum at some point c ∈ (a,b) (not at the endpoints since f(a) = f(b)). At this maximum, f'(c) = 0.

2. **Mean Value Theorem (MVT):** If f is:
   - Continuous on [a,b]
   - Differentiable on (a,b)

   Then there exists at least one point c ∈ (a,b) such that:
   - f'(c) = [f(b) - f(a)]/(b - a)

   - Proof given: Apply Rolle's Theorem to the auxiliary function g(x) = f(x) - [f(b) - f(a)]/(b - a) · (x - a) - f(a). Then g(a) = g(b) = 0, so ∃c: g'(c) = 0, which gives f'(c) = [f(b) - f(a)]/(b - a).

3. **Consequence of MVT:** If f and g are continuous on [a,b], differentiable on (a,b), and f'(x) = g'(x) for all x ∈ (a,b), then f - g is constant on [a,b]
   - That is: f(x) - g(x) = f(a) - g(a) for all x ∈ [a,b]

4. **Monotonicity Theorem:** Let f be continuous on [a,b] and differentiable on (a,b):
   - If f'(x) > 0 for all x ∈ (a,b), then f is strictly increasing on [a,b]
   - If f'(x) < 0 for all x ∈ (a,b), then f is strictly decreasing on [a,b]
   - If f'(x) ≥ 0 for all x ∈ (a,b), then f is monotone increasing on [a,b]
   - If f'(x) ≤ 0 for all x ∈ (a,b), then f is monotone decreasing on [a,b]

   - Proof: Apply MVT to f on [x₁, x₂] where x₁ < x₂. Then f(x₂) - f(x₁) = f'(c)(x₂ - x₁) for some c. The sign of f'(c) determines the sign of f(x₂) - f(x₁).

5. **Derivative equals zero between zeros:** If f is differentiable and has zeros at a and b with a < b, then f has at least one critical point (where f' = 0) in (a,b)

**Key Lemmas:**

1. If f'(x) ≥ 0 for all x in (a,b) and f' is continuous, then f is monotone increasing on [a,b]
2. Between any two distinct zeros of f, there exists at least one zero of f'
3. If f has a local extremum at c and f is differentiable at c, then f'(c) = 0

---

### הרצאה 13 אינפי 2 (Lecture 13 Part 2)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/הרצאה\ 13\ אינפי\ 2.pdf

**Main Topics:**
- Second derivative and higher derivatives
- Concavity
- Inflection points
- Optimization and extrema

**Key Definitions:**

1. **Second derivative:** f''(x) = (f')'(x) = d²f/dx²

2. **Higher order derivatives:** f⁽ⁿ⁾(x) is the nth derivative of f

3. **Critical point:** A point c is a critical point of f if:
   - f'(c) = 0, or
   - f'(c) does not exist

4. **Local maximum:** f(c) is a local maximum if there exists an interval (c-δ, c+δ) such that f(c) ≥ f(x) for all x in this interval

5. **Local minimum:** f(c) is a local minimum if there exists an interval (c-δ, c+δ) such that f(c) ≤ f(x) for all x in this interval

6. **Global (absolute) maximum/minimum:** f(c) is a global maximum if f(c) ≥ f(x) for all x in the domain

7. **Concave up (convex):** A function is concave up on (a,b) if f''(x) > 0 for all x ∈ (a,b)

8. **Concave down (concave):** A function is concave down on (a,b) if f''(x) < 0 for all x ∈ (a,b)

9. **Inflection point:** A point (c, f(c)) is an inflection point if f'' changes sign at c

**Key Theorems:**

1. **First Derivative Test:** If c is a critical point of f (f'(c) = 0):
   - If f'(x) changes from positive to negative at c, then f has a local maximum at c
   - If f'(x) changes from negative to positive at c, then f has a local minimum at c
   - If f' does not change sign at c, then f has neither a local maximum nor minimum at c (it's an inflection point)

   - Proof: Use monotonicity theorem. If f'(x) > 0 for x < c and f'(x) < 0 for x > c, then f is increasing before c and decreasing after c.

2. **Second Derivative Test:** If f'(c) = 0:
   - If f''(c) > 0, then f has a local minimum at c
   - If f''(c) < 0, then f has a local maximum at c
   - If f''(c) = 0, the test is inconclusive (use First Derivative Test or higher derivatives)

   - Proof: If f''(c) > 0, then f' is increasing near c. Since f'(c) = 0, we have f' < 0 for x < c (close to c) and f' > 0 for x > c (close to c), so f has a local minimum.

3. **Concavity Theorem:** Let f be twice differentiable on (a,b):
   - If f''(x) > 0 for all x ∈ (a,b), then f is strictly concave up on (a,b)
   - If f''(x) < 0 for all x ∈ (a,b), then f is strictly concave down on (a,b)
   - If f''(x) ≥ 0 for all x ∈ (a,b), then f is concave up on (a,b)
   - If f''(x) ≤ 0 for all x ∈ (a,b), then f is concave down on (a,b)

4. **Inflection Point Theorem:** If (c, f(c)) is an inflection point of f, then:
   - f''(x) changes sign at c, or
   - f''(c) = 0 and f'' changes sign at c

   Converse: Not all points where f'' = 0 are inflection points

5. **Convexity implies Jensen's inequality:** If f is concave up on [a,b], then for any x₁, x₂ ∈ [a,b] and any λ ∈ [0,1]:
   - f(λx₁ + (1-λ)x₂) ≤ λf(x₁) + (1-λ)f(x₂)

6. **Tangent line and convexity:**
   - If f is concave up on (a,b), the graph lies above all its tangent lines on (a,b)
   - If f is concave down on (a,b), the graph lies below all its tangent lines on (a,b)

**Key Lemmas:**

1. If f''(c) = 0 and f'' changes sign at c, then c is an inflection point
2. If f'' doesn't exist at c but f' exists and changes from increasing to decreasing (or vice versa), then c may be an inflection point
3. If f is concave up on (a,b), then f is strictly convex: the midpoint of any chord lies strictly above the curve
4. A function with positive second derivative is convex (its epigraph is a convex set)

---

## ENGLISH LECTURES (GROUP 2)

### Lecture 2 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 2\ group\ 2\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Sequences and limits
- Algebraic operations with limits
- Squeeze theorem
- Special limits

**Key Definitions:**
1. **Sequence:** An ordered list of numbers {aₙ}ₙ₌₁^∞
2. **Limit of a sequence:** lim(n→∞) aₙ = L if ∀ε > 0, ∃N such that ∀n > N: |aₙ - L| < ε
3. **Convergent sequence:** A sequence that has a finite limit
4. **Divergent sequence:** A sequence that does not converge

**Key Theorems:**
1. **Algebra of limits:** If aₙ → a and bₙ → b:
   - aₙ ± bₙ → a ± b
   - aₙ · bₙ → a · b
   - aₙ/bₙ → a/b (if b ≠ 0)

2. **Squeeze Theorem:** If aₙ ≤ bₙ ≤ cₙ and aₙ → L, cₙ → L, then bₙ → L

---

### Lecture 4 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 4\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Limits of functions
- Continuity
- One-sided limits

**Key Definitions:**
1. **Limit:** lim(x→a) f(x) = L if ∀ε > 0, ∃δ > 0 such that 0 < |x-a| < δ ⟹ |f(x)-L| < ε
2. **Continuity:** f is continuous at a if lim(x→a) f(x) = f(a)
3. **Right-hand limit:** lim(x→a⁺) f(x)
4. **Left-hand limit:** lim(x→a⁻) f(x)

**Key Theorems:**
1. **Continuity condition:** f is continuous at a iff lim(x→a⁻) f(x) = lim(x→a⁺) f(x) = f(a)
2. **Limit laws:** If lim(x→a) f(x) = L and lim(x→a) g(x) = M, then:
   - lim(x→a) [f(x) + g(x)] = L + M
   - lim(x→a) [f(x) · g(x)] = L · M
   - lim(x→a) [f(x)/g(x)] = L/M (if M ≠ 0)

---

### Lecture 7 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 7\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Continuity on intervals
- Intermediate Value Theorem
- Extreme Value Theorem

**Key Theorems:**
1. **Intermediate Value Theorem:** If f is continuous on [a,b] and N is between f(a) and f(b), then ∃c ∈ (a,b): f(c) = N

2. **Extreme Value Theorem:** If f is continuous on [a,b], then f attains maximum and minimum on [a,b]

---

### Lecture 8 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 8\ group\ 2\ calculus\ 1\ 2026\ 2.pdf

**Main Topics:**
- Derivative definition
- Differentiation rules
- Rate of change

**Key Definitions:**
1. **Derivative:** f'(a) = lim(h→0) [f(a+h) - f(a)]/h

**Key Theorems:**
1. **Differentiability implies continuity:** If f is differentiable at a, then f is continuous at a
2. **Power rule:** d/dx(xⁿ) = n·xⁿ⁻¹
3. **Sum rule:** (f + g)' = f' + g'
4. **Constant multiple rule:** (c·f)' = c·f'

---

### Lecture 9 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 9\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Product rule
- Quotient rule
- Chain rule

**Key Theorems:**
1. **Product rule:** (f·g)' = f'·g + f·g'
   - Proof given

2. **Quotient rule:** (f/g)' = (f'·g - f·g')/g² (where g ≠ 0)
   - Proof given

3. **Chain rule:** (f ∘ g)'(x) = f'(g(x))·g'(x)
   - Proof given

**Key Corollaries:**
- d/dx(sin x) = cos x
- d/dx(cos x) = -sin x
- d/dx(eˣ) = eˣ
- d/dx(ln x) = 1/x

---

### Lecture 10 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 10\ group\ 2\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Exponential functions
- Logarithmic functions
- Derivatives of exp and log

**Key Theorems:**
1. **Exponential derivatives:**
   - d/dx(aˣ) = aˣ · ln(a)
   - d/dx(eˣ) = eˣ

2. **Logarithmic derivatives:**
   - d/dx(logₐ x) = 1/(x · ln a)
   - d/dx(ln x) = 1/x

3. **eˣ is unique:** eˣ is the unique function such that f'(x) = f(x) and f(0) = 1

---

### Lecture 11 Group 1 (2nd file)
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 11\ group\ 1\ calculus\ 1\ 2026\ \(2\).pdf

**Main Topics:**
- Inverse functions
- Derivatives of inverse functions
- Trigonometric function derivatives
- Inverse trigonometric function derivatives

**Key Theorems:**
1. **Inverse function theorem:** If f is continuous and strictly monotonic on [a,b] with f'(x) ≠ 0, then (f⁻¹)'(y) = 1/f'(f⁻¹(y))

2. **Trigonometric derivatives:**
   - d/dx(sin x) = cos x
   - d/dx(cos x) = -sin x
   - d/dx(tan x) = sec²(x)
   - d/dx(cot x) = -csc²(x)
   - d/dx(sec x) = sec(x)·tan(x)
   - d/dx(csc x) = -csc(x)·cot(x)

3. **Inverse trigonometric derivatives:**
   - d/dx(arcsin x) = 1/√(1-x²)
   - d/dx(arccos x) = -1/√(1-x²)
   - d/dx(arctan x) = 1/(1+x²)

---

### Lecture 12 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 12\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Related rates
- Implicit differentiation
- Optimization problems

**Key Definitions:**
1. **Related rates:** Problems where the rate of change of one quantity depends on the rate of change of another
2. **Implicit differentiation:** Differentiating an equation where y is defined implicitly by f(x,y) = 0

**Key Theorems:**
1. **Implicit function theorem:** If F(x,y) = 0 and ∂F/∂y ≠ 0, then dy/dx = -(∂F/∂x)/(∂F/∂y)

---

### Lecture 14 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 14\ group\ 2\ calculus\ 1\ 2026.pdf

**Main Topics:**
- L'Hôpital's Rule
- Indeterminate forms
- Limit evaluation techniques

**Key Theorems:**
1. **L'Hôpital's Rule:** If lim f(x) = 0 and lim g(x) = 0, then lim f(x)/g(x) = lim f'(x)/g'(x) (if right limit exists)

2. **L'Hôpital's Rule for infinity:** If lim f(x) = ±∞ and lim g(x) = ±∞, then lim f(x)/g(x) = lim f'(x)/g'(x)

**Indeterminate forms:**
- 0/0, ∞/∞, 0·∞, ∞-∞, 0⁰, 1^∞, ∞⁰

---

### Lecture 15 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 15\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Monotonicity
- Critical points
- First Derivative Test

**Key Definitions:**
1. **Increasing function:** f(x₁) < f(x₂) when x₁ < x₂
2. **Decreasing function:** f(x₁) > f(x₂) when x₁ < x₂
3. **Critical point:** f'(c) = 0 or f'(c) doesn't exist

**Key Theorems:**
1. **Increasing/Decreasing Test:**
   - If f'(x) > 0 on (a,b), then f is increasing on (a,b)
   - If f'(x) < 0 on (a,b), then f is decreasing on (a,b)

2. **First Derivative Test:** Critical point c is:
   - Local maximum if f' changes from + to -
   - Local minimum if f' changes from - to +

---

### Lecture 16 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 16\ group\ 2\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Concavity
- Inflection points
- Second Derivative Test

**Key Definitions:**
1. **Concave up:** f''(x) > 0
2. **Concave down:** f''(x) < 0
3. **Inflection point:** where f'' changes sign

**Key Theorems:**
1. **Concavity Test:**
   - If f''(x) > 0 on (a,b), then f is concave up
   - If f''(x) < 0 on (a,b), then f is concave down

2. **Second Derivative Test:** If f'(c) = 0:
   - If f''(c) > 0, then f has local minimum at c
   - If f''(c) < 0, then f has local maximum at c

---

### Lecture 18 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 18\ group\ 2\ calculus\ 2026-2.pdf

**Main Topics:**
- Curve sketching
- Asymptotes
- Optimization problems

**Key Definitions:**
1. **Vertical asymptote:** lim(x→a) f(x) = ±∞
2. **Horizontal asymptote:** lim(x→∞) f(x) = L
3. **Oblique asymptote:** y = mx + b where lim(x→∞) [f(x) - (mx+b)] = 0

---

### Lecture 19 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 19\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Antiderivatives
- Indefinite integrals
- Integration rules and formulas

**Key Definitions:**
1. **Antiderivative:** F is an antiderivative of f if F'(x) = f(x)
2. **Indefinite integral:** ∫f(x)dx = F(x) + C

**Key Theorems:**
1. **Linearity:** ∫[af(x) + bg(x)]dx = a∫f(x)dx + b∫g(x)dx
2. **u-substitution:** ∫f(g(x))·g'(x)dx = ∫f(u)du where u = g(x)

**Integration formulas:** (see Quick Reference document)

---

### Lecture 20 Group 2
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 20\ calculus\ 1\ group\ 2\ 2026-3.pdf

**Main Topics:**
- Definite integrals
- Riemann sums
- Fundamental Theorem of Calculus

**Key Definitions:**
1. **Definite integral:** ∫ₐᵇ f(x)dx = lim(||P||→0) Σ f(xᵢ*)·Δxᵢ

**Key Theorems:**
1. **Fundamental Theorem Part 1:** ∫ₐᵇ f(x)dx = F(b) - F(a) where F'=f
   - Proof given

2. **Fundamental Theorem Part 2:** d/dx[∫ₐˣ f(t)dt] = f(x)

3. **Additivity:** ∫ₐᵇ f + ∫ᵦᶜ f = ∫ₐᶜ f

4. **Integral inequality:** If f ≤ g on [a,b], then ∫f ≤ ∫g

---

### Lecture 21 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 21\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Integration by parts
- Integration by substitution
- Special integration techniques

**Key Theorems:**
1. **Integration by parts:** ∫u·dv = uv - ∫v·du
   - Proof: Apply product rule (uv)' = u'v + uv' then integrate both sides

2. **Integration by substitution:** ∫f(g(x))·g'(x)dx = ∫f(u)du where u = g(x)

**Key Techniques:**
- LIATE rule for choosing u and dv
- Multiple applications of integration by parts
- Trigonometric substitutions

---

### Lecture 22 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 22\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Partial fractions
- Rational function integration
- Advanced integration techniques

**Key Theorems:**
1. **Partial fraction decomposition:** Any proper rational P(x)/Q(x) can be written as sum of simpler fractions

**Cases:**
- Distinct linear factors: A/(x-a) + B/(x-b)
- Repeated linear factors: A/(x-a) + B/(x-a)²
- Irreducible quadratic: (Ax+B)/(x²+bx+c)

---

### Lecture 23 Group 1
**File:** /sessions/eloquent-admiring-planck/mnt/files/lecture/Lecture\ 23\ group\ 1\ calculus\ 1\ 2026.pdf

**Main Topics:**
- Area between curves
- Volumes of solids of revolution
- Arc length

**Key Definitions:**
1. **Area between curves:** A = ∫ₐᵇ |f(x) - g(x)|dx
2. **Volume (disk method):** V = π∫ₐᵇ [R(x)]²dx
3. **Arc length:** L = ∫ₐᵇ √(1+[f'(x)]²)dx

**Key Theorems:**
1. **Volume formulas:**
   - Disk method: V = π∫ₐᵇ [f(x)]²dx
   - Washer method: V = π∫ₐᵇ {[R(x)]² - [r(x)]²}dx
   - Shell method: V = 2π∫ₐᵇ x·f(x)dx

2. **Arc length formula:** L = ∫ₐᵇ √(1+[dy/dx]²)dx

---

## CROSS-REFERENCE INDEX

### Theorems by Topic

**Limits and Sequences:**
- Uniqueness of limits (Lecture 1)
- Algebra of limits (Lectures 2, 3)
- Squeeze Theorem (Lectures 2, 3)
- Monotone Convergence Theorem (Lecture 3)

**Function Limits and Continuity:**
- Function limit definition (Lecture 5, 4)
- Continuity and function limits (Lectures 5, 7, 4)
- Intermediate Value Theorem (Lectures 6, 7)
- Extreme Value Theorem (Lectures 6, 7)
- Bolzano's Theorem (Lecture 6)

**Differentiation:**
- Derivative definition (Lecture 11, 8)
- Power rule (Lecture 11)
- Product rule (Lecture 11, 9)
- Quotient rule (Lecture 11, 9)
- Chain rule (Lecture 13, 9)
- Exponential derivatives (Lecture 10)
- Logarithmic derivatives (Lecture 10)
- Trigonometric derivatives (Lecture 11)
- Inverse trigonometric derivatives (Lecture 11)
- Inverse function derivatives (Lecture 13)

**Applications of Derivatives:**
- Rolle's Theorem (Lecture 17)
- Mean Value Theorem (Lecture 17)
- Monotonicity test (Lecture 15, 17)
- First Derivative Test (Lecture 15, 13)
- Second Derivative Test (Lecture 16, 13)
- Concavity test (Lecture 16, 13)
- L'Hôpital's Rule (Lecture 14)

**Integration:**
- Antiderivative definition (Lecture 19)
- Integration formulas (Lecture 19)
- u-substitution (Lecture 21, 19)
- Integration by parts (Lecture 21)
- Partial fractions (Lecture 22)
- Definite integral definition (Lecture 20)
- Fundamental Theorem of Calculus (Lecture 20)

**Applications of Integration:**
- Area between curves (Lecture 23)
- Volumes (Lecture 23)
- Arc length (Lecture 23)

---

**Document Status:** Complete lecture-by-lecture breakdown of all 25 Calculus 1 lectures with detailed theorem statements, definitions, lemmas, and notes on which proofs were given in class.
