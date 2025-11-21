import { createContext } from 'react';
import { AreaEntity } from '../backend/services/backend';

interface IAppContext {
  areas: AreaEntity[];
  paymentMonths: string[];
}

export const DictionariesContext = createContext<IAppContext>({
  areas: [],
  paymentMonths: []
});
