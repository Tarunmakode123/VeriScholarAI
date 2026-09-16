import React from 'react';
import { ExecutionMode, SeverityLevel, ReviewStatus } from '../lib/types';

interface ModeBadgeProps {
  mode: ExecutionMode;
}

export const ModeBadge: React.FC<ModeBadgeProps> = ({ mode }) => {
  if (mode === 'SYNTHETIC_DEMO') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
        SYNTHETIC DEMO
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
      LIVE ANALYSIS
    </span>
  );
};

interface SeverityBadgeProps {
  severity: SeverityLevel;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity }) => {
  switch (severity) {
    case 'HIGH':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200">
          🔴 High Priority
        </span>
      );
    case 'MEDIUM':
    case 'MODERATE':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          🟠 Review Required
        </span>
      );
    case 'LOW':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          🔵 Advisory
        </span>
      );
  }
};

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

export const ReviewStatusBadge: React.FC<ReviewStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'REVIEWED':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          ✓ Verified
        </span>
      );
    case 'NEEDS_CORRECTION':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
          ⚠ Needs Correction
        </span>
      );
    case 'DISMISSED':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
          ✕ Dismissed
        </span>
      );
    case 'UNREVIEWED':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
          ● Pending Review
        </span>
      );
  }
};
