import React from 'react';
import {FilterFieldType, IFilterFieldConfig} from 'components/table/filter-form/types';


const paymentFilters = ({accountOptions = []}: { accountOptions?: React.ReactNode[] }): Array<IFilterFieldConfig & {
    outgoing?: boolean
}> => [
    {
        name: 'toInn',
        title: 'ИНН получателя',
        outgoing: true,
        span: {md: 6, lg: 4, xl: 3, xxl: 2},
    },
    {
        name: 'fromInn',
        title: 'ИНН отправителя',
        outgoing: false,
        span: {md: 6, lg: 4, xl: 3, xxl: 2},
    },
    {
        name: 'toName',
        title: 'Имя получателя',
        outgoing: true,
        span: {md: 8, lg: 6, xl: 5, xxl: 3},
    },
    {
        name: 'fromName',
        title: 'Имя отправителя',
        outgoing: false,
        span: {md: 8, lg: 6, xl: 5, xxl: 3},
    },
    {
        name: 'purpose',
        title: 'Назначение платежа',
        span: {md: 12, lg: 12, xl: 7, xxl: 5},
    },
    {
        name: 'startDate',
        title: 'Дата с',
        type: 'date' as FilterFieldType,
        span: {md: 6, lg: 4, xl: 3, xxl: 2},
    },
    {
        name: 'endDate',
        title: 'Дата по',
        type: 'date' as FilterFieldType,
        span: {md: 6, lg: 4, xl: 3, xxl: 2},
    },
    {
        name: 'toAccounts',
        title: 'Счёт поступления',
        type: 'select' as FilterFieldType,
        mode: 'multiple',
        options: accountOptions,
        outgoing: false,
        span: {md: 12, lg: 12, xl: 8, xxl: 6},
    },
];

export const getPaymentFilters = (isOutgoing: boolean = false, accountOptions: React.ReactNode[] = []): IFilterFieldConfig[] => paymentFilters({accountOptions}).filter(({outgoing}) => typeof outgoing !== 'boolean' || outgoing === isOutgoing);

