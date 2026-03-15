#!/usr/bin/env python3
"""
Create a Linear Algebra 1 summary PDF in the style of the example,
covering all topics EXCEPT determinants.
Hebrew RTL support via arabic_reshaper + bidi.
"""

import subprocess, sys

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg, "--break-system-packages", "-q"])

for pkg in ["reportlab", "arabic-reshaper", "python-bidi"]:
    try:
        __import__(pkg.replace("-", "_").split("_")[0] if pkg != "python-bidi" else "bidi")
    except ImportError:
        install(pkg)

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_RIGHT, TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display
import os, glob

# ---------- Find Hebrew font ----------
def find_hebrew_font():
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSerif.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
        "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansHebrew-Regular.ttf",
    ]
    # Also search broadly
    for pattern in ["/usr/share/fonts/**/*.ttf"]:
        candidates.extend(glob.glob(pattern, recursive=True))

    for f in candidates:
        if os.path.exists(f):
            return f
    return None

font_path = find_hebrew_font()
if font_path:
    pdfmetrics.registerFont(TTFont("HebrewFont", font_path))
    FONT = "HebrewFont"
else:
    FONT = "Helvetica"

# Try to find a bold font
bold_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
    "/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf",
]
FONT_BOLD = FONT
for bf in bold_candidates:
    if os.path.exists(bf):
        pdfmetrics.registerFont(TTFont("HebrewFontBold", bf))
        FONT_BOLD = "HebrewFontBold"
        break

# ---------- Colors (matching example style) ----------
GREEN_DARK = HexColor("#0d7a3e")
GREEN_HEADER = HexColor("#0d7a3e")
ORANGE_LABEL = HexColor("#d4760a")
RED_ACCENT = HexColor("#c0392b")
BLUE_ACCENT = HexColor("#2471a3")
PURPLE_ACCENT = HexColor("#7d3c98")
GRAY_BG = HexColor("#f0f0f0")
LIGHT_GREEN_BG = HexColor("#e8f5e9")
BLACK = HexColor("#1a1a1a")

# ---------- Helpers ----------
def heb(text):
    """Reshape and reorder Hebrew text for correct RTL display."""
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

def draw_section_header(c, y, text, page_width):
    """Draw a green section header bar like ◆ דטרמיננטות — סיכום מפורט"""
    bar_height = 9*mm
    margin = 15*mm
    bar_width = page_width - 2*margin

    # Draw green bar
    c.setFillColor(GREEN_HEADER)
    c.roundRect(margin, y - bar_height + 2*mm, bar_width, bar_height, 3, fill=1, stroke=0)

    # White text
    c.setFillColor(white)
    c.setFont(FONT_BOLD, 14)
    display_text = heb(text)
    tw = c.stringWidth(display_text, FONT_BOLD, 14)
    c.drawString(page_width/2 - tw/2, y - bar_height + 2*mm + 2.5*mm, display_text)

    return y - bar_height - 4*mm

def draw_label(c, x, y, label_text, label_color=ORANGE_LABEL):
    """Draw an orange/colored label like הגדרה or משפט"""
    c.setFont(FONT_BOLD, 10)
    display = heb(label_text)
    tw = c.stringWidth(display, FONT_BOLD, 10)

    # Background rounded rect
    padding = 2*mm
    c.setFillColor(label_color)
    c.roundRect(x - padding, y - 1*mm, tw + 2*padding, 5*mm, 2, fill=1, stroke=0)

    c.setFillColor(white)
    c.drawString(x, y, display)
    c.setFillColor(BLACK)
    return tw + 2*padding + 3*mm

def draw_text_rtl(c, x, y, text, font=None, size=9, color=BLACK):
    """Draw RTL Hebrew text right-aligned at x."""
    if font is None:
        font = FONT
    c.setFont(font, size)
    c.setFillColor(color)
    display = heb(text)
    tw = c.stringWidth(display, font, size)
    c.drawString(x - tw, y, display)
    return tw

def draw_text_ltr(c, x, y, text, font=None, size=9, color=BLACK):
    """Draw LTR text (math formulas) left-aligned at x."""
    if font is None:
        font = FONT
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, text)

def draw_mixed_line(c, right_x, y, hebrew_text, math_text="", font_size=9):
    """Draw a line with Hebrew text on right and math on left."""
    if hebrew_text:
        draw_text_rtl(c, right_x, y, hebrew_text, size=font_size)
    if math_text:
        c.setFont(FONT, font_size)
        c.setFillColor(BLACK)
        c.drawString(20*mm, y, math_text)

