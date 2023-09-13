// (C) 2007-2022 GoodData Corporation
import React, { useCallback } from "react";
import { IntlProvider } from "react-intl";
import { DefaultLocale, TranslationsCustomizationProvider, } from "@gooddata/sdk-ui";
import { translations } from "./translations.js";
const formats = {
    time: {
        hhmm: {
            hour: "numeric",
            minute: "2-digit",
        },
    },
    date: {
        shortWithoutYear: {
            day: "numeric",
            month: "short",
        },
        shortWithYear: {
            day: "numeric",
            month: "short",
            year: "numeric",
        },
    },
};
/**
 * @internal
 */
export const IntlWrapper = ({ children, locale = DefaultLocale }) => {
    const render = useCallback((modifiedTranslations) => (React.createElement(IntlProvider, { locale: locale, messages: modifiedTranslations, formats: formats }, children)), [locale, children]);
    return React.createElement(TranslationsCustomizationProvider, { translations: translations[locale], render: render });
};
//# sourceMappingURL=IntlWrapper.js.map