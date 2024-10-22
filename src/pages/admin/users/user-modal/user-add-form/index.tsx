import { Button, Checkbox, Input, Radio, Select } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo, useState } from 'react';
import Loading from 'components/loading';
import { EnumUserRequestRole, UserRequest, UserResponse } from 'backend/services/backend';
import { getRandomId } from 'utils/utils';
import { UserSelect } from '../user-select';

// eslint-disable-next-line max-len
const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export enum UserSelectType {
  NEW = 'new',
  EXISTING = 'exist'
}

export interface UserAddFormProps {
  loading: boolean;
  user?: UserResponse;
  roleOptions: React.ReactNode[];
  saveUser: (userValues: UserRequest & { doInvite: boolean, userType: UserSelectType }) => void;
  onCancel: () => void;
}

export function UserAddForm(props: UserAddFormProps) {
  const {
    user = { id: 0 },
    loading,
    roleOptions,
    saveUser,
    onCancel
  } = props;
  const [userType, setUserType] = useState<UserSelectType>(UserSelectType.NEW);
  const [doInvite, setInvite] = useState(false);
  const [values, setValues] = useState<UserRequest>({
    ...user,
    // @ts-ignore
    name: user.name || '',
    // @ts-ignore
    role: user?.role?.roleCode ? user?.role?.roleCode as EnumUserRequestRole : EnumUserRequestRole.USER
  });

  const isEdit = !!user.id;

  const valuesChangeId = useMemo(() => getRandomId(), [
    values.name, values.email, values.role, doInvite
  ]);

  const isValidForm = useMemo(() => {
    // @ts-ignore
    const isValidMainInfo = values.name && values.email && EmailRegex.test(values.email);
    return isValidMainInfo && values.role;
  }, [valuesChangeId, isEdit, userType]);

  const onSaveClick = useCallback(() => {
    saveUser({
      ...values,
      userType,
      doInvite
    });
  }, [valuesChangeId, doInvite, saveUser, userType]);

  return (
    <div className={`user-form ${!isValidForm ? 'invalid' : ''}`}>
      {loading && <Loading />}
      {!isEdit && (
        <Radio.Group
          style={{ margin: '12px 0' }}
          value={userType}
          optionType="button"
          onChange={({ target: { value } }) => {
            setUserType(value as UserSelectType);
          }}
          options={[
            {
              label: 'Добавить нового',
              value: UserSelectType.NEW
            },
            {
              label: 'Выбрать из списка',
              value: UserSelectType.EXISTING
            }
          ]}
        />
      )}
      {userType !== UserSelectType.EXISTING && (
        <div className="field">
          <div className="field-label">ФИО</div>
          <Input
            value={values.name || ''}
            onChange={({ target: { value } }) => {
              setValues((prev) => ({
                ...prev,
                name: value
              }));
            }}
          />
        </div>
      )}
      {!isEdit && userType === UserSelectType.EXISTING
        ? (
          <div className="field">
            <div className="field-label">Пользователь</div>
            <UserSelect
              placeholder="Введите email (полностью)"
              searchRegex={EmailRegex}
              onSelect={(userId, fullUser = {}) => {
                const {
                  name = '',
                  email = ''
                } = fullUser.fullrecord ? JSON.parse(fullUser.fullrecord) : {};
                setValues((prev) => ({
                  ...prev,
                  name,
                  email,
                  id: userId
                }));
              }}
            />
          </div>
        )
        : (
          <div className="field">
            <div className="field-label">Email</div>
            <Input
              value={values.email || ''}
              onChange={({ target: { value } }) => {
                setValues((prev) => ({
                  ...prev,
                  email: value
                }));
              }}
            />
          </div>
        )}

      <div className="field">
        <div className="field-label">Роль</div>
        <Select
          value={values.role || undefined}
          onChange={(selectedRole) => {
            setValues((prev) => ({
              ...prev,
              role: selectedRole
            }));
          }}
        >
          {roleOptions}
        </Select>
      </div>

      {!isEdit
        && (
          <Checkbox
            className="invite-checkbox"
            checked={doInvite}
            onChange={({ target: { checked } }: any) => {
              setInvite(checked);
            }}
          >
            Сразу отправить приглашение
          </Checkbox>
        )}
      <div className="modal-buttons">
        <Button
          type="primary"
          disabled={!isValidForm}
          onClick={onSaveClick}
        >
          {loading ? <LoadingOutlined /> : <SaveOutlined />}
          {isEdit ? 'Сохранить изменения' : 'Добавить пользователя'}
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
    </div>
  );
}