def draw_definition_block(c, right_x, y, title, content_lines, label_color=ORANGE_LABEL):
    """Draw a definition/theorem block with label and content."""
    # Draw label
    label_w = draw_label(c, right_x - 2*mm, y, title, label_color)

    # Draw title text next to label if first content has a title
    line_y = y
    for i, line in enumerate(content_lines):
        if i == 0:
            line_y = y - 6*mm
        else:
            line_y -= 5*mm

        if isinstance(line, tuple):
            # (hebrew_text, math_text)
            heb_text, math_text = line
            if heb_text:
                draw_text_rtl(c, right_x, line_y, heb_text, size=9)
            if math_text:
                draw_text_ltr(c, 20*mm, line_y, math_text, size=9)
        else:
            draw_text_rtl(c, right_x, line_y, line, size=9)

    return line_y - 3*mm


# ============================================================
# BUILD THE PDF
# ============================================================
W, H = A4
output_path = "/sessions/upbeat-kind-mayer/mnt/LINER/סיכום_לינארית1_ללא_דטרמיננטות.pdf"
c = canvas.Canvas(output_path, pagesize=A4)

RIGHT_MARGIN = W - 15*mm
LEFT_MARGIN = 15*mm
LINE_HEIGHT = 5*mm
BLOCK_GAP = 3*mm

def new_page():
    c.showPage()
    return H - 15*mm

def check_space(y, needed=30*mm):
    if y < needed:
        return new_page()
    return y

# ============================================================
# TITLE PAGE
# ============================================================
y = H - 25*mm

c.setFont(FONT_BOLD, 22)
c.setFillColor(GREEN_DARK)
title = heb("סיכום אלגברה לינארית 1")
tw = c.stringWidth(title, FONT_BOLD, 22)
c.drawString(W/2 - tw/2, y, title)

y -= 10*mm
c.setFont(FONT, 11)
c.setFillColor(BLACK)
sub = heb("הרצאות 1-26 • תרגולים • שיעורי בית • מותאם למבחני 2024")
tw = c.stringWidth(sub, FONT, 11)
c.drawString(W/2 - tw/2, y, sub)

y -= 5*mm
c.setFont(FONT, 9)
c.setFillColor(HexColor("#666666"))
sub2 = heb("ללא דטרמיננטות (ראה סיכום נפרד)")
tw = c.stringWidth(sub2, FONT, 9)
c.drawString(W/2 - tw/2, y, sub2)

y -= 12*mm

# ============================================================
# PAGE 1: FIELDS (שדות)
# ============================================================
y = draw_section_header(c, y, "◆ שדות (Fields) — סיכום מפורט", W)

# Definition: Field
y = check_space(y, 50*mm)
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "שדה (Field)", FONT_BOLD, 11, GREEN_DARK)

y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "F עם פעולות +,· : קומוטטיבי, אסוציאטיבי, אדישות (0,1), נגדי, הופכי (a≠0), דיסטריבוטיביות.", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "דוגמאות: ℝ, ℚ, ℂ, ℤp. לא שדה: ℤ, ℤ₆.", size=9)

# Properties of field
y -= 9*mm
draw_label(c, RIGHT_MARGIN - 75*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות שדה", FONT_BOLD, 10, GREEN_DARK)

y -= 6*mm
props = [
    "יחידות 0F ו-1F: 0F+x=x, 1F·x=x. אם 0F=1F אז F={0}.",
    "חוק הצמצום לחיבור: x+z=y+z ⇒ x=y",
    "יחידות הנגדי: x+y=0F ⇒ y=-x",
    "x·0F=0F לכל x∈F",
    "אין מחלקי אפס: x·y=0F ⇒ x=0F או y=0F",
]
for p in props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Inverse properties
y -= 3*mm
draw_label(c, RIGHT_MARGIN - 75*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות ההופכי", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
inv_props = [
    "(1F)⁻¹ = 1F",
    "(x⁻¹)⁻¹ = x",
    "(x·y)⁻¹ = y⁻¹·x⁻¹",
]
for p in inv_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Negation properties
y -= 3*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות הנגדי", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
neg_props = [
    "-0F = 0F",
    "-(-x) = x",
    "-x = (-1F)·x",
    "(-x)·y = x·(-y) = -(x·y)",
    "(-x)·(-y) = x·y",
]
for p in neg_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Power properties
y -= 3*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות החזקה", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
pow_props = [
    "x^(n+m) = x^n · x^m",
    "(x^n)^m = x^(n·m)",
    "(x·y)^n = x^n · y^n (עבור y≠0F)",
    "x^(-n) = (x^n)⁻¹",
]
for p in pow_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Zn
y -= 3*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "ℤn והשוואה מודולרית", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "a≡b mod n אם ורק אם קיים q∈ℤ כך ש-a=q·n+b. ℤn={0,1,...,n-1}.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(a+b) mod n = [(a mod n)+(b mod n)] mod n", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(a·b) mod n = [(a mod n)·(b mod n)] mod n", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(ℤn,⊕,⊙) — שדה אם ורק אם n ראשוני. ℤp שדה.", size=8.5, color=RED_ACCENT)

# Sub-field
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "תת-שדה", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "F₁⊆F תת שדה אם: (1) סגור לחיבור/כפל (2) -x∈F₁ (3) x⁻¹∈F₁ (4) 0F,1F∈F₁.", size=8.5)

