import { useCallback, useEffect, useState } from 'react';
import { AccessResponse, AccessService, CarResponse, OwnerService, RoomService, RoomVO } from 'backend/services/backend';
import { showError, useLoading } from 'utils';
import { AccessValues, ServerError } from 'utils/types';
import { addRandomIdToData } from 'utils/utils';

export interface RoomFullInfo {
  roomInfo: RoomVO,
  accesses: AccessValues[],
  ownerProperty: RoomVO[]
}

const convertAccessForForm = (accesses: AccessResponse[]): AccessValues[] => accesses.map(
  ({ cars = [], ...access }) => ({
    ...access,
    cars: addRandomIdToData<CarResponse>(cars)
  })
);

export function useRoomInfo({ roomId: initialRoomId }: { roomId: number }) {
  const [loading, showLoading, hideLoading] = useLoading();
  const [ownerId, setOwnerId] = useState(0);

  const [roomInfo, setRoomInfo] = useState<RoomFullInfo>({
    roomInfo: {},
    accesses: [],
    ownerProperty: []
  });

  const loadAccesses = useCallback((loadRoomId: number) => {
    showLoading();
    AccessService.findByRoom({
      roomId: loadRoomId,
      active: true
    })
      .then((responseData: AccessResponse[]) => {
        hideLoading();
        const convertedValues = convertAccessForForm(responseData);
        setRoomInfo((prev) => ({
          ...prev,
          accesses: convertedValues
        }));
      })
      .catch((e: ServerError) => {
        showError('Не удалось загрузить список доступов', e);
        hideLoading();
      });
  }, []);

  const loadRoomFullInfo = useCallback((loadRoomId: number) => {
    showLoading();
    Promise.allSettled([
      RoomService.getRoomById({ id: loadRoomId }),
      AccessService.findByRoom({
        roomId: loadRoomId,
        active: true
      })

    ]).then(([flatParamsResult, accessesResult]) => {
      const result: RoomFullInfo = {
        roomInfo: {},
        accesses: [],
        ownerProperty: []
      };

      if (flatParamsResult.status === 'fulfilled') {
        result.roomInfo = flatParamsResult.value as RoomVO;
      } else {
        hideLoading();
        showError('Не удалось загрузить информацию о квартире', flatParamsResult.reason || flatParamsResult);
      }

      if (accessesResult.status === 'fulfilled') {
        result.accesses = convertAccessForForm(accessesResult.value);

        if (result.accesses.length) {
          const { ownerId: loadedOwnerId = 0 } = result.accesses[0];
          if (loadedOwnerId) {
            setOwnerId(loadedOwnerId);
            OwnerService.getRoomsByOwnerId({ ownerId: loadedOwnerId })
              .then((properties: RoomVO[]) => {
                result.ownerProperty = properties;
                setRoomInfo(result);
                hideLoading();
              })
              .catch((e) => {
                hideLoading();
                setRoomInfo(result);
                showError('Не удалось загрузить информацию о собственнике', e);
              });
          }
        } else {
          hideLoading();
          setRoomInfo(result);
        }
      } else {
        hideLoading();
        showError('Не удалось загрузить доступы', accessesResult.reason || accessesResult);
        setRoomInfo(result);
      }
    });
  }, []);

  useEffect(() => {
    if (initialRoomId) {
      loadRoomFullInfo(initialRoomId);
    }
  }, [initialRoomId]);

  return { roomInfo, ownerId, loading, loadRoomFullInfo, loadAccesses };
}
