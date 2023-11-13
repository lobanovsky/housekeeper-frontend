import {dateTimeRenderer, summRenderer} from 'utils/utils';
import {ColumnsType, ColumnType} from "antd/es/table";
import {EnumPaymentVOType, PaymentVO} from "../../backend/services/backend";

export const accountNumberRenderer = (accountNumber: string = '') => {
    const groups = [];

    let startIndex = 0;

    for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
        groups.push(accountNumber.substring(startIndex, startIndex + 4));
    }

    return groups.length ? groups.join(' ') : accountNumber;
};

const personalAccountRenderer = (accountNumber: string = '') => accountNumber.length ?
    `${accountNumber.substring(0, 4)} ${accountNumber.substring(4, 50)}` : ''

export const getPaymentColumns = (isOutgoing: boolean = false): ColumnsType<PaymentVO> => [
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
        dataIndex: 'account',
        title: 'Тип платежа',
        outgoing: false,
        // @ts-ignore
        render: (account: string, {type, typeName, bankName = ''}: PaymentVO) =>
            <span className={`payment-type ${type}`}>
                      {type === EnumPaymentVOType.DETERMINATE_ACCOUNT ? `Л/с ${personalAccountRenderer(account)}` :
                          (type === EnumPaymentVOType.NOT_DETERMINATE ? 'не определён' : typeName)}
                </span>
    },
    // {
    // 	dataIndex: 'taxable',
    // 	title: 'Налог',
    // 	render: (isTaxable: boolean) => <span className={isTaxable ? 'YES' : 'NO'}>{isTaxable ? 'Да': ''}</span>
    // }
]
    .filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing)
    .map(({outgoing, ...column}) => ({
        ...(column as ColumnType<PaymentVO>),
        className: column.dataIndex
    }));
