export declare const getLocalizedDateFormat: (locale: string) => any;
export declare const DEFAULT_LOCALE = "en-US";
/**
 * Localized date format patterns for DAY granularity according to ICU. In case backend has the ability to define the patterns,these should
 * match with the backend definitions.
 *
 * See https://date-fns.org/docs/format and https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 */
export declare const localizedIcuDateFormatPatterns: Record<string, string>;
/**
 * Returns localized date format pattern for DAY granularity according to ICU. Unsupported locales default to en-US.
 *
 * See https://date-fns.org/docs/format and https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * @internal
 */
export declare const getLocalizedIcuDateFormatPattern: (locale: string) => string;
