import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

import { useSetSuccessSnackbar, useSuccessSnackbar } from './hooks/snackBarHooks';

const SuccessSnackBar = () => {
  const successSnackBar = useSuccessSnackbar();
  const setSuccessSnackBar = useSetSuccessSnackbar();
  const { open, message = '' } = successSnackBar;
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setSuccessSnackBar({ message: '', open: false });
      setExiting(false);
    }, 250);
  };

  useEffect(() => {
    if (open) {
      setExiting(false);
      const timer = setTimeout(() => handleClose(), 6000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        w-[560px] max-w-[calc(100vw-32px)]
        ${exiting ? 'toast-exit' : 'toast-enter'}`}
    >
      <div
        className="flex items-center gap-4 bg-white rounded-xl
          border border-border px-5 py-4
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      >
        <div
          className="flex items-center justify-center
            w-10 h-10 rounded-full bg-success/10 shrink-0"
        >
          <CheckCircle className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Success
          </p>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground
            cursor-pointer shrink-0 p-1 rounded-md
            hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SuccessSnackBar;
