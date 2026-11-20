import { useEffect, useState } from 'react';

/**
 * Observa elementos pelo id e retorna o id daquele que cruza a "linha de leitura"
 * definida por rootMargin (por padrão, o centro da janela).
 */
export function useScrollSpy(ids, { rootMargin = '-50% 0px -50% 0px', initial = null } = {}) {
  const [active, setActive] = useState(initial);
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, rootMargin]);

  return active;
}
