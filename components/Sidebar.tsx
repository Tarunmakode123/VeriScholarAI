'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { 
  LayoutDashboard, 
  FileText, 
  UploadCloud, 
  CheckSquare, 
  BarChart3, 
  Settings,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Documents', href: '/documents', icon: FileText },
    { label: 'Upload Document', href: '/upload', icon: UploadCloud },
    { label: 'Review Queue', href: '/queue', icon: CheckSquare },
    { label: 'Reports', href: '/report/demo-report-2026-001', icon: BarChart3 },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-surface-border min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between shrink-0">
      <div>
        <div className="px-2 py-3 mb-4">
          <Logo size="sm" showSubtitle={false} />
          <div className="mt-1 text-[11px] font-medium text-charcoal-600 tracking-wide uppercase">
            Faculty Review Portal
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold border-l-4 border-brand-500 shadow-2xs'
                    : 'text-charcoal-700 hover:bg-surface-light hover:text-charcoal-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-charcoal-600'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-surface-border">
        <div className="bg-surface-light rounded-xl p-3 border border-surface-border">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-brand-500" />
            Institutional Corpus
          </div>
          <p className="text-[11px] text-charcoal-600 leading-tight">
            Cross-checking disabled (Phase 1 MVP). System compares against local database.
          </p>
        </div>
      </div>
    </aside>
  );
};
