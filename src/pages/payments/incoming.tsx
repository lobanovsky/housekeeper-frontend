import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Select } from 'antd';
import Table from 'components/table';
import { DownloadOutlined } from '@ant-design/icons';
import { getPaymentColumns } from 'pages/payments/columns';
import { AccountService, PaymentService, PaymentTypeResponse, PaymentVO } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';
import { showError } from 'utils/notifications';
import { downloadFile } from 'utils/utils';
import { accountNumberRenderer } from 'utils/renderers';

const rowClassName = (record: PaymentVO) => (!record.account ? 'empty-account' : '');

function IncomingPayments() {
  const tableRef = React.useRef(null);
  // const [selectedRows, setSelectedRows] = useState<PaymentVO[]>([])
  const [accounts, setAccounts] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState<{ id: string, name: string, color?: string }[]>([]);

  const reloadIncomingPayments = useCallback(() => {
    // @ts-ignore
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  const accountOptions = useMemo(() => accounts.map(({ account, description, special }) => (
    <Select.Option
      id={account}
      value={account}
      key={account}
    >
        <span className={`account ${special ? 'special' : ''}`}>
            <span className="account-number">{accountNumberRenderer(account)}</span>
             (
          {description}
          )
        </span>
    </Select.Option>
  )), [accounts.length]);

  const tableColumns = useMemo(() => getPaymentColumns({
    isOutgoing: false,
    reloadTable: reloadIncomingPayments
  }), [reloadIncomingPayments]);

  const paymentTypeOptions = useMemo(() => paymentTypes.map(({ id, name, color }) => (
    <Select.Option
      id={id}
      value={id}
      key={id}
      color={color}
    >
<span
  style={{ color: color || 'inherit' }}
>
{name}
</span>
    </Select.Option>
  )), [paymentTypes.length]);

  const incomingPaymentFilters = useMemo(() => getPaymentFilters({
    isOutgoingPayments: false,
    options: { accountOptions, paymentTypeOptions }
  }), [
    accountOptions.length, paymentTypeOptions.length
  ]);

  const downloadRegistry = useCallback(() => {
    downloadFile({
      method: 'post',
      url: 'registries/special-account'
    });
  }, []);

  useEffect(() => {
    AccountService.findAllAccounts()
      .then((data) => {
        setAccounts(data);
      })
      .catch((e) => {
        showError('Не удалось загрузить список счетов', e);
      });

    PaymentService.findAllPaymentTypes()
      .then((data: PaymentTypeResponse[] = []) => {
        const types: { id: string, name: string, color: string }[] = data.map(({
                                                                                 type = '',
                                                                                 description = '',
                                                                                 color = ' '
                                                                               }) => ({
          id: type,
          name: description,
          color
        }));

        setPaymentTypes(types);
      })
      .catch((e) => {
        showError('Не удалось загрузить список типов платежей', e);
      });
  }, []);

  return (
    <div className="payments incoming">
      <Table
        ref={tableRef}
        rowKey="uuid"
        scroll={{ x: 1 }}
        columns={tableColumns}
        loadDataFn={PaymentService.findIncomingPayments}
        filters={incomingPaymentFilters}
        exportURL="reports/payments/incoming"
        rowClassName={rowClassName}
        toolbar={(
          <Button size="small" type="dashed" onClick={downloadRegistry}>
            <DownloadOutlined />
            Скачать реестр
          </Button>
        )}
      />
    </div>
  );
}

export default IncomingPayments;
