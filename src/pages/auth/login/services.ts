import { ActionCallbackWithData, ServerError } from 'utils/types';
import { UserResponse, UserService, WorkspaceResponse, WorkspacesService } from 'backend/services/backend';
import { showError } from '../../../utils';

export const loadWorkspaceInfo = (token: string, workspaceId: number, onFinish: ActionCallbackWithData<WorkspaceResponse>) => {
  WorkspacesService.getWorkspaceById({ workspaceId }, {
    headers: {
      Authorization: token
    }
  })
    .then((wp: WorkspaceResponse) => {
      onFinish(true, wp);
    })
    .catch((e: ServerError) => {
      showError('Не удалось загрузить рабочее пространство', e);
      onFinish(false);
    });
};

export const loadUserProfile = (token: string, userId: number, onFinish: ActionCallbackWithData<UserResponse>) => {
  UserService.getUser({
    userId
  }, { headers: { Authorization: token } })
    .then((userProfile: UserResponse) => {
      onFinish(true, userProfile);
    })
    .catch((e: ServerError) => {
      showError('Не удалось загрузить профиль пользователя', e);
      onFinish(false);
    });
};
