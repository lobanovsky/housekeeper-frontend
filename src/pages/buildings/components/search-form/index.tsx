import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { SearchOutlined } from '@ant-design/icons';
import { AccessService, OverviewResponse } from 'backend/services/backend';
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

  const searchData = useCallback((carNum: string = '') => {
    // const phoneDigits = phone.replace(/\D/g, '');
    // if (phoneDigits.length < 4 && carNum.length < 3) {
    //   return;
    // }

    const carNumStr = carNum.replace(/\s/g, '');
    if (carNum.length < 3) {
      return;
    }

// : AccessService.findByPhone({ phoneNumber: phoneDigits, active: true }))
    showLoading();
    AccessService.overview({
      plateNumber: carNumStr,
      active: true
    }).then((response: OverviewResponse) => {
      // todo починить поиск
      hideLoading();
      const { ownerRooms = [] } = response || {};
      if (ownerRooms.length > 0) {
        debugger;
        // let buildingRoom = ownerRooms.find(({ type = '' }) => type === EnumRoomVOType.FLAT);
        // if (!buildingRoom) {
        //   // eslint-disable-next-line prefer-destructuring
        //   buildingRoom = ownerRooms[0];
        // }
        //
        // if (buildingRoom) {
        //   const url = `/buildings/${buildingRoom.building}/rooms/${buildingRoom.id}`;
        //   navigate(url);
        // }
      }
    })
      .catch((e) => {
        hideLoading();
        showError('Ничего не найдено', e);
      });
  }, []);

  const delayedSearch = useCallback(
    debounce((carNum: string) => searchData(carNum), 600),
    []
  );

  const onEnterKeyPressed = useCallback((ev: React.KeyboardEvent<HTMLInputElement>) => {
    ev.stopPropagation();
    const pressedKeyCode = String(ev.key || ev.keyCode);

    const isEnterKeyPressed = pressedKeyCode === '13' || pressedKeyCode.toLowerCase() === 'enter';

    if (isEnterKeyPressed) {
      searchData(searchCarNun);
    }
  }, [searchPhone, searchCarNun]);

  useEffect(() => {
    delayedSearch(searchCarNun);
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
