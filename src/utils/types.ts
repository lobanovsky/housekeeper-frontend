import { AxiosError, AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';
import { QuickPeriods } from '../pages/expences/range-picker/constants';
import { CarRequest } from '../backend/services/backend';

export interface SelectedDatesShort {
  dateStart: string,
  dateEnd: string,
  dateFromMoment: Dayjs | null,
  dateToMoment: Dayjs | null,
}

export interface SelectedDateRange extends SelectedDatesShort {
  selectedMonth: number,
  selectedMonthName: string,
  selectedPeriod?: QuickPeriods | null,
  selectedYear: number,
  selectedYearName: string,
}

export type EmptyFunction = () => void;

// @ts-ignore
export interface ServerError extends Error, AxiosError, AxiosResponse {
  error?: string;
}

export interface DictionaryItem {
  id: string | number;
  description: string;
}

export interface CheckboxItem {
  value: string | number;
  label: string;
}

export type LoadParams = Record<string, string | number | boolean>;

export interface IPagination {
  pageNum: number;
  pageSize: number;
}

export type ActionFinishCallback = (isSuccess: boolean) => void;
export type ActionCallbackWithData<T> = (isSuccess: boolean, data?: T | null) => void;

export type ActionCallback = () => void;

export interface CarValues extends CarRequest {
  id: number;
  isNew?: boolean;
}
