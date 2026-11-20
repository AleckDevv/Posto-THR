import { Reveal, RevealLines } from './Reveal.jsx';
import { cn } from '../../utils/cn.js';

/** Sobrescrito editorial: traço vermelho + índice + rótulo. */
export function Eyebrow({ index, label, tone = 'dark', className }) {
  return (
    <Reveal
      as="p"
      className={cn(
        'eyebrow flex items-center gap-3',
        tone === 'dark' ? 'text-slate' : 'text-mist',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-thr-red" />
      {index && <span className={tone === 'dark' ? 'text-thr-ink' : 'text-white'}>{index}</span>}
      <span>{label}</span>
    </Reveal>
  );
}

/**
 * Cabeçalho de seção: sobrescrito + título (h2) com revelação por linhas.
 * `tone`: 'dark' = texto escuro (fundos claros) | 'light' = texto claro (fundos escuros).
 */
export default function SectionHeading({ id, index, label, title, size = 'md', tone = 'dark', className, titleClassName }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={cn('flex flex-col gap-7', className)}>
      <Eyebrow index={index} label={label} tone={tone} />
      <RevealLines
        id={id}
        lines={lines}
        className={cn(
          'font-bold',
          size === 'lg' ? 'text-display-lg' : 'text-display-md',
          tone === 'dark' ? 'text-thr-ink' : 'text-white',
          titleClassName,
        )}
      />
    </div>
  );
}
