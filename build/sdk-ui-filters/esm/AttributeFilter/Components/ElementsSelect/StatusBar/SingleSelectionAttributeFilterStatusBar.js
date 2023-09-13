// (C) 2023 GoodData Corporation
import React from "react";
import { AttributeFilterFilteredStatus } from "./AttributeFilterFilteredStatus.js";
/**
 * A component that displays only effective parent filters.
 * Current selection is not rendered as it is too simple for single selection filter.
 *
 * @beta
 */
export const SingleSelectionAttributeFilterStatusBar = (props) => {
    const { isFilteredByParentFilters, parentFilterTitles, totalElementsCountWithCurrentSettings } = props;
    return (React.createElement("div", { className: "gd-attribute-filter-status-bar__next" }, isFilteredByParentFilters && totalElementsCountWithCurrentSettings > 0 ? (React.createElement(AttributeFilterFilteredStatus, { parentFilterTitles: parentFilterTitles })) : null));
};
//# sourceMappingURL=SingleSelectionAttributeFilterStatusBar.js.map