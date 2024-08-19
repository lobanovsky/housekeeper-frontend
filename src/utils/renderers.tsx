import { Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";

const ACCOUNT_NUMBER_REGEX = /^\d{16,20}$/;


export const accountNumberRenderer = (accountNumber: string = "") => {
  const isValidAccountNumber = ACCOUNT_NUMBER_REGEX.test(accountNumber.replace(/\s+/g, ""));
  if (!isValidAccountNumber) {
    return "";
  }

  const groups = [];

  let startIndex = 0;

  for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
    groups.push(accountNumber.substring(startIndex, startIndex + 4));
  }

  return groups.length ? groups.join(" ") : accountNumber;
};

export const accountNumberRendererShort = (accountNumber: string = "") => {
  const isValidAccountNumber = ACCOUNT_NUMBER_REGEX.test(accountNumber.replace(/\s+/g, ""));
  if (!isValidAccountNumber) {
    return "";
  }

  const last4digits = accountNumber.substring(accountNumber.length - 4, 30);
  return last4digits ? `***${last4digits}` : "";
};

export const copyableRenderer = (v: string | number = "") => !!v ?
  <Typography.Text copyable>{String(v)}</Typography.Text> : "";

export const dateRenderer = (date: Dayjs | string | number | Date, format: string = "DD.MM.YYYY") => {
  //@ts-ignore
  let dateMoment: Dayjs = typeof date === "number" ? dayjs.unix(date) : dayjs(date);

  //@ts-ignore
  return dateMoment && dateMoment.isValid() ? dateMoment.format(format) : "";
};

export const dateTimeRenderer = (date: Dayjs | string | number) => {
  return dateRenderer(date, "YYYY-MM-DD HH:mm");
  // return <>
  //     <span className='date'>{dateRenderer(date, 'DD.MM.YYYY')}</span>
  //     &nbsp;
  //     <span className='time'>{dateRenderer(date, 'HH:mm')}</span>
  // </>
};

export const personalAccountRenderer = (accountNumber: string = "") => accountNumber.length ?
  `${accountNumber.substring(0, 4)} ${accountNumber.substring(4, 50)}` : "";


export const summRenderer = (amount: number | string, options = {}) => {
  if (typeof amount !== "number") {
    return "";
  }
  let amountNumber = amount;


  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "RUB",
    ...options,
    currencyDisplay: "symbol"
  });

  let formattedString = formatter.format(amountNumber);
  return formattedString;
};
