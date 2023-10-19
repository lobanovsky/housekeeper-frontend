import {Typography} from "antd";

export const counterpartyColumns = [

	{
		dataIndex: 'inn',
		title: 'ИНН',
		width: 170,
		render: (inn: string = '') => <Typography.Text copyable={!!inn}>{inn}</Typography.Text>
	},
	{
		dataIndex: 'bik',
		title: 'БИК',
		width: 170,
		render: (bik: string = '') => <Typography.Text copyable={!!bik}>{bik}</Typography.Text>
	},
	{
		dataIndex: 'originalName',
		title: 'Компания',
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));
