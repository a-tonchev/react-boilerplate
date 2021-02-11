import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';
import history from './modules/connections/History';
import LoadingContainer from './modules/containers/LoadingContainer';
import MainRoutes from './modules/routes/MainRoutes';
import DesignProvider from './modules/layout/DesignProvider';

const App = () => {
  const { t } = useTranslation();
  return (
    <Router history={history}>
      <RecoilRoot>
        <HelmetProvider>
          <Helmet>
            <title>{t('app.title')}</title>
            <meta name="description" content={t('app.description')} />
          </Helmet>
          <Suspense fallback={<div />}>
            <LoadingContainer>
              <DesignProvider>
                <MainRoutes />
              </DesignProvider>
            </LoadingContainer>
          </Suspense>
        </HelmetProvider>
      </RecoilRoot>
    </Router>
  );
};

export default App;
