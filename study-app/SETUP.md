# Setup Guide - Infi Study App

## ✅ System is Ready

The app is now running at **http://localhost:3000**

## 🔧 How It Works

### **NO UPLOAD UI**
The system has been completely rebuilt to load files ONLY from a local directory:

```
/Users/liamesika/Desktop/infi/study-app/files
```

### **Step 1: Add Your PDF Files**

Copy all your course materials to the `files` directory:

```bash
# Example - copy your files
cp /Users/liamesika/Desktop/infi/lecture/*.pdf /Users/liamesika/Desktop/infi/study-app/files/
cp /Users/liamesika/Desktop/infi/recitation/*.pdf /Users/liamesika/Desktop/infi/study-app/files/
cp /Users/liamesika/Desktop/infi/hw/*.pdf /Users/liamesika/Desktop/infi/study-app/files/
```

The system auto-detects file types from filenames:
- Files with "lecture", "הרצאה", or "lec" → **Lecture**
- Files with "tutorial", "תרגול", or "rec" → **Tutorial**
- Files with "hw", "homework", or "תרגיל" → **Homework**
- Files with "exam", "מבחן", or "test" → **Exam**

### **Step 2: Open Source Monitor**

1. Go to http://localhost:3000/library
2. Click **"Scan"** to detect all PDF files
3. Click **"Process All Files"** to extract content

### **Step 3: Processing**

The system uses a **Web Worker** to process PDFs without freezing the UI.

For each file, it:
- ✅ Extracts text **VERBATIM** (exact quotes, no rephrasing)
- ✅ Stores exact page numbers
- ✅ Identifies definitions, theorems, proofs, techniques
- ✅ Extracts questions from homework/exams
- ✅ Auto-tags by topic (limits, derivatives, integrals, etc.)

### **Step 4: Explore**

After processing, all pages work automatically:
- **Knowledge Base** - All definitions/theorems/proofs (verbatim!)
- **Likelihood Engine** - What's most likely to appear on exam
- **Homework Predictor** - Which HW questions will be on exam
- **Exam Analysis** - Patterns from past exams
- **Practice Mode** - Flashcards and drills
- **Study Roadmap** - Auto-generated study plan

## 🎯 Key Features

### **VERBATIM EXTRACTION**
Every definition, theorem, and proof is shown **exactly as written** in the PDF.
- No paraphrasing
- No "cleaning up"
- Source reference: filename + exact page number

### **AUTOMATIC CATEGORIZATION**
Files are automatically categorized from filenames:
```
lecture1.pdf → L01 (Lecture)
hw3.pdf → HW03 (Homework)
exam_2022A.pdf → EXAM_2022A (Exam)
```

### **WEB WORKER PROCESSING**
All PDF processing happens in a background worker thread.
- UI never freezes
- Process multiple files in sequence
- Real-time progress updates

### **OFFLINE-FIRST**
All data stored in IndexedDB (browser database).
- Works without internet (after first load)
- No server needed
- Complete privacy

## 📂 Directory Structure

```
study-app/
├── files/              ← PUT ALL PDF FILES HERE
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── files/
│   │   │       ├── scan/    ← Scans files directory
│   │   │       └── read/    ← Reads PDF files
│   │   ├── library/         ← SOURCE MONITOR PAGE
│   │   ├── knowledge/
│   │   ├── likelihood/
│   │   ├── homework/
│   │   ├── exams/
│   │   ├── practice/
│   │   └── roadmap/
│   └── ...
└── public/
    └── pdf-worker.js   ← Web Worker for PDF processing
```

## 🚨 Important Rules

### **SOURCE OF TRUTH**
The ONLY source of data is:
```
/Users/liamesika/Desktop/infi/study-app/files
```

### **FAILURE CONDITIONS**
❌ Any text paraphrased instead of verbatim
❌ Any page number incorrect
❌ Any data not from `/files` directory
❌ UI freezing during processing

### **ACCEPTANCE TESTS**
✅ All definitions/theorems shown EXACTLY as in PDF
✅ Every item has correct filename + page number
✅ Questions properly extracted from HW/exams
✅ Math expressions handled safely (show PDF region if can't extract)
✅ Processing never freezes UI

## 🔄 Workflow

```
1. User adds PDFs to /files directory
2. User clicks "Scan" in Source Monitor
3. System detects all PDF files
4. User clicks "Process All"
5. Web Worker extracts content (VERBATIM)
6. IndexedDB stores all data
7. All pages update automatically
8. User studies based on likelihood analysis
```

## 🛠️ Troubleshooting

**No files showing?**
- Check that PDFs are in `/Users/liamesika/Desktop/infi/study-app/files`
- Click "Scan" button to refresh

**Processing stuck?**
- Check browser console for errors
- Worker processes files sequentially (not parallel)
- Large files may take time

**Extraction quality poor?**
- Some PDFs with complex layouts may not extract perfectly
- Scanned PDFs (images) won't extract text
- Use original digital PDFs when possible

## 📖 Next Steps

1. **Add your PDFs** to the `files` directory
2. **Open Source Monitor** at http://localhost:3000/library
3. **Process all files**
4. **Explore** the Knowledge Base, Likelihood Engine, etc.
5. **Start studying!**

---

**App is running:** http://localhost:3000
**Source Monitor:** http://localhost:3000/library

Good luck on your exam! 🎓
