import { FilterFieldType } from 'components/table/filter-form/types';


export const gateLogFilters = [
	{
		name: 'gateId',
		required: true,
		allowClear: false,
		type: 'remote-select' as FilterFieldType,
		idFieldName: 'id',
		displayFieldName: 'name',
		optionsURL: '/gates',
		title: 'Шлагбаум'
	},
	{
		name: 'startDate',
		title: 'Дата с',
		type: 'date' as FilterFieldType
	},
	{
		name: 'endDate',
		title: 'Дата по',
		type: 'date' as FilterFieldType
	},
	{
		name: 'flatNumber',
		title: 'Квартира',
		placeholder: '№ квартиры'
	},
	{
		name: 'phoneNumber',
		title: 'Телефон',
		placeholder: 'Номер телефона'
	},
	{
		name: 'status',
		type: 'remote-select' as FilterFieldType,
		idFieldName: 'name',
		displayFieldName: 'description',
		optionsURL: '/log-entries/statuses',
		title: 'Статус'
	},
	{
		name: 'method',
		idFieldName: 'name',
		displayFieldName: 'description',
		type: 'remote-select' as FilterFieldType,
		optionsURL: '/log-entries/access-methods',
		title: 'Способ открытия'
	}
];


