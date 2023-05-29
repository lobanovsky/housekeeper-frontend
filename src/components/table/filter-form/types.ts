import React from 'react';

export type FilterFieldType = 'input' | 'date-range' | 'date' | 'select' | 'remote-select';

export interface IFilterFieldConfig {
	name: string;
	getChangeAdditionalParams?: (selectedOption: any) => any;
	idFieldName?: string,
	displayFieldName?: string;
	options?: React.ReactNode[],
	optionsURL?: string;
	placeholder?: string,
	title: string;
	required?: boolean;
	mode?: string;
	type?: FilterFieldType
}
export type FilterFieldsConfig = IFilterFieldConfig[];
