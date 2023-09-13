// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl.js";
import { metricsPositionDropdownItems } from "../../constants/dropdowns.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
import ConfigSubsection from "./ConfigSubsection.js";
import { ConfigDummySection } from "./ConfigDummySection.js";
class MetricsPositionControl extends React.Component {
    render() {
        var _a, _b;
        const { pushData, properties, intl, isDisabled, showDisabledMessage, defaultValue } = this.props;
        const metricsPosition = (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.measureGroupDimension) !== null && _b !== void 0 ? _b : defaultValue;
        return (React.createElement(ConfigDummySection, { id: "metric_position_section" },
            React.createElement(ConfigSubsection, { title: messages.metricsPositionTitle.id },
                React.createElement(DropdownControl, { value: metricsPosition, valuePath: "measureGroupDimension", labelText: messages.metricsPositionLabel.id, disabled: isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(metricsPositionDropdownItems, intl), showDisabledMessage: showDisabledMessage }))));
    }
}
MetricsPositionControl.defaultProps = {
    defaultValue: "columns",
    showDisabledMessage: false,
};
export default injectIntl(MetricsPositionControl);
//# sourceMappingURL=MetricsPositionControl.js.map