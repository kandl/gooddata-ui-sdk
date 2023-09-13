// (C) 2021 GoodData Corporation
import { isSomeHeaderPredicateMatched, } from "@gooddata/sdk-ui";
import { createDrillHeaders } from "./colDrillHeadersFactory.js";
export function isCellDrillable(colDescriptor, row, dv, drillablePredicates, columnHeadersPosition, isTransposed) {
    if (drillablePredicates.length === 0 || colDescriptor.type === "mixedHeadersCol") {
        return false;
    }
    const headers = createDrillHeaders(colDescriptor, row, columnHeadersPosition, isTransposed);
    return headers.some((drillItem) => isSomeHeaderPredicateMatched(drillablePredicates, drillItem, dv));
}
//# sourceMappingURL=cellDrillabilityPredicate.js.map