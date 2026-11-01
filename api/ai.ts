/**
 * Vercel Function: /api/ai
 * GET  → { configured, provider, model }   (no secrets)
 * POST → plan / section / assistant generation (see server/aiCore.ts)
 */
import { getStatus, handleAIRequest } from '../server/aiCore';

const env = () => ({
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  OLLAMA_URL: process.env.OLLAMA_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
});

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export function GET() {
  return json(200, getStatus(env()));
}

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  const raw = await request.text();
  const result = await handleAIRequest(raw, ip, env());
  return json(result.status, result.body);
}

