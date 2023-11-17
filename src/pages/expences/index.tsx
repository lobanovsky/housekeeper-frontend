import {useCallback, useEffect, useState} from 'react';
import {Card, Radio, Table, Typography} from 'antd';
import {useLoading} from "hooks/use-loading";
import {convertDateRange, downloadFile} from "../../utils/utils";
import {EnumOutgoingGropingPaymentsFilterGroupBy} from "backend/services/backend";
import {ExpensesChart} from "./chart";
import {expenseColumns, expensePaymentColumns} from "./columns";
import './style.scss';
import {RangePickerWithQuickButtons, SelectedDatesShort} from "./range-picker";
import Loading from "../../components/loading";
import {startOfCurrentMonth, today} from "./range-picker/utils";
import {loadExpensesByDates} from "./services";
import {CounterpartyData} from "./types";


export const ExpensesView = () => {
    const [dates, setDates] = useState<SelectedDatesShort>({
        ...convertDateRange([startOfCurrentMonth, today]),
        dateFromMoment: startOfCurrentMonth,
        dateToMoment: today,
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
        downloadFile('/reports/payments/outgoing/grouping', {
            startDate: dates.dateStart,
            endDate: dates.dateEnd,
            groupBy
        }, hideReportLoading);
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
                setData(loadedData || {data: [], total: 0, totalSum: 0});
            }
        })
    }, [groupBy, dates.dateToMoment, dates.dateFromMoment, dates.dateStart, dates.dateEnd]);

    const onChangeDates = useCallback((newValue: SelectedDatesShort) => {
        setDates(newValue);
    }, []);

    useEffect(() => {
        loadData();
    }, [groupBy, dates.dateStart, dates.dateEnd, loadData]);

    return (
        <div className='expenses'>
            {loading && <Loading/>}
            <Card>
                <Typography.Text strong>Группировка:</Typography.Text>
                <Radio.Group style={{marginBottom: 12, marginLeft: 6}} value={groupBy}
                             onChange={({target: {value}}) => {
                                 setGroupBy(value);
                             }}>
                    <Radio value={EnumOutgoingGropingPaymentsFilterGroupBy.CATEGORY}>По категориям</Radio>
                    <Radio value={EnumOutgoingGropingPaymentsFilterGroupBy.COUNTERPARTY}>По поставщикам</Radio>
                </Radio.Group>
                <RangePickerWithQuickButtons onChange={onChangeDates} downloadReport={createReport}/>

            </Card>
            <ExpensesChart data={data.data} total={data.totalSum}/>
            <Table
                rowKey='id'
                className='expenses-table'
                loading={loading}
                size='small'
                columns={expenseColumns}
                dataSource={data.data}
                expandable={{
                    expandedRowRender: (row) => (
                        <Table
                            rowKey='id'
                            className='payments-table'
                            size='small'
                            columns={expensePaymentColumns}
                            dataSource={row.payments}
                            pagination={false}
                        />
                    )
                }}
                pagination={{
                    size: 'small',
                    hideOnSinglePage: false,
                    position: ['topRight'],
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    locale: {items_per_page: '/ стр'},
                    showTotal: (total, range) => `${range[0]}-${range[1]} из ${total}`,
                }}
            />
        </div>
    )
}

