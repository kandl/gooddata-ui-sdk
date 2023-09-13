// (C) 2020-2022 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl.js";
import { dataPointsDropdownLabels } from "../../constants/dropdowns.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
class DataPointsControl extends React.Component {
    render() {
        var _a, _b, _c;
        const { pushData, properties, intl, isDisabled, showDisabledMessage, defaultValue } = this.props;
        const dataPoints = (_c = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.dataPoints) === null || _b === void 0 ? void 0 : _b.visible) !== null && _c !== void 0 ? _c : defaultValue;
        return (React.createElement("div", { className: "s-data-points-config" },
            React.createElement(DropdownControl, { value: dataPoints, valuePath: "dataPoints.visible", labelText: messages.dataPoints.id, disabled: isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(dataPointsDropdownLabels, intl), showDisabledMessage: showDisabledMessage })));
    }
}
DataPointsControl.defaultProps = {
    defaultValue: "auto",
    showDisabledMessage: false,
};
export default injectIntl(DataPointsControl);
//# sourceMappingURL=DataPointsControl.js.map