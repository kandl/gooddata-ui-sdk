// (C) 2019-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether object is an instance of ICatalogDateDataset.
 *
 * @public
 */
export function isCatalogDateDataset(obj) {
    return !isEmpty(obj) && obj.type === "dateDataset";
}
//# sourceMappingURL=index.js.map