import Table from 'components/table';
import {accountNumberRenderer, getPaymentColumns} from 'pages/payments/columns';
import {AccountService, PaymentService, PaymentTypeResponse, PaymentVO} from 'backend/services/backend';
import {getPaymentFilters} from 'pages/payments/filters';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Select} from 'antd';
import {showError} from "../../utils/notifications";
import {downloadFile} from "../../utils/utils";
import {DownloadOutlined} from "@ant-design/icons";


const rowClassName = (record: PaymentVO) => !record.account ? 'empty-account' : '';

const IncomingPayments = () => {
    const [selectedRows, setSelectedRows] = useState<PaymentVO[]>([])
    const [accounts, setAccounts] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState<{ id: string, name: string }[]>([]);

    const accountOptions = useMemo(() => accounts.map(({account, description, special}) => <Select.Option
        id={account} value={account} key={account}>
        <span className={`account ${special ? 'special' : ''}`}>
            <span className='account-number'>{accountNumberRenderer(account)}</span>
             ({description})
        </span>
    </Select.Option>), [accounts.length]);

    const paymentTypeOptions = useMemo(() => paymentTypes.map(({id, name}) => <Select.Option
        id={id} value={id} key={id}>{name}</Select.Option>), [accounts.length]);

    const incomingPaymentFilters = useMemo(() => getPaymentFilters(false, {accountOptions, paymentTypeOptions}), [
        accountOptions.length, paymentTypeOptions.length
    ]);

    const downloadRegistry = useCallback(() => {
        downloadFile('registries/special-account', {}, () => {
        });
    }, []);

    useEffect(() => {
        AccountService.findAllAccounts()
            .then(data => {
                setAccounts(data);
            })
            .catch(e => {
                showError('Не удалось загрузить список счетов', e);
            });

        PaymentService.findAllPaymentTypes()
            .then((data: PaymentTypeResponse[] = []) => {
                const types: { id: string, name: string }[] = data.map(({type = '', description = ''}) => ({
                    id: type,
                    name: description
                }));

                setPaymentTypes(types);
            })
            .catch(e => {
                showError('Не удалось загрузить список типов платежей', e);
            });
    }, []);

    return (
        <div className='payments incoming'>
            <Table
                rowKey='uuid'
                columns={getPaymentColumns(false)}
                loadDataFn={PaymentService.findIncomingPayments}
                filters={incomingPaymentFilters}
                exportURL='reports/payments/incoming'
                rowClassName={rowClassName}
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[], selectedRecords: PaymentVO[]) => {
                        setSelectedRows(selectedRecords);
                    }
                }}
                toolbar={
                    <>
                        {/*<Button*/}
                        {/*    onClick={setTaxable}*/}
                        {/*    disabled={!selectedRows.length}*/}
                        {/*>*/}
                        {/*    Пометить как налогооблагаемые*/}
                        {/*</Button>*/}
                        <Button size='small' onClick={downloadRegistry}>
                            <DownloadOutlined/>
                            Скачать реестр
                        </Button>
                    </>}
            />
        </div>
    )
}

export default IncomingPayments;
