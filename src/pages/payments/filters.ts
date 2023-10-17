import React from 'react';
import {FilterFieldType, IFilterFieldConfig} from 'components/table/filter-form/types';


const paymentFilters = ({accountOptions = []}: { accountOptions?: React.ReactNode[] }) => [
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
	{
		name: 'toAccounts',
		title: 'Счёт поступления',
		type: 'select' as FilterFieldType,
		mode: 'multiple',
		options: accountOptions,
		outgoing: false
	},
];

export const getPaymentFilters = (isOutgoing: boolean = false, accountOptions: React.ReactNode[] = []): IFilterFieldConfig[] => paymentFilters({accountOptions}).filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);

