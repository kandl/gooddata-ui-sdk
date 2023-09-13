// (C) 2023 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import capitalize from "lodash/capitalize.js";
import { comparisonMessages } from "../../../../../locales.js";
const SECTION_TITLE_KEYS = {
    example: comparisonMessages.calculationTooltipExampleSection.id,
    useIn: comparisonMessages.calculationTooltipUseInSection.id,
    formula: comparisonMessages.calculationTooltipFormulaSection.id,
};
const SECTION_CONTENT_KEYS = {
    exampleChange: comparisonMessages.calculatedAsChangeTooltipExample.id,
    useInChange: comparisonMessages.calculatedAsChangeTooltipUseIn.id,
    formulaChange: comparisonMessages.calculatedAsChangeTooltipFormula.id,
    exampleRatio: comparisonMessages.calculatedAsRatioTooltipExample.id,
    useInRatio: comparisonMessages.calculatedAsRatioTooltipUseIn.id,
    formulaRatio: comparisonMessages.calculatedAsRatioTooltipFormula.id,
    exampleDifference: comparisonMessages.calculatedAsDifferenceTooltipExample.id,
    useInDifference: comparisonMessages.calculatedAsDifferenceTooltipUseIn.id,
    formulaDifference: comparisonMessages.calculatedAsDifferenceTooltipFormula.id,
};
const getSectionTitleKey = (section) => {
    return SECTION_TITLE_KEYS[section];
};
const getSectionContentKey = (section, calculationType) => {
    const property = `${section}${capitalize(calculationType)}`;
    return SECTION_CONTENT_KEYS[property];
};
const CalculationListItemInfoSection = ({ calculationType, section, }) => {
    const titleKey = getSectionTitleKey(section);
    const contentKey = getSectionContentKey(section, calculationType);
    return (React.createElement(React.Fragment, null,
        React.createElement(FormattedMessage, { id: titleKey, tagName: "h4" }),
        React.createElement(FormattedMessage, { id: contentKey, tagName: "p" })));
};
export default CalculationListItemInfoSection;
//# sourceMappingURL=CalculationListItemInfoSection.js.map