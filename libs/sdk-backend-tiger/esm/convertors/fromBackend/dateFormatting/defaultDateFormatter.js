// (C) 2020-2022 GoodData Corporation
import format from "date-fns/format/index.js";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import identity from "lodash/identity.js";
import enUS from "date-fns/locale/en-US/index.js";
import enGB from "date-fns/locale/en-GB/index.js";
import cs from "date-fns/locale/cs/index.js";
import de from "date-fns/locale/de/index.js";
import es from "date-fns/locale/es/index.js";
import fr from "date-fns/locale/fr/index.js";
import ja from "date-fns/locale/ja/index.js";
import nl from "date-fns/locale/nl/index.js";
import pt from "date-fns/locale/pt/index.js";
import ptBR from "date-fns/locale/pt-BR/index.js";
import zhCN from "date-fns/locale/zh-CN/index.js";
import ru from "date-fns/locale/ru/index.js";
const defaultLocaleCode = "en-US";
/**
 * Default date format patterns for all granularities.
 * They should be identical to the ICU ones that backend sends in case of en-US locale.
 *
 * See https://date-fns.org/docs/format and https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 */
const defaultGranularityFormatPatterns = {
    "GDC.time.minute": "M/d/y, h:mm a",
    "GDC.time.minute_in_hour": "m",
    "GDC.time.hour": "M/d/y, h a",
    "GDC.time.hour_in_day": "h a",
    "GDC.time.date": "M/d/y",
    "GDC.time.day_in_week": "ccc",
    "GDC.time.day_in_month": "d",
    "GDC.time.day_in_year": "D",
    "GDC.time.week_us": "w/Y",
    "GDC.time.week_in_year": "w",
    "GDC.time.month": "MMM y",
    "GDC.time.month_in_year": "LLL",
    "GDC.time.quarter": "QQQ y",
    "GDC.time.quarter_in_year": "qqq",
    "GDC.time.year": "y", // 2020
};
const localeConversions = {
    "en-US": enUS,
    "en-GB": enGB,
    "cs-CZ": cs,
    "de-DE": de,
    "es-ES": es,
    "fr-FR": fr,
    "ja-JP": ja,
    "nl-NL": nl,
    "pt-BR": ptBR,
    "pt-PT": pt,
    "zh-Hans": zhCN,
    "ru-RU": ru,
};
/**
 * This function replaces week and year tokens in date format patterns by their ISO representations. Backend returns
 * US weeks and we have to make sure that localized formatting does not change the week or year number in case
 * the week is represented differently in some locale. This ISO transformation ensures that last and first week
 * of year do not shift.
 */
const replaceWeekAndYearTokensByIsoTokens = (pattern) => {
    const searchForWeekPatternRegExp = /(w)(?=(?:[^']|'[^']*')*$)/g; // search for occurence of w not enclosed by ''
    const searchForYearPatternRegExp = /(y|Y)(?=(?:[^']|'[^']*')*$)/g; // search for occurence of y and Y not enclosed by ''
    return pattern.replace(searchForWeekPatternRegExp, "I").replace(searchForYearPatternRegExp, "R");
};
const granularityPatternTransformations = {
    "GDC.time.week_us": replaceWeekAndYearTokensByIsoTokens,
    "GDC.time.week_in_year": replaceWeekAndYearTokensByIsoTokens,
};
/**
 * Date formatter capable of formatting dates by a specific formatting pattern. The tokens of the pattern
 * have to be supported by date-fns library. When no pattern is provided, formatter will use granularity
 * to find the default formatting pattern. Formatted date is also translated based on the provided locale.
 * Default locale is 'en-US' with corresponding default formatting patterns.
 *
 * @param value - date to be formatted
 * @param granularity - date attribute granularity for default patterns
 * @param pattern - pattern constructed from date-time tokens
 * @param locale - code of locale for dynamic values translation
 * @alpha
 */
export const defaultDateFormatter = (value, granularity, locale = defaultLocaleCode, pattern) => {
    var _a;
    let convertedLocale = localeConversions[locale];
    let formatPattern = pattern !== null && pattern !== void 0 ? pattern : defaultGranularityFormatPatterns[granularity];
    if (!convertedLocale) {
        // fallback to default locale
        convertedLocale = localeConversions[defaultLocaleCode];
        // override pattern to match default locale
        formatPattern = defaultGranularityFormatPatterns[granularity];
    }
    if (!formatPattern) {
        throw new UnexpectedError(`No format pattern for the "${granularity}" granularity available.`);
    }
    const transformFormatPattern = (_a = granularityPatternTransformations[granularity]) !== null && _a !== void 0 ? _a : identity;
    const transformedFormatPattern = transformFormatPattern(formatPattern);
    try {
        return format(value, transformedFormatPattern, {
            locale: convertedLocale,
            useAdditionalDayOfYearTokens: true,
            useAdditionalWeekYearTokens: true,
            weekStartsOn: 0,
            firstWeekContainsDate: 1, // hardocded to US value as backend returns US weeks - otherwise this could influence first and last week of year
        });
    }
    catch (_b) {
        throw new UnexpectedError(`Unable to format date by "${transformedFormatPattern}" formatting pattern.`);
    }
};
//# sourceMappingURL=defaultDateFormatter.js.map