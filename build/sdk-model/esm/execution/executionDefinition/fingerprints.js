// (C) 2019-2021 GoodData Corporation
import stringify from "json-stable-stringify";
import { invariant } from "ts-invariant";
/**
 * @internal
 */
export function attributeFingerprint(attribute) {
    invariant(attribute, "attribute must not be undefined");
    return stringify(attribute);
}
/**
 * @internal
 */
export function sortFingerprint(sort) {
    return stringify(sort);
}
/**
 * @internal
 */
export function dataSamplingFingerprint(dataSamplingPercentage) {
    // Since data sampling is optional, we will have to handle undefined by returning a string
    return dataSamplingPercentage ? dataSamplingPercentage.toString() : "undefined";
}
//# sourceMappingURL=fingerprints.js.map