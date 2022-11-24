import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';

import App from './App';

import { UserState } from './context/UserState';
import { env } from './helpers/env';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Auth0Provider domain={env.domain} clientId={env.clientId} redirectUri="http://localhost:3000">
    <UserState>
      <App />
    </UserState>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
