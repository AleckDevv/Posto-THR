import { useEffect, useRef } from 'react';
import { Navigation as NavigationIcon, X } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { navigation } from '../../data/navigation.js';
import { siteData, fullAddress } from '../../data/siteData.js';
import { mapsLinks } from '../../utils/maps.js';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';
import { cn } from '../../utils/cn.js';

/** Menu mobile em <dialog> modal: foco preso, Esc fecha, rolagem da página travada. */
export default function MobileMenu({ open, onClose, active }) {
  const dialogRef = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Fecha o menu e só então rola até a seção (a página está travada enquanto aberto).
  const goTo = (event, id) => {
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
      history.replaceState(null, '', `#${id}`);
    });
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label="Menu"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-thr-ink p-0 text-white open:animate-fade lg:hidden"
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <Container className="flex h-16 shrink-0 items-center justify-between">
          <Logo tone="light" />
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </Container>

        <Container as="nav" aria-label="Principal" className="pt-8 pb-10">
          <ol className="flex flex-col">
            {navigation.map((item, i) => (
              <li key={item.id} className="border-b border-white/10">
                <a
                  href={`#${item.id}`}
                  onClick={(event) => goTo(event, item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className="group flex items-baseline gap-5 py-4"
                >
                  <span className="eyebrow w-6 text-concrete">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={cn(
                      'font-display text-[2rem] leading-none font-bold tracking-[-0.03em] transition-colors',
                      active === item.id ? 'text-white' : 'text-white/80 group-hover:text-white',
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Container>

        <Container className="mt-auto flex flex-col gap-5 pb-10">
          <p className="text-sm leading-relaxed text-mist">
            {siteData.name}
            <br />
            {fullAddress()}
          </p>
          <Button href={mapsLinks.directions} external icon={NavigationIcon} className="self-start">
            Traçar rota
          </Button>
        </Container>
      </div>
    </dialog>
  );
}
