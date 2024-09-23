import { EnumAreaType, KeyVO } from "backend/services/backend";
import { ParkingIcon } from "icons/parking";
import "./styles.scss";
import { PlaygroundIcon } from "../../../../../icons/playground";
import { CarFrontIcon } from "../../../../../icons/car_front";


export const FlatAccesses = ({ keys = [] }: { keys: KeyVO[] }) => {
  return (
    <div className="flat-accesses">
      <span
        style={{ marginTop: "0.5em", marginBottom: "1em", color: "rgb(119, 0, 194)", fontSize: "15px" }}>Доступы:</span>
      {!keys.length && <span className="emtpy-placeholder">не указаны</span>}
      {keys.map(({ id, phoneLabel, phoneNumber, tenant, areas = [], cars = [] }: KeyVO, index) => (
        <div className="access-item" key={id}>
          <div className="phone-container">
            {/*<div className="phone-index">{index + 1}.</div>*/}
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
          <div className="cars">
            {cars.map(({ description = "", number = "" }) => <div className="car" key={number}>
              <CarFrontIcon style={{ fontSize: "21px" }} />
              <span className="car-number">{number}</span>
              <span className="car-description">{description}</span>
            </div>)}
          </div>
          {(!!phoneLabel || tenant) && <div className="phone-label">{phoneLabel || "аренда"}</div>}

        </div>
      ))}
    </div>
  );
};
