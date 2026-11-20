import { ArrowUp, ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Logo from '../ui/Logo.jsx';
import { RevealLines } from '../ui/Reveal.jsx';
import { navigation } from '../../data/navigation.js';
import { content } from '../../data/content.js';
import { siteData, fullAddress } from '../../data/siteData.js';
import { mapsLinks, phoneLink, whatsappLink } from '../../utils/maps.js';

const linkClass =
  'inline-flex items-center gap-1.5 text-mist transition-colors duration-300 hover:text-white';

export default function Footer() {
  const { contact, social } = siteData;
  const contacts = [
    contact.phone && { label: contact.phone, href: phoneLink(contact.phone) },
    contact.whatsapp && { label: 'WhatsApp', href: whatsappLink(contact.whatsapp), external: true },
    contact.email && { label: contact.email, href: `mailto:${contact.email}` },
    ...social.map((s) => ({ label: s.label, href: s.url, external: true })),
  ].filter(Boolean);

  const { statement } = content.footer;

  return (
    <footer className="relative overflow-hidden bg-thr-ink text-white">
      <Container className="pt-24 lg:pt-36">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <RevealLines
            as="p"
            lines={[statement[0], { text: <>{statement[1].replace(/\.$/, '')}<span className="text-thr-red">.</span></> }]}
            className="font-display text-display-xl font-extrabold"
          />
          <a
            href="#top"
            className="group inline-flex items-center gap-3 self-start text-sm font-semibold text-mist transition-colors hover:text-white lg:self-auto"
          >
            <span className="grid size-12 place-items-center rounded-full ring-1 ring-inset ring-white/25 transition-colors group-hover:bg-white group-hover:text-thr-ink">
              <ArrowUp aria-hidden="true" className="size-5" />
            </span>
            {content.footer.backToTop}
          </a>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-mist">{siteData.concept}</p>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3">
            <h2 className="eyebrow mb-5 text-concrete">Navegação</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-3">
            <h2 className="eyebrow mb-5 text-concrete">Endereço</h2>
            <p className="text-sm leading-relaxed text-mist">
              {siteData.name}
              <br />
              {fullAddress()}
              <br />
              {siteData.address.country}
            </p>
            <a
              href={mapsLinks.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              Traçar rota
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </address>

          {contacts.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="eyebrow mb-5 text-concrete">Contato</h2>
              <ul className="flex flex-col gap-3 text-sm">
                {contacts.map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      className={linkClass}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {c.label}
                      {c.external && <span className="sr-only"> (abre em nova aba)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-8 text-xs text-concrete sm:flex-row sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {siteData.name}. {content.footer.rights}
          </p>
          <p>
            {siteData.address.city} — {siteData.address.state}
          </p>
        </div>
      </Container>
    </footer>
  );
}
