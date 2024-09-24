import { AreaVO, EnumAreaType, KeyVO } from "backend/services/backend";
import { ParkingIcon } from "icons/parking";
import { PlaygroundIcon } from "icons/playground";
import { CarFrontIcon } from "icons/car_front";
import "./styles.scss";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAccessItemCRUD } from "./hooks";
import { showAddAccessItemModal } from "./add-modal";

export const AccessItem = ({
                             ownerId = 0,
                             areas = [],
                             accessInfo,
                             reloadInfo
                           }: {
  areas: AreaVO[],
  accessInfo: KeyVO,
  ownerId: number;
  reloadInfo: () => void
}) => {
  const { id = 0, phoneLabel = "", phoneNumber, tenant, areas: infoAreas = [], cars = [] } = accessInfo;
  const { isDeleting, deleteAccessItem } = useAccessItemCRUD({ accessId: id || 0, onFinish: reloadInfo });


  return (
    <div className="access-item" key={id}>
      <div className="access-info">
        <div className="phone-container">
          {/*<div className="phone-index">{index + 1}.</div>*/}
          <div className={`phone-number ${tenant ? "tenant" : ""}`}>
            {phoneNumber}
          </div>
          <div className="access-icons">
            {infoAreas.map(({ type }) => {
              if (type === EnumAreaType.YARD_AREA) {
                return <PlaygroundIcon key="playground" />;
              }

              if (type === EnumAreaType.UNDERGROUND_PARKING_AREA) {
                return <ParkingIcon key="parking" />;
              }

              return "";
            })}
          </div>
        </div>
        <div className="cars">
          {cars.map(({ description = "", number = "" }) => <div className="car" key={number}>
            <CarFrontIcon style={{ fontSize: "21px" }} />
            <span className="car-number">{number}</span>
            <span className="car-description">{description}</span>
          </div>)}
        </div>
        {!!phoneLabel && <div className={`phone-label ${!!phoneLabel ? "has-label" : ""}`}>{phoneLabel || ""}</div>}
      </div>
      <div className="access-actions">
        <Button type="link" size="small" onClick={() => {
          showAddAccessItemModal({ reloadInfo: reloadInfo, accessInfo, ownerId, areas });
        }}><EditOutlined /></Button>
        <Button type="link" size="small" onClick={deleteAccessItem}>
          {isDeleting ? <LoadingOutlined /> : <DeleteOutlined />}
        </Button>
      </div>

    </div>
  );
};
