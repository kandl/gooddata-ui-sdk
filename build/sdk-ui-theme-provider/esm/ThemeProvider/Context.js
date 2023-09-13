// (C) 2019-2022 GoodData Corporation
import React from "react";
import compose from "lodash/flowRight.js";
import { wrapDisplayName } from "@gooddata/sdk-ui";
const ThemeContext = React.createContext(undefined);
ThemeContext.displayName = "ThemeContext";
const ThemeIsLoadingContext = React.createContext(undefined);
ThemeIsLoadingContext.displayName = "ThemeIsLoadingContext";
/**
 * Provides the theme object and themeIsLoading flag into context
 *
 * @public
 */
export const ThemeContextProvider = ({ children, theme, themeIsLoading, }) => {
    return (React.createElement(ThemeContext.Provider, { value: theme },
        React.createElement(ThemeIsLoadingContext.Provider, { value: themeIsLoading }, children)));
};
/**
 * Hook for reaching the theme from context.
 *
 * @remarks
 * You can optionally set a theme override that will be returned if defined.
 * This makes the usage more ergonomic (see the following example).
 *
 * @example
 * ```
 * // instead of
 * const fromContext = useTheme();
 * const effectiveTheme = fromArguments ?? fromContext.
 * // you can write
 * const theme = useTheme(fromArguments);
 * ```
 *
 * @param theme - theme to use instead of context value. If undefined, the context value is used.
 * @public
 */
export const useTheme = (theme) => {
    const themeFromContext = React.useContext(ThemeContext);
    return theme !== null && theme !== void 0 ? theme : themeFromContext;
};
/**
 * Hook for reaching the themeIsLoading flag from context
 *
 * @public
 */
export const useThemeIsLoading = () => {
    return React.useContext(ThemeIsLoadingContext);
};
/**
 * @internal
 */
export function withThemeObject(Component) {
    const ComponentWithInjectedThemeObject = (props) => {
        return (React.createElement(ThemeContext.Consumer, null, (theme) => { var _a; return React.createElement(Component, Object.assign({}, props, { theme: (_a = props.theme) !== null && _a !== void 0 ? _a : theme })); }));
    };
    return wrapDisplayName("withThemeObject", ThemeContextProvider)(ComponentWithInjectedThemeObject);
}
/**
 * @internal
 */
export function withThemeIsLoading(Component) {
    const ComponentWithInjectedThemeIsLoading = (props) => {
        return (React.createElement(ThemeIsLoadingContext.Consumer, null, (themeIsLoading) => React.createElement(Component, Object.assign({ themeIsLoading: themeIsLoading }, props))));
    };
    return wrapDisplayName("withThemeIsLoading", ThemeContextProvider)(ComponentWithInjectedThemeIsLoading);
}
/**
 * Injects both theme object and isThemeLoading flag into component as properties
 *
 * @public
 */
export function withTheme(Component) {
    return compose(wrapDisplayName("withContexts"), withThemeObject, withThemeIsLoading)(Component);
}
//# sourceMappingURL=Context.js.map