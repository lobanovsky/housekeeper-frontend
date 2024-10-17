import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AccessResponse,
  AccessService,
  AreaEntity,
  Building,
  BuildingService,
  CarResponse,
  OwnerEntity,
  OwnerService,
  RoomService,
  RoomVO
} from 'backend/services/backend';
import { showError, useLoading } from 'utils';
import { AccessValues, ServerError } from 'utils/types';
import { addRandomIdToData } from 'utils/utils';
import { sortPropertyByFlatType } from '../utils';
import { EmptyBuilding } from '../../../constants';

interface OwnerFullInfo {
  info: OwnerEntity,
  rooms: RoomVO[]
}

export interface RoomFullInfo {
  roomInfo: RoomVO,
  building: Building,
  accesses: AccessValues[],
  ownerProperty: RoomVO[]
}

interface RoomInfoProps {
  roomId: number,
  allAreas: AreaEntity[]
}

const convertAccessForForm = (accesses: AccessResponse[]): AccessValues[] => accesses.map(
  ({
     cars = [],
     ...access
   }) => ({
    areaIds: (access.areas || []).map(({ areaId = 0 }) => areaId),
    ...access,
    cars: addRandomIdToData<CarResponse>(cars)
  })
);

export function useRoomInfo({
                              roomId: initialRoomId,
                              allAreas
                            }: RoomInfoProps) {
  const [loading, showLoading, hideLoading] = useLoading(!!initialRoomId);
  const [isLoadingAccesses, showAccessLoading, hideAccessLoading] = useLoading(false);

  const [roomInfo, setRoomInfo] = useState<RoomFullInfo>({
    roomInfo: { id: 0 },
    accesses: [],
    ownerProperty: [],
    building: EmptyBuilding
  });

  const [ownerInfo, setOwnerInfo] = useState<OwnerEntity>({
    id: 0,
    availableAccessArea: [],
    dateOfLeft: '',
    createDate: ''
  });

  const [buildingInfo, setBuildingInfo] = useState<Building>({ ...EmptyBuilding });

  const ownerId = useMemo(() => ownerInfo?.id || 0, [ownerInfo?.id]);

  const grantedAreas = useMemo(() => {
    if (!allAreas.length || !ownerInfo.availableAccessArea?.length) {
      return [];
    }

    return allAreas.filter(({ id = 0 }) => (ownerInfo.availableAccessArea || []).includes(id));
  }, [allAreas.length, ownerInfo.availableAccessArea?.length]);

  const loadAccesses = useCallback((loadRoomId: number) => {
    showAccessLoading();
    AccessService.findByRoom({
      roomId: loadRoomId,
      active: true
    })
      .then((responseData: AccessResponse[]) => {
        hideAccessLoading();
        const convertedValues = convertAccessForForm(responseData);
        setRoomInfo((prev) => ({
          ...prev,
          accesses: convertedValues
        }));
      })
      .catch((e: ServerError) => {
        showError('Не удалось загрузить список доступов', e);
        hideAccessLoading();
      });
  }, []);

  const loadOwnerInfo = useCallback((loadedOwnerId: number, onFinish: (info: OwnerFullInfo) => void) => {
    Promise.allSettled([
      OwnerService.getOwnerById({ id: loadedOwnerId }),
      OwnerService.getRoomsByOwnerId({ ownerId: loadedOwnerId })
    ])
      .then(([ownerInfoResult, ownerPropertiesResult]) => {
        const ownerFullInfo: OwnerFullInfo = {
          info: {
            id: 0,
            dateOfLeft: '',
            createDate: ''
          },
          rooms: []
        };

        if (ownerInfoResult.status === 'fulfilled') {
          ownerFullInfo.info = ownerInfoResult.value;
        } else {
          showError('Не удалось загрузить информацию о собственнике', ownerInfoResult.reason || ownerInfoResult);
        }

        if (ownerPropertiesResult.status === 'fulfilled') {
          ownerFullInfo.rooms = ownerPropertiesResult.value.sort(sortPropertyByFlatType);
        } else {
          showError('Не удалось загрузить информацию о собственности владельца', ownerPropertiesResult.reason || ownerInfoResult);
        }

        onFinish(ownerFullInfo);
      });
  }, []);

  const loadBuildingInfo = useCallback((buildingId: number) => {
    BuildingService.findById({ id: buildingId })
      .then((resp: Building) => {
        setBuildingInfo(resp);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const loadRoomFullInfo = useCallback((loadRoomId: number) => {
    showLoading();
    debugger;
    RoomService.getRoomById({ id: loadRoomId })
      .then((info) => {
        setRoomInfo((prev) => ({
          ...prev,
          roomInfo: info
        }));
        hideLoading();
      })
      .catch((e) => {
        showError('ОШибка загрузки инфо о квартире', e);
        hideLoading();
      });
    // Promise.allSettled([
    //   RoomService.getRoomById({ id: loadRoomId }),
    //   AccessService.findByRoom({
    //     roomId: loadRoomId,
    //     active: true
    //   })
    //
    // ])
    //   .then(([flatParamsResult, accessesResult]) => {
    //     const result: RoomFullInfo = {
    //       roomInfo: { id: 0 },
    //       building: { ...EmptyBuilding },
    //       accesses: [],
    //       ownerProperty: []
    //     };
    //
    //     if (accessesResult.status === 'fulfilled') {
    //       result.accesses = convertAccessForForm(accessesResult.value);
    //     } else {
    //       showError('Не удалось загрузить доступы', accessesResult.reason || accessesResult);
    //     }
    //
    //     if (flatParamsResult.status === 'fulfilled') {
    //       result.roomInfo = flatParamsResult.value as RoomVO;
    //
    //       if (result.roomInfo.building) {
    //         loadBuildingInfo(result.roomInfo.building);
    //       }
    //       if ((result.roomInfo.ownerIds || []).length) {
    //         const loadedOwnerId = result.roomInfo.ownerIds?.length ? result.roomInfo.ownerIds[0] : 0;
    //         if (loadedOwnerId) {
    //           loadOwnerInfo(loadedOwnerId, ({
    //                                           info,
    //                                           rooms
    //                                         }: OwnerFullInfo) => {
    //             hideLoading();
    //             result.ownerProperty = rooms;
    //             setOwnerInfo(info);
    //             setRoomInfo(result);
    //           });
    //         } else {
    //           hideLoading();
    //           setRoomInfo(result);
    //         }
    //       } else {
    //         hideLoading();
    //         setRoomInfo(result);
    //       }
    //     } else {
    //       hideLoading();
    //       showError('Не удалось загрузить информацию о квартире', flatParamsResult.reason || flatParamsResult);
    //       setRoomInfo(result);
    //     }
    //   });
  }, [loadBuildingInfo]);

  useEffect(() => {
    if (initialRoomId) {
      loadRoomFullInfo(initialRoomId);
    }
  }, [initialRoomId]);

  return {
    roomInfo: {
      ...roomInfo,
      building: buildingInfo
    },
    ownerId,
    loading,
    isLoadingAccesses,
    grantedAreas,
    loadRoomFullInfo,
    loadAccesses
  };
}
