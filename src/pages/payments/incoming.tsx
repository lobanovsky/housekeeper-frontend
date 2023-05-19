import Table from 'components/table';
import { getPaymentColumns } from 'pages/payments/columns';
import { PaymentService } from 'backend/services/backend';
import { getPaymentFilters } from 'pages/payments/filters';

const IncomingPayments = () => (
	<div className='payments incoming'>
		<Table
			rowKey='uuid'
			columns={getPaymentColumns(false)}
			loadDataFn={PaymentService.findIncomingPayments}
			filters={getPaymentFilters(false)}
		/>
	</div>
)

export default IncomingPayments;
