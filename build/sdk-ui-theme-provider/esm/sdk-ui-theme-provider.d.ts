/**
 * This package provides tools to make your application support themes.
 *
 * @remarks
 * A theme allows you to change the colors, fonts and other visual aspects of GoodData.UI components.
 * You can use functions in this package to set a theme for a subtree of your React component tree
 * and to make your own components able to consume the theme provided.
 *
 * @packageDocumentation
 */

import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { ITheme } from '@gooddata/sdk-model';
import { default as React_2 } from 'react';

/**
 * @internal
 */
export declare const isDarkTheme: (theme: ITheme) => boolean;

/**
 * @public
 */
export declare interface IThemeContextProviderProps {
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
    children?: React_2.ReactNode;
}

/**
 * @public
 */
export declare interface IThemeProviderProps {
    /**
     * Theme that will be used if defined.
     *
     * @remarks
     * If not defined here, the theme will be obtained from the backend.
     *
     * Note: either the theme or both backend and workspace MUST be provided (either directly or via their contexts).
     */
    theme?: ITheme;
    /**
     * Analytical backend, from which the ThemeProvider will obtain selected theme object.
     *
     * @remarks
     * If you do not specify instance of analytical backend using this prop, then you MUST have
     * BackendProvider up in the component tree.
     */
    backend?: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the ThemeProvider will obtain the selected theme identifier
     *
     * @remarks
     * If you do not specify workspace identifier, then you MUST have WorkspaceProvider up in the
     * component tree.
     */
    workspace?: string;
    /**
     * If provided it is called with loaded theme to allow its modification according to the app needs.
     */
    modifier?: ThemeModifier;
    /**
     * Flag determining whether the complementary palette is enabled or not.
     *
     * @remarks
     * If set to false, complementary palette is discarded.
     * Useful for applications not yet fully supporting dark-based themes achievable with the complementary palette.
     */
    enableComplementaryPalette?: boolean;
    /**
     * Should ThemeProvider remove global styles during the unmount phase?
     *
     * Default: true
     */
    removeGlobalStylesOnUnmout?: boolean;
    /**
     * React children
     */
    children?: React_2.ReactNode;
}

/**
 * Provides the theme object and themeIsLoading flag into context
 *
 * @public
 */
export declare const ThemeContextProvider: React_2.FC<IThemeContextProviderProps>;

/**
 * @public
 */
export declare type ThemeModifier = (theme: ITheme) => ITheme;

/**
 * Fetches the theme object from the backend upon mounting and passes both theme object and isThemeLoading flag
 * to the context via ThemeContextProvider.
 *
 * @remarks
 * Converts properties from theme object into CSS variables and injects them into <body> via setCssProperties
 *
 * Both backend and workspace can be passed as an arguments, otherwise the component tries to get these from the context
 *
 * @public
 */
export declare const ThemeProvider: React_2.FC<IThemeProviderProps>;

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
 * Injects both theme object and isThemeLoading flag into component as properties
 *
 * @public
 */
export declare function withTheme<T extends {
    theme?: ITheme;
    workspace?: string;
}>(Component: React_2.ComponentType<T>): React_2.ComponentType<Omit<T, "theme" | "themeIsLoading">>;

export { }
