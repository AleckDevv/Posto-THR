import { cn } from '../../utils/cn.js';

const variants = {
  // Sobre fundos escuros
  solid: 'bg-white text-thr-ink hover:bg-thr-red hover:text-white',
  ghost: 'text-white ring-1 ring-inset ring-white/35 hover:ring-white hover:bg-white/5',
  // Sobre fundos claros
  brand: 'bg-thr-blue text-white hover:bg-thr-ink',
  outline: 'text-thr-ink ring-1 ring-inset ring-thr-ink/25 hover:ring-thr-ink hover:bg-thr-ink/[0.03]',
};

const sizes = {
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-[0.95rem]',
};

/**
 * Botão/link com o mesmo visual. Renderiza <a> quando recebe `href`.
 * Links externos abrem em nova aba com rel seguro e aviso para leitores de tela.
 */
export default function Button({
  href,
  external = false,
  variant = 'solid',
  size = 'md',
  icon: Icon,
  iconPosition = 'end',
  className,
  children,
  ...props
}) {
  const classes = cn(
    'group/button inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-tight',
    'transition-[background-color,color,box-shadow] duration-300 ease-out select-none',
    variants[variant],
    sizes[size],
    className,
  );

  const iconEl = Icon ? (
    <Icon
      aria-hidden="true"
      className={cn(
        'size-[1.05em] shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]',
        iconPosition === 'end' && 'group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5',
      )}
      strokeWidth={2}
    />
  ) : null;

  const inner = (
    <>
      {iconPosition === 'start' && iconEl}
      <span>{children}</span>
      {iconPosition === 'end' && iconEl}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {inner}
    </button>
  );
}
