import { OptionProps } from 'rc-select/lib/Option';
import dayjs, { Dayjs } from 'dayjs';


const timezone = require('dayjs/plugin/timezone')
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc)
dayjs.extend(timezone);

export const getRandomId = () =>
	dayjs().unix() + Math.round(Math.random() * 10000) + Math.round(Math.random() * 100);


export const filterOption = (input: string, option: OptionProps | undefined) => {
	if (option && option.children) {
		const value = String(option.children).toLowerCase();
		return value.indexOf(input.toLowerCase()) >= 0;
	}
	return false;
}

export const dateRenderer = (date: Dayjs | string | number | Date, format: string = 'DD.MM.YYYY') => {
	//@ts-ignore
	let dateMoment: Dayjs = typeof date === 'number' ? dayjs.unix(date) : dayjs(date);

	//@ts-ignore
	return dateMoment && dateMoment.isValid() ? dateMoment.format(format) : '';
}

export const convertDateForServer = (date?: Dayjs | string | number | Date) => date ? dateRenderer(date, 'YYYY-MM-DD') : '';

export const dateTimeRenderer = (date: Dayjs | string | number) => {
	return dateRenderer(date, 'DD.MM.YYYY HH:mm');

}

export const summRenderer = (amount: number | string) => {
	if (typeof amount !== 'number') {
		return '';
	}
	let amountNumber = amount;


	const formatter = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		minimumFractionDigits: 0,
		currency: 'RUB',
		currencyDisplay: 'symbol'
	});

	let formattedString = formatter.format(amountNumber);
	return formattedString
};
