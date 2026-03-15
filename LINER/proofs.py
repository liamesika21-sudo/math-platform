#!/usr/bin/env python3
"""Generate PDF with all matrix operation proofs for Linear Algebra 1."""

import subprocess, sys
for pkg in ["reportlab", "arabic-reshaper", "python-bidi"]:
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "-q", "--break-system-packages"])

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import os

# Register fonts
font_path = "/usr/share/fonts/truetype/dejavu/"
pdfmetrics.registerFont(TTFont("Heb", os.path.join(font_path, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("HebB", os.path.join(font_path, "DejaVuSans-Bold.ttf")))

W, H = A4  # 595.27 x 841.89

# Colors
TITLE_BG = HexColor("#1a5276")
SECTION_BG = HexColor("#2e86c1")
PROOF_BG = HexColor("#eaf2f8")
THEOREM_BG = HexColor("#f9e79f")
LINE_COLOR = HexColor("#2e86c1")
LIGHT_GRAY = HexColor("#f4f6f7")

def heb(text):
    """Reshape and reorder Hebrew text for RTL display."""
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

class ProofPDF:
    def __init__(self, filename):
        self.c = canvas.Canvas(filename, pagesize=A4)
        self.y = H - 40
        self.page_num = 0
        self.margin_left = 40
        self.margin_right = W - 40
        self.text_width = self.margin_right - self.margin_left

    def new_page(self):
        if self.page_num > 0:
            self._footer()
            self.c.showPage()
        self.page_num += 1
        self.y = H - 40

    def _footer(self):
        self.c.setFont("Heb", 8)
        self.c.setFillColor(HexColor("#888888"))
        self.c.drawCentredString(W/2, 20, f"{self.page_num}")
        self.c.setFillColor(HexColor("#000000"))

    def check_space(self, needed=60):
        if self.y < needed:
            self.new_page()

    def title_page(self, title, subtitle):
        self.new_page()
        # Background band
        self.c.setFillColor(TITLE_BG)
        self.c.roundRect(30, H - 120, W - 60, 90, 10, fill=1, stroke=0)
        self.c.setFillColor(HexColor("#FFFFFF"))
        self.c.setFont("HebB", 26)
        self.c.drawCentredString(W/2, H - 75, heb(title))
        self.c.setFont("Heb", 14)
        self.c.drawCentredString(W/2, H - 105, heb(subtitle))
        self.c.setFillColor(HexColor("#000000"))
        self.y = H - 150

    def section_header(self, text):
        self.check_space(80)
        self.y -= 15
        self.c.setFillColor(SECTION_BG)
        self.c.roundRect(self.margin_left, self.y - 8, self.text_width, 30, 8, fill=1, stroke=0)
        self.c.setFillColor(HexColor("#FFFFFF"))
        self.c.setFont("HebB", 15)
        self.c.drawCentredString(W/2, self.y, heb(text))
        self.c.setFillColor(HexColor("#000000"))
        self.y -= 30

    def theorem_box(self, label, text_lines):
        """Draw a theorem/proposition box with yellow background."""
        n_lines = len(text_lines)
        box_h = 22 + n_lines * 18
        self.check_space(box_h + 20)
        self.y -= 8
        # Yellow box
        self.c.setFillColor(THEOREM_BG)
        self.c.roundRect(self.margin_left + 5, self.y - box_h + 18, self.text_width - 10, box_h, 6, fill=1, stroke=0)
        # Label
        self.c.setFillColor(HexColor("#7d6608"))
        self.c.setFont("HebB", 11)
        self.c.drawRightString(self.margin_right - 15, self.y, heb(label))
        self.y -= 20
        # Content
        self.c.setFillColor(HexColor("#000000"))
        self.c.setFont("Heb", 10.5)
        for line in text_lines:
            self.c.drawRightString(self.margin_right - 15, self.y, heb(line))
            self.y -= 18
        self.y -= 5

    def proof_title(self, text="הוכחה:"):
        self.check_space(40)
        self.c.setFillColor(HexColor("#1a5276"))
        self.c.setFont("HebB", 11)
        self.c.drawRightString(self.margin_right - 10, self.y, heb(text))
        self.c.setFillColor(HexColor("#000000"))
        self.y -= 18

    def proof_line(self, text, indent=0, bold=False, size=10, color="#000000", centered=False):
        self.check_space(30)
        self.c.setFillColor(HexColor(color))
        font = "HebB" if bold else "Heb"
        self.c.setFont(font, size)
        if centered:
            self.c.drawCentredString(W/2, self.y, heb(text))
        else:
            self.c.drawRightString(self.margin_right - 10 - indent, self.y, heb(text))
        self.c.setFillColor(HexColor("#000000"))
        self.y -= 16

    def math_line(self, text, centered=True, size=10.5):
        """For mathematical formulas - no RTL reshaping needed for math."""
        self.check_space(30)
        self.c.setFont("Heb", size)
        if centered:
            self.c.drawCentredString(W/2, self.y, text)
        else:
            self.c.drawRightString(self.margin_right - 20, self.y, text)
        self.y -= 17

    def separator(self):
        self.y -= 5
        self.c.setStrokeColor(HexColor("#d5dbdb"))
        self.c.setLineWidth(0.5)
        self.c.line(self.margin_left + 50, self.y, self.margin_right - 50, self.y)
        self.y -= 8

    def qed(self):
        self.c.setFont("Heb", 10)
        self.c.drawString(self.margin_left + 15, self.y + 10, "\u25A0")
        self.y -= 5

    def spacer(self, h=8):
        self.y -= h

    def save(self):
        self._footer()
        self.c.save()


def build_pdf():
    out_path = "/sessions/upbeat-kind-mayer/mnt/LINER/הוכחות_מטריצות.pdf"
    p = ProofPDF(out_path)

    # ============ TITLE PAGE ============
    p.title_page("הוכחות — כללי מטריצות", "אלגברה לינארית 1 • הרצאות 16–18 (שבועות 7–9)")
    p.spacer(10)
    p.proof_line("מסמך זה מכיל את ההוכחות המלאות של תכונות פעולות המטריצות:", bold=True, size=11)
    p.spacer(5)
    p.proof_line("1. כפל מטריצה במטריצת יחידה ואפס", indent=20)
    p.proof_line("2. אסוציאטיביות כפל מטריצות: (AB)C = A(BC)", indent=20)
    p.proof_line("3. דיסטריביוטיביות משמאל: A(B+C) = AB + AC", indent=20)
    p.proof_line("4. דיסטריביוטיביות מימין: (A+B)C = AC + BC", indent=20)
    p.proof_line("5. אסוציאטיביות סקלר: (αA)B = A(αB) = α(AB)", indent=20)
    p.proof_line("6. תכונות שחלוף (Transpose)", indent=20)
    p.proof_line("7. תכונות עקבה (Trace)", indent=20)
    p.proof_line("8. תכונות הופכי (Inverse)", indent=20)

    # ============ PAGE: IDENTITY & ZERO ============
    p.new_page()
    p.section_header("כפל מטריצה במטריצת יחידה ובמטריצת אפס")

    # --- Theorem: Identity ---
    p.theorem_box("משפט (כפל ביחידה):", [
        "תהי A ∈ Mmxn(F). אזי:",
        "A · In = A      וגם      Im · A = A"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("נוכיח A · In = A. שתי המטריצות מגודל m×n.")
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ n. נחשב את הכניסה ה-(i,j):")
    p.spacer(2)
    p.math_line("[A · In]ij = Σ(k=1..n) [A]ik · [In]kj")
    p.spacer(2)
    p.proof_line("כיוון ש-[In]kj = 1 אם k=j ו-[In]kj = 0 אם k≠j,")
    p.proof_line("כל האיברים בסכום מתאפסים חוץ מ-k=j:")
    p.spacer(2)
    p.math_line("= [A]i1·0 + ... + [A]ij·1 + ... + [A]in·0 = [A]ij")
    p.spacer(2)
    p.proof_line("קיבלנו [A · In]ij = [A]ij לכל i,j, ולכן A · In = A.")
    p.proof_line("באופן דומה מוכיחים Im · A = A (הסכום על k=1..m, הכניסה שורדת כש-k=i).")
    p.qed()

    p.separator()

    # --- Theorem: Zero ---
    p.theorem_box("משפט (כפל באפס):", [
        "תהי A ∈ Mmxn(F). אזי לכל r,k ∈ ℕ:",
        "A · 0nxr = 0mxr      וגם      0kxm · A = 0kxn"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("נוכיח A · 0nxr = 0mxr. שתי המטריצות מגודל m×r.")
    p.proof_line("לכל 1 ≤ i ≤ m ו-1 ≤ j ≤ r:")
    p.spacer(2)
    p.math_line("[A · 0]ij = Σ(k=1..n) [A]ik · [0]kj = Σ(k=1..n) [A]ik · 0 = 0 = [0mxr]ij")
    p.spacer(2)
    p.proof_line("ולכן A · 0nxr = 0mxr. הוכחת 0kxm · A = 0kxn דומה.")
    p.qed()

    # ============ PAGE: ASSOCIATIVITY ============
    p.new_page()
    p.section_header("אסוציאטיביות כפל מטריצות: (AB)C = A(BC)")

    p.theorem_box("משפט:", [
        "יהי F שדה, ויהיו m,n,q,r ∈ ℕ.",
        "תהי A ∈ Mmxn(F), B ∈ Mnxq(F), C ∈ Mqxr(F).",
        "אזי:   (AB)·C = A·(BC)"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("ראשית, שני הצדדים מוגדרים היטב ושניהם מטריצות מגודל m×r.")
    p.proof_line("כדי להוכיח שוויון, מספיק להראות שלכל 1 ≤ i ≤ m ו-1 ≤ j ≤ r:")
    p.math_line("[(AB)C]ij = [A(BC)]ij")
    p.spacer(3)
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ r. נחשב את הצד השמאלי:")
    p.spacer(2)
    p.math_line("                        def")
    p.math_line("[(AB)·C]ij  =  Σ(l=1..q) [AB]il · [C]lj")
    p.spacer(2)
    p.proof_line("כעת [AB]il = Σ(k=1..n) [A]ik·[B]kl, ולכן:")
    p.spacer(2)
    p.math_line("= Σ(l=1..q) ( Σ(k=1..n) [A]ik·[B]kl ) · [C]lj")
    p.spacer(1)
    p.math_line("= Σ(l=1..q) Σ(k=1..n) [A]ik·[B]kl·[C]lj")
    p.spacer(3)
    p.proof_line("ניתן להחליף סדר סכימה (סכומים סופיים):")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) Σ(l=1..q) [A]ik·[B]kl·[C]lj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) [A]ik · ( Σ(l=1..q) [B]kl·[C]lj )")
    p.spacer(2)
    p.proof_line("והביטוי בסוגריים הוא בדיוק [BC]kj, ולכן:")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) [A]ik · [BC]kj  =  [A·(BC)]ij")
    p.spacer(3)
    p.proof_line("הראינו [(AB)C]ij = [A(BC)]ij לכל i,j, ולכן (AB)C = A(BC).")
    p.qed()

    # ============ PAGE: LEFT DISTRIBUTIVITY ============
    p.new_page()
    p.section_header("דיסטריביוטיביות משמאל: A(B+C) = AB + AC")

    p.theorem_box("משפט:", [
        "תהי A ∈ Mmxn(F), ויהיו B,C ∈ Mnxr(F).",
        "אזי:   A·(B+C) = A·B + A·C"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("ראשית, A(B+C) ו-AB+AC שתיהן מוגדרות היטב ומגודל m×r.")
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ r. נחשב:")
    p.spacer(2)
    p.math_line("                                  def")
    p.math_line("[A·(B+C)]ij  =  Σ(k=1..n) [A]ik · [B+C]kj")
    p.spacer(2)
    p.proof_line("לפי הגדרת חיבור מטריצות: [B+C]kj = [B]kj + [C]kj, ולכן:")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) [A]ik · ( [B]kj + [C]kj )")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) ( [A]ik·[B]kj + [A]ik·[C]kj )")
    p.spacer(3)
    p.proof_line("מדיסטריביוטיביות הסכימה (סכום סופי):")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) [A]ik·[B]kj  +  Σ(k=1..n) [A]ik·[C]kj")
    p.spacer(1)
    p.math_line("   def                        def")
    p.math_line("=  [AB]ij              +      [AC]ij")
    p.spacer(1)
    p.math_line("= [AB + AC]ij")
    p.spacer(3)
    p.proof_line("הראינו [A(B+C)]ij = [AB+AC]ij לכל i,j, ולכן A(B+C) = AB + AC.")
    p.qed()

    p.separator()

    # ============ RIGHT DISTRIBUTIVITY ============
    p.section_header("דיסטריביוטיביות מימין: (A+B)C = AC + BC")

    p.theorem_box("משפט:", [
        "יהיו A,B ∈ Mmxn(F) ותהי C ∈ Mnxr(F).",
        "אזי:   (A+B)·C = A·C + B·C"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("שני הצדדים מוגדרים היטב ומגודל m×r.")
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ r:")
    p.spacer(2)
    p.math_line("[(A+B)·C]ij = Σ(k=1..n) [A+B]ik · [C]kj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) ([A]ik + [B]ik) · [C]kj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) ([A]ik·[C]kj + [B]ik·[C]kj)")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) [A]ik·[C]kj + Σ(k=1..n) [B]ik·[C]kj")
    p.spacer(1)
    p.math_line("= [AC]ij + [BC]ij = [AC + BC]ij")
    p.spacer(3)
    p.proof_line("ולכן (A+B)C = AC + BC.")
    p.qed()

    # ============ PAGE: SCALAR ASSOCIATIVITY ============
    p.new_page()
    p.section_header("אסוציאטיביות כפל בסקלר: (αA)B = A(αB) = α(AB)")

    p.theorem_box("משפט:", [
        "יהי α ∈ F, תהי A ∈ Mmxn(F) ותהי B ∈ Mnxr(F).",
        "אזי:   (αA)·B = A·(αB) = α·(AB)"
    ])
    p.spacer(3)
    p.proof_title("הוכחה — (αA)B = α(AB):")
    p.proof_line("שני הצדדים מגודל m×r. יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ r:")
    p.spacer(2)
    p.math_line("[(αA)·B]ij = Σ(k=1..n) [αA]ik · [B]kj")
    p.spacer(1)
    p.proof_line("לפי הגדרת כפל בסקלר: [αA]ik = α·[A]ik, ולכן:")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) (α·[A]ik) · [B]kj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) α · ([A]ik·[B]kj)")
    p.spacer(1)
    p.proof_line("(אסוציאטיביות כפל בשדה F)")
    p.spacer(2)
    p.math_line("= α · Σ(k=1..n) [A]ik·[B]kj")
    p.spacer(1)
    p.proof_line("(הוצאת קבוע מסכום סופי)")
    p.spacer(2)
    p.math_line("= α · [AB]ij = [α(AB)]ij")
    p.spacer(3)
    p.proof_line("ולכן (αA)B = α(AB).")
    p.qed()

    p.separator()

    p.proof_title("הוכחה — A(αB) = α(AB):")
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ r:")
    p.spacer(2)
    p.math_line("[A·(αB)]ij = Σ(k=1..n) [A]ik · [αB]kj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) [A]ik · (α·[B]kj)")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) α · ([A]ik·[B]kj)")
    p.spacer(1)
    p.proof_line("(קומוטטיביות ואסוציאטיביות כפל בשדה F)")
    p.spacer(2)
    p.math_line("= α · Σ(k=1..n) [A]ik·[B]kj = α·[AB]ij = [α(AB)]ij")
    p.spacer(3)
    p.proof_line("ולכן A(αB) = α(AB).")
    p.proof_line("מסקנה: (αA)B = α(AB) = A(αB).")
    p.qed()

    # ============ PAGE: TRANSPOSE ============
    p.new_page()
    p.section_header("תכונות שחלוף (Transpose)")

    # --- (A+B)^t = A^t + B^t ---
    p.theorem_box("משפט 1:", ["יהיו A,B ∈ Mmxn(F). אזי: (A+B)^t = A^t + B^t"])
    p.spacer(3)
    p.proof_title()
    p.proof_line("שני הצדדים מגודל n×m. יהיו 1 ≤ i ≤ n ו-1 ≤ j ≤ m:")
    p.spacer(2)
    p.math_line("[(A+B)^t]ij = [A+B]ji = [A]ji + [B]ji = [A^t]ij + [B^t]ij = [A^t + B^t]ij")
    p.spacer(2)
    p.proof_line("ולכן (A+B)^t = A^t + B^t.")
    p.qed()

    p.separator()

    # --- (αA)^t = αA^t ---
    p.theorem_box("משפט 2:", ["יהי α ∈ F ותהי A ∈ Mmxn(F). אזי: (αA)^t = α·A^t"])
    p.spacer(3)
    p.proof_title()
    p.proof_line("שני הצדדים מגודל n×m. יהיו 1 ≤ i ≤ n ו-1 ≤ j ≤ m:")
    p.spacer(2)
    p.math_line("[(αA)^t]ij = [αA]ji = α·[A]ji = α·[A^t]ij = [αA^t]ij")
    p.spacer(2)
    p.proof_line("ולכן (αA)^t = αA^t.")
    p.qed()

    p.separator()

    # --- (A^t)^t = A ---
    p.theorem_box("משפט 3:", ["תהי A ∈ Mmxn(F). אזי: (A^t)^t = A"])
    p.spacer(3)
    p.proof_title()
    p.proof_line("A^t ∈ Mnxm(F), ולכן (A^t)^t ∈ Mmxn(F) — אותו גודל כמו A.")
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ n:")
    p.spacer(2)
    p.math_line("[(A^t)^t]ij = [A^t]ji = [A]ij")
    p.spacer(2)
    p.proof_line("ולכן (A^t)^t = A.")
    p.qed()

    p.separator()

    # --- (AB)^t = B^t A^t ---
    p.theorem_box("משפט 4:", [
        "תהי A ∈ Mmxn(F) ותהי B ∈ Mnxr(F).",
        "אזי: (AB)^t = B^t · A^t"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("AB ∈ Mmxr(F), ולכן (AB)^t ∈ Mrxm(F).")
    p.proof_line("B^t ∈ Mrxn(F), A^t ∈ Mnxm(F), ולכן B^t·A^t ∈ Mrxm(F) — אותו גודל.")
    p.proof_line("יהיו 1 ≤ i ≤ r ו-1 ≤ j ≤ m:")
    p.spacer(2)
    p.math_line("[(AB)^t]ij = [AB]ji = Σ(k=1..n) [A]jk · [B]ki")
    p.spacer(3)
    p.proof_line("מצד שני:")
    p.spacer(2)
    p.math_line("[B^t·A^t]ij = Σ(k=1..n) [B^t]ik · [A^t]kj")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) [B]ki · [A]jk")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) [A]jk · [B]ki")
    p.spacer(3)
    p.proof_line("(קומוטטיביות כפל בשדה)")
    p.proof_line("שני הביטויים שווים, ולכן (AB)^t = B^t · A^t.")
    p.qed()

    # ============ PAGE: TRACE ============
    p.new_page()
    p.section_header("תכונות עקבה (Trace)")

    p.proof_line("תזכורת: עבור A ∈ Mn(F), מוגדר Tr(A) = Σ(i=1..n) [A]ii", bold=True, size=10)
    p.spacer(5)

    # --- Tr(A+B) = Tr(A) + Tr(B) ---
    p.theorem_box("משפט 1:", ["יהיו A,B ∈ Mn(F). אזי: Tr(A+B) = Tr(A) + Tr(B)"])
    p.spacer(3)
    p.proof_title()
    p.math_line("Tr(A+B) = Σ(i=1..n) [A+B]ii = Σ(i=1..n) ([A]ii + [B]ii)")
    p.spacer(1)
    p.math_line("= Σ(i=1..n) [A]ii + Σ(i=1..n) [B]ii = Tr(A) + Tr(B)")
    p.qed()

    p.separator()

    # --- Tr(αA) = αTr(A) ---
    p.theorem_box("משפט 2:", ["יהי α ∈ F ותהי A ∈ Mn(F). אזי: Tr(αA) = α·Tr(A)"])
    p.spacer(3)
    p.proof_title()
    p.math_line("Tr(αA) = Σ(i=1..n) [αA]ii = Σ(i=1..n) α·[A]ii = α · Σ(i=1..n) [A]ii = α·Tr(A)")
    p.qed()

    p.separator()

    # --- Tr(A^t) = Tr(A) ---
    p.theorem_box("משפט 3:", ["תהי A ∈ Mn(F). אזי: Tr(A^t) = Tr(A)"])
    p.spacer(3)
    p.proof_title()
    p.math_line("Tr(A^t) = Σ(i=1..n) [A^t]ii = Σ(i=1..n) [A]ii = Tr(A)")
    p.spacer(2)
    p.proof_line("(כי [A^t]ii = [A]ii — האיברים על האלכסון לא משתנים בשחלוף)")
    p.qed()

    p.separator()

    # --- Tr(AB) = Tr(BA) ---
    p.theorem_box("משפט 4:", [
        "תהי A ∈ Mmxn(F) ותהי B ∈ Mnxm(F).",
        "אזי: Tr(AB) = Tr(BA)"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("AB ∈ Mm(F) ו-BA ∈ Mn(F) — שתיהן ריבועיות, אז העקבה מוגדרת.")
    p.spacer(2)
    p.math_line("Tr(AB) = Σ(i=1..m) [AB]ii = Σ(i=1..m) Σ(k=1..n) [A]ik·[B]ki")
    p.spacer(3)
    p.proof_line("נחליף סדר סכימה (סכומים סופיים):")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) Σ(i=1..m) [A]ik·[B]ki")
    p.spacer(1)
    p.math_line("= Σ(k=1..n) Σ(i=1..m) [B]ki·[A]ik")
    p.spacer(2)
    p.proof_line("(קומוטטיביות כפל בשדה)")
    p.spacer(2)
    p.math_line("= Σ(k=1..n) [BA]kk = Tr(BA)")
    p.spacer(2)
    p.proof_line("ולכן Tr(AB) = Tr(BA).")
    p.qed()

    # ============ PAGE: INVERSE ============
    p.new_page()
    p.section_header("תכונות ההופכי (Inverse)")

    # --- In^-1 = In ---
    p.theorem_box("משפט 1:", ["In הפיכה ו-In^(-1) = In"])
    p.spacer(3)
    p.proof_title()
    p.proof_line("צריך להראות שקיימת מטריצה B כך ש-In·B = B·In = In.")
    p.proof_line("ניקח B = In. אז In·In = In (כפל ביחידה). ולכן In^(-1) = In.")
    p.qed()

    p.separator()

    # --- (A^-1)^-1 = A ---
    p.theorem_box("משפט 2:", [
        "תהי A ∈ Mn(F) הפיכה. אזי A^(-1) הפיכה ו-(A^(-1))^(-1) = A"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("A הפיכה, כלומר A·A^(-1) = A^(-1)·A = In.")
    p.proof_line("צריך להראות ש-A^(-1) הפיכה וההופכי שלה הוא A.")
    p.proof_line("אכן, A^(-1)·A = In וגם A·A^(-1) = In,")
    p.proof_line("כלומר A היא ההופכי של A^(-1).")
    p.proof_line("לכן (A^(-1))^(-1) = A.")
    p.qed()

    p.separator()

    # --- (AB)^-1 = B^-1 A^-1 ---
    p.theorem_box("משפט 3:", [
        "יהיו A,B ∈ Mn(F) הפיכות. אזי AB הפיכה ו-(AB)^(-1) = B^(-1)·A^(-1)"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("צריך להראות ש-(B^(-1)A^(-1))·(AB) = In וש-(AB)·(B^(-1)A^(-1)) = In.")
    p.spacer(2)
    p.proof_line("נחשב:")
    p.math_line("(B^(-1)·A^(-1))·(AB) = B^(-1)·(A^(-1)·(AB))")
    p.proof_line("(אסוציאטיביות)")
    p.math_line("= B^(-1)·((A^(-1)·A)·B) = B^(-1)·(In·B) = B^(-1)·B = In")
    p.spacer(3)
    p.proof_line("באופן דומה:")
    p.math_line("(AB)·(B^(-1)·A^(-1)) = A·(B·(B^(-1)·A^(-1)))")
    p.math_line("= A·((B·B^(-1))·A^(-1)) = A·(In·A^(-1)) = A·A^(-1) = In")
    p.spacer(3)
    p.proof_line("לכן AB הפיכה ו-(AB)^(-1) = B^(-1)·A^(-1).")
    p.qed()

    p.separator()

    # --- (A^t)^-1 = (A^-1)^t ---
    p.theorem_box("משפט 4:", [
        "תהי A ∈ Mn(F) הפיכה. אזי A^t הפיכה ו-(A^t)^(-1) = (A^(-1))^t"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("צריך להראות ש-(A^(-1))^t · A^t = In וש-A^t · (A^(-1))^t = In.")
    p.spacer(2)
    p.proof_line("ידוע: A·A^(-1) = In. ניקח שחלוף:")
    p.math_line("(A·A^(-1))^t = In^t")
    p.math_line("(A^(-1))^t · A^t = In")
    p.spacer(2)
    p.proof_line("(שימוש ב-(XY)^t = Y^t·X^t וב-In^t = In)")
    p.spacer(2)
    p.proof_line("באופן דומה, מ-A^(-1)·A = In נקבל:")
    p.math_line("A^t · (A^(-1))^t = In")
    p.spacer(2)
    p.proof_line("ולכן A^t הפיכה ו-(A^t)^(-1) = (A^(-1))^t.")
    p.qed()

    # ============ PAGE: GENERALIZATION + ADDITIONAL ============
    p.new_page()
    p.section_header("הכללה: מכפלת k מטריצות הפיכות")

    p.theorem_box("משפט:", [
        "יהיו A1,...,Ak ∈ Mn(F) מטריצות הפיכות.",
        "אזי A1·A2·...·Ak הפיכה ו:",
        "(A1·A2·...·Ak)^(-1) = Ak^(-1)·...·A2^(-1)·A1^(-1)"
    ])
    p.spacer(3)
    p.proof_title("הוכחה (באינדוקציה על k):")
    p.proof_line("בסיס (k=1): (A1)^(-1) = A1^(-1). נכון באופן טריוויאלי.", indent=0)
    p.spacer(3)
    p.proof_line("בסיס (k=2): הוכחנו כבר: (AB)^(-1) = B^(-1)·A^(-1).", indent=0)
    p.spacer(3)
    p.proof_line("צעד (k→k+1): נניח שהטענה נכונה ל-k מטריצות.", indent=0)
    p.proof_line("תהיינה A1,...,Ak,Ak+1 הפיכות.", indent=10)
    p.proof_line("נסמן M = A1·...·Ak. לפי הנחת האינדוקציה, M הפיכה ו:", indent=10)
    p.math_line("M^(-1) = Ak^(-1)·...·A1^(-1)")
    p.spacer(2)
    p.proof_line("כעת:", indent=10)
    p.math_line("A1·...·Ak·Ak+1 = M · Ak+1")
    p.spacer(2)
    p.proof_line("M ו-Ak+1 הפיכות, לכן לפי המקרה k=2:")
    p.math_line("(M·Ak+1)^(-1) = Ak+1^(-1) · M^(-1)")
    p.math_line("= Ak+1^(-1) · Ak^(-1) · ... · A1^(-1)")
    p.spacer(2)
    p.proof_line("וזה בדיוק מה שרצינו להוכיח.")
    p.qed()

    p.separator()

    # --- Additional: α·(A+B) = αA + αB ---
    p.section_header("תכונות נוספות של כפל בסקלר")

    p.theorem_box("משפט 1:", [
        "יהי α ∈ F ויהיו A,B ∈ Mmxn(F). אזי: α(A+B) = αA + αB"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ n:")
    p.math_line("[α(A+B)]ij = α·[A+B]ij = α·([A]ij + [B]ij)")
    p.math_line("= α·[A]ij + α·[B]ij = [αA]ij + [αB]ij = [αA + αB]ij")
    p.proof_line("(דיסטריביוטיביות בשדה F)")
    p.proof_line("ולכן α(A+B) = αA + αB.")
    p.qed()

    p.separator()

    p.theorem_box("משפט 2:", [
        "יהיו α,β ∈ F ותהי A ∈ Mmxn(F). אזי: (α+β)A = αA + βA"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ n:")
    p.math_line("[(α+β)A]ij = (α+β)·[A]ij = α·[A]ij + β·[A]ij = [αA]ij + [βA]ij = [αA + βA]ij")
    p.proof_line("(דיסטריביוטיביות בשדה F)")
    p.proof_line("ולכן (α+β)A = αA + βA.")
    p.qed()

    p.separator()

    p.theorem_box("משפט 3:", [
        "יהיו α,β ∈ F ותהי A ∈ Mmxn(F). אזי: (αβ)A = α(βA)"
    ])
    p.spacer(3)
    p.proof_title()
    p.proof_line("יהיו 1 ≤ i ≤ m ו-1 ≤ j ≤ n:")
    p.math_line("[(αβ)A]ij = (αβ)·[A]ij = α·(β·[A]ij) = α·[βA]ij = [α(βA)]ij")
    p.proof_line("(אסוציאטיביות כפל בשדה F)")
    p.proof_line("ולכן (αβ)A = α(βA).")
    p.qed()

    # Save
    p.save()
    print(f"PDF saved to: {out_path}")
    print(f"Total pages: {p.page_num}")


if __name__ == "__main__":
    build_pdf()
