import { ThemeColor, IThemePalette } from "@gooddata/sdk-model";
import { CssProperty } from "./cssProperty.js";
export declare const getHigherContrastColor: (amount: number, color: ThemeColor, isDarkTheme: boolean) => ThemeColor;
export declare const getLowerContrastColor: (amount: number, color: ThemeColor, isDarkTheme: boolean) => ThemeColor;
export declare const getLeastContrastColor: (color: ThemeColor, isDarkTheme: boolean) => ThemeColor;
export declare const mixWith0ComplementaryColor: (amount: number, color: ThemeColor, palette: IThemePalette) => ThemeColor;
export declare const mixWith8ComplementaryColor: (amount: number, color: ThemeColor, palette: IThemePalette) => ThemeColor;
/**
 * @internal
 */
export declare const generateDerivedColors: (palette: IThemePalette, isDarkTheme: boolean) => CssProperty[];
//# sourceMappingURL=derivedColors.d.ts.map