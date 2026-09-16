import React from 'react';
import Link from 'next/link';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { 
  ShieldCheck, 
  FileCheck2, 
  FileText, 
  Search, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
  Award
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white border-b border-surface-border py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-700 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            AI-Powered Research & Academic Integrity Review
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal-900 leading-tight">
              VeriScholar <span className="text-brand-500">AI</span>
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-charcoal-800 tracking-tight">
              Don't just detect similarity. Verify the work.
            </p>
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
              Analyze academic documents for potential similarity, citation issues, reference problems, unsupported claims, and research inconsistencies — with evidence designed to support faculty review.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-md shadow-brand-500/25 transform hover:-translate-y-0.5"
            >
              Analyze a Document
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/report/demo-report-2026-001"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 font-bold text-sm hover:bg-purple-100 transition-all shadow-xs"
            >
              View Demo
            </Link>
          </div>

          <div className="max-w-3xl mx-auto pt-6">
            <DisclaimerBanner />
          </div>
        </div>
      </section>

      {/* Primary Value Propositions */}
      <section className="py-16 px-6 bg-surface-light border-b border-surface-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
              Comprehensive Evidence-Based Integrity Review
            </h2>
            <p className="text-sm text-charcoal-600 max-w-xl mx-auto">
              Built for universities, colleges, faculty committees, and peer reviewers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-2xs space-y-4 hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                Detect Potential Similarity
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Identify structural and concept similarity across uploaded documents and archives without misleading automated scores.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-2xs space-y-4 hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                Verify Research Evidence
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Cross-check inline citations against bibliography references, external DOI indexes, and factual claim evidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-border shadow-2xs space-y-4 hover:border-brand-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900">
                Help Faculty Review
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Empower academic committees with interactive passage highlighting, review queues, and exportable integrity reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted Document Types */}
      <section className="py-16 px-6 bg-white border-b border-surface-border">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-charcoal-900">
              Designed for All Academic & Research Submissions
            </h2>
            <p className="text-xs text-charcoal-600">
              VeriScholar AI provides tailored review indicators across diverse document types.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              'Research Papers',
              'Assignments',
              'Project Reports',
              'Thesis / Dissertations',
              'Literature Reviews',
              'Technical Reports',
              'Conference Submissions',
              'Departmental Reports'
            ].map((type) => (
              <div key={type} className="p-4 rounded-xl bg-surface-light border border-surface-border font-medium text-xs text-charcoal-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Brand Extensibility Roadmap */}
      <section className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-brand-500 text-xs font-bold uppercase tracking-wider">
                Modular Architecture
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Extensible Institutional Ecosystem
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              VeriScholar AI architecture is engineered to extend smoothly into specialized integrity modules for university enterprise deployments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'VeriScholar Similarity', status: 'Core Active' },
              { name: 'VeriScholar Citations', status: 'Core Active' },
              { name: 'VeriScholar References', status: 'Core Active' },
              { name: 'VeriScholar Claims', status: 'Core Active' },
              { name: 'VeriScholar Code', status: 'Future Phase' },
              { name: 'VeriScholar Reproducibility', status: 'Future Phase' },
              { name: 'VeriScholar Institutional Corpus', status: 'Future Phase' },
              { name: 'VeriScholar LMS Gateway', status: 'Future Phase' },
            ].map((mod) => (
              <div key={mod.name} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <Layers className="w-4 h-4 text-brand-500" />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    mod.status === 'Core Active' ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {mod.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{mod.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-surface-border text-center text-xs text-charcoal-600">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-charcoal-900">VeriScholar AI</span> — AI-Powered Research & Academic Integrity Review
          </div>
          <div>
            Authorized Faculty Review Assistance System
          </div>
        </div>
      </footer>
    </div>
  );
}
