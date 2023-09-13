// (C) 2023 GoodData Corporation
import { isDashboardAttributeFilter, isSingleSelectionFilter, isNegativeDashboardAttributeFilter, getSelectedElementsCount, isAttributeElementsByRef, } from "@gooddata/sdk-model";
const hasMoreThenOneSelectedElement = (filter) => getSelectedElementsCount(filter) > 1;
const clearSelection = (filter) => {
    if (isAttributeElementsByRef(filter.attributeFilter.attributeElements)) {
        filter.attributeFilter.attributeElements.uris = [];
    }
    else {
        filter.attributeFilter.attributeElements.values = [];
    }
    return filter;
};
export function sanitizeSelectionMode(filters) {
    return filters.map((filter) => {
        var _a;
        if (isDashboardAttributeFilter(filter) && isSingleSelectionFilter(filter)) {
            const validFilter = filter;
            if (isNegativeDashboardAttributeFilter(filter)) {
                console.error(`Attribute filter ${filter.attributeFilter.localIdentifier || filter.attributeFilter.displayForm} has invalid definition. Can not combine selectionMode single and negativeSelection. Resetting to None filter.`);
                validFilter.attributeFilter.negativeSelection = false;
                clearSelection(validFilter);
            }
            if (hasMoreThenOneSelectedElement(filter)) {
                console.error(`Attribute filter ${filter.attributeFilter.localIdentifier || filter.attributeFilter.displayForm} has invalid definition. When selectionMode is single filter should have max one selected item. Resetting to None filter.`);
                clearSelection(validFilter);
            }
            return validFilter;
        }
        if (isDashboardAttributeFilter(filter)) {
            return Object.assign(Object.assign({}, filter), { attributeFilter: Object.assign(Object.assign({}, filter.attributeFilter), { selectionMode: (_a = filter.attributeFilter.selectionMode) !== null && _a !== void 0 ? _a : "multi" }) });
        }
        return filter;
    });
}
//# sourceMappingURL=singleSelectionFilter.js.map