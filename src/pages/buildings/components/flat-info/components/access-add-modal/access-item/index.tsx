import React, { useCallback, useMemo } from 'react';
import { MaskedInput } from 'antd-mask-input';
import { Checkbox, Input, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

import { AreaEntity } from 'backend/services/backend';
import { AreaNames } from 'utils/constants';
import { phoneNumberRenderer } from 'utils/renderers';
import { AccessValues, CarValues } from 'utils/types';
import { getRandomId } from 'utils/utils';
import { AccessItemCarList } from './cars-list';
import './styles.scss';

export type AccessFieldValue = string | boolean | number[] | CarValues[];

interface PhoneItemProps {
  access: AccessValues,
  grantedAreas: AreaEntity[],
  isEdit?: boolean,
  onChangeAccess: (fieldName: keyof AccessValues, value: AccessFieldValue) => void
}

export function AccessItemForm({
                                 isEdit = false,
                                 grantedAreas,
                                 onChangeAccess,
                                 access: {
                                   cars = [],
                                   phoneNumber,
                                   areaIds = [],
                                   phoneLabel,
                                   areaPlaces = {},
                                   tenant,
                                   accessId
                                 }
                               }: PhoneItemProps) {
  const carsChangeId = useMemo(() => getRandomId(), [
    cars.map(({
                plateNumber = '',
                description = ''
              }) => `${plateNumber}-${description}`)
      .join(',')
  ]);

  const areaOptions = useMemo(() => grantedAreas.map(({ id = 0 }) => ({
    value: id,
    label: (
      <span>
          {AreaNames[id]?.title || id}
        {AreaNames[id]?.icon ? <span className={`icon type-${id}`}>{AreaNames[id]?.icon}</span> : ''}
      </span>
    )
  })), [grantedAreas.length]);

  const onChangePhoneNumber = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess('phoneNumber', value);
  }, [onChangeAccess]);

  const onChangeTenant = useCallback(({ target: { checked } }: CheckboxChangeEvent) => {
    // @ts-ignore
    onChangeAccess('tenant', checked);
  }, [onChangeAccess]);

  const onChangeLabel = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess('phoneLabel', value);
  }, [onChangeAccess]);

  const onChangeAreas = useCallback((checkedValues: CheckboxValueType[]) => {
    onChangeAccess('areaIds', checkedValues as number[]);
  }, []);

  const onChangeCar = useCallback((changedCar: CarValues) => {
    const carIndex = (cars || []).findIndex((item) => item.id === changedCar.id);
    const newCars = [...(cars || [])];
    if (carIndex < 0) {
      newCars.push({ ...changedCar });
    } else {
      newCars[carIndex] = {
        ...newCars[carIndex],
        ...changedCar
      };
    }

    onChangeAccess('cars', newCars);
  }, [
    onChangeAccess,
    carsChangeId
  ]);

  const deleteCar = useCallback((carId: number) => {
    const carIndex = (cars || []).findIndex((item) => item.id === carId);
    const newCars = [...(cars || [])];
    if (carIndex > -1) {
      newCars.splice(carIndex, 1);
      onChangeAccess('cars', newCars);
    }
  }, [carsChangeId, onChangeAccess]);

  return (
    <div className={`access-item-form ${isEdit ? 'is-edit' : ''}`}>
      <div className="areas">
        <Typography.Title level={5}>Куда</Typography.Title>
        <Checkbox.Group value={areaIds} onChange={onChangeAreas} options={areaOptions} />
      </div>
      <Typography.Title level={5}>Кому</Typography.Title>
      <div className="user-info">
        <div className="phone-number">
          {isEdit ? <Typography.Text>{phoneNumberRenderer(phoneNumber)}</Typography.Text> : (
            <MaskedInput
              disabled={isEdit}
              key={accessId}
              size="large"
              // className={!isValid ? 'invalid' : ''}
              mask="+7 (000) 000-00-00"
              allowClear
              value={phoneNumber}
              onChange={onChangePhoneNumber}
            />
          )}
        </div>
        <div className="label-container">
          <Input
            className="access-label"
            size="large"
            value={phoneLabel}
            placeholder="Кто это?"
            onChange={onChangeLabel}
          />
          <div className="tenant-container"><Checkbox checked={tenant} onChange={onChangeTenant}>Арендатор</Checkbox></div>
        </div>
      </div>
      <div className="cars">
        <AccessItemCarList cars={cars || []} onChangeCar={onChangeCar} deleteCar={deleteCar} />
      </div>
    </div>
  );
}
