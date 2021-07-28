import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('app.title')} | Home</title>
        <meta name="description" content={`${t('app.description')} | Home`} />
      </Helmet>
      Home
    </>
  );
};

export default Home;
