import React from 'react';
import { EnumRoomVOType, OwnerVO, RoomVO } from 'backend/services/backend';
import { OwnerIcon } from 'icons/owner';
import './styles.scss';
import { RoomTypeNames } from '../../../../../../utils/constants';

export const EmptyOwner: OwnerVO = {
  fullName: '',
  active: false,
  dateOfLeft: ''
};

export function FlatOwnerInfo({ roomInfo, ownerProperties = [] }: {
  roomInfo: RoomVO,
  ownerProperties: RoomVO[],
}) {
  return (
    <div className="flat-owner-info">
      <div className="owner-name-container">
        <OwnerIcon className="owner-icon" />
        {' '}
        <span className="owner-name">{roomInfo.ownerName}</span>
      </div>
      <div className="owner-property">
        {ownerProperties.map(({ type, number }: RoomVO) => (
          <div key={number} className={`property-item ${type}`}>
            {(RoomTypeNames[type as EnumRoomVOType] || '').toLowerCase()}
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
