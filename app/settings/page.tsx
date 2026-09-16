'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Settings, ShieldCheck, CheckCircle2, XCircle, Database, Cpu } from 'lucide-react';

export default function SettingsPage() {
  const [healthStatus, setHealthStatus] = useState<{
    gemini_connected: boolean;
    supabase_connected: boolean;
  }>({
    gemini_connected: false,
    supabase_connected: false,
  });

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="flex min-h-screen bg-surface-light">
      <Sidebar />

      <main className="flex-1 p-8 space-y-8 max-w-4xl">
        <div className="space-y-1 border-b border-surface-border pb-5">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            System Administration
          </span>
          <h1 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
            Settings & System Status
          </h1>
          <p className="text-xs text-charcoal-600">
            Configure institutional settings and monitor server-side API connections.
          </p>
        </div>

        {/* API Health Connection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-charcoal-900">
                <Cpu className="w-4 h-4 text-brand-500" />
                Google Gemini API (Server-Side)
              </div>
              {healthStatus.gemini_connected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  <XCircle className="w-3.5 h-3.5" /> Demo Heuristic Mode
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-600">
              Model: <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">gemini-2.5-flash</code>. Credentials remain securely restricted to server routes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-xs text-charcoal-900">
                <Database className="w-4 h-4 text-purple-500" />
                Supabase Persistence Store
              </div>
              {healthStatus.supabase_connected ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Memory / Local Store
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal-600">
              Primary cloud database and document record archive storage.
            </p>
          </div>
        </div>

        {/* Institutional Privacy Notice */}
        <div className="bg-white rounded-xl p-6 border border-surface-border shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-charcoal-900">
            Institutional Privacy & Data Governance Notice
          </h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Uploaded documents may contain academic or personal information. VeriScholar AI MVP is intended for controlled institutional testing and faculty demonstration. Uploaded text is processed in isolated server sessions and is not used to train public machine learning models.
          </p>
        </div>
      </main>
    </div>
  );
}
