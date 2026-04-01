# Lecture Summarizer

Drop lecture PDFs/PPTXs into `generate/` → get beautiful HTML+PDF summaries in `results/`.

## Setup

```bash
pip install -r requirements.txt
playwright install chromium   # for PDF export
export ANTHROPIC_API_KEY='sk-ant-...'
```

## Usage

```bash
# Default course: מבני נתונים
python summarize.py

# Custom course:
python summarize.py "אלגברה לינארית 2"
python summarize.py "לוגיקה ותורת הקבוצות" "אוניברסיטת רייכמן"
```

## Flow

```
generate/          ← Drop files here
    lecture1.pdf
    Recitation_2.pptx

    ↓ python summarize.py

results/           ← Summaries appear here
    lecture1-summary.html
    lecture1-summary.pdf
    Recitation_2-summary.html
    Recitation_2-summary.pdf

done/              ← Processed originals moved here
    lecture1.pdf
    Recitation_2.pptx
```

## File naming

The script auto-detects type and number from filename:
- `lecture1.pdf` → הרצאה 1
- `Recitation_2.pdf` → תרגול 2
- `הרצאה 3.pdf` → הרצאה 3
