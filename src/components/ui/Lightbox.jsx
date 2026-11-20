import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Visualização ampliada da galeria com <dialog> nativo:
 * foco preso no modal, Esc para fechar, setas do teclado e gesto de deslizar.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useLockBodyScroll(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const go = (step) => onNavigate((index + step + items.length) % items.length);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };

  const onTouchStart = (event) => {
    touchX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const navButton =
    'grid size-12 place-items-center rounded-full text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10 focus-visible:outline-white';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lightbox-caption"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-thr-ink/95"
    >
      {item && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="eyebrow text-mist" aria-live="polite">
              <span className="text-white">{pad(index + 1)}</span> / {pad(items.length)}
            </p>
            <button type="button" onClick={onClose} className={navButton} aria-label="Fechar visualização">
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center gap-4 px-3 sm:px-8">
            <button type="button" onClick={() => go(-1)} className={`${navButton} hidden shrink-0 sm:grid`} aria-label="Item anterior">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>

            <figure key={item.id} className="flex h-full min-h-0 w-full max-w-5xl flex-col items-center justify-center animate-fade">
              {item.type === 'video' ? (
                <video
                  src={item.video.src}
                  poster={item.image.src}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={item.caption}
                  width={item.video.width}
                  height={item.video.height}
                  className="max-h-full min-h-0 w-auto max-w-full object-contain"
                />
              ) : (
                <picture className="contents">
                  <source type="image/avif" srcSet={item.image.avif} sizes="(min-width: 1024px) 60vw, 100vw" />
                  <source type="image/webp" srcSet={item.image.webp} sizes="(min-width: 1024px) 60vw, 100vw" />
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="max-h-full min-h-0 w-auto max-w-full object-contain"
                    style={{ backgroundColor: item.image.color }}
                  />
                </picture>
              )}
            </figure>

            <button type="button" onClick={() => go(1)} className={`${navButton} hidden shrink-0 sm:grid`} aria-label="Próximo item">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-6 px-5 py-5 sm:px-8">
            <p id="lightbox-caption" className="max-w-2xl text-sm leading-relaxed text-mist">
              {item.caption}
            </p>
            <div className="flex gap-2 sm:hidden">
              <button type="button" onClick={() => go(-1)} className={navButton} aria-label="Item anterior">
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} className={navButton} aria-label="Próximo item">
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
