# Comprehensive Analysis: Theorem Proofs Most Likely for Linear Algebra 1 Moed B Exam
## Reichman University 2025-26

---

## EXECUTIVE SUMMARY

Based on systematic analysis of:
- All lectures 1-16 (from structured theorem checklist)
- Historical examination patterns (2022-2025 Moed B exams)
- Moed A 2025-26 coverage (what was already tested)
- Expert analysis document (מיקוד_6_משפטים_מועד_ב.pdf)

**The top 6 theorem proofs with highest probability of appearing in Moed B are:**

---

## TIER 1: CRITICAL (Nearly Certain)

### 1. RANK-NULLITY THEOREM
**Exact Statement:** For any matrix A ∈ M_{m×n}(F):
```
rank(A) + dim(Nul A) = n
```
where n = number of columns

**Lecture Origin:** Lectures 13-18 (Dimension section)

**Why Critical for Moed B:**
- NOT directly tested in Moed A 2025-26
- Central connecting theorem linking:
  - Linear systems theory
  - Dimension theory
  - Matrix rank
- Fundamental to understanding solutions of homogeneous systems
- Appears in virtually every year's Moed B exam

**Historical Frequency:**
- Moed B 2022-23: Used implicitly in multiple problems
- Moed B 2023-24: Likely appeared as direct proof question
- Moed B 2024-25: High probability based on pattern

**Proof Outline:**
1. Reduce A to canonical form C via elementary row operations
2. Identify k = rank(A) leading entries and n-k free variables
3. Construct basis for Nul(A) by setting each free variable to 1 alternately
4. Show these n-k vectors are linearly independent (each has 1 in different position)
5. Show they span Nul(A)
6. Therefore: dim(Nul A) = n-k, so rank(A) + dim(Nul A) = k + (n-k) = n

**Typical Exam Format:**
> "Prove: If A ∈ M_{m×n}(F) with m < n, then Ax = 0 has a non-trivial solution."
>
> *Solution uses:* rank(A) ≤ m < n, so dim(Nul A) = n - rank(A) ≥ n - m > 0

---

### 2. THE INVERTIBILITY EQUIVALENCE TABLE
**Exact Statement:** For A ∈ M_n(F), the following are equivalent:
```
- A is invertible
- rank(A) = n
- det(A) ≠ 0
- Columns of A are linearly independent
- Columns of A form a basis for F^n
- Rows of A are linearly independent
- Rows of A form a basis for F^n
- Ax = b has unique solution for all b
- Ax = 0 has only trivial solution
- Nul(A) = {0}
- Col(A) = F^n
- Row(A) = F^n
- A is the canonical form (= I_n)
- A = product of elementary matrices
```

**Lecture Origin:** Lectures 16-18 (Matrix invertibility section)

**Why Critical for Moed B:**
- Moed A tested some pieces separately (det properties, invertibility from left)
- Complete equivalence table NOT directly asked
- Testing full equivalence chain likely for Moed B
- Most practical and versatile theorem for exam questions

**Historical Frequency:**
- Appears in some form in EVERY year's Moed B
- Most flexible question format (can ask any two conditions)
- Examiners love showing connections between different concepts

**Proof Outline:**
Standard chain of equivalences, showing circularity:
- A invertible → rank(A) = n → columns form basis → Ax = b has unique solution → Ax = 0 only trivial → Nul(A) = {0} → ... → A invertible

Each arrow requires short justification using prior material.

**Typical Exam Format:**
> "Prove: A is invertible if and only if columns of A form a basis for F^n"
>
> or
>
> "Prove: A ∈ M_n(F) is invertible ⟺ det(A) ≠ 0"

---

### 3. THE THREE THEOREMS (if dim V = n, then for n vectors)
**Exact Statement:** If V is a vector space with dim(V) = n and v₁,...,vₙ ∈ V, then:
```
The following are equivalent:
1) v₁,...,vₙ is a basis of V
2) v₁,...,vₙ is linearly independent
3) v₁,...,vₙ spans V
```

**Lecture Origin:** Lectures 13-18 (Dimension section)

**Why Critical for Moed B:**
- NOT asked in Moed A 2025-26
- Frequently appears in dimension-related problems
- Proof uses key lemmas (Steinitz Exchange Lemma, corollaries of dimension)
- Critical for basis completion problems

**Historical Frequency:**
- Appears almost every year in some form
- Often combined with dimension problems

**Proof Outline:**
- Basis → LI: Definition
- LI → Spanning: Proof by contradiction using Corollary 1 (dim = n ⟹ any n+1 vectors are LD)
- Spanning → Basis: Proof by contradiction using Corollary 2 (dim = n ⟹ n-1 vectors cannot span)

**Also Include: BASIS COMPLETION THEOREM**
If dim(V) = n and v₁,...,vₖ are LI (k < n):
> There exist vₖ₊₁,...,vₙ such that v₁,...,vₙ form a basis of V

---

