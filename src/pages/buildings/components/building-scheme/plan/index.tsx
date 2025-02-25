import React, { useCallback, useEffect, useState } from 'react';
import { Skeleton } from 'antd';

import { Building, EnumBuildingType, FloorResponse, RoomService, RoomVO } from 'backend/services/backend';
import { useLoading } from 'hooks/use-loading';
import { showError } from 'utils/notifications';
import { ServerError } from 'utils/types';
import { FloorsWithNumbers } from '../../../types';
import { convertBuildingStructure } from '../../../utils';
import './styles.scss';

export function BuildingPlan({
                               building,
                               selectedRoomIds = [],
                               onSelectRoom
                             }: {
  building: Building,
  selectedRoomIds?: number[],
  onSelectRoom?: (room: RoomVO) => void
}) {
  const [loading, showLoading, hideLoading] = useLoading();
  const [floors, setFloors] = useState<FloorsWithNumbers[]>([]);

  const getBuildingPlan = useCallback(() => {
    showLoading();
    const isParking = building?.type === EnumBuildingType.UNDERGROUND_PARKING;

    RoomService.getBuildingStructure({ buildingId: building?.id || 0 })
      .then((floorResp: FloorResponse[]) => {
        hideLoading();
        const {
          floors: convertedFloors,
          fistFlat
        } = convertBuildingStructure(floorResp, isParking);
        setFloors(convertedFloors);
        if (!selectedRoomIds.length && onSelectRoom) {
          onSelectRoom(fistFlat);
        }
      })
      .catch((e: ServerError) => {
        showError('Не удалось загрузить инфо о здании', e);
        hideLoading();
      });
  }, [building?.id, building?.type]);

  useEffect(() => {
    getBuildingPlan();
  }, [building?.id]);

  // @ts-ignore
  return loading ? <Skeleton active /> : (
    <div className={`building-plan ${building?.type}`}>
      {floors.map(
        ({
           floor = 0,
           rooms = [],
           background,
           label
         }) => (
          <div className="floor" key={floor}>
            <div className="floor-number">
              <span className="floor-label" style={label ? { color: label } : {}}>
                {floor}
              </span>
            </div>
            <div
              className="rooms"
              /* @ts-ignore */
              style={background ? { background } : {}}
            >
              {rooms.map((maxRooms) => (
                <div
                  className="rooms-of-floor"
                  key={maxRooms.map(({ number }) => number)
                    .join('.')}
                >
                  {maxRooms.map((flat) => (
                    <div className="flat-container" key={flat.number}>
                      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
                      <div
                        role="button"
                        className={`flat ${String(flat.type)} ${flat.id && selectedRoomIds.includes(flat.id) ? 'selected' : ''}`}
                        /* @ts-ignore */
                        onClick={onSelectRoom
                          ? (ev) => {
                            ev.stopPropagation();
                            onSelectRoom(flat);
                          } : null}
                      >
                        {flat.number}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
