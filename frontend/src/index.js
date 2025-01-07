import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from "./store"
import { restoreCSRF, csrfFetch } from './store/csrf';

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
  </React.StrictMode>
)
