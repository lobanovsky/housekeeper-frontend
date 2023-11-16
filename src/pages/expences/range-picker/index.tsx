import {Button, DatePicker, Radio} from "antd"
import dayjs, {Dayjs} from "dayjs";
import React, {useCallback, useMemo, useState} from "react";
import {RadioChangeEvent} from "antd/es/radio/interface";
import {QUICK_PERIODS} from "./constants";
import {
    isDateSameOrAfterToday,
    isSameDay,
    startOfCurrentHalfOfYear,
    startOfCurrentMonth,
    startOfCurrentYear
} from "./utils";
import './style.scss';
import {DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {convertDateRange, MonthNames} from "../../../utils/utils";
import {SERVER_DATE_FORMAT} from "../../../utils/constants";

export interface SelectedDatesShort {
    dateStart: string,
    dateEnd: string,
    dateFromMoment: Dayjs | null,
    dateToMoment: Dayjs | null,
}

export interface SelectedDateRange extends SelectedDatesShort {
    selectedMonth: number,
    selectedPeriod: QUICK_PERIODS | null,
    selectedYear: number
}

const today = dayjs();
const startOfMonth = dayjs().startOf('month');
const currentMonth = today.get('month');
const currentYear = today.get('year');


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

export const RangePickerWithQuickButtons = ({onChange: onChangeDates}: {
    onChange: (newValue: SelectedDatesShort) => void
}) => {
    const [dates, setDates] = useState<Dayjs[]>([startOfMonth, today]);

    const datesRange = useMemo<SelectedDateRange>(() => {
            const strings = convertDateRange(dates);
            const selectedPeriod = getSelectedQuickPeriod(dates);
            let selectedMonth = -1;
            if (dates.length > 1 && dates[0] && dates[1]) {
                const fromMonth = dates[0].get('month');
                const toMonth = dates[1].get('month');
                if (fromMonth === toMonth) {
                    selectedMonth = fromMonth;
                }
            }

            let selectedYear = -1;
            if (dates.length > 1 && dates[0] && dates[1]) {
                const fromYear = dates[0].get('year');
                const toYear = dates[1].get('year');
                if (fromYear === toYear) {
                    selectedYear = fromYear;
                }
            }
            return ({
                ...strings,
                selectedMonth,
                selectedYear,
                selectedPeriod,
                dateFromMoment: dates.length > 0 && dates[0] ? dates[0] : null,
                dateToMoment: dates.length > 1 && dates[1] ? dates[1] : null,
            })
        },
        [dates.map(date => date ? date.format(SERVER_DATE_FORMAT) : '').join(',')]);

    const onChange = useCallback((newDates: Dayjs[]) => {
        setDates(newDates);
        onChangeDates(convertDateRange(newDates));
    }, [onChangeDates]);

    const selectPeriod = useCallback(({target: {value: newPeriod}}: RadioChangeEvent) => {
        let newDates = null;
        if (newPeriod === QUICK_PERIODS.MONTH) {
            newDates = [startOfCurrentMonth, today];
        } else if (newPeriod === QUICK_PERIODS.HALF_YEAR) {
            newDates = [startOfCurrentHalfOfYear, today];
        } else if (newPeriod === QUICK_PERIODS.YEAR) {
            newDates = [startOfCurrentYear, today];
        }

        if (newDates) {
            onChange(newDates);
        }
    }, []);

    return (
        <div className='range-picker-with-quick-buttons'>
            <DatePicker.RangePicker
                style={{width: 300}}
                /*@ts-ignore*/
                value={dates}
                format='DD.MM.YYYY'
                onCalendarChange={(newDates) => {
                    // @ts-ignore
                    setDates(newDates || []);
                    onChangeDates(convertDateRange(newDates || []));
                }}/>
            <Radio.Group value={datesRange.selectedPeriod} onChange={selectPeriod}>
                <Radio.Button value={QUICK_PERIODS.MONTH}>месяц</Radio.Button>
                <Radio.Button value={QUICK_PERIODS.HALF_YEAR}>полгода</Radio.Button>
                <Radio.Button value={QUICK_PERIODS.YEAR}>год</Radio.Button>
            </Radio.Group>
            <div className='month-changer'>
                <Button onClick={() => {
                    if (datesRange.dateFromMoment) {
                        const prevMonth = datesRange.dateFromMoment.clone().subtract(1, 'month');
                        const prevMonthStart = prevMonth.startOf('month');
                        const prevMonthEnd = prevMonth.endOf('month');
                        console.log(`Month prev:  [${prevMonthStart.format('DD.MM.YYYY')} - ${prevMonthEnd.format('DD.MM.YYYY')}]`)
                        onChange([prevMonthStart, prevMonthEnd]);
                    }
                }}><LeftOutlined/></Button>
                <div
                    className='unit-name'>{datesRange.selectedMonth >= 0 ? MonthNames[datesRange.selectedMonth] : ' - '}</div>

                <Button disabled={datesRange.selectedMonth >= currentMonth && datesRange.selectedYear === currentYear}
                        onClick={() => {
                            if (datesRange.dateToMoment) {
                                const nextMonth = datesRange.dateToMoment.clone().add(1, 'month');
                                const nextMonthStart = nextMonth.startOf('month');
                                const nextMonthEnd = nextMonth.endOf('month');
                                console.log(`Month next:  [${nextMonthStart.format('DD.MM.YYYY')} - ${nextMonthEnd.format('DD.MM.YYYY')}]`)
                                onChange([nextMonthStart, nextMonthEnd]);
                            }
                        }}><RightOutlined/></Button>
            </div>
            <div className='year-changer'>
                <Button onClick={() => {
                    if (datesRange.dateFromMoment) {
                        const prevYear = datesRange.dateFromMoment.clone().subtract(1, 'year');
                        const prevYearStart = prevYear.startOf('year');
                        const prevYearEnd = prevYear.endOf('year');
                        console.log(`Year prev:  [${prevYearStart.format('DD.MM.YYYY')} - ${prevYearEnd.format('DD.MM.YYYY')}]`)
                        onChange([prevYearStart, prevYearEnd]);
                    }
                }}><DoubleLeftOutlined/></Button>
                <div className='unit-name'>{datesRange.selectedYear >= 0 ? datesRange.selectedYear : ' - '}</div>
                <Button disabled={datesRange.selectedYear >= currentYear}
                        onClick={() => {
                            if (datesRange.dateToMoment) {
                                const nextYear = datesRange.dateToMoment.clone().add(1, 'year');
                                const nextYearStart = nextYear.startOf('year');
                                const nextYearEnd = nextYear.endOf('year');
                                console.log(`Year next:  [${nextYearStart.format('DD.MM.YYYY')} - ${nextYearEnd.format('DD.MM.YYYY')}]`)
                                onChange([nextYearStart, nextYearEnd]);
                            }
                        }}><DoubleRightOutlined/></Button>
            </div>
        </div>

    )
}
