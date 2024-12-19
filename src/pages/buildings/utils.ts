import { FloorResponse, RoomVO } from 'backend/services/backend';
import { FloorColors, FloorNumberProps } from './components/building-scheme/colors';
import { MaxRoomsOnFloor } from './constants';
import { FloorsWithNumbers } from './types';

export type RoomsConvertResult = {
  floors: FloorsWithNumbers[];
  fistFlat: RoomVO
};
export const convertBuildingStructure = (floorResp: FloorResponse[], isParking = false): RoomsConvertResult => {
  // для паркинга делим по 10 мест на этаже. тк там слишком длинно
  const floorsWithMaxRooms: FloorsWithNumbers[] = [];
  let allRooms: RoomVO[] = [];
  floorResp.forEach(({
                       floor = 0,
                       rooms = []
                     }, index) => {
    allRooms = allRooms.concat(rooms);
    const roomsArr: RoomVO[][] = [];
    const colorSettings: FloorNumberProps = isParking ? { ...FloorColors[index] } : {
      background: '',
      label: ''
    };

    for (let i = 0; i <= rooms.length; i += MaxRoomsOnFloor) {
      const tenRooms = rooms.slice(i, i + MaxRoomsOnFloor);
      roomsArr.push(tenRooms);
    }

    floorsWithMaxRooms[index] = {
      floor,
      rooms: roomsArr.reverse(),
      ...colorSettings
    };
  });

  allRooms.sort((r1, r2) => {
    const num2 = parseInt(r2.number, 10);
    const num1 = parseInt(r1.number, 10);
    return num1 - num2;
  });

  return {
    floors: floorsWithMaxRooms.reverse(),
    fistFlat: allRooms[0]
  };
};
