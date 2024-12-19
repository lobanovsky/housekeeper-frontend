import { createContext } from 'react';
import { EmptyFunction } from 'utils/types';
import { AreaEntity, Building, RoomVO } from '../../../../../backend/services/backend';
import { EmptyBuilding, EmptyRoom } from '../../../constants';

export interface IAccessContext {
  roomInfo: RoomVO,
  ownerId: number,
  reloadFlatInfo: EmptyFunction,
  grantedAreas: AreaEntity[]
  building: Building,
}

export const AccessContext = createContext<IAccessContext>({
  roomInfo: { ...EmptyRoom },
  ownerId: 0,
  grantedAreas: [],
  building: EmptyBuilding,
  reloadFlatInfo: () => {
  }
});
