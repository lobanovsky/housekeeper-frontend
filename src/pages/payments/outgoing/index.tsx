import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import Table from 'components/table';
import { getPaymentColumns } from 'pages/payments/columns';
import { PaymentService } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';
import '../styles.scss';

const OutgoingPayments = forwardRef((props, ref) => {
  const tableRef = React.useRef(null);

  const reloadTable = useCallback(() => {
    // @ts-ignore
    tableRef.current?.reloadTable();
  }, [tableRef.current]);
  useImperativeHandle(ref, () => ({
    reloadTable
  }), [reloadTable]);

  return (
    <div className="payments outgoing">
      <Table
        rowKey="uuid"
        columns={getPaymentColumns({ isOutgoing: true })}
        exportURL="reports/payments/outgoing"
        loadDataFn={PaymentService.findOutgoingPayments}
        filters={getPaymentFilters({ isOutgoingPayments: true })}
      />
    </div>
  );
});

export default OutgoingPayments;
