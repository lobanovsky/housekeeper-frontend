import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Loading from 'components/loading';
import AccessDeniedPage from 'pages/auth/access-denied-page';
import LoginView from 'pages/auth/login';
import { userHasPermissions } from '../../utils';
import { PermissionsConfig } from '../../../utils/types';

export function PrivatePage({
                              children,
                              permissions = undefined,
                              path = ''
                            }: { children: React.ReactNode, path?: string, permissions?: PermissionsConfig }): JSX.Element {
  const {
    isLoggingIn,
    isCheckingToken,
    isUserLoggedIn,
    user
  } = useSelector((state: StoreState) => state.auth);

  let element = <Loading />;

  if (!isCheckingToken) {
    if (!isUserLoggedIn) {
      element = <LoginView />;
    } else if (permissions) {
      const userHasAllRequiredRoles = userHasPermissions(permissions, user.roles);
      // @ts-ignore
      element = userHasAllRequiredRoles ? children : <AccessDeniedPage />;
    } else {
      // @ts-ignore
      element = children;
    }
  }

  return element;
}
