import {
  forwardRef, useEffect, useState, createContext, useContext,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const ANIMATION_DURATION = 300;

const Sheet = ({ open, onOpenChange, children }) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <DialogPrimitive.Root open={mounted} onOpenChange={onOpenChange}>
      <SheetAnimationContext.Provider value={visible}>
        {children}
      </SheetAnimationContext.Provider>
    </DialogPrimitive.Root>
  );
};

const SheetAnimationContext = createContext(false);

const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = forwardRef(({ className, ...props }, ref) => {
  const visible = useContext(SheetAnimationContext);
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/60 transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sideStyles = {
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
  left: 'inset-y-0 left-0 h-full w-[260px]',
  right: 'inset-y-0 right-0 h-full w-3/4 sm:max-w-sm',
};

const sideTransforms = {
  top: { hidden: '-translate-y-full', visible: 'translate-y-0' },
  bottom: { hidden: 'translate-y-full', visible: 'translate-y-0' },
  left: { hidden: '-translate-x-full', visible: 'translate-x-0' },
  right: { hidden: 'translate-x-full', visible: 'translate-x-0' },
};

const SheetContent = forwardRef(({
  side = 'left', className, children, ...props
}, ref) => {
  const visible = useContext(SheetAnimationContext);
  const transform = visible ? sideTransforms[side].visible : sideTransforms[side].hidden;

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 bg-sidebar-background text-sidebar-foreground '
          + 'shadow-lg transition-transform duration-300 ease-in-out',
          sideStyles[side],
          transform,
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
});
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
