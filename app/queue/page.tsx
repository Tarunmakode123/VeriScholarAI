'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '../../components/Sidebar';
import { SeverityBadge, ReviewStatusBadge } from '../../components/StatusBadge';
import { SYNTHETIC_DEMO_REPORT } from '../../lib/demo-data';
import { ReviewStatus } from '../../lib/types';
import { CheckSquare, Filter, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ReviewQueuePage() {
  const [report, setReport] = useState(SYNTHETIC_DEMO_REPORT);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredFindings = report.findings.filter((f) => {
    if (statusFilter !== 'ALL' && f.action.status !== statusFilter) return false;
    return true;
  });

  const handleUpdateStatus = (id: string, newStatus: ReviewStatus) => {
    const updated = { ...report };
    const target = updated.findings.find(f => f.id === id);
    if (target) {
      target.action.status = newStatus;
      setReport(updated);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
              Faculty Action Center
            </span>
            <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
              Review Queue
            </h1>
            <p className="text-xs text-charcoal-600">
              Pending findings requiring human verification and decision logging across active documents.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-surface-border rounded-lg px-3 py-1.5 text-xs text-charcoal-700 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-charcoal-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNREVIEWED">● Pending Review</option>
              <option value="REVIEWED">✓ Verified</option>
              <option value="NEEDS_CORRECTION">⚠ Needs Correction</option>
              <option value="DISMISSED">✕ Dismissed</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-border shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-surface-border flex items-center justify-between">
            <h2 className="text-sm font-bold text-charcoal-900">
              Pending Finding Queue ({filteredFindings.length} Items)
            </h2>
            <span className="text-xs text-charcoal-600 font-mono">
              Document: {report.document.title}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-800">
              <thead className="bg-surface-light text-charcoal-600 font-semibold uppercase tracking-wider text-[11px] border-b border-surface-border">
                <tr>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Finding Category & Title</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Reviewer Status</th>
                  <th className="p-4">Quick Action</th>
                  <th className="p-4">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {filteredFindings.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <SeverityBadge severity={f.severity} />
                    </td>
                    <td className="p-4 max-w-xs space-y-1">
                      <div className="font-bold text-charcoal-900">{f.title}</div>
                      <div className="text-[11px] text-charcoal-600 line-clamp-1">{f.reason}</div>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-charcoal-700">
                      Page {f.page} • {f.section}
                    </td>
                    <td className="p-4">
                      <ReviewStatusBadge status={f.action.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(f.id, 'REVIEWED')}
                          className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(f.id, 'NEEDS_CORRECTION')}
                          className="px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-[11px] font-bold"
                        >
                          Correction
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(f.id, 'DISMISSED')}
                          className="px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 text-[11px] font-bold"
                        >
                          Dismiss
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/report/${report.report_id}`}
                        className="text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1 text-[11px]"
                      >
                        Inspect
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
