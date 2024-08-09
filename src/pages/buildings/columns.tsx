import {ColumnsType} from 'antd/es/table';
import {RoomVO} from 'backend/services/backend';

export const buildingColumns: ColumnsType<RoomVO> = [
    {
        dataIndex: 'name',
        title: 'Наименование здания',
    },
    {
        dataIndex: 'type',
        title: 'Тип'
    },
    {
        dataIndex: 'numberOfApartments',
        title: 'Кол-во квартир',
    }
].map(column => ({
    ...column,
    className: column.dataIndex
}));
