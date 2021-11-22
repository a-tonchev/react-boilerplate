import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      {t('app.pageNotFound')}
    </div>
  );
};

export default NotFoundPage;
