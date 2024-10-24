import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';

import { EnumOutgoingGropingPaymentsFilterGroupBy, GroupOfPayment } from 'backend/services/backend';
import Loading from 'components/loading';
import { useLoading } from 'hooks/use-loading';
import { SelectedDatesShort } from 'utils/types';
import { convertDateRange, downloadFile } from 'utils/utils';
import { ExpensesChart } from './components/chart';
import { expenseColumns, expensePaymentColumns } from './columns';
import { startOfCurrentMonth, today } from './components/filter-rofm/range-picker/utils';
import { loadExpensesByDates } from './services';
import { CounterpartyData } from './types';
import './style.scss';
import { ExpensesSettingsForm } from './components/filter-rofm';

export function ExpensesView() {
  const [dates, setDates] = useState<SelectedDatesShort>({
    ...convertDateRange([startOfCurrentMonth, today]),
    dateFromMoment: startOfCurrentMonth,
    dateToMoment: today
  });

  const [groupBy, setGroupBy] = useState<EnumOutgoingGropingPaymentsFilterGroupBy>(EnumOutgoingGropingPaymentsFilterGroupBy.CATEGORY);
  const [loading, showLoading, hideLoading] = useLoading();
  const [reportLoading, showReportLoading, hideReportLoading] = useLoading();

  const [data, setData] = useState<CounterpartyData>({
    data: [],
    total: 0,
    totalSum: 0
  });

  const createReport = useCallback(() => {
    showReportLoading();
    downloadFile({
      method: 'post',
      url: '/reports/payments/outgoing/grouping',
      onFinish: hideReportLoading,
      requestParams: {
        startDate: dates.dateStart,
        endDate: dates.dateEnd,
        groupBy
      }
    });
  }, [dates.dateStart, dates.dateEnd, groupBy]);

  const loadData = useCallback(() => {
    if (!dates.dateToMoment || !dates.dateFromMoment) {
      return;
    }
    showLoading();
    loadExpensesByDates({
      startDate: dates.dateStart,
      endDate: dates.dateEnd,
      groupBy
    }, (isSuccess, loadedData) => {
      hideLoading();
      if (isSuccess) {
        setData(loadedData || {
          data: [],
          total: 0,
          totalSum: 0
        });
      }
    });
  }, [groupBy, dates.dateToMoment, dates.dateFromMoment, dates.dateStart, dates.dateEnd]);

  const onChangeDates = useCallback((newValue: SelectedDatesShort) => {
    setDates(newValue);
  }, []);

  const renderExpandedRow = useCallback((row: GroupOfPayment) => (
    <Table
      rowKey="id"
      className="payments-table"
      size="small"
      columns={expensePaymentColumns}
      dataSource={row.payments}
      pagination={false}
    />
  ), []);

  useEffect(() => {
    loadData();
  }, [groupBy, dates.dateStart, dates.dateEnd, loadData]);

  return (
    <div className="expenses">
      {loading && <Loading />}
      <ExpensesSettingsForm
        isLoadingReport={reportLoading}
        selectedGrouping={groupBy}
        onChangeGrouping={setGroupBy}
        createReport={createReport}
        onChangeDates={onChangeDates}
      />
      <ExpensesChart data={data.data} total={data.totalSum} />
      <Table
        rowKey="id"
        className="expenses-table"
        loading={loading}
        size="small"
        columns={expenseColumns}
        dataSource={data.data}
        expandable={{ expandedRowRender: renderExpandedRow }}
        pagination={{
          size: 'small',
          hideOnSinglePage: false,
          defaultPageSize: 100,
          position: ['topRight'],
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          locale: { items_per_page: '/ стр' },
          showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`
        }}
      />
    </div>
  );
}
