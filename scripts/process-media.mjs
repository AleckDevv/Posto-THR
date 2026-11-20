/**
 * Pipeline de mídia do Posto THR.
 *
 * Lê os arquivos ORIGINAIS em /assets (nunca os altera) e gera versões
 * otimizadas para a web em /src/assets:
 *   - fotos em AVIF + WebP, em duas larguras (480 e 720 px — 720 é a largura nativa);
 *   - recortes de vídeo curtos, sem áudio, em MP4 (H.264, faststart) — o VP9 não
 *     reduziu o tamanho neste material, então o MP4 é o formato único (compatibilidade total);
 *   - posters dos vídeos e quadros estáticos extraídos dos vídeos;
 *   - imagem Open Graph (1200×630) e ícones em /public;
 *   - um manifesto (src/assets/media-manifest.json) com dimensões e cor dominante.
 *
 * Uso: npm run media   (requer ffmpeg-static e sharp, ambos devDependencies)
 */
import { execFile } from 'node:child_process';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';
import { siteData } from '../src/data/siteData.js';

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets');
const OUT_IMG = path.join(ROOT, 'src/assets/images');
const OUT_VID = path.join(ROOT, 'src/assets/videos');
const PUBLIC = path.join(ROOT, 'public');
const TMP = path.join(ROOT, '.media-tmp');

const WIDTHS = [480, 720];
const INK = '0x060D24';

/* ------------------------------------------------------------------ */
/* Seleção de fotos (as demais são variações quase idênticas)          */
/* ------------------------------------------------------------------ */
const photos = {
  'team-five-a': 'WhatsApp Image 2026-11-18 at 09.22.21 (2).jpeg',
  'team-five-b': 'WhatsApp Image 2026-11-18 at 09.22.20.jpeg',
  'team-trio-pump': 'WhatsApp Image 2026-11-18 at 09.22.22 (4).jpeg',
  'team-duo': 'WhatsApp Image 2026-11-18 at 09.22.22 (6).jpeg',
  'team-trio-arms': 'WhatsApp Image 2026-11-18 at 09.22.23 (2).jpeg',
  'team-trio-close': 'WhatsApp Image 2026-11-18 at 09.22.23 (6).jpeg',
  'team-trio-calm': 'WhatsApp Image 2026-11-18 at 09.22.23 (7).jpeg',
  'team-lounge': 'WhatsApp Image 2026-11-18 at 09.22.23 (8).jpeg',
  'refuel-signs': 'WhatsApp Image 2026-11-18 at 09.22.21 (3).jpeg',
  'refuel-avenue': 'WhatsApp Image 2026-11-18 at 09.22.22.jpeg',
  'refuel-hatch': 'WhatsApp Image 2026-11-18 at 09.22.22 (1).jpeg',
};

/* ------------------------------------------------------------------ */
/* Recortes de vídeo                                                    */
/* Trechos e enquadramentos escolhidos para evitar placas legíveis.     */
/* ------------------------------------------------------------------ */
const V = (name) => `WhatsApp Video 2026-11-18 at ${name}.mp4`;

const clips = [
  {
    id: 'hero',
    src: V('09.22.21'),
    ss: 13.0,
    t: 8.0,
    // desfoca a placa da moto (canto inferior esquerdo) e escurece no fim para o loop
    filter: `[0:v]fps=30,split[a][b];[b]crop=110:190:0:590,boxblur=12:2[p];[a][p]overlay=0:590,hqdn3d=1.5:1.5:6:6,eq=contrast=1.05:saturation=0.92,fade=t=out:st=7.4:d=0.6:color=${INK}[v]`,
    complex: true,
  },
  { id: 'care-driver', src: V('09.22.22 (1)'), ss: 0.0, t: 5.0, filter: 'scale=432:768' },
  { id: 'care-refuel', src: V('09.22.21 (2)'), ss: 0.6, t: 6.5, filter: 'scale=432:768' },
  { id: 'care-window', src: V('09.22.22'), ss: 0.0, t: 3.9, filter: 'scale=432:768' },
  { id: 'care-squeegee', src: V('09.22.21 (4)'), ss: 36.0, t: 6.0, filter: 'crop=576:384:0:180' },
  { id: 'care-moto', src: V('09.22.21'), ss: 6.2, t: 3.4, filter: 'scale=432:768' },
  // recorte à direita: exclui a placa do carro estacionado à esquerda
  { id: 'care-pump', src: V('09.22.21 (2)'), ss: 10.1, t: 2.5, filter: 'crop=396:704:180:160,scale=432:768' },
  { id: 'care-checkout', src: V('09.22.21 (1)'), ss: 70.5, t: 7.0, filter: 'crop=432:768:144:200' },
];

/* Quadros estáticos extraídos dos vídeos */
const stills = [
  { id: 'pump-detail', src: V('09.22.21 (2)'), ss: 11.0 },
  // enquadra apenas a avenida (palmeiras e prédios), sem a placa do veículo
  { id: 'street', src: V('09.22.21 (3)'), ss: 9.0, filter: 'crop=576:500:0:0' },
];

