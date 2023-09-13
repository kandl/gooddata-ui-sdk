// (C) 2022-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { areObjRefsEqual, insightMeasures, isDateFilter, isSimpleMeasure, measureFilters, } from "@gooddata/sdk-model";
export function getUnrelatedDateDataset(relatedDateDataSets, selectedDateDataSet, selectedDateDataSetHidden) {
    if (!selectedDateDataSet || selectedDateDataSetHidden) {
        return undefined;
    }
    const idx = relatedDateDataSets.findIndex((dateDataSet) => areObjRefsEqual(dateDataSet.dataSet.ref, selectedDateDataSet.dataSet.ref));
    return idx < 0 ? selectedDateDataSet : undefined;
}
function isDateFiltered(measure) {
    if (isSimpleMeasure(measure)) {
        const filters = measureFilters(measure);
        return !!(filters === null || filters === void 0 ? void 0 : filters.some(isDateFilter));
    }
    return true;
}
export function getDateOptionsDisabledForInsight(insight) {
    const measures = insightMeasures(insight);
    return isEmpty(measures) ? false : measures.every(isDateFiltered);
}
export function removeDateFromTitle(title) {
    return title.trim().replace(/^Date \((.*)\)$/, "$1");
}
export function getAttributeByDisplayForm(attributes, displayForm) {
    return attributes.find((attribute) => areObjRefsEqual(attribute.ref, displayForm));
}
//# sourceMappingURL=utils.js.map