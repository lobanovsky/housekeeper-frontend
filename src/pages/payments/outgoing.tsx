import Table from 'components/table';
import {getPaymentColumns} from 'pages/payments/columns';
import {PaymentService} from 'backend/services/backend';
import {getPaymentFilters} from 'pages/payments/filters';
import './styles.scss';

const OutgoingPayments = () => (
	<div className='payments outgoing'>
		<Table
			rowKey='uuid'
            columns={getPaymentColumns({isOutgoing: true})}
			exportURL='reports/payments/outgoing'
			loadDataFn={PaymentService.findOutgoingPayments}
			filters={getPaymentFilters(true)}
		/>
	</div>
)

export default OutgoingPayments;
