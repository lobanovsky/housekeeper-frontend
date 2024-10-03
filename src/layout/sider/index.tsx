import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { NavigationItems } from 'navigation/routes';
import './style.scss';

export function Sider() {
  const location = useLocation();
  const [isCollapsed, setCollapsed] = useState(true);

  const closeSidebar = useCallback(() => {
    setCollapsed(true);
  }, []);

  return (
    <Layout.Sider collapsible width={320} collapsed={isCollapsed} onCollapse={setCollapsed}>
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname === '/' ? '/buildings' : location.pathname]}
        mode="inline"
        items={NavigationItems}
        onClick={closeSidebar}
      />
    </Layout.Sider>
  );
}
