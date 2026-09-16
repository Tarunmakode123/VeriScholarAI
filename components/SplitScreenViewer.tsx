'use client';

import React, { useState } from 'react';
import { ResearchIntegrityReport, UnifiedFinding, ReviewStatus } from '../lib/types';
import { SeverityBadge, ReviewStatusBadge } from './StatusBadge';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Edit3, 
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  Printer
} from 'lucide-react';

interface SplitScreenViewerProps {
  report: ResearchIntegrityReport;
  onUpdateFindingStatus?: (findingId: string, status: ReviewStatus, note?: string) => void;
}

export const SplitScreenViewer: React.FC<SplitScreenViewerProps> = ({
  report,
  onUpdateFindingStatus
}) => {
  const [selectedFindingId, setSelectedFindingId] = useState<string>(
    report.findings[0]?.id || ''
  );
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'FINDINGS' | 'DOCUMENT'>('FINDINGS');

  // Finding notes local edit state
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const selectedFinding = report.findings.find(f => f.id === selectedFindingId) || report.findings[0];

  // Filtered findings list
  const filteredFindings = report.findings.filter(f => {
    if (typeFilter !== 'ALL' && f.type !== typeFilter) return false;
    if (severityFilter !== 'ALL' && f.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.reason.toLowerCase().includes(q) ||
        f.text_snippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (status: ReviewStatus) => {
    if (!selectedFinding) return;
    if (onUpdateFindingStatus) {
      onUpdateFindingStatus(selectedFinding.id, status, selectedFinding.action.notes);
    } else {
      selectedFinding.action.status = status;
    }
  };

  const handleSaveNote = () => {
    if (!selectedFinding) return;
    if (onUpdateFindingStatus) {
      onUpdateFindingStatus(selectedFinding.id, selectedFinding.action.status, noteText);
    } else {
      selectedFinding.action.notes = noteText;
    }
    setEditingNoteId(null);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-surface-border shadow-xs overflow-hidden">
      {/* Top Filter & Toolbar Bar */}
      <div className="bg-surface-light border-b border-surface-border px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white border border-surface-border rounded-lg px-2.5 py-1 text-xs text-charcoal-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-charcoal-600" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Finding Categories</option>
              <option value="consistency">Consistency Discrepancies</option>
              <option value="reference">Reference Issues</option>
              <option value="citation">Citation Mismatches</option>
              <option value="claim">Claim Verification</option>
              <option value="similarity">Potential Similarity</option>
              <option value="indicator">Review Indicators</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-surface-border rounded-lg px-2.5 py-1 text-xs text-charcoal-700 shadow-2xs">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Advisory</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-charcoal-600" />
            <input
              type="text"
              placeholder="Search passage or finding..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-surface-border rounded-lg text-xs w-56 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-surface-border bg-white rounded-lg text-xs font-semibold text-charcoal-800 hover:bg-surface-light transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-charcoal-600" />
            Export Report
          </button>
        </div>
      </div>

      {/* Split-Screen Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
        {/* LEFT PANEL: Document Viewer with Section Passages & Highlights */}
        <div className="lg:col-span-6 p-6 overflow-y-auto max-h-[750px] bg-slate-50/50">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                Document Source Content
              </h3>
            </div>
            <span className="text-xs text-charcoal-600 font-mono">
              {report.document.original_filename} ({report.document.page_count} Pages)
            </span>
          </div>

          {/* Section & Paragraph Render */}
          <div className="space-y-6">
            {report.sections.map((sec) => (
              <div key={sec.section_id} className="bg-white rounded-xl p-5 border border-surface-border shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <h4 className="text-sm font-bold text-charcoal-900">{sec.title}</h4>
                  <span className="text-[11px] font-medium text-charcoal-600 bg-slate-100 px-2 py-0.5 rounded">
                    Page {sec.start_page}
                  </span>
                </div>

                <div className="text-xs leading-relaxed text-charcoal-800 font-serif space-y-3">
                  {sec.content.split('\n\n').map((para, idx) => {
                    // Check if current selected finding matches this text
                    const isSelectedHighlight = 
                      selectedFinding && 
                      selectedFinding.text_snippet && 
                      (para.includes(selectedFinding.text_snippet) || selectedFinding.text_snippet.includes(para.slice(0, 40)));

                    return (
                      <p
                        key={idx}
                        className={`p-2.5 rounded-lg transition-all ${
                          isSelectedHighlight
                            ? 'bg-amber-100/90 border-l-4 border-amber-500 text-amber-950 font-sans shadow-xs'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Findings Selector & Detail Panel */}
        <div className="lg:col-span-6 p-6 flex flex-col justify-between overflow-y-auto max-h-[750px] bg-white">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-brand-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                  Review Findings & Evidence ({filteredFindings.length})
                </h3>
              </div>
              <span className="text-xs text-charcoal-600">
                Click finding to inspect passage
              </span>
            </div>

            {/* Findings List (Compact Cards) */}
            <div className="space-y-2 mb-6 max-h-[260px] overflow-y-auto pr-1">
              {filteredFindings.map((f) => {
                const isSelected = selectedFinding?.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFindingId(f.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/40 shadow-xs ring-1 ring-brand-500/20'
                        : 'border-surface-border hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <SeverityBadge severity={f.severity} />
                        <span className="text-xs font-bold text-charcoal-900 line-clamp-1">
                          {f.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-charcoal-600 line-clamp-1 font-mono">
                        Page {f.page} • {f.section}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <ReviewStatusBadge status={f.action.status} />
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-brand-500' : 'text-slate-300'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Finding Detail Panel */}
            {selectedFinding && (
              <div className="bg-surface-light rounded-xl p-5 border border-surface-border space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-surface-border pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {selectedFinding.type}
                      </span>
                      <SeverityBadge severity={selectedFinding.severity} />
                    </div>
                    <h4 className="text-sm font-bold text-charcoal-900">
                      {selectedFinding.title}
                    </h4>
                  </div>
                  <ReviewStatusBadge status={selectedFinding.action.status} />
                </div>

                {/* Exact Submitted Passage */}
                <div>
                  <label className="text-[11px] font-bold text-charcoal-600 uppercase tracking-wider block mb-1">
                    Submitted Passage Location (Page {selectedFinding.page}, {selectedFinding.section})
                  </label>
                  <div className="bg-white p-3 rounded-lg border border-surface-border text-xs text-charcoal-900 italic font-serif">
                    "{selectedFinding.text_snippet}"
                  </div>
                </div>

                {/* Finding Reason */}
                <div>
                  <label className="text-[11px] font-bold text-charcoal-600 uppercase tracking-wider block mb-1">
                    Analysis Finding & Reason
                  </label>
                  <div className="text-xs text-charcoal-800 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                    {selectedFinding.reason}
                  </div>
                </div>

                {/* Supporting Evidence */}
                {selectedFinding.evidence && (
                  <div>
                    <label className="text-[11px] font-bold text-charcoal-600 uppercase tracking-wider block mb-1">
                      Supporting Source / Cross-Check Evidence
                    </label>
                    <div className="text-xs text-charcoal-700 bg-white p-3 rounded-lg border border-surface-border font-mono">
                      {selectedFinding.evidence}
                    </div>
                  </div>
                )}

                {/* Faculty Reviewer Actions */}
                <div className="pt-3 border-t border-surface-border space-y-3">
                  <label className="text-[11px] font-bold text-charcoal-900 uppercase tracking-wider block">
                    Faculty Review Action
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleStatusChange('REVIEWED')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        selectedFinding.action.status === 'REVIEWED'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-surface-border text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </button>

                    <button
                      onClick={() => handleStatusChange('NEEDS_CORRECTION')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        selectedFinding.action.status === 'NEEDS_CORRECTION'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-surface-border text-amber-700 hover:bg-amber-50'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Correction
                    </button>

                    <button
                      onClick={() => handleStatusChange('DISMISSED')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        selectedFinding.action.status === 'DISMISSED'
                          ? 'bg-gray-700 text-white shadow-xs'
                          : 'bg-white border border-surface-border text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Dismiss
                    </button>
                  </div>

                  {/* Reviewer Note Input */}
                  <div>
                    {editingNoteId === selectedFinding.id ? (
                      <div className="space-y-2 mt-2">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add notes for author / committee review..."
                          className="w-full p-2.5 bg-white border border-surface-border rounded-lg text-xs focus:ring-2 focus:ring-brand-500/30 focus:outline-none"
                          rows={2}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2.5 py-1 text-xs text-charcoal-600 hover:text-charcoal-900"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveNote}
                            className="px-3 py-1 bg-brand-500 text-white text-xs font-semibold rounded-md hover:bg-brand-600"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-surface-border mt-2">
                        <span className="text-xs text-charcoal-600 italic">
                          {selectedFinding.action.notes || 'No reviewer notes attached yet.'}
                        </span>
                        <button
                          onClick={() => {
                            setEditingNoteId(selectedFinding.id);
                            setNoteText(selectedFinding.action.notes || '');
                          }}
                          className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          {selectedFinding.action.notes ? 'Edit' : 'Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
