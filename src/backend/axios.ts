import Axios from 'axios';
import qs from 'qs';

import { serviceOptions } from './services/backend';

const backendInstance = Axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	timeout: 2 * 60 * 1000,
	timeoutErrorMessage: 'Превышено время ожидания ответа сервера',
	paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});

serviceOptions.axios = backendInstance;

export default backendInstance;
