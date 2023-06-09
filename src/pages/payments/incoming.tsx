import Table from 'components/table';
import { getPaymentColumns } from 'pages/payments/columns';
import { PaymentService, PaymentVO } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';
import { useCallback, useState } from 'react';
import { Button } from 'antd';

const IncomingPayments = () => {
	const [selectedRows, setSelectedRows] = useState<PaymentVO[]>([])

	const setTaxable = useCallback(() => {

	}, [selectedRows.length]);

	return (
		<div className='payments incoming'>
			<Table
				rowKey='uuid'
				columns={getPaymentColumns(false)}
				loadDataFn={PaymentService.findIncomingPayments}
				filters={getPaymentFilters(false)}
				exportURL='reports/payments/incoming'
				rowSelection={{
					onChange: (selectedRowKeys: React.Key[], selectedRecords: PaymentVO[]) => {
						setSelectedRows(selectedRecords);
					}
				}}
				toolbar={<Button
					onClick={setTaxable}
					disabled={!selectedRows.length}
				>
					Пометить как налогооблагаемые
				</Button>}
			/>
		</div>
	)
}

export default IncomingPayments;
