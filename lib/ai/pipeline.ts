import { 
  ResearchIntegrityReport, 
  DocumentMetadata, 
  DocumentSection, 
  DocumentParagraph,
  UnifiedFinding,
  SeverityLevel
} from '../types';
import { generateStructuredGeminiJSON } from './gemini-client';
import { SYSTEM_ACADEMIC_INTEGRITY_PROMPT, buildDocumentAnalysisPrompt } from './prompts';

interface GeminiAnalysisResponse {
  summary: string;
  priority: SeverityLevel;
  citations: any[];
  references: any[];
  claims: any[];
  similarity_matches: any[];
  consistency_findings: any[];
  review_indicators: any[];
}

export async function runDocumentAnalysisPipeline(
  meta: DocumentMetadata,
  rawText: string,
  sections: DocumentSection[],
  paragraphs: DocumentParagraph[]
): Promise<ResearchIntegrityReport> {
  const reportId = `report-${Date.now()}`;
  const now = new Date().toISOString();

  // 1. Try server-side Gemini API analysis
  const prompt = buildDocumentAnalysisPrompt(meta.title, rawText);
  const geminiResult = await generateStructuredGeminiJSON<GeminiAnalysisResponse>(
    prompt,
    SYSTEM_ACADEMIC_INTEGRITY_PROMPT
  );

  if (geminiResult) {
    const unifiedFindings: UnifiedFinding[] = [];
    let findingCounter = 1;

    // Convert consistency findings
    (geminiResult.consistency_findings || []).forEach((c) => {
      unifiedFindings.push({
        id: `fnd-${findingCounter++}`,
        type: 'consistency',
        title: c.title || 'Internal Consistency Issue',
        severity: (c.severity as SeverityLevel) || 'HIGH',
        page: 1,
        section: c.location_a || 'Document Section',
        text_snippet: `${c.statement_a || ''} vs ${c.statement_b || ''}`,
        reason: c.explanation || 'Conflict detected between document sections.',
        evidence: `Conflict between ${c.location_a} and ${c.location_b}`,
        action: { status: 'UNREVIEWED' }
      });
    });

    // Convert reference issues
    (geminiResult.references || []).filter(r => r.verification_status === 'RED' || r.verification_status === 'AMBER').forEach((r) => {
      unifiedFindings.push({
        id: `fnd-${findingCounter++}`,
        type: 'reference',
        title: `Reference Issue: ${r.title || 'Bibliographic Record'}`,
        severity: r.verification_status === 'RED' ? 'HIGH' : 'MEDIUM',
        page: 1,
        section: 'References',
        text_snippet: r.raw_text || '',
        reason: r.verification_reason || 'Could not verify reference metadata.',
        evidence: r.doi ? `DOI: ${r.doi}` : 'Metadata registry search',
        action: { status: 'UNREVIEWED' }
      });
    });

    // Convert claim issues
    (geminiResult.claims || []).filter(cl => cl.support_status !== 'SUPPORTED').forEach((cl) => {
      unifiedFindings.push({
        id: `fnd-${findingCounter++}`,
        type: 'claim',
        title: `Claim Support Issue (${cl.support_status})`,
        severity: cl.importance === 'high' ? 'HIGH' : 'MEDIUM',
        page: cl.location?.page || 1,
        section: cl.location?.section || 'Main Text',
        text_snippet: cl.claim_text || '',
        reason: cl.evidence_summary || 'Claim support requires human review.',
        evidence: `Assigned citations: ${cl.citation_ids?.join(', ') || 'None'}`,
        action: { status: 'UNREVIEWED' }
      });
    });

    // Convert similarity findings
    (geminiResult.similarity_matches || []).forEach((s) => {
      unifiedFindings.push({
        id: `fnd-${findingCounter++}`,
        type: 'similarity',
        title: `Potential Similarity (${s.similarity_level})`,
        severity: s.similarity_level === 'HIGH' ? 'HIGH' : s.similarity_level === 'MODERATE' ? 'MEDIUM' : 'LOW',
        page: s.location?.page || 1,
        section: s.location?.section || 'Main Text',
        text_snippet: s.submitted_passage || '',
        reason: s.matched_concept || 'Passage exhibits structural overlap.',
        evidence: `Potential Source: ${s.potential_source || 'Web/Archive source'}`,
        action: { status: 'UNREVIEWED' }
      });
    });

    // Convert review indicators
    (geminiResult.review_indicators || []).forEach((ind) => {
      unifiedFindings.push({
        id: `fnd-${findingCounter++}`,
        type: 'indicator',
        title: ind.title || 'Review Indicator',
        severity: (ind.severity as SeverityLevel) || 'MEDIUM',
        page: ind.location?.page || 1,
        section: ind.location?.section || 'Main Text',
        text_snippet: ind.title || '',
        reason: ind.reason || 'Item requires faculty review.',
        action: { status: 'UNREVIEWED' }
      });
    });

    return {
      report_id: reportId,
      document: meta,
      analysis_date: now,
      mode: meta.mode,
      priority: geminiResult.priority || 'MODERATE',
      summary: geminiResult.summary || 'Document analysis completed successfully.',
      counts: {
        similarity: (geminiResult.similarity_matches || []).length,
        references_checked: (geminiResult.references || []).length,
        references_flagged: (geminiResult.references || []).filter(r => r.verification_status !== 'GREEN').length,
        claims_analyzed: (geminiResult.claims || []).length,
        claims_unclear: (geminiResult.claims || []).filter(c => c.support_status !== 'SUPPORTED').length,
        citation_issues: (geminiResult.citations || []).filter(c => c.confidence === 'low').length,
        consistency_issues: (geminiResult.consistency_findings || []).length,
        review_indicators: (geminiResult.review_indicators || []).length
      },
      sections,
      paragraphs,
      citations: geminiResult.citations || [],
      references: geminiResult.references || [],
      claims: geminiResult.claims || [],
      similarity_matches: geminiResult.similarity_matches || [],
      consistency_findings: geminiResult.consistency_findings || [],
      review_indicators: geminiResult.review_indicators || [],
      findings: unifiedFindings
    };
  }

  // 2. Fallback heuristic parser if Gemini API is not configured or fails
  const citationMatches = rawText.match(/\[\d+\]|\([A-Z][a-z]+(?:\s+et\s+al\.)?,\s*\d{4}\)/g) || [];
  const extractedCitations = Array.from(new Set(citationMatches)).map((c, i) => ({
    citation_id: `cit-${i + 1}`,
    raw_text: c,
    location: { page: 1, section: 'Main Text' },
    associated_text: `Citation occurrence: ${c}`,
    confidence: 'high' as const
  }));

  const refLines = rawText.split(/\r?\n/).filter(line => /^\[\d+\]|^\d+\.\s+[A-Z]/.test(line.trim()));
  const extractedReferences = refLines.map((ref, i) => ({
    reference_id: `ref-${i + 1}`,
    raw_text: ref,
    title: ref.slice(0, 50),
    verification_status: 'GRAY' as const,
    verification_reason: 'Live Gemini API key not configured on server. Reference verification requires API key.'
  }));

  const fallbackFindings: UnifiedFinding[] = [
    {
      id: 'fnd-fb-1',
      type: 'reference',
      title: 'Server API Notice: Gemini API Key Not Configured',
      severity: 'LOW',
      page: 1,
      section: 'System Notice',
      text_snippet: 'Live document text extracted successfully.',
      reason: 'Gemini API key is missing on the server. Heuristic extraction completed. Configure GEMINI_API_KEY in server environment for full AI verification.',
      action: { status: 'UNREVIEWED' }
    }
  ];

  return {
    report_id: reportId,
    document: meta,
    analysis_date: now,
    mode: meta.mode,
    priority: 'LOW',
    summary: `Live text parsing extracted ${paragraphs.length} paragraphs, ${extractedCitations.length} citations, and ${extractedReferences.length} bibliography references. Full AI claim and reference verification is operating in heuristic mode (Gemini API key recommended).`,
    counts: {
      similarity: 0,
      references_checked: extractedReferences.length,
      references_flagged: 0,
      claims_analyzed: 0,
      claims_unclear: 0,
      citation_issues: 0,
      consistency_issues: 0,
      review_indicators: 1
    },
    sections,
    paragraphs,
    citations: extractedCitations,
    references: extractedReferences,
    claims: [],
    similarity_matches: [],
    consistency_findings: [],
    review_indicators: [],
    findings: fallbackFindings
  };
}
