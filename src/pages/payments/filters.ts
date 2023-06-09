import React from 'react';
import { FilterFieldType } from 'components/table/filter-form/types';
import { dateTimeRenderer, summRenderer } from 'utils/utils';


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
		name: 'toName',
		title: 'Имя получателя',
		outgoing: true
	},
	{
		name: 'fromName',
		title: 'Имя отправителя',
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