/* ------------------------------------------------------------------ */

const ff = (args) => run(ffmpegPath, ['-v', 'error', '-y', ...args], { maxBuffer: 1 << 26 });

async function dominantHex(input) {
  const { dominant } = await sharp(input).stats();
  return '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

async function exportImage(id, input, manifest) {
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.includes(meta.width) && meta.width < WIDTHS.at(-1)) widths.push(meta.width);
  for (const w of widths) {
    const base = sharp(input).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT_IMG, `${id}-${w}.avif`));
    await base.clone().webp({ quality: 74, effort: 6 }).toFile(path.join(OUT_IMG, `${id}-${w}.webp`));
  }
  manifest.images[id] = {
    width: meta.width,
    height: meta.height,
    widths,
    color: await dominantHex(input),
  };
}

async function encodeClip(clip, manifest) {
  const input = path.join(SRC, clip.src);
  const common = ['-ss', String(clip.ss), '-t', String(clip.t), '-i', input];
  const filterArgs = clip.complex
    ? ['-filter_complex', clip.filter, '-map', '[v]']
    : ['-vf', `fps=30,${clip.filter},hqdn3d=1.5:1.5:6:6,eq=contrast=1.05:saturation=0.92`];
  const mp4 = path.join(OUT_VID, `${clip.id}.mp4`);
  const crf = clip.id === 'hero' ? '25' : '27';

  await ff([...common, ...filterArgs, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', crf,
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);

  // Poster: primeiro quadro do recorte já processado (idêntico ao início do vídeo)
  const posterPng = path.join(TMP, `${clip.id}-poster.png`);
  await ff(['-i', mp4, '-frames:v', '1', posterPng]);
  await exportImage(`${clip.id}-poster`, posterPng, manifest);

  const meta = await sharp(posterPng).metadata();
  manifest.videos[clip.id] = { width: meta.width, height: meta.height, duration: clip.t };
}

async function exportStill(still, manifest) {
  const png = path.join(TMP, `${still.id}.png`);
  await ff(['-ss', String(still.ss), '-i', path.join(SRC, still.src), '-frames:v', '1',
    '-vf', [still.filter, 'eq=contrast=1.05:saturation=0.92'].filter(Boolean).join(','), png]);
  await exportImage(still.id, png, manifest);
}

async function buildOgImage() {
  const W = 1200;
  const H = 630;
  const photoW = 560;
  const photo = await sharp(path.join(SRC, photos['team-five-a']))
    .resize({ width: photoW, height: H, fit: 'cover', position: 'centre' })
    .modulate({ saturation: 0.92 })
    .toBuffer();
  const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const [head, ...tail] = siteData.tagline.split(' ');
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#060D24"/>
    <rect x="72" y="96" width="44" height="6" fill="#D7222E"/>
    <text x="72" y="168" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#C9CDD6">POSTO THR</text>
    <text x="68" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#FFFFFF">${xml(head)}</text>
    <text x="68" y="388" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#FFFFFF">${xml(tail.join(' '))}</text>
    <text x="72" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#C9CDD6">Uma nova experiência em cada parada.</text>
    <text x="72" y="552" font-family="Segoe UI, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#8F96A8">AV. JOÃO XXIII · TERESINA — PI</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .composite([{ input: photo, left: W - photoW, top: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'));
}

async function buildIcons() {
  const svg = await readFile(path.join(PUBLIC, 'favicon.svg'));
  await sharp(svg, { density: 512 }).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
  await sharp(svg, { density: 512 }).resize(192, 192).png().toFile(path.join(PUBLIC, 'icon-192.png'));
  await sharp(svg, { density: 512 }).resize(512, 512).png().toFile(path.join(PUBLIC, 'icon-512.png'));
}

async function main() {
  if (!ffmpegPath || !existsSync(ffmpegPath)) {
    throw new Error('ffmpeg não encontrado. Rode "npm install-scripts approve ffmpeg-static && npm rebuild ffmpeg-static".');
  }
  await rm(OUT_IMG, { recursive: true, force: true });
  await rm(OUT_VID, { recursive: true, force: true });
  for (const dir of [OUT_IMG, OUT_VID, PUBLIC, TMP]) await mkdir(dir, { recursive: true });

  const manifest = { images: {}, videos: {} };

  for (const [id, file] of Object.entries(photos)) {
    await exportImage(id, path.join(SRC, file), manifest);
    console.log('foto  ', id);
  }
  for (const still of stills) {
    await exportStill(still, manifest);
    console.log('quadro', still.id);
  }
  for (const clip of clips) {
    await encodeClip(clip, manifest);
    console.log('vídeo ', clip.id);
  }

  await buildOgImage();
  if (existsSync(path.join(PUBLIC, 'favicon.svg'))) await buildIcons();

  await writeFile(path.join(ROOT, 'src/assets/media-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await rm(TMP, { recursive: true, force: true });
  console.log('Mídia processada.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
