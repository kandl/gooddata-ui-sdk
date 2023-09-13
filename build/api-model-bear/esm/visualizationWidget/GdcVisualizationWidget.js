// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/fp/isEmpty.js";
import has from "lodash/has.js";
/**
 * @public
 */
export function isDrillToVisualization(obj) {
    return !isEmpty(obj) && !!obj.drillToVisualization;
}
/**
 * @public
 */
export function isDrillToDashboard(obj) {
    return !isEmpty(obj) && !!obj.drillToDashboard;
}
/**
 * @public
 */
export function isDrillToCustomUrl(obj) {
    return !isEmpty(obj) && !!obj.drillToCustomUrl;
}
/**
 * @public
 */
export function isDrillToAttributeUrl(obj) {
    return !isEmpty(obj) && !!obj.drillToAttributeUrl;
}
/**
 * @public
 */
export function isDrillFromMeasure(obj) {
    return !isEmpty(obj) && !!obj.drillFromMeasure;
}
/**
 * @public
 */
export function isDrillFromAttribute(obj) {
    return !isEmpty(obj) && !!obj.drillFromAttribute;
}
/**
 * @public
 */
export function isVisualizationWidget(obj) {
    return !isEmpty(obj) && obj.meta.category === "visualizationWidget";
}
/**
 * @public
 */
export function isWrappedVisualizationWidget(obj) {
    // eslint-disable-next-line no-prototype-builtins
    return !isEmpty(obj) && has(obj, "visualizationWidget");
}
//# sourceMappingURL=GdcVisualizationWidget.js.map