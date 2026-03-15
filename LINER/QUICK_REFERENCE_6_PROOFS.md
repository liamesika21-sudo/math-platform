# Quick Reference: 6 Most Likely Theorem Proofs for Moed B
## One-Page Summary for Fast Review

---

## THEOREM #1: RANK-NULLITY THEOREM ⭐⭐⭐
**Statement:** `rank(A) + dim(Nul A) = n` (n = # columns)

**3-Minute Proof:**
1. Reduce A to canonical form C (rank k, n-k free variables)
2. Build basis for Nul(A): Set each free variable to 1 once, rest to 0
3. Get n-k linearly independent vectors (each has 1 in different spot)
4. These span Nul(A) → dim(Nul A) = n-k
5. Therefore: k + (n-k) = n ✓

**Key Insight:** Rank counts constrained variables, nullity counts free variables

**Typical Question:**
> "Prove: If m < n, then Ax = 0 has non-trivial solution"
>
> Answer: rank(A) ≤ m < n, so dim(Nul A) = n - rank(A) ≥ n - m > 0 ✓

---

## THEOREM #2: INVERTIBILITY EQUIVALENCE TABLE ⭐⭐⭐
**Statement:** For A ∈ M_n(F), these are ALL equivalent:

```
A invertible
   ↓
rank(A) = n
   ↓
det(A) ≠ 0
   ↓
Columns LI
   ↓
Columns form basis for F^n
   ↓
Ax = 0 only has trivial solution
   ↓
Nul(A) = {0}
   ↓
Col(A) = F^n
   ↓
Rows form basis for F^n
   ↓
... and back to A invertible
```

**Proof Strategy:**
Build circular chain of implications. Each arrow needs short justification:
- A invertible → rank(A) = n: By definition of invertible
- rank(A) = n → columns form basis: n leading entries in canonical form
- Columns form basis → Ax = 0 only trivial: Unique representation
- Ax = 0 only trivial → Nul(A) = {0}: Definition of null space
- Nul(A) = {0} → A invertible: Use any prior equivalent condition

**Exam Variation 1:**
> "Prove: A invertible ⟺ columns of A form basis for F^n"

**Exam Variation 2:**
> "Prove: A ∈ M_n(F) invertible ⟺ det(A) ≠ 0"

---

## THEOREM #3: THE THREE THEOREMS ⭐⭐⭐
**Statement:** If dim(V) = n and {v₁,...,vₙ} ⊆ V, then:

```
(1) {v₁,...,vₙ} is a basis
   ↕ (equivalent)
(2) {v₁,...,vₙ} is linearly independent
   ↕ (equivalent)
(3) {v₁,...,vₙ} spans V
```

**Proof:**
- (1)→(2): Definition of basis
- (2)→(3): **Proof by contradiction:** If not spanning, ∃v ∉ span{v₁,...,vₙ}. Then {v₁,...,vₙ,v} is LI (n+1 vectors). But dim(V)=n, so ≤n vectors can be LI. Contradiction. ✓
- (3)→(1): **Proof by contradiction:** If {v₁,...,vₙ} LD, then ∃vᵢ = cx₁v₁+...+cᵢ₋₁vᵢ₋₁+cᵢ₊₁vᵢ₊₁+...+cₙvₙ. Can remove vᵢ and still span (n-1 vectors span). But dim=n. Contradiction. ✓

**Key Corollaries Used:**
- dim(V)=n ⟹ any n+1 vectors are LD
- dim(V)=n ⟹ any n-1 vectors cannot span

**Bonus: BASIS COMPLETION**
If v₁,...,vₖ are LI with k < n, extend to basis v₁,...,vₖ,vₖ₊₁,...,vₙ using:
1. They're LI with k < n = dim(V)
2. They don't span V yet
3. Add any v ∉ span{v₁,...,vₖ}
4. New set still LI
5. Repeat until have n vectors
6. By Three Theorems, now a basis ✓

**Typical Questions:**
> "Prove: If dim(V)=n and {v₁,...,vₙ} LI, then it's a basis"
>
> "Prove: LI set can always be extended to basis"

---

## THEOREM #4: DETERMINANT IS MULTIPLICATIVE ⭐⭐
**Statement:** `det(AB) = det(A) · det(B)`

**2-Case Proof:**

**Case 1: B not invertible**
- rank(B) < n
- rank(AB) ≤ rank(B) < n
- So AB not invertible
- det(AB) = 0 = 0 · det(B) = det(A) · det(B) ✓

**Case 2: B invertible**
- B = E₁E₂···Eₖ (product of elementary matrices)
- Use Lemma: det(EA) = det(E)·det(A) for elementary E
- det(AB) = det(A·E₁E₂···Eₖ) = det(A)·det(E₁)·det(E₂)···det(Eₖ)
- = det(A)·det(E₁E₂···Eₖ) = det(A)·det(B) ✓

**Key Lemma (Must Know):**
For elementary matrix E: det(EA) = det(E)·det(A)
- Row multiplication by c: det(E) = c
- Row swap: det(E) = -1
- Row addition: det(E) = 1

**Typical Questions:**
> "Prove: det(AB) = det(A)·det(B)"
>
> "Prove: If AB = I, then det(A) ≠ 0"

---

## THEOREM #5: ROW RANK = COLUMN RANK = RANK ⭐
**Statement:** `dim(Col A) = dim(Row A) = rank(A)`

**2-Part Proof:**

**Part 1: Row Rank = Rank**
1. Reduce A to canonical form C via row operations
2. Non-zero rows of C form basis for Row(C)
3. # non-zero rows = # leading entries = rank(A)
4. Row operations preserve Row(A), so Row(A) = Row(C)
5. Therefore: dim(Row A) = rank(A) ✓

**Part 2: Column Rank = Rank**
1. Leading entry positions mark "pivot columns"
2. Pivot columns are LI and form basis for Col(A)
3. # pivot columns = # leading entries = rank(A)
4. Therefore: dim(Col A) = rank(A) ✓

**Conclusion:**
- dim(Col A) = rank(A) = dim(Row A) ✓

**Key Insight:** A is n×m, so Col(A) ⊆ F^n (m columns) and Row(A) ⊆ F^m (n rows). Even though these are different vector spaces, their dimensions equal rank.

**Typical Question:**
> "Prove: Column rank = row rank"

---

## THEOREM #6: STEINITZ EXCHANGE LEMMA + COROLLARY ⭐
**Statement (Lemma):** If {v₁,...,vₖ} is basis and {w₁,...,wₘ} spans V, then k ≤ m.

**Corollary:** Any two bases have same size.

**Lemma Proof (by contradiction):**

Assume k > m.

1. {w₁,...,wₘ} spans V, so v₁ ∈ span{w₁,...,wₘ}
2. Exchange v₁ with some wⱼ: Set S₁ = {v₁,w₁,...,ŵⱼ,...,wₘ} still spans
3. Repeat: v₂ ∈ span(S₁), exchange with another w. Get S₂ still spans.
4. After m exchanges: Sₘ = {v₁,v₂,...,vₘ} spans V (only m vectors!)
5. Now: v_{m+1} ∈ span{v₁,...,vₘ} (spanning set of size m)
6. But {v₁,...,vₖ} is basis, so v_{m+1} ∉ span{v₁,...,vₘ}
7. Contradiction! So k ≤ m. ✓

**Corollary Proof:**
If B₁ has k vectors and B₂ has m vectors (both bases), then:
- B₁ is basis, B₂ spans → k ≤ m
- B₂ is basis, B₁ spans → m ≤ k
- Therefore k = m ✓

**Why This Matters:** Justifies that dim(V) is well-defined (all bases have same size).

**Typical Question:**
> "Prove: All bases of V have same cardinality"

---

## STUDY CHECKLIST

Before Moed B, verify you can:

**Theorem #1 - Rank-Nullity:**
- [ ] Write proof from memory in 10 min
- [ ] Explain why nullity = # free variables
- [ ] Use it to prove m < n ⟹ Ax=0 has nontrivial solutions

**Theorem #2 - Invertibility:**
- [ ] List all 8+ equivalent conditions
- [ ] Prove at least 3 different implications
- [ ] Can build circular chain quickly

**Theorem #3 - Three Theorems:**
- [ ] Prove LI ⟹ spanning using contradiction
- [ ] Prove spanning ⟹ LI using contradiction
- [ ] Know basis completion algorithm

**Theorem #4 - det(AB):**
- [ ] Case 1 (B not invertible): under 2 minutes
- [ ] Case 2 (B invertible): use elementary matrix lemma
- [ ] Know det values for each elementary matrix type

**Theorem #5 - Row/Column Rank:**
- [ ] Explain why row rank = # non-zero rows in canonical form
- [ ] Explain why col rank = # pivot columns
- [ ] Know Row(A) = Col(A^t)

**Theorem #6 - Steinitz:**
- [ ] Exchange argument clearly
- [ ] Why contradiction when k > m
- [ ] Corollary about equal basis sizes

---

## FORMULAS TO MEMORIZE

```
rank(A) + dim(Nul A) = n                    [Rank-Nullity]
dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)   [Dimension Formula]
det(AB) = det(A) · det(B)                   [Multiplicativity]
rank(A) = dim(Col A) = dim(Row A)           [Rank Equivalence]
A invertible ⟺ det(A) ≠ 0                   [det Invertibility]
A invertible ⟺ rank(A) = n                  [Rank Invertibility]
dim(V) = n ⟹ basis has exactly n vectors    [Dimension Definition]
```

---

## RED FLAGS (Things Examiners Hate)

❌ Not stating conditions (e.g., "A ∈ M_n(F)" if proving for square matrices)
❌ Using theorem without naming it (say "by Rank-Nullity Theorem")
❌ Circular reasoning (proving X using X)
❌ Skipping "obvious" steps (every claim needs justification)
❌ Forgetting to handle all cases (especially in proof by cases)
❌ Wrong direction in ⟺ proofs (prove BOTH directions)
❌ Using results not yet proved in course

---

**Last Review Before Exam:** Read through Theorems #1-3 once. You should know them by heart. Theorems #4-6 you should know proof outline.

**Good luck! You've got this! 💪**
