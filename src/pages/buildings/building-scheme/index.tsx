import { useCallback, useEffect, useMemo } from "react";
import { Skeleton } from "antd";
import { AreaVO, Building, BuildingService, RoomVO } from "backend/services/backend";
import "./styles.scss";
import { BuildingPlan } from "./plan";
import useRemoteData from "../../../hooks/use-remote-data";
import { Outlet, useNavigate, useParams } from "react-router";


export const BuildingScheme = ({ areas }: { areas: AreaVO[] }) => {
  let { buildingId: buildingIdStr = "", roomId: roomIdStr = "" } = useParams();
  const navigate = useNavigate();
  const buildingLoader = useCallback(() => {
    console.log(`%c Load building [${buildingIdStr}]`, "color: red");
    return BuildingService.findById({ id: parseInt(buildingIdStr, 10) });
  }, [buildingIdStr]);

  const [building, isLoadingBuilding, loadBuilding] = useRemoteData<Building, Building>(buildingLoader);

  const selectedRoomIds = useMemo(() => {
    const roomId = parseInt(roomIdStr, 10);
    return roomId ? [roomId] : [];
  }, [roomIdStr]);

  useEffect(() => {
    loadBuilding();
  }, [buildingIdStr]);

  const onRoomClick = useCallback((room: RoomVO) => {
    navigate(`/buildings/${building?.id}/rooms/${room.id}`);
  }, [building?.id]);

  // @ts-ignore
  return (
    <div className={`building-plan ${building?.type} ${isLoadingBuilding ? "loading" : ""}`}>
      {isLoadingBuilding && <Skeleton active />}
      {!isLoadingBuilding && !!building?.id && <div className="plan-container">
        <BuildingPlan
          /* @ts-ignore */
          building={building}
          onSelectRoom={onRoomClick}
          selectedRoomIds={selectedRoomIds}
        />
        <Outlet />
        {/*{selectedFlat?.id && <div className="flat-info"><FlatInfo areas={areas} flat={selectedFlat} /></div>}*/}
      </div>}
    </div>
  );
};
