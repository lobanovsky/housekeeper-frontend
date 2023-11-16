import './dayjs-config';
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';


import reportWebVitals from './reportWebVitals';
import './backend/axios';
import App from './App';
import './index.css';


// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ConfigProvider locale={ruRU}>
			<App />
		</ConfigProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
