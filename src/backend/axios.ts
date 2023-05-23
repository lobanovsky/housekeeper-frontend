import Axios from 'axios';
import qs from 'qs';

import { serviceOptions } from './services/backend';
Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
Axios.defaults.timeout = 2 * 60 * 1000;
Axios.defaults.timeoutErrorMessage = 'Превышено время ожидания ответа сервера';
Axios.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })

serviceOptions.axios = Axios;
