import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/localeData';
import localeData from 'dayjs/plugin/timezone';

require('dayjs/locale/ru');

const utc = require('dayjs/plugin/utc');
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

dayjs.locale('ru');
