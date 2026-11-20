import { ArrowDown, MapPin } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import AmbientVideo from '../ui/AmbientVideo.jsx';
import { content } from '../../data/content.js';
import { getVideo } from '../../data/media.js';

const heroVideo = getVideo('hero');

/**
 * Hero cinematográfico.
 * O material original é vertical (9:16): no mobile ele ocupa a tela inteira;
 * no desktop vira um painel vertical à direita, ao lado da tipografia — sem
 * ampliar o vídeo além da resolução nativa.
 * As entradas usam CSS (e não JS) para começar já na primeira pintura.
 */
export default function Hero() {
  const c = content.hero;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-thr-ink text-white">
      <div className="absolute inset-0 lg:left-auto lg:w-[44%] xl:w-[41%]">
        <AmbientVideo
          video={heroVideo}
          eager
          sizes="(min-width: 1280px) 41vw, (min-width: 1024px) 44vw, 100vw"
          position="50% 40%"
          className="size-full"
          controlClassName="bottom-5 right-5 lg:bottom-8 lg:right-8"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-thr-ink via-thr-ink/60 to-thr-ink/25 lg:bg-linear-to-r lg:from-thr-ink lg:via-thr-ink/5 lg:to-transparent"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-thr-ink/80 to-transparent" />
        <p className="eyebrow pointer-events-none absolute right-20 bottom-9 hidden text-white/85 lg:block lg:right-24 lg:bottom-12">
          {c.videoCaption}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="lane-dashes absolute inset-y-0 left-[56%] hidden w-px text-white/12 lg:block xl:left-[59%]"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pt-28 pb-24 lg:min-h-[max(100svh,44rem)] lg:justify-center lg:pb-28">
        <div className="lg:max-w-[54%]">
          <p className="eyebrow mb-7 flex animate-fade items-center gap-3 text-mist [animation-delay:80ms]">
            <span aria-hidden="true" className="h-px w-8 bg-thr-red" />
            <span>
              <span className="max-sm:hidden">{c.eyebrowLead} · </span>
              {c.eyebrow}
            </span>
          </p>

          <h1 id="hero-title" className="font-display font-extrabold">
            <span className="line-mask text-display-sm font-bold text-white/85">
              <span className="block animate-rise [animation-delay:120ms]">{c.titleLead}</span>
            </span>
            <span className="mt-2 block text-display-xl">
              {c.title.map((line, i) => (
                <span key={line} className="line-mask">
                  <span className="block animate-rise" style={{ animationDelay: `${220 + i * 110}ms` }}>
                    {i === c.title.length - 1 ? (
                      <>
                        {line.replace(/\.$/, '')}
                        <span className="text-thr-red">.</span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-8 max-w-md animate-fade text-xl leading-snug font-medium text-white [animation-delay:520ms] sm:text-2xl">
            {c.subtitle}
          </p>
          <p className="mt-3 max-w-md animate-fade text-[0.95rem] leading-relaxed text-mist [animation-delay:600ms]">
            {c.support}
          </p>

          <div className="mt-10 flex animate-fade flex-wrap gap-3 [animation-delay:700ms]">
            <Button href="#localizacao" size="lg" icon={MapPin} iconPosition="start">
              {c.primaryCta}
            </Button>
            <Button href="#sobre" size="lg" variant="ghost" icon={ArrowDown}>
              {c.secondaryCta}
            </Button>
          </div>
        </div>

        <a
          href="#manifesto"
          className="eyebrow absolute bottom-10 left-5 hidden animate-fade items-center gap-4 text-mist transition-colors [animation-delay:900ms] hover:text-white sm:left-8 lg:left-12 lg:flex"
        >
          <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-white" />
          </span>
          {c.scrollHint}
        </a>
      </Container>
    </section>
  );
}