# Fermat
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "פרמא הקטן", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "יהי p ראשוני, 1≤x≤p-1. אזי x^(p-1) ≡ 1 mod p.", size=8.5)

# Bezout
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "משוואת בזו", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "יהיו a,b∈ℤ. אם gcd(a,b)=1 אז קיימים x,y∈ℤ כך ש-ax+by=1.", size=8.5)


# ============================================================
# PAGE 2: VECTOR SPACES
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ מרחבים וקטוריים — סיכום מפורט", W)

draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "מרחב וקטורי (Fⁿ)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Fⁿ — קבוצת הפעולות שמכדירנו מהוות מ\"ו מעל F.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Mmxn(F) — מ\"ו מעל F מהוות קבוצת המטריצות שמכדירנו.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "F[x], Fn[x] — מ\"ו מעל F מהוות קבוצת הפולינומים.", size=8.5)

y -= 9*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "מרחב וקטורי — 8 אקסיומות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "V מעל שדה F עם חיבור וקטורים וכפל בסקלר. 8 אקסיומות:", size=8.5)
y -= 5*mm
axioms_lines = [
    "קומוטטיביות חיבור: u+v=v+u",
    "אסוציאטיביות חיבור: (u+v)+w=u+(v+w)",
    "יחידת חיבור: קיים 0v כך ש-v+0v=v",
    "נגדי לחיבור: לכל v קיים -v כך ש-v+(-v)=0v",
    "אסוציאטיביות כפל: α(βv)=(αβ)v",
    "יחידת כפל: 1F·v=v",
    "דיסטריבוטיביות סקלר: (α+β)v=αv+βv",
    "דיסטריבוטיביות וקטור: α(u+v)=αu+αv",
]
for ax in axioms_lines:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + ax, size=8)
    y -= 4.5*mm

# Properties of vector space
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות מ\"ו בסיסיות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
vs_props = [
    "יחידות 0v: אם v+ṽ=v אזי ṽ=0v",
    "חוק הצמצום: u+v=0v ⇒ u=-v",
    "-(0v)=0v",
    "-v = (-1F)·v",
    "0F·v=0v לכל v∈V",
    "α·0v=0v לכל α∈F",
    "אם α·v=0v אז α=0F או v=0v",
]
for p in vs_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Sub-space
y -= 5*mm
y = check_space(y, 50*mm)
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "תת-מרחב", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "W⊆V תת-מרחב אם:", size=9, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "(1) 0v∈W", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "(2) סגור לחיבור: w₁,w₂∈W ⇒ w₁+w₂∈W", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "(3) סגור לכפל בסקלר: α∈F, w∈W ⇒ αw∈W", size=8.5)

# Equivalent criterion
y -= 7*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "קריטריון מאוחד לתת-מרחב", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "W⊆V ת\"מ ⟺ (1) סגור לצ\"ל: α₁w₁+α₂w₂∈W (2) 0v∈W", size=8.5)

# Non-subspace
y -= 7*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הערה", PURPLE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "מה לא תת-מרחב", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "V לא ת\"מ של V. {0v} כן ת\"מ של V (הטריוויאלי).", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "איחוד של שני ת\"מ לא בהכרח ת\"מ.", size=8.5, color=RED_ACCENT)

