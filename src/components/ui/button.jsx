import { forwardRef, useCallback, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn, createRipple } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap '
  + 'rounded-lg text-base font-semibold tracking-wide transition-colors '
  + 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring '
  + 'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 '
  + 'cursor-pointer relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-secondary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-[50px] px-5 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = forwardRef(
  ({
    className, variant, size, asChild = false, onClick, ...props
  }, ref) => {
    const innerRef = useRef(null);
    const buttonRef = ref || innerRef;

    const handleClick = useCallback(e => {
      createRipple(e);
      if (onClick) onClick(e);
    }, [onClick]);

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={buttonRef}
          onClick={handleClick}
          {...props}
        />
      );
    }

    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={buttonRef}
        onClick={handleClick}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
