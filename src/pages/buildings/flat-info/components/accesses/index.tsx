import { KeyVO } from "backend/services/backend";

import { AccessItem } from "./access-item";
import "./styles.scss";

export const FlatAccesses = ({ keys = [], loadFlatInfo }: { keys: KeyVO[], loadFlatInfo: () => void }) => {
  return (
    <div className="flat-accesses">
      <span
        style={{ marginTop: "0.5em", marginBottom: "1em", color: "rgb(119, 0, 194)", fontSize: "15px" }}>Доступы:</span>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      {keys.map((accessInfo: KeyVO, index) => (
        <AccessItem reloadInfo={loadFlatInfo} key={accessInfo.id} accessInfo={accessInfo} />
      ))}
    </div>
  );
};
