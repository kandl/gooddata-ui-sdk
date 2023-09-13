// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { measureLocalId } from "../measure/index.js";
import { attributeLocalId } from "../attribute/index.js";
import { invariant } from "ts-invariant";
//
// Type guards
//
/**
 * Type-guard checking whether an object is a Total.
 *
 * @public
 */
export function isTotal(obj) {
    return (!isEmpty(obj) &&
        obj.type !== undefined &&
        obj.measureIdentifier !== undefined &&
        obj.attributeIdentifier !== undefined);
}
//
//
//
/**
 * Creates a new total.
 *
 * @param type - type of total, one of the enumerated types
 * @param measureOrId - measure instance OR measure local identifier
 * @param attributeOrId - attribute instance OR attribute local identifier
 * @param alias - provide custom name (alias) for the total; this will be included in the computed results
 * @returns new total
 * @public
 */
export function newTotal(type, measureOrId, attributeOrId, alias) {
    invariant(type, "total type must be specified");
    invariant(measureOrId, "measure or measure local id must be specified");
    invariant(attributeOrId, "attribute or attribute local id must be specified");
    const measureIdentifier = measureLocalId(measureOrId);
    const attributeIdentifier = attributeLocalId(attributeOrId);
    const aliasProp = alias ? { alias } : {};
    return Object.assign({ type,
        measureIdentifier,
        attributeIdentifier }, aliasProp);
}
/**
 * Tests whether total instance represents a native total = a roll-up total.
 *
 * @public
 */
export function totalIsNative(total) {
    invariant(total, "total must be specified");
    return total.type === "nat";
}
//# sourceMappingURL=totals.js.map