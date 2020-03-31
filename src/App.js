import React from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import history from './helpers/History';
import { UserContextProvider } from './contexts/UserContext';
import MainRoutes from './routes/MainRoutes';
import DesignProvider from './layout/DesignProvider';

const App = () => (
  <Router history={history}>
    <UserContextProvider>
      <DesignProvider>
        <MainRoutes />
      </DesignProvider>
    </UserContextProvider>
  </Router>
);

export default App;
