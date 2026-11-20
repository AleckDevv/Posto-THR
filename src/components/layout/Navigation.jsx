import { cn } from '../../utils/cn.js';

/** Navegação principal (desktop). Indica a seção atual com aria-current. */
export default function Navigation({ items, active, className }) {
  return (
    <nav aria-label="Principal" className={className}>
      <ul className="flex items-center gap-1 xl:gap-2">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  'group relative block px-3 py-2 text-[0.9rem] font-medium transition-colors duration-300',
                  current ? 'text-white' : 'text-white/70 hover:text-white',
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3 bottom-0.5 h-px origin-left bg-thr-red transition-transform duration-500 ease-[var(--ease-out-expo)]',
                    current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
