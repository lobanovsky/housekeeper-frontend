import React from 'react';
import { CarResponse } from 'backend/services/backend';
import './styles.scss';

export function AccessItemCars({ cars }: { cars: CarResponse[] }) {
  return (
    <div className="access-item-cars">
      {cars.map(
        ({
           description = '',
           plateNumber = ''
         }) => (
          <div className="car" key={plateNumber}>
            {/* <CarFrontIcon className="car-icon" /> */}
            <span className="car-number">{plateNumber}</span>
            <span className="car-description">{description}</span>
          </div>
        )
      )}
    </div>
  );
}
