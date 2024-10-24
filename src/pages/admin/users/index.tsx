import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { UserResponse, UserService } from 'backend/services/backend';
import Table from 'components/table';
import { useLoading } from 'hooks/use-loading';
import { StoreState } from 'store';
import { showError, showMessage } from 'utils/notifications';
import { ServerError } from 'utils/types';

import { userColumns } from './columns';
import { useUserRoleOptions } from './hooks';
import { userFilters } from './filters';
import { sendInvitationToUser } from './services';
import './style.scss';
import { showUserModal } from './user-modal';

export function Users() {
  const {
    user: {
      workspaceId,
      isSuperAdmin
    }
  } = useSelector((store: StoreState) => store.auth);

  const tableRef = useRef(null);
  const [roleOptions] = useUserRoleOptions();
  const [loading, showLoading, hideLoading] = useLoading();

  const reloadTable = useCallback(() => {
    // @ts-ignore
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  const onAddClick = useCallback(() => {
    showUserModal({
      user: {
        id: 0,
        name: ''
      },
      roleOptions,
      onFinish: (isSuccess) => {
        if (isSuccess) {
          reloadTable();
        }
      }
    });
  }, [reloadTable, roleOptions.length]);

  const onEditClick = useCallback((user: UserResponse) => {
    // todo
    showUserModal({
      user,
      roleOptions,
      onFinish: (isSuccess) => {
        if (isSuccess) {
          reloadTable();
        }
      }
    });
  }, [reloadTable, roleOptions.length]);

  const onDeleteClick = useCallback((user: UserResponse, hardDelete = false) => {
    showLoading();
    const promise = hardDelete
      ? (isSuperAdmin ? UserService.deleteUser({ userId: user.id || 0 }) : null)
      : UserService.removeUserFromWorkspace({
        workspaceId,
        userId: user.id || 0
      });

    if (promise) {
      promise
        .then(() => {
          hideLoading();
          showMessage(`Пользователь ${user.name} удалён!`);
          reloadTable();
        })
        .catch((e: ServerError) => {
          hideLoading();
          showError(`Не удалось удалить пользователя ${user.name}`, e);
        });
    }
  }, [reloadTable, workspaceId, isSuperAdmin]);

  const sendInvitation = useCallback((user: UserResponse) => {
    showLoading();
    sendInvitationToUser(user, hideLoading);
  }, []);

  const tableColumns = useMemo(() => userColumns({
    onEditClick,
    onDeleteClick,
    isSuperAdmin,
    sendInvitation
  }), [onEditClick, onDeleteClick, isSuperAdmin]);

  const convertRequestParams = useCallback(({
                                              pageNum,
                                              pageSize,
                                              ...params
                                            }: any) => ({
    ...params,
    page: pageNum,
    size: pageSize,
    workspaceId,
    active: true
  }), [workspaceId]);

  useEffect(() => {
    reloadTable();
  }, [workspaceId]);

  return (
    <div className="users-list">
      <Table
        ref={tableRef}
        columns={tableColumns}
        filters={userFilters}
        loadDataFn={UserService.getAllUsers}
        requestParamsConverter={convertRequestParams}
        toolbar={(
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={onAddClick}
          >
            <PlusOutlined />
            Добавить пользователя
          </Button>
        )}
      />
    </div>
  );
}
