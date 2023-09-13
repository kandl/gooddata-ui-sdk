// (C) 2021-2022 GoodData Corporation
import React, { useMemo } from "react";
import { AttributeFilterEmptySearchResult } from "./AttributeFilterEmptySearchResult.js";
import { AttributeFilterEmptyAttributeResult } from "./AttributeFilterEmptyAttributeResult.js";
import { AttributeFilterAllValuesFilteredResult } from "./AttributeFilterEmptyFilteredResult.js";
/**
 * This component displays different types of messages for situations when all elements are filtered out.
 * It distinguishes messages when current criteria return empty results or all elements are filtered by parents or by search.
 * @beta
 */
export const AttributeFilterEmptyResult = ({ height, totalItemsCount, searchString, isFilteredByParentFilters, parentFilterTitles = [], }) => {
    let renderEmptyResult = null;
    const style = useMemo(() => {
        return {
            height,
        };
    }, [height]);
    if (totalItemsCount === 0) {
        renderEmptyResult = React.createElement(AttributeFilterEmptyAttributeResult, null);
    }
    else if (isFilteredByParentFilters) {
        renderEmptyResult = (React.createElement(AttributeFilterAllValuesFilteredResult, { parentFilterTitles: parentFilterTitles }));
    }
    else if (searchString.length > 0) {
        renderEmptyResult = React.createElement(AttributeFilterEmptySearchResult, null);
    }
    return (React.createElement("div", { className: "gd-attribute-filter-empty-result__next", style: style }, renderEmptyResult));
};
//# sourceMappingURL=AttributeFilterEmptyResult.js.map