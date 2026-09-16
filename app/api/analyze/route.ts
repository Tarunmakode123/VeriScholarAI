import { NextRequest, NextResponse } from 'next/server';
import { parsePdfBuffer } from '../../../lib/parsers/pdf-parser';
import { parseDocxBuffer } from '../../../lib/parsers/docx-parser';
import { parseRawTextDocument, ParsedDocumentResult } from '../../../lib/parsers/text-parser';
import { runDocumentAnalysisPipeline } from '../../../lib/ai/pipeline';
import { DocumentMetadata, DocumentSection, DocumentParagraph } from '../../../lib/types';
import { saveReportToStore } from '../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const rawTextOverride = formData.get('raw_text') as string | null;

    const title = (formData.get('title') as string) || file?.name || 'Academic Submission';
    const author_name = (formData.get('author_name') as string) || 'Academic Author';
    const department = (formData.get('department') as string) || 'Faculty Review';
    const course = (formData.get('course') as string) || 'Course Review';
    const semester = (formData.get('semester') as string) || 'Current Term';
    const faculty_reviewer = (formData.get('faculty_reviewer') as string) || 'Authorized Faculty Reviewer';
    const document_type = ((formData.get('document_type') as string) || 'Research Paper') as any;

    let textContent = rawTextOverride || '';
    let fileType: 'PDF' | 'DOCX' | 'TXT' | 'MD' = 'TXT';
    let fileSize = file ? file.size : textContent.length;

    let parsedResult: ParsedDocumentResult = {
      raw_text: textContent,
      sections: [] as DocumentSection[],
      paragraphs: [] as DocumentParagraph[],
      page_count: 1
    };

    if (file) {
      const fileName = file.name.toLowerCase();
      const buffer = Buffer.from(await file.arrayBuffer());

      if (fileName.endsWith('.pdf')) {
        fileType = 'PDF';
        parsedResult = await parsePdfBuffer(buffer);
      } else if (fileName.endsWith('.docx')) {
        fileType = 'DOCX';
        parsedResult = await parseDocxBuffer(buffer);
      } else if (fileName.endsWith('.md')) {
        fileType = 'MD';
        parsedResult = parseRawTextDocument(buffer.toString('utf-8'));
      } else {
        fileType = 'TXT';
        parsedResult = parseRawTextDocument(buffer.toString('utf-8'));
      }
    } else if (textContent) {
      parsedResult = parseRawTextDocument(textContent);
    } else {
      return NextResponse.json({ error: 'No file or document text provided' }, { status: 400 });
    }

    const docId = `doc-${Date.now()}`;
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const hasGeminiKey = Boolean(geminiKey && geminiKey.trim() !== '' && !geminiKey.includes('your_gemini_api_key'));

    const meta: DocumentMetadata = {
      id: docId,
      title: title,
      original_filename: file?.name || `${title.replace(/\s+/g, '_')}.txt`,
      file_type: fileType,
      file_size: fileSize,
      document_type: document_type,
      author_name,
      department,
      course,
      semester,
      faculty_reviewer,
      uploaded_at: new Date().toISOString(),
      page_count: parsedResult.page_count,
      mode: hasGeminiKey ? 'LIVE_ANALYSIS' : 'LIVE_ANALYSIS'
    };

    const report = await runDocumentAnalysisPipeline(
      meta,
      parsedResult.raw_text,
      parsedResult.sections,
      parsedResult.paragraphs
    );

    saveReportToStore(report);

    return NextResponse.json({
      success: true,
      report_id: report.report_id,
      document_id: docId,
      report
    });
  } catch (error: any) {
    console.error('API /api/analyze error:', error);
    return NextResponse.json({ error: error.message || 'Analysis processing failed' }, { status: 500 });
  }
}
