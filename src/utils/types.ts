import { AxiosError, AxiosResponse } from 'axios';

export type Modify<T, R> = Omit<T, keyof R> & R;


export type SimpleFieldValue = string | number | boolean | undefined;

// @ts-ignore
export interface ServerError extends Error, AxiosError, AxiosResponse {
	error?: string;
}

export interface ICredentials {
	login: string;
	password: string;
}

export type LoadParams = Record<string, string | number | boolean>;

export interface IPagination {
	pageNum: number;
	pageSize: number;
}

export interface DictionaryItem {
	name: string;
	description: string;
}

export type ActionFinishCallback = (isSuccess: boolean) => void;

export type ActionWithCallback = (callback: ActionFinishCallback) => void;

