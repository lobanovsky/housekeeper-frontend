import { useCallback, useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { GateService } from 'backend/services/backend';
import FilterForm from 'components/table/filter-form';
import { gateTopFilters } from 'pages/gates/tops/filters';
import { showError } from 'utils/notifications';
import { getRandomId } from 'utils/utils';
import './style.scss';
import { topColumns } from 'pages/gates/tops/columns';

interface TopFilterValues {
	type: string;
	/**  */
	gateId?: number;
	/**  */
	startDate?: Dayjs;
	/**  */
	endDate?: Dayjs;
}

interface TopFilterServer {
	/**  */
	gateId?: number;
	/**  */
	startDate?: string;
	/**  */
	endDate?: string;
}

interface TopResponse {
	count: number,
	id: number,
	flatNumber?: string,
	phoneNumber?: string,
	userName: string
}

const today = dayjs();
const monthAgo = dayjs().subtract(1, 'month');

const DefaultFilters = {
	type: 'flat',
	startDate: monthAgo,
	endDate: today
};
const GateTopUsers = ({ gateId }: { gateId: number }) => {
	const [selectedFilters, setFilters] = useState<TopFilterValues>(DefaultFilters as TopFilterValues);
	const [tops, setTops] = useState<TopResponse[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const tableRef = useRef(null);
	const loadTops = useCallback(() => {
		const { type, startDate, endDate } = selectedFilters;
		const promise = type === 'flat' ? GateService.getTopByFlatNumber : GateService.getTopByPhoneNumber;
		const requestFilters: TopFilterServer = { gateId };
		if (startDate) {
			requestFilters.startDate = startDate.format('YYYY-MM-DD')
		}

		if (endDate) {
			requestFilters.endDate = endDate.format('YYYY-MM-DD')
		}

		promise(requestFilters)
			.then((data) => {
				setTops(data.map((item: any) => ({
					...item,
					id: getRandomId()
				})));
			}).catch(e => {
			showError('Не удалось загрузить список топов', e);
		})
	}, [JSON.stringify(selectedFilters), gateId]);

	useEffect(() => {
		if (gateId > 0) {
			// @ts-ignore
			loadTops();
		}
	}, [gateId]);

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedFilters.type])

	useEffect(() => {
		loadTops();
	}, [JSON.stringify(selectedFilters)]);

	return (
		<div className='tops'>
			<FilterForm
				allowClear={false}
				onChangeFilters={setFilters}
				filters={gateTopFilters}
				onSearchBtnClick={loadTops}
				defaultFilterValues={{
					type: 'flat',
					startDate: monthAgo,
					endDate: today
				}}
			/>
			<Table
				ref={tableRef}
				rowKey='id'
				size='small'
				columns={topColumns}
				dataSource={tops}
				pagination={{
					current: currentPage,
					position: ['topRight'],
					onChange: (newPage) => {
						setCurrentPage(newPage)
					}
				}}
			/>
		</div>
	)
}

export default GateTopUsers;
