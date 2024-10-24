import { Building } from '../../backend/services/backend';

export const MaxRoomsOnFloor = 10;

export const CarNumberRegex = /^[а-яА-Я]\d{3}(\s)?[а-яА-Я]{2}\d{2,3}$/;

export const PhoneRegexes = [
  /^\+7(\s)?\(\d{3}\)(\s)?\d{3}-\d{2}-\d{2}$/,
  /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/
];

export const EmptyBuilding: Building = {
  id: 0,
  name: '',
};
