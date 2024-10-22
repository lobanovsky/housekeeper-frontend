import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useLoading } from 'hooks/use-loading';
import { EnumUserRequestRole, RoleResponse, UserService } from 'backend/services/backend';
import { StoreState } from 'store';
import { showError } from 'utils/notifications';

// interface UserRole {
//     roleCode: string,
//     roleName: string;
//     description: string
// }

export function useUserRoleOptions(): [React.ReactNode[], RoleResponse[], boolean] {
  const [loading, showLoading, hideLoading] = useLoading();
  const { user: { isSuperAdmin } } = useSelector((state: StoreState) => state.auth);
  const [userRoles, setRoles] = useState<RoleResponse[]>([]);

  // @ts-ignore
  const roleOptions = useMemo(() => userRoles.map(({
                                                     roleCode,
                                                     roleName
                                                   }) => (
    <Select.Option
      key={roleCode}
      value={roleCode}
      disabled={roleCode === EnumUserRequestRole.SUPER_ADMIN && !isSuperAdmin}
    >
      {roleName}
    </Select.Option>
  )), [userRoles.length, isSuperAdmin]);

  useEffect(() => {
    showLoading();
    UserService.getAllRoles()
      .then((data: RoleResponse[]) => {
        const roles = [...data];
        hideLoading();
        // const superAdminIndex = roles.findIndex(({roleCode}) => roleCode === EnumUserRequestRole.SUPER_ADMIN);
        // if (superAdminIndex > -1) {
        //     roles.splice(superAdminIndex, 1);
        // }
        setRoles(roles);
      })
      .catch((e) => {
        showError('Не удалось загрузить список ролей для пользователей', e);
        hideLoading();
      });
  }, []);

  return [roleOptions, userRoles, loading];
}
