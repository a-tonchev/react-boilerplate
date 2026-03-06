import { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary '
      + 'ring-0 ring-ring shadow-sm transition-all duration-200 '
      + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
      + 'disabled:cursor-not-allowed disabled:opacity-50 '
      + 'data-[state=checked]:bg-primary '
      + 'data-[state=checked]:text-primary-foreground cursor-pointer',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-3.5 w-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// eslint-disable-next-line import/prefer-default-export
export { Checkbox };
