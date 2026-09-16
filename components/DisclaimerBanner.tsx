import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  return (
    <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 text-amber-900 shadow-sm flex items-start gap-3">
      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed">
        <span className="font-semibold text-amber-950">Faculty Review Requirement & Evidence Disclaimer:</span>{' '}
        VeriScholar AI provides AI-assisted evidence and review indicators. It does not determine plagiarism, authorship, or academic misconduct. Final academic decisions belong solely to an authorized faculty reviewer.
      </div>
    </div>
  );
};
