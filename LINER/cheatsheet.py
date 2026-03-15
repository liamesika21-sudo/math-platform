#!/usr/bin/env python3
"""
Linear Algebra 1 Cheatsheet — compact exam-style, matching the example PDF exactly.
Each page = one topic. No determinants. No proofs. No examples beyond minimal.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import os, glob

# ── Fonts ──
def find_font(bold=False):
    if bold:
        for f in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
                   "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"]:
            if os.path.exists(f): return f
    for f in ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
              "/usr/share/fonts/truetype/freefont/FreeSans.ttf"]:
        if os.path.exists(f): return f
    return None

fp = find_font(False)
fb = find_font(True)
if fp: pdfmetrics.registerFont(TTFont("HF", fp))
if fb: pdfmetrics.registerFont(TTFont("HFB", fb))
F = "HF" if fp else "Helvetica"
FB = "HFB" if fb else "Helvetica-Bold"

# ── Colors (matching example) ──
GREEN = HexColor("#0d7a3e")
ORANGE = HexColor("#d4760a")
BLUE = HexColor("#2471a3")
PURPLE = HexColor("#7d3c98")
RED = HexColor("#c0392b")
CYAN_BG = HexColor("#e0f7fa")
YELLOW_BG = HexColor("#fff9c4")
GREEN_BG = HexColor("#e8f5e9")
BLUE_BG = HexColor("#e3f2fd")
PINK_BG = HexColor("#fce4ec")
GRAY = HexColor("#666666")
BLK = HexColor("#1a1a1a")

W, H = A4
LM = 12*mm  # left margin
RM = W - 12*mm  # right margin
CW = RM - LM  # content width

def heb(t):
    return get_display(arabic_reshaper.reshape(t))

class Sheet:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.y = H
        self.page = 0

    def new_page(self):
        if self.page > 0:
            self.c.showPage()
        self.page += 1
        self.y = H - 10*mm
        return self.y

    def section_header(self, text):
        """Green header bar spanning full width."""
        h = 8*mm
        self.c.setFillColor(GREEN)
        self.c.roundRect(LM, self.y - h, CW, h, 3, fill=1, stroke=0)
        self.c.setFillColor(white)
        self.c.setFont(FB, 13)
        t = heb(text)
        tw = self.c.stringWidth(t, FB, 13)
        self.c.drawString(W/2 - tw/2, self.y - h + 2.5*mm, t)
        self.y -= h + 3*mm

    def label(self, text, color=ORANGE, x=None):
        """Draw a colored badge label. Returns x position after label."""
        if x is None:
            x = RM
        self.c.setFont(FB, 8.5)
        t = heb(text)
        tw = self.c.stringWidth(t, FB, 8.5)
        pad = 1.8*mm
        bx = x - tw - 2*pad
        self.c.setFillColor(color)
        self.c.roundRect(bx, self.y - 0.8*mm, tw + 2*pad, 4.5*mm, 2, fill=1, stroke=0)
        self.c.setFillColor(white)
        self.c.drawString(bx + pad, self.y, t)
        self.c.setFillColor(BLK)
        return bx - 2*mm

    def title_right(self, text, size=10, color=GREEN, bold=True):
        """Draw right-aligned title text."""
        f = FB if bold else F
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        t = heb(text)
        tw = self.c.stringWidth(t, f, size)
        self.c.drawString(RM - tw, self.y, t)
        self.c.setFillColor(BLK)

    def rtl(self, text, size=8.5, color=BLK, indent=0, font=None):
        """Draw RTL text right-aligned."""
        f = font or F
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        t = heb(text)
        tw = self.c.stringWidth(t, f, size)
        self.c.drawString(RM - indent - tw, self.y, t)
        self.c.setFillColor(BLK)

    def ltr(self, text, size=8.5, color=BLK, x=None):
        """Draw LTR text (math)."""
        if x is None: x = LM
        self.c.setFont(F, size)
        self.c.setFillColor(color)
        self.c.drawString(x, self.y, text)

    def center(self, text, size=8.5, color=BLK, bold=False):
        f = FB if bold else F
        self.c.setFont(f, size)
        self.c.setFillColor(color)
        t = heb(text)
        tw = self.c.stringWidth(t, f, size)
        self.c.drawString(W/2 - tw/2, self.y, t)

    def line(self, text, size=8.5, color=BLK, indent=0):
        """Single RTL line, then advance y."""
        self.rtl(text, size, color, indent)
        self.y -= 4*mm

    def bline(self, text, size=8.5, color=BLK, indent=0):
        """Bold RTL line."""
        self.rtl(text, size, color, indent, font=FB)
        self.y -= 4*mm

    def math_line(self, text, size=8.5, color=BLK):
        """Center-aligned math line."""
        self.c.setFont(F, size)
        self.c.setFillColor(color)
        tw = self.c.stringWidth(text, F, size)
        self.c.drawString(W/2 - tw/2, self.y, text)
        self.y -= 4*mm

    def bullet(self, text, size=8, color=BLK, indent=3*mm):
        self.rtl("• " + text, size, color, indent)
        self.y -= 3.8*mm

    def gap(self, g=2*mm):
        self.y -= g

    def labeled_block(self, label_text, title_text, label_color=ORANGE):
        """Label badge + title on same line."""
        end_x = self.label(label_text, label_color)
        self.c.setFont(FB, 9.5)
        self.c.setFillColor(BLK)
        t = heb(title_text)
        tw = self.c.stringWidth(t, FB, 9.5)
        self.c.drawString(end_x - tw, self.y, t)
        self.y -= 5.5*mm

    def bg_block(self, color, height):
        """Draw a background rectangle."""
        self.c.setFillColor(color)
        self.c.rect(LM, self.y - height + 2*mm, CW, height, fill=1, stroke=0)
        self.c.setFillColor(BLK)

    def hline(self, color=HexColor("#cccccc")):
        self.c.setStrokeColor(color)
        self.c.setLineWidth(0.5)
        self.c.line(LM, self.y, RM, self.y)
        self.y -= 2*mm

    def table_row(self, cols, widths, size=8, bold=False, colors=None):
        """Draw a table row with columns. cols=list of strings, widths=list of mm widths."""
        f = FB if bold else F
        x = RM
        for i, (col, w) in enumerate(zip(cols, widths)):
            c = colors[i] if colors else BLK
            self.c.setFont(f, size)
            self.c.setFillColor(c)
            t = heb(col)
            tw = self.c.stringWidth(t, f, size)
            self.c.drawString(x - tw, self.y, t)
            x -= w*mm
        self.y -= 4*mm

    def save(self):
        self.c.save()

# ═══════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════
s = Sheet("/sessions/upbeat-kind-mayer/mnt/LINER/cheatsheet_לינארית1.pdf")

# ═══════════════════════════════════════════════
# TITLE
# ═══════════════════════════════════════════════
s.new_page()
s.c.setFont(FB, 20)
s.c.setFillColor(GREEN)
t = heb("סיכום אלגברה לינארית 1")
tw = s.c.stringWidth(t, FB, 20)
s.c.drawString(W/2 - tw/2, s.y, t)
s.y -= 6*mm
s.c.setFont(F, 9)
s.c.setFillColor(GRAY)
t2 = heb("הרצאות 1-26 • תרגולים • שיעורי בית • מותאם למבחני 2024")
tw2 = s.c.stringWidth(t2, F, 9)
s.c.drawString(W/2 - tw2/2, s.y, t2)
s.y -= 8*mm

# ═══════════════════════════════════════════════
# PAGE 1: שדות
# ═══════════════════════════════════════════════
s.section_header("◆ שדות (Fields)")

s.labeled_block("הגדרה", "שדה (Field)")
s.line("F עם +,· : קומוטטיבי, אסוציאטיבי, אדישות (0,1), נגדי, הופכי (a≠0), דיסטריבוטיביות.")
s.line("דוגמאות: ℝ, ℚ, ℂ, ℤp (p ראשוני).  לא שדה: ℤ, ℤ₆ (אי-זוגי).")

s.gap()
s.labeled_block("משפט", "תכונות שדה")
s.bullet("יחידות: 0F+x=x, 1F·x=x.  אם 0F=1F אז F={0}.")
s.bullet("צמצום חיבור: x+z=y+z ⇒ x=y.  נגדי: x+y=0F ⇒ y=-x.")
s.bullet("x·0F=0F.  אין מחלקי אפס: x·y=0F ⇒ x=0F או y=0F.")

s.gap()
s.labeled_block("משפט", "תכונות הנגדי")
s.line("-0F=0F.  -(-x)=x.  -x=(-1F)·x.  (-x)·y=x·(-y)=-(x·y).  (-x)(-y)=x·y.")

s.gap()
s.labeled_block("משפט", "תכונות ההופכי")
s.line("(1F)⁻¹=1F.  (x⁻¹)⁻¹=x.  (x·y)⁻¹=y⁻¹·x⁻¹.")

s.gap()
s.labeled_block("משפט", "תכונות החזקה")
s.line("x^(n+m)=x^n·x^m.  (x^n)^m=x^(n·m).  (x·y)^n=x^n·y^n.  x^(-n)=(x^n)⁻¹.")

s.gap()
s.labeled_block("הגדרה", "ℤn, השוואה מודולרית, תת-שדה")
s.line("a≡b mod n ⟺ n|(a-b).  ℤn={0,...,n-1}.  (ℤn,⊕,⊙) שדה ⟺ n ראשוני.")
s.line("(a+b) mod n = [(a mod n)+(b mod n)] mod n.  בדומה לכפל.")
s.line("F₁⊆F תת-שדה: סגור +,·, נגדי, הופכי, מכיל 0F,1F.")

s.gap()
s.labeled_block("משפט", "פרמא הקטן + בזו")
s.line("פרמא: p ראשוני, 1≤x≤p-1 ⇒ x^(p-1)≡1 mod p.")
s.line("בזו: gcd(a,b)=1 ⇒ ∃x,y∈ℤ: ax+by=1.")

# ═══════════════════════════════════════════════
# PAGE 2: מרחבים וקטוריים + תת-מרחב
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ מרחב וקטורי + תת-מרחב")

s.labeled_block("הגדרה", "מרחב וקטורי (מ\"ו)")
s.line("V מעל שדה F עם חיבור וקטורים וכפל בסקלר. 8 אקסיומות:")
s.line("קומ' חיבור, אסוצ' חיבור, יחידת חיבור 0v, נגדי -v, אסוצ' כפל, יחידת כפל 1F, דיסט' סקלר, דיסט' וקטור.")
s.line("דוגמאות: Fⁿ, Mmxn(F), Fn[x] (dim=n+1), F[x] (dim=∞).")

s.gap()
s.labeled_block("משפט", "תכונות מ\"ו בסיסיות")
s.bullet("0v יחיד: v+ṽ=v ⇒ ṽ=0v.  חוק צמצום: u+v=0v ⇒ u=-v.")
s.bullet("-(0v)=0v.  -v=(-1F)·v.  0F·v=0v.  α·0v=0v.")
s.bullet("α·v=0v ⇒ α=0F או v=0v.", size=8, color=RED)

s.gap()
s.labeled_block("הגדרה", "תת-מרחב (ת\"מ)")
s.line("W⊆V תת-מרחב אם:  (1) 0v∈W  (2) סגור חיבור  (3) סגור כפל בסקלר.")
s.bline("קריטריון מאוחד: W ת\"מ ⟺ α₁w₁+α₂w₂∈W + 0v∈W.", size=8.5, color=RED)

s.gap()
s.labeled_block("משפט", "חיתוך ואיחוד")
s.line("W₁∩W₂ תמיד ת\"מ.  W₁∪W₂ לא בהכרח ת\"מ!")
s.line("W₁,W₂ ת\"מ, W₁∪W₂=V ⇒ W₁=V או W₂=V (אם W₁⊆W₂ או להפך).")

s.gap()
s.hline()
s.gap()

s.labeled_block("הגדרה", "Span")
s.line("span{v₁,...,vk} = כל הצירופים הלינאריים.  תמיד תת-מרחב.")

s.gap()
s.labeled_block("משפט", "תכונות Span")
s.bullet("span{v₁,...,vk} — ת\"מ הכי קטן שמכיל את v₁,...,vk.")
s.bullet("מונוטוניות: A⊆B ⇒ span(A)⊆span(B).")
s.bullet("v∈span{v₁,...,vk} ⟺ span{v₁,...,vk,v}=span{v₁,...,vk}.")

s.gap()
s.labeled_block("הגדרה", "נוצר סופית / לא נוצר סופית")
s.line("Fn[x] נוצר סופית (dim=n+1).  F[x] לא נוצר סופית (dim=∞).")

# ═══════════════════════════════════════════════
# PAGE 3: בת"ל, ת"ל, בסיס, ממד
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ בת\"ל, ת\"ל, בסיס, ממד")

s.labeled_block("הגדרה", "בת\"ל (בלתי תלויים לינארית)")
s.line("v₁,...,vk בת\"ל:  Σαᵢvᵢ=0 ⇒ αᵢ=0 לכל i.")

s.gap()
s.labeled_block("הגדרה", "ת\"ל (תלויים לינארית)")
s.line("v₁,...,vk ת\"ל ⟺ ∃j: vⱼ∈span{v₁,...,vⱼ₋₁} (ניסוח שקול: vⱼ צ\"ל של קודמיו).")

s.gap()
s.labeled_block("משפט", "בת\"ל ⟺ ייצוג יחיד")
s.line("v₁,...,vk בת\"ל ⟺ לכל v∈Span יש ייצוג יחיד כצ\"ל.")
s.line("הוכחה: הנח 2 ייצוגים, חסר ⇒ צ\"ל=0, מבת\"ל ⇒ מקדמים שווים.")

s.gap()
s.labeled_block("משפט", "0v ת\"ל")
s.line("0v תמיד תלוי לינארית.  v≠0v ⇒ {v} בת\"ל.")

s.gap()
s.labeled_block("משפט", "\"בת\"ל או\" ת\"ל")
s.line("v₁,v₂ בת\"ל ⟺ לא קיים α כך ש-v₂=α·v₁.")

s.gap()
s.hline()
s.gap()

s.labeled_block("הגדרה", "בסיס + ממד")
s.bline("בסיס: בת\"ל + פורשים.  dim(V) = מס' איברים בבסיס.  dim({0v})=0.", size=8.5, color=RED)

s.gap()
s.labeled_block("משפט", "תנאים שקולים לבסיס")
s.line("(1) v₁,...,vn בסיס  ⟺  (2) בת\"ל מקסימלי  ⟺  (3) פורשים מינימלית.")

s.gap()
s.labeled_block("משפט", "שטייניץ (Steinitz)")
s.bline("v₁,...,vk בת\"ל, w₁,...,wm פורשים ⇒ k≤m.", size=8.5, color=RED)

s.gap()
s.labeled_block("מסקנות", "מסקנות שטייניץ", PURPLE)
s.bullet("dim(V)=n ⇒ כל n+1 וקטורים ת\"ל.  כל n-1 וקטורים לא פורשים.")
s.bullet("n בת\"ל = בסיס = n פורשים (כש-dim=n).")
s.bullet("W ת\"מ של V ⇒ dim(W)≤dim(V).  dim(W)=dim(V) ⇒ W=V.")

s.gap()
s.labeled_block("משפט", "השלמה לבסיס")
s.line("v₁,...,vk בת\"ל ב-V (dim=n) ⇒ ניתן להשלים ל-v₁,...,vk,vk+1,...,vn בסיס.")

s.gap()
s.labeled_block("הגדרה", "בסיסים סטנדרטיים")
s.line("Fⁿ: e₁,...,en (dim=n).  Mmxn(F): Eij (dim=m·n).  Fn[x]: 1,x,...,xⁿ (dim=n+1).")

s.gap()
s.labeled_block("הגדרה", "הבסיס הסטנדרטי של Fⁿ")
s.line("e₁=(1,0,...,0), ..., en=(0,...,0,1).  הם בסיס של Fⁿ.")

# ═══════════════════════════════════════════════
# PAGE 4: סכום, סכום ישר, נוסחת ממדים
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ סכום, סכום ישר, נוסחת ממדים")

s.labeled_block("הגדרה", "U+W, סכום ישר")
s.line("U+W = {u+w | u∈U, w∈W}  (תת-מרחב!).")
s.bline("V=U⊕W  ⟺  V=U+W, U∩W={0}.", size=8.5, color=RED)

s.gap()
s.labeled_block("משפט", "תכונות סכום")
s.bullet("U+U=U.  U+V=V.")
s.bullet("סיכומון: V ⊇ U+W ⊇ U∪W ⊇ U∩W ⊇ {0v}.")
s.bullet("U=span{u₁,...,uk}, W=span{w₁,...,wl} ⇒ U+W=span{u₁,...,uk,w₁,...,wl}.")
s.bullet("span(S₁)+span(S₂) = span(S₁∪S₂).")

s.gap()
s.labeled_block("משפט", "נוסחת ממדים")
s.bline("dim(U+W) = dim(U) + dim(W) - dim(U∩W)", size=9, color=RED)
s.line("מסקנה: V=U⊕W ⟺ dim(V)=dim(U)+dim(W) (כאשר U∩W={0}).")

s.gap()
s.labeled_block("משפט", "תנאים שקולים לסכום ישר")
s.line("(1) V=U⊕W  (2) V=U+W, U∩W={0}  (3) ∀v∈V ייצוג יחיד v=u+w  (4) dim(V)=dim(U)+dim(W)+V=U+W.")

s.gap()
s.hline()
s.gap()

s.labeled_block("הגדרה", "פולינומים Fn[x]")
s.line("בסיס סטנדרטי: 1,x,...,xⁿ  עם dim=n+1.  p₀,...,pn עם deg(pⱼ)=j ⇒ בסיס.")
s.line("F[x] לא נוצר סופית (dim=∞).")

s.gap()
s.labeled_block("משפט", "dimℂ(V)=n ⇒ dimℝ(V)=2n")
s.line("בסיס: (v₁,iv₁,...,vn,ivn).  פורש: z=a+bi ⇒ zv=av+b(iv).  בת\"ל: a+bi=0 ⇒ a=b=0.")

s.gap()
s.hline()
s.gap()

s.labeled_block("הגדרה", "מערכת לינארית Ax=b")
s.line("דרג [A|b].  שורת סתירה ⇒ אין פתרון.  rank=n ⇒ יחיד.  אחרת ⇒ ∞.")
s.bline("פתרון כללי: x = x₀ + Null(A).  dim Null = n-rank(A) = מס' חופשיים.", size=8.5, color=RED)

s.gap()
s.labeled_block("הגדרה", "Null(A) — מרחב האפס")
s.line("H = {x∈Fⁿ | Ax=0}.  ת\"מ של Fⁿ.  Null space = Nul(A).")

s.gap()
s.labeled_block("משפט", "קשר הומוגנית/לא הומוגנית")
s.line("G={x | Ax=b}. G≠∅, x₀∈G ⇒ G={h+x₀ | h∈Null(A)} (הזזה של מרחב האפס).")


# ═══════════════════════════════════════════════
# PAGE 5: מטריצות — כפל, שחלוף, סוגים, trace
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ מטריצות — כפל, שחלוף, סוגים, עקבה")

s.labeled_block("הגדרה", "כפל מטריצות")
s.line("(AB)ij = Σk aik·bkj.  A∈Mmxn(F), B∈Mnxp(F).  לא קומוטטיבי!  אסוציאטיבי.  דיסטריבוטיבי.")

s.gap()
s.labeled_block("הגדרה", "שחלוף (Transpose)")
s.line("(Aᵗ)ij=Aji.  (A+B)ᵗ=Aᵗ+Bᵗ.  (αA)ᵗ=αAᵗ.  (Aᵗ)ᵗ=A.  (AB)ᵗ=BᵗAᵗ (הפוך!)")

s.gap()
# Table for special matrices
s.labeled_block("הגדרה", "סוגי מטריצות מיוחדים")

# Header
s.table_row(["סוג", "תנאי", "הערה"],
            [55, 55, 60], size=8, bold=True, colors=[GREEN, GREEN, GREEN])
s.table_row(["סימטרית", "Aᵗ=A", "aij=aji"],
            [55, 55, 60], size=8)
s.table_row(["אנטי-סימטרית", "Aᵗ=-A", "aii=0"],
            [55, 55, 60], size=8)
s.table_row(["אידמפוטנטית", "A²=A", "I, [[1,0],[0,0]]"],
            [55, 55, 60], size=8)
s.table_row(["נילפוטנטית", "Aᵏ=0", "det=0, Tr=0"],
            [55, 55, 60], size=8)

s.gap()
s.labeled_block("הגדרה", "עקבה (Trace)")
s.bline("Tr(A) = Σᵢ aᵢᵢ.  Tr(A+B)=Tr(A)+Tr(B).  Tr(AB)=Tr(BA) תמיד!  Tr(Aᵗ)=Tr(A).", size=8.5, color=RED)
s.line("trace(αA+βB)=α·trace(A)+β·trace(B) — לינארית.")
s.line("A∈Mn(ℝ) ריבועית: trace(AAᵗ)=0 ⇒ A=0.")

s.gap()
s.labeled_block("משפט", "סימטריות ואנטי-סימטריות")
s.line("S={A∈Mn(F)|A=Aᵗ}.  AS={A∈Mn(F)|A=-Aᵗ}.")
s.line("Mn(F)=S⊕AS (כש-1F+1F≠0F).  dim(S)=(n²+n)/2.  dim(AS)=(n²-n)/2.")

s.gap()
s.labeled_block("משפט", "מטריצות אלכסוניות")
s.line("מכפלת אלכסוניות=אלכסונית.  D₁D₂=D₂D₁.  D הפיכה ⟺ [D]ii≠0 לכל i.")
s.line("קבוצת האלכסוניות — ת\"מ של Mn(F).")

s.gap()
s.labeled_block("הערה", "ממדים חשובים", PURPLE)
s.line("dim(Mn(F))=n².  dim(Mmxn(F))=m·n.  dim(S)=(n²+n)/2.  dim(AS)=(n²-n)/2.")

s.gap()
s.labeled_block("משפט", "כפל מאפיינים")
s.line("A·In=A.  Im·A=A.  A·0nxr=0mxr.  0kxm·A=0kxn.  (αA)B=A(αB)=α(AB).")

# ═══════════════════════════════════════════════
# PAGE 6: הפיכות — 12 תנאים, אלמנטריות, rank
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ הפיכות — תכונות, תנאים שקולים, אלמנטריות")

s.labeled_block("הגדרה", "מטריצה הפיכה")
s.line("A∈Mn(F) הפיכה: ∃B כך ש-AB=In.  ההופכית: A⁻¹=B.")

s.gap()
s.labeled_block("משפט", "תכונות ההופכי")
s.bullet("In⁻¹=In.  (A⁻¹)⁻¹=A.  (AB)⁻¹=B⁻¹A⁻¹ (הפוך!)")
s.bullet("(A₁...Ak)⁻¹=Ak⁻¹...A₁⁻¹.  (Aᵏ)⁻¹=(A⁻¹)ᵏ.")
s.bullet("A הפיכה ⟺ Aᵗ הפיכה: (Aᵗ)⁻¹=(A⁻¹)ᵗ.")

s.gap()
# 12 conditions - highlight box
s.bg_block(YELLOW_BG, 42*mm)
s.labeled_block("משפט", "הפיכות — 12 תנאים שקולים", RED)
s.bline("עבור A∈Mn(F), כולם שקולים:", size=8.5, color=RED)
s.bullet("A הפיכה (קיימת A⁻¹)")
s.bullet("לכל b∈Fⁿ קיים פתרון יחיד ל-Ax=b")
s.bullet("∃b∈Fⁿ כך שלמערכת Ax=b קיים פתרון יחיד")
s.bullet("Ax=0 ⇒ x=0 (Null={0})")
s.bullet("A שקולת-שורות ל-In")
s.bullet("A = מכפלת מטריצות אלמנטריות")
s.bullet("עמודות A בת\"ל / פורשות / בסיס ל-Fⁿ")
s.bullet("שורות A בת\"ל / פורשות / בסיס ל-Fⁿ")
s.bullet("Aᵗ הפיכה.  ∃B: AB=I₃ (מספיק צד 1!).  det(A)≠0.  rank(A)=n.")

s.gap()
s.labeled_block("טכניקה", "הופכית 2×2", GREEN)
s.bline("A=(a,b;c,d).  A הפיכה ⟺ ad-bc≠0.  A⁻¹ = 1/(ad-bc)·(d,-b;-c,a).", size=8.5)

s.gap()
s.labeled_block("טכניקה", "חישוב הופכית", GREEN)
s.line("(A|In) → דירוג → (C|B).  אם C=In ⇒ A⁻¹=B.")

s.gap()
s.hline()
s.gap()

s.labeled_block("הגדרה", "מטריצות אלמנטריות")
s.bullet("כפל שורה ב-c≠0.  החלפת שורות.  הוספת αRj ל-Ri.")
s.line("E אלמנטרית ⇒ E הפיכה, E⁻¹ אלמנטרית.  A הפיכה ⟺ A=E₁·...·Ek.")

s.gap()
s.labeled_block("משפט", "שקולות שורה")
s.line("Row(A)=Row(B) ⟺ A,B שקולות שורה.  פעולות שורה לא משנות מרחב שורות.")
s.line("פעולות שורה אלמנטריות לא משנות מרחב שורות אלא משנות מרחב עמודות.")

s.gap()
s.labeled_block("הגדרה", "דרגה (Rank)")
s.bline("rank(A) = מס' פיבוטים = dim(Col(A)) = dim(Row(A)).", size=8.5, color=RED)
s.line("col rank = row rank = rank.  rank(A)=rank(Aᵗ).  rank(AB)≤min(rank A, rank B).")
s.bline("Rank-Nullity: rank(A)+nullity(A)=n.  nullity = מס' חופשיים.", size=8.5, color=RED)
s.line("P הפיכה ⇒ rank(PA)=rank(A).")

# ═══════════════════════════════════════════════
# PAGE 7: טריקים + כללי זהב
# ═══════════════════════════════════════════════
s.new_page()
s.section_header("◆ טריקים אלגבריים להפיכות")

# Table for tricks
s.table_row(["נתון", "טריק", "תוצאה"],
            [55, 60, 55], size=8.5, bold=True, colors=[GREEN, GREEN, GREEN])
s.table_row(["AB = A+B", "I = (B-I)(A-I)", "A-I הפיכה"],
            [55, 60, 55], size=8)
s.table_row(["A = I-AB", "A(I+B) = I", "A⁻¹=I+B"],
            [55, 60, 55], size=8)
s.table_row(["B³=0, A=I-AB", "פיתוח", "A=I-B+B²"],
            [55, 60, 55], size=8)

s.gap()
s.labeled_block("משפט", "Null(AᵗA) = Null(A)", BLUE)
s.line("⊆: Ax=0 ⇒ AᵗAx=0.  ⊇: AᵗAx=0 ⇒ ||Ax||²=(Ax)ᵗAx=0 ⇒ Ax=0.")

s.gap()
s.labeled_block("טכניקה", "rank=1 ⟺ A=uvᵗ", GREEN)
s.line("מכפלה חיצונית. נובע: A²=(vᵗu)A.")

s.gap()
s.labeled_block("הערה", "הצמצום לא מתקיים!", PURPLE)
s.line("AB=CA לא גורר B=C!  צמצום כפל מימין לא מתקיים.")
s.line("A הפיכה ⇒ ניתן לצמצם: AB=AC ⇒ B=C.")

s.gap()
s.labeled_block("משפט", "B=AᵗP → Bᵗ=PᵗA שקולות שורה", BLUE)
s.line("B=AᵗP ⇒ Bᵗ=PᵗA ⇒ A,Bᵗ שקולות שורה.")

s.gap(5*mm)
s.hline()
s.gap()

# ═══════════════════════════════════════════════
# GOLDEN RULES
# ═══════════════════════════════════════════════
s.bg_block(YELLOW_BG, 82*mm)
s.section_header("★ כללי זהב לבחינה")

golden = [
    ("1. הגדרות מדויקות!", "\"ללא הסבר = 0 נק'\". ציין שם משפט + תנאים."),
    ("2. הוכחת בת\"ל", "\"נניח Σαᵢvᵢ=0\" ⇒ αᵢ=0 לכל i."),
    ("3. הוכחת תת-מרחב", "0v∈W, סגור חיבור, סגור כפל."),
    ("4. הפרכה", "דוגמת נגד אחת. נסה 2×2 / ℝ²."),
    ("5. מערכת עם פרמטר", "דרג, חלק למקרים. לא לחלק ב-0!"),
    ("6. הפיכות", "AB=I ⇒ A הפיכה. det≠0 ⟺ הפיכה."),
    ("7. det", "det(AB)=det(A)det(B). משולשית=מכפלת אלכסון."),
    ("8. נוסחת ממדים", "dim(U+W)=dim(U)+dim(W)-dim(U∩W)."),
    ("9. dim(V)=n", "n בת\"ל = בסיס = n פורשים. n+1 = ת\"ל."),
    ("10. Rank-Nullity", "rank+nullity=n. nullity = מס' חופשיים."),
]

for title, desc in golden:
    s.c.setFont(FB, 8.5)
    s.c.setFillColor(RED)
    t = heb(title)
    tw = s.c.stringWidth(t, FB, 8.5)
    s.c.drawString(RM - tw, s.y, t)

    s.c.setFont(F, 8)
    s.c.setFillColor(BLK)
    d = heb(desc)
    dw = s.c.stringWidth(d, F, 8)
    s.c.drawString(RM - dw, s.y - 4*mm, d)
    s.y -= 9.5*mm

# Footer
s.y = 10*mm
s.c.setFont(F, 7.5)
s.c.setFillColor(GRAY)
ft = heb("• סיכום אלגברה לינארית 1 • מבוסס על הרצאות, תרגולים ושיעורי בית • בהצלחה! •")
tw = s.c.stringWidth(ft, F, 7.5)
s.c.drawString(W/2 - tw/2, s.y, ft)

s.save()
print("DONE: cheatsheet saved!")
