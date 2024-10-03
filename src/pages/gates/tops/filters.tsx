import { FilterFieldType } from 'components/table/filter-form/types';

export const gateTopFilters = [
  {
    name: 'gateId',
    allowClear: false,
    required: true,
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
  }
];
