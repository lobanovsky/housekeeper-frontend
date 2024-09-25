import { KeyVO } from "backend/services/backend";

import { AccessItem } from "./access-item";
import "./styles.scss";
import { showAddAccessItemModal } from "./access-item/add-modal";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useContext } from "react";
import { AccessContext } from "../../context/AccessContext";
import { DictionariesContext } from "../../../../../context/AppContext";

export const FlatAccesses = ({ keys = [] }: {
  keys: KeyVO[],
}) => {
  const contextValue = useContext(AccessContext);
  const { areas } = useContext(DictionariesContext);
  const { ownerId, flatNumber, reloadFlatInfo } = contextValue;
  return (
    <div className="flat-accesses">
      <div className="access-header">
        <Typography.Title level={5}>Доступы</Typography.Title>
        <Button type="link" size="small" className="add-btn" onClick={() => {
          showAddAccessItemModal({ reloadInfo: reloadFlatInfo, ownerId, areas, flatNumber });
        }}><PlusOutlined />добавить</Button>
      </div>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      <div style={{ padding: "4px 0" }}>

      </div>
      {keys.map((accessInfo: KeyVO, index) => (
        <AccessItem key={accessInfo.id} accessInfo={accessInfo} />
      ))}
    </div>
  );
};
