import React from 'react';
// import { Person, PiplService } from 'backend/services/pipl';
import DebounceSelect, { ISelectOption, ISelectProps } from 'components/autocomplete';
import { UserResponse, UserService } from 'backend/services/backend';
import { fioRenderer } from 'utils/renderers';

export async function fetchUserList(searchStr: string): Promise<ISelectOption[]> {
  return UserService.findUsersByEmail({ email: searchStr })
    .then((data: UserResponse) => (data.id ? [{
      label: fioRenderer(data?.name || ''),
      value: data.id || 0,
      dropdownValue: data.name,
      fullrecord: JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      })
    }] : [{
      label: 'Нет совпадений',
      value: 'NOT_FOUND'
    }]));
}

export function UserSelect(props: Omit<ISelectProps, 'loadData'>) {
  return <DebounceSelect {...props} loadData={fetchUserList} isDisabledOption={({ value }) => value === 'NOT_FOUND'} />;
}
