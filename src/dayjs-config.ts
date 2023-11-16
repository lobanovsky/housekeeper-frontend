require('dayjs/locale/ru');
import dayjs from "dayjs";
import timezone from "dayjs/plugin/localeData";
import localeData from "dayjs/plugin/timezone";

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc)
dayjs.extend(timezone);
dayjs.extend(localeData)

dayjs.locale('ru')
