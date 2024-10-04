import React, { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { CloseOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { AccessService, Area, CarVO, CreateAccessRequest, KeyVO, UpdateAccessRequest } from 'backend/services/backend';
import Loading from 'components/loading';
import { useLoading } from 'hooks/use-loading';
import { CarNumberRegex, PhoneRegexes } from 'pages/buildings/constants';
import { AreaNames } from 'utils/constants';
import { showModal } from 'utils/modals';
import { showError } from 'utils/notifications';
import { EmptyFunction } from 'utils/types';
import { getRandomId } from 'utils/utils';
import { convertCars } from './utils';
import { PhoneItem, PhoneItemValues } from './phone-item';
import './styles.scss';

interface AccessFormProps {
  accessInfo?: KeyVO,
  areas: Area[],
  // eslint-disable-next-line react/no-unused-prop-types
  buildingType?: any,
  // eslint-disable-next-line react/no-unused-prop-types
  flatNumber: string;
  reloadInfo: EmptyFunction,
  ownerId: number
}

function AddAccessForm({
                         reloadInfo, closeModal, ownerId, areas: allAreas, accessInfo = undefined
                       }: AccessFormProps & {
  closeModal: EmptyFunction,
}) {
  const isEdit = Object.keys(accessInfo || {}).length > 0;

  const [loading, showLoading, hideLoading] = useLoading();
  const [selectedAreaIds, setSelectedAreas] = useState<number[]>((accessInfo?.areas || []).map(({ id = 0 }) => id));

  const [accesses, setAccesses] = useState<PhoneItemValues[]>([accessInfo ? { ...accessInfo } : {
    id: getRandomId()
  }]);

  const areaOptions = useMemo(() => allAreas.map(({ id = 0 }) => ({
    value: id,
    label: (
      <span>
          {AreaNames[id]?.title || id}
        {AreaNames[id]?.icon ? <span className={`icon type-${id}`}>{AreaNames[id]?.icon}</span> : ''}
      </span>
    )
  })), [allAreas.length]);

  const accessesState = useMemo(() => {
    const isValidAreas = !!selectedAreaIds.length;
    const isValidAccesses = accesses.every(({
                                              phoneNumber = '',
                                              cars = []
                                            }) => PhoneRegexes.some((regex) => regex.test(phoneNumber))
      && cars.every(({ number: carNumber = '' }) => CarNumberRegex.test(carNumber)));

    return ({
      changeId: getRandomId(),
      isValid: isValidAreas && isValidAccesses
    });
  }, [
    accesses.map((
      {
        phoneNumber, phoneLabel, cars = []
      }
    ) => `${phoneNumber}-${phoneLabel}-${(cars || []).map((
      {
        id = 0,
        number = '',
        description = ''
      }
    ) => `${id}-${number}-${description}`).join(',')}`).join(';')]);

  const addEmptyRow = useCallback(() => {
    // @ts-ignore
    setAccesses((prev) => prev.concat([{ id: getRandomId(), phoneNumber: '', cars: [] }]));
  }, []);

  const onChangeAccess = useCallback((accessId: number, fieldName: keyof PhoneItemValues, value: string | boolean | CarVO[]) => {
    const accessIndex = accesses.findIndex((item) => item.id === accessId);
    if (accessIndex < 0) {
      return;
    }

    setAccesses((prev) => {
      const newAccesses = [...prev];
      // @ts-ignore
      newAccesses[accessIndex][fieldName] = value;
      return newAccesses;
    });
  }, [accessesState.changeId]);

  const onChangeAreas = useCallback((checkedValues: number[]) => {
    setSelectedAreas(checkedValues);
  }, []);

  const saveAccess = useCallback(() => {
    let promise;

    if (isEdit) {
      const access = accesses[0];
      const dataToSave: UpdateAccessRequest = {
        label: access.phoneLabel,
        // tenant: access.tenant || false,
        // todo всё поправить
        areas: selectedAreaIds.map((areaId) => ({ areaId })),
        cars: convertCars(access.cars || [])
      };

      promise = AccessService.updateAccess({ accessId: access.id || 0, body: dataToSave });
    } else {
      const dataToSave: CreateAccessRequest = {
        // todo всё поправить
        areas: selectedAreaIds.map((areaId) => ({ areaId })),
        ownerIds: [ownerId],
        contacts: accesses.map((phone) => ({
          number: phone.phoneNumber,
          label: phone.phoneLabel,
          // tenant: phone.tenant || false,
          cars: convertCars(phone.cars || [])
        }))
      };

      promise = AccessService.createAccess({ body: dataToSave });
    }

    showLoading();
    promise
      .then(() => {
        closeModal();
        reloadInfo();
      })
      .catch((e) => {
        hideLoading();
        showError('Не удалось сохранить доступ', e);
      });
  }, [
    reloadInfo,
    accessesState.changeId,
    selectedAreaIds.length
  ]);

  return (
    <div className="access-add-form">
      {loading && <Loading />}
      <div className="sub-header areas">Куда</div>
      {/* @ts-ignore */}
      <Checkbox.Group value={selectedAreaIds} onChange={onChangeAreas} options={areaOptions} />
      <div className="sub-header phones">Кому</div>
      {accesses.map((item) => (
        <PhoneItem
          key={item.id}
          isEdit={isEdit}
          access={item}
          onChangeAccess={onChangeAccess}
        />
      ))}
      {!isEdit
        && (
          <Button type="link" className="add-btn" size="small" onClick={addEmptyRow}>
            <PlusOutlined />
            добавить телефон
          </Button>
        )}
      <div className="footer">
        <Button type="primary" onClick={saveAccess} disabled={loading || !accessesState.isValid}>
          <SaveOutlined />
          Сохранить
        </Button>
        <Button onClick={closeModal}>
          <CloseOutlined />
          Отмена
        </Button>
      </div>
    </div>
  );
}

export const showAddAccessItemModal = (props: AccessFormProps) => {
  showModal({
    width: 1000,
    className: 'phone-add-modal',
    title: `Доступы для кв. ${props.flatNumber}`,
    closable: true,
    // eslint-disable-next-line react/jsx-props-no-spreading
    getContent: ({ closeModal }) => <AddAccessForm {...props} closeModal={closeModal} />
  });
};
