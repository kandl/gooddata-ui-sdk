// (C) 2007-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { bucketItems, bucketsFind, isAttribute, isMeasure, measureDoesComputeRatio, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
function isItemsArray(obj) {
    return !isEmpty(obj) && (isMeasure(obj[0]) || isAttribute(obj));
}
export function sanitizeConfig(input = [], config = {}) {
    if (!input.length) {
        return config;
    }
    const items = isItemsArray(input) ? input : bucketItems(bucketsFind(input, BucketNames.MEASURES));
    if (items) {
        const isComputeRatio = isComputeRatioMeasure(items[0]);
        const { stackMeasures, stackMeasuresToPercent } = config;
        return Object.assign(Object.assign({}, config), { stackMeasures: stackMeasures && !isComputeRatio, stackMeasuresToPercent: stackMeasuresToPercent && !isComputeRatio });
    }
    return config;
}
function isComputeRatioMeasure(bucketItem) {
    return isMeasure(bucketItem) && measureDoesComputeRatio(bucketItem);
}
export function getSanitizedStackingConfig(executionDef, chartConfig) {
    let updatedChartConfig = chartConfig;
    // In case enableChartSorting is set to true and sort was not specified,
    // we need to change its value, so visualization is able to take default sort
    if (executionDef.sortBy.length === 0 && chartConfig.enableChartSorting) {
        updatedChartConfig = Object.assign(Object.assign({}, updatedChartConfig), { enableChartSorting: false });
    }
    if (executionDef.measures.length === 1) {
        const { stackMeasures, stackMeasuresToPercent } = chartConfig;
        const singleMeasure = executionDef.measures[0];
        const isComputeRatio = measureDoesComputeRatio(singleMeasure);
        return Object.assign(Object.assign({}, updatedChartConfig), { stackMeasures: stackMeasures && !isComputeRatio, stackMeasuresToPercent: stackMeasuresToPercent && !isComputeRatio });
    }
    return updatedChartConfig;
}
//# sourceMappingURL=sanitizeStacking.js.map