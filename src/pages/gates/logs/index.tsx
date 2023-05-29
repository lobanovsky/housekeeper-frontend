import Table, { TableRequestParams } from 'components/table';
import { GateService, LogEntryFilter } from 'backend/services/backend';
import { gateLogColumns } from 'pages/gates/logs/columns';
import { gateLogFilters } from 'pages/gates/logs/filters';
import './style.scss';
import { useCallback, useEffect, useRef } from 'react';
import dayjs from 'dayjs';


const today = dayjs();
const monthAgo = dayjs().subtract(1, 'month');

const GatesLog = ({ gateId }: { gateId: number }) => {
	const tableRef = useRef(null);
	const loadGates = useCallback(({
		                               body,
		                               ...pagination
	                               }: TableRequestParams<LogEntryFilter>) => GateService.findAllLogEntries({
		...pagination,
		body: {
			...body,
			gateId
		}
	}), [gateId]);

	useEffect(() => {
		if (gateId > 0) {
			// @ts-ignore
			tableRef.current?.reloadTable();
		}
	}, [gateId]);

	return (
		<div className='gates-log'>
			<Table
				ref={tableRef}
				columns={gateLogColumns}
				loadDataFn={loadGates}
				filters={gateLogFilters}
				defaultFilterValues={{
					startDate: monthAgo,
					endDate: today
				}}
			/>
		</div>
	)
}

export default GatesLog;
