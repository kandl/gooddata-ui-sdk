// (C) 2020-2023 GoodData Corporation
import last from "lodash/last.js";
import first from "lodash/first.js";
const PrefixSeparator = ":";
export function isInheritedObject(obj) {
    const { originType } = getObjectOrigin(obj);
    return originType === "PARENT";
}
export function getObjectOrigin(obj) {
    const { origin } = obj.meta || {};
    return origin || { originType: "NATIVE", originId: "" };
}
/**
 * This method split id by Prefix separator (:) and return origin info
 *
 * @remarks
 * Id without prefix - LOCAL origin type with not origin id
 * Id with prefix - REMOTE origin type with origin id as first part of id (before :) and
 *  id as second part if id (after :)
 *
 * @param id - string that represent id with or without prefix
 * @internal
 */
export function getIdOrigin(id) {
    const data = id.split(PrefixSeparator);
    //prefix + id
    if (data.length === 2) {
        return {
            originType: "PARENT",
            originId: first(data),
            id: last(data),
        };
    }
    return {
        originType: "NATIVE",
        originId: "",
        id,
    };
}
//# sourceMappingURL=ObjectInheritance.js.map