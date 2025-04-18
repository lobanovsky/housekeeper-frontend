import React from 'react';
import {
  BankOutlined,
  DollarCircleFilled,
  GroupOutlined,
  LockFilled,
  MinusOutlined,
  PlusOutlined,
  SettingFilled,
  UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GateIcon } from 'icons/gate';
import { BuildingIcon } from '../icons/building';
import { ApartmentPlanIcon } from '../icons/apartment_plan';
import { TreeFilledIcon } from '../icons/tree-filled';
import { EnumUserRequestRole } from '../backend/services/backend';
import { NavigationType } from './types';

export const NavigationItems: NavigationType = [
  {

    key: 'accesses',
    icon: <LockFilled />,
    label: 'Доступы',
    children: [
      {
        key: '/buildings',
        icon: <BuildingIcon />,
        title: 'Дома',
        label: <Link to="/buildings">Дома</Link>
      },
      {
        key: '/gates',
        icon: <GateIcon />,
        title: 'Шлагбаумы',
        label: <Link to="/gates">Шлагбаумы</Link>
      },
      {
        key: '/areas',
        icon: <TreeFilledIcon />,
        title: 'Зоны доступа',
        label: <Link to="/areas">Зоны доступа</Link>
      }
    ]
  },
  {
    key: 'payments',
    icon: <DollarCircleFilled />,
    label: 'Деньги',
    children: [
      {
        key: '/payments',
        icon: <PlusOutlined />,
        title: 'Платежи',
        label: <Link to="/payments">Платежи</Link>
      },
      {
        key: '/expenses',
        icon: <MinusOutlined />,
        title: 'Траты',
        label: <Link to="/expenses">Траты</Link>
      },
      {
        key: '/counterparties',
        icon: <BankOutlined />,
        title: 'Компании-поставщики',
        label: <Link to="/counterparties">Компании-поставщики</Link>
      }

    ]
  },

  {

    key: 'admin',
    icon: <SettingFilled />,
    label: 'Управление',
    roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
    children: [
      {
        key: '/uploaded-files',
        icon: <GroupOutlined />,
        title: 'Загруженные файлы',
        roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
        label: <Link to="/uploaded-files">Загруженные файлы</Link>
      },
      {
        key: '/users',
        icon: <UserOutlined />,
        title: 'Пользователи',
        roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
        label: <Link to="/users">Пользователи</Link>
      },
      {
        key: '/rooms',
        icon: <ApartmentPlanIcon />,
        title: 'Помещения',
        roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
        label: <Link to="/rooms">Помещения</Link>
      },
      {
        key: '/workspaces',
        icon: <ApartmentPlanIcon />,
        roles: [EnumUserRequestRole.SUPER_ADMIN],
        title: 'Пространства',
        label: <Link to="/workspaces">Пространства</Link>
      }
    ]
  }
];

export const getNavigationItemByPathname = (pathname: string, item = {
  key: '',
  children: []
}): any => {
  let result = null;
  if (item.key && (item.key === pathname || pathname.startsWith(`${item.key}/`))) {
    result = item;
    // @ts-ignore
  } else if ((item.children || []).length) {
    // @ts-ignore
    const children = item.children || [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= children.length && !result; i++) {
      result = getNavigationItemByPathname(pathname, children[i]);
    }
  }

  return result;
};
