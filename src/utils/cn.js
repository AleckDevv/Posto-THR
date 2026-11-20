/** Concatena classes condicionalmente (sem dependência externa). */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
