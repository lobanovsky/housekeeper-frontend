import { KeyVO } from "backend/services/backend";
import React, { useCallback } from "react";
import { MaskedInput } from "antd-mask-input";
import { Checkbox, Input, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import "./styles.scss";

export interface PhoneItemValues extends KeyVO {
  isValid?: boolean;
}

interface PhoneItemProps {
  access: PhoneItemValues,
  isEdit?: boolean,
  onChangeAccess: (accessId: number, fieldName: keyof PhoneItemValues, value: string | boolean) => void
}

export const PhoneItem = ({
                            isEdit = false,
                            access = { cars: [], tenant: false, phoneNumber: "", phoneLabel: "" },
                            onChangeAccess
                          }: PhoneItemProps) => {

  const onChangePhoneNumber = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess(access.id || 0, "phoneNumber", value);
  }, [onChangeAccess, access.id]);

  const onChangeTenant = useCallback(({ target: { checked } }: CheckboxChangeEvent) => {
    onChangeAccess(access.id || 0, "tenant", checked);
  }, [onChangeAccess, access.id]);

  const onChangeLabel = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChangeAccess(access.id || 0, "phoneLabel", value);
  }, [onChangeAccess, access.id]);

  return (
    <div className={`phone-item ${isEdit ? "is-edit" : ""}`}>
      <div className="phone-number">
        {isEdit ? <Typography.Text>{access.phoneNumber}</Typography.Text> : <MaskedInput
          disabled={isEdit}
          key={access.id}
          size="small"
          className={!access.isValid ? "invalid" : ""}
          allowClear
          placeholder="Номер телефона"
          mask={"+7 (000) 000-00-00"}
          value={access.phoneNumber} onChange={onChangePhoneNumber}
        />}

      </div>
      <Checkbox checked={access.tenant} onChange={onChangeTenant}>Арендатор</Checkbox>
      <Input size="small" value={access.phoneLabel} placeholder="Кто это?" onChange={onChangeLabel} />
      {/*todo cars*/}
    </div>
  );
};
