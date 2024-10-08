import React, { useCallback, useMemo, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { CloseOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { AccessService, AreaEntity, CreateAccessRequest, UpdateAccessRequest } from 'backend/services/backend';
import Loading from 'components/loading';
import { useLoading } from 'hooks/use-loading';
import { CarNumberRegex, PhoneRegexes } from 'pages/buildings/constants';
import { AreaNames } from 'utils/constants';
import { showModal } from 'utils/modals';
import { showError } from 'utils/notifications';
import { getRandomId } from 'utils/utils';
import { AccessValues, CarValues, EmptyFunction } from 'utils/types';
import { convertCars } from './utils';
import { PhoneItem } from './phone-item';
import './styles.scss';

interface AccessFormProps {
  accesses: AccessValues[],
  areas: AreaEntity[],
  reloadInfo: EmptyFunction,
  ownerId: number
}

function AddAccessForm(props: AccessFormProps & { closeModal: EmptyFunction, }) {
  const {
    reloadInfo, closeModal, ownerId, areas: allAreas, accesses: initialAccesses = []
  } = props;

  const isEdit = initialAccesses.length > 0;

  const [loading, showLoading, hideLoading] = useLoading();
  // const [selectedAreaIds, setSelectedAreas] = useState<number[]>((accessInfo?.areas || []).map(({ id = 0 }) => id));

  const [accesses, setAccesses] = useState<AccessValues[]>(initialAccesses.length ? [...initialAccesses] : [{
    accessId: getRandomId(),
    cars: []
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
    // const isValidAreas = !!selectedAreaIds.length;
    const isValidAreas = true;
    const isValidAccesses = accesses.every(({
                                              phoneNumber = '',
                                              cars = []
                                            }) => PhoneRegexes.some((regex) => regex.test(phoneNumber))
      && cars.every(({ plateNumber = '' }) => CarNumberRegex.test(plateNumber)));

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
        plateNumber = '',
        description = ''
      }
    ) => `${id}-${plateNumber}-${description}`).join(',')}`).join(';')]);

  const addEmptyRow = useCallback(() => {
    // @ts-ignore
    setAccesses((prev) => prev.concat([{ id: getRandomId(), phoneNumber: '', cars: [] }]));
  }, []);

  const onChangeAccess = useCallback((accessId: number, fieldName: keyof AccessValues, value: string | boolean | CarValues[]) => {
    const accessIndex = accesses.findIndex((item) => item.accessId === accessId);
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
    // setSelectedAreas(checkedValues);
  }, []);

  const saveAccess = useCallback(() => {
    let promise;

    if (isEdit) {
      const access = accesses[0];
      const dataToSave: UpdateAccessRequest = {
        phoneLabel: access.phoneLabel,
        // tenant: access.tenant || false,
        // todo всё поправить
        // areas: selectedAreaIds.map((id) => ({ id })),
        cars: convertCars(access.cars || [])
      };

      promise = AccessService.updateAccess({ accessId: access.accessId || 0, body: dataToSave });
    } else {
      // todo всё поправить
      const dataToSave: CreateAccessRequest = {
        ownerId,
        accesses: accesses.map((phone) => ({
          // todo арии
          areas: [{ areaId: 1 }, { areaId: 2 }],
          // areas: selectedAreaIds.map((id) => ({ id })),
          phoneNumber: phone.phoneNumber,
          contactLabel: phone.phoneLabel,
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
    accessesState.changeId
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
          key={item.accessId}
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
    // todo выводить номер кв или мм
    title: 'Доступы',
    // title: `Доступы для кв. ${props.flatNumber}`,
    closable: true,
    // eslint-disable-next-line react/jsx-props-no-spreading
    getContent: ({ closeModal }) => <AddAccessForm {...props} closeModal={closeModal} />
  });
};
