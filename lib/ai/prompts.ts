export const SYSTEM_ACADEMIC_INTEGRITY_PROMPT = `
You are VeriScholar AI, an evidence-based academic research integrity review engine designed for university faculty and academic reviewers.

YOUR MANDATORY RULES:
1. NEVER invent or fabricate a source, citation, DOI, journal name, quotation, statistic, or evidence.
2. NEVER accuse a student or author of plagiarism, cheating, or academic misconduct.
3. Distinguish unavailable evidence from contradictory evidence. If evidence cannot be checked, mark it as SOURCE_UNAVAILABLE or UNCERTAIN rather than guessing.
4. Your purpose is strictly to assist faculty with evidence-based indicators for human review.
5. You MUST return ONLY valid JSON matching the exact schema requested.
`;

export function buildDocumentAnalysisPrompt(documentTitle: string, rawText: string): string {
  return `
Analyze the following academic document for research integrity review.

Document Title: "${documentTitle}"

Document Content:
"""
${rawText.slice(0, 25000)}
"""

Perform a comprehensive multi-stage audit and respond with a single JSON object containing:

1. "summary": Concise executive summary (3-4 sentences) summarizing citations, references, substantive claims, internal section discrepancies, and items requiring review.
2. "priority": "LOW" | "MODERATE" | "HIGH" (based on severity/count of findings requiring human review).
3. "citations": Array of extracted citations:
   [
     {
       "citation_id": "cit-1",
       "raw_text": "[1]",
       "location": { "page": 1, "section": "Introduction" },
       "associated_text": "...",
       "confidence": "high"
     }
   ]
4. "references": Array of extracted bibliography references:
   [
     {
       "reference_id": "ref-1",
       "raw_text": "[1] Smith et al...",
       "title": "...",
       "authors": ["..."],
       "year": 2024,
       "verification_status": "GREEN" | "AMBER" | "RED" | "GRAY",
       "verification_reason": "..."
     }
   ]
5. "claims": Array of substantive research/numerical/causal claims:
   [
     {
       "claim_id": "clm-1",
       "claim_text": "...",
       "location": { "page": 1, "section": "Abstract" },
       "claim_type": "numerical" | "scientific" | "causal" | "comparative" | "prior_research",
       "citation_ids": ["cit-1"],
       "importance": "high" | "medium" | "low",
       "support_status": "SUPPORTED" | "PARTIALLY_SUPPORTED" | "NOT_SUPPORTED" | "UNCLEAR" | "SOURCE_UNAVAILABLE",
       "evidence_summary": "...",
       "confidence": 0.9
     }
   ]
6. "similarity_matches": Array of potential text/concept similarity findings:
   [
     {
       "similarity_id": "sim-1",
       "submitted_passage": "...",
       "potential_source": "...",
       "similarity_level": "LOW" | "MODERATE" | "HIGH",
       "matched_concept": "...",
       "source_info": "...",
       "location": { "page": 1, "section": "..." }
     }
   ]
7. "consistency_findings": Array of internal cross-section inconsistencies (e.g., Abstract vs Results numerical conflicts):
   [
     {
       "finding_id": "con-1",
       "title": "...",
       "location_a": "Abstract (Page 1)",
       "location_b": "Results (Page 4)",
       "statement_a": "...",
       "statement_b": "...",
       "inconsistency_type": "numerical" | "dataset" | "metric" | "experiment" | "conclusion",
       "severity": "HIGH" | "MEDIUM" | "LOW",
       "explanation": "..."
     }
   ]
8. "review_indicators": Array of AI-era or methodological review indicators:
   [
     {
       "indicator_id": "ind-1",
       "title": "...",
       "location": { "page": 1, "section": "..." },
       "reason": "...",
       "confidence": 0.85,
       "severity": "HIGH" | "MEDIUM" | "LOW"
     }
   ]
`;
}
