import { CarRequest } from 'backend/services/backend';
import { CarNumberRegex } from 'pages/buildings/constants';
import { AccessValues, CarValues } from 'utils/types';
import { getRandomId } from '../../../../../../utils';

export const convertCarsForBackend = (cars: CarValues[]): CarRequest[] => cars
  .filter(({ plateNumber = '' }) => CarNumberRegex.test(plateNumber))
  .map(({
          plateNumber = '',
          description = ''
        }) => {
    const car: CarRequest = {
      plateNumber: plateNumber.replace(/\s/g, ''),
      description
    };
    return car;
  });

export const convertAreasForBackend = (areaIds: number[], areaPlacesMap: Record<number, string>) => areaIds
  .map((areaId) => {
    const selectedPlaces = (areaPlacesMap[areaId] || '');
    const placeNumbers = selectedPlaces.split(', ')
      .filter((placeStr) => /^\d{1,3}$/.test(placeStr));
    return ({
      areaId,
      places: placeNumbers
    });
  });

export const convertAccessFromBackendToForm = (access: AccessValues = {
  areas: [],
  accessId: 0,
  cars: [],
  areaIds: []
}): AccessValues => {
  const initialAreas = access?.areas || [];
  const initialAreaIds = initialAreas.map(({ areaId = 0 }) => areaId);

  const initialAreaPlaces: Record<number, string> = initialAreas.reduce((accum: Record<number, string>, {
    areaId = 0,
    places = []
  }) => ({
    ...accum,
    [areaId]: places.join(', ')
  }), {});

  return {
    accessId: getRandomId(),
    ...access,
    areaIds: initialAreaIds,
    areaPlaces: initialAreaPlaces
  };
};
