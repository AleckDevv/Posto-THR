import { ArrowLeft } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Logo from '../components/ui/Logo.jsx';
import Button from '../components/ui/Button.jsx';
import { content } from '../data/content.js';
import { siteData, fullAddress } from '../data/siteData.js';

/** Página 404 (servida pelo host com status 404 real). */
export default function NotFound() {
  const c = content.notFound;
  return (
    <div className="flex min-h-[100svh] flex-col bg-thr-ink text-white">
      <Container as="header" className="flex h-20 items-center">
        <a href="/" className="-m-2 p-2" aria-label="Posto THR — página inicial">
          <Logo tone="light" />
        </a>
      </Container>

      <Container as="main" className="flex flex-1 flex-col justify-center py-16">
        <p className="eyebrow flex items-center gap-3 text-mist">
          <span aria-hidden="true" className="h-px w-8 bg-thr-red" />
          Erro {c.code}
        </p>
        <h1 className="mt-8 max-w-4xl text-display-lg font-extrabold">{c.title}</h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-mist">{c.body}</p>
        <div className="mt-10">
          <Button href="/" size="lg" icon={ArrowLeft} iconPosition="start">
            {c.cta}
          </Button>
        </div>
      </Container>

      <Container as="footer" className="border-t border-white/10 py-8 text-xs text-concrete">
        {siteData.name} · {fullAddress()}
      </Container>
    </div>
  );
}
