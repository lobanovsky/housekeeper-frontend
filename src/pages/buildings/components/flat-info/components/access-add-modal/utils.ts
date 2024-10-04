import { CarRequest } from 'backend/services/backend';
import { CarNumberRegex } from 'pages/buildings/constants';
import { CarValues } from 'pages/buildings/types';

export const convertCars = (cars: CarValues[]): CarRequest[] => cars
  .filter(({ number = '' }) => CarNumberRegex.test(number))
  .map(({ number = '', description = '' }) => {
    const car: CarRequest = {
      plateNumber: number.replace(/\s/g, ''),
      description
    };
    return car;
  });
