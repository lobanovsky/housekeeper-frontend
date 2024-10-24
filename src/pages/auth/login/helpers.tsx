import React from 'react';
import { IUserData } from 'utils/types';
import axios from 'axios';
import { Avatar, Menu } from 'antd';
import { loginSuccess, logout } from 'store/reducers/auth';
import { axiosNotAuthorizedInterceptor } from 'backend/axios';
import { modal } from 'global/NotificationsProvider';
import { AvailableWorkspaceResponse, EnumUserRequestRole, UserResponse, UserService, Workspace } from '../../../backend/services/backend';
import { showError } from '../../../utils';

const onSuccessLoadUser = (userData: UserResponse & IUserData, dispatch: any) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { access_token } = userData;
  axios.defaults.headers.Authorization = access_token ? `Bearer ${access_token}` : '';
  axios.interceptors.response.use((response) => response, (resp) => axiosNotAuthorizedInterceptor(resp, dispatch));
  dispatch(loginSuccess({
    ...userData,
    roles: userData.role?.roleCode ? [userData.role?.roleCode as EnumUserRequestRole] : [],
    isAdmin: userData.role?.roleCode === 'STAFF_ADMIN',
    isSuperAdmin: userData.role?.roleCode === 'SUPER_ADMIN'
  }));
};

const showWorkspaceSelectModal = ({
                                    grantedWorkspaces,
                                    onOk
                                  }: {
  grantedWorkspaces: AvailableWorkspaceResponse[],
  onOk: (selectedWorkspace: Workspace) => void
}) => {
  const modalCmp = modal.info({
    className: 'workspace-selector',
    title: 'Выберите пространство для работы',
    // eslint-disable-next-line react/jsx-no-undef
    content: <Menu
      onClick={({
                  item,
                  key,
                  keyPath,
                  domEvent
                }) => {
        const [workspaceIdStr, workspaceName = ''] = key.split(' - ');
        const workspaceId = parseInt(workspaceIdStr, 10);
        if (workspaceId) {
          modalCmp.destroy();
          onOk({
            id: workspaceId,
            createDate: '',
            name: workspaceName || workspaceIdStr
          });
        }
      }}
      // @ts-ignore
      items={grantedWorkspaces.map((workspace) => ({
        key: `${workspace.id} - ${workspace.name}`,
        label: <div className="workspace-item">
          <Avatar style={{
            // todo color
            backgroundColor: 'gray',
            color: 'white'
          }}
          >
            {workspace.name ? workspace.name[0].toUpperCase() : '?'}
          </Avatar>
          {workspace.name}
               </div>
      }))}

    />
  });
};

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
      const resultUser: IUserData = {
        ...authData,
        ...userProfile
      };

      if ((userProfile.workspaces || []).length > 1 && !authData.workspaceId) {
        showWorkspaceSelectModal({
          grantedWorkspaces: resultUser.workspaces || [],
          onOk: (selectedWorkspace) => {
            resultUser.workspaceId = selectedWorkspace.id || 0;
            resultUser.workspaceName = selectedWorkspace.name || '';
            onSuccessLoadUser(resultUser, dispatch);
          }
        });
      } else {
        // если есть сохранённый в localStorage воркспейс, то берём его
        if (authData.workspaceId) {
          resultUser.workspaceId = authData.workspaceId;
          resultUser.workspaceName = authData.workspaceName;
        } else {
          // иначе берём единственный из доступных
          const grantedWorkspace = resultUser.workspaces.length ? resultUser.workspaces[0] : {
            id: 0,
            name: ''
          };
          resultUser.workspaceId = grantedWorkspace.id || 0;
          resultUser.workspaceName = grantedWorkspace.name || '';
        }

        onSuccessLoadUser(resultUser, dispatch);
      }
    })
    .catch((e) => {
      showError('Не удалось загрузить данные пользователя', e);
      // @ts-ignore
      dispatch(logout());
    });
};
