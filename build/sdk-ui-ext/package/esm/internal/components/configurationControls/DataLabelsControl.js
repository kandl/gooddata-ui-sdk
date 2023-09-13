// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl";
import { dataLabelsDropdownItems } from "../../constants/dropdowns";
import { getTranslatedDropdownItems } from "../../utils/translations";
import { messages } from "../../../locales";
class DataLabelsControl extends React.Component {
    render() {
        var _a, _b, _c, _d, _e, _f;
        const { pushData, properties, intl, isDisabled, showDisabledMessage, defaultValue, isTotalsDisabled, enableSeparateTotalLabels, } = this.props;
        const dataLabels = (_c = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.dataLabels) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : defaultValue;
        const totalLabels = (_f = (_e = (_d = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _d === void 0 ? void 0 : _d.dataLabels) === null || _e === void 0 ? void 0 : _e.totalsVisible) !== null && _f !== void 0 ? _f : defaultValue;
        return (React.createElement("div", { className: "s-data-labels-config" },
            React.createElement(DropdownControl, { value: dataLabels, valuePath: "dataLabels.visible", labelText: messages.dataLabels.id, disabled: isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(dataLabelsDropdownItems, intl), showDisabledMessage: showDisabledMessage }),
            enableSeparateTotalLabels ? (React.createElement(DropdownControl, { value: totalLabels, valuePath: "dataLabels.totalsVisible", labelText: messages.totalLabels.id, disabled: isTotalsDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(dataLabelsDropdownItems, intl), showDisabledMessage: isTotalsDisabled })) : null));
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