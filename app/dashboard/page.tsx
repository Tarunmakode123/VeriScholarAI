import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';
import { ModeBadge, SeverityBadge } from '../../components/StatusBadge';
import { DisclaimerBanner } from '../../components/DisclaimerBanner';
import { SYNTHETIC_DEMO_REPORT } from '../../lib/demo-data';
import { 
  FileText, 
  CheckSquare, 
  AlertTriangle, 
  Search, 
  ArrowUpRight,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

export default function DashboardPage() {
  const demoReport = SYNTHETIC_DEMO_REPORT;

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 max-w-7xl">
        {/* Top Title & Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              VeriScholar AI Portal
            </span>
            <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
              Research Integrity Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors shadow-xs"
            >
              <UploadCloud className="w-4 h-4" />
              Upload New Document
            </Link>
          </div>
        </div>

        <DisclaimerBanner />

        {/* Top Summary Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">Documents</span>
              <FileText className="w-4 h-4 text-brand-500" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">1</div>
            <p className="text-[10px] text-charcoal-600 font-medium">1 Synthetic Demo</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending Review</span>
              <CheckSquare className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-600">7</div>
            <p className="text-[10px] text-charcoal-600 font-medium">Items awaiting faculty</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">High Priority</span>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-extrabold text-red-600">5</div>
            <p className="text-[10px] text-charcoal-600 font-medium">Requires immediate inspection</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">Claims Checked</span>
              <FileCheck className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">6</div>
            <p className="text-[10px] text-charcoal-600 font-medium">3 requiring review</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">References</span>
              <Search className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">5</div>
            <p className="text-[10px] text-charcoal-600 font-medium">1 unverifiable</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-surface-border shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-charcoal-600">
              <span className="text-[11px] font-bold uppercase tracking-wider">Similarity</span>
              <BarChart3 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-charcoal-900">2</div>
            <p className="text-[10px] text-charcoal-600 font-medium">Passages identified</p>
          </div>
        </div>

        {/* Recent Academic Documents Table */}
        <div className="bg-white rounded-xl border border-surface-border shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-surface-border flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-charcoal-900">
                Recent Submissions & Review Integrity Reports
              </h2>
              <p className="text-xs text-charcoal-600">
                Active document review pipeline
              </p>
            </div>
            <Link
              href="/documents"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View All Documents
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-800">
              <thead className="bg-surface-light text-charcoal-600 font-semibold uppercase tracking-wider text-[11px] border-b border-surface-border">
                <tr>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">Author / Student</th>
                  <th className="p-4">Document Type</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-charcoal-900">
                    <div className="space-y-0.5">
                      <div className="text-sm font-bold text-charcoal-900">
                        {demoReport.document.title}
                      </div>
                      <div className="text-[11px] text-charcoal-600 font-mono">
                        {demoReport.document.original_filename} ({demoReport.document.page_count} pages)
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    {demoReport.document.author_name}
                    <div className="text-[11px] text-charcoal-600">
                      {demoReport.document.department}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-charcoal-800">
                      {demoReport.document.document_type}
                    </span>
                  </td>
                  <td className="p-4">
                    <ModeBadge mode={demoReport.mode} />
                  </td>
                  <td className="p-4">
                    <SeverityBadge severity={demoReport.priority} />
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/report/${demoReport.report_id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 shadow-2xs"
                    >
                      Inspect Report
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Future Extensibility Architecture Card */}
        <div className="bg-white rounded-xl p-6 border border-surface-border shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <h3 className="text-sm font-bold text-charcoal-900">
              Future Extensibility Architecture Preview
            </h3>
          </div>
          <p className="text-xs text-charcoal-600">
            VeriScholar AI is architected with decoupled server services ready for future expansion into specialized institutional modules.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {[
              'VeriScholar Similarity (Active)',
              'VeriScholar Citations (Active)',
              'VeriScholar References (Active)',
              'VeriScholar Claims (Active)',
              'VeriScholar Code (Planned)',
              'VeriScholar Reproducibility (Planned)',
              'VeriScholar Institutional Corpus (Planned)',
              'VeriScholar API Gateway (Planned)'
            ].map((m) => (
              <div key={m} className="p-2.5 rounded-lg bg-surface-light border border-surface-border text-charcoal-800 font-medium">
                {m}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
