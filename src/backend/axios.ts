import axios from 'axios';
import qs from 'qs';
import { serviceOptions } from './services/backend';
import { showError } from '../utils';
import { logout } from '../store/reducers/auth';

export const axiosNotAuthorizedInterceptor = (error: any, dispatch: any) => {
  // Reject promise if usual error
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    showError('Время сессии истекло. Пожалуйста, авторизуйтесь заново');
    // @ts-ignore
    dispatch(logout());
  }
  return Promise.reject(error);
};

// export const axiosNotAuthorizedInterceptor = (error: any, dispatch: any) => {
//   // Reject promise if usual error
//   if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//     showError('Время сессии истекло. Пожалуйста, авторизуйтесь заново');
//     // @ts-ignore
//     // dispatch(logout());
//   }
//   return Promise.reject(error);
// };

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

axios.defaults.timeout = 2 * 60 * 1000;
axios.defaults.timeoutErrorMessage = 'Превышено время ожидания ответа сервера';
// eslint-disable-next-line max-len
axios.defaults.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' });

serviceOptions.axios = axios;
