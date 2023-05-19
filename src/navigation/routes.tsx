import { DashboardOutlined, DollarOutlined, UserOutlined,ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';

interface NavigationItemType extends MenuItemType {
	title: string;
}

export const NavigationItems: any = [
	{
		key: '/contacts',
		icon: <UserOutlined />,
		title: 'Контакты',
		label: <Link to='/contacts'>Контакты</Link>
	},
	{
		key: '/counters',
		icon: <DashboardOutlined />,
		title: 'Счётчики',
		label: <Link to='/counters'>Счётчики</Link>
	},
	{
		key: '/payments',
		icon: <DollarOutlined />,
		label: 'Платежи',
		children: [
			{
				key: '/payments-incoming',
				icon: <ArrowDownOutlined />,
				title: 'Входящие платежи',
				label: <Link to='/payments-incoming'>Входящие платежи</Link>
			},
			{
				key: '/payments-outgoing',
				icon: <ArrowUpOutlined />,
				title: 'Исходящие платежи',
				label: <Link to='/payments-outgoing'>Исходящие платежи</Link>
			},
		]
	}
]


export const getNavigationItemByPathname = (pathname: string, item: MenuItemType | SubMenuType = {
	key: '',
	children: []
}): MenuItemType | SubMenuType | null => {
	let result = null;

	if (pathname == item.key) {
		result = item;
		// @ts-ignore
	} else if ((item.children || []).length) {
		// Use a for loop instead of forEach to avoid nested functions
		// Otherwise "return" will not work properly
		// @ts-ignore
		const children = item.children || [];
		for (let i = 0; i <= children.length && !result; i++) {
			result = getNavigationItemByPathname(pathname, children[i]);
		}
	}

	return result

}
