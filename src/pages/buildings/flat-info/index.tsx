import { useCallback } from "react";
import { Card, Typography } from "antd";

import { AccessInfoVO, AccessService, AreaVO, EnumRoomVOType, RoomVO } from "backend/services/backend";
import useRemoteData from "hooks/use-remote-data";
import { FlatOwnerInfo } from "./components/owner-property";
import { FlatAccesses } from "./components/accesses";
import "./styles.scss";

const sortByFlatType = ({ type: type1, number: number1 = "" }: RoomVO, {
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

//todo унести арии в контекст или ещё куда
export const FlatInfo = ({ flat, areas }: { areas: AreaVO[], flat: RoomVO }) => {
  const flatLoader = useCallback(() => AccessService.findByRoom({ roomId: flat.id || 0, active: true }), [flat.id]);

  const [flatInfo, isLoadingFlatInfo, loadFlatInfo] = useRemoteData<AccessInfoVO>(flatLoader, {
    dataConverter: (info): AccessInfoVO => ({
      ...info,
      // @ts-ignore
      owner: {
        ...info.owner,
        ownerRooms: (info.owner?.ownerRooms || []).sort(sortByFlatType)
      }
    })
  });


  return <Card size="small" className="flat-info-card" loading={isLoadingFlatInfo}
               title={<div className="flat-title card-title">
                 <Typography.Title level={5}>
                   {flat.type === EnumRoomVOType.GARAGE && "М/м "}
                   {flat.type === EnumRoomVOType.FLAT && "Кв."}
                   {flat.type === EnumRoomVOType.OFFICE && "Офис "}
                   {flat.number}
                 </Typography.Title>
                 <div className="address">{`${flat.street}, д. ${flat.building}`}</div>
               </div>}>
    <div className="flat-info">
      <FlatOwnerInfo owner={flatInfo?.owner} />
      <FlatAccesses areas={areas} ownerId={flatInfo?.owner?.id || 0} keys={flatInfo?.keys || []}
                    loadFlatInfo={loadFlatInfo} />
    </div>
  </Card>;
};
