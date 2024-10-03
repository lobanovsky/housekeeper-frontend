import { createContext } from 'react';
import { Area } from '../backend/services/backend';

interface IAppContext {
  areas: Area[];
}

export const DictionariesContext = createContext<IAppContext>({
  areas: []
});
