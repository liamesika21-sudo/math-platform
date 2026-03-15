import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const FILES_DIR = '/Users/liamesika/Desktop/infi/study-app/files';

async function scanDirectoryRecursive(dir: string): Promise<any[]> {
  const pdfFiles = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await scanDirectoryRecursive(fullPath);
      pdfFiles.push(...subFiles);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      const stats = await stat(fullPath);
      pdfFiles.push({
        name: entry.name,
        path: fullPath,
        size: stats.size,
        modifiedAt: stats.mtime.toISOString(),
      });
    }
  }

  return pdfFiles;
}

export async function GET() {
  try {
    const pdfFiles = await scanDirectoryRecursive(FILES_DIR);
    return NextResponse.json({ files: pdfFiles });
  } catch (error) {
    console.error('Error scanning files:', error);
    return NextResponse.json({ error: 'Failed to scan files directory' }, { status: 500 });
  }
}
