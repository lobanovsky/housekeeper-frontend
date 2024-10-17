import { IUserData } from 'utils/types';
import axios from 'axios';
import { loginSuccess, logout } from 'store/reducers/auth';
import store from 'store';
import { axiosNotAuthorizedInterceptor } from 'backend/axios';
import { UserResponse, UserService } from '../../../backend/services/backend';
import { showError } from '../../../utils';

export const getUserData = (authData: IUserData, dispatch: any) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token,
    userId
  } = authData;

  const tokenStr = access_token ? `Bearer ${access_token}` : '';
  UserService.getUser({
    userId
  }, { headers: { Authorization: tokenStr } })
    .then((userProfile: UserResponse) => {
      axios.defaults.headers.Authorization = tokenStr;
      axios.interceptors.response.use((response) => response, (resp) => axiosNotAuthorizedInterceptor(resp, dispatch));
      store.dispatch(loginSuccess({
        ...authData,
        ...userProfile
      }));
    })
    .catch((e) => {
      showError('Не удалось загрузить данные пользователя', e);
      // @ts-ignore
      dispatch(logout());
    });
};
