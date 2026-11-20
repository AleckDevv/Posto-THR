import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoPlugin } from './scripts/vite-plugin-seo.js';

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss(), seoPlugin({ siteUrl: env.VITE_SITE_URL })],
    build: {
      // Duas páginas estáticas: a home e um 404 real (status 404 no servidor).
      rolldownOptions: isSsrBuild
        ? undefined
        : { input: { main: 'index.html', notFound: '404.html' } },
      // Fontes nunca viram data: URI (mantém a CSP "font-src 'self'" estrita)
      assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
      reportCompressedSize: true,
    },
  };
});
