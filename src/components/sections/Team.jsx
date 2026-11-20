import { m } from 'motion/react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ResponsiveImage from '../ui/ResponsiveImage.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { teamPhotos } from '../../data/media.js';
import { imageReveal, viewportOnce } from '../../utils/animations.js';
import { cn } from '../../utils/cn.js';

/** Foto com revelação suave; a proporção é definida pela moldura. */
function Photo({ image, frame, position, sizes, caption, className }) {
  return (
    <figure className={className}>
      <div className={cn('relative overflow-hidden', frame)}>
        <m.div
          data-reveal=""
          className="absolute inset-0"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ResponsiveImage image={image} fill position={position} sizes={sizes} />
        </m.div>
      </div>
      {caption && (
        <figcaption className="eyebrow mt-4 flex items-center gap-3 text-slate">
          <span aria-hidden="true" className="h-px w-5 bg-thr-red" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Nossa equipe — composição editorial com fotos reais em proporções diferentes.
 * Sem nomes, cargos ou dados pessoais (não informados).
 */
export default function Team() {
  const c = content.team;
  const p = teamPhotos;

  return (
    <section id="equipe" aria-labelledby="equipe-title" className="relative bg-paper py-section">
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          <div className="col-span-2 flex flex-col gap-8 lg:col-span-5 lg:pt-10">
            <SectionHeading id="equipe-title" index={c.index} label={c.label} title={c.title} size="lg" />
            <Reveal as="p" className="max-w-md text-lg leading-relaxed text-graphite">
              {c.lead}
            </Reveal>
          </div>

          <Photo
            image={p.lead}
            frame="aspect-4/5"
            position="50% 52%"
            sizes="(min-width: 1024px) 50vw, 100vw"
            caption="Equipe THR — pista"
            className="col-span-2 lg:col-span-6 lg:col-start-7 lg:row-span-2"
          />

          <Photo
            image={p.close}
            frame="aspect-3/4"
            position="50% 45%"
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="col-span-1 lg:col-span-3 lg:mt-6"
          />
          <Photo
            image={p.duo}
            frame="aspect-9/14"
            position="50% 55%"
            sizes="(min-width: 1024px) 18vw, 50vw"
            className="col-span-1 mt-16 lg:col-span-2 lg:mt-32"
          />

          <Photo
            image={p.lounge}
            frame="aspect-square"
            position="50% 62%"
            sizes="(min-width: 1024px) 34vw, 100vw"
            caption="Equipe THR — espaço interno"
            className="col-span-2 lg:col-span-4 lg:col-start-2"
          />

          <div className="col-span-2 flex flex-col justify-between gap-10 lg:col-span-6 lg:col-start-7 lg:flex-row lg:items-end lg:gap-8">
            <Reveal as="p" className="max-w-sm font-display text-display-sm font-semibold text-thr-ink lg:mb-4">
              <span aria-hidden="true" className="mb-5 block h-[3px] w-10 bg-thr-red" />
              {c.quote}
            </Reveal>
            <Photo
              image={p.arms}
              frame="aspect-4/5"
              position="50% 52%"
              sizes="(min-width: 1024px) 20vw, 60vw"
              className="w-[62%] self-end lg:w-[46%] lg:shrink-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
