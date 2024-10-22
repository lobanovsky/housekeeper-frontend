import { UserResponse, UserService } from 'backend/services/backend';
import { ActionFinishCallback, ServerError } from 'utils/types';
import { showError, showMessage } from 'utils/notifications';

export const sendInvitationToUser = (user: UserResponse, onFinish: ActionFinishCallback) => {
  UserService.sendInvitation({ userid: String(user.id || 0) })
    .then(() => {
      showMessage(`Приглашение для ${user.name} отправлено!`);
      onFinish(true);
    })
    .catch((e: ServerError) => {
      showError(`Не удалось отправить приглашение для ${user.name}!`, e);
      onFinish(false);
    });
};
