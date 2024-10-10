import React, { useContext, useMemo } from 'react';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { AccessResponse, CarResponse } from 'backend/services/backend';
import { CarFrontIcon } from 'icons/car_front';
import { LetterAIcon } from 'icons/letter_a';
import { AreaNames } from 'utils/constants';
import { addRandomIdToData } from 'utils/utils';
import { useAccessItemCRUD } from './hooks';
import { showAddAccessItemModal } from '../access-add-modal';
import { AccessContext } from '../../context/AccessContext';
import './styles.scss';
import { phoneNumberRenderer } from '../../../../../../utils/renderers';
import { AccessValues } from '../../../../../../utils/types';

export function AccessItem({ access }: { access: AccessResponse }) {
  const contextValue = useContext(AccessContext);
  const {
    reloadFlatInfo,
    grantedAreas
  } = contextValue;

  const accessValues = useMemo<AccessValues>(() => ({
    ...access,
    areaIds: (access.areas || []).map(({ areaId = 0 }) => areaId),
    cars: addRandomIdToData<CarResponse>(access.cars || [])
  }), [access.phoneNumber,
    access.tenant,
    access.phoneLabel,
    (access.areas || [])
      .map((area) => `${area.areaId}-${(area.places || []).join(',')}`)
      .join('-'),
    (access.cars || [])
      .map(({
              plateNumber = '',
              description = ''
            }) => `${plateNumber}-${description}`)
      .join(',')]);

  const {
    accessId = 0,
    phoneLabel = '',
    phoneNumber,
    areas: infoAreas = [],
    cars = []
  } = access;

  const sortedAreas = useMemo(
    () => infoAreas.sort((a1, a2) => (a1.areaId || 0) - (a2.areaId || 0)),
    [infoAreas.length]
  );

  const {
    isDeleting,
    deleteAccessItem
  } = useAccessItemCRUD({
    accessId,
    onFinish: reloadFlatInfo
  });
  return (
    <div className="access-item" key={accessId}>
      <div className="access-info">
        <div className="phone-and-areas">
          <div className="phone-number">{phoneNumberRenderer(phoneNumber)}</div>
          <div className="area-icons">
            {sortedAreas.map(({
                                areaId = 0,
                                places = []
                              }) => (
              <div key={areaId} className={`access-icon type-${areaId}`}>
                <div className="icon">
                  {AreaNames[areaId]?.icon || String(areaId)}
                </div>
                {!!access.tenant && <span className="tenant-icon"><LetterAIcon /></span>}
                {!!places.length && <div className="places">{places.join(', ')}</div>}
              </div>
            ))}
          </div>

        </div>
        {!!phoneLabel && <div className={`phone-label ${phoneLabel ? 'has-label' : ''}`}>{phoneLabel || ''}</div>}
        <div className="cars">
          {cars.map(({
                       description = '',
                       plateNumber = ''
                     }) => (
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
              reloadFlatInfo,
              access: accessValues,
              ownerId: access.ownerId || 0,
              grantedAreas
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
