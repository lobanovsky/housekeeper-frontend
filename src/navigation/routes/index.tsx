import React from 'react';
import { PathRouteProps } from 'react-router/dist/lib/components';
import Rooms from 'pages/rooms';
import Gates from 'pages/gates';
import IncomingPayments from 'pages/payments/incoming';
import OutgoingPayments from 'pages/payments/outgoing';
import UploadedFiles from 'pages/admin/uploaded-files';
import { ExpensesView } from 'pages/expences';
import { Counterparties } from 'pages/admin/counterparties';
import { AreasList } from 'pages/admin/areas';
import { PermissionsConfig } from 'utils/types';

export interface PrivateRouteProps extends PathRouteProps {
  permissions?: PermissionsConfig;
}

export const AppRoutes: PrivateRouteProps[] = [
  {
    path: '/rooms',
    element: <Rooms />
  },
  {
    path: '/gates',
    element: <Gates />
  },
  {
    path: '/payments-incoming',
    element: <IncomingPayments />
  },
  {
    path: '/payments-outgoing',
    element: <OutgoingPayments />
  },
  {
    path: '/uploaded-files',
    element: <UploadedFiles />
  },
  {
    path: '/expenses',
    element: <ExpensesView />
  },
  {
    path: '/counterparties',
    element: <Counterparties />
  },
  {
    path: '/areas',
    element: <AreasList />
  }
];
