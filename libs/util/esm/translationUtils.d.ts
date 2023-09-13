/**
 * Given an object containing the parsed translation bundle, this function creates a new object which contains
 * only key → value mapping between translation key and the actual value.
 *
 * @param translationsWithMetadata - parsed translation bundle
 * @internal
 */
export declare function removeMetadata(translationsWithMetadata: Record<string, any>): Record<string, string>;
/**
 * Handles difference between GD locale and moment.js locale identifiers
 *
 * @param intlLocale - locale identifier
 * @internal
 */
export declare const sanitizeLocaleForMoment: (intlLocale: string) => string;
//# sourceMappingURL=translationUtils.d.ts.map