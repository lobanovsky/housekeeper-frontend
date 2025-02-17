import React, { useCallback, useContext, useMemo } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Button, Card, Empty, Tooltip, Typography } from 'antd';
import { InfoCircleTwoTone, PlusOutlined } from '@ant-design/icons';

import { AccessResponse, EnumRoomVOType } from 'backend/services/backend';
import Loading from 'components/loading';
import { DictionariesContext } from 'context/AppContext';
import { getIsAdmin } from 'store/selectors/auth';
import { RoomTypeNames } from 'utils/constants';
import { getRandomId } from 'utils';
import { AccessItem } from './components/access-item';
import { showAddAccessItemModal } from './components/access-add-modal';
import { FlatOwnerInfo } from './components/owner-property';
import { AccessContext, IAccessContext } from './context/AccessContext';
import { useRoomInfo } from './hooks/use-room-info';
import './styles.scss';

export function FlatInfo() {
  const { roomId: selectedRoomStr = '' } = useParams();
  const { areas } = useContext(DictionariesContext);

  const isAdmin = useSelector(getIsAdmin);

  const {
    roomInfo: {
      roomInfo,
      accesses,
      ownerProperty,
      building
    },
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
        roomInfo,
        building,
        reloadFlatInfo: reloadInfo,
        grantedAreas
      }
    }),
    [
      reloadInfo,
      roomInfo.ownerName,
      roomInfo.number,
      ownerId,
      building?.name,
      building?.type,
      grantedAreas.map((area) => area.id)
        .join(',')]
  );

  const allAccessesAreasCount = useMemo<number>(() => {
    const targetLength = accesses.length ? (accesses[0].areas?.length || 1) : 1;
    const allLengthSame = accesses.every((a) => (a.areas || []).length === targetLength);
    return allLengthSame ? targetLength : 0;
  }, [accesses.map((a) => `${a.accessId}-${(a.areas || []).length}`)]);

  const showAccessAddModal = useCallback(() => {
    showAddAccessItemModal(flatContextState.value);
  }, [flatContextState.changeId]);

  // @ts-ignore
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
                {grantedAreas.length && isAdmin ? (
                  <Button
                    type="link"
                    size="small"
                    className="add-btn"
                    onClick={showAccessAddModal}
                  >
                    {/* @ts-ignore */}
                    <PlusOutlined />
                    {/* добавить */}
                  </Button>
                ) : (
                  <Tooltip title="За выдачей доступов обращайтесь к администратору">
                    {/* @ts-ignore */}
                    <InfoCircleTwoTone style={{ fontSize: '12px' }} twoToneColor="#C7C7C7" />
                  </Tooltip>
                )}
              </div>
              {accesses.length ? (
                <div className={`accesses-list ${allAccessesAreasCount ? `same-length length-${allAccessesAreasCount}` : ''}`}>
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
