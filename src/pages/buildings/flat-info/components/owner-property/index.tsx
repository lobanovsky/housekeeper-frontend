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
      <span style={{ fontWeight: 500 }}>Собственник:</span> <span className="owner-name">{fullName}</span>
      <div className="owner-property">
        {ownerRooms.map(({ type, number }: RoomVO, index) => <div className={`property-item ${type}`}>
          {type === EnumRoomVOType.GARAGE && "Мм. "}
          {type === EnumRoomVOType.FLAT && "Кв. "}
          {type === EnumRoomVOType.OFFICE && "Оф. "}
          {number}
        </div>)}
      </div>
    </div>
  );
};
