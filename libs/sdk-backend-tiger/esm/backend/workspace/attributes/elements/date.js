import addYears from "date-fns/addYears/index.js";
import addMonths from "date-fns/addMonths/index.js";
import addDays from "date-fns/addDays/index.js";
import setDate from "date-fns/setDate/index.js";
import setMonth from "date-fns/setMonth/index.js";
import getMonth from "date-fns/getMonth/index.js";
import format from "date-fns/format/index.js";
var DATE_GRANULARITY;
(function (DATE_GRANULARITY) {
    DATE_GRANULARITY["DATE"] = "GDC.time.date";
    DATE_GRANULARITY["WEEK"] = "GDC.time.week_us";
    DATE_GRANULARITY["MONTH"] = "GDC.time.month";
    DATE_GRANULARITY["QUARTER"] = "GDC.time.quarter";
    DATE_GRANULARITY["YEAR"] = "GDC.time.year";
})(DATE_GRANULARITY || (DATE_GRANULARITY = {}));
const iterateDates = (start, end) => {
    const wholeDates = [];
    while (start <= end) {
        wholeDates.push(format(start, "MM/dd/yyyy"));
        const newDate = addDays(start, 1);
        start = newDate;
    }
    return wholeDates;
};
export const getRelativeDateFilterShiftedValues = (currentDate, relativeDateFilter) => {
    const { from, to, granularity } = relativeDateFilter.relativeDateFilter;
    let startDate = currentDate;
    switch (granularity) {
        case DATE_GRANULARITY.YEAR: {
            startDate = addYears(startDate, from);
            startDate = setMonth(startDate, 0);
            startDate = setDate(startDate, 1);
            let endDate = currentDate;
            endDate = addYears(endDate, to);
            endDate = setMonth(endDate, 12);
            endDate = setDate(endDate, 0);
            return iterateDates(startDate, endDate);
        }
        case DATE_GRANULARITY.MONTH: {
            startDate = currentDate;
            startDate = addMonths(startDate, from);
            startDate = setDate(startDate, 1);
            let endDate = currentDate;
            endDate = addMonths(endDate, to + 1);
            endDate = setDate(endDate, 0);
            return iterateDates(startDate, endDate);
        }
        case DATE_GRANULARITY.DATE: {
            startDate = addDays(startDate, from);
            let endDate = currentDate;
            endDate = addDays(endDate, to);
            return iterateDates(startDate, endDate);
        }
        case DATE_GRANULARITY.QUARTER: {
            startDate = getFirstDayQuarter(currentDate, from);
            const endDate = getLastDayQuarter(currentDate, to);
            return iterateDates(startDate, endDate);
        }
        default: {
            return [];
        }
    }
};
const getFirstDayQuarter = (currentDate, from) => {
    const { date, month } = getQuarterDateAndMonth(currentDate, from);
    let result;
    if (month <= 3) {
        result = setDate(setMonth(date, 0), 1);
    }
    else if (month <= 6) {
        result = setDate(setMonth(date, 3), 1);
    }
    else if (month <= 9) {
        result = setDate(setMonth(date, 6), 1);
    }
    else {
        result = setDate(setMonth(date, 9), 1);
    }
    return result;
};
const getLastDayQuarter = (currentDate, to) => {
    const { date, month } = getQuarterDateAndMonth(currentDate, to);
    let result;
    if (month <= 3) {
        result = setDate(setMonth(date, 3), 0);
    }
    else if (month <= 6) {
        result = setDate(setMonth(date, 6), 0);
    }
    else if (month <= 9) {
        result = setDate(setMonth(date, 9), 0);
    }
    else {
        result = setDate(setMonth(date, 12), 0);
    }
    return result;
};
const getQuarterDateAndMonth = (currentDate, value) => {
    const date = addMonths(currentDate, value * 3);
    return {
        date,
        month: getMonth(date),
    };
};
//# sourceMappingURL=date.js.map