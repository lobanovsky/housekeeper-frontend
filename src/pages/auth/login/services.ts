// import { UserResponse, UsersService } from 'backend/services/printdown';
import { ActionCallbackWithData } from 'utils/types';

export const loadUserProfile = ({
                                  userId,
                                  token = '',
                                  onFinish
                                }: {
  userId: number,
  token?: string,
  onFinish: ActionCallbackWithData<any>
}) => {
  if (!userId) {
    onFinish(false, {});
    return;
  }

  // todo test user
  onFinish(true, {});

  // todo load profile
  const authOptions = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  // UsersService.getUser({ userId }, authOptions)
  //   .then((loadedUser: UserResponse) => {
  //     (loadedUser.workspaces || []).forEach((workspace) => {
  //       const color = stringToColor(workspace.name);
  //       console.log(`For [${workspace.name}] color: [${color}]`);
  //       workspace.color = color;
  //     });
  //

  //   })
  //   .catch((e) => {
  //     showError('Не удалось загрузить данные пользователя', e);
  //     // @ts-ignore
  //     onFinish(false);
  //   });
};

// export const getUserPermissions = (authData: IUserData) => {
//     loadUserProfile({userId: authData.id, token: authData.token, onFinish: (isSuccess, loadedUser: UserResponse)})
//     const authOptions = {headers: {Authorization: `Bearer ${authData.token}`}};
//     UsersService.getUser({userId: authData.id}, authOptions)
//         .then((loadedUser: UserResponse) => {
// eslint-disable-next-line max-len
//             const userRoles: RoleResponse[] = Array.isArray(loadedUser.role) ? loadedUser.role : (loadedUser.role?.roleCode ? [loadedUser.role] : []);
//             const isAdmin = userRoles.some(({roleCode}) => roleCode === EnumUserRequestRole.ADMIN);
//             const isSuperAdmin = userRoles.some(({roleCode}) => roleCode === EnumUserRequestRole.SUPER_ADMIN);
//
//             const resultUser: IUserData = {
//                 ...authData,
//                 ...loadedUser,
//                 roles: userRoles,
//                 isAdmin,
//                 isSuperAdmin
//             };
//
//             //получаем workspace
//             WorkspaceService.getWorkspaceById({
//                 workspaceId: loadedUser.workspaceId || 0
//             }, authOptions)
//                 .then((workspaceInfo: Workspace) => {
//                     resultUser.workspaceName = workspaceInfo.name || '';
//                     store.dispatch(loginSuccess(resultUser))
//                 })
//                 .catch(e => {
//                     console.error(e);
//                     store.dispatch(loginSuccess(resultUser))
//                 })
//         })
//         .catch(e => {
//             showError('Не удалось загрузить данные пользователя', e);
//             // @ts-ignore
//             store.dispatch(loginError());
//         })
//
//
// }
