import React from "react";
import { AttributeFilterFilteredStatus } from "./AttributeFilterFilteredStatus.js";
import { AttributeFilterSelectionStatus } from "./AttributeFilterSelectionStatus.js";
/**
 * A component that displays status of current selection, like number of selected elements, if Attribute Filter is inverted and list of selected elements.
 *
 * @beta
 */
export const AttributeFilterStatusBar = (props) => {
    const { isFilteredByParentFilters, parentFilterTitles, totalElementsCountWithCurrentSettings, getItemTitle, isInverted, selectedItems, selectedItemsLimit, } = props;
    return (React.createElement("div", { className: "gd-attribute-filter-status-bar__next" },
        React.createElement(AttributeFilterSelectionStatus, { isInverted: isInverted, getItemTitle: getItemTitle, selectedItems: selectedItems, selectedItemsLimit: selectedItemsLimit }),
        isFilteredByParentFilters && totalElementsCountWithCurrentSettings > 0 ? (React.createElement(AttributeFilterFilteredStatus, { parentFilterTitles: parentFilterTitles })) : null));
};
//# sourceMappingURL=AttributeFilterStatusBar.js.map