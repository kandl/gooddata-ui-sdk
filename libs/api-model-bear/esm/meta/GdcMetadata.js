// (C) 2007-2022 GoodData Corporation
import isEmpty from "lodash/fp/isEmpty.js";
import has from "lodash/has.js";
/**
 * @public
 */
export function isMetadataObjectAttribute(obj) {
    return !isEmpty(obj) && obj.meta.category === "attribute";
}
/**
 * @public
 */
export function isWrappedAttribute(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "attribute");
}
/**
 * @public
 */
export function isWrappedAttributeDisplayForm(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "attributeDisplayForm");
}
/**
 * @public
 */
export function isAttributeDisplayForm(obj) {
    return !isEmpty(obj) && obj.meta.category === "attributeDisplayForm";
}
/**
 * @public
 */
export function isWrappedMetric(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "metric");
}
/**
 * @public
 */
export function isMetric(obj) {
    return !isEmpty(obj) && obj.meta.category === "metric";
}
/**
 * @public
 */
export function isWrappedFact(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "fact");
}
/**
 * @public
 */
export function isFact(obj) {
    return !isEmpty(obj) && obj.meta.category === "fact";
}
/**
 * @public
 */
export function isKpiAlert(obj) {
    return !isEmpty(obj) && obj.meta.category === "kpiAlert";
}
/**
 * @public
 */
export function isWrappedKpiAlert(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "kpiAlert");
}
/**
 * @public
 */
export function isMetadataObjectDataSet(obj) {
    return !isEmpty(obj) && obj.meta.category === "dataSet";
}
/**
 * @public
 */
export function isMetadataObjectWrappedDataSet(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "dataSet");
}
/**
 * @public
 */
export function isPrompt(obj) {
    return !isEmpty(obj) && obj.meta.category === "prompt";
}
/**
 * @public
 */
export function isWrappedPrompt(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "prompt");
}
/**
 * @public
 */
export function isTheme(obj) {
    return !isEmpty(obj) && obj.meta.category === "theme";
}
/**
 * @public
 */
export function isWrappedTheme(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "theme");
}
//# sourceMappingURL=GdcMetadata.js.map