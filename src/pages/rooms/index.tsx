import { RoomService } from 'backend/services/backend';
import Table from 'components/table';
import { roomColumns } from './columns';
import { getRoomFilters } from './filters';
import './styles.scss';
import { useEffect, useMemo, useState } from 'react';
import { DictionaryItem } from 'utils/types';
import { Select } from 'antd';
import { showError } from 'utils/notifications';

const Rooms = () => {
	const [roomTypes, setRoomTypes] = useState<DictionaryItem[]>([]);
	const tableFilters = useMemo(() => getRoomFilters({
		flatTypeOptions: roomTypes.map(({ name, description }) => <Select.Option
			key={name}
			value={name}
		>{description}</Select.Option>)
	}), [roomTypes.length]);

	useEffect(() => {
		RoomService.getRoomTypes()
			.then(data => {
				setRoomTypes(data);
			})
			.catch(e => {
				showError('Не удалось загрузить список типов помещений', e);
			})
	}, []);
	return (
		<div className='rooms'>
			<Table
				columns={roomColumns}
				loadDataFn={RoomService.makeRoomsReport}
				filters={tableFilters}
			/>
		</div>
	)
}

export default Rooms;
