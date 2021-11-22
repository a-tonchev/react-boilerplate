import ReactDOM from 'react-dom';
import { StrictMode } from 'react';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
