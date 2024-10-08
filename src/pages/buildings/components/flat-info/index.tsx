import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AccessResponse, AccessService, EnumRoomVOType, RoomService, RoomVO } from 'backend/services/backend';
import useRemoteData from 'hooks/use-remote-data';
import { DictionariesContext } from '../../../../context/AppContext';
import { AccessItem } from './components/access-item';
import { showAddAccessItemModal } from './components/access-add-modal';
import { AccessContext } from './context/AccessContext';
import './styles.scss';

// todo убрать
const OWNER_ID = 25;

export function FlatInfo() {
  const { roomId: selectedRoomStr = '' } = useParams();
  const roomLoader = useCallback(() => RoomService.getRoomById({ id: parseInt(selectedRoomStr, 10) || 0 }), [selectedRoomStr]);
  const accessesLoader = useCallback(() => AccessService.findByRoom({
    roomId: parseInt(selectedRoomStr, 10) || 0,
    active: true
  }), [selectedRoomStr]);

  const [flatParams, isLoadingFlatParams, loadFlatParams] = useRemoteData<RoomVO, RoomVO>(roomLoader);
  const [accesses, isLoadingFlatInfo, loadFlatInfo] = useRemoteData<AccessResponse[]>(accessesLoader);

  const { areas } = useContext(DictionariesContext);

  const flatContextValue = useMemo(() => ({
    // todo убрать ownerId
    ownerId: OWNER_ID,
    flatNumber: flatParams?.number || '',
    reloadFlatInfo: loadFlatInfo
  }), [loadFlatInfo, flatParams?.number]);

  const showAccessAddModal = useCallback(() => {
    showAddAccessItemModal({
      accesses: [],
      reloadInfo: loadFlatInfo,
      ownerId: OWNER_ID,
      areas
    });
  }, [flatParams?.number, loadFlatInfo]);

  useEffect(() => {
    const roomId = parseInt(selectedRoomStr, 10);
    if (roomId) {
      loadFlatParams();
      loadFlatInfo();
    }
  }, [selectedRoomStr]);

  return (
    <AccessContext.Provider value={flatContextValue}>
      <Card
        size="small"
        className="flat-info-card"
        loading={isLoadingFlatInfo || isLoadingFlatParams}
        title={(
          <div className="flat-title card-title">
            <Typography.Title level={5}>
              {flatParams?.type === EnumRoomVOType.GARAGE && 'М/м '}
              {flatParams?.type === EnumRoomVOType.FLAT && 'Кв.'}
              {flatParams?.type === EnumRoomVOType.OFFICE && 'Офис '}
              {flatParams?.number}
            </Typography.Title>
            <div
              className="address"
            >
              {flatParams?.street && flatParams?.building ? `${flatParams?.street}, д. ${flatParams?.building}` : ''}
            </div>
          </div>
        )}
      >
        <div className="flat-info">
          { /* todo ?? */}
          { /* <FlatOwnerInfo owner={accesses?.owner} /> */}
          {flatParams?.ownerName || ''}
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
            {!(accesses?.keys || []).length && <span className="emtpy-placeholder">не указаны</span>}
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
