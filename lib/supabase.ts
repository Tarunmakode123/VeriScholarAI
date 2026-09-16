import { createClient } from '@supabase/supabase-js';
import { ResearchIntegrityReport } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// In-memory / session storage store for reports during MVP execution
const localReportStore = new Map<string, ResearchIntegrityReport>();

export function saveReportToStore(report: ResearchIntegrityReport): void {
  localReportStore.set(report.report_id, report);
  localReportStore.set(report.document.id, report);
}

export function getReportFromStore(id: string): ResearchIntegrityReport | null {
  return localReportStore.get(id) || null;
}

export function getAllReportsFromStore(): ResearchIntegrityReport[] {
  return Array.from(new Set(localReportStore.values()));
}
