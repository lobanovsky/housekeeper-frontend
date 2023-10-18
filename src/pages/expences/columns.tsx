import {summRenderer} from 'utils/utils';


export const expenseColumns = [
    {
        dataIndex: 'incomingSum',
        title: 'Сумма',
        render: (sum: number) => summRenderer(sum)
    },
    {
        dataIndex: 'purpose',
        title: 'Назначение платежа'
    },
].map(column => ({
    ...column,
    className: column.dataIndex
}));

