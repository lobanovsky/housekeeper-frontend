import { AxiosError, AxiosResponse } from 'axios';
import { Dayjs } from 'dayjs';
import { QuickPeriods } from '../pages/expences/components/filter-rofm/range-picker/constants';
import { AccessResponse, AvailableWorkspaceResponse, CarRequest, EnumUserRequestRole, UserResponse } from '../backend/services/backend';

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
export type ChangeHandler<T> = (value: T) => void;

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

export interface AccessValues extends Omit<AccessResponse, 'cars'> {
  cars: CarValues[],
  areaIds: number[],
  areaPlaces?: Record<number, string>,
  isValid?: boolean;
}

export type PermissionsConfig = string[] | { OR: string[] };

export type RoleResponse = string;

export interface AuthData {
  access_token: string;
  token_type?: string;
  expires_in?: number,
  userId: number,
}

export interface ICredentials {
  login: string;
  password: string;
}

export interface IUserData extends AuthData, UserResponse {
  userName?: string;
  workspaceColor: string,
  workspaceId: number;
  workspaceName: string;
  workspaces: AvailableWorkspaceResponse[],
  isAdmin: boolean;
  isSuperAdmin: boolean;
  roles: EnumUserRequestRole[];
}

export type ModalFormProps<T> = T & {
  onClose: () => void
};
