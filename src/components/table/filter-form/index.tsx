import React, { useCallback, useImperativeHandle, useState } from 'react';
import { CloseCircleOutlined, DownloadOutlined, DownOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Dropdown, Input, Row, Select } from 'antd';

import { filterOption } from 'utils/utils';
import { useLoading } from 'hooks/use-loading';
import { ActionFinishCallback } from 'utils/types';
import RemoteSelect from 'components/remote-select';
import { Dayjs } from 'dayjs';
import { BreakpointsSpan, FilterFieldsConfig, IFilterFieldConfig } from './types';
import './styles.scss';

export type FilterValue = string | string[] | number | number[] | boolean | Dayjs | [Dayjs, Dayjs];
export type FilterFormValues = Record<string, FilterValue>;

interface IFilterFormProps {
  allowClear?: boolean;
  defaultFilterValues?: FilterFormValues;
  filters: FilterFieldsConfig;
  exportToFile?: ((onFinish: ActionFinishCallback) => void) | null;
  onChangeFilters: (filters: FilterFormValues) => void;
  onSearchBtnClick: () => void;
  isValidForm?: (filters: FilterFormValues) => boolean;
}

const FilterForm = React.forwardRef((props: IFilterFormProps, ref): React.ReactElement => {
  const {
    onChangeFilters,
    filters,
    onSearchBtnClick,
    allowClear = true,
    exportToFile = null,
    isValidForm = () => true
  } = props;

  const [isExporting, showExportLoading, hideExportLoading] = useLoading();

  const [filterValues, setFilterValues] = useState<any>(() => ({
    ...(props.defaultFilterValues || {})
  }));

  const clearValues = () => {
    setFilterValues({});
    onChangeFilters({});
  };

  const getSelectedFilters = () => filterValues;

  const onChangeFilter = useCallback((changedObj: any) => {
    const newFilters = {
      ...filterValues,
      ...changedObj
    };

    setFilterValues(newFilters);
    onChangeFilters(newFilters);
  }, [JSON.stringify(filterValues), setFilterValues, onChangeFilters]);

  const renderField = useCallback((filterFieldProps: IFilterFieldConfig) => {
    const {
      name,
      title,
      type = 'input',
      options,
      optionsURL,
      getChangeAdditionalParams,
      mode,
      placeholder,
      required = false,
      span = 6,
      ...fieldProps
    } = filterFieldProps;
    let input = null;
    const isEmptyValue = !filterValues[name];
    if (type === 'date-range') {
      input = (
        <DatePicker.RangePicker
          allowClear
          placeholder={['c', 'по']}
          value={filterValues[name]}
          onChange={(dates) => {
            onChangeFilter({ [name]: dates });
          }}
        />
      );
    } else if (type === 'date') {
      input = (
        <DatePicker
          allowClear
          value={filterValues[name]}
          onChange={(dates) => {
            onChangeFilter({ [name]: dates });
          }}
        />
      );
    } else if (type === 'select') {
      input = (
        <Select
          // @ts-ignore
          mode={mode}
          allowClear
          {...fieldProps}
          popupMatchSelectWidth={false}
          placeholder={placeholder || title}
          filterOption={filterOption}
          value={filterValues[name]}
          onChange={(selectedOption, selectedOptions) => {
            let changeObject = {
              [name]: selectedOption
            };
            if (getChangeAdditionalParams) {
              changeObject = {
                ...changeObject,
                ...(getChangeAdditionalParams(selectedOptions) || {})
              };
            }

            onChangeFilter(changeObject);
          }}
        >
          {options}
        </Select>
      );
    } else if (type === 'remote-select') {
      input = (
        <RemoteSelect
          allowClear
          {...fieldProps}
          optionsURL={optionsURL || ''}
          placeholder={placeholder}
          value={filterValues[name]}
          onChange={(selectedOption) => {
            onChangeFilter({ [name]: selectedOption });
          }}
        />
      );
    } else if (type === 'input') {
      input = (
        <Input
          // className={styles.full_name}
          allowClear
          placeholder={placeholder}
          value={filterValues[name]}
          onChange={({ target: { value } }) => {
            onChangeFilter({ [name]: value });
          }}
        />
      );
    }

    let spanProps: BreakpointsSpan & { span?: number } = {};

    if (typeof span === 'number') {
      spanProps.span = span;
    } else if (Object.keys(span).length) {
      spanProps = { ...span };
    }

    return (
      <Col {...spanProps} key={name}>
        <div
          className={` filter-field ${name} ${isEmptyValue ? 'empty' : ''} ${required ? 'required' : ''}`}
        >
          <div className="label">{title}</div>
          {input}
        </div>
      </Col>
    );
  }, [JSON.stringify(filterValues)]);

  const exportTableToFile = useCallback(() => {
    if (!exportToFile) {
      return;
    }

    showExportLoading();
    exportToFile(hideExportLoading);
  }, [exportToFile]);

  useImperativeHandle(ref, () => ({
    clearValues,
    getSelectedFilters
  }), [clearValues, getSelectedFilters]);

  return (
    <div className="filter-form">
      <div className="filter-fields">
        <Row gutter={[8, 8]}>
          {filters.map(renderField)}
          <Col {...{
            md: 8,
            lg: 6,
            xl: 5,
            xxl: 4
          }}
          >
            <div className="buttons">
              {exportToFile ? (
                <Dropdown.Button
                  type="primary"
                  disabled={!isValidForm(filterValues)}
                  icon={isExporting ? <LoadingOutlined /> : <DownOutlined />}
                  onClick={onSearchBtnClick}
                  menu={{
                    items: [
                      {
                        key: 'download',
                        label: 'Выгрузить в файл',
                        icon: <DownloadOutlined />,
                        onClick: exportTableToFile
                      }
                    ]
                  }}
                >
                  <SearchOutlined />
                  {' '}
                  Найти
                </Dropdown.Button>
              ) : (
                <Button
                  type="primary"
                  disabled={!isValidForm(filterValues)}
                  onClick={onSearchBtnClick}
                >
                  <SearchOutlined />
                  {' '}
                  Найти
                </Button>
              )}

              {allowClear && (
                <Button
                  key="clear"
                  onClick={clearValues}
                >
                  <CloseCircleOutlined style={{ marginRight: 5 }} />
                  {' '}
                  Очистить
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>

    </div>
  );
});

export default FilterForm;
