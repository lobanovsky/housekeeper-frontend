import React from 'react';
import { FilterFieldType } from 'components/table/filter-form/types';

export const getRoomFilters = ({ flatTypeOptions }: { flatTypeOptions: React.ReactNode[] }) => [
  {
    name: 'street',
    title: 'Улица',
    span: {
      md: 6, lg: 4, xl: 6, xxl: 4
    }
  },
  {
    name: 'building',
    title: 'Номер дома',
    span: {
      md: 6, lg: 4, xl: 3, xxl: 2
    }
  },
  {
    name: 'type',
    title: 'Тип помещения',
    type: 'select' as FilterFieldType,
    options: flatTypeOptions,
    span: {
      md: 6, lg: 4, xl: 5, xxl: 4
    }
  },
  {
    name: 'number',
    title: 'Номер помещения',
    span: {
      md: 6, lg: 4, xl: 3, xxl: 2
    }
  },
  {
    name: 'ownerName',
    title: 'Собственник',
    placeholder: 'ФИО собственника',
    span: {
      md: 6, lg: 4, xl: 5, xxl: 3
    }
  },
  {
    name: 'account',
    title: 'Номер счёта',
    span: {
      md: 6, lg: 4, xl: 6, xxl: 4
    }
  }

];
