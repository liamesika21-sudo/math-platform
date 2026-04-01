# Build me this project

I need you to build a **complete, working Python CLI tool** called "Lecture Summarizer". I'm describing exactly what I want below. Please build the entire project — all files, all code, ready to run.

---

## What the tool does

I'm a university student. I have lecture slides (PDFs and PPTXs). I want to drop them into a folder, run one command, and get back beautiful HTML + PDF summaries of each lecture — fully formatted, with color-coded sections for definitions, theorems, proofs, examples, pseudocode, etc.

The tool uses the **Claude API** to analyze the lecture content and generate the HTML.

---

## Project structure — build exactly this

```
lecture-summarizer/
├── summarize.py          ← Main script. Single entry point. This is what I run.
├── system_prompt.md      ← The system prompt sent to Claude (design rules + CSS)
├── config.json           ← Default settings (course name, university, model, etc.)
├── requirements.txt      ← Python dependencies
├── generate/             ← I drop PDFs/PPTXs here (INPUT)
├── results/              ← HTML + PDF summaries appear here (OUTPUT)
└── done/                 ← Processed source files get moved here (ARCHIVE)
```

**Python 3.10+. No web framework, no database, no frontend. Just a CLI script.**

---

## The pipeline — what `python summarize.py` does

When I run the script, it should do this for EACH file in `generate/`:

### Step 1: Extract text
- **PDF** → use `PyMuPDF` (`fitz`) to extract text page by page
- **PPTX** → use `python-pptx` to extract text from all shapes/slides
- Format as `=== SLIDE 1 ===\n[text]\n\n=== SLIDE 2 ===\n[text]\n...`

### Step 2: Detect metadata from filename
- `lecture1.pdf` → type: lecture, number: 1
- `Recitation_2.pptx` → type: recitation, number: 2
- `הרצאה 3.pdf` → type: lecture, number: 3
- Use regex to find the number. Detect "recit"/"תרגול"/"tutorial" for recitations.

### Step 3: Send to Claude API
- Load `system_prompt.md` as the system message
- Send the extracted text + metadata as the user message
- Ask Claude to return ONLY raw HTML (no markdown fences)
- Model: `claude-sonnet-4-20250514`, max_tokens: 16000

### Step 4: Save the HTML
- Strip any markdown code fences Claude might wrap around it
- Validate it contains `<!DOCTYPE html>`
- Save to `results/{filename}-summary.html`

### Step 5: Convert HTML → PDF
- Try **Playwright** first (headless Chromium — best quality, renders KaTeX JS)
  - MUST wait 2-3 seconds for KaTeX math to render before capturing
  - Use `page.pdf(format='A4', print_background=True)`
- Fallback to **Chrome headless** (`--headless --print-to-pdf`)
- Fallback to **wkhtmltopdf**
- If all fail, keep the HTML (it works fine in a browser) and log a warning
- Save to `results/{filename}-summary.pdf`

### Step 6: Move source file to `done/`
- Move the original PDF/PPTX from `generate/` to `done/`

### Step 7: Print status
- After all files: `COMPLETE: X succeeded, Y failed`

**If one file fails, keep going to the next. Never crash the whole run.**

---

## CLI interface

```bash
# Default (uses config.json defaults)
python summarize.py

# Override course name
python summarize.py "אלגברה לינארית 2"

# Override course name + university
python summarize.py "לוגיקה ותורת הקבוצות" "אוניברסיטת רייכמן"
```

Requires env var: `ANTHROPIC_API_KEY`

---

## config.json

```json
{
  "default_course": "מבני נתונים",
  "default_university": "אוניברסיטת רייכמן",
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 16000,
  "author": "Lia Mesika",
  "pdf_wait_ms": 2000
}
```

---

## requirements.txt

```
anthropic>=0.40.0
PyMuPDF>=1.24.0
python-pptx>=1.0.0
playwright>=1.40.0
```

After install: `playwright install chromium`

---

## NOW THE CRITICAL PART — the system_prompt.md

This is the system prompt that gets sent to Claude on every API call. It tells Claude exactly how to generate the HTML. **This file must be thorough and precise** — it's the difference between beautiful output and garbage.

### The prompt must tell Claude:

**Role:** You are a lecture summarizer engine. You receive extracted slide text and produce a comprehensive, beautifully designed HTML summary in Hebrew (RTL).

**Input:** file type (lecture/recitation), course name, number, university, raw text from all slides.

**Output:** A single self-contained HTML file. All CSS inline. No external assets except Google Fonts and KaTeX CDN.

### The HTML design system (include ALL of this in the prompt):

**Fonts:** `Noto Sans Hebrew` from Google Fonts (weights: 300, 400, 600, 700, 800)

