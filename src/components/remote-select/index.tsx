import { Select, SelectProps, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLoading } from 'hooks/use-loading';
import axios from 'axios';
import { showError } from 'utils/notifications';

interface RemoteSelectProps extends SelectProps {
	displayFieldName?: string;
	idFieldName?: string;
	optionsURL: string;
}

const RemoteSelect = ({
	                      optionsURL,
	                      idFieldName = 'id',
	                      displayFieldName = 'name',
	                      ...selectProps
                      }: RemoteSelectProps) => {
	const [options, setOptions] = useState([]);
	const [isLoading, showLoading, hideLoading] = useLoading();


	const selectOptions = useMemo(() => options.map(({ [idFieldName]: optionId, [displayFieldName]: optionLabel }) =>
		<Select.Option
			key={optionId}
			value={optionId}
		>
			{optionLabel}
		</Select.Option>), [options.length]);


	useEffect(() => {
		showLoading();
		axios.get(optionsURL)
			.then(({ data }) => {
				hideLoading();
				setOptions(data);
			})
			.catch((e) => {
				showError('Не удалось загрузить список', e);
				hideLoading();
			});
	}, []);

	return (
		<Select {...selectProps} allowClear
		        popupMatchSelectWidth={false}
		        notFoundContent={isLoading ? <Spin /> : 'пусто'}
		>
			{selectOptions}
		</Select>
	)
}

export default RemoteSelect;
