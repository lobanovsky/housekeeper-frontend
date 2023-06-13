import React, { useCallback, useImperativeHandle, useState } from 'react';
import { CloseCircleOutlined, DownloadOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select } from 'antd';

import { filterOption } from 'utils/utils';
import { FilterFieldsConfig, IFilterFieldConfig } from './types';
import styles from './styles.module.scss';
import { useLoading } from 'hooks/use-loading';
import { ActionFinishCallback } from 'utils/types';
import RemoteSelect from 'components/remote-select';
import { Dayjs } from 'dayjs';


export type FilterValue = string | string[] | number | number[] | boolean | Dayjs | [Dayjs, Dayjs];
export type FilterFormValues = Record<string, FilterValue>;

interface IFilterFormProps {
	allowClear?: boolean;
	defaultFilterValues?: FilterFormValues;
	filters: FilterFieldsConfig;
	exportToFile?: ((onFinish: ActionFinishCallback) => void) | null;
	extraControls?: React.ReactNode[];
	onChangeFilters: (filters: FilterFormValues) => void;
	onSearchBtnClick: () => void;
	isValidForm?: (filters: FilterFormValues) => boolean;
}


const FilterForm = React.forwardRef((props: IFilterFormProps, ref): JSX.Element => {
	const {
		onChangeFilters,
		filters,
		onSearchBtnClick,
		allowClear = true,
		exportToFile = null,
		extraControls = [],
		isValidForm = () => true
	} = props;

	const [isExporting, showExportLoading, hideExportLoading] = useLoading();

	const [filterValues, setFilterValues] = useState<any>(() => {
		return ({
			...(props.defaultFilterValues || {})
		})
	});

	const clearValues = () => {
		setFilterValues({});
		onChangeFilters({});
	}

	const getSelectedFilters = () => {
		return filterValues;
	}

	const onChangeFilter = useCallback((changedObj: any) => {
		const newFilters = {
			...filterValues,
			...changedObj
		};

		setFilterValues(newFilters);
		onChangeFilters(newFilters);
	}, [JSON.stringify(filterValues), setFilterValues, onChangeFilters]);

	const renderField = useCallback((props: IFilterFieldConfig) => {
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
			...fieldProps
		} = props;
		let input = null;
		const isEmptyValue = !filterValues[name];
		if (type === 'date-range') {
			input = <DatePicker.RangePicker
				allowClear
				placeholder={['c', 'по']}
				value={filterValues[name]}
				onChange={(dates) => {
					onChangeFilter({ [name]: dates });
				}}
			/>
		} else if (type === 'date') {
			input = <DatePicker
				allowClear
				value={filterValues[name]}
				onChange={(dates) => {
					onChangeFilter({ [name]: dates });
				}}
			/>
		} else if (type === 'select') {
			input = <Select
				// @ts-ignore
				mode={mode}
				showArrow
				allowClear
				{...fieldProps}
				popupMatchSelectWidth={false}
				placeholder={placeholder || title}
				filterOption={filterOption}
				value={filterValues[name]}
				onChange={(selectedOption, options) => {
					let changeObject = {
						[name]: selectedOption
					}
					if (getChangeAdditionalParams) {
						changeObject = {
							...changeObject,
							...(getChangeAdditionalParams(options) || {})
						}
					}

					onChangeFilter(changeObject);
				}}
			>{options}</Select>
		} else if (type === 'remote-select') {
			input = <RemoteSelect
				allowClear
				{...fieldProps}
				optionsURL={optionsURL || ''}
				placeholder={placeholder}
				value={filterValues[name]}
				onChange={(selectedOption, options) => {
					onChangeFilter({ [name]: selectedOption });
				}}
			/>
		} else if (type === 'input') {
			input = <Input
				// className={styles.full_name}
				allowClear
				placeholder={placeholder}
				value={filterValues[name]}
				onChange={({ target: { value } }) => {
					onChangeFilter({ [name]: value });
				}}
			/>
		}

		return (
			<div
				key={name}
				className={`${styles.field} ${name} filter-field ${isEmptyValue ? 'empty' : ''} ${required ? 'required' : ''}`}
			>
				<div className={`${styles.field_label} label`}>{title}</div>
				{input}
			</div>
		)
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
		<div className={`${styles.filter_form} filter-form`}>
			<div className='filter-fields'>{filters.map(renderField)}</div>
			<div className='buttons'>
				<Button
					key='search'
					className={styles.search_btn}
					type='primary'
					onClick={onSearchBtnClick}
					disabled={!isValidForm(filterValues)}
				>
					<SearchOutlined style={{ marginRight: 5 }} /> Найти
				</Button>
				{allowClear && <Button
					key='clear'
					className={styles.clear_btn}
					onClick={clearValues}
				>
					<CloseCircleOutlined style={{ marginRight: 5 }} /> Очистить
				</Button>}

				{!!exportToFile && <Button
					key='export'
					className={styles.export_btn}
					type='primary'
					onClick={exportTableToFile}
				>
					{isExporting ? <LoadingOutlined style={{ marginRight: 5 }} /> :
						<DownloadOutlined style={{ marginRight: 5 }} />} Выгрузить в файл
				</Button>}
				{!!extraControls.length && (
					<div className={`${styles.extra_controls} extra-controls`}>
						{extraControls}
					</div>
				)}
			</div>

		</div>
	);
});

export default FilterForm;
