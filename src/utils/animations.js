/**
 * Linguagem de movimento do Posto THR.
 * Curva "ease-out-expo": entradas rápidas que desaceleram com suavidade,
 * como um carro chegando à bomba. Somente transform e opacity.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: EASE_OUT } },
};

/** Linha de título que sobe de dentro de uma máscara. */
export const lineRise = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 1.05, ease: EASE_OUT } },
};

/** Revelação de imagem: leve zoom-out com fade. */
export const imageReveal = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_OUT } },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});
