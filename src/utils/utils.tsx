import {OptionProps} from 'rc-select/lib/Option';
import dayjs, {Dayjs} from 'dayjs';
import {saveAs} from 'file-saver';
import axios from 'axios';
import {showError} from 'utils/notifications';
import {SERVER_DATE_FORMAT} from "./constants";

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

export const convertDateForServer = (date?: Dayjs | string | number | Date) => date ? dateRenderer(date, SERVER_DATE_FORMAT) : '';

export const dateTimeRenderer = (date: Dayjs | string | number) => {
    return <>
        <span className='date'>{dateRenderer(date, 'DD.MM.YYYY')}</span>
        &nbsp;
        <span className='time'>{dateRenderer(date, 'HH:mm')}</span>
    </>
}

export const summRenderer = (amount: number | string, options = {}) => {
    if (typeof amount !== 'number') {
        return '';
    }
    let amountNumber = amount;


    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumFractionDigits: 2,
        currency: 'RUB',
        ...options
        // currencyDisplay: 'symbol'
    });

    let formattedString = formatter.format(amountNumber);
    return formattedString
};

export const parseUTF8FileName = (fileNameStr: string) => {
    let result = 'file.txt';
    let fileName = fileNameStr.replace('attachment; filename="', '');
    fileName = fileName.slice(0, fileName.length - 1);
    return decodeURI(fileName);
    // const fileNameEncodedIndex = fileNameStr.indexOf('attachment; filename="');
    // debugger;
    // if (fileNameEncodedIndex > -1) {
    // 	const fileNameEncoded = fileNameStr
    // 		.substring(fileNameEncodedIndex)
    // 		.replace('filename*=utf-8\'\'', '');
    //
    // 	result = decodeURI(fileNameEncoded);
    // }
};


export const downloadFile = (url: string, params: any, onFinish: (isSuccess: boolean) => void) => {
    axios.post(url, params, {
        responseType: 'blob'
    })
        .then(response => {
            const blob = new Blob([response.data]);
            let loadFileName = 'Файл.txt';
            if (response.headers && Object.prototype.hasOwnProperty.call(response.headers, 'content-disposition')) {
                const fileNameStr = response.headers['content-disposition'];
                if (fileNameStr) {
                    loadFileName = parseUTF8FileName(fileNameStr);
                }
            }

            saveAs(blob, loadFileName);
            onFinish(true);
        })
        .catch(e => {
            showError('Не удалось скачать файл', e);
            onFinish(false);
        })
}


const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]


function getCharacter(index: number) {
    return hexCharacters[index]
}

export function generateNewColor() {
    let hexColorRep = "#"

    for (let index = 0; index < 6; index++) {
        const randomPosition = Math.floor(Math.random() * hexCharacters.length)
        hexColorRep += getCharacter(randomPosition)
    }

    return hexColorRep
}

export const convertDateRange = (range: Array<string | Dayjs | null> = [], format = SERVER_DATE_FORMAT): {
    dateStart: string,
    dateEnd: string
} => ({
    dateStart: range.length > 0 && range[0] ? dateRenderer(range[0], format) : '',
    dateEnd: range.length > 1 && range[1] ? dateRenderer(range[1], format) : ''
});
