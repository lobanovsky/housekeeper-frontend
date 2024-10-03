import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { SearchOutlined } from '@ant-design/icons';
import { AccessService, CreateAccessRequest, EnumRoomVOType } from 'backend/services/backend';
import Loading from 'components/loading';
import { useLoading } from 'hooks/use-loading';
import debounce from 'lodash/debounce';
import { showError } from 'utils/notifications';
import './styles.scss';

export function BuildingsSearchForm() {
  const navigate = useNavigate();
  const [loading, showLoading, hideLoading] = useLoading();
  const [searchPhone, setSearchPhone] = useState('');
  const [searchCarNun, setSearchCarNum] = useState('');

  const searchData = useCallback((phone: string = '', carNum: string = '') => {
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 4 && carNum.length < 3) {
      return;
    }

    showLoading();
    (carNum ? AccessService.findByCarNumber({
      carNumber: carNum,
      active: true
    }) : AccessService.findByPhone({ phoneNumber: phoneDigits, active: true }))
      .then((response: CreateAccessRequest) => {
        hideLoading();
        // @ts-ignore
        const { owner: { ownerRooms = [] } = {} } = response || {};
        if (ownerRooms.length > 0) {
          let buildingRoom = ownerRooms.find(({ type = '' }) => type === EnumRoomVOType.FLAT);
          if (!buildingRoom) {
            // eslint-disable-next-line prefer-destructuring
            buildingRoom = ownerRooms[0];
          }

          if (buildingRoom) {
            const url = `/buildings/${buildingRoom.building}/rooms/${buildingRoom.id}`;
            navigate(url);
          }
        }
      })
      .catch((e) => {
        hideLoading();
        showError('Ничего не найдено', e);
      });
  }, []);

  const delayedSearch = useCallback(
    debounce((phone: string, carNum: string) => searchData(phone, carNum), 600),
    []
  );

  const onEnterKeyPressed = useCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    const pressedKeyCode = String(ev.key || ev.keyCode);

    const isEnterKeyPressed = pressedKeyCode === '13' || pressedKeyCode.toLowerCase() === 'enter';

    if (isEnterKeyPressed) {
      searchData(searchPhone, searchCarNun);
    }
  }, [searchPhone, searchCarNun]);

  useEffect(() => {
    delayedSearch(searchPhone, searchCarNun);
  }, [searchPhone, searchCarNun]);

  return (
    <div className="buildings-search" role="button" onKeyUp={onEnterKeyPressed}>
      {loading && <Loading text="Поиск..." />}
      <MaskedInput
        className="phone-number"
        allowClear
        disabled={!!searchCarNun}
        prefix={<SearchOutlined />}
        placeholder="Номер телефона"
        mask="+7 (000) 000-00-00"
        value={searchPhone}
        onChange={({ target: { value } }) => {
          setSearchPhone(value);
          const phoneDigits = value.replace(/\D/g, '');
          if (phoneDigits.length > 1) {
            setSearchCarNum('');
          }
        }}
      />
      <Input
        allowClear
        className="car-number"
        disabled={searchPhone.replace(/\D/g, '').length > 2}
        placeholder="Номер машины"
        value={searchCarNun}
        onChange={({ target: { value } }) => {
          setSearchCarNum(value);

          if (value) {
            setSearchPhone('');
          }
        }}
      />
    </div>
  );
}
