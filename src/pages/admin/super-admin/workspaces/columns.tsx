import React from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined } from '@ant-design/icons';
import { WorkspaceResponse } from 'backend/services/backend';
import { workspaceAvatarRenderer } from '../../../../utils/renderers';

export const workspaceColumns = ({ onDeleteClick }: any): ColumnsType<WorkspaceResponse> => [
  {
    title: 'Идентификатор',
    dataIndex: 'id'
  },
  {
    title: 'Наименование',
    dataIndex: 'name',
    render: (name: string, record: WorkspaceResponse) => (
      <div>
        {workspaceAvatarRenderer(record)}
        {' '}
        {name}
      </div>
    )

  },
  {
    dataIndex: 'actions',
    render: (value: any, record: WorkspaceResponse) => (record.active ? (
      <Popconfirm
        title="Удалить пространство?"
        onCancel={(ev: React.MouseEvent<HTMLElement> | undefined) => {
          ev?.stopPropagation();
        }}
        onConfirm={(ev: React.MouseEvent<HTMLElement> | undefined) => {
          ev?.stopPropagation();
          onDeleteClick(record);
        }}
      >
        <Button
          style={{ marginLeft: 10 }}
          size="small"
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    ) : '')
  }
].map((column) => ({
  ...column,
  className: column.dataIndex
}));
