// (C) 2021-2022 GoodData Corporation
import { useMemo } from "react";
import { invariant } from "ts-invariant";
import { dashboardAttributeFilterToAttributeFilter } from "../../../_staging/dashboard/dashboardFilterConverter.js";
import { selectFilterContextAttributeFilters, useDashboardSelector } from "../../../model/index.js";
/**
 * Returns parent filtering input props for {@link @gooddata/sdk-ui-filters#AttributeFilter} for particular dashboard attribute filter.
 *
 * @param filter - dashboard filter to get the parent filter-related data
 *
 * @public
 */
export const useParentFilters = (filter) => {
    const allAttributeFilters = useDashboardSelector(selectFilterContextAttributeFilters);
    const parentFiltersData = useMemo(() => {
        var _a;
        return (_a = filter.attributeFilter.filterElementsBy) === null || _a === void 0 ? void 0 : _a.map((parent) => {
            const matchingFilter = allAttributeFilters.find((filter) => filter.attributeFilter.localIdentifier === parent.filterLocalIdentifier);
            invariant(matchingFilter); // if this blows up, the state is inconsistent
            return { filter: matchingFilter, over: parent.over.attributes[0] };
        });
    }, [allAttributeFilters, filter.attributeFilter.filterElementsBy]);
    const parentFilters = useMemo(() => {
        return parentFiltersData === null || parentFiltersData === void 0 ? void 0 : parentFiltersData.map((item) => dashboardAttributeFilterToAttributeFilter(item.filter));
    }, [parentFiltersData]);
    const parentOverLookup = useMemo(() => {
        // no parents -> no need for the lookup function
        if (!parentFiltersData) {
            return undefined;
        }
        return (_parentFilter, index) => parentFiltersData[index].over;
    }, [parentFiltersData]);
    return {
        parentFilters,
        parentFilterOverAttribute: parentOverLookup,
    };
};
//# sourceMappingURL=useParentFilters.js.map