import React, { useCallback } from 'react';
import { Button, Card, Radio, Typography } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { EnumOutgoingGropingPaymentsFilterGroupBy } from 'backend/services/backend';
import { ChangeHandler, EmptyFunction, SelectedDatesShort } from 'utils/types';
import { RangePickerWithQuickButtons } from './range-picker';
import './styles.scss';

interface ExpensesSettingsFormProps {
  selectedGrouping: string;
  createReport: EmptyFunction,
  isLoadingReport: boolean,
  onChangeGrouping: ChangeHandler<EnumOutgoingGropingPaymentsFilterGroupBy>
  onChangeDates: ChangeHandler<SelectedDatesShort>
}

export function ExpensesSettingsForm({
                                       selectedGrouping,
                                       createReport,
                                       isLoadingReport,
                                       onChangeGrouping,
                                       onChangeDates
                                     }: ExpensesSettingsFormProps) {
  const onRadioClick = useCallback(({ target: { value } }: RadioChangeEvent) => {
    onChangeGrouping(value);
  }, []);

  return (
    <Card className="expence-params">
      <div className="grouping">
        <Typography.Text className="label">Группировка:</Typography.Text>
        <div>
          <Radio.Group
            value={selectedGrouping}
            onChange={onRadioClick}
          >
            <Radio value={EnumOutgoingGropingPaymentsFilterGroupBy.CATEGORY}>По категориям</Radio>
            <Radio value={EnumOutgoingGropingPaymentsFilterGroupBy.COUNTERPARTY}>По поставщикам</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="dates">
        <Typography.Text className="label">Период:</Typography.Text>
        <RangePickerWithQuickButtons onChange={onChangeDates} />
      </div>
      <Button type="link" size="small" onClick={createReport} disabled={isLoadingReport}>
        {isLoadingReport ? <LoadingOutlined /> : <DownloadOutlined />}
        Скачать отчёт
      </Button>

    </Card>
  );
}
