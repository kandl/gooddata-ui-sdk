// (C) 2023 GoodData Corporation
import React from "react";
import { ComparisonColorType } from "@gooddata/sdk-ui-charts";
import { COMPARISON_COLOR_CONFIG_EQUALS, COMPARISON_COLOR_CONFIG_NEGATIVE, COMPARISON_COLOR_CONFIG_POSITIVE, } from "../../ComparisonValuePath.js";
import { comparisonMessages } from "../../../../../../locales.js";
import ColorItem from "./ColorItem.js";
import ColorCheckbox from "./ColorCheckbox.js";
import ColorResetButton from "./ColorResetButton.js";
const ColorsControl = ({ disabled, showDisabledMessage, properties, colorPalette, pushData, }) => {
    var _a, _b;
    const colorConfig = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.colorConfig;
    const isColorDisabled = disabled || (colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.disabled);
    return (React.createElement("div", { className: "comparison-color-control s-comparison-color-control" },
        React.createElement(ColorCheckbox, { disabled: disabled, showDisabledMessage: showDisabledMessage, properties: properties, pushData: pushData }),
        React.createElement("div", { className: "comparison-color-list-item s-comparison-color-list-item" },
            React.createElement(ColorItem, { disabled: isColorDisabled, showDisabledMessage: showDisabledMessage, color: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.positive, colorType: ComparisonColorType.POSITIVE, colorPalette: colorPalette, valuePath: COMPARISON_COLOR_CONFIG_POSITIVE, labelDescriptor: comparisonMessages.colorsConfigPositive, properties: properties, pushData: pushData }),
            React.createElement(ColorItem, { disabled: isColorDisabled, showDisabledMessage: showDisabledMessage, color: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.negative, colorType: ComparisonColorType.NEGATIVE, colorPalette: colorPalette, valuePath: COMPARISON_COLOR_CONFIG_NEGATIVE, labelDescriptor: comparisonMessages.colorsConfigNegative, properties: properties, pushData: pushData }),
            React.createElement(ColorItem, { disabled: isColorDisabled, showDisabledMessage: showDisabledMessage, color: colorConfig === null || colorConfig === void 0 ? void 0 : colorConfig.equals, colorType: ComparisonColorType.EQUALS, colorPalette: colorPalette, valuePath: COMPARISON_COLOR_CONFIG_EQUALS, labelDescriptor: comparisonMessages.colorsConfigEquals, properties: properties, pushData: pushData })),
        React.createElement(ColorResetButton, { disabled: disabled, properties: properties, pushData: pushData })));
};
export default ColorsControl;
//# sourceMappingURL=ColorsControl.js.map