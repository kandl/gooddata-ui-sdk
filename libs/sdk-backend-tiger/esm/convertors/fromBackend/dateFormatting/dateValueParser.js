// (C) 2020-2022 GoodData Corporation
import parse from "date-fns/parse/index.js";
import identity from "lodash/identity.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
const granularityParseValueTransformations = {
    "GDC.time.day_in_week": (value) => {
        // server returns 00 = Sunday, 06 = Saturday
        // date-fns expects 1 = Sunday, 7 = Saturday
        // see https://date-fns.org/docs/parse
        return `${parseInt(value) + 1}`;
    },
};
/**
 * Default parse patterns for date granularities.
 *
 * See https://date-fns.org/docs/parse and https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 */
const granularityParsePatterns = {
    "GDC.time.minute": "yyyy-MM-dd HH:mm",
    "GDC.time.minute_in_hour": "mm",
    "GDC.time.hour": "yyyy-MM-dd HH",
    "GDC.time.hour_in_day": "HH",
    "GDC.time.date": "yyyy-MM-dd",
    "GDC.time.day_in_week": "c",
    "GDC.time.day_in_month": "dd",
    "GDC.time.day_in_year": "DDD",
    "GDC.time.month": "yyyy-MM",
    "GDC.time.month_in_year": "LL",
    "GDC.time.quarter": "yyyy-Q",
    "GDC.time.quarter_in_year": "qq",
    "GDC.time.week_us": "RRRR-II",
    "GDC.time.week_in_year": "II",
    "GDC.time.year": "yyyy", // 2020
};
/**
 * Parses a string representation of a date of a given granularity to a Date object.
 * @param value - value to parse.
 * @param granularity - granularity to assume when parsing the value.
 * @internal
 */
export const parseDateValue = (value, granularity) => {
    var _a;
    const parsePattern = granularityParsePatterns[granularity];
    if (!parsePattern) {
        throw new UnexpectedError(`No date parser for the "${granularity}" granularity available.`);
    }
    const valueTransform = (_a = granularityParseValueTransformations[granularity]) !== null && _a !== void 0 ? _a : identity;
    // parse date in the context of 366 days (2020 = leap year) and 31 days (0 = January)
    const referenceDate = new Date(2020, 0);
    return parse(valueTransform(value), parsePattern, referenceDate, {
        useAdditionalDayOfYearTokens: true,
        useAdditionalWeekYearTokens: true,
        weekStartsOn: 0,
        firstWeekContainsDate: 1, // hardocded to US value as backend returns US weeks - otherwise this could influence first and last week of year
    });
};
//# sourceMappingURL=dateValueParser.js.map