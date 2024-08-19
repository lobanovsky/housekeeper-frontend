import { useCallback, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { getRandomId } from "utils/utils";
import "./style.scss";
import { MaskedInput } from "antd-mask-input";


interface PhoneItem {
  phone: string,
  isValid?: boolean,
  id: number
}

const EmptyPhone = (): PhoneItem => ({
  phone: "",
  isValid: false,
  id: getRandomId()
});


export const PhoneRegex = /^\+7(\s)?\(\d{3}\)(\s)?\d{3}-\d{2}-\d{2}$/;

export type PhonesChangeHandlerArg = { phones: string[], isValid: boolean, changeId: string };

const getPhonesChangeId = (phones: PhoneItem[]) => phones.map(({ phone, id }) => `${id}-${phone}`).join(",");

export const PhonesSelector = ({ onChangePhones }: {
  onChangePhones: (param: PhonesChangeHandlerArg) => void
}) => {
  const [phones, setPhones] = useState<{ phones: PhoneItem[], changeId: string }>({
    phones: [EmptyPhone()],
    changeId: ""
  });
  // const phonesChangeId = useMemo(() => getRandomId(), [
  //   phones.map(({ phone, id }) => `${id}-${phone}`).join(",")
  // ]);

  const addPhone = useCallback(() => {
    setPhones(prev => {
      const newPhone = EmptyPhone();
      const newPhones = prev.phones.concat(newPhone);
      const newChangeId = `${prev.changeId},${newPhone.id}-${newPhone.phone}`;

      return ({
        changeId: newChangeId,
        phones: newPhones
      });
    });
  }, []);

  const onChangePhone = useCallback((value: PhoneItem) => {
    const newPhones = phones.phones.map(item => ({ ...item }));
    const phoneIndex = newPhones.findIndex(({ id }) => id === value.id);
    newPhones[phoneIndex].phone = value.phone;
    const newChangeId = getPhonesChangeId(newPhones);

    const isPhonesValid = newPhones.every(({ phone }) => PhoneRegex.test(phone));
    const phonesArr = newPhones.map(({ phone }) => phone);
    setPhones(({
      changeId: newChangeId,
      phones: newPhones
    }));
    onChangePhones({ phones: phonesArr, isValid: isPhonesValid, changeId: newChangeId });
  }, [phones.changeId]);

  return (
    <div className="phones-selector">
      {phones.phones.map(({ phone, id, isValid }) =>
          <MaskedInput
            key={id}
            allowClear
            mask={"+7 (000) 000-00-00"}
            value={phone} onChange={({ target: { value } }) => {
            onChangePhone({
              id,
              phone: value
            });
          }}
          />
        //
        //   <Input
        //   value={phone} onChange={({ target: { value } }) => {
        //   onChangePhone({
        //     id,
        //     phone: value
        //   });
        // }}
        // />
      )
      }
      <Button size="small" type="link" onClick={addPhone}><PlusOutlined />добавить телефон</Button>
    </div>
  );
};