# Intersection
y -= 7*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "חיתוך תתי-מרחבים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "W₁,W₂ ת\"מ של V ⇒ W₁∩W₂ ת\"מ של V.", size=8.5)


# ============================================================
# PAGE 3: SPAN + LINEAR INDEPENDENCE
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ Span, בת\"ל, ת\"ל — סיכום מפורט", W)

# Span
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "Span", FONT_BOLD, 11, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "span{v₁,...,vk} = כל הצירופים הלינאריים. תמיד תת-מרחב.", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "vi∈span{v₁,...,vk} לכל 1≤i≤k", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "אם W ת\"מ ו-v₁,...,vk∈W אזי span{v₁,...,vk}⊆W", size=8.5)

# Span properties
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות Span", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
span_props = [
    "span{v₁,...,vk} — תת-המרחב הכי קטן שמכיל את v₁,...,vk",
    "מונוטוניות: A⊆B ⇒ span(A) ⊆ span(B)",
    "v∈span{v₁,...,vk} ⟺ span{v₁,...,vk,v}=span{v₁,...,vk}",
    "span(A)∪span(B) ⊆ span(A∪B)",
]
for p in span_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Finitely generated
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "נוצר סופית / לא נוצר סופית", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Fn[x] נוצר סופית (dim=n+1). F[x] לא נוצר סופית (dim=∞).", size=8.5)

# 0v dependent
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "0v תלוי", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "0v \"ת\"ל\" — מרחב וקטורי מעל F, אזי הוקטור 0v תלוי ל(ינארית).", size=8.5)

# Linear dependence/independence
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "בלתי תלויים לינארית (בת\"ל)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,...,vk בת\"ל: Σαᵢvᵢ=0 ⇒ αᵢ=0 לכל i.", size=9, color=RED_ACCENT)

y -= 7*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "תלויים לינארית (ת\"ל)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,...,vk ת\"ל ⟺ קיים 1≤j≤k כך ש-vⱼ∈span{v₁,...,vⱼ₋₁}", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(ניסוח שקול: vⱼ הוא צ\"ל של קודמיו)", size=8.5)

# Key theorems
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "יחידות הייצוג", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,...,vk בת\"ל ⟺ לכל v∈span יש ייצוג יחיד כצ\"ל.", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(משפט שקול: שני ייצוגים ⇒ מקדמים שווים)", size=8.5)

y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "\"ב\"ת\"ל או\" ת\"ל", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,v₂∈V בת\"ל אם ורק אם לא קיים β∈F כך ש-v₂=α·v₁.", size=8.5)

# V/0v
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "V/{0v} בת\"ל", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v≠0v ⇒ {v} בת\"ל. v₁,v₂ בת\"ל אם לא קיים α כך ש-v₂=α·v₁.", size=8.5)


# ============================================================
# PAGE 4: BASIS + DIMENSION
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ בסיס וממד — סיכום מפורט", W)

# Basis definition
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "בסיס", FONT_BOLD, 11, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "V={0v}: בסיס ∅. קיים n∈ℕ וקיימים v₁,...,vn∈V שמקיימים:", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "(1) v₁,...,vn בסיס של V (תנאים שקולים):", size=9, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 8*mm, y, "• v₁,...,vn בת\"ל מקסימלי", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 8*mm, y, "• v₁,...,vn פורשים מינימלית את V", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN - 8*mm, y, "• v₁,...,vn בסיס של V (בת\"ל + פורשים)", size=8.5)

# Dimension
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "ממד dim(V)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "dim(V) = מספר איברים בבסיס. dim({0v})=0.", size=9)

# Steinitz
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "שטייניץ (Steinitz)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,...,vk בת\"ל, w₁,...,wm פורשים. אזי k≤m.", size=9, color=RED_ACCENT)

# Corollaries
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "מסקנות", PURPLE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "מסקנות שטייניץ", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
steinitz_cor = [
    "dim(V)=n ⇒ כל n+1 וקטורים או יותר הם ת\"ל",
    "dim(V)=n ⇒ כל n-1 וקטורים או פחות לא פורשים",
    "n בת\"ל = בסיס = n פורשים (כשדים dim=n)",
    "W ת\"מ של V ⇒ dim(W)≤dim(V)",
    "W ת\"מ של V ו-dim(W)=dim(V) ⇒ W=V",
]
for p in steinitz_cor:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Standard bases
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "בסיסים סטנדרטיים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
std_bases = [
    "Fⁿ: e₁,...,en (וקטורי היחידה). dim=n",
    "Mmxn(F): Eᵢⱼ (מטריצות יחידה). dim=m·n",
    "Fn[x]: 1,x,x²,...,xⁿ. dim=n+1",
    "F[x]: 1,x,x²,... (אינסוף). dim=∞",
]
for p in std_bases:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Completion to basis
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "השלמה לבסיס", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "v₁,...,vk בת\"ל ב-V עם dim=n. אזי ניתן להשלים לבסיס vk+1,...,vn.", size=8.5)

