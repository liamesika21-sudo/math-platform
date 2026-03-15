import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { extractText, getDocumentProxy } from 'unpdf';

// Server-side PDF text extraction using unpdf (no worker needed)
export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }

    // Read PDF file
    const buffer = await readFile(path);

    // Get document proxy
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const pageCount = pdf.numPages;

    // Extract text from all pages
    const { text: fullText } = await extractText(new Uint8Array(buffer), { mergePages: true });

    // Also get per-page text
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: unknown) => (item as { str?: string }).str || '')
        .join(' ');
      pages.push({
        pageNumber: i,
        text: pageText,
        lines: pageText.split('\n').filter((l: string) => l.trim()),
      });
    }

    return NextResponse.json({
      success: true,
      pageCount,
      fullText,
      pages,
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
