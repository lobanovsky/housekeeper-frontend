import { useCallback } from "react";
import { Card } from "antd";

import { AccessInfoVO, AccessService, EnumRoomVOType, RoomVO } from "backend/services/backend";
import useRemoteData from "hooks/use-remote-data";
import { FlatOwnerInfo } from "./components/owner-property";
import { FlatAccesses } from "./components/accesses";
import "./styles.scss";

export const FlatInfo = ({ flat }: { flat: RoomVO }) => {
  const flatLoader = useCallback(() => AccessService.findByRoom({ roomId: flat.id || 0, active: true }), [flat.id]);

  const [flatInfo, isLoadingFlatInfo] = useRemoteData<AccessInfoVO>(flatLoader);


  return <Card size="small" loading={isLoadingFlatInfo} title={<div className="flat-title card-title">
    <div style={{ fontWeight: 600 }}>
      {flat.type === EnumRoomVOType.GARAGE && "М/м "}
      {flat.type === EnumRoomVOType.FLAT && "Кв."}
      {flat.type === EnumRoomVOType.OFFICE && "Офис "}
      {flat.number}
    </div>
    <div className="address">{`${flat.street}, д. ${flat.building}`}</div>
  </div>}>
    <div className="flat-info">
      <FlatOwnerInfo owner={flatInfo?.owner} />
      <FlatAccesses keys={flatInfo?.keys || []} />
    </div>
  </Card>;
};
