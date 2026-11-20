import { m } from 'motion/react';
import { fadeUp, lineRise, stagger, viewportOnce } from '../../utils/animations.js';
import { cn } from '../../utils/cn.js';

/**
 * Revela o conteúdo ao entrar na tela (uma única vez).
 * `data-reveal` permite que o <noscript> do index.html mostre tudo sem JavaScript.
 */
export function Reveal({ as = 'div', variants = fadeUp, delay = 0, className, children, ...props }) {
  const Tag = m[as];
  const resolved = delay
    ? { ...variants, visible: { ...variants.visible, transition: { ...variants.visible.transition, delay } } }
    : variants;
  return (
    <Tag
      data-reveal=""
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Container que escalona a entrada dos filhos marcados com <RevealItem>. */
export function RevealGroup({ as = 'div', gap = 0.09, delay = 0, className, children, ...props }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', variants = fadeUp, className, children, ...props }) {
  const Tag = m[as];
  return (
    <Tag data-reveal="" className={className} variants={variants} {...props}>
      {children}
    </Tag>
  );
}

/**
 * Título com revelação linha a linha (cada linha sobe de dentro de uma máscara).
 * `lines` pode conter strings ou objetos { text, className }.
 */
export function RevealLines({ as = 'h2', lines, className, lineClassName, gap = 0.08, ...props }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {lines.map((line, i) => {
        const { text, className: own } = typeof line === 'string' ? { text: line } : line;
        return (
          <span key={i} className={cn('line-mask', lineClassName, own)}>
            <m.span data-reveal="" className="block will-change-transform" variants={lineRise}>
              {text}
            </m.span>
          </span>
        );
      })}
    </Tag>
  );
}
