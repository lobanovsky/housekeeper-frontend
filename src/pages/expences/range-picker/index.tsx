import {DatePicker, Radio} from "antd"
import dayjs, {Dayjs} from "dayjs";
import React, {useCallback, useMemo} from "react";
import {RadioChangeEvent} from "antd/es/radio/interface";
import './style.scss';

enum QUICK_PERIODS {
    MONTH = 'M',
    HALF_YEAR = 'HY',
    YEAR = 'Y'
};

const today = dayjs();
const {RangePicker: AntdRangePicker} = DatePicker;

const isSameDay = (date1: Dayjs, date2: Dayjs) => date1.isSame(date2, 'day');
const isDateSameOrAfterToday = (date: Dayjs) => date.isSame(today, 'day') || date.isAfter(today, 'day');


// выбрать предыдущий месяц -  с 1 числа текущего месяца
const getCurrentMonthStart = () =>
    today.clone().startOf('month')

// выбрать предыдущие полгода
const getCurrentHalfOfYearStart = () =>
    today.clone().subtract(6, 'month').set('hour', 0).set('minute', 0).set('second', 0)

// выбрать предыдущий год
const getCurrentYearStart = () =>
    today.clone().subtract(1, 'year').set('hour', 0).set('second', 0)

const startOfCurrentMonth = getCurrentMonthStart();
const startOfCurrentHalfOfYear = getCurrentHalfOfYearStart();
const startOfCurrentYear = getCurrentYearStart();
console.log(`%c Start of month: [${startOfCurrentMonth.format('DD.MM.YYYY HH:mm:ss')}],
%c start of half year: [${startOfCurrentHalfOfYear.format('DD.MM.YYYY HH:mm:ss')}],
%c start of year: [${startOfCurrentYear.format('DD.MM.YYYY HH:mm:ss')}],
`, 'color: red', 'color: blue', 'color: magenta');

const getSelectedQuickPeriod = (dates: Dayjs[]) => {
    let period = null;
    if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
        const [dateFrom, dateTo] = dates;
        const isEndByToday = isDateSameOrAfterToday(dateTo);
        if (isEndByToday && isSameDay(dateFrom, startOfCurrentMonth)) {
            period = QUICK_PERIODS.MONTH;
        } else if (isEndByToday && isSameDay(dateFrom, startOfCurrentHalfOfYear)) {
            period = QUICK_PERIODS.HALF_YEAR;
        } else if (isEndByToday && isSameDay(dateFrom, startOfCurrentYear)) {
            period = QUICK_PERIODS.YEAR;
        }
    }

    return period;
};

export const RangePickerWithQuickButtons = ({value, onChange, datesRange}: {
    value: Dayjs[],
    datesRange: any,
    onChange: (newValue: Dayjs[]) => void
}) => {
    const selectedPeriod = useMemo(() => getSelectedQuickPeriod(value), [datesRange.dateStart, datesRange.dateEnd]);

    const selectPeriod = useCallback(({target: {value: newPeriod}}: RadioChangeEvent) => {
        let dates = null;
        if (newPeriod === QUICK_PERIODS.MONTH) {
            dates = [startOfCurrentMonth, today];
        } else if (newPeriod === QUICK_PERIODS.HALF_YEAR) {
            dates = [startOfCurrentHalfOfYear, today];
        } else if (newPeriod === QUICK_PERIODS.YEAR) {
            dates = [startOfCurrentYear, today];
        }

        if (dates) {
            onChange(dates);
        }
    }, []);


    return (
        <div className='range-picker-with-quick-buttons'>
            <DatePicker.RangePicker
                style={{width: 300}}
                /*@ts-ignore*/
                value={value}
                format='DD.MM.YYYY'
                onCalendarChange={(newDates) => {
                    /*@ts-ignore*/
                    onChange(newDates || []);
                }}/>
            <Radio.Group value={selectedPeriod} onChange={selectPeriod}>
                <Radio.Button value={QUICK_PERIODS.MONTH}>месяц</Radio.Button>
                <Radio.Button value={QUICK_PERIODS.HALF_YEAR}>полгода</Radio.Button>
                <Radio.Button value={QUICK_PERIODS.YEAR}>год</Radio.Button>
            </Radio.Group>
        </div>

    )
}