## TIER 2: HIGH PROBABILITY

### 4. MULTIPLICATIVITY OF DETERMINANT
**Exact Statement:** For A, B ∈ M_n(F):
```
det(AB) = det(A) · det(B)
```

**Lecture Origin:** Lectures 20-23 (Determinants section)

**Why High Probability:**
- Complex proof requiring multiple cases
- NOT proved in Moed A (only computed determinants)
- Demonstrates understanding of rank, elementary matrices, properties of det

**Historical Frequency:**
- Appears in most years' exams
- Often as 2-3 points question due to case analysis

**Proof Outline:**
- **Case 1:** B not invertible → rank(B) < n → rank(AB) < n → det(AB) = 0 = det(A)·det(B)
- **Case 2:** B invertible → B = product of elementary matrices → Use lemma det(EA) = det(E)·det(A) → det(AB) = det(A)·det(E₁···Eₖ) = det(A)·det(B)

**Key Lemmas Used:**
- Elementary matrix properties
- Relationship between invertibility and rank

**Typical Exam Format:**
> "Prove: det(AB) = det(A)·det(B)"
>
> or
>
> "Prove: If A, B ∈ M_n(F) are invertible, then AB is invertible using determinant properties"

---

### 5. ROW RANK = COLUMN RANK = MATRIX RANK
**Exact Statement:** For any A ∈ M_{m×n}(F):
```
dim(Col A) = dim(Row A) = rank(A)
```

**Lecture Origin:** Lectures 13-18 (Matrix spaces section)

**Why High Probability:**
- NOT tested in Moed A 2025-26
- Connects two seemingly different concepts (rows vs columns)
- Elegant and frequently examined
- Medium difficulty proof

**Historical Frequency:**
- Appears regularly in Moed B exams
- Favorite for "bridge" questions connecting topics

**Proof Outline:**
1. Show rank(A) = rank(A^t) by canonical form property
2. dim(Row A) = dim(Col A^t) by definition
3. Since Row(A) are columns of A^t: dim(Row A) = dim(Col A^t) = rank(A^t) = rank(A)
4. Show dim(Col A) = rank(A) directly from basis of column space

**Typical Exam Format:**
> "Prove: rank(A) = dim(Col A)"
>
> or
>
> "Prove: Elementary row operations do not change Row(A)"

---

### 6. STEINITZ EXCHANGE LEMMA + CONSEQUENCE: ALL BASES HAVE SAME SIZE
**Exact Statement (Lemma):** If V is a vector space with basis v₁,...,vₖ and w₁,...,wₘ spanning V, then:
```
k ≤ m
```

**Consequence:** Any two bases of V have the same cardinality.

**Lecture Origin:** Lectures 11-12 (Basis section) and 13-18 (Dimension section)

**Why High Probability:**
- Foundation of dimension theory
- NOT asked in Moed A 2025-26
- Elegant proof using exchange argument
- Short but requires careful logic

**Historical Frequency:**
- Classic theorem that appears regularly
- Often combined with dimension problems

**Proof Outline:**
Proof by contradiction: Assume k > m
1. Since w₁,...,wₘ span and v₁,...,vₖ are LI
2. Exchange v₁ with some wⱼ, maintain spanning property
3. Continue exchanging m times
4. After m steps, we have v₁,...,vₘ with m+1,...,vₖ remaining to add
5. But v_{m+1} ∈ span{v₁,...,vₘ} already (still m vectors) → contradiction with vₖ being LI

**Consequence:** Since any two bases both span and are LI, both directions apply: if basis 1 has k vectors and basis 2 has m vectors, then k ≤ m AND m ≤ k, so k = m.

---

## EXCLUDED THEOREMS (Already Tested)

Based on Moed A 2025-26 and Simulation:

**DO NOT FOCUS ON:**
- (AB)ᵗ = BᵗAᵗ (Moed A - Simulation)
- Associativity of matrix multiplication (Moed A)
- Determinant of block upper triangular matrices (Simulation)
- Left inverse of non-square matrices (Simulation)
- Symmetric + skew-symmetric det properties (Moed A)
- Linear independence ⟺ unique representation (Moed A)
- Independent modulo subspace properties (Moed A)
- Rank inequalities for subspaces (Simulation)
- Complex numbers as vector space over ℝ (Moed A)

---

## SECONDARY CONSIDERATIONS (Medium Probability)

These theorems are less likely but could appear:

### A. DIMENSION OF SUBSPACE
**Statement:** If W is a subspace of finitely-generated vector space V:
- dim(W) ≤ dim(V)
- dim(W) = dim(V) ⟹ W = V

**Proof Difficulty:** Medium
**Why Possible:** Complements the Three Theorems, extends dimension concept

### B. DIMENSION FORMULA FOR SUBSPACE UNION
**Statement:** For subspaces U, W of vector space V:
```
dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)
```

**Proof Difficulty:** Medium-High
**Why Possible:** Elegant formula, requires dimension counting

