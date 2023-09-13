// (C) 2022 GoodData Corporation
import { isDashboardAttributeFilter } from "@gooddata/sdk-model";
import omit from "lodash/omit.js";
export const stripLocalIdentifierFromFilters = (filters) => filters.map((filter) => {
    if (isDashboardAttributeFilter(filter)) {
        return { attributeFilter: omit(filter.attributeFilter, "localIdentifier") };
    }
    return filter;
});
//# sourceMappingURL=stripLocalIdentifierFromFilters.js.map