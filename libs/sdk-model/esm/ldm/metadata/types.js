// (C) 2019-2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type guard checking whether input is an instance of {@link IMetadataObject}.
 *
 * @public
 */
export function isMetadataObject(obj) {
    const c = obj;
    return !isEmpty(c) && c.type !== undefined && c.ref !== undefined;
}
//# sourceMappingURL=types.js.map