'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';
import { ModeBadge, SeverityBadge } from '../../components/StatusBadge';
import { SYNTHETIC_DEMO_REPORT } from '../../lib/demo-data';
import { FileText, ArrowUpRight, UploadCloud } from 'lucide-react';

export default function DocumentsPage() {
  const demoReport = SYNTHETIC_DEMO_REPORT;

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Document Archive
            </span>
            <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
              Submitted Academic Documents
            </h1>
            <p className="text-xs text-charcoal-600">
              Complete archive of parsed papers, theses, assignments, and generated integrity reports.
            </p>
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            Upload New Document
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-surface-border shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-800">
              <thead className="bg-surface-light text-charcoal-600 font-semibold uppercase tracking-wider text-[11px] border-b border-surface-border">
                <tr>
                  <th className="p-4">Document Title & Filename</th>
                  <th className="p-4">Author / Dept</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Mode</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-charcoal-900 text-sm">
                      {demoReport.document.title}
                    </div>
                    <div className="text-[11px] text-charcoal-600 font-mono">
                      {demoReport.document.original_filename} ({demoReport.document.page_count} pages)
                    </div>
                  </td>
                  <td className="p-4 font-medium">
                    {demoReport.document.author_name}
                    <div className="text-[11px] text-charcoal-600">{demoReport.document.department}</div>
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
                      Open Report
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
