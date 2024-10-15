import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Button } from 'antd';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { AccessService, UpdateAccessRequest } from 'backend/services/backend';
import Loading from 'components/loading';
import { CarNumberRegex, PhoneRegexes } from 'pages/buildings/constants';
import { getRandomId, showError, showModal, useLoading } from 'utils';
import { AccessValues, EmptyFunction } from 'utils/types';
import { phoneNumberRenderer } from 'utils/renderers';
import { RoomTypeNames } from 'utils/constants';
import { IAccessContext } from '../../context/AccessContext';
import { convertAccessFromBackendToForm, convertAreasForBackend, convertCarsForBackend } from './utils';
import { AccessFieldValue, AccessItemForm } from './access-item-form';
import './styles.scss';

interface AccessFormProps extends IAccessContext {
  access?: AccessValues,
}

function AddAccessForm(props: AccessFormProps & { closeModal: EmptyFunction, }) {
  const {
    reloadFlatInfo,
    closeModal,
    ownerId,
    grantedAreas,
    roomInfo: {
      type: roomType,
      ownerName = '',
      number = ''
    },
    access: initialAccess = {
      areaPlaces: {},
      cars: [],
      areaIds: [],
      accessId: 0,
      areas: []
    }
  } = props;

  const isEdit = !!initialAccess?.accessId;
  const [loading, showLoading, hideLoading] = useLoading();

  const [{
    phoneNumber = '',
    phoneLabel = '',
    cars = [],
    areaIds = [],
    tenant = false,
    accessId = 0,
    areaPlaces = {}
  }, setAccessValues] = useState<AccessValues>(convertAccessFromBackendToForm(initialAccess));

  const accessState = useMemo(() => {
    const isValidAccess = !!areaIds.length
      && (isEdit || PhoneRegexes.some((regex) => regex.test(phoneNumber)))
      && cars.every(({ plateNumber = '' }) => CarNumberRegex.test(plateNumber));

    // todo проверять строку areaPlaces на валидность
    return ({
      changeId: getRandomId(),
      isValid: isValidAccess
    });
  }, [
    isEdit,
    tenant,
    phoneNumber,
    phoneLabel,
    areaIds.length,
    (cars || []).map(
      ({
         id = 0,
         plateNumber = '',
         description = ''
       }) => `${id}-${plateNumber}-${description}`
    )
      .join(',')]);

  const onChangeAccess = useCallback((fieldName: keyof AccessValues, value: AccessFieldValue) => {
    setAccessValues((prev) => ({
      ...prev,
      [fieldName]: value
    }));
  }, [accessState.changeId]);

  const saveAccess = useCallback(() => {
    const phoneNumberOnlyDigits = phoneNumber.replace(/\D/g, '');
    const dataToSave: UpdateAccessRequest = {
      phoneLabel,
      tenant,
      areas: convertAreasForBackend(areaIds, areaPlaces),
      cars: convertCarsForBackend(cars || [])
    };

    const promise = isEdit
      ? AccessService.updateAccess({
        accessId,
        body: dataToSave
      }) : AccessService.createAccess({
        body: {
          ownerId,
          accesses: [{
            ...dataToSave,
            phoneNumber: phoneNumberOnlyDigits
          }]
        }
      });

    showLoading();
    promise
      .then(() => {
        closeModal();
        reloadFlatInfo();
      })
      .catch((e) => {
        hideLoading();
        showError('Не удалось сохранить доступ', e);
      });
  }, [
    reloadFlatInfo,
    accessState.changeId
  ]);

  return (
    <div className="access-add-form">
      {loading && <Loading />}
      <Alert
        type="info"
        description={(
          <>
            <span style={{ fontWeight: 500 }}>Выдаёт:&nbsp;</span>
            {`${ownerName} (${roomType ? RoomTypeNames[roomType] : ''} ${number})`}
          </>
        )}
      />
      <AccessItemForm
        key={accessId}
        isEdit={isEdit}
        onChangeAccess={onChangeAccess}
        grantedAreas={grantedAreas}
        access={{
          phoneNumber,
          phoneLabel,
          cars,
          areaPlaces,
          areaIds,
          tenant,
          accessId
        }}
      />
      <div className="footer">
        <Button type="primary" onClick={saveAccess} disabled={loading || !accessState.isValid}>
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
  const { access } = props;

  const isEdit = !!props.access?.accessId;
  showModal({
    width: 800,
    className: 'phone-add-modal',
    // eslint-disable-next-line max-len
    title: isEdit ? `Доступ для ${phoneNumberRenderer(access?.phoneNumber)}${access?.phoneLabel ? ` (${access.phoneLabel})` : ''}` : 'Новый доступ',
    closable: true,
    // eslint-disable-next-line react/jsx-props-no-spreading
    getContent: ({ closeModal }) => <AddAccessForm {...props} closeModal={closeModal} />
  });
};
