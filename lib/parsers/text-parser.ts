import { DocumentSection, DocumentParagraph } from '../types';

export interface ParsedDocumentResult {
  raw_text: string;
  sections: DocumentSection[];
  paragraphs: DocumentParagraph[];
  page_count: number;
}

export function parseRawTextDocument(content: string): ParsedDocumentResult {
  const lines = content.split(/\r?\n/);
  const sections: DocumentSection[] = [];
  const paragraphs: DocumentParagraph[] = [];

  let currentSectionTitle = 'Introduction / Main Body';
  let currentSectionContent: string[] = [];
  let paragraphIndex = 0;
  let estimatedPage = 1;
  let wordCount = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check line for estimated page counter
    wordCount += trimmed.split(/\s+/).length;
    if (wordCount > 350) {
      estimatedPage++;
      wordCount = 0;
    }

    // Heading detection (Markdown `#`, `##`, or ALL CAPS / Section Keywords)
    const isHeading = 
      /^#{1,4}\s+/.test(trimmed) ||
      /^(abstract|introduction|related work|methodology|methods|experimental setup|results|discussion|conclusion|references)$/i.test(trimmed);

    if (isHeading) {
      if (currentSectionContent.length > 0) {
        sections.push({
          section_id: `sec-${sections.length + 1}`,
          title: currentSectionTitle,
          content: currentSectionContent.join('\n\n'),
          start_page: Math.max(1, estimatedPage - 1),
          end_page: estimatedPage
        });
        currentSectionContent = [];
      }
      currentSectionTitle = trimmed.replace(/^#{1,4}\s+/, '');
    } else {
      currentSectionContent.push(trimmed);
      paragraphs.push({
        paragraph_id: `p-${paragraphs.length + 1}`,
        section: currentSectionTitle,
        page_number: estimatedPage,
        paragraph_index: paragraphIndex++,
        text: trimmed
      });
    }
  });

  if (currentSectionContent.length > 0) {
    sections.push({
      section_id: `sec-${sections.length + 1}`,
      title: currentSectionTitle,
      content: currentSectionContent.join('\n\n'),
      start_page: Math.max(1, estimatedPage - 1),
      end_page: estimatedPage
    });
  }

  return {
    raw_text: content,
    sections,
    paragraphs,
    page_count: estimatedPage
  };
}
