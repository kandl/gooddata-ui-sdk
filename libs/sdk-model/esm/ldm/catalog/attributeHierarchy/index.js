// (C) 2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether the provided object is a {@link ICatalogAttributeHierarchy}.
 *
 * @public
 */
export function isCatalogAttributeHierarchy(obj) {
    return !isEmpty(obj) && obj.type === "attributeHierarchy";
}
//# sourceMappingURL=index.js.map