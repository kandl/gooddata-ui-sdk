// (C) 2021 GoodData Corporation
import React from "react";
import { wrapDisplayName } from "../../react/wrapDisplayName.js";
import compose from "lodash/flowRight.js";
const TranslationsCustomizationContext = React.createContext(undefined);
TranslationsCustomizationContext.displayName = "TranslationsCustomizationContext";
const TranslationsCustomizationIsLoadingContext = React.createContext(undefined);
TranslationsCustomizationIsLoadingContext.displayName = "TranslationsCustomizationIsLoadingContext";
/**
 * @beta
 */
export const TranslationsCustomizationContextProvider = ({ children, translationsCustomizationIsLoading, translations }) => {
    return (React.createElement(TranslationsCustomizationContext.Provider, { value: translations },
        React.createElement(TranslationsCustomizationIsLoadingContext.Provider, { value: translationsCustomizationIsLoading }, children)));
};
function withTranslationsCustomizationValue(Component) {
    const ComponentWithInjectedTranslationsCustomizationValue = (props) => {
        return (React.createElement(TranslationsCustomizationContext.Consumer, null, (translations) => React.createElement(Component, Object.assign({ translations: translations }, props))));
    };
    return wrapDisplayName("withTranslationsCustomizationValue", TranslationsCustomizationContextProvider)(ComponentWithInjectedTranslationsCustomizationValue);
}
function withTranslationsCustomizationIsLoading(Component) {
    const ComponentWithInjectedTranslationsCustomizationIsLoading = (props) => {
        return (React.createElement(TranslationsCustomizationIsLoadingContext.Consumer, null, (translationsCustomizationIsLoading) => (React.createElement(Component, Object.assign({ translationsCustomizationIsLoading: translationsCustomizationIsLoading }, props)))));
    };
    return wrapDisplayName("withTranslationsCustomizationIsLoading", TranslationsCustomizationContextProvider)(ComponentWithInjectedTranslationsCustomizationIsLoading);
}
/**
 * @beta
 */
export function withTranslationsCustomization(Component) {
    return compose(wrapDisplayName("withTranslationsCustomization"), withTranslationsCustomizationValue, withTranslationsCustomizationIsLoading)(Component);
}
//# sourceMappingURL=Context.js.map