import { useEffect, useState } from 'react';

/**
 * Estado de um carrossel de rolagem horizontal nativa (scroll-snap).
 * Não intercepta a rolagem: apenas lê a posição e oferece navegação por botões.
 *
 * O contêiner (ref) precisa ser posicionado (relative) para que o offsetLeft
 * dos itens seja medido a partir dele.
 */
export function useScrollCarousel(ref) {
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false, interacted: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const items = el.children;
      const max = el.scrollWidth - el.clientWidth;
      if (!items.length || max <= 1) {
        // sem rolagem (ex.: layout de grade no desktop)
        setState((s) => ({ ...s, index: 0, atStart: true, atEnd: true }));
        return;
      }
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth;
      const atEnd = el.scrollLeft >= max - 2;
      const index = atEnd ? items.length - 1 : Math.min(items.length - 1, Math.round(el.scrollLeft / step));
      setState((s) => ({
        index,
        atStart: el.scrollLeft <= 2,
        atEnd,
        interacted: s.interacted || el.scrollLeft > 8,
      }));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    el.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    frame = requestAnimationFrame(update);
    return () => {
      el.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref]);

  const scrollToLeft = (el, left) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
  };

  /** Vai direto a um item (ex.: segmento da barra de progresso). */
  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const target = snapPositions(el)[i];
    if (target !== undefined) scrollToLeft(el, target);
  };

  /**
   * Avança (+1) ou volta (-1) até a próxima parada real a partir da posição atual.
   * Em telas largas, vários itens finais compartilham a mesma parada (o fim da rolagem),
   * por isso a navegação usa posições e não o índice exibido.
   */
  const step = (direction) => {
    const el = ref.current;
    if (!el) return;
    const positions = snapPositions(el);
    const x = el.scrollLeft;
    const target =
      direction > 0 ? positions.find((p) => p > x + 2) : positions.findLast((p) => p < x - 2);
    if (target !== undefined) scrollToLeft(el, target);
  };

  return { ...state, goTo, next: () => step(1), prev: () => step(-1) };
}

/** Posição de parada de cada item, limitada ao máximo que o contêiner consegue rolar. */
function snapPositions(el) {
  const max = el.scrollWidth - el.clientWidth;
  const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
  return [...el.children].map((item) => Math.max(0, Math.min(item.offsetLeft - padding, max)));
}
