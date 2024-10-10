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
import { AccessContext, IAccessContext } from './context/AccessContext';
import { useRoomInfo } from './hooks/use-room-info';
import './styles.scss';
import { getRandomId } from '../../../../utils';
import Loading from '../../../../components/loading';

export function FlatInfo() {
  const { roomId: selectedRoomStr = '' } = useParams();
  const { areas } = useContext(DictionariesContext);

  const {
    roomInfo: {
      roomInfo,
      accesses,
      ownerProperty
    },
    loadRoomFullInfo,
    loadAccesses,
    grantedAreas,
    ownerId,
    loading,
    isLoadingAccesses
  } = useRoomInfo({
    roomId: parseInt(selectedRoomStr, 10),
    allAreas: areas
  });

  const reloadInfo = useCallback(() => {
    const parsedRoomId = parseInt(selectedRoomStr, 10);
    loadAccesses(parsedRoomId);
  }, [loadAccesses, selectedRoomStr]);

  const flatContextState = useMemo<{ changeId: number, value: IAccessContext }>(
    () => ({
      changeId: getRandomId(),
      value: {
        ownerId,
        reloadFlatInfo: reloadInfo,
        grantedAreas
      }
    }),
    [reloadInfo, roomInfo.number, ownerId, grantedAreas.map((area) => area.id)
      .join(',')]
  );

  const showAccessAddModal = useCallback(() => {
    showAddAccessItemModal(flatContextState.value);
  }, [flatContextState.changeId]);

  useEffect(() => {
    const parsedRoomId = parseInt(selectedRoomStr, 10);
    loadRoomFullInfo(parsedRoomId);
  }, [selectedRoomStr]);

  return (
    <AccessContext.Provider value={flatContextState.value}>
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
              {isLoadingAccesses && <Loading />}
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
