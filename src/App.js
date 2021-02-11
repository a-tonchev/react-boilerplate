import React from 'react';
import { Router } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import './App.css';
import { Helmet } from 'react-helmet/es/Helmet';
import { useTranslation } from 'react-i18next';
import history from './modules/helpers/History';
import { UserContextProvider } from './contexts/UserContext';
import MainRoutes from './modules/routes/MainRoutes';
import DesignProvider from './modules/layout/DesignProvider';
import { ItemContextProvider } from './contexts/ItemContext';

const App = () => {
  const { t } = useTranslation();
  return (
    <Router history={history}>
      <Helmet>
        <title>{t('app.title')}</title>
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <UserContextProvider>
        <ItemContextProvider>
          <DesignProvider>
            <MainRoutes />
          </DesignProvider>
        </ItemContextProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
