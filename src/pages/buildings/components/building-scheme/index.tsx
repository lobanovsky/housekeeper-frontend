import React, { useCallback, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { Skeleton } from 'antd';
import { Building, BuildingService, RoomVO } from 'backend/services/backend';

import useRemoteData from 'hooks/use-remote-data';
import { BuildingPlan } from './plan';
import './styles.scss';

export function BuildingScheme() {
  const { buildingId: buildingIdStr = '', roomId: roomIdStr = '' } = useParams();
  const navigate = useNavigate();
  const buildingLoader = useCallback(() => BuildingService.findById({ id: parseInt(buildingIdStr, 10) }), [buildingIdStr]);

  const [building, isLoadingBuilding, loadBuilding] = useRemoteData<Building, Building>(buildingLoader);

  const selectedRoomIds = useMemo(() => {
    const roomId = parseInt(roomIdStr, 10);
    return roomId ? [roomId] : [];
  }, [roomIdStr]);

  useEffect(() => {
    loadBuilding();
  }, [buildingIdStr]);

  const onRoomClick = useCallback((room: RoomVO) => {
    navigate(`/buildings/${building?.id}/rooms/${room.id}`);
  }, [building?.id]);

  // @ts-ignore
  return (
    <div className={`building-plan ${building?.type} ${isLoadingBuilding ? 'loading' : ''}`}>
      {isLoadingBuilding && <Skeleton active />}
      {!isLoadingBuilding && !!building?.id && (
        <div className="plan-container">
          <BuildingPlan
            /* @ts-ignore */
            building={building}
            onSelectRoom={onRoomClick}
            selectedRoomIds={selectedRoomIds}
          />
          <Outlet />
          {/* {selectedFlat?.id && <div className="flat-info"><FlatInfo areas={areas} flat={selectedFlat} /></div>} */}
        </div>
      )}
    </div>
  );
}
