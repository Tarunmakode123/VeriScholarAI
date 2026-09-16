import { parseRawTextDocument, ParsedDocumentResult } from './text-parser';

export async function parseDocxBuffer(buffer: Buffer): Promise<ParsedDocumentResult> {
  try {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    return parseRawTextDocument(result.value);
  } catch (error) {
    console.error('DOCX parsing error:', error);
    const raw = buffer.toString('utf-8');
    return parseRawTextDocument(raw);
  }
}
