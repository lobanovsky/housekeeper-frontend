import { CarValues } from "../../types";
import { CarRequest } from "backend/services/backend";
import { CarNumberRegex } from "../../constants";

export const convertCars = (cars: CarValues[]): CarRequest[] => cars
  .filter(({ number = "" }) => CarNumberRegex.test(number))
  .map(({ id = 0, isNew = false, number = "", description = "" }) => {
    const car: CarRequest = {
      plateNumber: number.replace(/\s/g, ""),
      description
    };
    return car;
  });
