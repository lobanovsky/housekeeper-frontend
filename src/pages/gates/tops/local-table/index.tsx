import React, { useCallback, useImperativeHandle, useState } from 'react';
import { Table } from 'antd';
import { useLoading } from 'hooks/use-loading';
import { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { getRandomId } from 'utils/utils';
import { showError } from 'utils/notifications';
import { TopFilter, TopResponse } from 'backend/services/backend';
import { SERVER_DATE_FORMAT } from '../../../../utils/constants';

// import { topByUserColumns } from 'pages/gates/tops/columns';

export interface TopFilterValues {
  /**  */
  gateId?: number;
  /**  */
  startDate?: Dayjs;
  /**  */
  endDate?: Dayjs;
}

interface LocalTableProps {
  columns: ColumnsType<TopResponse>,
  loadDataFn: (requestParams: any) => Promise<TopResponse[]>
}

const LocalDataTable = React.forwardRef(({ columns, loadDataFn }: LocalTableProps, ref) => {
  const [data, setData] = useState<TopResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingData, showLoading, hideLoading] = useLoading();

  const loadData = useCallback(({ startDate, endDate, ...selectedFilters }: TopFilterValues) => {
    showLoading();
    const requestFilters: TopFilter = { ...selectedFilters };
    if (startDate) {
      requestFilters.startDate = startDate.format(SERVER_DATE_FORMAT);
    }

    if (endDate) {
      requestFilters.endDate = endDate.format(SERVER_DATE_FORMAT);
    }

    loadDataFn(requestFilters)
      .then((loadedData) => {
        hideLoading();
        setData(loadedData.map((item: any) => ({
          ...item,
          id: getRandomId()
        })));
      })
      .catch((e) => {
        hideLoading();
        showError('Не удалось загрузить список топов', e);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    loadData
  }), []);

  return (
    <Table
      rowKey="id"
      size="small"
      loading={isLoadingData}
      columns={columns}
      dataSource={data}
      pagination={{
        current: currentPage,
        position: ['bottomRight'],
        onChange: setCurrentPage
      }}
    />
  );
});

export default LocalDataTable;
