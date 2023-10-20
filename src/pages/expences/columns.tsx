import {dateTimeRenderer, summRenderer} from 'utils/utils';
import {Counterparty} from "../../backend/services/backend";
import {accountNumberRenderer} from "../payments/columns";


export const expenseColumns = [
    {
        dataIndex: 'total',
        title: 'Сумма',
        render: (sum: number) => summRenderer(sum)
    },
    {
        dataIndex: 'counterparty',
        title: 'Компания',
        render: (company: Counterparty) => company.name
    },
].map(column => ({
    ...column,
    className: column.dataIndex
}));

export const expensePaymentColumns = [
    {
        dataIndex: 'date',
        title: 'Дата',
        render: dateTimeRenderer
    },
    // {
    //     dataIndex: 'fromInn',
    //     title: 'ИНН отправителя',
    //     outgoing: false
    // },
    // {
    //     dataIndex: 'fromName',
    //     title: 'Отправитель',
    //     outgoing: false
    // },
    {
        dataIndex: 'toInn',
        title: 'ИНН получателя'
    },
    // {
    //     dataIndex: 'toName',
    //     title: 'Получатель'
    // },
    {
        dataIndex: 'bankName',
        title: 'Банк'
    },
    {
        dataIndex: 'toAccount',
        title: 'Счёт поступления',
        render: accountNumberRenderer
    },
    {
        dataIndex: 'sum',
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

