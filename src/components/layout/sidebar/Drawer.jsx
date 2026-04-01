import { useEffect, useState } from 'react';
import { ListIcon } from '@phosphor-icons/react';

import { createRipple } from '@/lib/utils';

import Sidebar from './Sidebar';

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <>
      {open && (
        <>
          <div
            className={[
              'fixed inset-0 z-40 bg-black/60 transition-opacity duration-300',
              visible ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            role="button"
            tabIndex={0}
            aria-label="close drawer"
            onClick={handleClose}
            onKeyDown={handleClose}
          />
          <div
            className={[
              'fixed inset-y-0 left-0 z-50 w-[260px]',
              'bg-sidebar-background text-sidebar-foreground shadow-lg',
              'transition-transform duration-300 ease-in-out',
              visible ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}
          >
            <div
              role="presentation"
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <Sidebar />
            </div>
          </div>
        </>
      )}
      <button
        type="button"
        aria-label="open drawer"
        onClick={e => { createRipple(e); setOpen(true); }}
        className={[
          'text-sidebar-muted rounded-lg p-2 hover:bg-white/10',
          'hover:text-white transition-all cursor-pointer',
          'relative overflow-hidden',
        ].join(' ')}
      >
        <ListIcon size={22} weight="regular" />
      </button>
    </>
  );
};

export default Drawer;
