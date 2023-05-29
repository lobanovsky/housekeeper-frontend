import React from 'react';
import { FilterFieldType } from 'components/table/filter-form/types';
import { Select } from 'antd';


export const gateTopFilters = [
	{
		name: 'type',
		title: 'Тип рейтинга',
		allowClear: false,
		type: 'select' as FilterFieldType,
		options: [
			<Select.Option
				key='flat'
				value='flat'
			>По квартире</Select.Option>,
			<Select.Option
				key='user'
				value='user'
			>По пользователю</Select.Option>
		]
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
	}
];


