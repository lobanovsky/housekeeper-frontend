import { useCallback, useEffect } from "react";
import { Card, Typography } from "antd";

import { AccessInfoVO, AccessService, AreaVO, EnumRoomVOType, RoomService, RoomVO } from "backend/services/backend";
import useRemoteData from "hooks/use-remote-data";
import { FlatOwnerInfo } from "./components/owner-property";
import { FlatAccesses } from "./components/accesses";
import { AccessContext } from "./context/AccessContext";
import { sortPropertyByFlatType } from "./utils";
import "./styles.scss";
import { useParams } from "react-router";

//todo унести арии в контекст или ещё куда
export const FlatInfo = ({ areas }: { areas: AreaVO[] }) => {
  const { roomId: selectedRoomStr = "" } = useParams();
  const roomLoader = useCallback(() => RoomService.getRoomById({ id: parseInt(selectedRoomStr, 10) || 0 }), [selectedRoomStr]);
  const accessesLoader = useCallback(() => AccessService.findByRoom({
    roomId: parseInt(selectedRoomStr, 10) || 0,
    active: true
  }), [selectedRoomStr]);

  const [flatParams, isLoadingFlatParams, loadFlatParams] = useRemoteData<RoomVO, RoomVO>(roomLoader);

  const [flatInfo, isLoadingFlatInfo, loadFlatInfo] = useRemoteData<AccessInfoVO>(accessesLoader, {
    dataConverter: (info): AccessInfoVO => ({
      ...info,
      // @ts-ignore
      owner: {
        ...info.owner,
        ownerRooms: (info.owner?.ownerRooms || []).sort(sortPropertyByFlatType)
      }
    })
  });

  useEffect(() => {
    const roomId = parseInt(selectedRoomStr, 10);
    if (roomId) {
      loadFlatParams();
      loadFlatInfo();
    }
  }, [selectedRoomStr]);

  return <AccessContext.Provider value={{
    ownerId: flatInfo?.owner?.id || 0,
    areas, flatNumber: flatParams?.number || "",
    reloadFlatInfo: loadFlatInfo
  }}>
    <Card size="small" className="flat-info-card" loading={isLoadingFlatInfo || isLoadingFlatParams}
          title={<div className="flat-title card-title">
            <Typography.Title level={5}>
              {flatParams?.type === EnumRoomVOType.GARAGE && "М/м "}
              {flatParams?.type === EnumRoomVOType.FLAT && "Кв."}
              {flatParams?.type === EnumRoomVOType.OFFICE && "Офис "}
              {flatParams?.number}
            </Typography.Title>
            <div
              className="address">{flatParams?.street && flatParams?.building ? `${flatParams?.street}, д. ${flatParams?.building}` : ""}</div>
          </div>}>
      <div className="flat-info">
        <FlatOwnerInfo owner={flatInfo?.owner} />
        <FlatAccesses keys={flatInfo?.keys || []} />
      </div>
    </Card>
  </AccessContext.Provider>;
};
