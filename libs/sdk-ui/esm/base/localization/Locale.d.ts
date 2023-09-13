/**
 * Language codes that can be used with GoodData.
 *
 * @public
 */
export type ILocale = "en-US" | "de-DE" | "es-ES" | "fr-FR" | "ja-JP" | "nl-NL" | "pt-BR" | "pt-PT" | "zh-Hans" | "ru-RU";
/**
 * Array of locales for type-guard. It must be the same as {@link ILocale}
 *
 * @internal
 */
export declare const LOCALES: string[];
/**
 * Type-guard for language codes that can be used with GoodData.
 *
 * @public
 */
export declare const isLocale: (locale: unknown) => locale is ILocale;
/**
 * Default value for {@link ILocale}.
 *
 * @public
 */
export declare const DefaultLocale: ILocale;
//# sourceMappingURL=Locale.d.ts.map