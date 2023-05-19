import React from 'react';
import { FilterFieldType } from 'components/table/filter-form/types';
import { dateTimeRenderer, summRenderer } from 'utils/utils';

export const outgoingPaymentFilters  = [
	{
		name: 'toInn',
		title: 'ИНН получателя'
	},
	{
		name: 'purpose',
		title: 'Назначение платежа'
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
]


const paymentFilters = [
	{
		name: 'toInn',
		title: 'ИНН получателя',
		outgoing: true
	},
	{
		name: 'fromInn',
		title: 'ИНН отправителя',
		outgoing: false
	},
	{
		name: 'purpose',
		title: 'Назначение платежа'
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
];

export const getPaymentFilters = (isOutgoing: boolean = false) => paymentFilters.filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);

