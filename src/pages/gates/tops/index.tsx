import { useCallback, useEffect, useRef, useState } from 'react';
import { Table, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { GateService } from 'backend/services/backend';
import FilterForm from 'components/table/filter-form';
import { gateTopFilters } from 'pages/gates/tops/filters';
import { showError } from 'utils/notifications';
import { getRandomId } from 'utils/utils';
import './style.scss';
import { topByFlatColumns, topByUserColumns } from 'pages/gates/tops/columns';
import { useLoading } from 'hooks/use-loading';

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
	const [topsByFlat, setTopsByFlat] = useState<TopResponse[]>([]);
	const [topsByUser, setTopsByUser] = useState<TopResponse[]>([]);
	const [currentFlatPage, setCurrentFlatPage] = useState(1);
	const [currentUserPage, setCurrentUserPage] = useState(1);
	const [isLoadingByFlat, showLoadingByFlat, hideLoadingByFlat] = useLoading();
	const [isLoadingByUser, showLoadingByUser, hideLoadingByUser] = useLoading();

	const tableByFlatRef = useRef(null);
	const tableByUserRef = useRef(null);
	const loadTops = useCallback(() => {
		const { type, startDate, endDate } = selectedFilters;
		showLoadingByFlat();
		showLoadingByUser();
		const requestFilters: TopFilterServer = { gateId };
		if (startDate) {
			requestFilters.startDate = startDate.format('YYYY-MM-DD')
		}

		if (endDate) {
			requestFilters.endDate = endDate.format('YYYY-MM-DD')
		}

		GateService.getTopByFlatNumber(requestFilters)
			.then((data) => {
				hideLoadingByFlat();
				setTopsByFlat(data.map((item: any) => ({
					...item,
					id: getRandomId()
				})));
			})
			.catch(e => {
				hideLoadingByFlat();
				showError('Не удалось загрузить список топов по квартире', e);
			});

		GateService.getTopByPhoneNumber(requestFilters)
			.then((data) => {
				hideLoadingByUser();
				setTopsByUser(data.map((item: any) => ({
					...item,
					id: getRandomId()
				})));
			})
			.catch(e => {
				hideLoadingByUser();
				showError('Не удалось загрузить список топов по жильцам', e);
			});
	}, [JSON.stringify(selectedFilters), gateId]);

	useEffect(() => {
		if (gateId > 0) {
			// @ts-ignore
			loadTops();
		}
	}, [gateId]);

	useEffect(() => {
		setCurrentUserPage(1);
		setCurrentFlatPage(1)
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
			<div className='tables'>
				<div className='table by-flat'>
					<Typography.Title level={5}>По квартирам</Typography.Title>
					<Table
						ref={tableByFlatRef}
						rowKey='id'
						size='small'
						columns={topByFlatColumns}
						loading={isLoadingByFlat}
						dataSource={topsByFlat}
						pagination={{
							current: currentFlatPage,
							position: ['bottomRight'],
							onChange: (newPage) => {
								setCurrentFlatPage(newPage)
							}
						}}
					/>
				</div>
				<div className='table by-user'>
					<Typography.Title level={5}>По пользователям</Typography.Title>
					<Table
						ref={tableByUserRef}
						rowKey='id'
						size='small'
						loading={isLoadingByUser}
						columns={topByUserColumns}
						dataSource={topsByUser}
						pagination={{
							current: currentUserPage,
							position: ['bottomRight'],
							onChange: (newPage) => {
								setCurrentUserPage(newPage)
							}
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default GateTopUsers;
