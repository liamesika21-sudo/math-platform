import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    // Security: ensure path is within the files directory
    if (!filePath.startsWith('/Users/liamesika/Desktop/infi/study-app/files/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
