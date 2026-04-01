import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

const HeaderSearch = () => {
  const { t } = useTranslation();
  return (
    <div
      className={[
        'relative rounded-[20px] bg-white/[0.08] border border-white/[0.12]',
        'hover:bg-white/[0.12] hover:border-white/[0.2] focus-within:border-secondary',
        'focus-within:bg-white/[0.12]',
        'focus-within:shadow-[0_0_0_3px_rgba(45,173,103,0.15)]',
        'ml-0 sm:ml-6 mr-4 transition-all',
      ].join(' ')}
    >
      <div
        className="px-2 h-full absolute pointer-events-none flex items-center justify-center text-sidebar-muted z-10"
      >
        <MagnifyingGlassIcon size={18} weight="regular" />
      </div>
      <input
        placeholder={`${t('search')}...`}
        aria-label="search"
        name="header-search-nofill"
        autoComplete="off"
        data-form-type="other"
        className={[
          'bg-transparent border-none outline-none text-sidebar-foreground',
          'text-sm py-2 pl-10 pr-2 w-full md:w-[20ch] transition-all',
        ].join(' ')}
      />
    </div>
  );
};

export default HeaderSearch;
