import {useCallback, useState} from 'react';
import {Button, DatePicker} from 'antd';
import dayjs from "dayjs";
import {useLoading} from "../../hooks/use-loading";
import {downloadFile} from "../../utils/utils";
import {DownloadOutlined, LoadingOutlined} from "@ant-design/icons";


const today = dayjs();
const startOfMonth = dayjs().startOf('month');

export const ExpensesView = () => {
    const [dates, setDates] = useState([startOfMonth, today]);
    const [loading, showLoading, hideLoading] = useLoading();

    const createReport = useCallback(() => {
        if (!dates.length) {
            return;
        }
        showLoading();

        downloadFile('/reports/payments/outgoing/grouping', {
            // @ts-ignore
            startDate: dates[0].format('YYYY-MM-DD'),
            // @ts-ignore
            endDate: dates[1].format('YYYY-MM-DD')
        }, () => {
            hideLoading();
        });
    }, [JSON.stringify(dates)]);

    return (
        <div className='expences'>
            <DatePicker.RangePicker
                style={{width: 300}}
                /*@ts-ignore*/
                value={dates}
                format='DD.MM.YYYY'
                onChange={(newDates) => {
                    /*@ts-ignore*/
                    setDates(newDates || []);
                }}/>
            <Button type='primary' style={{marginLeft: 20}} disabled={!dates.length} onClick={createReport}>
                {loading ? <LoadingOutlined/> : <DownloadOutlined/>}Скачать отчёт</Button>
            {/*<Table*/}
            {/*    rowKey='uuid'*/}
            {/*    columns={getPaymentColumns(false)}*/}
            {/*    loadDataFn={PaymentService.findIncomingPayments}*/}
            {/*    filters={getPaymentFilters(false, accountOptions)}*/}
            {/*    exportURL='reports/payments/incoming'*/}
            {/*    rowSelection={{*/}
            {/*        onChange: (selectedRowKeys: React.Key[], selectedRecords: PaymentVO[]) => {*/}
            {/*            setSelectedRows(selectedRecords);*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    toolbar={<Button*/}
            {/*        onClick={setTaxable}*/}
            {/*        disabled={!selectedRows.length}*/}
            {/*    >*/}
            {/*        Пометить как налогооблагаемые*/}
            {/*    </Button>}*/}
            {/*/>*/}
        </div>
    )
}

