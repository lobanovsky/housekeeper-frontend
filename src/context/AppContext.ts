import { createContext } from 'react';
import { AreaEntity } from '../backend/services/backend';

interface IAppContext {
  areas: AreaEntity[];
}

export const DictionariesContext = createContext<IAppContext>({
  areas: []
});
