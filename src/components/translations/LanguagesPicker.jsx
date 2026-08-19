import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';

import { setLanguage } from '@/screens/users/stores/userStore';

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
];

const LanguagesPicker = () => {
  const changeLanguage = setLanguage;
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const panelRef = useRef(null);

  const handleSelect = code => {
    changeLanguage(code);
    setLang(code);
    setOpen(false);
  };

  const { language } = i18n;
  useEffect(() => {
    setLang(language);
  }, [language]);

  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (anchorRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <div className="relative">
      <button
        ref={anchorRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={[
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border',
          'border-white/20 bg-white/[0.08] text-sidebar-foreground transition-all',
          'hover:bg-white/[0.15] hover:border-white/30 cursor-pointer',
        ].join(' ')}
      >
        <Globe size={16} />
        <span className="font-semibold text-xs tracking-wider leading-none">
          {currentLang.flag}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          style={{
            transition: 'transform 0.15s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      {open && (
        <div
          ref={panelRef}
          className={[
            'absolute top-full left-0 mt-1 z-[1300] min-w-[160px]',
            'rounded-lg overflow-hidden border bg-popover shadow-lg',
          ].join(' ')}
        >
          <div className="py-1">
            {languages.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                className={[
                  'flex justify-between items-center w-full py-2 px-4',
                  'mx-0.5 rounded-md text-sm transition-colors cursor-pointer',
                  l.code === lang ? 'bg-background' : '',
                  'hover:bg-muted',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <span className="font-bold text-xs tracking-wider text-muted-foreground min-w-[22px]">
                    {l.flag}
                  </span>
                  <span className="font-medium">{l.label}</span>
                </span>
                {l.code === lang && (
                  <Check size={16} strokeWidth={2.5} className="text-success" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesPicker;
