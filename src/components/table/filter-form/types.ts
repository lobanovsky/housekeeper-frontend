import React from 'react';

export type FilterFieldType = 'input' | 'date-range' | 'date' | 'select';

export interface IFilterFieldConfig {
	name: string;
	getChangeAdditionalParams?: (selectedOption: any) => any;
	options?: React.ReactNode[],
	placeholder?: string,
	title: string;
	required?: boolean;
	mode?: string;
	type?: FilterFieldType
}
export type FilterFieldsConfig = IFilterFieldConfig[];
