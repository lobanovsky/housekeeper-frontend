import React, { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Popover, Tooltip } from 'antd';
import { AccessResponse, CarResponse } from 'backend/services/backend';
import { RoomTypeNames } from 'utils/constants';
import { addRandomIdToData } from 'utils/utils';
import { AccessValues } from 'utils/types';
import { phoneNumberRenderer } from 'utils/renderers';

import { getIsAdmin } from 'store/selectors/auth';
import { showAddAccessItemModal } from '../access-add-modal';
import { AccessContext } from '../../context/AccessContext';
import { AccessAreas, AccessGateHistory, AccessItemCars } from './components';
import { useAccessItemCRUD } from './hooks';
import './styles.scss';

export function AccessItem({ access }: { access: AccessResponse }) {
  const context = useContext(AccessContext);
  const isAdmin = useSelector(getIsAdmin);

  const {
    isDeleting,
    deleteAccessItem
  } = useAccessItemCRUD({
    accessId: access.accessId || 0,
    // eslint-disable-next-line react/destructuring-assignment
    onFinish: context.reloadFlatInfo
  });

  const {
    phoneLabel = '',
    phoneNumber = '',
    tenant = false,
    areas: accessAreas = [],
    cars = []
  } = access;

  const flatNumber = useMemo(
    // eslint-disable-next-line react/destructuring-assignment
    () => `${context.roomInfo?.type ? RoomTypeNames[context.roomInfo.type] : ''} ${context.roomInfo?.number}`,
    // eslint-disable-next-line react/destructuring-assignment
    [context.roomInfo?.type]
  );

  const accessValues = useMemo<AccessValues>(() => ({
    ...access,
    areaIds: (access.areas || []).map(({ areaId = 0 }) => areaId),
    cars: addRandomIdToData<CarResponse>(access.cars || [])
  }), [
    access.phoneNumber,
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

  return (
    <div className="access-item">
      <div className="access-info">
        <AccessAreas areas={accessAreas} />
        <div className="access-user-info">
          <div className="phone-number-container">
            <Popover
              destroyTooltipOnHide
              content={<AccessGateHistory phoneNumber={phoneNumber || ''} flatNumber={flatNumber} />}
              trigger={['click']}
            >
              <div className="phone-number">
                {phoneNumberRenderer(phoneNumber, true)}
                {tenant && <Tooltip mouseEnterDelay={0.2} title="Арендатор"><span className="tenant-icon">А</span></Tooltip>}
              </div>
            </Popover>
            {/* eslint-disable-next-line react/jsx-no-undef */}

          </div>
          {!!phoneLabel && <div className={`phone-label ${phoneLabel ? 'has-label' : ''}`}>{phoneLabel || ''}</div>}
          <AccessItemCars cars={cars} />
        </div>
      </div>
      {isAdmin && (
        <div className="access-actions">
          <Button
            type="link"
            size="small"
            onClick={() => {
              showAddAccessItemModal({
                ...context,
                access: accessValues
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
      )}

    </div>
  );
}
