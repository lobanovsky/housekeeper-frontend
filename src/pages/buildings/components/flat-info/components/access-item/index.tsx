import React, { useContext, useMemo } from 'react';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { KeyVO } from 'backend/services/backend';
import { DictionariesContext } from 'context/AppContext';
import { CarFrontIcon } from 'icons/car_front';
import { AreaNames } from 'utils/constants';
import { useAccessItemCRUD } from './hooks';
import { showAddAccessItemModal } from '../access-add-modal';
import { AccessContext } from '../../context/AccessContext';
import './styles.scss';
import { LetterAIcon } from '../../../../../../icons/letter_a';

export function AccessItem({ accessInfo }: { accessInfo: KeyVO }) {
  const { areas } = useContext(DictionariesContext);
  const contextValue = useContext(AccessContext);
  const { ownerId, flatNumber, reloadFlatInfo } = contextValue;

  const {
    id = 0, phoneLabel = '', phoneNumber, areas: infoAreas = [], cars = []
  } = accessInfo;

  const sortedAreas = useMemo(
    () => infoAreas.sort((a1, a2) => (a1.id || 0) - (a2.id || 0)),
    [infoAreas.length]
  );

  const { isDeleting, deleteAccessItem } = useAccessItemCRUD({ accessId: id || 0, onFinish: reloadFlatInfo });
  return (
    <div className="access-item" key={id}>
      <div className="access-info">
        <div className="phone-and-areas">
          <div className="phone-container">
            {/* <div className="phone-index">{index + 1}.</div> */}
            <div className="phone-number">
              {phoneNumber}
            </div>
          </div>
          <div className="area-icons">
            {sortedAreas.map(({ id: areaId = 0, tenant = false, places = [] }) => (
              <div key={areaId} className={`access-icon type-${areaId}`}>
                <div className="icon">
                  {AreaNames[areaId]?.icon || String(areaId)}
                </div>
                {tenant && <span className="tenant-icon"><LetterAIcon /></span>}
                {!!places.length && <div className="places">{places.join(', ')}</div>}
              </div>
            ))}
          </div>

        </div>
        {!!phoneLabel && <div className={`phone-label ${phoneLabel ? 'has-label' : ''}`}>{phoneLabel || ''}</div>}
        <div className="cars">
          {cars.map(({ description = '', number = '' }) => (
            <div className="car" key={number}>
              <CarFrontIcon className="car-icon" />
              <span className="car-number">{number}</span>
              <span className="car-description">{description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="access-actions">
        <Button
          type="link"
          size="small"
          onClick={() => {
            showAddAccessItemModal({
              reloadInfo: reloadFlatInfo, accessInfo, ownerId, areas, flatNumber
            });
          }}
        >
          <EditOutlined />
        </Button>
        <Popconfirm title="Удалить доступ?" onConfirm={deleteAccessItem}>
          <Button type="link" size="small">
            {isDeleting ? <LoadingOutlined /> : <DeleteOutlined />}
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
