// (C) 2023 GoodData Corporation
import React from "react";
import { comparisonMessages } from "../../../../../locales.js";
import ConfigSubsection from "../../ConfigSubsection.js";
import NumberFormatControl from "./numberFormat/NumberFormatControl.js";
import ComparisonPositionControl from "./ComparisonPositionControl.js";
const ValueSubSection = ({ sectionDisabled, showDisabledMessage, defaultFormat, separators, properties, pushData, }) => {
    return (React.createElement(ConfigSubsection, { title: comparisonMessages.valueSubSectionTitle.id, canBeToggled: false },
        React.createElement(NumberFormatControl, { disabled: sectionDisabled, showDisabledMessage: showDisabledMessage, defaultFormat: defaultFormat, separators: separators, properties: properties, pushData: pushData }),
        React.createElement(ComparisonPositionControl, { disabled: sectionDisabled, showDisabledMessage: showDisabledMessage, properties: properties, pushData: pushData })));
};
export default ValueSubSection;
//# sourceMappingURL=ValueSubSection.js.map