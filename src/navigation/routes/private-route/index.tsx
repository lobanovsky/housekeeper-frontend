import React from 'react';
import { useSelector } from 'react-redux';

import { StoreState } from 'store';
import Loading from 'components/loading';
import AccessDeniedPage from 'pages/auth/access-denied-page';
import LoginView from 'pages/auth/login';
import { userHasPermissions } from '../../utils';
import { EnumUserRequestRole } from '../../../backend/services/backend';

export function PrivatePage({
                              children,
                              roles = [],
                            }: { children: React.ReactNode, roles?: EnumUserRequestRole[] }): React.ReactElement {
  const {
    isCheckingToken,
    isUserLoggedIn,
    user
  } = useSelector((state: StoreState) => state.auth);

  let element = <Loading />;

  if (!isCheckingToken) {
    if (!isUserLoggedIn) {
      element = <LoginView />;
    } else if (roles.length) {
      const userHasRoles = userHasPermissions(roles, user.roles);
      // @ts-ignore
      element = userHasRoles ? children : <AccessDeniedPage />;
    } else {
      // @ts-ignore
      element = children;
    }
  }

  return element;
}
