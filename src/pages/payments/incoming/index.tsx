import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useMemo } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { AccountResponse, AccountService, PaymentService, PaymentTypeResponse, PaymentVO } from 'backend/services/backend';
import Table from 'components/table';
import useRemoteData from 'hooks/use-remote-data';
import { getPaymentColumns } from 'pages/payments/columns';
import { getPaymentFilters } from 'pages/payments/filters';
import { downloadFile } from 'utils/utils';
import { useSelector } from 'react-redux';
import { createAccountOptions, createPaymentTypeOptions } from './utils';
import { getUser } from '../../../store/reducers/auth/selectors';

const rowClassName = (record: PaymentVO) => (!record.account ? 'empty-account' : '');

const IncomingPayments = forwardRef((props, ref) => {
  const {
    isAdmin,
    isSuperAdmin
  } = useSelector(getUser);

  const tableRef = React.useRef(null);

  const [accountOptions = []] = useRemoteData<AccountResponse[], ReactNode[]>(AccountService.findAllAccounts, {
    errorMsg: 'Не удалось загрузить список счетов',
    dataConverter: createAccountOptions
  });

  const [paymentTypeOptions = []] = useRemoteData<PaymentTypeResponse[], ReactNode[]>(PaymentService.findAllPaymentTypes, {
    errorMsg: 'Не удалось загрузить список типов платежей',
    dataConverter: createPaymentTypeOptions
  });

  const reloadIncomingPayments = useCallback(() => {
    // @ts-ignore
    tableRef.current?.reloadTable();
  }, [tableRef.current]);

  const tableColumns = useMemo(() => getPaymentColumns({
    isOutgoing: false,
    canEdit: isAdmin || isSuperAdmin,
    reloadTable: reloadIncomingPayments
  }), [reloadIncomingPayments]);

  const incomingPaymentFilters = useMemo(() => getPaymentFilters({
    isOutgoingPayments: false,
    options: {
      accountOptions: accountOptions || [],
      paymentTypeOptions: paymentTypeOptions || []
    }
  }), [
    accountOptions?.length, paymentTypeOptions?.length
  ]);

  const downloadRegistry = useCallback(() => {
    downloadFile({
      method: 'post',
      url: 'registries/special-account'
    });
  }, []);

  useImperativeHandle(ref, () => ({
    reloadTable: reloadIncomingPayments
  }), [reloadIncomingPayments]);

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
});

export default IncomingPayments;
