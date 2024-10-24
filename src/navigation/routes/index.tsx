import React from 'react';
import { PathRouteProps } from 'react-router/dist/lib/components';
import Rooms from 'pages/rooms';
import Gates from 'pages/gates';
import Payments from 'pages/payments';
import UploadedFiles from 'pages/admin/uploaded-files';
import { ExpensesView } from 'pages/expences';
import { Counterparties } from 'pages/admin/counterparties';
import { AreasList } from 'pages/admin/areas';
import { Users } from '../../pages/admin/users';
import { WorkspacesList } from '../../pages/admin/super-admin/workspaces';
import { EnumUserRequestRole } from '../../backend/services/backend';

export interface PrivateRouteProps extends PathRouteProps {
  roles?: EnumUserRequestRole[];
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
    path: '/payments',
    element: <Payments />
  },
  {
    path: '/uploaded-files',
    roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
    element: <UploadedFiles />
  },
  {
    path: '/users',
    roles: [EnumUserRequestRole.STAFF_ADMIN, EnumUserRequestRole.SUPER_ADMIN],
    element: <Users />
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
  },
  {
    path: '/workspaces',
    roles: [EnumUserRequestRole.SUPER_ADMIN],
    element: <WorkspacesList />
  }
];
