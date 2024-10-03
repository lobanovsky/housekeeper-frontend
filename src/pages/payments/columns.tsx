import React from 'react';
import { Button, Typography } from 'antd';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { EditOutlined } from '@ant-design/icons';
import { EnumPaymentVOType, PaymentVO } from 'backend/services/backend';
import {
  accountNumberRendererShort,
  copyableRenderer,
  dateTimeRenderer,
  personalAccountRenderer,
  summRenderer
} from 'utils/renderers';
import { showPaymentEditModal } from './edit-modal';

interface PaymentColumnType<T> extends ColumnType<T> {
  outgoing?: boolean;
}

const commonPaymentColumns = ({ reloadTable }: { reloadTable?: () => void }): PaymentColumnType<PaymentVO>[] => [
  {
    dataIndex: 'date',
    title: 'Дата',
    render: dateTimeRenderer
  },
  {
    dataIndex: 'fromInn',
    title: 'ИНН отправ.',
    outgoing: false,
    render: copyableRenderer
  },
  {
    dataIndex: 'fromName',
    title: 'Отправитель',
    outgoing: false,
    render: copyableRenderer
  },
  {
    dataIndex: 'toInn',
    title: 'ИНН получат.',
    outgoing: true,
    render: copyableRenderer
  },
  {
    dataIndex: 'toName',
    title: 'Получатель',
    outgoing: true,
    render: copyableRenderer
  },
  {
    dataIndex: 'bankName',
    title: 'Банк',
    render: copyableRenderer
  },
  {
    dataIndex: 'toAccount',
    title: 'Счёт поступления',
    outgoing: false,
    render: (toAccount = '') => (toAccount ? (
      <Typography.Text copyable={{ text: toAccount }}>
        {accountNumberRendererShort(toAccount)}
      </Typography.Text>
    ) : '')
  },
  {
    dataIndex: 'incomingSum',
    title: 'Сумма',
    render: (sum: number) => <Typography.Text copyable={{ text: String(sum) }}>{summRenderer(sum)}</Typography.Text>
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
      const { type, typeName, typeColor } = payment;
      const isUnknownSource = type === EnumPaymentVOType.UNKNOWN_ACCOUNT || type === EnumPaymentVOType.UNKNOWN;
      const paymentType = type
        ? (
          <span style={{ color: typeColor }}>
                  {
                    type === EnumPaymentVOType.ACCOUNT || type === EnumPaymentVOType.MANUAL_ACCOUNT
                      ? `Л/с ${personalAccountRenderer(account)}`
                      : (isUnknownSource ? 'не определён' : typeName)
                  }
          </span>
        ) : '';

      return (
        <div className={`payment-type ${type}`}>
          {paymentType}
          <Button
            size="small"
            className="edit-btn"
            onClick={() => {
              showPaymentEditModal({ payment, onSuccess: reloadTable });
            }}
          >
            <EditOutlined />
          </Button>
        </div>
      );
    }
  }
];

export const getPaymentColumns = ({ isOutgoing, reloadTable }: {
  isOutgoing: boolean,
  reloadTable?: () => void
}): ColumnsType<PaymentVO> => {
  const commonColumns = commonPaymentColumns({ reloadTable });
  const result = commonColumns.filter(({ outgoing }) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);
  return result.map(({ outgoing, ...column }) => ({
    ...(column as ColumnType<PaymentVO>),
    className: column.dataIndex as string
  }));
};
