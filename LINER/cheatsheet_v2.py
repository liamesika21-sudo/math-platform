#!/usr/bin/env python3
"""
Linear Algebra 1 Cheatsheet v2 — pixel-perfect match to example PDF design.
Dense, colored bands, multiple topics per page, tables, two-column golden rules.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black, Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import os

# ── Fonts ──
for path, name in [
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "HF"),
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "HFB"),
]:
    if os.path.exists(path):
        pdfmetrics.registerFont(TTFont(name, path))
F = "HF"
FB = "HFB"

# ── Colors matching example exactly ──
GREEN = HexColor("#0d7a3e")       # section headers
ORANGE = HexColor("#d4760a")      # הגדרה badges
BLUE = HexColor("#2471a3")        # משפט badges
PURPLE = HexColor("#7d3c98")      # הערה/טיפ badges
RED = HexColor("#c0392b")         # important text
TEAL = HexColor("#008080")        # טכניקה badges
GRAY = HexColor("#666666")
BLK = HexColor("#1a1a1a")

# Background bands (from example)
CYAN_BG = HexColor("#e0f4f4")     # light cyan
GREEN_BG = HexColor("#e6f5e6")    # light green
PINK_BG = HexColor("#fce4ec")     # light pink
YELLOW_BG = HexColor("#fff9c4")   # light yellow
BLUE_BG = HexColor("#e3f2fd")     # light blue
ORANGE_BG = HexColor("#fff3e0")   # light orange
PURPLE_BG = HexColor("#f3e5f5")   # light purple
TABLE_HEAD = HexColor("#f5f5f5")

W, H = A4
LM = 10*mm
RM = W - 10*mm
CW = RM - LM
MID = W / 2

def heb(t):
    return get_display(arabic_reshaper.reshape(t))

class CS:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.y = H
        self.pg = 0

    def new_page(self):
        if self.pg > 0: self.c.showPage()
        self.pg += 1
        self.y = H - 8*mm

    # ── Drawing primitives ──

    def bg_band(self, height, color):
        """Full-width colored background band."""
        self.c.saveState()
        self.c.setFillColor(color)
        self.c.rect(LM - 2*mm, self.y - height + 2*mm, CW + 4*mm, height, fill=1, stroke=0)
        self.c.restoreState()

    def section_bar(self, text):
        """Green header bar like ◆ דטרמיננטות — סיכום מפורט"""
        h = 7.5*mm
        self.c.setFillColor(GREEN)
        self.c.roundRect(LM, self.y - h + 1.5*mm, CW, h, 3, fill=1, stroke=0)
        self.c.setFillColor(white)
        self.c.setFont(FB, 12)
        t = heb(text)
        tw = self.c.stringWidth(t, FB, 12)
        self.c.drawString(W/2 - tw/2, self.y - h + 1.5*mm + 2*mm, t)
        self.c.setFillColor(BLK)
        self.y -= h + 2.5*mm

    def badge(self, text, color=ORANGE):
        """Draw badge at current right position, return left edge x."""
        self.c.setFont(FB, 7.5)
        t = heb(text)
        tw = self.c.stringWidth(t, FB, 7.5)
        p = 1.5*mm
        bx = RM - tw - 2*p
        self.c.setFillColor(color)
        self.c.roundRect(bx, self.y - 0.5*mm, tw + 2*p, 4*mm, 1.5, fill=1, stroke=0)
        self.c.setFillColor(white)
        self.c.drawString(bx + p, self.y + 0.2*mm, t)
        self.c.setFillColor(BLK)
        return bx - 2*mm

    def title_line(self, badge_text, title_text, badge_color=ORANGE):
        """Badge + bold title on one line."""
        bx = self.badge(badge_text, badge_color)
        self.c.setFont(FB, 9)
        self.c.setFillColor(BLK)
        t = heb(title_text)
        tw = self.c.stringWidth(t, FB, 9)
        self.c.drawString(bx - tw, self.y + 0.2*mm, t)
        self.y -= 4.5*mm

    def r(self, text, size=8, color=BLK, bold=False, indent=0):
        """RTL line."""
        f = FB if bold else F
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        t = heb(text)
        tw = self.c.stringWidth(t, f, size)
        self.c.drawString(RM - indent - tw, self.y, t)
        self.c.setFillColor(BLK)
        self.y -= 3.5*mm

    def rb(self, text, size=8, color=BLK, indent=0):
        """Bold RTL line."""
        self.r(text, size, color, bold=True, indent=indent)

    def rc(self, text, size=8, color=BLK, bold=False):
        """Center RTL line."""
        f = FB if bold else F
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        t = heb(text)
        tw = self.c.stringWidth(t, f, size)
        self.c.drawString(W/2 - tw/2, self.y, t)
        self.c.setFillColor(BLK)
        self.y -= 3.5*mm

    def bullet(self, text, size=7.5, color=BLK, indent=3*mm):
        self.r("• " + text, size, color, indent=indent)

    def gap(self, g=1.5*mm):
        self.y -= g

    def hline(self):
        self.c.setStrokeColor(HexColor("#dddddd"))
        self.c.setLineWidth(0.4)
        self.c.line(LM, self.y, RM, self.y)
        self.y -= 1.5*mm

    def table_header(self, cols, xs):
        """Table header row with gray bg."""
        self.c.setFillColor(TABLE_HEAD)
        self.c.rect(LM, self.y - 1*mm, CW, 4.5*mm, fill=1, stroke=0)
        self.c.setFillColor(BLK)
        for col, x in zip(cols, xs):
            self.c.setFont(FB, 7.5)
            t = heb(col)
            tw = self.c.stringWidth(t, FB, 7.5)
            self.c.drawString(x - tw, self.y, t)
        self.y -= 4.5*mm

    def table_row(self, cols, xs, size=7.5):
        for col, x in zip(cols, xs):
            self.c.setFont(F, size)
            t = heb(col) if any('\u0590' <= ch <= '\u05FF' for ch in col) else col
            tw = self.c.stringWidth(t, F, size)
            self.c.drawString(x - tw, self.y, t)
        self.y -= 3.5*mm

    def two_col(self, left_title, left_text, right_title, right_text):
        """Two column layout for golden rules style."""
        mid = W/2
        # Right column
        self.c.setFont(FB, 8)
        self.c.setFillColor(RED)
        t = heb(right_title)
        tw = self.c.stringWidth(t, FB, 8)
        self.c.drawString(RM - tw, self.y, t)

        t2 = heb(left_title)
        tw2 = self.c.stringWidth(t2, FB, 8)
        self.c.drawString(mid - 5*mm - tw2, self.y, t2)
        self.y -= 3.5*mm

        self.c.setFont(F, 7.5)
        self.c.setFillColor(BLK)
        t = heb(right_text)
        tw = self.c.stringWidth(t, F, 7.5)
        self.c.drawString(RM - tw, self.y, t)

        t2 = heb(left_text)
        tw2 = self.c.stringWidth(t2, F, 7.5)
        self.c.drawString(mid - 5*mm - tw2, self.y, t2)
        self.y -= 4.5*mm

    def save(self):
        self.c.save()


# ═══════════════════════════════════════════════════════════════
s = CS("/sessions/upbeat-kind-mayer/mnt/LINER/cheatsheet_לינארית1_v2.pdf")

# ═══════════════════════════════════════════════
# PAGE 1
# ═══════════════════════════════════════════════
s.new_page()

# Title
s.c.setFont(FB, 18)
s.c.setFillColor(GREEN)
t = heb("סיכום אלגברה לינארית 1")
tw = s.c.stringWidth(t, FB, 18)
s.c.drawString(W/2 - tw/2, s.y, t)
s.y -= 5*mm
s.c.setFont(F, 8)
s.c.setFillColor(GRAY)
t2 = heb("הרצאות 1-26 • תרגולים • שיעורי בית • מותאם למבחני 2024")
tw2 = s.c.stringWidth(t2, F, 8)
s.c.drawString(W/2 - tw2/2, s.y, t2)
s.y -= 6*mm

# ══════ SECTION: שדות ══════
s.bg_band(95*mm, CYAN_BG)
s.section_bar("◆ שדות (Fields)")

s.title_line("הגדרה", "שדה (Field)")
s.r("F עם +,· : קומוטטיבי, אסוציאטיבי, אדישות (0,1), נגדי, הופכי (a≠0), דיסטריבוטיביות.")
s.r("דוגמאות: ℝ, ℚ, ℂ, ℤp (p ראשוני).  לא שדה: ℤ, ℤ₆.")

s.gap()
s.title_line("משפט", "תכונות שדה", BLUE)
s.bullet("יחידות: 0F+x=x, 1F·x=x.  אם 0F=1F אז F={0}.  צמצום: x+z=y+z ⇒ x=y.")
s.bullet("נגדי: x+y=0F ⇒ y=-x.  x·0F=0F.  אין מחלקי אפס: x·y=0F ⇒ x=0F או y=0F.")

s.gap()
s.title_line("משפט", "תכונות הנגדי + הופכי + חזקה", BLUE)
s.r("-0F=0F.  -(-x)=x.  -x=(-1F)·x.  (-x)·y=x·(-y)=-(x·y).  (-x)(-y)=x·y.")
s.r("(1F)⁻¹=1F.  (x⁻¹)⁻¹=x.  (x·y)⁻¹=y⁻¹·x⁻¹.")
s.r("x^(n+m)=x^n·x^m.  (x^n)^m=x^(n·m).  (x·y)^n=x^n·y^n.  x^(-n)=(x^n)⁻¹.")

s.gap()
s.title_line("הגדרה", "ℤn, השוואה מודולרית, תת-שדה")
s.r("a≡b mod n ⟺ n|(a-b).  ℤn={0,...,n-1}.  (ℤn,⊕,⊙) שדה ⟺ n ראשוני.")
s.r("(a+b) mod n = [(a mod n)+(b mod n)] mod n.  בדומה לכפל.")
s.r("תת-שדה F₁⊆F: סגור +,·, נגדי, הופכי, מכיל 0F,1F.")

s.gap()
s.title_line("משפט", "פרמא הקטן + בזו", BLUE)
s.r("פרמא: p ראשוני, 1≤x≤p-1 ⇒ x^(p-1)≡1 mod p.  בזו: gcd(a,b)=1 ⇒ ∃x,y∈ℤ: ax+by=1.")

# ══════ SECTION: מרחב וקטורי + תת-מרחב ══════
s.gap(3*mm)
s.bg_band(78*mm, GREEN_BG)
s.section_bar("◆ מרחב וקטורי + תת-מרחב")

s.title_line("הגדרה", "מרחב וקטורי + תת-מרחב")
s.r("V מעל F עם 8 אקסיומות: קומ' חיבור, אסוצ' חיבור, 0v, נגדי, אסוצ' כפל, 1F, דיסט' סקלר, דיסט' וקטור.")
s.r("דוגמאות: Fⁿ, Mmxn(F), Fn[x] (dim=n+1), F[x] (dim=∞).")

s.gap()
s.title_line("משפט", "תכונות מ\"ו בסיסיות", BLUE)
s.r("0v יחיד.  u+v=0v ⇒ u=-v.  -(0v)=0v.  -v=(-1F)·v.  0F·v=0v.  α·0v=0v.")
s.rb("α·v=0v ⇒ α=0F או v=0v.", color=RED)

s.gap()
s.title_line("הגדרה", "תת-מרחב (ת\"מ)")
s.r("W⊆V ת\"מ: (1) 0v∈W  (2) סגור חיבור  (3) סגור כפל בסקלר.")
s.rb("קריטריון מאוחד: W ת\"מ ⟺ α₁w₁+α₂w₂∈W + 0v∈W.", color=RED)

s.gap()
s.title_line("משפט", "חיתוך ואיחוד", BLUE)
s.r("W₁∩W₂ תמיד ת\"מ.  W₁∪W₂ לא בהכרח ת\"מ!  איחוד של ת\"מ לא בהכרח ת\"מ.")

# ══════ SECTION: Span + בת"ל ══════
s.gap(3*mm)
s.bg_band(68*mm, ORANGE_BG)
s.section_bar("◆ Span + בת\"ל + ת\"ל")

s.title_line("הגדרה", "Span")
s.r("span{v₁,...,vk} = כל הצירופים הלינאריים.  תמיד ת\"מ.")
s.bullet("ת\"מ הכי קטן שמכיל את v₁,...,vk.  מונוטוניות: A⊆B ⇒ span(A)⊆span(B).")
s.bullet("v∈span{v₁,...,vk} ⟺ span{v₁,...,vk,v}=span{v₁,...,vk}.")

s.gap()
s.title_line("הגדרה", "בת\"ל + ת\"ל")
s.rb("בת\"ל: Σαᵢvᵢ=0 ⇒ αᵢ=0 לכל i.  ת\"ל: ∃j: vⱼ∈span{v₁,...,vⱼ₋₁}.", color=RED)
s.r("0v תמיד ת\"ל.  v≠0v ⇒ {v} בת\"ל.  v₁,v₂ בת\"ל ⟺ אין α: v₂=α·v₁.")

s.gap()
s.title_line("משפט", "בת\"ל ⟺ ייצוג יחיד", BLUE)
s.r("v₁,...,vk בת\"ל ⟺ לכל v∈Span יש ייצוג יחיד כצ\"ל.  הנח 2 ייצוגים, חסר ⇒ צ\"ל=0 ⇒ מקדמים שווים.")

s.gap()
s.title_line("הגדרה", "נוצר סופית")
s.r("Fn[x] נוצר סופית (dim=n+1).  F[x] לא נוצר סופית (dim=∞).")


# ═══════════════════════════════════════════════
# PAGE 2
# ═══════════════════════════════════════════════
s.new_page()

# ══════ SECTION: בסיס + ממד ══════
s.bg_band(75*mm, BLUE_BG)
s.section_bar("◆ בסיס + ממד")

s.title_line("הגדרה", "בסיס + ממד (dim)")
s.rb("בסיס: בת\"ל + פורשים.  dim(V) = מס' איברים בבסיס.  dim({0v})=0.", color=RED)

s.gap()
s.title_line("משפט", "תנאים שקולים לבסיס", BLUE)
s.r("בסיס  ⟺  בת\"ל מקסימלי  ⟺  פורשים מינימלית.")

s.gap()
s.title_line("משפט", "שטייניץ (Steinitz)", BLUE)
s.rb("v₁,...,vk בת\"ל, w₁,...,wm פורשים ⇒ k≤m.", color=RED)
s.bullet("dim(V)=n ⇒ n+1 ת\"ל.  n-1 לא פורשים.  n בת\"ל=בסיס=n פורשים.")
s.bullet("W ת\"מ ⇒ dim(W)≤dim(V).  dim(W)=dim(V) ⇒ W=V.")

s.gap()
s.title_line("משפט", "השלמה לבסיס", BLUE)
s.r("v₁,...,vk בת\"ל ב-V (dim=n) ⇒ ניתן להשלים לבסיס v₁,...,vk,...,vn.")

s.gap()
s.title_line("הגדרה", "בסיסים סטנדרטיים")
s.r("Fⁿ: e₁,...,en (dim=n).  Mmxn(F): Eij (dim=m·n).  Fn[x]: 1,x,...,xⁿ (dim=n+1).")

# ══════ SECTION: סכום ישר + נוסחת ממדים ══════
s.gap(3*mm)
s.bg_band(58*mm, PURPLE_BG)
s.section_bar("◆ סכום, סכום ישר, נוסחת ממדים")

s.title_line("הגדרה", "U+W, סכום ישר")
s.r("U+W = {u+w | u∈U, w∈W} (תת-מרחב!).  סיכומון: V⊇U+W⊇U∪W⊇U∩W⊇{0v}.")
s.rb("V=U⊕W  ⟺  V=U+W, U∩W={0}.", color=RED)

s.gap()
s.title_line("משפט", "נוסחת ממדים", BLUE)
s.rb("dim(U+W) = dim(U) + dim(W) - dim(U∩W)", size=8.5, color=RED)
s.r("מסקנה: V=U⊕W ⟺ dim(V)=dim(U)+dim(W) (כאשר U∩W={0}).")

s.gap()
s.title_line("משפט", "תנאים שקולים לסכום ישר", BLUE)
s.r("(1) V=U⊕W  (2) V=U+W, U∩W={0}  (3) ∀v ייצוג יחיד v=u+w  (4) dim(V)=dim(U)+dim(W)+V=U+W.")

s.gap()
s.title_line("משפט", "dimℂ(V)=n ⇒ dimℝ(V)=2n", BLUE)
s.r("בסיס: (v₁,iv₁,...,vn,ivn).  פורש: zv=av+b(iv).  בת\"ל: a+bi=0 ⇒ a=b=0.")

# ══════ SECTION: מטריצות ══════
s.gap(3*mm)
s.bg_band(88*mm, GREEN_BG)
s.section_bar("◆ מטריצות — כפל, שחלוף, סוגים, עקבה")

s.title_line("הגדרה", "כפל מטריצות")
s.r("(AB)ij = Σk aik·bkj.  A∈Mmxn(F), B∈Mnxp(F).  לא קומוטטיבי!  אסוציאטיבי: (AB)C=A(BC).  דיסטריבוטיבי: A(B+C)=AB+AC.")

s.gap()
s.title_line("הגדרה", "שחלוף (Transpose)")
s.r("(Aᵗ)ij=Aji.  (A+B)ᵗ=Aᵗ+Bᵗ.  (αA)ᵗ=αAᵗ.  (Aᵗ)ᵗ=A.  (AB)ᵗ=Bᵗ·Aᵗ (הפוך!)")

s.gap()
# Table
s.title_line("הגדרה", "סוגי מטריצות מיוחדים")
xs = [RM, RM - 55*mm, RM - 110*mm]
s.table_header(["סוג", "תנאי", "הערה"], xs)
s.table_row(["סימטרית", "Aᵗ=A", "aij=aji"], xs)
s.table_row(["אנטי-סימטרית", "Aᵗ=-A", "aii=0"], xs)
s.table_row(["אידמפוטנטית", "A²=A", "I, [[1,0],[0,0]]"], xs)
s.table_row(["נילפוטנטית", "Aᵏ=0", "det=0, Tr=0"], xs)

s.gap()
s.title_line("הגדרה", "עקבה (Trace)")
s.rb("Tr(A) = Σᵢ aᵢᵢ.  Tr(A+B)=Tr(A)+Tr(B).  Tr(AB)=Tr(BA) תמיד!  Tr(Aᵗ)=Tr(A).", color=RED)
s.r("לינארית: trace(αA+βB)=α·trace(A)+β·trace(B).  A∈Mn(ℝ): trace(AAᵗ)=0 ⇒ A=0.")

s.gap()
s.title_line("משפט", "סימטריות ואנטי-סימטריות", BLUE)
s.r("S={A|A=Aᵗ}.  AS={A|A=-Aᵗ}.  Mn(F)=S⊕AS (1F+1F≠0F).  dim(S)=(n²+n)/2.  dim(AS)=(n²-n)/2.")


# ═══════════════════════════════════════════════
# PAGE 3
# ═══════════════════════════════════════════════
s.new_page()

# ══════ SECTION: הפיכות ══════
s.bg_band(82*mm, CYAN_BG)
s.section_bar("◆ הפיכות — תכונות, תנאים שקולים")

s.title_line("הגדרה", "מטריצה הפיכה")
s.r("A∈Mn(F) הפיכה: ∃B: AB=In.  ההופכית A⁻¹=B.")
s.bullet("In⁻¹=In.  (A⁻¹)⁻¹=A.  (AB)⁻¹=B⁻¹A⁻¹ (הפוך!).  (A₁...Ak)⁻¹=Ak⁻¹...A₁⁻¹.")
s.bullet("(Aᵏ)⁻¹=(A⁻¹)ᵏ.  A הפיכה ⟺ Aᵗ הפיכה: (Aᵗ)⁻¹=(A⁻¹)ᵗ.")

s.gap()
s.title_line("משפט", "הפיכות — 12 תנאים שקולים", RED)
s.rb("עבור A∈Mn(F), כולם שקולים:", color=RED)
s.bullet("A הפיכה (קיימת A⁻¹)")
s.bullet("לכל b∈Fⁿ קיים פתרון יחיד ל-Ax=b")
s.bullet("∃b∈Fⁿ כך שלמערכת Ax=b קיים פתרון יחיד")
s.bullet("Ax=0 ⇒ x=0 (Null={0})")
s.bullet("A שקולת-שורות ל-In.  A = מכפלת מטריצות אלמנטריות.")
s.bullet("עמודות A בת\"ל / פורשות / בסיס ל-Fⁿ.  שורות A בת\"ל / פורשות / בסיס ל-Fⁿ.")
s.bullet("Aᵗ הפיכה.  ∃B: AB=I₃ (מספיק צד 1!).  det(A)≠0.  rank(A)=n.")

s.gap()
s.title_line("טכניקה", "הופכית 2×2 + חישוב הופכית", TEAL)
s.rb("A=(a,b;c,d).  הפיכה ⟺ ad-bc≠0.  A⁻¹ = 1/(ad-bc)·(d,-b;-c,a).")
s.r("חישוב: (A|In) → דירוג → (C|B).  אם C=In ⇒ A⁻¹=B.")

# ══════ SECTION: אלמנטריות + Rank + מערכות ══════
s.gap(3*mm)
s.bg_band(68*mm, ORANGE_BG)
s.section_bar("◆ אלמנטריות, מערכות, Rank, Null")

s.title_line("הגדרה", "מטריצות אלמנטריות")
s.bullet("כפל שורה ב-c≠0.  החלפת שורות.  הוספת αRj ל-Ri.")
s.r("E אלמנטרית ⇒ הפיכה, E⁻¹ אלמנטרית.  A הפיכה ⟺ A=E₁·...·Ek.")

s.gap()
s.title_line("משפט", "שקולות שורה", BLUE)
s.r("Row(A)=Row(B) ⟺ A,B שקולות שורה.  פעולות שורה לא משנות מרחב שורות אלא משנות עמודות.")

s.gap()
s.title_line("הגדרה", "מערכת Ax=b + מרחב האפס Null(A)")
s.r("דרג [A|b].  שורת סתירה ⇒ אין פתרון.  rank=n ⇒ יחיד.  אחרת ⇒ ∞.")
s.rb("פתרון כללי: x = x₀ + Null(A).  Null = {x∈Fⁿ | Ax=0} ת\"מ של Fⁿ.", color=RED)
s.r("G={x|Ax=b}. G≠∅, x₀∈G ⇒ G={h+x₀ | h∈Null(A)} (הזזה של מרחב האפס).")

s.gap()
s.title_line("הגדרה", "דרגה (Rank)", ORANGE)
s.rb("rank(A) = מס' פיבוטים = dim(Col(A)) = dim(Row(A)).", color=RED)
s.r("col rank = row rank = rank.  rank(A)=rank(Aᵗ).  rank(AB)≤min(rank A, rank B).")
s.rb("Rank-Nullity: rank(A)+nullity(A)=n.  nullity = מס' חופשיים.  P הפיכה ⇒ rank(PA)=rank(A).", color=RED)

# ══════ SECTION: טריקים + כללי זהב ══════
s.gap(3*mm)
s.bg_band(30*mm, BLUE_BG)
s.section_bar("◆ טריקים אלגבריים")

# Tricks table
xs2 = [RM, RM - 60*mm, RM - 120*mm]
s.table_header(["נתון", "טריק", "תוצאה"], xs2)
s.table_row(["AB = A+B", "I = (B-I)(A-I)", "A-I הפיכה"], xs2)
s.table_row(["A = I-AB", "A(I+B) = I", "A⁻¹=I+B"], xs2)
s.table_row(["B³=0, A=I-AB", "פיתוח", "A=I-B+B²"], xs2)

s.gap()
s.title_line("משפט", "Null(AᵗA) = Null(A)", BLUE)
s.r("⊆: Ax=0 ⇒ AᵗAx=0.  ⊇: AᵗAx=0 ⇒ ||Ax||²=(Ax)ᵗAx=0 ⇒ Ax=0.")

s.gap()
s.title_line("טכניקה", "rank=1 ⟺ A=uvᵗ", TEAL)
s.r("מכפלה חיצונית. A²=(vᵗu)A.  צמצום לא מתקיים: AB=CA לא גורר B=C!  A הפיכה ⇒ AB=AC ⇒ B=C.")

s.gap()
s.title_line("הערה", "ממדים חשובים", PURPLE)
s.r("dim(Mn(F))=n².  dim(Mmxn(F))=m·n.  dim(S)=(n²+n)/2.  dim(AS)=(n²-n)/2.  כפל: A·In=A, Im·A=A.")


# ═══════════════════════════════════════════════
# PAGE 4 (bottom): כללי זהב
# ═══════════════════════════════════════════════
s.new_page()

s.bg_band(115*mm, YELLOW_BG)
s.section_bar("★ כללי זהב לבחינה")

s.two_col(
    "2. הוכחת בת\"ל", "\"נניח Σαᵢvᵢ=0\" ⇒ αᵢ=0 לכל i.",
    "1. הגדרות מדויקות!", "\"ללא הסבר = 0 נק'\". ציין שם משפט + תנאים."
)
s.two_col(
    "4. הפרכה", "דוגמת נגד אחת. נסה 2×2 / ℝ².",
    "3. הוכחת תת-מרחב", "0v∈W, סגור חיבור, סגור כפל."
)
s.two_col(
    "6. הפיכות", "AB=I ⇒ A הפיכה. det≠0 ⟺ הפיכה.",
    "5. מערכת עם פרמטר", "דרג, חלק למקרים. לא לחלק ב-0!"
)
s.two_col(
    "8. נוסחת ממדים", "dim(U+W)=dim(U)+dim(W)-dim(U∩W).",
    "7. det", "det(AB)=det(A)det(B). משולשית=מכפלת אלכסון."
)
s.two_col(
    "10. Rank-Nullity", "rank+nullity=n. nullity = מס' חופשיים.",
    "9. dim(V)=n", "n בת\"ל = בסיס = n פורשים. n+1 = ת\"ל."
)

s.gap(3*mm)

# Fn[x] + polynomials
s.hline()
s.gap()
s.title_line("הגדרה", "פולינומים Fn[x]")
s.r("בסיס סטנדרטי: 1,x,...,xⁿ (dim=n+1).  p₀,...,pn עם deg(pⱼ)=j ⇒ בסיס.  F[x] לא נוצר סופית (dim=∞).")

s.gap()
s.title_line("הגדרה", "מטריצות אלכסוניות")
s.r("מכפלת אלכסוניות=אלכסונית.  D₁D₂=D₂D₁.  D הפיכה ⟺ [D]ii≠0 לכל i.  ת\"מ של Mn(F).")

# Footer
s.y = 8*mm
s.c.setFont(F, 7)
s.c.setFillColor(GRAY)
ft = heb("• סיכום אלגברה לינארית 1 • מבוסס על הרצאות, תרגולים ושיעורי בית • בהצלחה! •")
tw = s.c.stringWidth(ft, F, 7)
s.c.drawString(W/2 - tw/2, s.y, ft)

s.save()
print("DONE: cheatsheet v2 saved!")
