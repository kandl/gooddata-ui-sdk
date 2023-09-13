import { IColor, IColorPalette, IRgbColorValue } from "@gooddata/sdk-model";
import { CalculationType, ILabelConfig } from "../../interfaces/index.js";
/**
 * @internal
 */
interface ICalculationDefaultValue {
    defaultLabelKey: string;
    defaultFormat: string;
}
/**
 * @internal
 */
declare enum ComparisonColorType {
    POSITIVE = "positive",
    NEGATIVE = "negative",
    EQUALS = "equals"
}
/**
 * @internal
 */
declare const DEFAULT_COMPARISON_PALETTE: IColorPalette;
/**
 * Get comparison format
 *
 * @remarks
 * We offer the option to inherit the format with a null value. When the provided format is null,
 * it indicates the user's preference to utilize the inherit format.
 *
 * If the format is undefined, the default format will be used.
 *
 * @internal
 */
declare const getComparisonFormat: (providedFormat: string, defaultFormat: string) => string;
declare const getComparisonTitle: (labelConfig: ILabelConfig, defaultLabel: string) => string;
/**
 * Method to retrieve default values corresponding to the calculation type.
 *
 * @internal
 */
declare const getCalculationValuesDefault: (calculationType?: CalculationType) => ICalculationDefaultValue;
/**
 * @internal
 */
declare const getComparisonRgbColor: (color: IColor, colorType: ComparisonColorType, colorPalette?: IColorPalette) => IRgbColorValue;
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { DEFAULT_COMPARISON_PALETTE, getCalculationValuesDefault, getComparisonFormat, getComparisonTitle, getComparisonRgbColor, ICalculationDefaultValue, ComparisonColorType, };
//# sourceMappingURL=headlineHelper.d.ts.map