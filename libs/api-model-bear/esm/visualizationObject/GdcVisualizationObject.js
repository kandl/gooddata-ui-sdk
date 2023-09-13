// (C) 2007-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isVisualization(obj) {
    return !isEmpty(obj) && obj.visualizationObject !== undefined;
}
/**
 * @public
 */
export function isVisualizationObjectMeasure(bucketItem) {
    return !isEmpty(bucketItem) && bucketItem.measure !== undefined;
}
/**
 * @public
 */
export function isVisualizationObjectAttribute(bucketItem) {
    return (!isEmpty(bucketItem) &&
        bucketItem.visualizationAttribute !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectMeasureDefinition(definition) {
    return (!isEmpty(definition) &&
        definition.measureDefinition !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectArithmeticMeasureDefinition(definition) {
    return (!isEmpty(definition) &&
        definition.arithmeticMeasure !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectPoPMeasureDefinition(definition) {
    return (!isEmpty(definition) &&
        definition.popMeasureDefinition !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectPreviousPeriodMeasureDefinition(definition) {
    return (!isEmpty(definition) &&
        definition.previousPeriodMeasure !==
            undefined);
}
/**
 * @public
 */
export function isVisualizationObjectAttributeFilter(filter) {
    return (!isEmpty(filter) &&
        (filter.positiveAttributeFilter !== undefined ||
            filter.negativeAttributeFilter !== undefined));
}
/**
 * @public
 */
export function isVisualizationObjectDateFilter(filter) {
    return (!isEmpty(filter) &&
        (filter.absoluteDateFilter !== undefined ||
            filter.relativeDateFilter !== undefined));
}
/**
 * @public
 */
export function isVisualizationObjectPositiveAttributeFilter(filter) {
    return (!isEmpty(filter) &&
        filter.positiveAttributeFilter !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectNegativeAttributeFilter(filter) {
    return (!isEmpty(filter) &&
        filter.negativeAttributeFilter !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectMeasureValueFilter(filter) {
    return (!isEmpty(filter) &&
        filter.measureValueFilter !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectRankingFilter(filter) {
    return !isEmpty(filter) && filter.rankingFilter !== undefined;
}
/**
 * @public
 */
export function isVisualizationObjectAbsoluteDateFilter(filter) {
    return (!isEmpty(filter) &&
        filter.absoluteDateFilter !== undefined);
}
/**
 * @public
 */
export function isVisualizationObjectRelativeDateFilter(filter) {
    return (!isEmpty(filter) &&
        filter.relativeDateFilter !== undefined);
}
//# sourceMappingURL=GdcVisualizationObject.js.map