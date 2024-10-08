import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
    ownerId,
    loading
  } = useRoomInfo({ roomId: parseInt(selectedRoomStr, 10) });

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

  useEffect(() => {

  }, []);

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
          <div className="flat-accesses">
            <div className="access-header">
              <Typography.Title level={5}>Доступы</Typography.Title>
              <Button
                type="link"
                size="small"
                className="add-btn"
                onClick={showAccessAddModal}
              >
                <PlusOutlined />
                добавить
              </Button>
            </div>
            {!(accesses?.keys || []).length && (
              <span className="emtpy-placeholder">не указаны</span>
            )}
            <div style={{ padding: '4px 0' }} />
            {(accesses || []).map((accessInfo: AccessResponse) => (
              <AccessItem key={accessInfo.accessId} accessInfo={accessInfo} />
            ))}
          </div>
        </div>
      </Card>
    </AccessContext.Provider>
  );
}
