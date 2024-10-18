import React, { useCallback } from 'react';
import { Card, Radio, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { EnumOutgoingGropingPaymentsFilterGroupBy } from 'backend/services/backend';
import { ChangeHandler, EmptyFunction, SelectedDatesShort } from 'utils/types';
import { RangePickerWithQuickButtons } from './range-picker';
import './styles.scss';

interface ExpensesSettingsFormProps {
  selectedGrouping: string;
  createReport: EmptyFunction,
  onChangeGrouping: ChangeHandler<EnumOutgoingGropingPaymentsFilterGroupBy>
  onChangeDates: ChangeHandler<SelectedDatesShort>
}

export function ExpensesSettingsForm({
                                       selectedGrouping,
                                       createReport,
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
            style={{
              marginBottom: 12,
              marginLeft: 6
            }}
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
        <RangePickerWithQuickButtons onChange={onChangeDates} downloadReport={createReport} />
      </div>

    </Card>
  );
}
