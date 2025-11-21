import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Select } from 'antd';
import qs from 'qs';

import { EnumRoomVOType } from 'backend/services/backend';
import { useLoading } from 'hooks/use-loading';
import { downloadFile } from 'utils/utils';

export function ReceiptPrintPanel({
                                    flatNumber,
                                    paymentMonths
                                  }: { flatNumber: string, paymentMonths: string[] }) {
  const [loading, showLoading, hideLoading] = useLoading();
  const [month, setMonth] = useState<string>('');

  const paymentMonthOptions = useMemo(() => paymentMonths.map((monthStr) => {
    const date = dayjs(monthStr, 'YYYY-MM');
    const localizedValue = date.format('MMMM YYYY');
    return (
      <Select.Option
        key={monthStr}
        value={monthStr}
      >
        {localizedValue}
      </Select.Option>
    );
  }), [paymentMonths.length]);

  const printReceipt = useCallback(() => {
    const [yearNumber, monthNumber] = month.split('-');
    const paramsStr = qs.stringify({
      year: yearNumber,
      month: monthNumber,
      type: EnumRoomVOType.FLAT,
      number: flatNumber
    });
    showLoading();
    downloadFile({
      method: 'get',
      url: `/receipt/merged?${paramsStr}`,
      onFinish: hideLoading
    });
  }, [month, flatNumber]);

  useEffect(() => {
    if (paymentMonths.length) {
      setMonth(paymentMonths[0]);
    }
  }, [paymentMonths.length]);

  return (
    <Card
      size="small"
      style={{ marginTop: 24 }}
      className="print-card"
      title="Печать квитанции"
    >
      <Select
        value={month}
        onChange={(value) => {
          setMonth(value);
        }}
      >
        {paymentMonthOptions}
      </Select>
      <Button
        type="link"
        style={{ marginLeft: 24 }}
        onClick={() => {
          if (loading) {
            return;
          }

          printReceipt();
        }}
      >
        {loading ? <LoadingOutlined /> : <DownloadOutlined />}
        {' '}
        Скачать квитанцию
      </Button>
    </Card>
  );
}

export default ReceiptPrintPanel;
