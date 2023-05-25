import { ColumnsType } from 'antd/es/table';
import { EnumRoomVOType, OwnerVO, RoomVO } from 'backend/services/backend';
import { Button } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { FlatIcon } from 'icons/flat';
import { CarIcon } from 'icons/car';

const DISPLAY_OWNER_COUNT = 1;

const showPeopleModal = () => {
};

const accountNumberRenderer = (account: string = '') => {
	const groups = [account.slice(0, 6), account.slice(6)];
	return groups?.join(' ') || '';
}

const peopleRenderer = (people: OwnerVO[] = []) => {
	if (!people.length) {
		return '';
	}

	const displayPeople = people.slice(0, DISPLAY_OWNER_COUNT);
	const otherCount = Math.max(people.length - DISPLAY_OWNER_COUNT, 0);
	let displayString = displayPeople.map(({ fullName }) => fullName).join(';');

	if (otherCount) {
		displayString += `, eщё ${otherCount}`
	}

	return <Button
		type='link'
		onClick={showPeopleModal}
	>{displayString}</Button>
}

export const roomColumns: ColumnsType<RoomVO> = [
	{
		dataIndex: 'type',
		title: '',
		render: (type: EnumRoomVOType) => (
			<div className={type}>
				{type === EnumRoomVOType.FLAT && <FlatIcon />}
				{type === EnumRoomVOType.GARAGE && <CarIcon />}
				{type === EnumRoomVOType.OFFICE && <ShopOutlined />}
			</div>
		)
	},
	{
		dataIndex: 'account',
		title: 'Лицевой счёт',
		render: accountNumberRenderer
	},
	{
		dataIndex: 'number',
		title: '№ квартиры',
	},
	{
		dataIndex: 'ownerName',
		title: 'Собственник',
		render: (ownerName: string) => {
			const owners = ownerName.split(', ');
			return <>
				{owners.map(name => <>
					{name}
					<br />
				</>)}
			</>
		}
	},
	{
		dataIndex: 'square',
		title: 'Площадь (кв. м)',
		render: (square: number, { percentage }: RoomVO) => `${square} (${percentage}%)`
	},
	{
		dataIndex: 'street',
		title: 'Дом',
		render: (street: string, { building }: RoomVO) => `${street} ${building}`
	}

].map(column => ({
	...column,
	className: column.dataIndex
}));