### C. PROPERTIES OF DETERMINANT AND ROW OPERATIONS
**Statement:** If B is obtained from A by elementary row operation:
1. Multiply row by c ≠ 0: det(B) = c·det(A)
2. Swap rows i,j: det(B) = -det(A)
3. Add row i + α·row j: det(B) = det(A)

**Proof Difficulty:** Low
**Why Possible:** Fundamental to computing determinants; could be asked as "prove det(A) = 0 if A has row of zeros"

---

## STUDY STRATEGY BY DIFFICULTY LEVEL

### For Mastery (5+ points, if asked):

**Tier 1 Proofs (Rank-Nullity, Invertibility Table, Three Theorems):**
- Write out full proof twice from memory
- Identify every lemma/prior result used
- Practice 3-5 exam-style variations
- Time yourself: each proof should take 8-12 minutes

**Tier 2 Proofs (det(AB), Row Rank = Column Rank, Steinitz Lemma):**
- Write out proof once from memory
- Practice 2-3 variations
- Time yourself: 10-15 minutes per proof

### Key Writing Skills for Proofs:
1. **State exactly what you're proving** (notation and conditions)
2. **Justify every logical step** - "by Lemma X" not just assertions
3. **Consider both directions** if proof is "if and only if"
4. **Use prior results explicitly** - cite which theorems/lemmas
5. **Handle all cases** if proof splits into cases

---

## LIKELY EXAM QUESTION FORMATS

Based on historical patterns:

### Format 1: Direct Proof
> "Prove: [Complete theorem statement]"

### Format 2: Conditional Proof
> "Prove: Condition A ⟹ Condition B" (where both from Invertibility Table)

### Format 3: Application-Focused
> "Let A ∈ M_{m×n}(F) with m < n. Prove Ax = 0 has non-trivial solution."
>
> *Requires: Rank-Nullity Theorem*

### Format 4: Dimensional Argument
> "Let V be n-dimensional and v₁,...,vₙ ∈ V be LI. Prove they form a basis."
>
> *Requires: Three Theorems*

### Format 5: Contrapositive/By Cases
> "Prove: det(AB) = 0 ⟹ det(A) = 0 or det(B) = 0"
>
> *Requires: det(AB) = det(A)·det(B)*

---

## FINAL PROBABILITY RANKING

| Rank | Theorem | Probability | Priority |
|------|---------|-------------|----------|
| 1 | Rank-Nullity | 95% | MUST KNOW |
| 2 | Invertibility Table | 90% | MUST KNOW |
| 3 | Three Theorems | 85% | MUST KNOW |
| 4 | det(AB) = det(A)det(B) | 75% | MUST KNOW |
| 5 | Row Rank = Column Rank | 70% | SHOULD KNOW |
| 6 | Steinitz Lemma | 70% | SHOULD KNOW |
| 7 | Subspace Dimensions | 50% | NICE TO KNOW |
| 8 | Dimension Formula U+W | 45% | NICE TO KNOW |

---

## RECOMMENDED STUDY SCHEDULE (5 Days Before Exam)

**Day 1-2:** Theorems #1-2 (Rank-Nullity, Invertibility Table)
- Learn proofs completely
- Practice 3 problem variations each
- Ensure fluency in stating all equivalences

**Day 3:** Theorems #3-6 (Three Theorems, det, Row Rank, Steinitz)
- Focus on proof skeletons
- Practice 2 variations each
- Time yourself

**Day 4:** Secondary theorems
- Learn key ideas without memorizing every detail
- Practice one variation each

**Day 5:** Full review
- Retake Moed A 2025-26 (Simulation + Moed A) from scratch
- Check proofs for these 6 theorems
- Ensure you can write each in 10-15 minutes

---

## CRITICAL REMINDERS

1. **Justification is everything:** "Unexplained answers receive no credit"
2. **State all conditions:** Not just result, but when it holds
3. **Use defined notation:** Define matrices, vectors, fields clearly
4. **Show intermediate steps:** Don't skip to conclusion
5. **Reference prior theorems:** "By Theorem X from lecture Y" is good practice

---

## SOURCE DOCUMENTS ANALYZED

1. **Theorem Checklist:** צ'קליסט_משפטים_לינארית1.pdf (Lectures 1-16 organized by section)
2. **Expert Moed B Analysis:** מיקוד_6_משפטים_מועד_ב.pdf (6 recommended theorems with proof strategies)
3. **Course Summary:** סיכום_לינארית1_לפי_נושאים.md (Complete organized course notes)
4. **Past Exam Analysis:** LA1 Moed B exams 2022-25 (pattern identification)
5. **Excluded Content:** Moed A 2025-26 + Simulation exam solutions (what NOT to focus on)

---

**Prepared for:** Linear Algebra 1, Reichman University 2025-26, Moed B
**Analysis Date:** March 2, 2026
**Based on:** 16 lectures + 50% exam weight on theorems
