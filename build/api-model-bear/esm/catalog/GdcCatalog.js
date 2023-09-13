// (C) 2007-2021 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * @public
 */
export function isCatalogAttribute(obj) {
    return !isEmpty(obj) && obj.type === "attribute";
}
/**
 * @public
 */
export function isCatalogMetric(obj) {
    return !isEmpty(obj) && obj.type === "metric";
}
/**
 * @public
 */
export function isCatalogFact(obj) {
    return !isEmpty(obj) && obj.type === "fact";
}
//# sourceMappingURL=GdcCatalog.js.map