# Basis of sub-dim
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "בסיס של ת\"מ", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "W ת\"מ של V נוצר סופית. V∋W ⇒ W נוצר סופית. dim(W)≤dim(V).", size=8.5)


# ============================================================
# PAGE 5: SUM + DIRECT SUM + DIMENSION FORMULA
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ סכום, סכום ישר, נוסחת ממדים", W)

# U+W
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "U+W, סכום ישר", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "U+W = {u+w | u∈U, w∈W} (תת-מרחב!)", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "V=U⊕W ⟺ V=U+W, U∩W={0}", size=9, color=RED_ACCENT)

# Properties
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות סכום", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
sum_props = [
    "U+U=U",
    "U+V=V",
    "סיכומון: V ⊇ U+W ⊇ U∪W ⊇ U∩W ⊇ {0v}",
    "U=span{u₁,...,uk}, W=span{w₁,...,wl} ⇒ U+W=span{u₁,...,uk,w₁,...,wl}",
    "span(S₁)+span(S₂) = span(S₁∪S₂)",
]
for p in sum_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Dimension formula
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "נוסחת ממדים (הממדים)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "dim(U+W) = dim(U) + dim(W) - dim(U∩W)", size=10, color=RED_ACCENT)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "מסקנה: V=U⊕W ⟺ dim(V)=dim(U)+dim(W) (כאשר ∩={0}).", size=8.5)

# Direct sum criteria
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תנאים שקולים לסכום ישר", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
ds_props = [
    "V=U⊕W",
    "V=U+W ו-U∩W={0}",
    "לכל v∈V קיים ייצוג יחיד v=u+w",
    "dim(V)=dim(U)+dim(W) ו-V=U+W",
]
for i, p in enumerate(ds_props):
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, f"({i+1}) " + p, size=8.5)
    y -= 5*mm

# Polynomials
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "פולינומים Fn[x]", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "בסיס סטנדרטי: 1,x,...,xⁿ עם dim=n+1.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "p₀,...,pn עם deg(pⱼ)=j ⇒ בסיס.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "F[x] לא נוצר סופית (dim=∞).", size=8.5)

# dimC = 2dimR
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "dimℂ(V)=n ⇒ dimℝ(V)=2n", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "בסיס: (v₁,iv₁,...,vn,ivn). פורש: z=a+bi ⇒ zv=av+b(iv).", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "בת\"ל: a+bi=0 עבור ממשיים ⇒ a=b=0.", size=8.5)


# ============================================================
# PAGE 6: MATRICES
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ מטריצות — סיכום מפורט", W)

# Matrix multiplication
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "כפל מטריצות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(AB)ij = Σk aik·bkj. A∈Mmxn(F), B∈Mnxp(F).", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "לא קומוטטיבי! אסוציאטיבי: (AB)C=A(BC). דיסטריבוטיבי: A(B+C)=AB+AC.", size=8.5, color=RED_ACCENT)

# Identity and zero
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "כפל מאפיינים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
id_props = [
    "A·In = A, Im·A = A",
    "A·0nxr = 0mxr, 0kxm·A = 0kxn",
    "(αA)B = A(αB) = α(AB)",
]
for p in id_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Special matrices
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "סוגי מטריצות מיוחדים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
spec_mats = [
    "סימטרית: A^t=A (aij=aji)",
    "אנטי-סימטרית: A^t=-A (aii=0)",
    "אידמפוטנטית: A²=A (דוגמאות: I, 0)",
    "נילפוטנטית: Aᵏ=0 (det=0, Tr=0)",
    "אלכסונית: D∈Mn(F) עם aij=0 לכל i≠j",
]
for p in spec_mats:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Transpose
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "שחלוף (Transpose)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
trans_props = [
    "(A^t)ij = Aji",
    "(A+B)^t = A^t + B^t",
    "(αA)^t = αA^t",
    "(A^t)^t = A",
    "(AB)^t = B^t·A^t (הפוך!)",
]
for p in trans_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# Symmetric decomposition
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "סימטריות ואנטי-סימטריות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "S = {A∈Mn(F) | A=A^t} סימטריות. AS = {A∈Mn(F) | A=-A^t} אנטי.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Mn(F) = S⊕AS (כש-1F+1F≠0F). dim(S)=(n²+n)/2. dim(AS)=(n²-n)/2.", size=8.5)

