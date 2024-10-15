import { createContext } from 'react';
import { EmptyFunction } from 'utils/types';
import { AreaEntity, Building, RoomVO } from '../../../../../backend/services/backend';
import { EmptyBuilding } from '../../../constants';

export interface IAccessContext {
  roomInfo: RoomVO,
  ownerId: number,
  reloadFlatInfo: EmptyFunction,
  grantedAreas: AreaEntity[]
  building: Building,
}

export const AccessContext = createContext<IAccessContext>({
  roomInfo: { id: 0 },
  ownerId: 0,
  grantedAreas: [],
  building: EmptyBuilding,
  reloadFlatInfo: () => {
  }
});
