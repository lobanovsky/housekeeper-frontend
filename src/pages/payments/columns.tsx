import {dateTimeRenderer, summRenderer} from 'utils/utils';

export const accountNumberRenderer = (accountNumber: string = '') => {
	const groups = [];

	let startIndex = 0;

	for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
		groups.push(accountNumber.substring(startIndex, startIndex + 4));
	}

	return groups.length ? groups.join(' ') : accountNumber;
};
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
		dataIndex: 'toAccount',
		title: 'Счёт поступления',
		outgoing: false,
		render: accountNumberRenderer
	},
	{
		dataIndex: 'incomingSum',
		title: 'Сумма',
		render: (sum: number) => summRenderer(sum)
	},
	{
		dataIndex: 'purpose',
		title: 'Назначение платежа'
	},
	{
		dataIndex: 'taxable',
		title: 'Налог',
		render: (isTaxable: boolean) => <span className={isTaxable ? 'YES' : 'NO'}>{isTaxable ? 'Да': ''}</span>
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));

export const getPaymentColumns = (isOutgoing: boolean = false) => paymentColumns.filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);