# Diagonal
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "מטריצות אלכסוניות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "מכפלת אלכסוניות היא אלכסונית. D₁D₂=D₂D₁.", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "D הפיכה אם ורק אם [D]ii≠0 לכל i. קבוצת האלכסוניות — ת\"מ של Mn(F).", size=8.5)

# Trace
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "עקבה (Trace)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Tr(A) = Σi aii. מוגדרת רק על מטריצות ריבועיות.", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "trace(αA+βB) = α·trace(A)+β·trace(B) — לינארית!", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Tr(AB) = Tr(BA) תמיד! Tr(A^t)=Tr(A).", size=8.5, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A∈Mn(ℝ) ריבועית. trace(AA^t)=0 ⇒ A=0.", size=8.5)


# ============================================================
# PAGE 7: INVERTIBILITY
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ הפיכות — סיכום מפורט", W)

# Invertibility definition
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "מטריצה הפיכה", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A∈Mn(F) הפיכה אם קיימת B כך ש-AB=In. ההופכית: A⁻¹=B.", size=9)

# Inverse properties
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "תכונות ההופכי", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
inv_mat_props = [
    "In הפיכה: In⁻¹ = In",
    "A∈Mn(F) הפיכה ⇒ A⁻¹ הפיכה: (A⁻¹)⁻¹ = A",
    "A,B∈Mn(F) הפיכות ⇒ AB הפיכה: (AB)⁻¹ = B⁻¹A⁻¹ (הפוך!)",
    "A₁,...,Ak הפיכות ⇒ (A₁...Ak)⁻¹ = Ak⁻¹...A₁⁻¹",
    "A הפיכה ⇒ Aᵏ הפיכה ל-k∈ℕ: (Aᵏ)⁻¹ = (A⁻¹)ᵏ",
    "A הפיכה ⟺ A^t הפיכה: (A^t)⁻¹ = (A⁻¹)^t",
]
for p in inv_mat_props:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# 13 equivalent conditions
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", RED_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "משפט המטריצה ההפיכה — תנאים שקולים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "עבור A∈Mn(F), כולם שקולים:", size=9, color=RED_ACCENT)
y -= 5*mm
equiv_conds = [
    "A הפיכה (קיימת A⁻¹)",
    "לכל b∈Fⁿ, קיים פתרון יחיד ל-Ax=b",
    "קיים b∈Fⁿ כך שלמערכת Ax=b קיים פתרון יחיד",
    "Ax=0 ⇒ x=0 (Null={0})",
    "A שקולת-שורות ל-In",
    "A שווה למכפלה של מטריצות אלמנטריות",
    "עמודות A הן בת\"ל / פורשות / בסיס ל-Fⁿ",
    "שורות A הן בת\"ל / פורשות / בסיס ל-Fⁿ",
    "A^t הפיכה",
    "∃B: AB=I (מספיק צד 1!)",
    "det(A) ≠ 0",
    "rank(A) = n",
]
for i, p in enumerate(equiv_conds):
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, f"{i+1}. " + p, size=8)
    y -= 4.5*mm

# 2x2 inverse
y -= 3*mm
y = check_space(y, 25*mm)
draw_label(c, RIGHT_MARGIN - 55*mm, y, "טכניקה", GREEN_DARK)
draw_text_rtl(c, RIGHT_MARGIN, y, "הופכית 2×2", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A=(a,b;c,d). A הפיכה ⟺ ad-bc≠0. A⁻¹ = 1/(ad-bc)·(d,-b;-c,a).", size=8.5)

# Computing inverse
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "טכניקה", GREEN_DARK)
draw_text_rtl(c, RIGHT_MARGIN, y, "חישוב הופכית", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "(A|In) → דירוג → (C|B). אם C=In ⇒ A⁻¹=B.", size=8.5)


# ============================================================
# PAGE 8: ELEMENTARY MATRICES + LINEAR SYSTEMS
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ מטריצות אלמנטריות ומערכות לינאריות", W)

