import Table from 'components/table';
import {getPaymentColumns} from 'pages/payments/columns';
import {AccountService, PaymentService, PaymentVO} from 'backend/services/backend';
import {getPaymentFilters} from 'pages/payments/filters';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Select} from 'antd';
import {showError} from "../../utils/notifications";

export const accountNumberRenderer = (accountNumber: string = '') => {
    const groups = [];

    let startIndex = 0;

    for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
        groups.push(accountNumber.substring(startIndex, startIndex + 4));
    }

    return groups.length ? groups.join(' ') : accountNumber;
};

const IncomingPayments = () => {
    const [selectedRows, setSelectedRows] = useState<PaymentVO[]>([])
    const [accounts, setAccounts] = useState([]);

    const accountOptions = useMemo(() => accounts.map(({account, description, special}) => <Select.Option
        id={account} value={account} key={account}>
        <span className={`account ${special ? 'special' : ''}`}>
            <span className='account-number'>{accountNumberRenderer(account)}</span>
             ({description})
        </span>
    </Select.Option>), [accounts.length]);

    const setTaxable = useCallback(() => {

    }, [selectedRows.length]);

    useEffect(() => {
        AccountService.findAllAccounts()
            .then(data => {
                setAccounts(data);
            })
            .catch(e => {
                showError('Не удалось загрузить список счетов', e);
            })
    }, []);

    return (
        <div className='payments incoming'>
            <Table
                rowKey='uuid'
                columns={getPaymentColumns(false)}
                loadDataFn={PaymentService.findIncomingPayments}
                filters={getPaymentFilters(false, accountOptions)}
                exportURL='reports/payments/incoming'
                rowSelection={{
                    onChange: (selectedRowKeys: React.Key[], selectedRecords: PaymentVO[]) => {
                        setSelectedRows(selectedRecords);
                    }
                }}
                toolbar={<Button
                    onClick={setTaxable}
                    disabled={!selectedRows.length}
                >
                    Пометить как налогооблагаемые
                </Button>}
            />
        </div>
    )
}

export default IncomingPayments;
