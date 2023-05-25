import React from 'react';
import { FilterFieldType } from 'components/table/filter-form/types';



export const getRoomFilters = ({ flatTypeOptions }: {flatTypeOptions: React.ReactNode[]}) =>  [
	{
		name: 'street',
		title: 'Улица'
	},
	{
		name: 'building',
		title: 'Номер дома'
	},
	{
		name: 'type',
		title: 'Тип помещения',
		type: 'select' as FilterFieldType,
		options: flatTypeOptions
	},
	{
		name: 'number',
		title: 'Номер помещения'
	},
	{
		name: 'ownerName',
		title: 'Собственник',
		placeholder: 'ФИО собственника'
	},
	{
		name: 'account',
		title: 'Номер счёта'
	},

];

