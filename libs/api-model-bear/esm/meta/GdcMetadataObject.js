// (C) 2007-2021 GoodData Corporation
import values from "lodash/fp/values.js";
import first from "lodash/first.js";
import flow from "lodash/flow.js";
/**
 * @public
 */
export function unwrapMetadataObject(object) {
    return flow(values, first)(object);
}
//# sourceMappingURL=GdcMetadataObject.js.map