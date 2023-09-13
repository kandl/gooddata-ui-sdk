// (C) 2023 GoodData Corporation
import React from "react";
import { comparisonMessages } from "../../../../../locales.js";
import ConfigSubsection from "../../ConfigSubsection.js";
import ArrowControl from "./ArrowControl.js";
import ColorsControl from "./colorsControl/ColorsControl.js";
const IndicatorSubSection = ({ sectionDisabled, showDisabledMessage, properties, colorPalette, pushData, }) => {
    return (React.createElement(ConfigSubsection, { title: comparisonMessages.indicatorSubSectionTitle.id, canBeToggled: false },
        React.createElement("div", { className: "comparison-indicator-sub-section s-comparison-indicator-sub-section" },
            React.createElement(ArrowControl, { disabled: sectionDisabled, showDisabledMessage: showDisabledMessage, properties: properties, pushData: pushData }),
            React.createElement(ColorsControl, { disabled: sectionDisabled, showDisabledMessage: showDisabledMessage, properties: properties, colorPalette: colorPalette, pushData: pushData }))));
};
export default IndicatorSubSection;
//# sourceMappingURL=IndicatorSubSection.js.map