import { AccessResponse } from 'backend/services/backend';
import React, { useCallback, useMemo } from 'react';
import { MaskedInput } from 'antd-mask-input';
import { Input, Typography } from 'antd';
import { getRandomId } from 'utils/utils';
import { CarValues } from 'utils/types';
import { AccessItemCarList } from './cars-list';
import './styles.scss';

export interface AccessValues extends Omit<AccessResponse, 'cars'> {
  cars: CarValues[],
  isValid?: boolean;
}

interface PhoneItemProps {
  access: AccessValues,
  isEdit?: boolean,
  onChangeAccess: (accessId: number, fieldName: keyof AccessValues, value: string | boolean | CarValues[]) => void;
}

const EmptyAccess: AccessValues = {
  cars: [], phoneNumber: '', phoneLabel: ''
};

export function PhoneItem({ isEdit = false, access = { ...EmptyAccess }, onChangeAccess }: PhoneItemProps) {
  const carsChangeId = useMemo(() => getRandomId(), [
    (access.cars || []).map(({ plateNumber = '', description = '' }) => `${plateNumber}-${description}`).join(',')
  ]);

  const onChangePhoneNumber = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess(access.accessId || 0, 'phoneNumber', value);
  }, [onChangeAccess, access.accessId]);

  // const onChangeTenant = useCallback(({ target: { checked } }: CheckboxChangeEvent) => {
  //   // @ts-ignore
  //   onChangeAccess(access.accessId || 0, 'tenant', checked);
  // }, [onChangeAccess, access.accessId]);

  const onChangeLabel = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess(access.accessId || 0, 'phoneLabel', value);
  }, [onChangeAccess, access.accessId]);

  const onChangeCar = useCallback((changedCar: CarValues) => {
    debugger;
    // todo добавить айдишники к тачкам
    const carIndex = (access.cars || []).findIndex((item) => item.plateNumber === changedCar.plateNumber);
    const newCars = [...(access.cars || [])];
    if (carIndex < 0) {
      newCars.push({ ...changedCar });
    } else {
      newCars[carIndex] = {
        ...newCars[carIndex],
        ...changedCar
      };
    }

    onChangeAccess(access.accessId || 0, 'cars', newCars);
  }, [
    onChangeAccess,
    access.accessId,
    carsChangeId
  ]);

  const deleteCar = useCallback((carId: number) => {
    // todo проверять айдишник тачки
    // const carIndex = (access.cars || []).findIndex((item) => item.plateNumber === carId);
    // const newCars = [...(access.cars || [])];
    // if (carIndex > -1) {
    //   newCars.splice(carIndex, 1);
    //   onChangeAccess(access.accessId || 0, 'cars', newCars);
    // }
  }, [carsChangeId]);

  return (
    <div className={`phone-item ${isEdit ? 'is-edit' : ''}`}>
      <div className="access-main-info">
        <div className="phone-number">
          {isEdit ? <Typography.Text>{access.phoneNumber}</Typography.Text> : (
            <MaskedInput
              disabled={isEdit}
              key={access.accessId}
              size="small"
              className={!access.isValid ? 'invalid' : ''}
              allowClear
              placeholder="Номер телефона"
              mask="+7 (000) 000-00-00"
              value={access.phoneNumber}
              onChange={onChangePhoneNumber}
            />
          )}

        </div>
        <Input
          className="access-label"
          size="small"
          value={access.phoneLabel}
          placeholder="Кто это?"
          onChange={onChangeLabel}
        />
        {/* <Checkbox checked={access.tenant} onChange={onChangeTenant}>Арендатор</Checkbox> */}
      </div>
      <div className="cars">
        <AccessItemCarList cars={access.cars || []} onChangeCar={onChangeCar} deleteCar={deleteCar} />
      </div>
    </div>
  );
}
