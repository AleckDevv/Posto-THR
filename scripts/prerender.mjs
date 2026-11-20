/**
 * Pré-renderização estática (SSG).
 * Injeta o HTML gerado pelo React em dist/index.html e dist/404.html, para que
 * o conteúdo chegue completo aos buscadores e apareça antes do JavaScript.
 * Também adiciona preload das fontes principais.
 */
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR = path.join(ROOT, 'dist-ssr');

const { render } = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href);

const assets = await readdir(path.join(DIST, 'assets'));
const fontPreloads = [/^manrope-latin-wght-normal-.*\.woff2$/, /^inter-latin-wght-normal-.*\.woff2$/]
  .map((pattern) => assets.find((file) => pattern.test(file)))
  .filter(Boolean)
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const pages = [
  { file: 'index.html', page: 'home' },
  { file: '404.html', page: '404' },
];

for (const { file, page } of pages) {
  const target = path.join(DIST, file);
  const html = await readFile(target, 'utf8');
  if (!html.includes('<!--app-html-->')) throw new Error(`Marcador <!--app-html--> ausente em ${file}`);
  const output = html
    .replace('<!--app-html-->', render(page))
    .replace('</title>', `</title>\n    ${fontPreloads}`);
  await writeFile(target, output);
  console.log(`pré-renderizado: dist/${file}`);
}

await rm(SSR, { recursive: true, force: true });
