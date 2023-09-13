// (C) 2022-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { attributeElementsIsEmpty, filterAttributeElements, isNegativeAttributeFilter, } from "@gooddata/sdk-model";
/**
 * @internal
 */
export function isLimitingAttributeFiltersEmpty(limitingAttributeFilters) {
    return (isEmpty(limitingAttributeFilters) ||
        limitingAttributeFilters.every((limitingAttributeFilter) => isNegativeAttributeFilter(limitingAttributeFilter.attributeFilter)
            ? attributeElementsIsEmpty(filterAttributeElements(limitingAttributeFilter.attributeFilter))
            : false));
}
//# sourceMappingURL=utils.js.map