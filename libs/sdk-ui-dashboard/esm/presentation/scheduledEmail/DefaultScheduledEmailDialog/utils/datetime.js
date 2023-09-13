// (C) 2019-2023 GoodData Corporation
import isDate from "lodash/isDate.js";
import format from "date-fns/format/index.js";
import { PLATFORM_DATE_FORMAT } from "../constants.js";
import capitalize from "lodash/capitalize.js";
export function convertDateToPlatformDateString(date) {
    return isDate(date) ? format(date, PLATFORM_DATE_FORMAT) : date;
}
export function convertDateToDisplayDateString(date, dateFormat) {
    // In schedule email dialog, use date string as sub-fix of attached file name
    // to avoid "/" character in file name
    const DISPLAY_DATE_FORMAT_MAPPER = {
        "MM/dd/yyyy": "MM-dd-yyyy",
        "dd/MM/yyyy": "dd-MM-yyyy",
        "M/d/yy": "M-d-yy",
    };
    const displayDateFormat = DISPLAY_DATE_FORMAT_MAPPER[dateFormat] || dateFormat;
    return isDate(date) ? format(date, displayDateFormat) : date;
}
export function getDate(date) {
    return date.getDate();
}
export function getDayName(date) {
    return format(date, "eeee");
}
export function getIntlDayName(intl, startDate) {
    return capitalize(intl.formatDate(startDate, { weekday: "long" }));
}
export function convertSun2MonWeekday(dayIndex) {
    return dayIndex === 0 ? 7 : dayIndex;
}
export function getDay(date) {
    return convertSun2MonWeekday(date.getDay());
}
export function getWeek(date) {
    return Math.ceil(date.getDate() / 7);
}
export function getMonth(date) {
    return date.getMonth() + 1;
}
export function getYear(date) {
    return date.getFullYear();
}
//# sourceMappingURL=datetime.js.map