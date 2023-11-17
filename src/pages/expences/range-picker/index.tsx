import {Button, DatePicker} from "antd"
import dayjs, {Dayjs} from "dayjs";
import React, {useCallback, useMemo, useState} from "react";
import {QUICK_PERIODS} from "./constants";
import './style.scss';
import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import {convertDateRange, MonthNames, ShortMonthNames} from "../../../utils/utils";
import {SERVER_DATE_FORMAT} from "../../../utils/constants";

export interface SelectedDatesShort {
    dateStart: string,
    dateEnd: string,
    dateFromMoment: Dayjs | null,
    dateToMoment: Dayjs | null,
}

export interface SelectedDateRange extends SelectedDatesShort {
    selectedMonth: number,
    selectedMonthName: string,
    selectedPeriod?: QUICK_PERIODS | null,
    selectedYear: number,
    selectedYearName: string,
}

const today = dayjs();
const startOfMonth = dayjs().startOf('month');
const currentMonth = today.get('month');
const currentYear = today.get('year');
//
//
// const getSelectedQuickPeriod = (dates: Dayjs[]) => {
//     let period = null;
//     if (Array.isArray(dates) && dates.length === 2 && dates[0] && dates[1]) {
//         const [dateFrom, dateTo] = dates;
//         const isEndByToday = isDateSameOrAfterToday(dateTo);
//         if (isEndByToday && isSameDay(dateFrom, startOfCurrentMonth)) {
//             period = QUICK_PERIODS.MONTH;
//         } else if (isEndByToday && isSameDay(dateFrom, startOfCurrentHalfOfYear)) {
//             period = QUICK_PERIODS.HALF_YEAR;
//         } else if (isEndByToday && isSameDay(dateFrom, startOfCurrentYear)) {
//             period = QUICK_PERIODS.YEAR;
//         }
//     }
//
//     return period;
// };

export const RangePickerWithQuickButtons = ({onChange: onChangeDates, downloadReport}: {
    onChange: (newValue: SelectedDatesShort) => void,
    downloadReport: () => void
}) => {
    const [dates, setDates] = useState<Dayjs[]>([startOfMonth, today]);

    const datesRange = useMemo<SelectedDateRange>(() => {
        const strings = convertDateRange(dates);
        const dateFromMoment = dates.length > 0 && dates[0] ? dates[0] : null;
        const dateToMoment = dates.length > 1 && dates[1] ? dates[1] : null;

        let selectedMonth = -1;
        let selectedMonthName = ' - ';
        let selectedYear = -1;
        let selectedYearName = ' - '

        if (dateFromMoment && dateToMoment) {
            const [fromMonth, toMonth] = [dateFromMoment.get('month'), dateToMoment.get('month')]
            selectedMonthName = fromMonth === toMonth ? MonthNames[fromMonth] : `${ShortMonthNames[fromMonth]} - ${ShortMonthNames[toMonth]}`
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
            dateToMoment,
        })
    }, [dates.map(date => date ? date.format(SERVER_DATE_FORMAT) : '').join(',')]);

    const onChange = useCallback((newDates: Dayjs[]) => {
        setDates(newDates);
        onChangeDates(convertDateRange(newDates));
    }, [onChangeDates]);

    // const selectPeriod = useCallback(({target: {value: newPeriod}}: RadioChangeEvent) => {
    //     let newDates = null;
    //     if (newPeriod === QUICK_PERIODS.MONTH) {
    //         newDates = [startOfCurrentMonth, today];
    //     } else if (newPeriod === QUICK_PERIODS.HALF_YEAR) {
    //         newDates = [startOfCurrentHalfOfYear, today];
    //     } else if (newPeriod === QUICK_PERIODS.YEAR) {
    //         newDates = [startOfCurrentYear, today];
    //     }
    //
    //     if (newDates) {
    //         onChange(newDates);
    //     }
    // }, []);

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
            <Button className='report-btn'
                    disabled={!datesRange.dateStart || !datesRange.dateEnd} onClick={downloadReport}
                    style={{marginLeft: 20}}>
                <DownloadOutlined/>Скачать отчёт
            </Button>
            {/*<Radio.Group value={datesRange.selectedPeriod} onChange={selectPeriod}>*/}
            {/*    <Radio.Button value={QUICK_PERIODS.MONTH}>месяц</Radio.Button>*/}
            {/*    <Radio.Button value={QUICK_PERIODS.HALF_YEAR}>полгода</Radio.Button>*/}
            {/*    <Radio.Button value={QUICK_PERIODS.YEAR}>год</Radio.Button>*/}
            {/*</Radio.Group>*/}
            <div className='month-changer'>
                <Button onClick={() => {
                    if (datesRange.dateFromMoment) {
                        const prevMonth = datesRange.dateFromMoment.subtract(1, 'month');
                        onChange([prevMonth.startOf('month'), prevMonth.endOf('month')]);
                    }
                }}>
                    <LeftOutlined/>
                </Button>
                <div className='unit-name'>{datesRange.selectedMonthName}</div>
                <Button
                    disabled={datesRange.selectedMonth >= currentMonth && datesRange.selectedYear === currentYear}
                    onClick={() => {
                        if (datesRange.dateToMoment) {
                            const nextMonth = datesRange.dateToMoment.add(1, 'month');
                            onChange([nextMonth.startOf('month'), nextMonth.endOf('month')]);
                        }
                    }}>
                    <RightOutlined/>
                </Button>
            </div>
            <div className='year-changer'>
                <Button
                    onClick={() => {
                        if (datesRange.dateFromMoment) {
                            const prevYear = datesRange.dateFromMoment.subtract(1, 'year');
                            onChange([prevYear.startOf('year'), prevYear.endOf('year')]);
                        }
                    }}>
                    <DoubleLeftOutlined/>
                </Button>
                <div className='unit-name'>{datesRange.selectedYearName}</div>
                <Button
                    disabled={datesRange.selectedYear >= currentYear}
                    onClick={() => {
                        if (datesRange.dateToMoment) {
                            const nextYear = datesRange.dateToMoment.add(1, 'year');
                            onChange([nextYear.startOf('year'), nextYear.endOf('year')]);
                        }
                    }}>
                    <DoubleRightOutlined/>
                </Button>
            </div>
        </div>

    )
}
