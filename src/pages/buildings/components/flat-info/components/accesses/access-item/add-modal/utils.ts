import { CarRequest } from 'backend/services/backend';
import { CarValues } from '../../types';
import { CarNumberRegex } from '../../constants';

export const convertCars = (cars: CarValues[]): CarRequest[] => cars
  .filter(({ number = '' }) => CarNumberRegex.test(number))
  .map(({ number = '', description = '' }) => {
    const car: CarRequest = {
      plateNumber: number.replace(/\s/g, ''),
      description
    };
    return car;
  });
