/**
 * Registro de mídia: une os arquivos otimizados (gerados por `npm run media`)
 * às descrições acessíveis e às coleções usadas em cada seção.
 * Todo o material é real, do Posto THR. Nenhum nome de colaborador é citado.
 */
import manifest from '../assets/media-manifest.json';

const imageUrls = import.meta.glob('../assets/images/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const videoUrls = import.meta.glob('../assets/videos/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
});

const alts = {
  'team-five-a': 'Cinco integrantes da equipe do Posto THR, de uniforme azul com faixas refletivas, reunidos na pista de abastecimento.',
  'team-five-b': 'Equipe do Posto THR faz sinal de positivo na pista, sob a placa de diesel S-10.',
  'team-trio-pump': 'Três frentistas do Posto THR sorriem em frente ao armário azul com o símbolo do posto.',
  'team-duo': 'Dois frentistas do Posto THR lado a lado na pista, ao lado da bomba com a marca do posto.',
  'team-trio-arms': 'Três frentistas do Posto THR, de braços cruzados, na pista de abastecimento.',
  'team-trio-close': 'Três frentistas do Posto THR fazem sinal de positivo diante das bombas.',
  'team-trio-calm': 'Três frentistas do Posto THR posam com as mãos unidas em frente às bombas.',
  'team-lounge': 'Quatro integrantes da equipe do Posto THR reunidos à mesa em um espaço interno com parede de madeira e jardim vertical.',
  'refuel-signs': 'Frentista abastece um carro branco sob a sinalização de etanol e gasolina comum, com a avenida ao fundo.',
  'refuel-avenue': 'Frentista abastece um táxi na pista, com palmeiras e a avenida ao fundo.',
  'refuel-hatch': 'Frentista do Posto THR abastece um carro branco na pista coberta.',
  'pump-detail': 'Detalhe da bomba de combustível com a marca Posto THR e os bicos de gasolina comum e etanol.',
  street: 'Vista da avenida a partir da pista do Posto THR, com palmeiras e prédios de Teresina.',
};

const videoInfo = {
  hero: 'Frentista do Posto THR abastece uma moto na pista, com a avenida e as palmeiras ao fundo.',
  'care-driver': 'Frentista conversa com o motorista pela janela antes de iniciar o abastecimento.',
  'care-refuel': 'Frentista acompanha o abastecimento de um carro na pista.',
  'care-window': 'Frentista limpa o para-brisa de um carro com o rodo.',
  'care-squeegee': 'Frentista limpa o para-brisa de um carro branco, de frente para a câmera.',
  'care-moto': 'Frentista abastece uma moto, segurando o bico com atenção.',
  'care-pump': 'Detalhe da bomba com a marca Posto THR na pista.',
  'care-checkout': 'Frentista atende o motorista na janela do carro ao final do abastecimento.',
};

function urlFor(file) {
  return imageUrls[`../assets/images/${file}`];
}

/** Retorna os dados de uma imagem otimizada: srcsets AVIF/WebP, dimensões e cor de fundo. */
export function getImage(id, alt = alts[id] ?? '') {
  const meta = manifest.images[id];
  if (!meta) throw new Error(`Imagem não encontrada no manifesto: ${id}`);
  const set = (ext) => meta.widths.map((w) => `${urlFor(`${id}-${w}.${ext}`)} ${w}w`).join(', ');
  return {
    id,
    alt,
    width: meta.width,
    height: meta.height,
    color: meta.color,
    avif: set('avif'),
    webp: set('webp'),
    src: urlFor(`${id}-${meta.widths.at(-1)}.webp`),
  };
}

/** Retorna os dados de um vídeo: URL do MP4, poster e descrição. */
export function getVideo(id) {
  const meta = manifest.videos[id];
  if (!meta) throw new Error(`Vídeo não encontrado no manifesto: ${id}`);
  return {
    id,
    src: videoUrls[`../assets/videos/${id}.mp4`],
    width: meta.width,
    height: meta.height,
    duration: meta.duration,
    label: videoInfo[id] ?? '',
    poster: getImage(`${id}-poster`, ''),
  };
}

/* ------------------------------------------------------------------ */
/* Coleções por seção                                                   */
/* ------------------------------------------------------------------ */

export const aboutMedia = {
  main: getImage('team-trio-pump'),
  detail: getImage('refuel-avenue'),
};

/** Sequência do "Atendimento THR": cada clipe com legenda curta. */
export const experienceClips = [
  { video: 'care-driver', step: 'Recepção', line: 'Primeiro, ouvir quem chega.' },
  { video: 'care-refuel', step: 'Abastecimento', line: 'Acompanhado do início ao fim.' },
  { video: 'care-squeegee', step: 'Para-brisa', line: 'Visibilidade para seguir viagem.' },
  { video: 'care-pump', step: 'Detalhe', line: 'Cada bomba identificada.' },
].map((clip) => ({ ...clip, ...getVideo(clip.video) }));

export const teamPhotos = {
  lead: getImage('team-five-a'),
  close: getImage('team-trio-close'),
  duo: getImage('team-duo'),
  lounge: getImage('team-lounge'),
  arms: getImage('team-trio-arms'),
};

/** Galeria: fotos e vídeos. `layout` define a composição assimétrica. */
export const galleryItems = [
  { type: 'image', id: 'refuel-signs', layout: 'a' },
  { type: 'video', id: 'hero', layout: 'b' },
  { type: 'image', id: 'team-five-b', layout: 'c' },
  { type: 'image', id: 'street', layout: 'd' },
  { type: 'image', id: 'team-trio-calm', layout: 'e' },
  { type: 'video', id: 'care-checkout', layout: 'f' },
  { type: 'image', id: 'pump-detail', layout: 'g' },
  { type: 'image', id: 'refuel-hatch', layout: 'h' },
  { type: 'video', id: 'care-window', layout: 'i' },
  { type: 'image', id: 'team-lounge', layout: 'j' },
].map((item) =>
  item.type === 'image'
    ? { ...item, image: getImage(item.id), caption: alts[item.id] }
    : { ...item, video: getVideo(item.id), image: getImage(`${item.id}-poster`, videoInfo[item.id]), caption: videoInfo[item.id] },
);

export const locationImage = getImage('street');
