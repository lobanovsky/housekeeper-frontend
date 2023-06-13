import axios from 'axios';
import qs from 'qs';


import { serviceOptions } from './services/backend';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.timeout = 2 * 60 * 1000;
axios.defaults.timeoutErrorMessage = 'Превышено время ожидания ответа сервера';
axios.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })

serviceOptions.axios = axios;
