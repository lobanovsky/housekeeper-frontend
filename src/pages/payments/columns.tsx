import { dateTimeRenderer, summRenderer } from 'utils/utils';


const paymentColumns = [
	{
		dataIndex: 'date',
		title: 'Дата',
		render: dateTimeRenderer
	},
	{
		dataIndex: 'fromInn',
		title: 'ИНН отправителя',
		outgoing: false
	},
	{
		dataIndex: 'fromName',
		title: 'Отправитель',
		outgoing: false
	},
	{
		dataIndex: 'toInn',
		title: 'ИНН получателя',
		outgoing: true
	},
	{
		dataIndex: 'toName',
		title: 'Получатель',
		outgoing: true
	},
	{
		dataIndex: 'bankName',
		title: 'Банк'
	},
	{
		dataIndex: 'incomingSum',
		title: 'Сумма',
		render: (sum: number) => summRenderer(sum)
	},
	{
		dataIndex: 'purpose',
		title: 'Назначение платежа'
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));

export const getPaymentColumns = (isOutgoing: boolean = false) => paymentColumns.filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);
