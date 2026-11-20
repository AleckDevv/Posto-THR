import { cn } from '../../utils/cn.js';

/*
 * LOGOTIPO OFICIAL
 * Coloque o arquivo oficial do Posto THR (SVG de preferência, ou PNG/WebP com
 * fundo transparente) em src/assets/logo/. Ele é detectado automaticamente e
 * substitui a assinatura tipográfica provisória abaixo — sem outras alterações.
 * Use os nomes "logo-light.*" (versão para fundos escuros) e "logo-dark.*"
 * (versão para fundos claros), ou um único "logo.*" para ambos.
 */
const files = import.meta.glob('../../assets/logo/*.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const findLogo = (name) =>
  Object.entries(files).find(([path]) => path.split('/').pop().replace(/\.\w+$/, '') === name)?.[1] ?? null;

const official = {
  light: findLogo('logo-light') ?? findLogo('logo'),
  dark: findLogo('logo-dark') ?? findLogo('logo'),
};

/**
 * @param {'light'|'dark'} tone  light = para fundos escuros; dark = para fundos claros
 */
export default function Logo({ tone = 'light', className }) {
  const src = official[tone];

  if (src) {
    return <img src={src} alt="Posto THR" height={40} className={cn('h-9 w-auto', className)} />;
  }

  // Assinatura tipográfica PROVISÓRIA — não é uma nova versão da marca.
  return (
    <span
      className={cn(
        'inline-block font-display text-[1.3rem] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap',
        tone === 'light' ? 'text-white' : 'text-thr-blue',
        className,
      )}
    >
      <span className="text-[0.62em] font-bold tracking-[0.18em] uppercase">Posto</span>
      {' '}
      <span className={tone === 'light' ? 'text-white' : 'text-thr-ink'}>THR</span>
    </span>
  );
}
