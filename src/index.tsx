import './dayjs-config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/es/integration/react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import './backend/axios';
import reportWebVitals from './reportWebVitals';

import store, { persistor } from './store';
import App from './App';
import './index.css';
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ruRU}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
