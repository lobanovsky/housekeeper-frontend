import { EnumUserRequestRole } from '../backend/services/backend';
import { NavigationType } from './types';

export type IMenuItem = { key: string, label?: string, icon?: string };
export type MenuItemType = IMenuItem & { children?: IMenuItem[] };

export const getNavigationItemByPathname = (pathname: string, item: MenuItemType = {
  key: '',
  children: []
}): MenuItemType | null => {
  let result = null;

  if (pathname === item.key) {
    result = item;
    // @ts-ignore
  } else if ((item.children || []).length) {
    // @ts-ignore
    const children = item.children || [];
    for (let i = 0; i <= children.length && !result; i++) {
      result = getNavigationItemByPathname(pathname, children[i]);
    }
  }

  return result;
};

export const userHasPermissions = (roles: EnumUserRequestRole[], userRoles: EnumUserRequestRole[]) => {
  const result = !roles.length || roles.some((requiredRole) => userRoles.includes(requiredRole));

  return result;
};

export const filterNavigationByUserRoles = (navigationItems: NavigationType, userRoles: EnumUserRequestRole[]) => {
  const result: NavigationType = [];
  navigationItems.forEach((item) => {
    // if (item.key === '/workspaces') {
    //   debugger;
    // }
    // @ts-ignore
    if (item.children) {
      // @ts-ignore
      const grantedChildren = item.children.filter(({ roles = [] }) => userHasPermissions(roles, userRoles));
      if (grantedChildren.length) {
        result.push({
          ...item,
          children: grantedChildren
        });
      }
    } else if (userHasPermissions(item.roles || [], userRoles)) {
      result.push(item);
    }
  });

  console.log('%c Navigation by permissions', 'color: blue; background: yellow');
  console.log(navigationItems);
  return result;
};
