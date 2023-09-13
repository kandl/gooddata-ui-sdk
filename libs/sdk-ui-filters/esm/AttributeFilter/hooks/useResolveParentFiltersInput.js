// (C) 2021-2022 GoodData Corporation
import { useMemo } from "react";
import { useResolveValueWithPlaceholders } from "@gooddata/sdk-ui";
import { filterIsEmpty } from "@gooddata/sdk-model";
import isFunction from "lodash/isFunction.js";
/**
 * @internal
 */
export const useResolveParentFiltersInput = (parentFilters, overAttribute) => {
    const resolvedParentFilters = useResolveValueWithPlaceholders(parentFilters);
    return useMemo(() => {
        return getParentFiltersWithOverAttribute(resolvedParentFilters, overAttribute);
    }, [resolvedParentFilters, overAttribute]);
};
const getParentFiltersWithOverAttribute = (parentFilters, overAttribute) => {
    if (!parentFilters || !overAttribute) {
        return [];
    }
    const overAttributeGetter = isFunction(overAttribute) ? overAttribute : () => overAttribute;
    return parentFilters
        .map((attributeFilter, index) => {
        return {
            attributeFilter,
            overAttribute: overAttributeGetter(attributeFilter, index),
        };
    })
        .filter((item) => {
        return !filterIsEmpty(item.attributeFilter);
    });
};
//# sourceMappingURL=useResolveParentFiltersInput.js.map