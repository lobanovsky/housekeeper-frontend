import React, { useCallback, useMemo, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Table from 'components/table';
import { Workspace, WorkspacesService } from 'backend/services/backend';
import { Loading, useLoading } from 'hooks/use-loading';
import { showError, showMessage } from 'utils/notifications';
import { workspaceColumns } from './columns';
import { showWorkspaceEditModal } from './workspace-modal';
import './styles.scss';

const rowClassName = (record: Workspace) => (record.active ? 'active' : '');

export function WorkspacesList() {
  const [loading, showLoading, hideLoading] = useLoading();
  const tableRef = useRef(null);

  const reloadTable = useCallback(() => {
    // @ts-ignore
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  const onAddClick = useCallback(() => {
    showWorkspaceEditModal({
      onFinish: reloadTable
    });
  }, [reloadTable]);

  const onEditClick = useCallback((record: Workspace) => {
    showWorkspaceEditModal({
      onFinish: reloadTable,
      workspace: record
    });
  }, [reloadTable]);

  const onDeleteClick = useCallback((record: Workspace) => {
    showLoading();
    WorkspacesService.deleteWorkspace({
      workspaceId: record.id || 0
    })
      .then(() => {
        hideLoading();
        showMessage('Пространство удалено');
        reloadTable();
      })
      .catch((e) => {
        showError('Не удалось удалить пространство', e);
        hideLoading();
      });
  }, [reloadTable]);

  const tableColumns = useMemo(() => workspaceColumns({
    onDeleteClick
  }), [onDeleteClick]);

  return (
    <div className="workspaces-list">
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {loading && <Loading />}
      <Table
        toolbar={(
          <Button
            type="link"
            size="small"
            onClick={onAddClick}
          >
            {' '}
            <PlusOutlined />
            добавить пространство
          </Button>
        )}
        ref={tableRef}
        loadDataFn={WorkspacesService.getAllWorkspaces}
        columns={tableColumns}
        rowClassName={rowClassName}
        onRow={(record: Workspace) => ({
          onClick: () => {
            if (record.active) {
              onEditClick(record);
            }
          }
        })}
      />
    </div>
  );
}
