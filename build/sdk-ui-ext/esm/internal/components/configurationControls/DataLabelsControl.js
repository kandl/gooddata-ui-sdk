// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl.js";
import CheckboxControl from "../configurationControls/CheckboxControl.js";
import { dataLabelsDropdownItems } from "../../constants/dropdowns.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
class DataLabelsControl extends React.Component {
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const { pushData, properties, intl, isDisabled, showDisabledMessage, defaultValue, isTotalsDisabled, enableSeparateTotalLabels, enablePercentLabels, } = this.props;
        const dataLabels = (_c = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.dataLabels) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : defaultValue;
        const totalLabels = (_f = (_e = (_d = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _d === void 0 ? void 0 : _d.dataLabels) === null || _e === void 0 ? void 0 : _e.totalsVisible) !== null && _f !== void 0 ? _f : defaultValue;
        const percentLabels = (_j = (_h = (_g = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _g === void 0 ? void 0 : _g.dataLabels) === null || _h === void 0 ? void 0 : _h.percentsVisible) !== null && _j !== void 0 ? _j : true;
        const percentLabelsDisabled = isDisabled || !dataLabels;
        // Decide about percents tooltip message: show info variant when not disabled,
        // show special message when disabled by hidden data labels and don't show for
        // other  disabled situations (like loading state, missing metrics state etc.)
        let percentLabelsMessageId;
        if (!dataLabels) {
            percentLabelsMessageId = messages.canvasLabelsPercentagesDisabled.id;
        }
        else if (!percentLabelsDisabled) {
            percentLabelsMessageId = messages.canvasLabelsPercentagesInfo.id;
        }
        return (React.createElement("div", { className: "s-data-labels-config" },
            React.createElement(DropdownControl, { value: dataLabels, valuePath: "dataLabels.visible", labelText: messages.dataLabels.id, disabled: isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(dataLabelsDropdownItems, intl), showDisabledMessage: showDisabledMessage }),
            enableSeparateTotalLabels ? (React.createElement(DropdownControl, { value: totalLabels, valuePath: "dataLabels.totalsVisible", labelText: messages.totalLabels.id, disabled: isTotalsDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(dataLabelsDropdownItems, intl), showDisabledMessage: isTotalsDisabled })) : null,
            enablePercentLabels ? (React.createElement(CheckboxControl, { valuePath: "dataLabels.percentsVisible", labelText: messages.canvasLabelsPercentages.id, properties: properties, checked: percentLabels, disabled: percentLabelsDisabled, disabledMessageId: percentLabelsMessageId, showDisabledMessage: !!percentLabelsMessageId, pushData: pushData })) : null));
    }
}
DataLabelsControl.defaultProps = {
    defaultValue: "auto",
    showDisabledMessage: false,
    isTotalsDisabled: true,
    enableSeparateTotalLabels: false,
};
export default injectIntl(DataLabelsControl);
//# sourceMappingURL=DataLabelsControl.js.map