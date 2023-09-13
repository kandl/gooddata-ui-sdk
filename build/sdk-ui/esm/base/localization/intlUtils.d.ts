import React from "react";
import { IntlShape } from "react-intl";
import { ITranslations } from "./messagesMap.js";
import { ILocale } from "./Locale.js";
/**
 * @internal
 */
export declare function createIntlMock(customMessages?: {}, locale?: string): IntlShape;
/**
 * @internal
 */
export declare function withIntl<P>(WrappedComponent: React.FC<P> | React.ComponentClass<P>, customLocale?: ILocale, customMessages?: ITranslations): React.ComponentType<P>;
/**
 * Resolves parameter into {@link ILocale} or {@link DefaultLocale}.
 *
 * @param locale - value of the locale to check for support
 *
 * @internal
 */
export declare const resolveLocale: (locale: unknown) => ILocale;
/**
 * Returns a string meant to represent a header with an empty value.
 * @param intl - the source of i18n strings
 * @internal
 */
export declare function emptyHeaderTitleFromIntl(intl: IntlShape): string;
/**
 * Returns a string meant to represent the total colum when it is empty.
 * @param intl - the source of i18n strings
 * @internal
 */
export declare function totalColumnTitleFromIntl(intl: IntlShape): string;
//# sourceMappingURL=intlUtils.d.ts.map