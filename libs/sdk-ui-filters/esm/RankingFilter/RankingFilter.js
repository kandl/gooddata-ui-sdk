// (C) 2020-2022 GoodData Corporation
import React, { useState } from "react";
import { RankingFilterButton } from "./RankingFilterButton.js";
import { RankingFilterDropdown } from "./RankingFilterDropdown.js";
import noop from "lodash/noop.js";
/**
 * @beta
 */
export const RankingFilter = ({ measureItems, attributeItems, filter, onApply, onCancel, buttonTitle, onDropDownItemMouseOver, onDropDownItemMouseOut, customGranularitySelection, locale, enableRenamingMeasureToMetric, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const handleApply = (rankingFilter) => {
        onApply(rankingFilter);
        setIsOpen(false);
    };
    const handleCancel = () => {
        onCancel();
        setIsOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(RankingFilterButton, { isActive: isOpen, onClick: onButtonClick, title: buttonTitle, className: "gd-rf-dropdown-button" }),
        isOpen ? (React.createElement(RankingFilterDropdown, { measureItems: measureItems, attributeItems: attributeItems, filter: filter, onApply: handleApply, onCancel: handleCancel, anchorEl: ".gd-rf-dropdown-button", onDropDownItemMouseOver: onDropDownItemMouseOver, onDropDownItemMouseOut: onDropDownItemMouseOut, customGranularitySelection: customGranularitySelection, locale: locale, enableRenamingMeasureToMetric: enableRenamingMeasureToMetric })) : null));
};
RankingFilter.defaultProps = {
    onCancel: noop,
};
//# sourceMappingURL=RankingFilter.js.map