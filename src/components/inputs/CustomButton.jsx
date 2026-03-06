import { forwardRef } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const variantMap = {
  outlined: 'outline',
  contained: 'default',
  text: 'ghost',
};

const colorMap = {
  primary: 'default',
  secondary: 'secondary',
  error: 'destructive',
};

const CustomButton = forwardRef(({
  children,
  text,
  buttonTheme,
  fullMobile,
  color = 'primary',
  variant = 'contained',
  className = '',
  fullWidth,
  ...rest
}, ref) => {
  let resolvedVariant = variantMap[variant] || 'default';
  if (buttonTheme === 'green') resolvedVariant = 'secondary';
  else if (buttonTheme === 'primary') resolvedVariant = 'default';
  else if (colorMap[color] && variant === 'contained') resolvedVariant = colorMap[color];

  return (
    <Button
      ref={ref}
      aria-label={text || 'button'}
      variant={resolvedVariant}
      className={cn(
        fullMobile && 'w-full md:w-auto',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
