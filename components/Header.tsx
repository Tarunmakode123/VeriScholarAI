'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { FileUp, PlayCircle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-surface-border px-6 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo showSubtitle={true} size="md" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/report/demo-report-2026-001"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-purple-200 bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition-colors shadow-2xs"
          >
            <PlayCircle className="w-4 h-4 text-purple-600" />
            View Demo
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors shadow-xs shadow-brand-500/20"
          >
            <FileUp className="w-4 h-4" />
            Analyze a Document
          </Link>
        </div>
      </div>
    </header>
  );
};
