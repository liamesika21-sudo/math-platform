# Theorem Proofs by Lecture: Which to Focus on for Moed B
## Mapping Lectures 1-16 to Exam Likelihood

---

## LECTURES 1-5: FIELDS & LINEAR SYSTEMS
**Moed B Likelihood: VERY LOW**

These lectures cover foundational material already tested in earlier exams.

| Theorem | Lecture | Status | Why Not Likely |
|---------|---------|--------|----------------|
| Field axioms | 1-2 | Tested | Covered in Moed A, elementary |
| Zₙ is field iff n prime | 3 | Tested | Arithmetic, not linear algebra |
| Linear system equivalence via row ops | 4-5 | Tested | Basic material |
| Rank definition (# pivots) | 5 | Tested | Foundation only |
| Homogeneous systems | 4-5 | Tested | Covered in Moed A variations |

**Action:** Skip these in Moed B review.

---

## LECTURE 6: LINEAR SYSTEMS (Continued)
**Moed B Likelihood: LOW**

Foundation for later material, but specific theorems already tested.

| Theorem | Lecture | Status | Why Not Likely |
|---------|---------|--------|----------------|
| Consistent ⟺ rank(A) = rank(A⁺) | 6 | Tested | Tested in Simulation |
| rank(A) ≤ min(m,n) | 6 | Tested | Basic inequality |
| Solutions = particular + homogeneous | 6 | Tested | Tested variations |

**Action:** Use as needed for context, don't memorize proofs.

---

## LECTURES 7-8: VECTOR SPACES (Intro)
**Moed B Likelihood: MEDIUM**

Core material, but specific proofs less likely to be asked directly.

| Theorem | Lecture | Status | Moed B Likelihood |
|---------|---------|--------|------------------|
| 10 VS axioms ⟹ properties | 7 | Checked | LOW - Basic axioms |
| Scalar multiplication properties | 7 | Checked | LOW - Elementary |
| 0·v = 0 in any VS | 7 | Checked | LOW - Trivial |
| -1·v = -v in any VS | 7 | Checked | LOW - Standard |
| Subspace criterion (closed under +, ·) | 8 | Tested | LOW - Definition-based |
| Intersection of subspaces is subspace | 8 | Tested | LOW - Straightforward |
| **Union of subspaces not subspace** | 8 | Tested | **MEDIUM** - Tested in Moed A with condition |
| W₁ ∪ W₂ subspace ⟹ W₁ ⊆ W₂ or W₂ ⊆ W₁ | 8 | Tested | MEDIUM - May appear as counterexample |

**Action:** Know subspace characterizations but not deep proofs.

---

## LECTURES 9-10: SPAN & LINEAR INDEPENDENCE
**Moed B Likelihood: HIGH**

Fundamental concepts, but focus shifts to dimension.

| Theorem | Lecture | Status | Moed B Likelihood |
|---------|---------|--------|------------------|
| span(S) is subspace | 9 | Tested | MEDIUM - Basis for dimension |
| span properties (A ⊆ B ⟹ span(A) ⊆ span(B)) | 9 | Tested | MEDIUM - Useful lemmas |
| **LI ⟺ unique representation** | 10 | Tested | **MEDIUM-HIGH** - Tested in Moed A |
| **LI ⟺ vⱼ ∉ span{v₁,...,vⱼ₋₁}** | 10 | Tested | **HIGH** - Fundamental characterization |
| If 0 ∈ S then S is LD | 10 | Tested | LOW - Immediate from definition |
| A LD, B ⊇ A ⟹ B LD | 10 | Tested | LOW - Trivial |

**Action:** Know LI characterizations deeply. Independence extension is KEY.

---

## LECTURES 11-12: BASIS
**Moed B Likelihood: VERY HIGH**

Critical material—basis and dimension are course center.

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **Basis definition (LI + spanning)** | 11 | Tested | **CRITICAL** - Foundation |
| **Steinitz Exchange Lemma** | 12 | Proved | **⭐ HIGH (Theorem #6)** - Guarantees size |
| **Corollary: All bases have same size** | 12 | Proved | **⭐ HIGH (Theorem #6)** - Foundation of dim |
| V finitely generated ⟹ has basis | 11 | Proved | MEDIUM - Existence theorem |
| Two bases of same space have same size | 11-12 | Proved | **HIGH** - Critical for dimension |
| Standard bases (Fⁿ, Mₘₙ, Fₙ[x]) | 11 | Checked | LOW - Examples, not proofs |

**Action:** MUST MASTER Steinitz Lemma and basis concepts. These are #6 on likelihood list.

---

## LECTURES 13-18: DIMENSION (Most Important Section)
**Moed B Likelihood: EXTREMELY HIGH**

This is the heart of Moed B! All major theorems here.

### Lecture 13: Dimension Definition & Properties

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **dim(V) = size of basis (well-defined)** | 13 | Proved | **⭐ CRITICAL** |
| **Consequences: k n-vectors + LI ⟹ they span** | 13 | Deduced | **⭐ Part of Theorem #3** |
| **Consequences: k n-vectors + spanning ⟹ they LI** | 13 | Deduced | **⭐ Part of Theorem #3** |
| **Theorem (The Three): For n vectors in n-dim space, LI ⟺ spanning ⟺ basis** | 13 | **MAJOR** | **⭐⭐⭐ (Theorem #3)** |
| dim(W) ≤ dim(V) for W ⊆ V | 13 | Proved | MEDIUM-HIGH |
| **dim(W) = dim(V) ⟹ W = V** | 13 | Proved | **MEDIUM-HIGH** - Shows equality structure |

### Lecture 14: Basis Completion & Direct Sum

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **Basis Completion: LI set can extend to basis** | 14 | Proved | **⭐ MEDIUM-HIGH** - Exam-friendly |
| **Dimension formula: dim(U+W) = dim(U) + dim(W) - dim(U∩W)** | 14 | Proved | **MEDIUM** - Less asked directly than others |
| If V = U ⊕ W then dim(V) = dim(U) + dim(W) | 14 | Corollary | MEDIUM - Specific case |

### Lectures 15-18: Matrix Spaces & Rank-Nullity

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **RANK-NULLITY: rank(A) + dim(Nul A) = n** | 15-16 | **MAJOR** | **⭐⭐⭐ (Theorem #1)** |
| **Row Rank = Column Rank = Rank** | 16-17 | **MAJOR** | **⭐⭐ (Theorem #5)** |
| NulA = {0} ⟺ A invertible (for square) | 16 | Corollary | LOW - Follows from others |
| ColA = Fⁿ ⟺ A invertible (for square) | 16 | Corollary | LOW - Follows from others |
| RowA = Fⁿ ⟺ A invertible (for square) | 16 | Corollary | LOW - Follows from others |
| A⁺ = A∘ + A_p (solution structure) | 17 | Proved | LOW - Application only |

---

## LECTURES 16-18: MATRICES & INVERTIBILITY
**Moed B Likelihood: VERY HIGH**

Critical applications and the Invertibility Table.

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **INVERTIBILITY EQUIVALENCE TABLE** | 16-18 | **MAJOR** | **⭐⭐⭐ (Theorem #2)** |
| Invertibility ⟺ rank = n | 16 | Tested | **HIGH** - Foundation |
| A invertible ⟹ det(A) ≠ 0 | 17 | Tested | **HIGH** - Bridge to det |
| (AB)⁻¹ = B⁻¹A⁻¹ | 16 | Proved | MEDIUM - Algebraic property |
| (Aᵗ)⁻¹ = (A⁻¹)ᵗ | 17 | Proved | LOW - Application |
| A ⟺ product of elementary matrices | 16 | Proved | MEDIUM - Constructive characterization |
| **Elementary matrices are invertible** | 16 | Proved | MEDIUM - Used in det proofs |
| **det(EA) = det(E)·det(A) for E elementary** | 17-18 | **KEY LEMMA** | **⭐⭐ - CRUCIAL for Theorem #4** |

---

## LECTURES 20-23: DETERMINANTS
**Moed B Likelihood: MEDIUM-HIGH**

Determinant theorems are tested but less frequently than dimension/rank theorems.

| Theorem | Lecture | Status | **Moed B Likelihood** |
|---------|---------|--------|------------------|
| **det is multilinear** | 20 | Proved | MEDIUM - Property, not proof |
| **det is alternating (swapped rows ⟹ sign change)** | 20 | Proved | MEDIUM - Property, not proof |
| **det(AB) = det(A)·det(B) multiplicativity** | 21-22 | **MAJOR** | **⭐⭐ (Theorem #4)** |
| det(Aᵗ) = det(A) | 22 | Proved | MEDIUM - Property |
| det(A) = 0 ⟺ A not invertible | 22 | Proved | MEDIUM - Follows from multiplicativity |
| Elementary row operations affect det | 21 | Proved | MEDIUM - Computational tool |
| det(triangular matrix) = product of diagonal | 21 | Proved | LOW - Computational, not proof |
| Formula: det(2×2), cofactor expansion | 20-21 | Proved | LOW - Computational |

---

## SUMMARY RANKING BY LECTURE

### Lectures to FOCUS on for Moed B:

| Lecture | Content | Focus |
|---------|---------|-------|
| 11-12 | **BASIS** | HIGH - Know Steinitz Lemma cold |
| **13-14** | **DIMENSION THEOREMS** | **VERY HIGH** - Theorems #1, #3 |
| **15-16** | **RANK-NULLITY + INVERTIBILITY** | **VERY HIGH** - Theorems #1, #2, #5 |
| **17-18** | **MATRIX SPACES** | **VERY HIGH** - Complete Theorem #2 |
| 20-22 | **DETERMINANTS** | MEDIUM - Focus on Theorem #4 |

### Lectures to SKIP or REVIEW LIGHTLY:

| Lecture | Content | Skip Reason |
|---------|---------|------------|
| 1-6 | Fields, systems, basic concepts | Tested in Moed A/Simulation |
| 7-8 | VS axioms, subspaces | Too elementary |
| 9-10 | Span, LI definitions | Foundation only, not proof-heavy |

---

## THE 6 THEOREMS BY LECTURE

| # | Theorem | Core Lectures | Probability |
|---|---------|--------------|-------------|
| 1 | **Rank-Nullity** | 15-16 | **95%** |
| 2 | **Invertibility Table** | 16-18 | **90%** |
| 3 | **Three Theorems** | 13-14 | **85%** |
| 4 | **det(AB) = det(A)det(B)** | 21-22 | **75%** |
| 5 | **Row Rank = Column Rank** | 16-17 | **70%** |
| 6 | **Steinitz Lemma** | 11-12 | **70%** |

---

## PROOF DEPENDENCIES (What Depends on What)

```
Basis (11-12)
    ↓
Dimension = basis size (13)
    ↓
Three Theorems: For n-dim space (13-14)
    ↓
Rank-Nullity Theorem (15-16) ✓ [#1]
    ↓
Invertibility ⟺ rank = n (16-18) ✓ [#2]

Separately:
Elementary matrices (16)
    ↓
det(EA) = det(E)·det(A) (17-18)
    ↓
det(AB) = det(A)·det(B) (21-22) ✓ [#4]

Matrix spaces:
NulA, ColA, RowA (16-17)
    ↓
Row Rank = Column Rank (16-17) ✓ [#5]
```

**Key Insight:** Theorems #1, #3, #2 form a chain. Master them first, then #4-6.

---

## EXAM STRATEGY BY LECTURE FAMILIARITY

**If you've read lectures 1-10:** You have foundations. Now focus on 11-18 for proofs.

**If you've read lectures 11-16:** You have core material. Theorems #1-3, #5-6 are within reach.

**If you've read lectures 17-23:** You have full course. All 6 theorems are testable.

**Critical**: Theorems #1, #2, #3 require understanding from multiple lectures (11-18). Start there.

---

**Prepared:** March 2, 2026
**For:** Linear Algebra 1 Moed B, Reichman University
**Based on:** Complete lecture analysis Lectures 1-16 (covering up to Rank-Nullity and early Determinants)
