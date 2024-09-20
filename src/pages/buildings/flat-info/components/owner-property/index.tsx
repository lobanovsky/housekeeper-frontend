import { EnumRoomVOType, OwnerVO, RoomVO } from "backend/services/backend";
import "./styles.scss";

export const EmptyOwner: OwnerVO = {
  fullName: "",
  ownerRooms: [],
  active: false,
  dateOfLeft: ""
};

export const FlatOwnerInfo = ({ owner: { fullName = "", ownerRooms = [] } = EmptyOwner }: {
  owner: OwnerVO | undefined
}) => {
  return (
    <div className="flat-owner-info">
      <div className="owner-name">{fullName}</div>
      <div className="owner-property">
        {ownerRooms.map(({ type, number }: RoomVO, index) => <span className={`property-item ${type}`}>
          {type === EnumRoomVOType.GARAGE && "мм "}
          {type === EnumRoomVOType.FLAT && "кв "}
          {type === EnumRoomVOType.OFFICE && "оф "}
          {number}
          {index < ownerRooms.length - 1 && ", "}
        </span>)}
      </div>
    </div>
  );
};
