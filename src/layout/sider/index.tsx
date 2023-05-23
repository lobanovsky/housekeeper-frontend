import { Menu, Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { NavigationItems } from 'navigation/routes';
import './style.scss';

export const Sider = () => {
	const location = useLocation();

	return <Layout.Sider collapsible width={320}>
		<Menu
			theme='dark'
			defaultSelectedKeys={[location.pathname]}
			mode='inline'
			items={NavigationItems}
		/>
	</Layout.Sider>
}
