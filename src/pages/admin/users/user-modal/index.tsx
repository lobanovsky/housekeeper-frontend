import React, { useCallback } from 'react';
import { Provider, useSelector } from 'react-redux';

import { UserRequest, UserResponse, UserService } from 'backend/services/backend';
import { modal } from 'global/NotificationsProvider';
import { useLoading } from 'hooks/use-loading';
import store from 'store';
import { getWorkspaceId } from 'store/selectors/selectors';
import { showError, showMessage } from 'utils/notifications';
import { sendInvitationToUser } from '../services';
import { UserAddForm, UserAddFormProps, UserSelectType } from './user-add-form';
import './styles.scss';

interface UserModalProps extends Omit<UserAddFormProps, 'loading' | 'saveUser'> {
  onFinish: (isSuccess: boolean) => void;
}

function UserAddFormContainer({
                                onFinish,
                                onCancel,
                                user = {
                                  id: 0,
                                  name: '',
                                  createDate: ''
                                },
                                roleOptions
                              }: UserModalProps) {
  const workspaceId = useSelector(getWorkspaceId);
  const [loading, showLoading, hideLoading] = useLoading();

  const sendInvitation = useCallback((selectedUser: UserResponse) => {
    showLoading();
    sendInvitationToUser(selectedUser, hideLoading);
  }, []);

  const saveUser = useCallback(({
                                  id,
                                  doInvite,
                                  userType,
                                  ...userValues
                                }: UserRequest & { id?: number, doInvite: boolean, userType: UserSelectType }) => {
    showLoading();
    const isEdit = !!id && userType !== UserSelectType.EXISTING;
    if (userType === UserSelectType.EXISTING) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      userValues.id = id;
    }

    const promise = isEdit ? UserService.updateUser({
        userId: parseInt(String(id), 10),
        body: userValues
      })
      : UserService.createUser({
        workspaceId,
        body: userValues
      });
    promise
      .then((createdUser: UserResponse) => {
        onCancel();
        showMessage(`Пользователь ${userValues.name} ${isEdit ? 'изменён' : 'добавлен'}`);

        if (doInvite) {
          sendInvitationToUser(createdUser, () => {
            hideLoading();
            onFinish(true);
          });
        } else {
          hideLoading();
          onFinish(true);
        }
      })
      .catch((e) => {
        hideLoading();
        showError('Не удалось сохранить пользователя', e);
        onFinish(false);
      });
  }, [workspaceId, sendInvitation]);

  return (
    <UserAddForm
      loading={loading}
      user={user}
      roleOptions={roleOptions}
      saveUser={saveUser}
      onCancel={onCancel}
    />
  );
}

export const showUserModal = ({
                                onFinish,
                                roleOptions,
                                user = {
                                  id: 0,
                                  createDate: '',
                                  name: ''
                                }

                              }: {
  onFinish: (isSuccess: boolean) => void,
  roleOptions: React.ReactNode[],
  user?: UserResponse
}) => {
  let modalCmp: any = null;

  const closeModal = () => {
    modalCmp?.destroy();
  };

  modalCmp = modal.confirm({
    width: 600,
    closable: true,
    className: 'user-edit-modal modal-no-btns',
    title: user?.name || 'Добавление пользователя',
    content:
      <Provider store={store}>
        <UserAddFormContainer
          roleOptions={roleOptions}
          user={user}
          onFinish={onFinish}
          onCancel={closeModal}
        />
      </Provider>
  });
};
