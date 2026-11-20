import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ResponsiveImage from '../ui/ResponsiveImage.jsx';
import AmbientVideo from '../ui/AmbientVideo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { services } from '../../data/services.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../utils/cn.js';

const serviceIds = services.map((s) => `servico-${s.id}`);
const pad = (n) => String(n).padStart(2, '0');

function ServiceMedia({ service, active = true, sizes }) {
  const { media } = service;
  return media.type === 'video' ? (
    <AmbientVideo video={media.data} active={active} sizes={sizes} fill />
  ) : (
    <ResponsiveImage image={media.data} fill sizes={sizes} />
  );
}

/**
 * Experiência e serviços — índice editorial com "scrollytelling" no desktop:
 * a mídia fica fixa à esquerda e troca conforme o serviço lido à direita.
 * No mobile, cada serviço traz a própria mídia (sem painel fixo).
 * A rolagem é sempre nativa — nada de scroll hijacking.
 */
export default function Services() {
  const c = content.services;
  const activeId = useScrollSpy(serviceIds, { initial: serviceIds[0] });
  const activeIndex = Math.max(0, serviceIds.indexOf(activeId));

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative bg-bone py-section">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            id="servicos-title"
            index={c.index}
            label={c.label}
            title={c.title}
            className="lg:col-span-7"
          />
          <Reveal as="p" className="max-w-md self-end text-base leading-relaxed text-slate lg:col-span-4 lg:col-start-9">
            {c.lead}
          </Reveal>
        </div>

        <div className="mt-16 grid lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Painel fixo (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 max-h-[calc(100svh-9rem)] overflow-hidden bg-thr-ink">
                {services.map((service, i) => (
                  <div
                    key={service.id}
                    inert={i !== activeIndex}
                    className={cn(
                      'absolute inset-0 transition-[opacity,scale] duration-700 ease-[var(--ease-out-expo)]',
                      i === activeIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.04] opacity-0',
                    )}
                  >
                    <ServiceMedia service={service} active={i === activeIndex} sizes="40vw" />
                  </div>
                ))}
                <p className="eyebrow pointer-events-none absolute top-5 left-5 rounded-full bg-thr-ink/55 px-3 py-2 text-white">
                  {pad(activeIndex + 1)} / {pad(services.length)}
                </p>
              </div>
              <ol aria-hidden="true" className="mt-5 flex gap-2">
                {services.map((service, i) => (
                  <li
                    key={service.id}
                    className={cn(
                      'h-[3px] flex-1 origin-left transition-colors duration-500',
                      i === activeIndex ? 'bg-thr-red' : i < activeIndex ? 'bg-thr-ink/40' : 'bg-thr-ink/12',
                    )}
                  />
                ))}
              </ol>
            </div>
          </div>

          {/* Lista de serviços */}
          <ol className="flex flex-col lg:col-span-6 lg:col-start-7">
            {services.map((service, i) => {
              const isActive = i === activeIndex;
              return (
                <li
                  key={service.id}
                  id={serviceIds[i]}
                  className="border-t border-thr-ink/15 py-12 last:border-b lg:flex lg:min-h-[68svh] lg:flex-col lg:justify-center lg:border-t-0 lg:border-b-0 lg:py-16"
                >
                  <article aria-labelledby={`${serviceIds[i]}-title`}>
                    <div className="relative mb-8 aspect-4/5 overflow-hidden sm:aspect-16/11 lg:hidden">
                      <ServiceMedia service={service} sizes="(min-width: 640px) 90vw, 100vw" />
                    </div>

                    <Reveal className="flex items-start gap-6 sm:gap-10">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'font-display text-[3.5rem] leading-[0.85] font-extrabold tracking-[-0.04em] transition-colors duration-500 sm:text-[5rem]',
                          isActive ? 'text-thr-red lg:text-thr-red' : 'text-outline text-thr-ink/35',
                        )}
                      >
                        {pad(i + 1)}
                      </span>
                      <div className="flex flex-col gap-4 pt-1">
                        <h3 id={`${serviceIds[i]}-title`} className="text-display-sm font-bold text-thr-ink">
                          {service.title}
                        </h3>
                        <p className="max-w-md text-base leading-relaxed text-graphite sm:text-lg">{service.description}</p>
                        {service.tags && (
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {service.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-thr-ink ring-1 ring-thr-ink/20 ring-inset"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
