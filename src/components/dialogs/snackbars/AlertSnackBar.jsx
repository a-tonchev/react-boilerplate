import { useState } from 'react';
import { Info, Check } from 'lucide-react';

const AlertSnackBar = ({
  open,
  text,
  onClose,
}) => {
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setExiting(false);
      onClose();
    }, 250);
  };

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
            w-10 h-10 rounded-full bg-[#3B82F6]/10 shrink-0"
        >
          <Info className="h-5 w-5 text-[#3B82F6]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Info
          </p>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {text}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="text-success hover:opacity-80 cursor-pointer
            shrink-0 p-1 rounded-md
            hover:bg-muted transition-colors"
        >
          <Check className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertSnackBar;
