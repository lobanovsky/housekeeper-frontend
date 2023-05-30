import { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';

import { GateService } from 'backend/services/backend';
import FilterForm from 'components/table/filter-form';
import { gateTopFilters } from 'pages/gates/tops/filters';
import { topByFlatColumns, topByUserColumns } from 'pages/gates/tops/columns';
import LocalDataTable, { TopFilterValues } from 'pages/gates/tops/local-table';
import './style.scss';

const today = dayjs();
const monthAgo = dayjs().subtract(1, 'month');

const DefaultFilters = {
	startDate: monthAgo,
	endDate: today
};
const GateTopUsers = () => {
	const [selectedFilters, setFilters] = useState<TopFilterValues>(DefaultFilters as TopFilterValues);
	const tableByFlatRef = useRef(null);
	const tableByUserRef = useRef(null);
	const loadTops = useCallback(() => {
		if (!selectedFilters.gateId) {
			return;
		}
		// @ts-ignore
		tableByFlatRef.current?.loadData(selectedFilters);
// @ts-ignore
		tableByUserRef.current?.loadData(selectedFilters);
	}, [JSON.stringify(selectedFilters)]);


	useEffect(loadTops, [JSON.stringify(selectedFilters)]);

	return (
		<div className='tops'>
			<FilterForm
				allowClear={false}
				onChangeFilters={setFilters}
				filters={gateTopFilters}
				onSearchBtnClick={loadTops}
				defaultFilterValues={DefaultFilters}
				isValidForm={({ gateId }) => !!gateId}
			/>
			<div className='tables'>
				<div className='table by-flat'>
					<Typography.Title level={5}>По квартирам</Typography.Title>
					<LocalDataTable
						ref={tableByFlatRef}
						columns={topByFlatColumns}
						loadDataFn={GateService.getTopByFlatNumber}
					/>
				</div>
				<div className='table by-user'>
					<Typography.Title level={5}>По пользователям</Typography.Title>
					<LocalDataTable
						ref={tableByUserRef}
						columns={topByUserColumns}
						loadDataFn={GateService.getTopByPhoneNumber}
					/>
				</div>
			</div>
		</div>
	)
}

export default GateTopUsers;
