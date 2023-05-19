import axios from 'axios';
import qs from 'qs';


import { serviceOptions as backendOptions } from 'backend/services/backend';

const backendInstance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 2 * 60 * 1000,
	timeoutErrorMessage: 'Превышено время ожидания ответа сервера',
	paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});

backendOptions.axios = backendInstance;


export default backendInstance;
