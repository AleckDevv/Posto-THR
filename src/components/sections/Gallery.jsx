import { useState } from 'react';
import { Expand, Play } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ResponsiveImage from '../ui/ResponsiveImage.jsx';
import Lightbox from '../ui/Lightbox.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { galleryItems } from '../../data/media.js';
import { cn } from '../../utils/cn.js';

/*
 * Composição assimétrica: cada letra define colunas, deslocamento e proporção.
 * Mobile em 2 colunas; desktop em 12 colunas.
 */
const layouts = {
  a: { item: 'col-span-1 lg:col-span-4', frame: 'aspect-3/4', sizes: '(min-width:1024px) 32vw, 50vw', position: '50% 45%' },
  b: { item: 'col-span-1 mt-10 lg:col-span-3 lg:mt-28', frame: 'aspect-9/16', sizes: '(min-width:1024px) 24vw, 50vw' },
  c: { item: 'col-span-2 lg:col-span-5', frame: 'aspect-4/5', sizes: '(min-width:1024px) 40vw, 100vw', position: '50% 52%' },
  d: { item: 'col-span-2 lg:col-span-5 lg:col-start-2', frame: 'aspect-6/5', sizes: '(min-width:1024px) 40vw, 100vw' },
  e: { item: 'col-span-1 lg:col-span-3 lg:mt-24', frame: 'aspect-3/4', sizes: '(min-width:1024px) 24vw, 50vw', position: '50% 50%' },
  f: { item: 'col-span-1 mt-12 lg:col-span-3 lg:mt-0', frame: 'aspect-9/16', sizes: '(min-width:1024px) 24vw, 50vw' },
  g: { item: 'col-span-1 lg:col-span-3', frame: 'aspect-9/16', sizes: '(min-width:1024px) 24vw, 50vw' },
  h: { item: 'col-span-1 mt-14 lg:col-span-5 lg:mt-20', frame: 'aspect-4/5', sizes: '(min-width:1024px) 40vw, 50vw', position: '40% 50%' },
  i: { item: 'col-span-1 lg:col-span-4 lg:mt-16', frame: 'aspect-3/4', sizes: '(min-width:1024px) 32vw, 50vw' },
  j: { item: 'col-span-1 lg:col-span-6 lg:col-start-4', frame: 'aspect-3/4 lg:aspect-4/3', sizes: '(min-width:1024px) 48vw, 50vw', position: '50% 48%' },
};

const formatDuration = (s) => `0:${String(Math.round(s)).padStart(2, '0')}`;

/** Galeria com visualização ampliada (lightbox acessível por teclado e toque). */
export default function Gallery() {
  const c = content.gallery;
  const [index, setIndex] = useState(null);

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="relative bg-thr-ink py-section text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="galeria-title"
            index={c.index}
            label={c.label}
            title={c.title}
            size="lg"
            tone="light"
            className="lg:col-span-7"
          />
          <Reveal as="p" className="max-w-sm self-end text-base leading-relaxed text-mist lg:col-span-4 lg:col-start-9">
            {c.lead}
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 items-start gap-x-4 gap-y-6 sm:gap-x-6 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {galleryItems.map((item, i) => {
            const layout = layouts[item.layout];
            return (
              <li key={item.id} className={layout.item}>
                <Reveal delay={(i % 3) * 0.06}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-haspopup="dialog"
                    aria-label={
                      item.type === 'video'
                        ? `Assistir vídeo, ${formatDuration(item.video.duration)}: ${item.caption}`
                        : `Ampliar foto: ${item.caption}`
                    }
                    className="group relative block w-full overflow-hidden text-left focus-visible:outline-white"
                  >
                    <span className={cn('relative block overflow-hidden', layout.frame)}>
                      <ResponsiveImage
                        image={item.image}
                        alt=""
                        fill
                        position={layout.position}
                        sizes={layout.sizes}
                        imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-thr-ink/0 transition-colors duration-500 group-hover:bg-thr-ink/20"
                      />
                      {item.type === 'video' && (
                        <span className="eyebrow absolute top-3 left-3 flex items-center gap-2 rounded-full bg-thr-ink/65 px-3 py-2 text-white">
                          <Play aria-hidden="true" className="size-3" fill="currentColor" strokeWidth={0} />
                          {formatDuration(item.video.duration)}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute right-3 bottom-3 grid size-10 translate-y-1 place-items-center rounded-full bg-white text-thr-ink opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                      >
                        <Expand className="size-4" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>

      <Lightbox items={galleryItems} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </section>
  );
}
