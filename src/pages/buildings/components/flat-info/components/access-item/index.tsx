import React, { useContext, useMemo } from 'react';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { AccessResponse } from 'backend/services/backend';
import { DictionariesContext } from 'context/AppContext';
import { CarFrontIcon } from 'icons/car_front';
import { AreaNames } from 'utils/constants';
import { AccessValues } from 'utils/types';
import { getRandomId } from 'utils/utils';
import { useAccessItemCRUD } from './hooks';
import { showAddAccessItemModal } from '../access-add-modal';
import { AccessContext } from '../../context/AccessContext';

import './styles.scss';

export function AccessItem({ accessInfo }: { accessInfo: AccessResponse }) {
  const { areas } = useContext(DictionariesContext);
  const contextValue = useContext(AccessContext);
  const { ownerId, flatNumber, reloadFlatInfo } = contextValue;

  const accessValues = useMemo(() => {
    const result: AccessValues = {
      ...accessInfo,
      cars: (accessInfo.cars || []).map((car) => ({
        ...car,
        id: getRandomId(),
        isNew: false
      }))
    };

    return result;
  }, [accessInfo.phoneNumber]);

  const {
    accessId = 0, phoneLabel = '', phoneNumber, areas: infoAreas = [], cars = []
  } = accessInfo;

  const sortedAreas = useMemo(
    () => infoAreas.sort((a1, a2) => (a1.areaId || 0) - (a2.areaId || 0)),
    [infoAreas.length]
  );

  const { isDeleting, deleteAccessItem } = useAccessItemCRUD({ accessId, onFinish: reloadFlatInfo });
  return (
    <div className="access-item" key={accessId}>
      <div className="access-info">
        <div className="phone-and-areas">
          <div className="phone-container">
            {/* <div className="phone-index">{index + 1}.</div> */}
            <div className="phone-number">
              {phoneNumber}
            </div>
          </div>
          <div className="area-icons">
            {sortedAreas.map(({ areaId = 0, places = [] }) => (
              <div key={areaId} className={`access-icon type-${areaId}`}>
                <div className="icon">
                  {AreaNames[areaId]?.icon || String(areaId)}
                </div>
                { /* {tenant && <span className="tenant-icon"><LetterAIcon /></span>} */}
                {!!places.length && <div className="places">{places.join(', ')}</div>}
              </div>
            ))}
          </div>

        </div>
        {!!phoneLabel && <div className={`phone-label ${phoneLabel ? 'has-label' : ''}`}>{phoneLabel || ''}</div>}
        <div className="cars">
          {cars.map(({ description = '', plateNumber = '' }) => (
            <div className="car" key={plateNumber}>
              <CarFrontIcon className="car-icon" />
              <span className="car-number">{plateNumber}</span>
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
              reloadInfo: reloadFlatInfo, accesses: [accessValues], ownerId, areas
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
