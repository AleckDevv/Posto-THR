import { useEffect } from 'react';

/** Trava a rolagem da página enquanto `locked` for verdadeiro (menu mobile, lightbox). */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = 'hidden';
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous;
      root.style.paddingRight = '';
    };
  }, [locked]);
}