# Elementary matrices
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "מטריצות אלמנטריות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "הפעלות שורה בסיסיות על In:", size=9)
y -= 5*mm
elem_ops = [
    "כפל שורה בסקלר c≠0 (הופכית: חלוקה ב-c)",
    "החלפת שורות i,j (הופכית: אותה פעולה)",
    "הוספת כפולה αRj לשורה Ri (הופכית: חיסור αRj)",
]
for p in elem_ops:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

y -= 3*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "E אלמנטרית ⇒ E הפיכה ו-E⁻¹ גם אלמנטרית.", size=9, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A,B שקולות שורה ⟺ ∃E₁,...,Ek אלמנטריות: Ek·...·E₁·A = B", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A הפיכה ⟺ A = E₁·...·Ek (מכפלת אלמנטריות)", size=8.5)

# Row equivalence
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "שקולות שורה", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Row(A)=Row(B) (פעולות שורה לא משנות את מרחב השורות).", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "פעולות שורה אלמנטריות לא משנות את מרחב השורות אלא משנות מרחב העמודות.", size=8.5)

# Linear systems
y -= 10*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "מערכת לינארית Ax=b", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "דרג [A|b]. שורת סתירה ⇒ אין פתרון. rank=n ⇒ יחיד. אחרת ⇒ ∞.", size=9, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "פתרון כללי: x = x₀ + Null(A).", size=9)

# Null space
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "Null(A) — מרחב האפס", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "H = {x∈Fⁿ | Ax=0}. H מ\"ו מעל F (תת-מרחב).", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Null space: Nul(A) = מרחב האפס של A.", size=8.5)

# Homogeneous vs non-homogeneous
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "קשר הומוגנית/לא הומוגנית", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "G = {x∈Fⁿ | Ax=b}. אם G≠∅, ויהי x₀∈G:", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "G = {h+x₀ | h∈H} (הזזה של מרחב האפס).", size=8.5)

# Rank
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הגדרה", ORANGE_LABEL)
draw_text_rtl(c, RIGHT_MARGIN, y, "דרגה (Rank)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "rank(A) = מס' פיבוטים = dim(Col(A)) = dim(Row(A)).", size=9)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "col rank(A) = row rank(A) = rank(A).", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "rank(A) = rank(A^t). rank(AB)≤min(rank A, rank B).", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "Rank-Nullity: rank(A) + nullity(A) = n. nullity = מס' חופשיים.", size=9, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "P הפיכה ⇒ rank(PA)=rank(A).", size=8.5)


# ============================================================
# PAGE 9: ALGEBRAIC TRICKS + GOLDEN RULES
# ============================================================
y = new_page()
y = draw_section_header(c, y, "◆ טריקים אלגבריים + כללי זהב", W)

# Algebraic tricks
draw_label(c, RIGHT_MARGIN - 55*mm, y, "טכניקה", GREEN_DARK)
draw_text_rtl(c, RIGHT_MARGIN, y, "טריקים אלגבריים להפיכות", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm

tricks = [
    ("AB = A+B", "(A-I)(B-I) = I", "A-I הפיכה"),
    ("A = I-AB", "A(I+B) = I", "A⁻¹=I+B"),
    ("B³=0, A=I-AB", "פיתוח", "A=I-B+B²"),
]
# Header
draw_text_rtl(c, RIGHT_MARGIN, y, "נתון", FONT_BOLD, 9, BLUE_ACCENT)
draw_text_ltr(c, LEFT_MARGIN + 80*mm, y, "טריק", FONT_BOLD, 9, BLUE_ACCENT)
draw_text_ltr(c, LEFT_MARGIN, y, "תוצאה", FONT_BOLD, 9, BLUE_ACCENT)
y -= 5*mm

for given, trick, result in tricks:
    draw_text_rtl(c, RIGHT_MARGIN, y, given, size=8.5)
    draw_text_ltr(c, LEFT_MARGIN + 80*mm, y, trick, size=8.5)
    draw_text_ltr(c, LEFT_MARGIN, y, result, size=8.5)
    y -= 5*mm

# Null(AtA) = Null(A)
y -= 5*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "משפט", BLUE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "Null(A^tA) = Null(A)", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "⊆: Ax=0 ⇒ A^tAx=0", size=8.5)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "⊇: A^tAx=0 ⇒ ||Ax||²=(Ax)^tAx=0 ⇒ Ax=0", size=8.5)

