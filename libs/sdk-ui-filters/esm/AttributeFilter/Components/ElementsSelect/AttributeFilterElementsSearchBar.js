// (C) 2021-2022 GoodData Corporation
import React from "react";
import { InvertableSelectSearchBar } from "@gooddata/sdk-ui-kit";
/**
 * This component displays a text field and calls onSearch callback when user types search text.
 *
 * @beta
 */
export const AttributeFilterElementsSearchBar = (props) => {
    const { onSearch, searchString, isSmall } = props;
    return React.createElement(InvertableSelectSearchBar, { onSearch: onSearch, searchString: searchString, isSmall: isSmall });
};
//# sourceMappingURL=AttributeFilterElementsSearchBar.js.map