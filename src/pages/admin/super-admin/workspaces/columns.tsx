import React from 'react';
import { Button, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined } from '@ant-design/icons';
import { Workspace } from 'backend/services/backend';

export const workspaceColumns = ({
                                   onEditClick,
                                   onDeleteClick
                                 }: any): ColumnsType<Workspace> => [
  {
    title: 'Идентификатор',
    dataIndex: 'id'
  },
  {
    title: 'Наименование',
    dataIndex: 'name'
  },
  {
    dataIndex: 'actions',
    render: (value: any, record: Workspace) => (record.active ? (
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
