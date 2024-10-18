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
    title: 'Шлагбаум',
    span: {
      md: 6, lg: 4, xl: 3, xxl: 3
    }
  },
  {
    name: 'startDate',
    title: 'Дата с',
    type: 'date' as FilterFieldType,
    span: {
      md: 6,
      lg: 4,
      xl: 2,
      xxl: 2
    }
  },
  {
    name: 'endDate',
    title: 'Дата по',
    type: 'date' as FilterFieldType,
    span: {
      md: 6,
      lg: 4,
      xl: 2,
      xxl: 2
    }
  },
  {
    name: 'flatNumber',
    title: 'Квартира',
    placeholder: '№ квартиры',
    span: {
      md: 6, lg: 4, xl: 2, xxl: 2
    }
  },
  {
    name: 'phoneNumber',
    title: 'Телефон',
    placeholder: 'Номер телефона',
    span: {
      md: 6, lg: 4, xl: 3, xxl: 3
    }
  },
  {
    name: 'status',
    type: 'remote-select' as FilterFieldType,
    idFieldName: 'name',
    displayFieldName: 'description',
    optionsURL: '/log-entries/statuses',
    title: 'Статус',
    span: {
      md: 6, lg: 4, xl: 4, xxl: 3
    }
  },
  {
    name: 'method',
    idFieldName: 'name',
    displayFieldName: 'description',
    type: 'remote-select' as FilterFieldType,
    optionsURL: '/log-entries/access-methods',
    title: 'Способ открытия',
    span: {
      md: 6, lg: 4, xl: 3, xxl: 3
    }
  }
];
