import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Table} from 'antd';
import dayjs, {Dayjs} from "dayjs";
import {useLoading} from "hooks/use-loading";
import {convertDateRange, downloadFile} from "../../utils/utils";
import {DownloadOutlined, LoadingOutlined,} from "@ant-design/icons";
import {GroupOfPayment, PaymentService} from "backend/services/backend";
import {showError} from "../../utils/notifications";
import {ExpensesChart} from "./chart";
import {expenseColumns, expensePaymentColumns} from "./columns";
import './style.scss';
import {RangePickerWithQuickButtons} from "./range-picker";
import Loading from "../../components/loading";
import {SERVER_DATE_FORMAT} from "../../utils/constants";


interface CounterpartyData {
    data: GroupOfPayment[],
    total: number,
    totalSum: number
}

const today = dayjs();
const startOfMonth = dayjs().startOf('month');

export const ExpensesView = () => {
    const [dates, setDates] = useState<Dayjs[]>([startOfMonth, today]);
    const [loading, showLoading, hideLoading] = useLoading();
    const [reportLoading, showReportLoading, hideReportLoading] = useLoading();

    const [data, setData] = useState<CounterpartyData>({
        data: [],
        total: 0,
        totalSum: 0
    });

    const datesRange = useMemo(() => convertDateRange(dates),
        [dates.map(date => date ? date.format(SERVER_DATE_FORMAT) : '').join(',')]);

    const createReport = useCallback(() => {
        showReportLoading();
        downloadFile('/reports/payments/outgoing/grouping', {
            startDate: datesRange.dateStart,
            endDate: datesRange.dateEnd,
        }, hideReportLoading);
    }, [datesRange.dateStart, datesRange.dateEnd]);


    const loadData = useCallback((dates: Dayjs[]) => {
        if (!dates.length) {
            return;
        }

        const {dateStart, dateEnd} = convertDateRange(dates);

        const requestParams = {
            startDate: dateStart,
            endDate: dateEnd
        }

        console.log(`%c Load data for [${requestParams.startDate} - ${requestParams.endDate}]`, 'color: red');
        showLoading();
        PaymentService.findOutgoingPaymentsGroupingByCounterparty({body: requestParams})
            .then((loadedData: GroupOfPayment[]) => {
                hideLoading();
                const totalSum = loadedData.reduce((accum, {total: categoryTotal = 0}) => accum + categoryTotal, 0);

                setData({
                    data: loadedData.map((item) => ({
                        ...item,
                        id: item.counterparty?.id
                    })),
                    total: loadedData.length,
                    totalSum
                });
            })
            .catch(e => {
                hideLoading();
                showError('Не удалось загрузить траты', e);
            })
    }, []);

    const onChangeDates = useCallback((newValue: Dayjs[] = []) => {
        setDates(newValue || []);
        if (newValue.length) {
            loadData(newValue);
        }
    }, [])

    useEffect(() => {
        loadData(dates);
    }, []);

    return (
        <div className='expenses'>
            {loading && <Loading/>}
            <RangePickerWithQuickButtons value={dates} onChange={onChangeDates} datesRange={datesRange}/>

            {/*<Button type='primary' style={{margin: '0 12px 0 20px'}}*/}
            {/*        disabled={!datesRange.dateStart || !datesRange.dateEnd} onClick={loadData}>*/}
            {/*    {loading ? <LoadingOutlined/> : <SearchOutlined/>}Показать расходы*/}
            {/*</Button>*/}
            <Button disabled={!datesRange.dateStart || !datesRange.dateEnd} onClick={createReport}
                    style={{marginLeft: 20}}>
                {reportLoading ? <LoadingOutlined/> : <DownloadOutlined/>}Скачать отчёт
            </Button>
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

