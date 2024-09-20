import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { NavigationItems } from "navigation/routes";
import "./style.scss";
import { useCallback, useState } from "react";

const PathnameRegex = /^\/[a-zA-Z-\d]+$/;

export const Sider = () => {
    const location = useLocation();
    const [isCollapsed, setCollapsed] = useState(true);

    const closeSidebar = useCallback(() => {
        setCollapsed(true);
    }, []);

    console.log(location.pathname);

    return <Layout.Sider collapsible width={320} collapsed={isCollapsed} onCollapse={setCollapsed}>
        <Menu
            theme='dark'
            defaultSelectedKeys={[location.pathname === "/" ? "/buildings" : location.pathname]}
            mode='inline'
            items={NavigationItems}
            onClick={closeSidebar}
        />
    </Layout.Sider>
}
