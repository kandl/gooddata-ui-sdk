// (C) 2007-2022 GoodData Corporation
/**
 * Array of locales for type-guard. It must be the same as {@link ILocale}
 *
 * @internal
 */
export const LOCALES = [
    "en-US",
    "de-DE",
    "es-ES",
    "fr-FR",
    "ja-JP",
    "nl-NL",
    "pt-BR",
    "pt-PT",
    "zh-Hans",
    "ru-RU",
];
/**
 * Type-guard for language codes that can be used with GoodData.
 *
 * @public
 */
export const isLocale = (locale) => {
    return typeof locale === "string" && LOCALES.includes(locale);
};
/**
 * Default value for {@link ILocale}.
 *
 * @public
 */
export const DefaultLocale = "en-US";
//# sourceMappingURL=Locale.js.map