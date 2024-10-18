// выбрать предыдущий месяц -  с 1 числа текущего месяца
import dayjs, { Dayjs } from 'dayjs';

export const today = dayjs();

const getCurrentMonthStart = () => today.clone().startOf('month');

// выбрать предыдущие полгода
const getCurrentHalfOfYearStart = () => today.clone().subtract(6, 'month').set('hour', 0).set('minute', 0)
  .set('second', 0);

// выбрать предыдущий год
const getCurrentYearStart = () => today.clone().subtract(1, 'year').set('hour', 0).set('second', 0);

export const isSameDay = (date1: Dayjs, date2: Dayjs) => date1.isSame(date2, 'day');
export const isDateSameOrAfterToday = (date: Dayjs) => date.isSame(today, 'day') || date.isAfter(today, 'day');

export const startOfCurrentMonth = getCurrentMonthStart();
export const startOfCurrentHalfOfYear = getCurrentHalfOfYearStart();
export const startOfCurrentYear = getCurrentYearStart();
