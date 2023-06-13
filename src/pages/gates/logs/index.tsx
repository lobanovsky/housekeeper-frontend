import Table from 'components/table';
import { GateService } from 'backend/services/backend';
import { gateLogColumns } from 'pages/gates/logs/columns';
import { gateLogFilters } from 'pages/gates/logs/filters';
import './style.scss';
import { useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import { showError, showMessage } from 'utils/notifications';
import { UploadChangeParam } from 'antd/es/upload';
import { useLoading } from 'hooks/use-loading';


const today = dayjs();
const monthAgo = dayjs().subtract(1, 'month');

const GatesLog = () => {
	const tableRef = useRef(null);
	const [isUploading, showUploading, hideUploading] = useLoading();

	const onUploadStatusChange = useCallback((info: UploadChangeParam) => {
		const { file: { status = '', response = {}, name = '' } = {} } = info;
		if (status === 'done') {
			showMessage(`Файл ${name} загружен`);
		} else if (status === 'error') {
			showError('Ошибка при импорте', response);
		}

		if (info.fileList.every(file => file.status === 'error' || file.status === 'done')) {
			hideUploading();
		}
	}, []);

	return (
		<div className='gates-log'>
			<Table
				ref={tableRef}
				columns={gateLogColumns}
				loadDataFn={GateService.findAllLogEntries}
				filters={gateLogFilters}
				isValidForm={({ gateId }: { gateId: number }) => !!gateId}
				defaultFilterValues={{
					gateId: 1
				}}
			/>
		</div>
	)
}

export default GatesLog;
