// (C) 2020 GoodData Corporation
import { totalIsNative } from "@gooddata/sdk-model";
import { isRankingFilter, isActiveMeasureValueFilter } from "../../../utils/bucketHelper.js";
function isNativeTotalInvalid(total, hasRankingFilter, hasMeasureValueFilter) {
    return totalIsNative(total) && (hasRankingFilter || hasMeasureValueFilter);
}
function removeInvalidNativeTotals(totals, filters) {
    const hasRankingFilter = filters.some(isRankingFilter);
    const hasMeasureValueFilter = filters.some(isActiveMeasureValueFilter);
    return totals.filter((total) => !isNativeTotalInvalid(total, hasRankingFilter, hasMeasureValueFilter));
}
export function removeInvalidTotals(totals, filters) {
    return removeInvalidNativeTotals(totals, filters);
}
//# sourceMappingURL=totalsHelpers.js.map