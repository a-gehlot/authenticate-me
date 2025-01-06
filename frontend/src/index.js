import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from "./store"


if (process.env.NODE_ENV !== "production") {
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
