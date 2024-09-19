import { AccessInfoVO, AccessService, EnumAreaType, EnumRoomVOType, RoomVO } from "backend/services/backend";
import { Card } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLoading } from "hooks/use-loading";
import Loading from "components/loading";
import { showError } from "utils/notifications";
import "./styles.scss";
import { HomeOutlined } from "@ant-design/icons";
import { ParkingIcon } from "../../../icons/parking";

interface FlatInfoWithOwner {
  ownerName: string;
  accesses: AccessInfoVO[];
}

export const FlatInfo = ({ flat }: { flat: RoomVO }) => {
  const [loading, showLoading, hideLoading] = useLoading();

  const [flatInfo, setFlatInfo] = useState<FlatInfoWithOwner | null>(null);

  const loadAccesses = useCallback(() => {
    showLoading();
    AccessService.findByRoom({ roomId: flat.id || 0, active: true })
      .then((resp: AccessInfoVO[]) => {
        const ownerRoom = resp.length ? (resp[0].rooms || []).find(({ id }) => id === flat.id) : null;
        let ownerFio = ownerRoom?.ownerName || "";
        if (ownerFio.includes(",")) {
          ownerFio = ownerFio.split(",").join(", ");
        }

        setFlatInfo({
          ownerName: ownerFio,
          accesses: resp
        });

        hideLoading();
      })
      .catch(e => {
        showError("Не удалось загрузить инфо о квартире", e);
        hideLoading();
      });
  }, [flat.id]);

  useEffect(() => {
    loadAccesses();
  }, [flat.id]);

  return <Card size="small" title={<div className="flat-title">
    <div style={{ fontWeight: 600 }}>
      {flat.type === EnumRoomVOType.GARAGE && "М/м "}
      {flat.type === EnumRoomVOType.FLAT && "Кв."}
      {flat.type === EnumRoomVOType.OFFICE && "Офис "}
      {flat.number}
    </div>
    <div className="address">
      {`${flat.street}, д. ${flat.building}`}
    </div>
  </div>}>
    <div className="flat-info">
      {loading && <Loading />}
      {!!flatInfo?.ownerName && <div className="owner-name">{flatInfo?.ownerName || ""}</div>}

      <div className={`accesses ${!flatInfo?.accesses?.length ? "empty" : ""}`}>
        {flatInfo?.accesses?.length ? flatInfo?.accesses.map(
          ({
             id, phoneNumber, phoneLabel = "", areas = [], rooms = []
           }: AccessInfoVO, index) => {
            const phoneCmp = <span style={{ fontWeight: 600 }}>{phoneNumber}</span>;
            return <div key={id} className="access-info">
              <div className="phone">{index + 1}.
                {phoneCmp}
                {!!phoneLabel && <div className="phone-label">{phoneLabel}</div>}
              </div>
              {areas.length > 0 &&
                <div className={`areas ${!areas.length ? "empty" : ""}`}>
                  {areas.map(({ type }) => {
                    if (type === EnumAreaType.YARD_AREA) {
                      return <HomeOutlined />;
                    }

                    if (type === EnumAreaType.UNDERGROUND_PARKING_AREA) {
                      return <ParkingIcon />;
                    }

                    return "";
                  })}
                </div>
              }
              <div className={`rooms`}>
                {rooms.map(({
                              typeDescription = "",
                              number = "",
                              type = ""
                            }) => <div className={`room ${type}`}>
                    {type === EnumRoomVOType.GARAGE && "ММ "}
                    {type === EnumRoomVOType.FLAT && "КВ "}
                    {type === EnumRoomVOType.OFFICE && "ОФ "}
                    {number}
                  </div>
                )}
              </div>
            </div>;
          }) : "нет информации"
        }
      </div>
    </div>

  </Card>;
};
