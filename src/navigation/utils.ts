import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { PermissionsConfig, RoleResponse } from '../utils/types';

export const getNavigationItemByPathname = (pathname: string, item: MenuItemType | SubMenuType = {
  key: '',
  children: []
}): MenuItemType | SubMenuType | null => {
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

const userHasRole = (role: string, userRoles: RoleResponse[]) => !!userRoles.find((roleName) => roleName === role);

export const userHasPermissions = (requiredRoleConfig: PermissionsConfig, userRoles: RoleResponse[]) => {
  let result = true;
  if (Array.isArray(requiredRoleConfig)) {
    result = requiredRoleConfig.every((requiredRole) => userHasRole(requiredRole, userRoles));
  } else if (Array.isArray(requiredRoleConfig.OR)) {
    result = requiredRoleConfig.OR.some((requiredRole) => userHasRole(requiredRole, userRoles));
  }

  return result;
};
