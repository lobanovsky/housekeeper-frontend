import { CarRequest } from 'backend/services/backend';
import { CarNumberRegex } from 'pages/buildings/constants';
import { CarValues } from 'utils/types';

export const convertCars = (cars: CarValues[]): CarRequest[] => cars
  .filter(({ plateNumber = '' }) => CarNumberRegex.test(plateNumber))
  .map(({ plateNumber = '', description = '' }) => {
    const car: CarRequest = {
      plateNumber: plateNumber.replace(/\s/g, ''),
      description
    };
    return car;
  });
