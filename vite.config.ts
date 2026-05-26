import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      envPrefix: ['VITE_', 'SUPABASE_', 'SUPA_ANON_DATABASE_', 'AISTUDIO_', 'GEMINI_'],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.AISTUDIO_REALISATIES ?? ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY ?? env.AISTUDIO_REALISATIES ?? ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
