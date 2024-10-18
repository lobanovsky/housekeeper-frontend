import React from 'react';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BankOutlined,
  CloudUploadOutlined,
  DollarCircleFilled,
  GroupOutlined,
  LockFilled,
  SettingFilled
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GateIcon } from 'icons/gate';
import { showPaymentsImportModal } from 'pages/payments/import';
import { ExpenseIcon } from '../icons/expense';
import { BuildingIcon } from '../icons/building';
import { ApartmentPlanIcon } from '../icons/apartment_plan';
import { TreeFilledIcon } from '../icons/tree-filled';

export const NavigationItems: any = [
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
        key: '/payments-incoming',
        icon: <ArrowDownOutlined />,
        title: 'Входящие',
        label: <Link to="/payments-incoming">Входящие платежи</Link>
      },
      {
        key: '/payments-outgoing',
        icon: <ArrowUpOutlined />,
        title: 'Исходящие',
        label: <Link to="/payments-outgoing">Исходящие платежи</Link>
      },
      {
        key: '/import-payments',
        icon: <CloudUploadOutlined />,
        title: 'Загрузить файл',
        onClick: showPaymentsImportModal,
        label: 'Загрузить файл с платежами'
      },
      {
        key: '/expenses',
        icon: <ExpenseIcon />,
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
    children: [
      {
        key: '/uploaded-files',
        icon: <GroupOutlined />,
        title: 'Загруженные файлы',
        label: <Link to="/uploaded-files">Загруженные файлы</Link>
      },
      {
        key: '/rooms',
        icon: <ApartmentPlanIcon />,
        title: 'Помещения',
        label: <Link to="/rooms">Помещения</Link>
      },
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
