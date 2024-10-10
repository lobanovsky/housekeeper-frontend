import { createContext } from 'react';
import { EmptyFunction } from 'utils/types';
import { AreaEntity } from '../../../../../backend/services/backend';

export interface IAccessContext {
  flatNumber?: string;
  ownerId: number,
  reloadFlatInfo: EmptyFunction,
  grantedAreas: AreaEntity[]
}

export const AccessContext = createContext<IAccessContext>({
  flatNumber: '',
  ownerId: 0,
  grantedAreas: [],
  reloadFlatInfo: () => {
  }
});