**Color palette (CSS variables):**

| Variable | Value | What it's for |
|---|---|---|
| `--bg` | `#f5f0e8` | Page background (warm paper tone) |
| `--card-bg` | `#ffffff` | Section cards |
| `--primary` | `#1a3a5c` | Section headings |
| `--accent` | `#c0392b` | TOC border, accents |
| `--green` | `#2e7d32` | Examples, h3 sub-headings |
| `--purple` | `#6a1b9a` | Theorems |
| `--blue` | `#1565c0` | Proofs |
| `--teal` | `#00838f` | Definitions |

**Box types — this is the core of the design.** Each content type gets a visually distinct box:

| CSS class | Border color | Background | Label color | Use for |
|---|---|---|---|---|
| `.def-box` | teal `#00838f` | `#fef9f0` | teal | Definitions — formal concept introductions |
| `.thm-box` | purple `#6a1b9a` | `#f3e8ff` | purple | Theorems, claims, lemmas |
| `.proof-box` | blue `#1565c0` | `#f0f4fe` | blue | Proofs, step-by-step derivations |
| `.example-box` | green `#2e7d32` | `#f2f9f2` | green | Worked examples |
| `.note-box` | orange `#f57f17` | `#fff8e1` | orange | Important remarks, warnings, tips |
| `.question-box` | orange `#f57f17` | `#fff8e1` | orange | Exercises, questions for the student |
| `.solution-box` | green `#388e3c` | `#e8f5e9` | green | Solutions to questions |
| `.code-box` | — | dark `#1e1e2e` | gray | Pseudocode/code. **MUST be LTR, monospace** |

Every box has a `.label` div at the top with the type name (e.g., "הגדרה:", "משפט:", "הוכחה:") in the matching color.

**Box CSS pattern (repeat for each type):**
```css
.def-box {
    background: #fef9f0;
    border-right: 4px solid var(--teal);
    padding: 16px 20px;
    border-radius: 8px;
    margin: 14px 0;
}
.def-box .label {
    color: var(--teal);
    font-weight: 700;
    margin-bottom: 6px;
    font-size: 1.05em;
}
```

**Layout components to include in the CSS:**
- `.header` — gradient banner (`linear-gradient(135deg, var(--primary), #2c5f8a)`), white text, centered, rounded
- `.toc` — white card, red-right-border, numbered `<ol>` with anchor links
- `.section` — white card, `<h2>` with bottom border, unique `id` for TOC linking
- `.two-col` — CSS grid 2 columns, collapses to 1 on mobile
- `.arrow-chain` — flex row of boxes with `→` arrows between (for summary flow diagrams, LTR)
- `.math-block` — centered math, LTR direction, larger font
- `.footer` — centered, muted text
- Responsive: at `max-width: 600px`, two-col → one-col, smaller fonts/padding

**Math rendering:**
- KaTeX loaded from CDN (CSS + JS + auto-render)
- Inline math: `\( ... \)`
- Display math: `\[ ... \]` or `$$ ... $$`
- Auto-render script at the bottom of `<body>`

**The HTML skeleton the prompt must specify:**
```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | {course}</title>
    <!-- Google Fonts link -->
    <!-- KaTeX CSS -->
    <!-- KaTeX JS + auto-render JS -->
    <style>
        /* ALL CSS variables + all box classes + all layout classes */
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="lecture-num">{course} - {university}</div>
            <h1>{type_hebrew} {number} - {title}</h1>
            <div class="subtitle">{english_subtitle}</div>
        </div>
        <div class="toc">
            <h2>תוכן עניינים</h2>
            <ol><li><a href="#section-id">...</a></li>...</ol>
        </div>
        <div class="section" id="..."><h2>1. ...</h2>...</div>
        <div class="section" id="..."><h2>2. ...</h2>...</div>
        <!-- ... more sections ... -->
        <div class="footer">
            {type} {number} - {title} | {course} | {university}
            <br>by {author}
        </div>
    </div>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: "\\(", right: "\\)", display: false},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "$$", right: "$$", display: true}
                ],
                throwOnError: false
            });
        });
    </script>
</body>
</html>
```

### Content rules (must be in the system prompt):

1. **Cover EVERY slide.** Nothing educational gets skipped. Administrative-only slides (welcome, agenda with no content) can be skipped.
2. **Use the right box type.** A definition goes in def-box. A theorem goes in thm-box. A proof goes in proof-box. Don't mix them up.
3. **Include all proofs step by step.** Don't summarize proofs into one line.
4. **All pseudocode/code in code-box** with `direction: ltr; text-align: left; font-family: monospace`.
5. **All math in KaTeX notation** — `\(` for inline, `\[` for display.
6. **RTL/LTR rules:**
   - Page default is RTL (Hebrew)
   - Code boxes: ALWAYS LTR
   - Math blocks: ALWAYS LTR
   - Hebrew text that starts with English terms: stays RTL, English is just inline
