import { Fragment } from 'react';
import { m } from 'motion/react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import ResponsiveImage from '../ui/ResponsiveImage.jsx';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { siteData, fullAddress } from '../../data/siteData.js';
import { aboutMedia } from '../../data/media.js';
import { imageReveal, viewportOnce } from '../../utils/animations.js';

// Itens separados por " · ", sem quebra dentro de cada item (ex.: "Diesel S-10")
const inline = (items) =>
  items.map((item, i) => (
    <Fragment key={item}>
      {i > 0 && ' · '}
      <span className="whitespace-nowrap">{item}</span>
    </Fragment>
  ));

const factValue = (fact) => {
  if (fact.key === 'fuels') return inline(siteData.fuels);
  if (fact.key === 'payment') return inline(siteData.payment);
  if (fact.key === 'address') return fullAddress();
  return fact.value;
};

/** Conheça o THR: texto e fatos verificáveis à esquerda, colagem editorial de fotos à direita. */
export default function About() {
  const c = content.about;

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-white py-section">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pr-8">
          <SectionHeading id="sobre-title" index={c.index} label={c.label} title={c.title} />

          <div className="mt-10 flex max-w-xl flex-col gap-5">
            {c.body.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className="text-lg leading-relaxed text-graphite">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <RevealGroup as="dl" className="mt-14 border-t border-line">
            {c.facts.map((fact) => (
              <RevealItem
                key={fact.term}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="eyebrow pt-1 text-slate">{fact.term}</dt>
                <dd className="font-display text-lg font-semibold tracking-tight text-thr-ink">{factValue(fact)}</dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="relative lg:col-span-6 lg:pt-24">
          <figure className="relative ml-auto w-[86%] sm:w-[72%] lg:w-[78%]">
            <div className="relative aspect-4/5 overflow-hidden">
              <m.div
                data-reveal=""
                className="absolute inset-0"
                variants={imageReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <ResponsiveImage
                  image={aboutMedia.main}
                  fill
                  position="50% 58%"
                  sizes="(min-width: 1024px) 36vw, (min-width: 640px) 60vw, 86vw"
                />
              </m.div>
            </div>
            <figcaption className="eyebrow mt-4 flex items-center justify-end gap-3 text-slate">
              <span aria-hidden="true" className="h-px w-6 bg-thr-red" />
              {c.captions[0]}
            </figcaption>
          </figure>

          <figure className="relative -mt-40 w-[46%] sm:-mt-56 sm:w-[42%] lg:-mt-72 lg:w-[44%]">
            <div className="relative aspect-3/4 overflow-hidden ring-10 ring-white">
              <m.div
                data-reveal=""
                className="absolute inset-0"
                variants={imageReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <ResponsiveImage
                  image={aboutMedia.detail}
                  fill
                  position="40% 55%"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 36vw, 52vw"
                />
              </m.div>
            </div>
            <figcaption className="eyebrow mt-4 text-slate">{c.captions[1]}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
