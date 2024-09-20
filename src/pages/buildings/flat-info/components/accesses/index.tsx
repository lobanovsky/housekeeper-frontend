import { EnumAreaType, KeyVO } from "backend/services/backend";
import { ParkingIcon } from "icons/parking";
import "./styles.scss";
import { PlaygroundIcon } from "../../../../../icons/playground";


export const FlatAccesses = ({ keys = [] }: { keys: KeyVO[] }) => {
  return (
    <div className="flat-accesses">
      <span style={{ fontWeight: 500, marginTop: "0.5em" }}>Доступы</span>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      {keys.map(({ id, phoneLabel, phoneNumber, tenant, areas = [] }: KeyVO, index) => {
        return <div className="access-item">
          <div className="phone-container">
            <div className="phone-index">{index + 1}.</div>
            <div className={`phone-number ${tenant ? "tenant" : ""}`}>
              {phoneNumber}
            </div>
            <div className="access-icons">
              {areas.map(({ type }) => {
                if (type === EnumAreaType.YARD_AREA) {
                  return <PlaygroundIcon />;
                }

                if (type === EnumAreaType.UNDERGROUND_PARKING_AREA) {
                  return <ParkingIcon />;
                }

                return "";
              })}
            </div>
          </div>
          {!!phoneLabel && <div className="phone-label">{phoneLabel}</div>}
        </div>;
      })}
    </div>
  );
};
