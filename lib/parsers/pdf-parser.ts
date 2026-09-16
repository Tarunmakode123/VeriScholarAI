import { parseRawTextDocument, ParsedDocumentResult } from './text-parser';

export async function parsePdfBuffer(buffer: Buffer): Promise<ParsedDocumentResult> {
  try {
    // Dynamic import to prevent client bundle bundling issues
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(buffer);
    const parsed = parseRawTextDocument(data.text);
    return {
      ...parsed,
      page_count: data.numpages || parsed.page_count
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    // Fallback if binary extraction fails
    const raw = buffer.toString('utf-8');
    return parseRawTextDocument(raw);
  }
}
