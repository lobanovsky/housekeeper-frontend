import { Menu, Layout } from 'antd';
import { DashboardOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';


const NavigationItems = [
	{
		key: '/contacts',
		icon: <UserOutlined />,
		label: <Link to='/contacts'>Контакты</Link>
	},
	{
		key: '/counters',
		icon: <DashboardOutlined />,
		label: <Link to='/counters'>Счётчики</Link>
	},
	{
		key: '/payments',
		icon: <DollarOutlined />,
		label: <Link to='/payments'>Платежи</Link>
		// children: <Link to='/payments'/>
	}
];

export const Sider = () => {
	const location = useLocation();

	return <Layout.Sider collapsible>
		<Menu
			theme='dark'
			defaultSelectedKeys={[location.pathname]}
			mode='inline'
			items={NavigationItems}
		/>
	</Layout.Sider>
}
