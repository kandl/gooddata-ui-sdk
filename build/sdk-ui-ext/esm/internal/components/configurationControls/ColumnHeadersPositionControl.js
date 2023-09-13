// (C) 2019-2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import DropdownControl from "./DropdownControl.js";
import { columnHeadersPositionDropdownItems } from "../../constants/dropdowns.js";
import { getTranslatedDropdownItems } from "../../utils/translations.js";
import { messages } from "../../../locales.js";
import ConfigSubsection from "./ConfigSubsection.js";
import { ConfigDummySection } from "./ConfigDummySection.js";
import { isSetColumnHeadersPositionToLeftAllowed } from "../../utils/controlsHelper.js";
class ColumnHeadersPositionControl extends React.Component {
    render() {
        var _a, _b;
        const { pushData, properties, intl, isDisabled, defaultValue, insight } = this.props;
        const columnHeadersPosition = isSetColumnHeadersPositionToLeftAllowed(insight)
            ? (_b = (_a = properties === null || properties === void 0 ? void 0 : properties.controls) === null || _a === void 0 ? void 0 : _a.columnHeadersPosition) !== null && _b !== void 0 ? _b : defaultValue
            : defaultValue;
        return (React.createElement(ConfigDummySection, { id: "column_header_position_section" },
            React.createElement(ConfigSubsection, { title: messages.columnHeaderPositionTitle.id },
                React.createElement(DropdownControl, { value: columnHeadersPosition, valuePath: "columnHeadersPosition", labelText: messages.columnHeaderPositionLabel.id, disabled: isDisabled, properties: properties, pushData: pushData, items: getTranslatedDropdownItems(columnHeadersPositionDropdownItems, intl), showDisabledMessage: isDisabled }))));
    }
}
ColumnHeadersPositionControl.defaultProps = {
    defaultValue: "top",
    showDisabledMessage: false,
};
export default injectIntl(ColumnHeadersPositionControl);
//# sourceMappingURL=ColumnHeadersPositionControl.js.map