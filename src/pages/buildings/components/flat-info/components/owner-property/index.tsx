import React from 'react';
import { EnumRoomVOType, OwnerVO, RoomVO } from 'backend/services/backend';
import { OwnerIcon } from 'icons/owner';
import './styles.scss';

export const EmptyOwner: OwnerVO = {
  fullName: '',
  rooms: [],
  active: false,
  dateOfLeft: ''
};

export function FlatOwnerInfo({ owner: { fullName = '', rooms = [] } = EmptyOwner }: {
  owner: OwnerVO | undefined
}) {
  return (
    <div className="flat-owner-info">
      <div className="owner-name-container">
        <OwnerIcon className="owner-icon" />
        {' '}
        <span className="owner-name">{fullName}</span>
      </div>
      <div className="owner-property">
        {rooms.map(({ type, number }: RoomVO) => (
          <div key={number} className={`property-item ${type}`}>
            {type === EnumRoomVOType.GARAGE && 'мм. '}
            {type === EnumRoomVOType.FLAT && 'кв. '}
            {type === EnumRoomVOType.OFFICE && 'оф. '}
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
