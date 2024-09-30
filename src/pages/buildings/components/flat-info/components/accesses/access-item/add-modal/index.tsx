import React, { useCallback, useMemo, useState } from "react";
import { Button, Checkbox } from "antd";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import {
  AccessCreateRequest,
  AccessService,
  AccessUpdateRequest,
  AreaVO,
  CarVO,
  EnumAreaType,
  EnumBuildingType,
  KeyVO
} from "backend/services/backend";
import Loading from "components/loading";
import { useLoading } from "hooks/use-loading";

import { AreaNames } from "utils/constants";
import { showModal } from "utils/modals";
import { showError } from "utils/notifications";
import { EmptyFunction } from "utils/types";
import { getRandomId } from "utils/utils";
import { PhoneItem, PhoneItemValues } from "./phone-item";
import { CarNumberRegex, PhoneRegexes } from "../../constants";
import "./styles.scss";
import { convertCars } from "./utils";


interface AccessFormProps {
  accessInfo?: KeyVO,
  areas: AreaVO[],
  buildingType?: EnumBuildingType,
  flatNumber: string;
  reloadInfo: EmptyFunction,
  ownerId: number
}

const AddAccessForm = ({ reloadInfo, closeModal, ownerId, areas: allAreas, accessInfo = undefined }: AccessFormProps & {
  closeModal: EmptyFunction,
}) => {
  const isEdit = Object.keys(accessInfo || {}).length > 0;

  const [loading, showLoading, hideLoading] = useLoading();
  const [selectedAreaIds, setSelectedAreas] = useState<number[]>((accessInfo?.areas || []).map(({ id = 0 }) => id));


  const [accesses, setAccesses] = useState<PhoneItemValues[]>([accessInfo ? { ...accessInfo } : {
    id: getRandomId()
  }]);

  const areaOptions = useMemo(() => allAreas.map(({ id = 0, type = "" }) => ({
    value: id,
    label: (
      <span>
          {AreaNames[type as EnumAreaType]?.title || type}
        {AreaNames[type as EnumAreaType]?.icon ? <span className={`icon ${type}`}>
            {AreaNames[type as EnumAreaType]?.icon}
          </span> : ""}
        </span>
    )
  })), [allAreas.length]);


  const accessesState = useMemo(() => {
    const isValidAreas = !!selectedAreaIds.length;
    const isValidAccesses = accesses.every(({
                                              phoneNumber = "",
                                              cars = []
                                            }) => PhoneRegexes.some(regex => regex.test(phoneNumber))
      && cars.every(({ number: carNumber = "" }) => CarNumberRegex.test(carNumber)));

    return ({
      changeId: getRandomId(),
      isValid: isValidAreas && isValidAccesses
    });
  }, [
    accesses.map(({ phoneNumber, phoneLabel, tenant, cars = [] }) =>
      `${phoneNumber}-${phoneLabel}-${tenant}-${(cars || []).map(({
                                                                    id = 0,
                                                                    number = "",
                                                                    description = ""
                                                                  }) => `${id}-${number}-${description}`).join(",")}`).join(";")]);

  const addEmptyRow = useCallback(() => {
    // @ts-ignore
    setAccesses(prev => prev.concat([{ id: getRandomId(), phoneNumber: "", cars: [] }]));
  }, []);

  const onChangeAccess = useCallback((accessId: number, fieldName: keyof PhoneItemValues, value: string | boolean | CarVO[]) => {
    const accessIndex = accesses.findIndex(item => item.id === accessId);
    if (accessIndex < 0) {
      return;
    }

    setAccesses(prev => {
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
      const dataToSave: AccessUpdateRequest = {
        label: access.phoneLabel,
        tenant: access.tenant || false,
        areas: selectedAreaIds,
        cars: convertCars(access.cars || [])
      };

      promise = AccessService.updateAccess({ accessId: access.id || 0, body: dataToSave });
    } else {
      const dataToSave: AccessCreateRequest = {
        areas: selectedAreaIds,
        person: {
          ownerId,
          phones: accesses.map(phone => ({
            number: phone.phoneNumber,
            label: phone.phoneLabel,
            tenant: phone.tenant || false,
            cars: convertCars(phone.cars || [])
          }))
        }
      };
      promise = AccessService.createAccess({ body: dataToSave });
    }

    showLoading();
    promise
      .then(() => {
        closeModal();
        reloadInfo();
      })
      .catch(e => {
        hideLoading();
        showError("Не удалось сохранить доступ", e);
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
      {/* @ts-ignore*/}
      <Checkbox.Group value={selectedAreaIds} onChange={onChangeAreas} options={areaOptions} />
      <div className="sub-header phones">Кому</div>
      {accesses.map((item, index) => (
        <PhoneItem
          key={item.id}
          isEdit={isEdit}
          access={item}
          onChangeAccess={onChangeAccess}
        />
      ))}
      {!isEdit &&
        <Button type="link" className="add-btn" size="small" onClick={addEmptyRow}>
          <PlusOutlined />
          добавить телефон
        </Button>}
      <div className="footer">
        <Button type="primary" onClick={saveAccess} disabled={loading || !accessesState.isValid}><SaveOutlined />Сохранить</Button>
        <Button onClick={closeModal}><CloseOutlined />Отмена</Button>
      </div>
    </div>
  );

};

export const showAddAccessItemModal = (props: AccessFormProps) => {
  showModal({
    width: 1000,
    className: "phone-add-modal",
    title: `Доступы для кв. ${props.flatNumber}`,
    closable: true,
    getContent: ({ closeModal }) => <AddAccessForm {...props} closeModal={closeModal} />
  });
};
