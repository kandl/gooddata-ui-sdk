// (C) 2020 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isArray from "lodash/isArray.js";
import { isObjRef } from "@gooddata/sdk-model";
function isValidSetFilterParentsAttributeFilter(obj) {
    if (isEmpty(obj)) {
        return false;
    }
    const { attributeFilter } = obj;
    return isObjRef(attributeFilter === null || attributeFilter === void 0 ? void 0 : attributeFilter.displayForm);
}
function isValidSetFilterParentsItemFilter(obj) {
    return isValidSetFilterParentsAttributeFilter(obj);
}
function isValidSetFilterParentsItemParent(obj) {
    if (isEmpty(obj)) {
        return false;
    }
    const { connectingAttribute, parent } = obj;
    return isValidSetFilterParentsItemFilter(parent) && isObjRef(connectingAttribute);
}
function isValidSetFilterParentsItem(obj) {
    if (isEmpty(obj)) {
        return false;
    }
    const { filter, parents } = obj;
    return (isValidSetFilterParentsItemFilter(filter) &&
        isArray(parents) &&
        parents.every(isValidSetFilterParentsItemParent));
}
export function isValidSetFilterParentsCommandData(obj) {
    if (isEmpty(obj)) {
        return false;
    }
    const { filters } = obj;
    if (!isArray(filters)) {
        return false;
    }
    return filters.every(isValidSetFilterParentsItem);
}
//# sourceMappingURL=validators.js.map