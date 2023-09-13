// (C) 2019-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether the provided object is a {@link ICatalogFact}
 *
 * @public
 */
export function isCatalogFact(obj) {
    return !isEmpty(obj) && obj.type === "fact";
}
//# sourceMappingURL=index.js.map