import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getStatus, handleAIRequest, type AIEnv } from './server/aiCore';

/**
 * Serves /api/ai during `npm run dev` and `npm run preview` using the same handler
 * as the Vercel Function, so the AI key stays server-side locally too.
 */
function aiApi(env: AIEnv): Plugin {
  const mount = (server: { middlewares: { use: (path: string, fn: (req: any, res: any) => void) => void } }) => {
    server.middlewares.use('/api/ai', (req, res) => {
      const send = (status: number, body: unknown) => {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(JSON.stringify(body));
      };
      if (req.method === 'GET') return send(200, getStatus(env));
      if (req.method !== 'POST') return send(405, { error: 'bad_request', message: 'Method not allowed' });
      let raw = '';
      req.on('data', (chunk: Buffer) => {
        raw += chunk;
        if (raw.length > 50_000) req.destroy();
      });
      req.on('end', async () => {
        const result = await handleAIRequest(raw, req.socket?.remoteAddress ?? 'local', env);
        send(result.status, result.body);
      });
    });
  };
  return { name: 'utsav-ai-api', configureServer: mount, configurePreviewServer: mount };
}

export default defineConfig(({ mode }) => {
  // Load *all* env vars (not just VITE_*) for the server-side middleware only.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      aiApi({
        GEMINI_API_KEY: env.GEMINI_API_KEY,
        GEMINI_MODEL: env.GEMINI_MODEL,
        OLLAMA_URL: env.OLLAMA_URL,
        OLLAMA_MODEL: env.OLLAMA_MODEL,
      }),
    ],
    server: { port: 5173, host: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            charts: ['recharts'],
            gsap: ['gsap'],
            three: ['three'],
          },
        },
      },
    },
  };
});
