import { useMemo } from "react";
import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { getNavigationItemByPathname, NavigationItems } from "navigation/routes";


const PageHeader = () => {
	const location = useLocation();

	const pageTitle = useMemo(() => {
		// @ts-ignore
		const selectedMenuItem = getNavigationItemByPathname(location.pathname, {children: NavigationItems});
		// @ts-ignore
		return selectedMenuItem?.title || '';

	}, [location.pathname]);

	if (!location.pathname || !pageTitle) {
		return <></>;
	}

	return <Typography.Title
		level={3}
    style={{ marginTop: 0, marginBottom: 6 }}
	>{pageTitle}</Typography.Title>
}

export default PageHeader;
