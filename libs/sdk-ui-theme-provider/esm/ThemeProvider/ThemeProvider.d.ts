import React from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ITheme } from "@gooddata/sdk-model";
/**
 * @public
 */
export type ThemeModifier = (theme: ITheme) => ITheme;
/**
 * @public
 */
export interface IThemeProviderProps {
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
    children?: React.ReactNode;
}
/**
 * @internal
 */
export declare const isDarkTheme: (theme: ITheme) => boolean;
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
export declare const ThemeProvider: React.FC<IThemeProviderProps>;
//# sourceMappingURL=ThemeProvider.d.ts.map