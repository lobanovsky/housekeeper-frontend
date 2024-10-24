import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import Table from 'components/table';
import { getPaymentColumns } from 'pages/payments/columns';
import { PaymentService } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';
import '../styles.scss';
import { useSelector } from 'react-redux';
import { getUser } from '../../../store/reducers/auth/selectors';

const OutgoingPayments = forwardRef((props, ref) => {
  const {
    isAdmin,
    isSuperAdmin
  } = useSelector(getUser);
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
          canEdit: isAdmin || isSuperAdmin
        })}
        exportURL="reports/payments/outgoing"
        loadDataFn={PaymentService.findOutgoingPayments}
        filters={getPaymentFilters({ isOutgoingPayments: true })}
      />
    </div>
  );
});

export default OutgoingPayments;
