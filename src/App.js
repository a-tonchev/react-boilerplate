import React from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import { Helmet } from 'react-helmet/es/Helmet';
import { useTranslation } from 'react-i18next';
import history from './helpers/History';
import { UserContextProvider } from './contexts/UserContext';
import MainRoutes from './routes/MainRoutes';
import DesignProvider from './layout/DesignProvider';

const App = () => {
  const { t } = useTranslation();
  return (
    <Router history={history}>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <UserContextProvider>
        <DesignProvider>
          <MainRoutes />
        </DesignProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
