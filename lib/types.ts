export type ExecutionMode = 'LIVE_ANALYSIS' | 'SYNTHETIC_DEMO';

export type ReviewStatus = 'UNREVIEWED' | 'REVIEWED' | 'NEEDS_CORRECTION' | 'DISMISSED';

export type SeverityLevel = 'HIGH' | 'MEDIUM' | 'MODERATE' | 'LOW';

export type ReferenceVerificationStatus = 'GREEN' | 'AMBER' | 'RED' | 'GRAY';

export type ClaimSupportStatus = 
  | 'SUPPORTED' 
  | 'PARTIALLY_SUPPORTED' 
  | 'NOT_SUPPORTED' 
  | 'UNCLEAR' 
  | 'SOURCE_UNAVAILABLE';

export interface DocumentMetadata {
  id: string;
  title: string;
  original_filename: string;
  file_type: 'PDF' | 'DOCX' | 'TXT' | 'MD';
  file_size: number;
  document_type: 
    | 'Research Paper' 
    | 'Assignment' 
    | 'Project Report' 
    | 'Thesis / Dissertation' 
    | 'Literature Review' 
    | 'Technical Report' 
    | 'Other';
  author_name?: string;
  department?: string;
  course?: string;
  semester?: string;
  faculty_reviewer?: string;
  uploaded_at: string;
  page_count?: number;
  mode: ExecutionMode;
}

export interface DocumentSection {
  section_id: string;
  title: string;
  content: string;
  start_page: number;
  end_page: number;
}

export interface DocumentParagraph {
  paragraph_id: string;
  section: string;
  page_number: number;
  paragraph_index: number;
  text: string;
}

export interface Citation {
  citation_id: string;
  raw_text: string;
  location: {
    page: number;
    section: string;
  };
  associated_text: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface Reference {
  reference_id: string;
  raw_text: string;
  title?: string;
  authors?: string[];
  year?: number;
  journal?: string;
  doi?: string;
  url?: string;
  verification_status: ReferenceVerificationStatus;
  verification_reason: string;
}

export interface Claim {
  claim_id: string;
  claim_text: string;
  location: {
    page: number;
    section: string;
  };
  claim_type: 'numerical' | 'scientific' | 'causal' | 'comparative' | 'prior_research';
  citation_ids: string[];
  importance: 'high' | 'medium' | 'low';
  support_status: ClaimSupportStatus;
  evidence_summary: string;
  confidence: number;
}

export interface SimilarityMatch {
  similarity_id: string;
  submitted_passage: string;
  potential_source: string;
  similarity_level: SeverityLevel;
  matched_concept: string;
  source_info: string;
  location: {
    page: number;
    section: string;
  };
}

export interface ConsistencyFinding {
  finding_id: string;
  title: string;
  location_a: string;
  location_b: string;
  statement_a: string;
  statement_b: string;
  inconsistency_type: 'numerical' | 'dataset' | 'metric' | 'experiment' | 'conclusion';
  severity: SeverityLevel;
  explanation: string;
}

export interface ReviewIndicator {
  indicator_id: string;
  title: string;
  location: {
    page: number;
    section: string;
  };
  reason: string;
  confidence: number;
  severity: SeverityLevel;
}

export interface ReviewAction {
  status: ReviewStatus;
  notes?: string;
  reviewer?: string;
  reviewed_at?: string;
}

export interface UnifiedFinding {
  id: string;
  type: 'similarity' | 'citation' | 'reference' | 'claim' | 'consistency' | 'indicator';
  title: string;
  severity: SeverityLevel;
  page: number;
  section: string;
  text_snippet: string;
  reason: string;
  evidence?: string;
  action: ReviewAction;
}

export interface ReportCounts {
  similarity: number;
  references_checked: number;
  references_flagged: number;
  claims_analyzed: number;
  claims_unclear: number;
  citation_issues: number;
  consistency_issues: number;
  review_indicators: number;
}

export interface ResearchIntegrityReport {
  report_id: string;
  document: DocumentMetadata;
  analysis_date: string;
  mode: ExecutionMode;
  priority: SeverityLevel;
  summary: string;
  counts: ReportCounts;
  sections: DocumentSection[];
  paragraphs: DocumentParagraph[];
  citations: Citation[];
  references: Reference[];
  claims: Claim[];
  similarity_matches: SimilarityMatch[];
  consistency_findings: ConsistencyFinding[];
  review_indicators: ReviewIndicator[];
  findings: UnifiedFinding[];
}
