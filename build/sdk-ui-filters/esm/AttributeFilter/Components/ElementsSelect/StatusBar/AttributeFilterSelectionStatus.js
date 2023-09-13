// (C) 2021-2022 GoodData Corporation
import React from "react";
import { InvertableSelectStatusBar } from "@gooddata/sdk-ui-kit";
/**
 * A component that displays status of current selection, like number of selected elements, if Attribute Filter is inverted and list of selected elements.
 * @beta
 */
export const AttributeFilterSelectionStatus = (props) => {
    const { isInverted, selectedItems, getItemTitle, selectedItemsLimit } = props;
    return (React.createElement(InvertableSelectStatusBar, { className: "gd-attribute-filter-selection-status__next", isInverted: isInverted, getItemTitle: getItemTitle, selectedItems: selectedItems, selectedItemsLimit: selectedItemsLimit }));
};
//# sourceMappingURL=AttributeFilterSelectionStatus.js.map