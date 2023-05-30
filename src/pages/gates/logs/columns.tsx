import { dateTimeRenderer } from 'utils/utils';
import { Typography } from 'antd';


export const gateLogColumns = [
	{
		dataIndex: 'dateTime',
		title: 'Дата',
		render: dateTimeRenderer
	},
	{
		dataIndex: 'flatNumber',
		title: 'Квартира'
	},
	{
		dataIndex: 'userName',
		title: 'Пользователь'
	},
	{
		dataIndex: 'phoneNumber',
		title: 'Телефон',
		render: (phone: string = '') => {
			const formatted = phone ? phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5') : '';
			return <Typography.Text copyable={{ text: phone }}>{formatted}</Typography.Text>
		}
	},
	// {
	// 	dataIndex: 'gateName',
	// 	title: 'Шлагбаум'
	// },
	{
		dataIndex: 'method',
		title: 'Способ открытия'
	},
	{
		dataIndex: 'status',
		title: 'Статус',
		render: (status: string) => {
			const stateStr = status.toLowerCase();
			let className = '';
			if (stateStr === 'открыт') {
				className = 'OPEN';
			} else if (stateStr === 'закрыт') {
				className = 'CLOSED'
			}

			return <span className={className}>{status}</span>
		}
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));

