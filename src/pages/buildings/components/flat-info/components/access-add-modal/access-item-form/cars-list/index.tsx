import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getRandomId } from 'utils/utils';
import { CarNumberRegex } from 'pages/buildings/constants';
import { CarValues } from 'utils/types';
import './styles.scss';

export function AccessItemCarList({
                                    cars,
                                    onChangeCar,
                                    deleteCar
                                  }: {
  cars: CarValues[],
  onChangeCar: (car: CarValues) => void,
  deleteCar: (carId: number) => void
}) {
  const addNewCar = useCallback(() => {
    const newCar: CarValues = {
      id: getRandomId(),
      plateNumber: '',
      description: '',
      isNew: true
    };
    onChangeCar(newCar);
  }, [onChangeCar]);

  return (
    <div className="car-list">
      {/* <div className="car-title"> */}
      {/*   <Typography.Title level={5}>Автомобили</Typography.Title> */}

      {/* </div> */}
      <Button type="link" className="add-btn" size="small" onClick={addNewCar}>
        <PlusOutlined />
        добавить автомобиль
      </Button>
      {cars.map(({
                   id = -1,
                   plateNumber = '',
                   description = ''
                 }) => (
        <div className="car-item" key={id}>
          <MaskedInput
            className={`car-number ${!CarNumberRegex.test(plateNumber) ? 'invalid' : ''}`}
            // size="small"
            allowClear
            autoFocus={false}
            placeholder="Номер"
            mask="a000aa00[0]"
            value={plateNumber}
            onChange={({ target: { value } }) => {
              onChangeCar({
                id,
                plateNumber: value
              });
            }}
          />
          {/* <div className="placeholder">номер в формате x999xx99</div> */}
          <Input
            className="car-description"
            // size="small"
            value={description}
            placeholder="Описание"
            onChange={({ target: { value } }) => {
              onChangeCar({
                id,
                description: value
              });
            }}
          />
          <Button
            type="link"
            className="delete-btn"
            size="small"
            onClick={() => {
              deleteCar(id);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ))}

    </div>
  );
}
