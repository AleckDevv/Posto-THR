import { useState } from 'react';
import { ArrowUpRight, Map as MapIcon, MapPin, Navigation as NavigationIcon } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import ResponsiveImage from '../ui/ResponsiveImage.jsx';
import { Eyebrow } from '../ui/SectionHeading.jsx';
import { Reveal, RevealGroup, RevealItem, RevealLines } from '../ui/Reveal.jsx';
import { content } from '../../data/content.js';
import { siteData, fullAddress } from '../../data/siteData.js';
import { locationImage } from '../../data/media.js';
import { mapsLinks, phoneLink, whatsappLink } from '../../utils/maps.js';

/**
 * Localização e contato. Horário, telefone e WhatsApp aparecem automaticamente
 * quando preenchidos em siteData.js — nada é exibido sem confirmação.
 * O mapa do Google só carrega após o clique (desempenho e privacidade).
 */
export default function Location() {
  const c = content.location;
  const { hours, contact, address } = siteData;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [firstWord, ...rest] = c.title.split(' ');

  const details = [
    {
      term: 'Endereço',
      value: (
        <address className="not-italic">
          {[address.street, address.number].filter(Boolean).join(', ')}
          {address.district && <>, {address.district}</>}
          <br />
          {address.city} — {address.stateName}, {address.country}
          {address.postalCode && <> · CEP {address.postalCode}</>}
        </address>
      ),
    },
    hours.length > 0 && {
      term: 'Horário',
      value: hours.map((h) => (
        <span key={h.days} className="block">
          {h.days}: {h.time}
        </span>
      )),
    },
    contact.phone && {
      term: 'Telefone',
      value: (
        <a href={phoneLink(contact.phone)} className="underline-offset-4 hover:underline">
          {contact.phone}
        </a>
      ),
    },
    contact.whatsapp && {
      term: 'WhatsApp',
      value: (
        <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
          Conversar pelo WhatsApp<span className="sr-only"> (abre em nova aba)</span>
        </a>
      ),
    },
  ].filter(Boolean);

  return (
    <section id="localizacao" aria-labelledby="localizacao-title" className="relative bg-paper py-section">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col lg:col-span-6">
          <Eyebrow index={c.index} label={c.label} />
          <RevealLines
            id="localizacao-title"
            lines={[firstWord, rest.join(' ')]}
            className="mt-10 text-display-lg font-extrabold text-thr-ink"
          />
          <Reveal as="p" className="eyebrow mt-7 text-thr-blue">
            {c.region}
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-md text-lg leading-relaxed text-graphite">
            {c.lead}
          </Reveal>

          <RevealGroup as="dl" className="mt-10 border-t border-line">
            {details.map((d) => (
              <RevealItem key={d.term} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="eyebrow pt-1 text-slate">{d.term}</dt>
                <dd className="text-base leading-relaxed font-medium text-thr-ink">{d.value}</dd>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button href={mapsLinks.directions} external variant="brand" size="lg" icon={NavigationIcon} iconPosition="start">
              {c.routeCta}
            </Button>
            <Button href={mapsLinks.search} external variant="outline" size="lg" icon={ArrowUpRight}>
              {c.mapsCta}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <div className="relative aspect-4/5 overflow-hidden bg-thr-ink sm:aspect-6/5">
            {mapLoaded ? (
              <iframe
                title={`Mapa: ${siteData.name} na ${c.title}, ${address.city} (${address.state})`}
                src={mapsLinks.embed}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                <ResponsiveImage image={locationImage} fill position="50% 35%" sizes="(min-width: 1024px) 46vw, 100vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-thr-ink via-thr-ink/55 to-thr-ink/5" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-6 text-white sm:p-10">
                  <span className="grid size-12 place-items-center rounded-full bg-thr-red">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{siteData.name}</p>
                    <p className="mt-1 text-sm text-mist">{fullAddress()}</p>
                  </div>
                  <Button onClick={() => setMapLoaded(true)} icon={MapIcon} iconPosition="start">
                    {c.loadMap}
                  </Button>
                  <p className="max-w-xs text-xs leading-relaxed text-mist">{c.mapNotice}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
