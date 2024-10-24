import { WorkspaceRequest, WorkspacesService } from '../../../../../backend/services/backend';
import { showError, showMessage } from '../../../../../utils';
import { ActionFinishCallback } from '../../../../../utils/types';

export const createWorkspace = (wpValues: WorkspaceRequest, onFinish: ActionFinishCallback) => {
  WorkspacesService.createWorkspace({
    body: wpValues
  })
    .then(() => {
      showMessage('Пространство создано');
      onFinish(true);
    })
    .catch((e) => {
      showError('Не удалось создать пространство', e);
      onFinish(false);
    });
};

export const updateWorkspace = ({
                                  id = 0,
                                  ...workspaceValues
                                }: WorkspaceRequest & { id: number }, onFinish: ActionFinishCallback) => {
  WorkspacesService.updateWorkspace({
    workspaceId: id,
    body: workspaceValues
  })
    .then(() => {
      showMessage('Изменения сохранены');
      onFinish(true);
    })
    .catch((e) => {
      showError('Не удалось сохранить изменения пространства', e);
      onFinish(false);
    });
};
