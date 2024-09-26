import { EnumRoomVOType, RoomVO } from "backend/services/backend";

export const sortPropertyByFlatType = ({ type: type1, number: number1 = "" }: RoomVO, {
  type: type2,
  number: number2 = ""
}: RoomVO) => {
  if (type1 === type2) {
    return parseInt(number1) - parseInt(number2);
  }

  if (type1 === EnumRoomVOType.FLAT && type2 !== EnumRoomVOType.FLAT) {
    return -1;
  }

  if (type1 !== EnumRoomVOType.FLAT && type2 === EnumRoomVOType.FLAT) {
    return 1;
  }

  return type1 === EnumRoomVOType.GARAGE && type2 === EnumRoomVOType.OFFICE ? -1 : 1;

};
