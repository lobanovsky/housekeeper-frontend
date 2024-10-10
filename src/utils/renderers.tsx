import React, { Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const ACCOUNT_NUMBER_REGEX = /^\d{16,20}$/;

const PhoneDisplayRegex = /^7(?<code>\d{3})(?<gr2>\d{3})(?<gr3>\d{2})(?<gr4>\d{2})$/;
const PhoneBackendRegex = /^7\d{10}$/;

export const accountNumberRenderer = (accountNumber: string = '') => {
  const isValidAccountNumber = ACCOUNT_NUMBER_REGEX.test(accountNumber.replace(/\s+/g, ''));
  if (!isValidAccountNumber) {
    return '';
  }

  const groups = [];

  let startIndex = 0;

  for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
    groups.push(accountNumber.substring(startIndex, startIndex + 4));
  }

  return groups.length ? groups.join(' ') : accountNumber;
};

export const accountNumberRendererShort = (accountNumber: string = '') => {
  const isValidAccountNumber = ACCOUNT_NUMBER_REGEX.test(accountNumber.replace(/\s+/g, ''));
  if (!isValidAccountNumber) {
    return '';
  }

  const last4digits = accountNumber.substring(accountNumber.length - 4, 30);
  return last4digits ? `***${last4digits}` : '';
};

export const copyableRenderer = (v: string | number = '') => (v
  ? <Typography.Text copyable>{String(v)}</Typography.Text> : '');

export const dateRenderer = (date: Dayjs | string | number | Date, format: string = 'DD.MM.YYYY') => {
  // @ts-ignore
  const dateMoment: Dayjs = typeof date === 'number' ? dayjs.unix(date) : dayjs(date);

  // @ts-ignore
  return dateMoment && dateMoment.isValid() ? dateMoment.format(format) : '';
};

export const dateTimeRenderer = (date: Dayjs | string | number) => dateRenderer(date, 'YYYY-MM-DD HH:mm');

export const personalAccountRenderer = (accountNumber: string = '') => (accountNumber.length
  ? `${accountNumber.substring(0, 4)} ${accountNumber.substring(4, 50)}` : '');

export const summRenderer = (amount: number | string, options = {}) => {
  if (typeof amount !== 'number') {
    return '';
  }
  const amountNumber = amount;

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'RUB',
    ...options,
    currencyDisplay: 'symbol'
  });

  return formatter.format(amountNumber);
};

export const phoneNumberRenderer = (phoneStr: string = '') => {
  const phoneOnlyDigits = phoneStr.replace(/\D/g, '');
  if (!PhoneBackendRegex.test(phoneOnlyDigits)) {
    return phoneStr;
  }

  // @ts-ignore
  const { groups = {} } = PhoneDisplayRegex.exec(phoneOnlyDigits);
  const {
    code = '',
    ...otherGroups
  } = groups;
  if (!code) {
    return '';
  }

  return `+7 (${code}) ${Object.values(otherGroups)
    .join('-')}`;
};
