// (C) 2019-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether the provided object is a {@link ICatalogMeasure}
 *
 * @public
 */
export function isCatalogMeasure(obj) {
    return !isEmpty(obj) && obj.type === "measure";
}
//# sourceMappingURL=index.js.map