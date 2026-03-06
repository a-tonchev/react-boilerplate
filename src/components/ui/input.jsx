import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-lg border border-input ring-0 '
      + 'ring-ring bg-card px-3 py-2 text-sm transition-all duration-200 '
      + 'file:border-0 file:bg-transparent file:text-sm file:font-medium '
      + 'placeholder:text-muted-foreground focus-visible:outline-none '
      + 'focus-visible:ring-2 focus-visible:ring-ring '
      + 'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

// eslint-disable-next-line import/prefer-default-export
export { Input };
