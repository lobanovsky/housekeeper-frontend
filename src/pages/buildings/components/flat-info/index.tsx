import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Empty, Tooltip, Typography } from 'antd';
import { InfoCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { AccessResponse, EnumRoomVOType } from 'backend/services/backend';
import { DictionariesContext } from 'context/AppContext';
import { RoomTypeNames } from 'utils/constants';
import { AccessItem } from './components/access-item';
import { showAddAccessItemModal } from './components/access-add-modal';
import { FlatOwnerInfo } from './components/owner-property';
import { AccessContext } from './context/AccessContext';
import { useRoomInfo } from './hooks/use-room-info';
import './styles.scss';

export function FlatInfo() {
  const { roomId: selectedRoomStr = '' } = useParams();
  const { areas } = useContext(DictionariesContext);

  const {
    roomInfo: { roomInfo, accesses, ownerProperty },
    loadRoomFullInfo,
    grantedAreas,
    ownerId,
    loading
  } = useRoomInfo({ roomId: parseInt(selectedRoomStr, 10), allAreas: areas });

  const reloadInfo = useCallback(() => {
    const parsedRoomId = parseInt(selectedRoomStr, 10);
    loadRoomFullInfo(parsedRoomId);
  }, [loadRoomFullInfo, selectedRoomStr]);

  const flatContextValue = useMemo(
    () => ({
      ownerId,
      flatNumber: roomInfo.number || '',
      reloadFlatInfo: reloadInfo
    }),
    [reloadInfo, roomInfo.number, ownerId]
  );

  const showAccessAddModal = useCallback(() => {
    showAddAccessItemModal({
      accesses: [],
      reloadInfo,
      ownerId,
      areas
    });
  }, [roomInfo.number, ownerId, reloadInfo]);

  useEffect(() => {
    const parsedRoomId = parseInt(selectedRoomStr, 10);
    loadRoomFullInfo(parsedRoomId);
  }, [selectedRoomStr]);

  return (
    <AccessContext.Provider value={flatContextValue}>
      <Card
        size="small"
        className="flat-info-card"
        loading={loading}
        title={(
          <div className="flat-title card-title">
            <Typography.Title level={5}>
              {RoomTypeNames[roomInfo.type as EnumRoomVOType]}
              {roomInfo.number}
            </Typography.Title>
            <div className="address">
              {roomInfo.street && roomInfo.building
                ? `${roomInfo.street}, д. ${roomInfo.building}`
                : ''}
            </div>
          </div>
        )}
      >
        <div className="flat-info">
          <FlatOwnerInfo roomInfo={roomInfo} ownerProperties={ownerProperty} />
          {!loading && (
            <div className="flat-accesses">
              <div className="access-header">
                <Typography.Title level={5}>Доступы</Typography.Title>
                {grantedAreas.length ? (
                  <Button
                    type="link"
                    size="small"
                    className="add-btn"
                    onClick={showAccessAddModal}
                  >
                    <PlusOutlined />
                    добавить
                  </Button>
                ) : <Tooltip title="За выдачей доступов обращайтесь к администратору"><InfoCircleTwoTone twoToneColor="orange" /></Tooltip>}
              </div>
              {accesses.length ? (
                <div className="accesses-list">
                  {accesses.map((accessInfo: AccessResponse) => (
                    <AccessItem key={accessInfo.accessId} access={accessInfo} />
                  ))}
                </div>
              ) : <Empty description="нет доступов" />}
            </div>
          )}
        </div>
      </Card>
    </AccessContext.Provider>
  );
}
