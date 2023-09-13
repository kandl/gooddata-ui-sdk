// (C) 2019-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether the provided object is a {@link ICatalogAttribute}
 *
 * @public
 */
export function isCatalogAttribute(obj) {
    return !isEmpty(obj) && obj.type === "attribute";
}
//# sourceMappingURL=index.js.map