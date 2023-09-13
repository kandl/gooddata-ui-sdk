// (C) 2022-2023 GoodData Corporation
import { DEFAULT_HEIGHT, DEFAULT_LOCALE, } from "./EmbedInsightDialogBase/types.js";
/**
 * @internal
 */
export const getDefaultEmbedTypeOptions = (embedType) => {
    if (embedType === "react") {
        return {
            type: "react",
            codeType: "ts",
            componentType: "reference",
            displayConfiguration: true,
            customHeight: true,
        };
    }
    return {
        type: "webComponents",
        displayTitle: true,
        customTitle: false,
        allowLocale: false,
        locale: DEFAULT_LOCALE,
        customHeight: true,
    };
};
/**
 * @internal
 */
export const getHeightWithUnitsForEmbedCode = (codeOption) => {
    const unit = codeOption.unit ? codeOption.unit : "px";
    const customHeightValue = codeOption.height
        ? codeOption.height
        : getDefaultHeightForEmbedCodeByUnit(unit);
    const height = codeOption.customHeight ? customHeightValue : getDefaultHeightForEmbedCodeByUnit(unit);
    if (unit === "px") {
        return Number(height);
    }
    return `${height}${unit}`;
};
/**
 * @internal
 */
export const getDefaultHeightForEmbedCodeByUnit = (unit) => {
    return DEFAULT_HEIGHT[unit];
};
//# sourceMappingURL=utils.js.map