import React from 'react';
import { FilterFieldType, IFilterFieldConfig } from 'components/table/filter-form/types';

interface PaymentDictionaries {
  accountOptions?: React.ReactNode[],
  paymentTypeOptions?: React.ReactNode[]
}

const paymentFilters = ({ accountOptions = [], paymentTypeOptions }: PaymentDictionaries): Array<IFilterFieldConfig & {
  outgoing?: boolean
}> => [
  {
    name: 'toInn',
    title: 'ИНН получателя',
    outgoing: true,
    span: {
      md: 6, lg: 4, xl: 4, xxl: 3
    }
  },
  {
    name: 'fromInn',
    title: 'ИНН отправителя',
    outgoing: false,
    span: {
      md: 6, lg: 4, xl: 4, xxl: 3
    }
  },
  {
    name: 'toName',
    title: 'Имя получателя',
    outgoing: true,
    span: {
      md: 8, lg: 6, xl: 6, xxl: 4
    }
  },
  {
    name: 'fromName',
    title: 'Имя отправителя',
    outgoing: false,
    span: {
      md: 8, lg: 6, xl: 6, xxl: 4
    }
  },
  {
    name: 'purpose',
    title: 'Назначение платежа',
    span: {
      md: 12, lg: 12, xl: 8, xxl: 7
    }
  },
  {
    name: 'startDate',
    title: 'Дата с',
    type: 'date' as FilterFieldType,
    span: {
      md: 6, lg: 4, xl: 3, xxl: 2
    }
  },
  {
    name: 'endDate',
    title: 'Дата по',
    type: 'date' as FilterFieldType,
    span: {
      md: 6, lg: 4, xl: 3, xxl: 2
    }
  },

  {
    name: 'type',
    title: 'Тип платежа',
    type: 'select' as FilterFieldType,
    options: paymentTypeOptions,
    outgoing: false,
    span: {
      md: 12, lg: 12, xl: 5, xxl: 5
    }
  },
  {
    name: 'sum',
    title: 'Сумма',
    outgoing: false,
    span: {
      md: 6, lg: 4, xl: 3, xxl: 3
    }
  },
  {
    name: 'toAccounts',
    title: 'Счёт поступления',
    type: 'select' as FilterFieldType,
    mode: 'multiple',
    maxTagCount: 3,
    options: accountOptions,
    outgoing: false,
    span: {
      md: 12, lg: 12, xl: 10, xxl: 7
    }
  }
];

// eslint-disable-next-line max-len
export const getPaymentFilters = ({ isOutgoingPayments = false, options = {} }: {
  isOutgoingPayments?: boolean,
  options?: PaymentDictionaries
}): IFilterFieldConfig[] => paymentFilters(options)
  .filter(({ outgoing }) => (typeof outgoing !== 'boolean' || outgoing === isOutgoingPayments))
  .map(
    ({
       outgoing,
       ...fieldProps
     }) => fieldProps
  );
