import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = false }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${iconSize} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/20`}>
        {/* Stylized V + Shield + Check mark logo */}
        <svg viewBox="0 0 24 24" fill="none" className="w-5/6 h-5/6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Shield outline */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-white/40" />
          {/* Stylized V / Checkmark */}
          <path d="M7 11.5l3.5 3.5L17 7.5" className="text-white" strokeWidth="2.8" />
        </svg>
      </div>
      <div>
        <span className={`font-bold tracking-tight text-charcoal-900 ${titleSize}`}>
          VeriScholar <span className="text-brand-500 font-extrabold">AI</span>
        </span>
        {showSubtitle && (
          <p className="text-xs text-charcoal-600 font-medium">
            AI-Powered Research & Academic Integrity Review
          </p>
        )}
      </div>
    </div>
  );
};
