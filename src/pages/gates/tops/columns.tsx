export const topByUserColumns = [
	{
		dataIndex: 'count',
		title: 'Кол-во заездов'
	},
	// {
	// 	dataIndex: 'flatNumber',
	// 	title: 'Квартира'
	// },
	{
		dataIndex: 'userName',
		title: 'Пользователь'
	},
	{
		dataIndex: 'phoneNumber',
		title: 'Телефон',
		render: (phone: string = '') => {
			const formatted = phone ? phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5') : '';
			return formatted;
		}
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));

export const topByFlatColumns = [
	{
		dataIndex: 'count',
		title: 'Кол-во заездов'
	},
	{
		dataIndex: 'flatNumber',
		title: 'Квартира'
	}
	// {
	// 	dataIndex: 'userName',
	// 	title: 'Пользователь'
	// },
	// {
	// 	dataIndex: 'phoneNumber',
	// 	title: 'Телефон',
	// 	render: (phone: string = '') => {
	// 		const formatted = phone ? phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5') : '';
	// 		return formatted;
	// 	}
	// }
].map(column => ({
	...column,
	className: column.dataIndex
}));

