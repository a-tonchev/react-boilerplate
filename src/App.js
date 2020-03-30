import React from 'react';
import { Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import history from './helpers/History';
import { UserContextProvider } from './contexts/UserContext';

const App = () => (
  <Router history={history}>
    <UserContextProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </UserContextProvider>
  </Router>
);

export default App;
