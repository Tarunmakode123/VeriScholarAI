import { NextResponse } from 'next/server';

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY || '';
  const isGeminiConfigured = Boolean(
    geminiKey && 
    geminiKey.trim() !== '' && 
    !geminiKey.includes('your_gemini_api_key')
  );

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isSupabaseConfigured = Boolean(
    supabaseUrl && 
    supabaseUrl.trim() !== '' && 
    !supabaseUrl.includes('your-project')
  );

  return NextResponse.json({
    status: 'ok',
    gemini_connected: isGeminiConfigured,
    supabase_connected: isSupabaseConfigured,
    version: 'v0.1-mvp'
  });
}
