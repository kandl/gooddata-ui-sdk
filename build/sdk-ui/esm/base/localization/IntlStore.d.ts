import { IntlShape, MessageDescriptor } from "react-intl";
import { ILocale } from "./Locale.js";
/**
 * Gets react-intl's IntlShape set up for the provided locale.
 *
 * @param locale - one of the supported locales, if not specified returns shape for `DefaultLocale`
 * @internal
 */
export declare function getIntl(locale?: ILocale): IntlShape;
/**
 * Convenience function to return translated and formatted string for given key and locale; optionally specify
 * values of parameters to substitute in the translated string.
 *
 * @param translationId - id of the localized string
 * @param locale - target locale
 * @param values - parameters, optional
 *
 * @internal
 */
export declare function getTranslation(translationId: string | MessageDescriptor, locale: ILocale, values?: {}): string;
//# sourceMappingURL=IntlStore.d.ts.map