import React from 'react';
import { Typography } from 'antd';
import { dateTimeRenderer } from 'utils/renderers';
import { LogEntryResponse } from '../../../backend/services/backend';

export const gateLogColumns = [
  {
    dataIndex: 'dateTime',
    title: 'Дата',
    render: dateTimeRenderer
  },
  {
    dataIndex: 'flatNumber',
    title: 'Квартира',
    // todo сделать ссылку на квартиру

    render: (flatNumber: string, { buildingId }: LogEntryResponse) => flatNumber
  },
  {
    dataIndex: 'userName',
    title: 'Пользователь'
  },
  {
    dataIndex: 'phoneNumber',
    title: 'Телефон',
    render: (phone: string = '') => {
      const formatted = phone ? phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5') : '';
      return <Typography.Text copyable={{ text: phone }}>{formatted}</Typography.Text>;
    }
  },
  {
    dataIndex: 'method',
    title: 'Способ открытия'
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    render: (status: string) => {
      const stateStr = status.toLowerCase();
      let className = '';
      if (stateStr === 'открыт') {
        className = 'OPEN';
      } else if (stateStr === 'закрыт') {
        className = 'CLOSED';
      }

      return <span className={className}>{status}</span>;
    }
  }
].map((column) => ({
  ...column,
  className: column.dataIndex
}));
