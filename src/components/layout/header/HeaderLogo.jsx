import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';

const HeaderLogo = () => {
  const { t } = useTranslation();
  return (
    <CustomLink plain to="/">
      <span className="hidden sm:block font-bold text-white tracking-tight text-[1.15rem]">
        {t('app.title')}
      </span>
    </CustomLink>
  );
};

export default HeaderLogo;
