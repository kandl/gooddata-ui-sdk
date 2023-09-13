// (C) 2021-2022 GoodData Corporation
import React from "react";
import { InvertableSelectAllCheckbox } from "@gooddata/sdk-ui-kit";
/**
 * It displays three state a checkbox and allow select all or none elements that respect current search criteria.
 * It also displays a number of elements that respect current search criteria.
 *
 * @beta
 */
export const AttributeFilterElementsActions = (props) => {
    const { checked, isVisible, onChange, onToggle, isFiltered, totalItemsCount, isPartialSelection } = props;
    return (React.createElement(InvertableSelectAllCheckbox, { isVisible: isVisible, checked: checked, onChange: onChange, onToggle: onToggle, isFiltered: isFiltered, totalItemsCount: totalItemsCount, isPartialSelection: isPartialSelection }));
};
//# sourceMappingURL=AttributeFilterElementsActions.js.map