7. **Organize into 8-15 logical sections**, numbered sequentially. TOC at top links to each.
8. **Always end with a summary section** containing:
   - An arrow-chain showing topic flow (LTR, English labels in boxes)
   - Bullet-point list of key takeaways in Hebrew
9. **No emojis, no external images, no JS beyond KaTeX.**
10. **Footer format:** `{type} {number} - {title} | {course} | {university}` then `<br>by {author}`

### Quality checklist (include at end of system prompt):
- [ ] Every slide's content is represented
- [ ] Correct box types throughout
- [ ] All code is LTR in code-box
- [ ] All math uses KaTeX delimiters
- [ ] TOC links match section IDs
- [ ] HTML is self-contained (opens in any browser)
- [ ] Hebrew text flows naturally RTL
- [ ] Footer includes author credit
- [ ] Mobile-readable

---

## Error handling requirements

| Situation | What to do |
|---|---|
| No `ANTHROPIC_API_KEY` env var | Print: "Set it with: export ANTHROPIC_API_KEY='...'" and exit |
| `generate/` folder is empty | Print helpful message, exit cleanly (exit code 0) |
| PDF extraction fails | Log error, skip this file, continue to next |
| PPTX extraction fails | Log error, skip this file, continue to next |
| Claude API call fails | Log error + status code, skip file, continue |
| Claude returns non-HTML | Log warning, skip PDF step, save raw response for debugging |
| PDF conversion fails | Keep the HTML (it's usable!), log which converters were tried |
| File move to done/ fails | Log error, don't crash |

**Golden rule: never crash on a single file failure. Always process remaining files.**

---

## Expected output example

```
$ ls generate/
lecture1.pdf  Recitation_2.pptx

$ python summarize.py "מבני נתונים"

============================================================
  LECTURE SUMMARIZER
============================================================

Course: מבני נתונים
University: אוניברסיטת רייכמן
Looking in: ./generate/

Found 2 file(s) to process:
  - lecture1.pdf
  - Recitation_2.pptx

============================================================
Processing: lecture1.pdf
============================================================
  [1/4] Extracting text...
  Extracted 80 slides
  Type: lecture, Number: 1
  [2/4] Generating HTML summary via Claude API...
  Calling Claude API (this may take 1-2 minutes)...
  [3/4] HTML saved: results/lecture1-summary.html
  [4/4] Converting to PDF...
  PDF saved: results/lecture1-summary.pdf
  Source moved to: done/lecture1.pdf
  DONE!

============================================================
Processing: Recitation_2.pptx
============================================================
  [1/4] Extracting text...
  Extracted 37 slides
  Type: recitation, Number: 2
  [2/4] Generating HTML summary via Claude API...
  Calling Claude API (this may take 1-2 minutes)...
  [3/4] HTML saved: results/Recitation_2-summary.html
  [4/4] Converting to PDF...
  PDF saved: results/Recitation_2-summary.pdf
  Source moved to: done/Recitation_2.pptx
  DONE!

============================================================
  COMPLETE: 2 succeeded, 0 failed
  Results in: ./results/
  Originals in: ./done/
============================================================
```

---

## Why things are designed this way (so you understand the reasoning)

1. **Self-contained HTML** — no build step needed. Open in any browser. KaTeX from CDN handles math.
2. **HTML first, then PDF** — HTML is editable and searchable. PDF is just the export format.
3. **Playwright for PDF** — it runs real Chromium, so KaTeX JavaScript actually executes and math renders. Simple converters can't run JS.
4. **One big system prompt** — the LLM needs ALL the CSS + rules in one shot. Splitting degrades quality.
5. **Sequential processing** — each API call takes 30-90s. Parallel would hit rate limits. Sequential is simpler and reliable.
6. **Move to done/ not delete** — safety. Can always regenerate from the original.

---

## Cost estimate (FYI)

- Average lecture (60 slides): ~$0.13 per summary
- 10 lectures per course: ~$1.30 total

---

## Deliverables

Please give me:
1. `summarize.py` — complete, working, with all the logic above
2. `system_prompt.md` — the full system prompt with ALL CSS, ALL rules, ALL the HTML skeleton
3. `config.json` — with sensible defaults
4. `requirements.txt` — all dependencies

The code should be **clean, well-commented, and production-ready**. I want to `pip install` and run it immediately.
