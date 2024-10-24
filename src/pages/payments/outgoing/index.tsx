import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import Table from 'components/table';
import { getPaymentColumns } from 'pages/payments/columns';
import { PaymentService } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';
import { getIsAdmin } from 'store/selectors/auth';
import '../styles.scss';

const OutgoingPayments = forwardRef((props, ref) => {
  const isAdmin = useSelector(getIsAdmin);
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
        columns={getPaymentColumns({
          isOutgoing: true,
          canEdit: isAdmin
        })}
        exportURL="reports/payments/outgoing"
        loadDataFn={PaymentService.findOutgoingPayments}
        filters={getPaymentFilters({ isOutgoingPayments: true })}
      />
    </div>
  );
});

export default OutgoingPayments;
