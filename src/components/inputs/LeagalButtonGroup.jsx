import { useTranslation } from 'react-i18next';

import UrlEnums from '../connections/enums/UrlEnums';

export default function LegalButtonGroup() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-1">
      <a
        className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
        href={UrlEnums.IMPRINT}
      >
        {t('legal.imprint')}
      </a>
      <a
        className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
        href={UrlEnums.PRIVACY_POLICY}
      >
        {t('legal.privacy')}
      </a>
      <a
        className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
        href={UrlEnums.TERMS}
      >
        {t('legal.terms')}
      </a>
    </div>
  );
}
