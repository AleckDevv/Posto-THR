import { useEffect, useState } from 'react';
import { m, useScroll } from 'motion/react';
import { MapPin, Menu } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import Navigation from './Navigation.jsx';
import MobileMenu from './MobileMenu.jsx';
import { navigation, sectionIds } from '../../data/navigation.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';
import { cn } from '../../utils/cn.js';

const primaryItems = navigation.filter((item) => item.primary);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(sectionIds, { rootMargin: '-40% 0px -55% 0px' });
  const { scrollYProgress } = useScroll();

  // Fundo sólido após o topo; oculta ao rolar para baixo e reaparece ao subir.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY + 6 && y > 480) setHidden(true);
      else if (y < lastY - 6 || y <= 480) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled ? 'bg-thr-ink/95 shadow-[0_1px_0_rgb(255_255_255/0.08)]' : 'bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <a href="#top" className="-m-2 p-2" aria-label="Posto THR — voltar ao início">
            <Logo tone="light" />
          </a>

          <Navigation items={primaryItems} active={active} className="hidden lg:block" />

          <div className="flex items-center gap-2">
            <Button href="#localizacao" variant="ghost" icon={MapPin} iconPosition="start" className="h-10 px-5 max-sm:hidden">
              Como chegar
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              Menu
            </button>
          </div>
        </Container>

        <m.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className={cn(
            'absolute bottom-0 left-0 h-[2px] w-full origin-left bg-thr-red transition-opacity duration-500',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
        />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </>
  );
}
