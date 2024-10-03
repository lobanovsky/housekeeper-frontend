import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { RoomService } from 'backend/services/backend';
import Table from 'components/table';
import { showError } from 'utils/notifications';
import { DictionaryItem } from 'utils/types';
import { roomColumns } from './columns';
import { getRoomFilters } from './filters';
import './styles.scss';

function Rooms() {
  const [roomTypes, setRoomTypes] = useState<DictionaryItem[]>([]);
  const tableFilters = useMemo(() => getRoomFilters({
    flatTypeOptions: roomTypes.map(({ id, description }) => (
      <Select.Option
        key={id}
        value={id}
      >
        {description}
      </Select.Option>
    ))
  }), [roomTypes.length]);

  useEffect(() => {
    RoomService.getRoomTypes()
      .then((data) => {
        setRoomTypes(data);
      })
      .catch((e) => {
        showError('Не удалось загрузить список типов помещений', e);
      });
  }, []);
  return (
    <div className="rooms">
      <Table
        columns={roomColumns}
        loadDataFn={RoomService.makeRoomsReport}
        filters={tableFilters}
      />
    </div>
  );
}

export default Rooms;
