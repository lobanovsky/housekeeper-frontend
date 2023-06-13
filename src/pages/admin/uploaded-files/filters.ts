import { FilterFieldType } from 'components/table/filter-form/types';


export const fileFilters = [
	{
		name: 'fileType',
		type: 'remote-select' as FilterFieldType,
		idFieldName: 'name',
		displayFieldName: 'description',
		optionsURL: '/files/types',
		title: 'Тип файла'
	},
	{
		name: 'name',
		title: 'Имя файла'
	}

];

