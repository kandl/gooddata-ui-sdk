// (C) 2007-2022 GoodData Corporation
import React from "react";
import { IntlProvider, createIntl } from "react-intl";
import { messagesMap } from "./messagesMap.js";
import { DefaultLocale, isLocale } from "./Locale.js";
import { wrapDisplayName } from "../react/wrapDisplayName.js";
/**
 * @internal
 */
export function createIntlMock(customMessages = {}, locale = "en-US") {
    return createIntl({
        locale,
        messages: Object.assign(Object.assign({}, messagesMap[locale]), customMessages),
    });
}
/**
 * @internal
 */
export function withIntl(WrappedComponent, customLocale, customMessages) {
    class WithIntl extends React.Component {
        render() {
            const locale = customLocale ? customLocale : DefaultLocale;
            const messages = customMessages ? customMessages : messagesMap[locale];
            return (React.createElement(IntlProvider, { locale: locale, messages: messages },
                React.createElement(WrappedComponent, Object.assign({}, this.props))));
        }
    }
    return wrapDisplayName("withIntl", WrappedComponent)(WithIntl);
}
/**
 * Resolves parameter into {@link ILocale} or {@link DefaultLocale}.
 *
 * @param locale - value of the locale to check for support
 *
 * @internal
 */
export const resolveLocale = (locale) => {
    return isLocale(locale) ? locale : DefaultLocale;
};
/**
 * Returns a string meant to represent a header with an empty value.
 * @param intl - the source of i18n strings
 * @internal
 */
export function emptyHeaderTitleFromIntl(intl) {
    return `(${intl.formatMessage({ id: "visualization.emptyValue" })})`;
}
/**
 * Returns a string meant to represent the total colum when it is empty.
 * @param intl - the source of i18n strings
 * @internal
 */
export function totalColumnTitleFromIntl(intl) {
    return intl.formatMessage({ id: "visualization.waterfall.total" });
}
//# sourceMappingURL=intlUtils.js.map