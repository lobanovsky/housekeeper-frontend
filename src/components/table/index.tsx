import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Pagination, Table as AntTable, TableProps } from 'antd';
import debounce from 'lodash/debounce';

import { FilterFieldsConfig } from 'components/table/filter-form/types';
import { showError } from 'utils/notifications';
import { EmptyFunction, IPagination } from 'utils/types';
import { downloadFile } from 'utils/utils';
import { Dayjs } from 'dayjs';
import FilterForm, { FilterFormValues } from './filter-form';
import { SERVER_DATE_FORMAT } from '../../utils/constants';
import './styles.scss';
import { SUMM_REGEX, TablePaginationConfig } from './constants';

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
  rowKey?: string;
  requestParamsConverter?: (filters: any) => any,
  responseDataConverter?: (response: any) => any,
  loadDataFn: (requestParams: any) => Promise<{ content: any[], totalElements: number }>
}

const Table = React.forwardRef((props: ITableProps, ref) => {
  const {
    loadDataFn,
    pagination: paginationConfig = true,
    columns,
    toolbar = '',
    className,
    defaultPagination = { pageNum: 1, pageSize: 100 },
    defaultFilterValues = {},
    requestParamsConverter,
    responseDataConverter = null,
    filters = [],
    onChangePagination = null,
    exportURL = '',
    isValidForm = () => true,
    ...tableProps
  } = props;

  // const { user } = useContext(AuthContext);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<any>(() => ({
    ...defaultFilterValues
  }));

  const filterFormRef = useRef(null);

  const onChangeFilters = useCallback((changedFilters: any) => {
    setSelectedFilters(changedFilters);

    setPagination((prev) => ({
      pageNum: 1,
      pageSize: prev.pageSize
    }));
  }, []);

  const getProcessedFilters = useCallback((selectedFilterValues: any) => {
    const convertedFilters = {};
    Object.entries(selectedFilterValues).forEach(([filterName, filterValue]) => {
      const isDate = filterName.endsWith('Date');
      const isSum = filterName.toLowerCase().endsWith('sum');

      if (isDate) {
        // @ts-ignore
        if (filterValue && filterValue.isValid()) {
          // @ts-ignore
          convertedFilters[filterName] = filterValue.format(SERVER_DATE_FORMAT);
        }
      } else if (isSum) {
        const amountStr = String(filterValue).replace(/\s+/g, '').replace(/,/g, '.');
        if (SUMM_REGEX.test(amountStr)) {
          // @ts-ignore
          convertedFilters[filterName] = parseFloat(amountStr);
        }
      } else {
        // @ts-ignore
        convertedFilters[filterName] = filterValue;
      }
    });

    return convertedFilters;
  }, []);

  const onPaginationChange = useCallback((page: number, pageSize: number) => {
    setPagination({ pageNum: page, pageSize });
    if (onChangePagination) {
      onChangePagination({ pageNum: page, pageSize });
    }
  }, []);

  const exportToFile = useCallback((onFinish: (isSuccess: boolean) => void) => {
    const convertedFilters = getProcessedFilters(selectedFilters);
    downloadFile({
      url: exportURL,
      requestParams: convertedFilters,
      onFinish,
      method: 'post'
    });
  }, [JSON.stringify(selectedFilters)]);

  const loadData = useCallback((params: { filters: FilterFormValues, pagination: IPagination }) => {
    const { filters: filtersToSearch, pagination: { pageNum = 0, pageSize = 10 } = {} } = params;
    const convertedFilters = getProcessedFilters(filtersToSearch);

    setLoading(true);
    let requestParams: any & IPagination = {
      pageNum: pageNum - 1,
      pageSize,
      body: convertedFilters
    };

    if (requestParamsConverter) {
      requestParams = requestParamsConverter(requestParams);
    }
    loadDataFn(requestParams)
      .then((responseData: any) => {
        if (responseDataConverter) {
          const { data: newData, total: newTotal } = responseDataConverter(responseData);
          setData(newData);
          setTotal(newTotal);
        } else {
          setData(responseData.content || []);
          setTotal(responseData.totalElements || 0);
        }

        setLoading(false);
      })
      .catch((e) => {
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
  };

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
        filters: {},
        pagination: {
          pageNum: 1, pageSize: 10
        }
      });
    }
  };

  const getFilters = () => {
    // @ts-ignore
    if (filterFormRef.current && filterFormRef.current.getSelectedFilters) {
      // @ts-ignore
      return filterFormRef.current.getSelectedFilters();
    }
    return {};
  };

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
    <div className={`app-table ${className} ${loading ? 'with-loading' : ''} ${!total ? 'empty' : ''}`}>
      {filters.length > 0 && (
        <FilterForm
          defaultFilterValues={defaultFilterValues}
          ref={filterFormRef}
          exportToFile={exportURL ? exportToFile : null}
          filters={filters}
          isValidForm={isValidForm}
          onChangeFilters={onChangeFilters}
          onSearchBtnClick={reloadTable}
        />
      )}
      <div className="pagination-container">
        {!!toolbar && <div className="table-toolbar">{toolbar}</div>}
        {!!paginationConfig && (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Pagination {...{
            ...TablePaginationConfig,
            total,
            pageSize: pagination.pageSize,
            current: pagination.pageNum,
            onChange: onPaginationChange
          }}
          />
        )}
      </div>
      <AntTable
        bordered={false}
        className={!data.length ? 'empty-table' : ''}
        rowKey="id"
        size="small"
        locale={{ emptyText: 'Нет данных' }}
        loading={loading}
        columns={columns}
        dataSource={data}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...tableProps}
        pagination={false}
      />
    </div>

  );
});

export default Table;
