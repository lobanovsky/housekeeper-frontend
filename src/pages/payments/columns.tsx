import {dateTimeRenderer, summRenderer} from 'utils/utils';
import {ColumnsType, ColumnType} from "antd/es/table";
import {CheckCircleFilled, CloseCircleFilled, EditOutlined} from '@ant-design/icons';
import {EnumPaymentVOType, PaymentVO} from "../../backend/services/backend";
import {Button} from "antd";
import {showPaymentEditModal} from "./edit-modal";


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

interface PaymentColumnType<T> extends ColumnType<T> {
    outgoing?: boolean;
}

const commonPaymentColumns = ({reloadTable}: { reloadTable?: () => void }): PaymentColumnType<PaymentVO>[] => [
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
        render: (toAccount = '', record) =>
            <div>
                {toAccount ? accountNumberRenderer(toAccount) : ' - '}
                <Button
                    size='small'
                    className='edit-btn'
                    onClick={() => {
                        showPaymentEditModal({payment: record, onSuccess: reloadTable});
                    }}>
                    <EditOutlined/>
                </Button>
            </div>
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
        render: (account: string, payment: PaymentVO) => {
            const {type, typeName, typeColor, bankName = ''} = payment;
            const isUnknownSource = type === EnumPaymentVOType.UNKNOWN_ACCOUNT || type === EnumPaymentVOType.UNKNOWN;
            const iconStyle = {color: typeColor, marginRight: 4};
            return type ? <div className={`payment-type ${type}`}>
                {isUnknownSource ? <CloseCircleFilled style={iconStyle}/> : <CheckCircleFilled style={iconStyle}/>}
                {type === EnumPaymentVOType.ACCOUNT ? `Л/с ${personalAccountRenderer(account)}` :
                    (isUnknownSource ? 'не определён' : typeName)}
            </div> : ''
        }
    }
];

export const getPaymentColumns = ({isOutgoing, reloadTable}: {
    isOutgoing: boolean,
    reloadTable?: () => void
}): ColumnsType<PaymentVO> => {
    const commonColumns = commonPaymentColumns({reloadTable});
    const result = commonColumns.filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);
    return result.map(({outgoing, ...column}) => ({
        ...(column as ColumnType<PaymentVO>),
        className: column.dataIndex as string
    }));
}
