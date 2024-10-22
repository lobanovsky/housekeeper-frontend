import React, { useMemo, useState } from 'react';
//
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';

export interface ISelectOption {
  label: string;
  value: number | string;
  dropdownValue?: string;
  fullrecord?: string;
}

export interface ISelectProps extends SelectProps {
  searchRegex?: RegExp;
  defaultValue?: ISelectOption | ISelectOption[],
  isDisabledOption?: (option: { label: string, value: string | number }) => boolean;
  maxValues?: number;
  onSelect: (userId: number, user: any) => void,
  loadData: (search: string) => Promise<ISelectOption[]>,
  style?: any;
}

const { Option } = Select;

function SearchInput(props: ISelectProps) {
  const {
    loadData,
    searchRegex = null,
    onSelect,
    isDisabledOption,
    defaultValue,
    maxValues = 2,
    ...restProps
  } = props;

  const [open, setOpen] = useState(false);

  const [data, setData] = useState<ISelectOption[]>(() => {
    if (!defaultValue) {
      return [];
    }
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const [selectedRecords, setSelectedRecords] = useState<ISelectOption[]>(() => {
    if (!defaultValue) {
      return [];
    }
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });
  const [fetching, setFetching] = useState(false);
  const fetchRef = React.useRef(0);

  const canSelect = useMemo(() => selectedRecords.length < maxValues, [selectedRecords.length]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: string) => {
      if (value && (!searchRegex || searchRegex.test(value))) {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setFetching(true);

        loadData(value)
          .then((newOptions: any) => {
            if (fetchId !== fetchRef.current) {
              // for fetch callback order
              return;
            }

            setData(newOptions);
            setFetching(false);
          });
      }
    };

    return debounce(loadOptions, 500);
  }, [loadData]);

  const options = useMemo(() => data.map((d) => (
    <Option
      key={d.value}
      value={d.value}
      label={d.label}
      fullrecord={d.fullrecord}
      disabled={isDisabledOption ? isDisabledOption(d) : false}
    >
      {d.dropdownValue || d.label}
    </Option>
  )), [data, canSelect]);

  return (
    <Select
      showSearch
      allowClear
      open={open}
      value={selectedRecords}
      autoClearSearchValue
      // size='small'
      placeholder="поиск..."
      defaultActiveFirstOption={false}
      showArrow
      filterOption={false}
      onSearch={debounceFetcher}
      {...restProps}
      notFoundContent={fetching ? <Spin /> : ''}
      onDropdownVisibleChange={(isOpen) => {
        if (canSelect) {
          setOpen(isOpen);
        }
      }}
      onChange={(userId, userOption) => {
        let selectedOptions: ISelectOption[] = [];
        if (userOption) {
          if (Array.isArray(userOption)) {
            selectedOptions = userOption as ISelectOption[];
          } else {
            selectedOptions = [userOption as ISelectOption];
          }
        }

        if (selectedOptions.length <= maxValues) {
          setSelectedRecords(selectedOptions);
          onSelect(userId, userOption);
          setOpen(false);
        }
      }}

    >
      {options}
    </Select>
  );
}

export default SearchInput;
