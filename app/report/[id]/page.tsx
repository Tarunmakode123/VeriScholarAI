'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '../../../components/Sidebar';
import { DisclaimerBanner } from '../../../components/DisclaimerBanner';
import { ModeBadge, SeverityBadge, ReviewStatusBadge } from '../../../components/StatusBadge';
import { SplitScreenViewer } from '../../../components/SplitScreenViewer';
import { SYNTHETIC_DEMO_REPORT } from '../../../lib/demo-data';
import { ResearchIntegrityReport, ReviewStatus } from '../../../lib/types';
import { 
  FileText, 
  BarChart3, 
  CheckSquare, 
  Search, 
  AlertTriangle, 
  FileCheck2, 
  Layers, 
  CheckCircle2,
  Printer,
  Calendar,
  User,
  Building2,
  Award
} from 'lucide-react';

export default function ReportPage() {
  const params = useParams();
  const id = params?.id as string;
  const [report, setReport] = useState<ResearchIntegrityReport | null>(null);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SPLIT' | 'SIMILARITY' | 'CITATIONS' | 'REFERENCES' | 'CLAIMS' | 'CONSISTENCY' | 'INDICATORS'>('OVERVIEW');

  useEffect(() => {
    if (!id) return;

    if (id === 'demo-report-2026-001') {
      setReport(SYNTHETIC_DEMO_REPORT);
      return;
    }

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`report_${id}`);
      if (cached) {
        try {
          setReport(JSON.parse(cached));
          return;
        } catch (e) {
          console.error(e);
        }
      }

      const latest = localStorage.getItem('latest_report');
      if (latest) {
        try {
          const parsed = JSON.parse(latest);
          if (parsed.report_id === id || parsed.document?.id === id) {
            setReport(parsed);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Attempt API fetch if not in local storage
    fetch(`/api/report/${id}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Report API fetch failed');
      })
      .then((data) => {
        if (data && data.report_id) {
          setReport(data);
        } else {
          setReport(SYNTHETIC_DEMO_REPORT);
        }
      })
      .catch(() => {
        setReport(SYNTHETIC_DEMO_REPORT);
      });
  }, [id]);

  if (!report) {
    return (
      <div className="flex min-h-screen bg-surface-light">
        <Sidebar />
        <main className="flex-1 p-8 text-center text-xs text-charcoal-600">
          Loading report...
        </main>
      </div>
    );
  }

  const handleUpdateFindingStatus = (findingId: string, status: ReviewStatus, note?: string) => {
    if (!report) return;
    const updated = { ...report };
    const target = updated.findings.find(f => f.id === findingId);
    if (target) {
      target.action.status = status;
      if (note !== undefined) target.action.notes = note;
      setReport(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`report_${updated.report_id}`, JSON.stringify(updated));
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 max-w-7xl">
        {/* Report Header Lockup */}
        <div className="bg-white rounded-xl p-6 border border-surface-border shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                  VeriScholar AI
                </span>
                <ModeBadge mode={report.mode} />
              </div>
              <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
                Research Integrity Report
              </h1>
              <p className="text-xs text-charcoal-600">
                AI-Assisted Academic & Research Integrity Review
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] font-bold text-charcoal-600 block uppercase">Review Priority</span>
                <SeverityBadge severity={report.priority} />
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 border border-surface-border bg-white rounded-lg text-xs font-semibold text-charcoal-800 hover:bg-surface-light transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-charcoal-600" />
                Export
              </button>
            </div>
          </div>

          <DisclaimerBanner />

          {/* Document Metadata Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-light p-4 rounded-xl border border-surface-border text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Document Title</span>
              <span className="font-bold text-charcoal-900 line-clamp-1">{report.document.title}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Author / Student</span>
              <span className="font-medium text-charcoal-800">{report.document.author_name || 'N/A'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Document Type</span>
              <span className="font-medium text-charcoal-800">{report.document.document_type}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Department / Course</span>
              <span className="font-medium text-charcoal-800">{report.document.department || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Top Summary Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">Similarity</span>
            <div className="text-2xl font-extrabold text-charcoal-900">{report.counts.similarity}</div>
            <span className="text-[10px] text-charcoal-600">Passages identified</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">References</span>
            <div className="text-2xl font-extrabold text-charcoal-900">{report.counts.references_checked}</div>
            <span className="text-[10px] text-amber-600 font-medium">{report.counts.references_flagged} require review</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">Claims</span>
            <div className="text-2xl font-extrabold text-charcoal-900">{report.counts.claims_analyzed}</div>
            <span className="text-[10px] text-purple-600 font-medium">{report.counts.claims_unclear} support unclear</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">Citations</span>
            <div className="text-2xl font-extrabold text-charcoal-900">{report.citations.length}</div>
            <span className="text-[10px] text-charcoal-600">{report.counts.citation_issues} mismatches</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">Consistency</span>
            <div className="text-2xl font-extrabold text-red-600">{report.counts.consistency_issues}</div>
            <span className="text-[10px] text-red-600 font-medium">Cross-section issues</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-charcoal-600 uppercase">Indicators</span>
            <div className="text-2xl font-extrabold text-charcoal-900">{report.counts.review_indicators}</div>
            <span className="text-[10px] text-charcoal-600">Review indicators</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-surface-border overflow-x-auto bg-white rounded-xl px-2 pt-2 shadow-2xs">
          {[
            { id: 'OVERVIEW', label: 'Executive Summary' },
            { id: 'SPLIT', label: 'Split-Screen Document Viewer' },
            { id: 'CONSISTENCY', label: `Consistency (${report.consistency_findings.length})` },
            { id: 'REFERENCES', label: `References (${report.references.length})` },
            { id: 'CLAIMS', label: `Claims (${report.claims.length})` },
            { id: 'SIMILARITY', label: `Similarity (${report.similarity_matches.length})` },
            { id: 'INDICATORS', label: `Review Indicators (${report.review_indicators.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-brand-500 text-brand-600 bg-brand-50/20'
                  : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Views */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-charcoal-900">Analysis Executive Summary</h3>
              <p className="text-xs text-charcoal-800 leading-relaxed font-sans bg-surface-light p-4 rounded-xl border border-surface-border">
                {report.summary}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-charcoal-900">Key Review Findings Requiring Faculty Inspection</h3>
              <div className="space-y-3">
                {report.findings.map((f) => (
                  <div key={f.id} className="p-4 rounded-xl border border-surface-border flex items-start justify-between gap-4 bg-surface-light">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <SeverityBadge severity={f.severity} />
                        <span className="text-xs font-bold text-charcoal-900">{f.title}</span>
                      </div>
                      <p className="text-xs text-charcoal-700">{f.reason}</p>
                      <p className="text-[11px] text-charcoal-600 font-mono">Page {f.page} • {f.section}</p>
                    </div>
                    <ReviewStatusBadge status={f.action.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SPLIT' && (
          <SplitScreenViewer report={report} onUpdateFindingStatus={handleUpdateFindingStatus} />
        )}

        {activeTab === 'CONSISTENCY' && (
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal-900">Internal Cross-Section Inconsistency Audit</h3>
            <div className="space-y-4">
              {report.consistency_findings.map((con) => (
                <div key={con.finding_id} className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-red-900">{con.title}</h4>
                    <SeverityBadge severity={con.severity} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-surface-border">
                      <span className="font-bold text-charcoal-600 text-[10px] block uppercase">{con.location_a}</span>
                      <p className="italic text-charcoal-900">"{con.statement_a}"</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-surface-border">
                      <span className="font-bold text-charcoal-600 text-[10px] block uppercase">{con.location_b}</span>
                      <p className="italic text-charcoal-900">"{con.statement_b}"</p>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-800 bg-white p-3 rounded-lg border border-surface-border">
                    <span className="font-bold">Faculty Review Explanation:</span> {con.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'REFERENCES' && (
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal-900">Extracted Reference Bibliography Verification</h3>
            <div className="space-y-3">
              {report.references.map((ref) => (
                <div key={ref.reference_id} className="p-4 rounded-xl border border-surface-border bg-surface-light space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-charcoal-900">{ref.raw_text.slice(0, 40)}...</span>
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      ref.verification_status === 'GREEN' ? 'bg-emerald-100 text-emerald-800' :
                      ref.verification_status === 'RED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ref.verification_status}
                    </span>
                  </div>
                  <p className="text-charcoal-800 font-serif">{ref.raw_text}</p>
                  <p className="text-[11px] text-charcoal-600 font-sans">
                    <span className="font-bold">Verification Finding:</span> {ref.verification_reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CLAIMS' && (
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal-900">Substantive Claim & Citation Verification</h3>
            <div className="space-y-3">
              {report.claims.map((clm) => (
                <div key={clm.claim_id} className="p-4 rounded-xl border border-surface-border bg-surface-light space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal-900">Claim ({clm.claim_type})</span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
                      {clm.support_status}
                    </span>
                  </div>
                  <p className="italic text-charcoal-900 bg-white p-3 rounded-lg border border-surface-border">
                    "{clm.claim_text}"
                  </p>
                  <p className="text-charcoal-700">
                    <span className="font-bold">Evidence Summary:</span> {clm.evidence_summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'SIMILARITY' && (
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal-900">Potential Text & Structural Similarity Passages</h3>
            <div className="space-y-3">
              {report.similarity_matches.map((sim) => (
                <div key={sim.similarity_id} className="p-4 rounded-xl border border-surface-border bg-surface-light space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal-900">Potential Source: {sim.potential_source}</span>
                    <SeverityBadge severity={sim.similarity_level} />
                  </div>
                  <p className="italic text-charcoal-900 bg-white p-3 rounded-lg border border-surface-border">
                    "{sim.submitted_passage}"
                  </p>
                  <p className="text-charcoal-700 font-mono text-[11px]">
                    {sim.source_info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'INDICATORS' && (
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-charcoal-900">AI-Era & Methodological Review Indicators</h3>
            <div className="space-y-3">
              {report.review_indicators.map((ind) => (
                <div key={ind.indicator_id} className="p-4 rounded-xl border border-surface-border bg-surface-light space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-charcoal-900">{ind.title}</h4>
                    <SeverityBadge severity={ind.severity} />
                  </div>
                  <p className="text-charcoal-800">{ind.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
