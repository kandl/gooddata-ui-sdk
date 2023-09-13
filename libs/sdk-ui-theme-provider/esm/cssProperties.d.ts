import { IThemePalette, ITheme } from "@gooddata/sdk-model";
import { CssProperty } from "./cssProperty.js";
export declare function handleUnits(value: string): string;
/**
 * @internal
 */
export type ParserFunction = {
    key: string;
    fn: (value: any) => string;
};
/**
 * @internal
 */
export declare function parseThemeToCssProperties(object: ITheme, parserFunctions?: ParserFunction[], currentKey?: string): CssProperty[];
export declare const generateShadowColor: (palette: IThemePalette, isDarkTheme: boolean) => CssProperty[];
export declare const clearCssProperties: () => void;
/**
 * Converts properties from theme object into CSS variables and injects them into <body>
 *
 * The CSS variable name is defined as a path through the theme object to the given value, e.g.:
 * ```
 * {
 *      palette: {
 *          primary: {
 *              base: #14b2e2;
 *          }
 *      }
 * }
 * ```
 * is converted to "palette-primary-base" variable with value #14b2e2
 *
 * @internal
 */
export declare function setCssProperties(theme: ITheme, isDarkTheme: boolean): void;
//# sourceMappingURL=cssProperties.d.ts.map