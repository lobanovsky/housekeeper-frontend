import React, {useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {Table as AntTable, TableProps} from 'antd';
import debounce from 'lodash/debounce';

import {FilterFieldsConfig} from 'components/table/filter-form/types';
import {showError} from 'utils/notifications';
import {EmptyFunction, IPagination} from 'utils/types';
import FilterForm, {FilterFormValues} from './filter-form';
import styles from './styles.module.scss';
import {downloadFile} from 'utils/utils';
import {Dayjs} from 'dayjs';
import {SERVER_DATE_FORMAT} from "../../utils/constants";

export interface TableRequestParams<T> extends IPagination {
	body: T
}

export interface TablePublicMethods {
	reloadTable: EmptyFunction,
	resetTable: EmptyFunction,
	getFilters: () => FilterFormValues,
	loadData: (params: { filters: FilterFormValues, pagination: IPagination }) => void;
}

interface ITableProps extends TableProps<any> {
	// columns: any[],
	// className?: string;
	toolbar?: React.ReactNode;
	filters?: FilterFieldsConfig;
	isValidForm?: (filters: any) => boolean,
	defaultPagination?: IPagination;
	defaultFilterValues?: Record<string, string | string[] | number | number[] | Dayjs>,
	additionalRequestParams?: any,
	loadDataOnInit?: boolean;
	onChangePagination?: (pagination: IPagination) => void,
	// onSelectionChange?: (selectedIds: Array<number | string>)=> void;
	onRow?: (record: any) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>,
	exportURL?: string,
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
		toolbar = '',
		className,
		defaultPagination = { pageNum: 1, pageSize: 10 },
		defaultFilterValues = {},
		requestParamsConverter,
		responseDataConverter = null,
		filters = [],
		onChangePagination = null,
		extraControls = [],
		exportURL = '',
		isValidForm = () => true,
		...tableProps
	} = props;

	// const { user } = useContext(AuthContext);
	const [data, setData] = useState<any[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [pagination, setPagination] = useState<IPagination>(defaultPagination);
	const [loading, setLoading] = useState<boolean>(false);
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

	const getProcessedFilters = useCallback((selectedFilterValues: any) => {
		const convertedFilters = {};
		Object.entries(selectedFilterValues).forEach(([filterName, filterValue]) => {
			const isDate = filterName.endsWith('Date');
			if (isDate) {
				// @ts-ignore
				if (filterValue && filterValue.isValid()) {
					// @ts-ignore
					convertedFilters[filterName] = filterValue.format(SERVER_DATE_FORMAT)
				}
			} else {
				// @ts-ignore
				convertedFilters[filterName] = filterValue;
			}

		})

		return convertedFilters;
	}, []);


	const exportToFile = useCallback((onFinish: (isSuccess: boolean) => void) => {
		const convertedFilters = getProcessedFilters(selectedFilters);
		downloadFile(exportURL, convertedFilters, onFinish);
	}, [JSON.stringify(selectedFilters)]);

	const loadData = useCallback((params: { filters: FilterFormValues, pagination: IPagination }) => {
		const { filters, pagination: { pageNum = 0, pageSize = 10 } = {} } = params;
		const convertedFilters = getProcessedFilters(filters);


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

	// const filterForm = useMemo(() => filters.length ? ,
	// 	[filtersChangeId, JSON.stringify(selectedFilters)]);

	useImperativeHandle(ref, (): TablePublicMethods => ({
		reloadTable,
		resetTable,
		getFilters,
		loadData
	}), [reloadTable, resetTable, getFilters]);

	useEffect(() => {
		if (isValidForm(selectedFilters)) {
			delayedSearch({ filters: selectedFilters, pagination });
		}

	}, [JSON.stringify(selectedFilters), pagination.pageSize, pagination.pageNum]);

	return (
		<div className={`${styles.table_container} app-table ${className} ${loading ? 'with-loading' : ''} ${!total ? 'empty' : ''}`}>
			{filters.length > 0 && <FilterForm
				defaultFilterValues={defaultFilterValues}
				ref={filterFormRef}
				exportToFile={exportURL ? exportToFile : null}
				filters={filters}
				isValidForm={isValidForm}
				onChangeFilters={onChangeFilters}
				onSearchBtnClick={reloadTable}
				extraControls={extraControls}
			/>}
			{/* @ts-ignore*/}
			{!!toolbar && <div className='table-toolbar'>{toolbar}</div>}
			<AntTable
				bordered={false}
				className={`${styles.table}  ${!data.length ? 'empty-table' : ''}`}
				rowKey='id'
				size='middle'
				locale={{ emptyText: 'Нет данных', }}
				loading={loading}
				columns={columns}
				dataSource={data}
				pagination={{
					total,
					size: 'default',
					hideOnSinglePage: false,
					position: ['topRight'],
					showSizeChanger: true,
					current: pagination.pageNum,
					pageSizeOptions: [10, 20, 50, 100],
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
				{...tableProps}
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
