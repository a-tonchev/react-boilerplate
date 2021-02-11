import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 160,
  },
});

const Home = () => {
  const classes = useStyles();
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
