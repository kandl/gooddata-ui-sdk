// (C) 2019-2023 GoodData Corporation
import React, { useMemo } from "react";
import { IntlProvider, createIntl } from "react-intl";
import { DefaultLocale, pickCorrectWording, TranslationsCustomizationProvider, } from "@gooddata/sdk-ui";
import { translations } from "./translations.js";
import { LRUCache } from "lru-cache";
const INTL_CACHE_SIZE = 20;
const INTL_CACHE_KEY = "messages";
const intlCache = new LRUCache({ max: INTL_CACHE_SIZE });
export function createInternalIntl(locale = DefaultLocale) {
    /**
     * Because of issues described in the ticket FET-855, we decided to use this workaround.
     * After the issues that are described in the ticket are solved or at least reduced,
     * this workaround can be removed.
     */
    const cachedIntlConfig = intlCache.get(INTL_CACHE_KEY);
    if ((cachedIntlConfig === null || cachedIntlConfig === void 0 ? void 0 : cachedIntlConfig.locale) === locale) {
        return createIntl(cachedIntlConfig);
    }
    const settings = window.gdSettings;
    intlCache.set(INTL_CACHE_KEY, {
        locale,
        messages: pickCorrectWording(translations[locale], settings),
    });
    return createIntl(intlCache.get(INTL_CACHE_KEY));
}
export const InternalIntlWrapper = ({ locale = DefaultLocale, children, workspace, }) => {
    /**
     * Because of issues described in the ticket FET-855, we decided to use this workaround.
     * After the issues that are described in the ticket are solved or at least reduced,
     * this workaround can be removed.
     */
    const settings = window.gdSettings;
    const messages = useMemo(() => pickCorrectWording(translations[locale], settings), [locale, settings]);
    if (settings) {
        return (React.createElement(IntlProvider, { locale: locale, messages: messages }, children));
    }
    else {
        return (React.createElement(TranslationsCustomizationProvider, { translations: translations[locale], workspace: workspace, render: (modifiedTranslations) => {
                return (React.createElement(IntlProvider, { key: locale, locale: locale, messages: modifiedTranslations }, children));
            } }));
    }
};
//# sourceMappingURL=internalIntlProvider.js.map