import axios from 'axios';
import { axiosNotAuthorizedInterceptor } from 'backend/axios';
import { AvailableWorkspaceResponse, EnumUserRequestRole, UserResponse } from 'backend/services/backend';
import { showWorkspaceSelectModal } from 'hooks/use-workspace-menu';
import { EMPTY_USER, loginSuccess, logout } from 'store/reducers/auth';
import { showError } from 'utils';
import { IUserData } from 'utils/types';
import { loadUserProfile } from './services';

const onSuccessLoadUser = (userData: UserResponse & IUserData, dispatch: any) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token } = userData;
  axios.defaults.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
  axios.interceptors.response.use((response) => response, (resp) => axiosNotAuthorizedInterceptor(resp, dispatch));
  dispatch(loginSuccess({
    ...userData,
    roles: userData.role?.roleCode ? [userData.role?.roleCode as EnumUserRequestRole] : [],
    isAdmin: userData.role?.roleCode === EnumUserRequestRole.STAFF_ADMIN,
    isSuperAdmin: userData.role?.roleCode === EnumUserRequestRole.SUPER_ADMIN
  }));
};

export const getUserData = (authData: IUserData, dispatch: any) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    access_token,
    userId
  } = authData;

  const tokenStr = access_token ? `Bearer ${access_token}` : '';

  loadUserProfile(tokenStr, userId, (isSuccess, userProfile = { ...EMPTY_USER }) => {
    const resultUser: IUserData = {
      ...authData,
      ...userProfile
    };

    let grantedWorkspaces = (userProfile?.workspaces || []);

    if (!grantedWorkspaces.length) {
      showError('Нет доступных пространств для работы. Пожалуйста, обратитесь к администратору сервиса');
      dispatch(logout());
      return;
    }

    // Если есть сохранённый вп и он есть в грантед, то просто его "сохраняем" в грантед
    // - чтобы мы сразу автоматом его выбрали (и сразу с цветом)
    if (authData.workspaceId) {
      const selectedWp = grantedWorkspaces.find((wp) => wp.id === authData.workspaceId);
      if (selectedWp) {
        grantedWorkspaces = [selectedWp];
      }
    }

    if (grantedWorkspaces.length > 1) {
      showWorkspaceSelectModal({
        workspaces: resultUser.workspaces || [],
        onOk: (selectedWorkspace: AvailableWorkspaceResponse) => {
          resultUser.workspaceId = selectedWorkspace.id || 0;
          resultUser.workspaceName = selectedWorkspace.name || '';
          resultUser.workspaceColor = selectedWorkspace.color || '';
          onSuccessLoadUser(resultUser, dispatch);
        }
      });
    } else {
      const {
        id: onlyWpId,
        name: onlyWpName,
        color
      } = grantedWorkspaces[0];
      resultUser.workspaceId = onlyWpId;
      resultUser.workspaceName = onlyWpName;
      resultUser.workspaceColor = color || '';
      onSuccessLoadUser(resultUser, dispatch);
    }
  });
};
