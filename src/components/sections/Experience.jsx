import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import AmbientVideo from '../ui/AmbientVideo.jsx';
import { Reveal, RevealLines } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { experienceClips } from '../../data/media.js';
import { useScrollCarousel } from '../../hooks/useScrollCarousel.js';
import { cn } from '../../utils/cn.js';

const pad = (n) => String(n).padStart(2, '0');

// Composição assimétrica do desktop: proporções e alturas alternadas, como um filme em quadros.
const layout = [
  { item: 'lg:col-span-3 lg:mt-0', frame: 'lg:aspect-9/16', position: '50% 50%' },
  { item: 'lg:col-span-3 lg:mt-36', frame: 'lg:aspect-3/4', position: '35% 50%' },
  { item: 'lg:col-span-3 lg:mt-12', frame: 'lg:aspect-4/5', position: '82% 50%' },
  { item: 'lg:col-span-3 lg:mt-56', frame: 'lg:aspect-9/16', position: '50% 55%' },
];

/**
 * O atendimento THR — narrativa audiovisual com clipes curtos e legendas mínimas.
 * Mobile: faixa horizontal com rolagem nativa e snap (estilo "stories").
 * Desktop: quadros escalonados. Cada vídeo só carrega/toca quando visível.
 */
export default function Experience() {
  const c = content.experience;
  const stripRef = useRef(null);
  const { index, atStart, atEnd, interacted, goTo, next, prev } = useScrollCarousel(stripRef);

  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="relative overflow-hidden bg-thr-navy py-section text-white">
      <span aria-hidden="true" className="lane-dashes absolute inset-y-0 left-1/2 hidden w-px text-white/8 lg:block" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="atendimento-title"
            index={c.index}
            label={c.label}
            title={c.title}
            size="lg"
            tone="light"
            className="lg:col-span-8"
          />
          <Reveal as="p" className="max-w-md self-end text-lg leading-relaxed text-mist lg:col-span-4">
            {c.lead}
          </Reveal>
        </div>

        {/* Indicativo de deslize (mobile/tablet) — some após a primeira interação */}
        <p
          aria-hidden="true"
          className={cn(
            'eyebrow mt-14 flex items-center justify-end gap-2 text-mist transition-opacity duration-500 lg:hidden',
            interacted ? 'opacity-0' : 'opacity-100',
          )}
        >
          Deslize para o lado
          <ArrowRight className="size-4 animate-nudge text-thr-red" strokeWidth={2.25} />
        </p>

        <ol
          ref={stripRef}
          id="atendimento-sequencia"
          aria-label="Sequência do atendimento"
          className={cn(
            'no-scrollbar relative -mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4',
            'sm:-mx-8 sm:scroll-px-8 sm:px-8',
            'lg:mx-0 lg:mt-24 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0',
          )}
        >
          {experienceClips.map((clip, i) => (
            <li key={clip.id} className={cn('w-[76%] shrink-0 snap-start sm:w-[44%] lg:w-auto', layout[i].item)}>
              <Reveal as="figure" delay={(i % 4) * 0.08}>
                <AmbientVideo
                  video={clip}
                  position={layout[i].position}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 76vw"
                  className={cn('aspect-3/4', layout[i].frame)}
                />
                <figcaption className="mt-5 flex flex-col gap-2">
                  <span className="eyebrow flex items-center gap-3 text-mist">
                    <span className="text-white">{pad(i + 1)}</span>
                    <span aria-hidden="true" className="h-px w-6 bg-thr-red" />
                    {clip.step}
                  </span>
                  <span className="font-display text-xl leading-snug font-semibold tracking-tight text-white">{clip.line}</span>
                </figcaption>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Controles do carrossel (mobile/tablet): contador, progresso e setas */}
        <div className="mt-6 flex items-center gap-4 sm:gap-6 lg:hidden">
          <p className="eyebrow shrink-0 text-mist tabular-nums">
            <span className="sr-only">Vídeo </span>
            <span className="text-white">{pad(index + 1)}</span> / {pad(experienceClips.length)}
          </p>

          <ul aria-label="Escolher vídeo" className="flex flex-1 gap-1.5">
            {experienceClips.map((clip, i) => (
              <li key={clip.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-controls="atendimento-sequencia"
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={`Ir para o vídeo ${i + 1}: ${clip.step}`}
                  className="flex h-8 w-full items-center"
                >
                  <span
                    className={cn(
                      'h-[3px] w-full rounded-full transition-colors duration-300',
                      i === index ? 'bg-thr-red' : i < index ? 'bg-white/60' : 'bg-white/20',
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={atStart}
              aria-controls="atendimento-sequencia"
              aria-label="Vídeo anterior"
              className="grid size-11 place-items-center rounded-full text-white ring-1 ring-white/30 transition-[opacity,background-color] ring-inset hover:bg-white/10 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={atEnd}
              aria-controls="atendimento-sequencia"
              aria-label="Próximo vídeo"
              className="grid size-11 place-items-center rounded-full bg-white text-thr-ink transition-[opacity,background-color,color] hover:bg-thr-red hover:text-white focus-visible:outline-white disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-20 grid lg:mt-28 lg:grid-cols-12">
          <RevealLines
            as="p"
            lines={[c.closing]}
            className="font-display text-display-sm font-semibold text-white lg:col-span-6 lg:col-start-7"
          />
        </div>
      </Container>
    </section>
  );
}
