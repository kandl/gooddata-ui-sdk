import { DateAttributeGranularity } from "@gooddata/sdk-model";
declare const localeConversions: {
    "en-US": Locale;
    "en-GB": Locale;
    "cs-CZ": Locale;
    "de-DE": Locale;
    "es-ES": Locale;
    "fr-FR": Locale;
    "ja-JP": Locale;
    "nl-NL": Locale;
    "pt-BR": Locale;
    "pt-PT": Locale;
    "zh-Hans": Locale;
    "ru-RU": Locale;
};
export type FormattingLocale = keyof typeof localeConversions;
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
export declare const defaultDateFormatter: (value: Date, granularity: DateAttributeGranularity, locale?: FormattingLocale, pattern?: string) => string;
export {};
//# sourceMappingURL=defaultDateFormatter.d.ts.map