import Container from '../ui/Container.jsx';
import { Eyebrow } from '../ui/SectionHeading.jsx';
import { Reveal, RevealLines } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';

/** Manifesto editorial: tipografia em grande escala, composição em escada e espaço negativo. */
export default function Manifesto() {
  const c = content.manifesto;
  const [a, b, d, e] = c.lines;

  const lines = [
    { text: a },
    { text: b, className: 'pl-[8vw] lg:pl-[16%]' },
    { text: d, className: 'text-thr-blue lg:pl-[34%]' },
    {
      text: (
        <>
          {e.replace(/\.$/, '')}
          <span className="text-thr-red">.</span>
        </>
      ),
      className: 'text-thr-blue pl-[8vw] lg:pl-[22%]',
    },
  ];

  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="relative bg-paper py-section">
      <Container>
        <Eyebrow index={c.index} label={c.label} />

        <RevealLines
          id="manifesto-title"
          lines={lines}
          gap={0.12}
          className="mt-12 text-display-lg font-bold text-thr-ink lg:mt-16"
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-3 lg:col-start-2">
            <p className="eyebrow flex items-center gap-3 text-slate">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-thr-red" />
              {c.aside}
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-6">
            {c.body.map((paragraph, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className="text-lg leading-relaxed text-graphite sm:text-xl">
                {paragraph}
              </Reveal>
            ))}
            <Reveal as="p" delay={0.2} className="mt-4 font-display text-sm font-bold tracking-[0.18em] text-thr-blue uppercase">
              {c.signature}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
