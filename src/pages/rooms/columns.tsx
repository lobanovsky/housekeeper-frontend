import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { EnumRoomVOType, RoomVO } from 'backend/services/backend';
import { ShopOutlined } from '@ant-design/icons';
import { FlatIcon } from 'icons/flat';
import { CarIcon } from 'icons/car';

const accountNumberRenderer = (account: string = '') => {
  const groups = [account.slice(0, 6), account.slice(6)];
  return groups?.join(' ') || '';
};

export const roomColumns: ColumnsType<RoomVO> = [
  {
    dataIndex: 'type',
    title: '',
    render: (type: EnumRoomVOType) => (
      <div className={type}>
        {type === EnumRoomVOType.FLAT && <FlatIcon />}
        {type === EnumRoomVOType.GARAGE && <CarIcon />}
        {type === EnumRoomVOType.OFFICE && <ShopOutlined />}
      </div>
    )
  },
  {
    dataIndex: 'account',
    title: 'Лицевой счёт',
    render: accountNumberRenderer
  },
  {
    dataIndex: 'number',
    title: '№ квартиры'
  },
  {
    dataIndex: 'ownerName',
    title: 'Собственник',
    render: (ownerName: string) => {
      const owners = ownerName.split(', ');
      return (
        <>
          {owners.map((name) => (
            <>
              {name}
              <br />
            </>
          ))}
        </>
      );
    }
  },
  {
    dataIndex: 'square',
    title: 'Площадь (кв. м)',
    render: (square: number, { percentage }: RoomVO) => `${square} (${percentage}%)`
  },
  {
    dataIndex: 'street',
    title: 'Дом',
    render: (street: string, { building }: RoomVO) => `${street} ${building}`
  }

].map((column) => ({
  ...column,
  className: column.dataIndex
}));
