import { ColumnsType } from 'antd/es/table';
import { EnumRoomVOType, OwnerVO, RoomVO } from 'backend/services/backend';
import { Button } from 'antd';
import { CarOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons';

const DISPLAY_OWNER_COUNT = 1;

const showPeopleModal = () => {
};

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
		render: (type: EnumRoomVOType) => {
			if (type === EnumRoomVOType.FLAT) {
				return <HomeOutlined />
			}

			if (type === EnumRoomVOType.GARAGE) {
				return <CarOutlined />
			}

			if (type === EnumRoomVOType.OFFICE) {
				return <ShopOutlined />
			}

			return ''
		}
	},
	{
		dataIndex: 'street',
		title: 'Дом',
		render: (street: string, { building }: RoomVO) => `${street} ${building}`
	},
	{
		dataIndex: 'number',
		title: '№ квартиры',
	},
	{
		dataIndex: 'square',
		title: 'Площадь',
		render: (square: number, { percentage }: RoomVO) => `${square} (${percentage})%`
	},
	{
		dataIndex: 'owners',
		title: 'Собственник',
		render: (owners: OwnerVO[]) => peopleRenderer(owners)
	}
].map(column => ({
	...column,
	className: column.dataIndex
}));
