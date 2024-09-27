import { CarVO, KeyVO } from "backend/services/backend";
import React, { useCallback, useMemo } from "react";
import { MaskedInput } from "antd-mask-input";
import { Checkbox, Input, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import "./styles.scss";
import { AccessItemCarList } from "./cars-list";
import { CarValues } from "../../../types";
import { getRandomId } from "../../../../../../../../../utils/utils";

export interface PhoneItemValues extends KeyVO {
  isValid?: boolean;
}


interface PhoneItemProps {
  access: PhoneItemValues,
  isEdit?: boolean,
  onChangeAccess: (accessId: number, fieldName: keyof PhoneItemValues, value: string | boolean | CarVO[]) => void;
}

const EmptyAccess: PhoneItemValues = { cars: [], tenant: false, phoneNumber: "", phoneLabel: "" };

export const PhoneItem = ({ isEdit = false, access = { ...EmptyAccess }, onChangeAccess }: PhoneItemProps) => {
    const carsChangeId = useMemo(() => getRandomId(), [
      (access.cars || []).map(({ id = 0, number = "", description = "" }) => `${id}-${number}-${description}`).join(",")
    ]);

    const onChangePhoneNumber = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAccess(access.id || 0, "phoneNumber", value);
    }, [onChangeAccess, access.id]);

    const onChangeTenant = useCallback(({ target: { checked } }: CheckboxChangeEvent) => {
      onChangeAccess(access.id || 0, "tenant", checked);
    }, [onChangeAccess, access.id]);

    const onChangeLabel = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAccess(access.id || 0, "phoneLabel", value);
    }, [onChangeAccess, access.id]);

    const onChangeCar = useCallback((changedCar: CarValues) => {
      const carIndex = (access.cars || []).findIndex(item => item.id === changedCar.id);
      const newCars = [...(access.cars || [])];
      if (carIndex < 0) {
        newCars.push({ ...changedCar });
      } else {
        newCars[carIndex] = {
          ...newCars[carIndex],
          ...changedCar
        };
      }

      onChangeAccess(access.id || 0, "cars", newCars);
    }, [
      onChangeAccess,
      access.id,
      carsChangeId
    ]);

    const deleteCar = useCallback((carId: number) => {
      const carIndex = (access.cars || []).findIndex(item => item.id === carId);
      const newCars = [...(access.cars || [])];
      if (carIndex > -1) {
        newCars.splice(carIndex, 1);
        onChangeAccess(access.id || 0, "cars", newCars);
      }


    }, [carsChangeId]);

    return (
      <div className={`phone-item ${isEdit ? "is-edit" : ""}`}>
        <div className="access-main-info">
          <div className="phone-number">
            {isEdit ? <Typography.Text>{access.phoneNumber}</Typography.Text> : <MaskedInput
              disabled={isEdit}
              key={access.id}
              size="small"
              className={!access.isValid ? "invalid" : ""}
              allowClear
              placeholder="Номер телефона"
              mask={"+7 (000) 000-00-00"}
              value={access.phoneNumber} onChange={onChangePhoneNumber}
            />}

          </div>
          <Input className="access-label" size="small" value={access.phoneLabel} placeholder="Кто это?"
                 onChange={onChangeLabel} />
          <Checkbox checked={access.tenant} onChange={onChangeTenant}>Арендатор</Checkbox>
        </div>
        <div className="cars">
          <AccessItemCarList cars={access.cars || []} onChangeCar={onChangeCar} deleteCar={deleteCar} />
        </div>
      </div>
    );
  }
;
