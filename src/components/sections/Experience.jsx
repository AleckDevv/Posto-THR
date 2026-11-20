import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import AmbientVideo from '../ui/AmbientVideo.jsx';
import { Reveal, RevealLines } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { experienceClips } from '../../data/media.js';
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

        <ol
          aria-label="Sequência do atendimento"
          className={cn(
            'no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4',
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
