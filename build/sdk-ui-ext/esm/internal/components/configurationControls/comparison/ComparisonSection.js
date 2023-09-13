// (C) 2023 GoodData Corporation
import React from "react";
import { comparisonMessages } from "../../../../locales.js";
import { COMPARISON_ENABLED_VALUE_PATH } from "./ComparisonValuePath.js";
import ConfigSection from "../ConfigSection.js";
import CalculationControl from "./calculation/CalculationControl.js";
import ValueSubSection from "./values/ValueSubSection.js";
import { getComparisonDefaultValues } from "../../../utils/comparisonHelper.js";
import IndicatorSubSection from "./indicators/IndicatorSubSection.js";
import LabelSubSection from "./label/LabelSubSection.js";
const ComparisonSection = ({ controlDisabled, disabledByVisualization, defaultCalculationType, separators, properties, propertiesMeta, colorPalette, pushData, }) => {
    var _a, _b;
    const toggledOn = (_b = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.comparison) === null || _b === void 0 ? void 0 : _b.enabled;
    const comparisonDisabled = controlDisabled || disabledByVisualization;
    const sectionDisabled = comparisonDisabled || !toggledOn;
    const showDisabledMessage = !controlDisabled && disabledByVisualization;
    const { defaultFormat, defaultLabelKey } = getComparisonDefaultValues(defaultCalculationType, properties);
    return (React.createElement(ConfigSection, { id: "comparison_section", valuePath: COMPARISON_ENABLED_VALUE_PATH, title: comparisonMessages.title.id, propertiesMeta: propertiesMeta, properties: properties, pushData: pushData, canBeToggled: true, toggleDisabled: comparisonDisabled, showDisabledMessage: showDisabledMessage, toggledOn: toggledOn },
        React.createElement(CalculationControl, { disabled: sectionDisabled, showDisabledMessage: showDisabledMessage, defaultCalculationType: defaultCalculationType, properties: properties, pushData: pushData }),
        React.createElement(ValueSubSection, { sectionDisabled: sectionDisabled, showDisabledMessage: showDisabledMessage, defaultFormat: defaultFormat, separators: separators, properties: properties, pushData: pushData }),
        React.createElement(IndicatorSubSection, { sectionDisabled: sectionDisabled, showDisabledMessage: showDisabledMessage, properties: properties, colorPalette: colorPalette, pushData: pushData }),
        React.createElement(LabelSubSection, { sectionDisabled: sectionDisabled, showDisabledMessage: showDisabledMessage, defaultLabelKey: defaultLabelKey, properties: properties, pushData: pushData })));
};
export default ComparisonSection;
//# sourceMappingURL=ComparisonSection.js.map