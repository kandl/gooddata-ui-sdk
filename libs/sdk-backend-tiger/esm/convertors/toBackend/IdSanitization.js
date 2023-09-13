// (C) 2020 GoodData Corporation
import { isIdentifierRef } from "@gooddata/sdk-model";
import cloneDeepWith from "lodash/cloneDeepWith.js";
import { toObjQualifier } from "./ObjRefConverter.js";
export const cloneWithSanitizedIds = (item) => cloneDeepWith(item, (value) => {
    if (isIdentifierRef(value)) {
        return toObjQualifier(value);
    }
    return undefined;
});
//# sourceMappingURL=IdSanitization.js.map