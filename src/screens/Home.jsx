import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const ViteBug = lazy(() => import('./ViteBug'));

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('app.title')} | Home</title>
        <meta name="description" content={`${t('app.description')} | Home`} />
      </Helmet>
      Home
      <Suspense fallback={<div />}>
        <ViteBug />
      </Suspense>
    </>
  );
};

export default Home;
