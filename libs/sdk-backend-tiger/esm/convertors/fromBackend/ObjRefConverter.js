import { NotSupported, UnexpectedError } from "@gooddata/sdk-backend-spi";
import { isUriRef, idRef } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import { isTigerType, tigerIdTypeToObjectType, } from "../../types/refTypeMapping.js";
export function toObjectType(value) {
    if (!isTigerType(value)) {
        throw new UnexpectedError(`Cannot convert ${value} to ObjRef, ${value} is not valid TigerAfmType`);
    }
    return tigerIdTypeToObjectType[value];
}
export function toObjRef(qualifier) {
    if (isUriRef(qualifier)) {
        throw new NotSupported(`Tiger backend does not allow referencing objects by URI.`);
    }
    return idRef(qualifier.identifier.id, toObjectType(qualifier.identifier.type));
}
export function isJsonApiId(obj) {
    return !isEmpty(obj) && (obj === null || obj === void 0 ? void 0 : obj.id) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.type) !== undefined;
}
export function jsonApiIdToObjRef(idAndType) {
    return idRef(idAndType.id, toObjectType(idAndType.type));
}
//# sourceMappingURL=ObjRefConverter.js.map