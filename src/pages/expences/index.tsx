import {useCallback, useEffect, useState} from 'react';
import {Button, Card, Radio, Table, Typography} from 'antd';
import {useLoading} from "hooks/use-loading";
import {convertDateRange, downloadFile} from "../../utils/utils";
import {DownloadOutlined, LoadingOutlined} from "@ant-design/icons";
import {EnumOutgoingGropingPaymentsFilterGroupBy, GroupOfPayment, PaymentService} from "backend/services/backend";
import {showError} from "../../utils/notifications";
import {ExpensesChart} from "./chart";
import {expenseColumns, expensePaymentColumns} from "./columns";
import './style.scss';
import {RangePickerWithQuickButtons, SelectedDatesShort} from "./range-picker";
import Loading from "../../components/loading";
import {startOfCurrentMonth, today} from "./range-picker/utils";

interface CounterpartyData {
    data: GroupOfPayment[],
    total: number,
    totalSum: number
}


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

        // const {dateStart, dateEnd} = convertDateRange(dates);

        const requestParams = {
            startDate: dates.dateStart,
            endDate: dates.dateEnd,
            groupBy
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
                        id: item.name
                    })),
                    total: loadedData.length,
                    totalSum
                });
            })
            .catch(e => {
                hideLoading();
                showError('Не удалось загрузить траты', e);
            })
    }, [groupBy, dates.dateToMoment, dates.dateFromMoment, dates.dateStart, dates.dateEnd]);

    const onChangeDates = useCallback((newValue: SelectedDatesShort) => {
        setDates(newValue);
        // if (newValue.dateFromMoment && newValue.dateToMoment) {
        //     loadData(newValue);
        // }
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
                <RangePickerWithQuickButtons onChange={onChangeDates}/>
                <Button className='report-btn'
                        disabled={!dates.dateStart || !dates.dateEnd} onClick={createReport}
                        style={{marginLeft: 20}}>
                    {reportLoading ? <LoadingOutlined/> : <DownloadOutlined/>}Скачать отчёт
                </Button>
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

