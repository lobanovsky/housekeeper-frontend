import { Button, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import './style.scss';
import { DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-cycle
import { convertDateRange, MonthNames, ShortMonthNames } from 'utils/utils';
import { SERVER_DATE_FORMAT } from 'utils/constants';
import { SelectedDateRange, SelectedDatesShort } from 'utils/types';

export type DateValue = Dayjs | null;
export type DateRangeValue = DateValue[];

const today = dayjs();
const startOfMonth = dayjs()
  .startOf('month');
const currentMonth = today.get('month');
const currentYear = today.get('year');

// eslint-disable-next-line import/prefer-default-export
export function RangePickerWithQuickButtons({
                                              onChange: onChangeDates,
                                              downloadReport
                                            }: {
  onChange: (newValue: SelectedDatesShort) => void,
  downloadReport: () => void
}) {
  const [dates, setDates] = useState<DateRangeValue>([startOfMonth, today]);

  const datesRange = useMemo<SelectedDateRange>(() => {
    const strings = convertDateRange(dates);
    const dateFromMoment = dates.length > 0 && dates[0] ? dates[0] : null;
    const dateToMoment = dates.length > 1 && dates[1] ? dates[1] : null;

    let selectedMonth = -1;
    let selectedMonthName = ' - ';
    let selectedYear = -1;
    let selectedYearName = ' - ';

    if (dateFromMoment && dateToMoment) {
      const [fromMonth, toMonth] = [dateFromMoment.get('month'), dateToMoment.get('month')];
      selectedMonthName = fromMonth === toMonth ? MonthNames[fromMonth] : `${ShortMonthNames[fromMonth]} - ${ShortMonthNames[toMonth]}`;
      selectedMonth = toMonth;

      const [fromYear, toYear] = [dateFromMoment.get('year'), dateToMoment.get('year')];
      selectedYearName = fromYear === toYear ? String(toYear) : `${fromYear} - ${toYear}`;
      selectedYear = toYear;
    }

    return ({
      ...strings,
      selectedMonth,
      selectedMonthName,
      selectedYear,
      selectedYearName,
      // selectedPeriod,
      dateFromMoment,
      dateToMoment
    });
  }, [dates.map((date) => (date ? date.format(SERVER_DATE_FORMAT) : ''))
    .join(',')]);

  const onChange = useCallback((newDates: [DateValue, DateValue] | null) => {
    const realValue: Array<Dayjs | null> = Array.isArray(newDates) ? newDates : [];
    setDates(realValue);
    onChangeDates(convertDateRange(realValue));
  }, [onChangeDates]);

  const goPrevYear = useCallback(() => {
    if (datesRange.dateFromMoment) {
      const prevYear = datesRange.dateFromMoment.subtract(1, 'year');
      onChange([prevYear.startOf('year'), prevYear.endOf('year')]);
    }
  }, [datesRange?.dateFromMoment?.format(SERVER_DATE_FORMAT), onChange]);

  const goNextYear = useCallback(() => {
    if (datesRange.dateToMoment) {
      const nextYear = datesRange.dateToMoment.add(1, 'year');
      onChange([nextYear.startOf('year'), nextYear.endOf('year')]);
    }
  }, [datesRange?.dateToMoment?.format(SERVER_DATE_FORMAT), onChange]);

  const goPrevMonth = useCallback(() => {
    if (datesRange.dateFromMoment) {
      const prevMonth = datesRange.dateFromMoment.subtract(1, 'month');
      onChange([prevMonth.startOf('month'), prevMonth.endOf('month')]);
    }
  }, [datesRange?.dateFromMoment?.format(SERVER_DATE_FORMAT), onChange]);

  const goNextMonth = useCallback(() => {
    if (datesRange.dateToMoment) {
      const nextMonth = datesRange.dateToMoment.add(1, 'month');
      onChange([nextMonth.startOf('month'), nextMonth.endOf('month')]);
    }
  }, [datesRange?.dateToMoment?.format(SERVER_DATE_FORMAT), onChange]);

  return (
    <div className="range-picker-with-quick-buttons">
      <DatePicker.RangePicker
        size="small"
        style={{ width: 240 }}
        /* @ts-ignore */
        value={dates}
        format="DD.MM.YYYY"
        onCalendarChange={onChange}
      />
      <div className="period-changer">
        <Button
          size="small"
          className="prev-year"
          onClick={goPrevYear}
        >
          <DoubleLeftOutlined />
        </Button>
        <Button
          size="small"
          className="prev-month"
          onClick={goPrevMonth}
        >
          <LeftOutlined />
        </Button>
        <div className="selected-date">
          {datesRange.selectedMonthName}
          &nbsp;
          {datesRange.selectedYearName}
        </div>
        <Button
          size="small"
          className="next-month"
          disabled={datesRange.selectedMonth >= currentMonth && datesRange.selectedYear === currentYear}
          onClick={goNextMonth}
        >
          <RightOutlined />
        </Button>
        <Button
          size="small"
          className="next-year"
          disabled={datesRange.selectedYear >= currentYear}
          onClick={goNextYear}
        >
          <DoubleRightOutlined />
        </Button>
      </div>
    </div>
  );
}
