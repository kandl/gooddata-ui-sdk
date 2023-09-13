// (C) 2021-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "../DropdownControl";
import { getTranslatedDropdownItems } from "../../../utils/translations";
import { formatDropdownItems } from "../../../constants/dropdowns";
import { messages } from "../../../../locales";
const getControlProperties = (properties, axis) => {
    var _a, _b, _c, _d;
    const axisProperties = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a[axis];
    const axisVisible = (_b = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.visible) !== null && _b !== void 0 ? _b : true;
    const axisLabelsEnabled = (_c = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.labelsEnabled) !== null && _c !== void 0 ? _c : true;
    const axisFormat = (_d = axisProperties === null || axisProperties === void 0 ? void 0 : axisProperties.format) !== null && _d !== void 0 ? _d : "auto";
    return {
        axisVisible,
        axisLabelsEnabled,
        axisFormat,
    };
};
const LabelFormatControlComponent = (props) => {
    const { disabled, properties, axis, configPanelDisabled, pushData, intl } = props;
    const { axisVisible, axisLabelsEnabled, axisFormat } = getControlProperties(properties, axis);
    const isDisabled = disabled || !axisVisible || !axisLabelsEnabled;
    return (React.createElement(DropdownControl, { value: axisFormat, valuePath: `${axis}.format`, labelText: messages.axisFormat.id, disabled: isDisabled, showDisabledMessage: !configPanelDisabled && isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(formatDropdownItems, intl) }));
};
export const LabelFormatControl = injectIntl(LabelFormatControlComponent);
//# sourceMappingURL=LabelFormatControl.js.map