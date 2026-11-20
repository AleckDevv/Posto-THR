import { cn } from '../../utils/cn.js';

export default function Container({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12', className)} {...props}>
      {children}
    </Tag>
  );
}
