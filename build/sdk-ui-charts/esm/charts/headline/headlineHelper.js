// (C) 2023 GoodData Corporation
import { isColorFromPalette } from "@gooddata/sdk-model";
import { getColorByGuid, isValidMappedColor } from "@gooddata/sdk-ui-vis-commons";
import { CalculateAs } from "../../interfaces/index.js";
/**
 * @internal
 */
var ComparisonColorType;
(function (ComparisonColorType) {
    ComparisonColorType["POSITIVE"] = "positive";
    ComparisonColorType["NEGATIVE"] = "negative";
    ComparisonColorType["EQUALS"] = "equals";
})(ComparisonColorType || (ComparisonColorType = {}));
const CALCULATION_VALUES_DEFAULT = {
    [CalculateAs.CHANGE]: {
        defaultLabelKey: "visualizations.headline.comparison.title.change",
        defaultFormat: "#,##0%",
    },
    [CalculateAs.RATIO]: {
        defaultLabelKey: "visualizations.headline.comparison.title.ratio",
        defaultFormat: "#,##0%",
    },
    [CalculateAs.DIFFERENCE]: {
        defaultLabelKey: "visualizations.headline.comparison.title.difference",
        defaultFormat: null,
    },
};
const DEFAULT_COMPARISON_COLORS_INDEX = {
    [ComparisonColorType.POSITIVE]: 0,
    [ComparisonColorType.NEGATIVE]: 1,
    [ComparisonColorType.EQUALS]: 2,
};
/**
 * @internal
 */
const DEFAULT_COMPARISON_PALETTE = [
    {
        guid: ComparisonColorType.POSITIVE,
        fill: { r: 0, g: 193, b: 141 },
    },
    {
        guid: ComparisonColorType.NEGATIVE,
        fill: { r: 229, g: 77, b: 64 },
    },
    {
        guid: ComparisonColorType.EQUALS,
        fill: { r: 148, g: 161, b: 173 },
    },
];
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
const getComparisonFormat = (providedFormat, defaultFormat) => {
    return providedFormat === undefined ? defaultFormat : providedFormat;
};
const getComparisonTitle = (labelConfig, defaultLabel) => {
    return (labelConfig === null || labelConfig === void 0 ? void 0 : labelConfig.unconditionalValue) || defaultLabel;
};
/**
 * Method to retrieve default values corresponding to the calculation type.
 *
 * @internal
 */
const getCalculationValuesDefault = (calculationType = CalculateAs.CHANGE) => {
    return CALCULATION_VALUES_DEFAULT[calculationType];
};
const getComparisonDefaultColor = (colorType, colorPalette) => {
    return getColorByGuid(colorPalette, colorType, DEFAULT_COMPARISON_COLORS_INDEX[colorType]);
};
const getComparisonPaletteColorByType = (value, colorType, colorPalette) => {
    return getColorByGuid(colorPalette, value, DEFAULT_COMPARISON_COLORS_INDEX[colorType]);
};
/**
 * @internal
 */
const getComparisonRgbColor = (color, colorType, colorPalette = DEFAULT_COMPARISON_PALETTE) => {
    if (!isValidMappedColor(color, colorPalette)) {
        return getComparisonDefaultColor(colorType, colorPalette);
    }
    return isColorFromPalette(color)
        ? getComparisonPaletteColorByType(color.value, colorType, colorPalette)
        : color === null || color === void 0 ? void 0 : color.value;
};
/**
 * NOTE: exported to satisfy sdk-ui-ext; is internal, must not be used outside of SDK; will disapppear.
 */
export { DEFAULT_COMPARISON_PALETTE, getCalculationValuesDefault, getComparisonFormat, getComparisonTitle, getComparisonRgbColor, ComparisonColorType, };
//# sourceMappingURL=headlineHelper.js.map