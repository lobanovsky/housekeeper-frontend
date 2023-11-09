import {FilterFieldType} from 'components/table/filter-form/types';


export const fileFilters = [
	{
		name: 'fileType',
		type: 'remote-select' as FilterFieldType,
		idFieldName: 'name',
		displayFieldName: 'description',
		optionsURL: '/files/types',
		title: 'Тип файла',
		span: {md: 6, lg: 4, xl: 6, xxl: 4},
	},
	{
		name: 'name',
		title: 'Имя файла',
		span: {md: 6, lg: 4, xl: 6, xxl: 4},
	}

];

