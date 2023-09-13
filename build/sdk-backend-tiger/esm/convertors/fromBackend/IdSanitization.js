// (C) 2020-2021 GoodData Corporation
import { isAfmObjectIdentifier } from "@gooddata/api-client-tiger";
import cloneDeepWith from "lodash/cloneDeepWith.js";
import { toObjRef } from "./ObjRefConverter.js";
export const cloneWithSanitizedIds = (item) => cloneDeepWith(item, (value) => {
    if (isAfmObjectIdentifier(value)) {
        return toObjRef(value);
    }
    return undefined;
});
//# sourceMappingURL=IdSanitization.js.map