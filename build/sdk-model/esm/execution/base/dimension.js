// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isTotal } from "./totals.js";
import isEmpty from "lodash/isEmpty.js";
import findIndex from "lodash/findIndex.js";
import { attributeLocalId, isAttribute } from "../attribute/index.js";
/**
 * Measure Group is a pseudo-identifier which can be used in an execution dimension and indicates
 * that this dimension MUST contain all the measures.
 *
 * @public
 */
export const MeasureGroupIdentifier = "measureGroup";
/**
 * Determine if a given item is a measure group.
 *
 * @public
 */
export const isMeasureGroupIdentifier = (itemOrTotal) => itemOrTotal === MeasureGroupIdentifier;
//
// Type guards
//
/**
 * Type guard checking whether object is of IDimension type.
 *
 * @public
 */
export function isDimension(obj) {
    return !isEmpty(obj) && obj.itemIdentifiers !== undefined;
}
//
// Public functions
//
/**
 * Gets totals defined in the provided dimension
 *
 * @param dim - dimension to work with
 * @returns totals in the dimension or empty array if none
 * @public
 */
export function dimensionTotals(dim) {
    invariant(dim, "dimension must be specified");
    return dim.totals ? dim.totals : [];
}
/**
 * Creates a new dimension which has same items as the provided dimension but different totals.
 *
 * @param dim - dimension to inherit item identifiers from
 * @param totals - totals to have in the new dimension
 * @returns new dimension
 * @public
 */
export function dimensionSetTotals(dim, totals = []) {
    invariant(dim, "dimension must be specified");
    const totalsProp = !isEmpty(totals) ? { totals } : {};
    return Object.assign({ itemIdentifiers: dim.itemIdentifiers }, totalsProp);
}
/**
 * Creates new two dimensional specification where each dimension will have the provided set of
 * identifiers.
 *
 * @remarks
 * The 'measureGroup' identifier MAY be specified in only one of the dimensions.
 *
 * @param dim1Input - items to put into the first dimension, this can be item identifiers or totals
 * @param dim2Input - items to put into the second dimension, this can be item identifiers or totals
 * @returns array with exactly two dimensions
 * @public
 */
export function newTwoDimensional(dim1Input, dim2Input) {
    invariant(dim1Input, "input for first dimension must be specified");
    invariant(dim2Input, "input for second dimension must be specified");
    const atMostOneMeasureGroup = !(dim1Input.find(isMeasureGroupIdentifier) && dim2Input.find(isMeasureGroupIdentifier));
    invariant(atMostOneMeasureGroup, "The 'measureGroup' identifier must only be specified in one dimension.");
    return [newDimension(dim1Input), newDimension(dim2Input)];
}
/**
 * Creates new single-dimensional specification where the dimension will have the provided set of identifiers.
 *
 * @param items - allows for mix of item identifiers, attributes and total definitions to have in the new dimension
 * @param totals - additional totals to add to the dimension
 * @returns single dimension
 * @public
 */
export function newDimension(items = [], totals = []) {
    const input = items.reduce((acc, value) => {
        if (isTotal(value)) {
            acc.totals.push(value);
        }
        else if (isAttribute(value)) {
            acc.ids.push(attributeLocalId(value));
        }
        else {
            acc.ids.push(value);
        }
        return acc;
    }, { ids: [], totals: [] });
    input.totals.push(...totals);
    const totalsProp = !isEmpty(input.totals) ? { totals: input.totals } : {};
    return Object.assign({ itemIdentifiers: input.ids }, totalsProp);
}
/**
 * Looks for item with the provided local identifier among the dimensions.
 *
 * @param dims - list of dimensions to look in
 * @param localId - local identifier to find among item identifiers
 * @returns list of items in dimensions, empty if not found, may contain more than one entry if
 *  item is in multiple dimensions
 * @public
 */
export function dimensionsFindItem(dims, localId) {
    const result = [];
    for (let dimIdx = 0; dimIdx < dims.length; dimIdx++) {
        const dim = dims[dimIdx];
        const itemIdx = findIndex(dim.itemIdentifiers, (i) => i === localId);
        if (itemIdx >= 0) {
            result.push({ dim, dimIdx, itemIdx });
        }
    }
    return result;
}
//# sourceMappingURL=dimension.js.map