# rank=1
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "טכניקה", GREEN_DARK)
draw_text_rtl(c, RIGHT_MARGIN, y, "rank=1 ⟺ A=uv^t", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "מכפלה חיצונית. נובע: A²=(v^tu)A.", size=8.5)

# Cancellation
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הערה", PURPLE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "הצמצום לא מתקיים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "AB=CA לא גורר B=C. צמצום כפל מימין לא מתקיים!", size=8.5, color=RED_ACCENT)
y -= 5*mm
draw_text_rtl(c, RIGHT_MARGIN, y, "A הפיכה ⇒ ניתן לצמצם: AB=AC ⇒ B=C.", size=8.5)

# dim(Mn(F))
y -= 8*mm
draw_label(c, RIGHT_MARGIN - 55*mm, y, "הערה", PURPLE_ACCENT)
draw_text_rtl(c, RIGHT_MARGIN, y, "ממדים חשובים", FONT_BOLD, 10, GREEN_DARK)
y -= 6*mm
dim_notes = [
    "dim(Mn(F)) = n²",
    "dim(S) = (n²+n)/2 — סימטריות",
    "dim(AS) = (n²-n)/2 — אנטי-סימטריות",
    "dim(Mmxn(F)) = m·n",
]
for p in dim_notes:
    draw_text_rtl(c, RIGHT_MARGIN - 3*mm, y, "• " + p, size=8.5)
    y -= 5*mm

# ============================================================
# GOLDEN RULES
# ============================================================
y -= 5*mm
y = check_space(y, 60*mm)

# Draw green bar
bar_height = 8*mm
c.setFillColor(GREEN_HEADER)
c.roundRect(LEFT_MARGIN, y - bar_height + 2*mm, W - 2*LEFT_MARGIN, bar_height, 3, fill=1, stroke=0)
c.setFillColor(white)
c.setFont(FONT_BOLD, 13)
star_text = heb("★ כללי זהב לבחינה")
tw = c.stringWidth(star_text, FONT_BOLD, 13)
c.drawString(W/2 - tw/2, y - bar_height + 2*mm + 2*mm, star_text)
y = y - bar_height - 5*mm

golden_rules = [
    ("1. הגדרות מדויקות!", "\"ללא הסבר = 0 נק'\". ציין שם משפט + תנאים."),
    ("2. הוכחת בת\"ל", "\"נניח Σαᵢvᵢ=0\" ⇒ αᵢ=0 לכל i."),
    ("3. הוכחת תת-מרחב", "0∋W, סגור חיבור, סגור כפל."),
    ("4. הפרכה", "דוגמת נגד אחת. נסה 2×2 / ℝ²."),
    ("5. מערכת עם פרמטר", "דרג, חלק למקרים. לא לחלק ב-0!"),
    ("6. הפיכות", "AB=I ⇒ A הפיכה. det≠0 ⟺ הפיכה."),
    ("7. נוסחת ממדים", "dim(U+W)=dim(U)+dim(W)-dim(U∩W)."),
    ("8. dim(V)=n", "n בת\"ל = בסיס = n פורשים. n+1 = ת\"ל."),
    ("9. Rank-Nullity", "rank+nullity=n. nullity = מס' חופשיים."),
]

for title, desc in golden_rules:
    c.setFont(FONT_BOLD, 9)
    c.setFillColor(RED_ACCENT)
    title_display = heb(title)
    tw = c.stringWidth(title_display, FONT_BOLD, 9)
    c.drawString(RIGHT_MARGIN - tw, y, title_display)

    c.setFont(FONT, 8.5)
    c.setFillColor(BLACK)
    desc_display = heb(desc)
    tw2 = c.stringWidth(desc_display, FONT, 8.5)
    c.drawString(RIGHT_MARGIN - tw2, y - 4.5*mm, desc_display)
    y -= 11*mm


# Footer
y -= 5*mm
c.setFont(FONT, 8)
c.setFillColor(HexColor("#888888"))
footer = heb("• סיכום אלגברה לינארית 1 • מבוסס על הרצאות, תרגולים ושיעורי בית • בהצלחה! •")
tw = c.stringWidth(footer, FONT, 8)
c.drawString(W/2 - tw/2, 15*mm, footer)


# ============================================================
# SAVE
# ============================================================
c.save()
print(f"PDF saved to: {output_path}")
