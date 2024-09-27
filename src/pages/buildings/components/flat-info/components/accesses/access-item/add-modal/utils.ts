import { CarValues } from "../../types";
import { AccessCar } from "backend/services/backend";
import { CarNumberRegex } from "../../constants";

export const convertCars = (cars: CarValues[]): AccessCar[] => cars
  .filter(({ number = "" }) => CarNumberRegex.test(number))
  .map(({ id = 0, isNew = false, number = "", description = "" }) => {
    const car: AccessCar = {
      plateNumber: number.replace(/\s/g, ""),
      description
    };
    return car;
  });
