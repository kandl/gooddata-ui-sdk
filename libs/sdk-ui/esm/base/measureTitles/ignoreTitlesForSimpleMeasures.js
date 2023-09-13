// (C) 2007-2021 GoodData Corporation
import { isSimpleMeasure, isAdhocMeasure, modifyMeasure, insightModifyItems, isDateFilter, insightMeasures, measureFilters, } from "@gooddata/sdk-model";
/**
 * This function ignores the titles of simple measures.
 *
 * For simple measures, their titles are removed.
 * For adhoc or non-simple measures, their titles are left intact.
 *
 * @param insight - insight or insight definition that must be processed.
 * @returns a copy of insight modified bucket items
 *
 * @internal
 */
export function ignoreTitlesForSimpleMeasures(insight) {
    const measuresWithDateFilter = insightMeasures(insight, (measure) => { var _a, _b; return (_b = (_a = measureFilters(measure)) === null || _a === void 0 ? void 0 : _a.some(isDateFilter)) !== null && _b !== void 0 ? _b : false; });
    if (measuresWithDateFilter.length > 0) {
        // If the insight contains a measure with a date filter, all other measures are considered adhoc measures
        // and their titles should be left intact.
        return insight;
    }
    return insightModifyItems(insight, (bucketItem) => {
        if (isSimpleMeasure(bucketItem) && !isAdhocMeasure(bucketItem)) {
            return modifyMeasure(bucketItem, (m) => m.noTitle());
        }
        return bucketItem;
    });
}
//# sourceMappingURL=ignoreTitlesForSimpleMeasures.js.map