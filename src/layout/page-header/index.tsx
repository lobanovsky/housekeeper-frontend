import React, { useMemo } from 'react';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { getNavigationItemByPathname, NavigationItems } from 'navigation';

function PageHeader() {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    // @ts-ignore
    const selectedMenuItem = getNavigationItemByPathname(location.pathname, { children: NavigationItems });
    // @ts-ignore
    return selectedMenuItem?.title || '';
  }, [location.pathname]);

  if (!location.pathname || !pageTitle) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <span />;
  }

  return (
    <Typography.Title
      level={3}
      style={{ marginTop: 0, marginBottom: 6 }}
    >
      {pageTitle}
    </Typography.Title>
  );
}

export default PageHeader;
