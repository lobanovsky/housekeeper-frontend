import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { AimOutlined, DeleteOutlined, EditOutlined, MailOutlined } from '@ant-design/icons';
import { RoleResponse, UserResponse } from 'backend/services/backend';

export const userColumns = ({
                              onEditClick,
                              onDeleteClick,
                              sendInvitation,
                              isSuperAdmin,
                              isAdmin
                            }: any): ColumnsType<UserResponse> => [
  {
    title: 'ФИО',
    dataIndex: 'name'
  },
  {
    title: 'Почта',
    dataIndex: 'email'
  },
  {
    title: 'Роль',
    dataIndex: 'role',
    render: (role: RoleResponse) => role?.roleName
  },
  {
    dataIndex: 'actions',
    width: 160,
    hidden: !(isAdmin || isSuperAdmin),
    render: (value: any, record: UserResponse) => (
      <>

        <Popconfirm
          title="Отправить приглашение на почту?"
          onCancel={(ev: React.MouseEvent<HTMLElement> | undefined) => {
            ev?.preventDefault();
          }}
          onConfirm={(ev: React.MouseEvent<HTMLElement> | undefined) => {
            ev?.preventDefault();
            sendInvitation(record);
          }}
        >
          <Tooltip title="Пригласить">
            <Button
              size="small"
              onClick={(ev: React.MouseEvent<HTMLElement> | undefined) => {
                ev?.preventDefault();
              }}
            >
              <MailOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
        <Tooltip title="Редактировать">
          <Button
            size="small"
            onClick={(ev: React.MouseEvent<HTMLElement> | undefined) => {
              ev?.preventDefault();
              onEditClick(record);
            }}
          >
            <EditOutlined />
          </Button>
        </Tooltip>

        <Popconfirm
          title={isSuperAdmin ? 'Отвязать пользователя от пространства?' : 'Удалить пользователя'}
          onCancel={(ev: React.MouseEvent<HTMLElement> | undefined) => {
            ev?.preventDefault();
          }}
          onConfirm={(ev: React.MouseEvent<HTMLElement> | undefined) => {
            ev?.preventDefault();
            onDeleteClick(record);
          }}
        >
          <Tooltip title={isSuperAdmin ? 'Отвязать от пространства' : 'Удалить'}>
            <Button
              // style={{ marginLeft: 10 }}
              size="small"
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </Popconfirm>
        {
          isSuperAdmin && (
            <Popconfirm
              title="Удалить пользователя?"
              onCancel={(ev: React.MouseEvent<HTMLElement> | undefined) => {
                ev?.preventDefault();
              }}
              onConfirm={(ev: React.MouseEvent<HTMLElement> | undefined) => {
                ev?.preventDefault();
                onDeleteClick(record, true);
              }}
            >
              <Tooltip title="Удалить">
                <Button
                  className="kill-btn"
                  // style={{ marginLeft: 10 }}
                  size="small"
                >
                  <AimOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          )
        }
      </>
    )
  }
]
  .filter(({ hidden }) => !hidden)
  .map((column) => ({
    ...column,
    className: column.dataIndex
  }));
