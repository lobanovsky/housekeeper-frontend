import React, { useCallback, useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { NavigationItems } from 'navigation';
import './style.scss';
import { useSelector } from 'react-redux';
import { getUser } from 'store/selectors/auth';
import { filterNavigationByUserRoles } from '../../navigation/utils';

export function Sider() {
  const location = useLocation();
  const { roles = [] } = useSelector(getUser);
  const [isCollapsed, setCollapsed] = useState(true);

  const closeSidebar = useCallback(() => {
    setCollapsed(true);
  }, []);

  const grantedNavigation = useMemo(() => {
    if (!roles.length) {
      return [];
    }

    const result = filterNavigationByUserRoles(NavigationItems, roles);
    return result;
  }, [roles.length]);

  return (
    <Layout.Sider collapsible width={320} collapsed={isCollapsed} onCollapse={setCollapsed}>
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname === '/' ? '/buildings' : location.pathname]}
        mode="inline"
        /* @ts-ignore */
        items={grantedNavigation}
        onClick={closeSidebar}
      />
    </Layout.Sider>
  );
}
