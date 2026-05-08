import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const colSpanMap = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  true: 'col-span-full',
};

const spacingMap = {
  1: 'gap-2',
  2: 'gap-4',
  3: 'gap-6',
  4: 'gap-8',
};

const directionMap = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
};

const justifyMap = {
  center: 'justify-center',
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  spaceEvenly: 'justify-evenly',
  'space-evenly': 'justify-evenly',
};

const alignMap = {
  center: 'items-center',
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const alignContentMap = {
  center: 'content-center',
  'flex-start': 'content-start',
  'flex-end': 'content-end',
};

const breakpointPrefix = {
  xs: '',
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
};

const CustomGrid = forwardRef(({
  container,
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing,
  direction,
  justifyContent,
  alignItems,
  alignContent,
  className = '',
  component: Component = 'div',
  children,
  sx,
  wrap,
  elevation,
  ...otherProps
}, ref) => {
  const classes = [];

  if (container) {
    if (direction) {
      classes.push('flex', directionMap[direction] || '');
      if (wrap !== 'nowrap') classes.push('flex-wrap');
    } else {
      classes.push('grid grid-cols-12');
    }
    if (typeof spacing === 'number') {
      classes.push(spacingMap[spacing] || `gap-${spacing * 2}`);
    } else if (typeof spacing === 'object') {
      if (spacing.xs) classes.push(spacingMap[spacing.xs] || `gap-${spacing.xs * 2}`);
      if (spacing.md) classes.push(`md:${spacingMap[spacing.md] || `gap-${spacing.md * 2}`}`);
    }
    if (justifyContent) classes.push(justifyMap[justifyContent] || '');
    if (alignItems) classes.push(alignMap[alignItems] || '');
    if (alignContent) classes.push(alignContentMap[alignContent] || '');
  }

  if (item || xs || sm || md || lg || xl) {
    const bps = {
      xs, sm, md, lg, xl,
    };
    Object.entries(bps).forEach(([bp, val]) => {
      if (val !== undefined) {
        const prefix = breakpointPrefix[bp];
        const span = colSpanMap[val];
        if (span) classes.push(`${prefix}${span}`);
      }
    });
  }

  return (
    <Component ref={ref} className={cn(...classes, className)} {...otherProps}>
      {children}
    </Component>
  );
});

CustomGrid.displayName = 'CustomGrid';

export default CustomGrid;
