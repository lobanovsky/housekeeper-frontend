import { AreaVO, KeyVO } from "backend/services/backend";

import { AccessItem } from "./access-item";
import "./styles.scss";
import { showAddAccessItemModal } from "./access-item/add-modal";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const FlatAccesses = ({ ownerId = 0, keys = [], loadFlatInfo, areas }: {
  areas: AreaVO[],
  ownerId: number,
  keys: KeyVO[],
  loadFlatInfo: () => void
}) => {
  return (
    <div className="flat-accesses">
      <span
        style={{ marginTop: "0.5em", marginBottom: "1em", color: "rgb(119, 0, 194)", fontSize: "15px" }}>Доступы:</span>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      <div style={{ padding: "4px 0" }}>
        <Button type="link" size="small" style={{ padding: 0 }} onClick={() => {
          showAddAccessItemModal({ reloadInfo: loadFlatInfo, ownerId, areas });
        }}><PlusOutlined />добавить доступ</Button>
      </div>
      {keys.map((accessInfo: KeyVO, index) => (
        <AccessItem ownerId={ownerId} areas={areas} reloadInfo={loadFlatInfo} key={accessInfo.id}
                    accessInfo={accessInfo} />
      ))}
    </div>
  );
};
