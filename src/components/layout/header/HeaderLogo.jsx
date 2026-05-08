import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';

const HeaderLogo = () => {
  const { t } = useTranslation();
  return (
    <CustomLink plain to="/">
      <span className="hidden sm:block font-bold text-white tracking-tight text-lg">
        {t('app.title')}
      </span>
    </CustomLink>
  );
};

export default HeaderLogo;
