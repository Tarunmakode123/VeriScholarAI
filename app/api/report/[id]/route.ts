import { NextRequest, NextResponse } from 'next/server';
import { getReportFromStore } from '../../../../lib/supabase';
import { SYNTHETIC_DEMO_REPORT } from '../../../../lib/demo-data';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === 'demo-report-2026-001') {
    return NextResponse.json(SYNTHETIC_DEMO_REPORT);
  }

  const report = getReportFromStore(id);
  if (report) {
    return NextResponse.json(report);
  }

  return NextResponse.json({ error: 'Report not found' }, { status: 404 });
}
