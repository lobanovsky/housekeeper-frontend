import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Button, Table as AntTable } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

import { FilterFieldsConfig } from 'components/table/filter-form/types';
import { showError } from 'utils/notifications';
import { IPagination } from 'utils/types';
import FilterForm from './filter-form';
import styles from './styles.module.scss';

interface ITableProps {
	columns: any[],
	className?: string;
	toolbar?: JSX.Element;
	title?: string;
	filters?: FilterFieldsConfig;
	defaultPagination?: IPagination;
	defaultFilterValues?: Record<string, string | string[] | number[]>,
	additionalRequestParams?: any,
	onChangePagination?: (pagination: IPagination) => void,
	onRow?: (record: any) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>,
	extraControls?: React.ReactNode[],
	rowKey?: string;
	requestParamsConverter?: (filters: any) => any,
	responseDataConverter?: (response: any) => any,
	loadDataFn: (requestParams: any) => Promise<{ content: any[], totalElements: number }>
}

const Table = React.forwardRef((props: ITableProps, ref) => {
	const {
		loadDataFn,
		columns,
		toolbar,
		title = '',
		className,
		defaultPagination = { pageNum: 1, pageSize: 10 },
		defaultFilterValues = {},
		requestParamsConverter,
		responseDataConverter = null,
		filters = [],
		onChangePagination = null,
		extraControls = [],
		...tableProps
	} = props;

	// const { user } = useContext(AuthContext);
	const [data, setData] = useState<any[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [pagination, setPagination] = useState<IPagination>(defaultPagination);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedFilters, setSelectedFilters] = useState<any>(() => ({
		...defaultFilterValues
	}));

	const filterFormRef = useRef(null);

	const onChangeFilters = useCallback((filters: any) => {
		setSelectedFilters(filters);

		setPagination(prev => ({
			pageNum: 1,
			pageSize: prev.pageSize
		}))
	}, []);

	const loadData = useCallback((params: { filters: any, pagination: IPagination }) => {
		const { filters, pagination: { pageNum, pageSize } } = params;

		const convertedFilters = {};
		Object.entries(filters).forEach(([filterName, filterValue]) => {
			const isDate = filterName.endsWith('Date');
			if (isDate) {
				// @ts-ignore
				if (filterValue && filterValue.isValid()) {
					// @ts-ignore
					convertedFilters[filterName] = filterValue.format('YYYY-MM-DD')
				}
			} else {
				// @ts-ignore
				convertedFilters[filterName] = filterValue;
			}

		})
		setLoading(true);
		let requestParams: any & IPagination = {
			pageNum: pageNum - 1,
			pageSize,
			body: convertedFilters
		}

		if (requestParamsConverter) {
			requestParams = requestParamsConverter(requestParams);
		}

		loadDataFn(requestParams)
			.then((responseData: any) => {
				if (responseDataConverter) {
					const { data, total } = responseDataConverter(responseData);
					setData(data);
					setTotal(total);
				} else {
					setData(responseData.content || []);
					setTotal(responseData.totalElements || 0);
				}

				setLoading(false);
			})
			.catch(e => {
				showError('Не удалось загрузить данные для таблицы', e);
				setLoading(false);
			});
	}, [loadDataFn, requestParamsConverter, responseDataConverter]);

	const delayedSearch = useCallback(
		debounce((params) => loadData(params), 600),
		[]
	);

	const reloadTable = () => {
		loadData({ filters: selectedFilters, pagination });
	}

	const resetTable = (fireSearch: boolean = false) => {
		// @ts-ignore
		if (filterFormRef.current && filterFormRef.current.clearValues) {
			// @ts-ignore
			filterFormRef.current.clearValues();
		}

		setPagination({
			pageNum: 1, pageSize: 10
		});

		if (fireSearch) {
			delayedSearch({
				filters: {}, pagination: {
					pageNum: 1, pageSize: 10
				}
			});
		}
	}

	const getFilters = () => {
		// @ts-ignore
		if (filterFormRef.current && filterFormRef.current.getSelectedFilters) {
			// @ts-ignore
			return filterFormRef.current.getSelectedFilters();
		} else {
			return {};
		}
	}

	const selectedRowKeys = useMemo(() => selectedRows.map(({ id }) => id), [selectedRows.length]);
	const filtersChangeId = (filters || []).reduce((accum, fieldConfig) => `${accum}, ${fieldConfig.name}-${(fieldConfig.options || []).length}`, '');

	const filterForm = useMemo(() => filters.length ? <FilterForm
			defaultFilterValues={defaultFilterValues}
			ref={filterFormRef}
			filters={filters}
			onChangeFilters={onChangeFilters}
			onSearchBtnClick={reloadTable}
			extraControls={extraControls}
		/> : null,
		[filtersChangeId, JSON.stringify(selectedFilters)]);

	const getTableHeader = useCallback(() => {
		let header: string | JSX.Element = '';

		if (title) {
			header = <div className='simple-header'>
				<div className='header'>{title}</div>
				{toolbar && <div className='toolbar'>{toolbar}</div>}
			</div>
		}

		if (!title) {
			header = toolbar || '';
		}

		return header;
	}, [!!title, !!toolbar]);


	useImperativeHandle(ref, () => ({
		reloadTable,
		resetTable,
		getFilters
	}), [reloadTable, resetTable, getFilters]);

	useEffect(() => {
		delayedSearch({ filters: selectedFilters, pagination });
	}, [JSON.stringify(selectedFilters), pagination.pageSize, pagination.pageNum]);

	return (
		<div className={`${styles.table_container} app-table ${className} ${loading ? 'with-loading' : ''} ${!total ? 'empty' : ''}`}>
			{filterForm}
			<AntTable
				bordered={false}
				className={`${styles.table}  ${!data.length ? 'empty-table' : ''}`}
				rowKey='id'
				size='middle'
				locale={{ emptyText: 'Нет данных', }}
				loading={loading}
				columns={columns}
				dataSource={data}
				{...tableProps}
				pagination={{
					total,
					size: 'default',
					hideOnSinglePage: false,
					position: ['topRight'],
					showSizeChanger: true,
					current: pagination.pageNum,
					pageSizeOptions: [10, 20, 30, 50],
					locale: {
						items_per_page: '/ стр'
					},
					showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
					onChange: (page, pageSize) => {
						setPagination({ pageNum: page, pageSize });
						if (onChangePagination) {
							onChangePagination({ pageNum: page, pageSize });
						}
					}
				}}
			/>
			{/*<Button*/}
			{/*	className={styles.pagination_reload_btn}*/}
			{/*	disabled={loading}*/}
			{/*	onClick={reloadTable}*/}
			{/*><ReloadOutlined /> Обновить</Button>*/}
		</div>

	)
});


export default Table;
