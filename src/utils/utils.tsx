// eslint-disable-next-line import/no-extraneous-dependencies
import { OptionProps } from 'rc-select/lib/Option';
import dayjs, { Dayjs } from 'dayjs';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { showError } from 'utils/notifications';
import { SERVER_DATE_FORMAT } from './constants';
import { ActionFinishCallback, SelectedDatesShort } from './types';
import { dateRenderer } from './renderers';
import { IRequestConfig } from '../backend/services/backend';

export const getRandomId = () => dayjs().unix()
  + Math.round(Math.random() * 10000) + Math.round(Math.random() * 100);

export const filterOption = (input: string, option: OptionProps | undefined) => {
  if (option && option.children) {
    const value = String(option.children).toLowerCase();
    return value.indexOf(input.toLowerCase()) >= 0;
  }
  return false;
};

export const parseUTF8FileName = (fileNameStr: string) => {
  let fileName = fileNameStr.replace('attachment; filename="', '');
  fileName = fileName.slice(0, fileName.length - 1);
  return decodeURI(fileName);
};

export const downloadFile = ({
                               method = 'get', requestParams = {}, onFinish, ...restParams
                             }: {
  requestParams?: Record<string, string | number | boolean>,
  onFinish?: ActionFinishCallback
} & IRequestConfig) => {
  axios({
    ...restParams,
    params: method.toLowerCase() === 'get' ? requestParams : {},
    method: method.toUpperCase(),
    responseType: 'blob',
    data: requestParams || {}
  }).then((response) => {
    const blob = new Blob([response.data]);
    let loadFileName = 'Файл.txt';
    if (response.headers && Object.prototype.hasOwnProperty.call(response.headers, 'content-disposition')) {
      const fileNameStr = response.headers['content-disposition'];
      if (fileNameStr) {
        loadFileName = parseUTF8FileName(fileNameStr);
      }
    }

    saveAs(blob, loadFileName);
    if (onFinish) {
      onFinish(true);
    }
  })
    .catch((e) => {
      showError('Не удалось скачать файл', e);
      if (onFinish) {
        onFinish(false);
      }
    });
};

const hexCharacters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

function getCharacter(index: number) {
  return hexCharacters[index];
}

export function generateNewColor() {
  let hexColorRep = '#';

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 6; index++) {
    const randomPosition = Math.floor(Math.random() * hexCharacters.length);
    hexColorRep += getCharacter(randomPosition);
  }

  return hexColorRep;
}

export const convertDateRange = (range: Array<string | Dayjs | null> = [], format = SERVER_DATE_FORMAT): SelectedDatesShort => {
  const dateFromMoment = range.length > 0 && range[0] ? (typeof range[0] === 'string' ? dayjs(range[0]) : range[0]) : null;
  const dateToMoment = range.length > 1 && range[1] ? (typeof range[1] === 'string' ? dayjs(range[1]) : range[1]) : null;

  return ({
    dateFromMoment,
    dateToMoment,
    dateStart: dateFromMoment ? dateRenderer(dateFromMoment, format) : '',
    dateEnd: dateToMoment ? dateRenderer(dateToMoment, format) : ''
  });
};

// @ts-ignore
export const MonthNames = dayjs.months();
export const ShortMonthNames: string[] = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'];
