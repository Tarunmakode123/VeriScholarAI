import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

export function getGeminiClient(): GoogleGenerativeAI | null {
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function generateStructuredGeminiJSON<T>(
  prompt: string,
  systemInstruction: string
): Promise<T | null> {
  const client = getGeminiClient();
  if (!client) {
    console.warn('GEMINI_API_KEY is not configured on server.');
    return null;
  }

  try {
    const model = client.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('Empty response from Gemini API');
    }

    // Clean JSON markdown blocks if present
    const cleaned = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error('Gemini API call or JSON parsing failed:', error);
    return null;
  }
}
