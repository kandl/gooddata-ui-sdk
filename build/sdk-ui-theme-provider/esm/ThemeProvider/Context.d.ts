import React from "react";
import { ITheme } from "@gooddata/sdk-model";
/**
 * @public
 */
export interface IThemeContextProviderProps {
    /**
     * Theme object contains properties to be used instead of default ones
     */
    theme: ITheme;
    /**
     * Flag telling whether the theme object is being loaded or not
     */
    themeIsLoading: boolean;
    /**
     * React children
     */
    children?: React.ReactNode;
}
/**
 * Provides the theme object and themeIsLoading flag into context
 *
 * @public
 */
export declare const ThemeContextProvider: React.FC<IThemeContextProviderProps>;
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
export declare const useTheme: (theme?: ITheme) => ITheme | undefined;
/**
 * Hook for reaching the themeIsLoading flag from context
 *
 * @public
 */
export declare const useThemeIsLoading: () => boolean | undefined;
/**
 * @internal
 */
export declare function withThemeObject<T extends {
    theme?: ITheme;
    themeIsLoading?: boolean;
}>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, "theme">>;
/**
 * @internal
 */
export declare function withThemeIsLoading<T extends {
    themeIsLoading?: boolean;
}>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, "themeIsLoading">>;
/**
 * Injects both theme object and isThemeLoading flag into component as properties
 *
 * @public
 */
export declare function withTheme<T extends {
    theme?: ITheme;
    workspace?: string;
}>(Component: React.ComponentType<T>): React.ComponentType<Omit<T, "theme" | "themeIsLoading">>;
//# sourceMappingURL=Context.d.ts.map