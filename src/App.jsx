import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';

import history from '@/components/connections/History';
import LoadingContainer from '@/components/containers/LoadingContainer';
import MainRoutes from '@/components/routes/MainRoutes';
import DesignProvider from '@/components/layout/DesignProvider';

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
