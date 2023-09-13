import { getRgbStringFromRGB } from "@gooddata/sdk-ui-vis-commons";
import { EvaluationType } from "../interfaces/BaseHeadlines.js";
import { ComparisonColorType, DEFAULT_COMPARISON_PALETTE, getComparisonRgbColor, } from "../../headlineHelper.js";
export const getComparisonColor = (colorConfig, evaluationType, colorPalette = DEFAULT_COMPARISON_PALETTE) => {
    if ((colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.disabled) || !evaluationType) {
        return null;
    }
    const { providedColor, colorType } = getProvidedColorByEvaluationType(colorConfig, evaluationType);
    const rgbColor = getComparisonRgbColor(providedColor, colorType, colorPalette);
    return rgbColor && getRgbStringFromRGB(rgbColor);
};
const getProvidedColorByEvaluationType = (colorConfig, evaluationType) => {
    switch (evaluationType) {
        case EvaluationType.POSITIVE_VALUE:
            return {
                providedColor: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.positive,
                colorType: ComparisonColorType.POSITIVE,
            };
        case EvaluationType.NEGATIVE_VALUE:
            return {
                providedColor: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.negative,
                colorType: ComparisonColorType.NEGATIVE,
            };
        default:
        case EvaluationType.EQUALS_VALUE:
            return {
                providedColor: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.equals,
                colorType: ComparisonColorType.EQUALS,
            };
    }
};
//# sourceMappingURL=ComparisonDataItemUtils.js.map