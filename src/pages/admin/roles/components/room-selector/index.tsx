import { Tabs } from "antd";
import { Building, EnumBuildingType } from "backend/services/backend";
import { HomeOutlined } from "@ant-design/icons";
import { ParkingIcon } from "../../../../../icons/parking";
import { BuildingPlan } from "../../../../buildings/building-scheme/plan";
import { SelectedRoomsMap } from "../../types";
import "./style.scss";

// roomID в данном случае - это строка вида {buildingId}-{roomId}
export const RoomSelector = ({ buildings, selectedRooms, onSelectRoom }: {
  buildings: Building[],
  selectedRooms: SelectedRoomsMap,
  onSelectRoom: (roomId: number, buildingId: number) => void
}) => {

  return <Tabs type="card" className="room-selector" items={buildings.map((building) => {
    return ({
      key: String(building.id),
      label: <div>
        {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined />}
        {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon />}
        {building.name}
      </div>,
      children: <BuildingPlan
        building={building}
        selectedRoomIds={selectedRooms[String(building.id)] || []}
        onSelectRoom={(room) => {
          onSelectRoom(room.id || 0, building.id || 0);
        }}
      />
    });
  })} />;
};
