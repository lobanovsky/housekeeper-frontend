import {dateTimeRenderer, summRenderer} from 'utils/utils';
import {ColumnsType, ColumnType} from "antd/es/table";
import {CheckCircleFilled, CloseCircleFilled, QuestionCircleFilled} from '@ant-design/icons';
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
        title: 'Лицевой счёт',
        outgoing: false,
        render: (account: string, {type, bankName = ''}: PaymentVO) => {
            return <div className='account-container'>
                <div className='icon-container'>
                    {/*{bankName.includes('Бердск') && <QuestionCircleFilled />}*/}
                    {/*{bankName.includes('Москва') && <CloseCircleFilled />}*/}
                    {/*{bankName.includes('Новгород') && <CheckCircleFilled />}*/}
                    {type === EnumPaymentVOType.SKIP && <QuestionCircleFilled/>}
                    {type === EnumPaymentVOType.NOT_DETERMINATE && <CloseCircleFilled/>}
                    {type === EnumPaymentVOType.DETERMINATE_ACCOUNT && <CheckCircleFilled/>}
                </div>
                {personalAccountRenderer(account)}
            </div>
        }
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
