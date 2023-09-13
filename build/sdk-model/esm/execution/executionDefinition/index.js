// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isString from "lodash/isString.js";
import SparkMD5 from "spark-md5";
import { invariant } from "ts-invariant";
import { dimensionTotals } from "../base/dimension.js";
import { mergeFilters } from "../filter/filterMerge.js";
import { measureFingerprint } from "../measure/fingerprint.js";
import { attributeFingerprint, dataSamplingFingerprint, sortFingerprint } from "./fingerprints.js";
import { dimensionFingerprint } from "../base/fingerprint.js";
import { filterFingerprint } from "../filter/fingerprint.js";
/**
 * Creates new execution definition by merging new filters into an existing definition.
 *
 * @param def - existing definition
 * @param filters - array of filters to add to definition
 * @returns always new instance
 * @public
 */
export function defWithFilters(def, filters = []) {
    invariant(def, "execution definition to add more filters to must be defined");
    if (isEmpty(filters)) {
        return def;
    }
    return Object.assign(Object.assign({}, def), { filters: mergeFilters(def.filters, filters) });
}
/**
 * Creates new execution definition by merging new sort items into an existing definition.
 *
 * @param def - existing definition
 * @param sortBy - array of sort items to add to definition
 * @returns always new instance
 * @public
 */
export function defSetSorts(def, sortBy = []) {
    invariant(def, "execution definition to set sorts in must be defined");
    return Object.assign(Object.assign({}, def), { sortBy });
}
/**
 * Creates new execution definition by merging new exection configuration into an existing definition.
 *
 * @param def - existing definition
 * @param config - execution configuration
 * @returns always new instance
 * @public
 */
export function defSetExecConfig(def, config) {
    invariant(def, "execution definition to set execution config in must be defined");
    return Object.assign(Object.assign({}, def), { executionConfig: config });
}
/**
 * Creates new execution definition by setting a new post processing.
 *
 * @param def - existing definition
 * @param postProcessing - configuration that should be done with the data after they are obtained from the server
 *  and before they are passed to the user
 * @returns always new instance
 * @public
 */
export function defSetPostProcessing(def, postProcessing) {
    invariant(def, "execution definition to set post processing in must be defined");
    return Object.assign(Object.assign({}, def), { postProcessing });
}
/**
 * Gets totals from particular dimension in the provided execution definition.
 *
 * @param def - definition to get totals from
 * @param dimIdx - dimension index
 * @returns empty list if no definition or dimension with the provided index not defined or if there are no
 *  totals in the dimension
 * @public
 */
export function defTotals(def, dimIdx) {
    invariant(def, "execution definition to get totals for must be defined");
    if (!def.dimensions[dimIdx]) {
        return [];
    }
    return dimensionTotals(def.dimensions[dimIdx]);
}
/**
 * Creates new execution definition by slapping the provided dimensions on top of the definition.
 *
 * @param def - existing definition
 * @param dimensions - dimensions
 * @returns always new instance
 * @public
 */
export function defSetDimensions(def, dimensions = []) {
    invariant(def, "execution definition to set dimension for must be defined");
    return Object.assign(Object.assign({}, def), { dimensions });
}
/**
 * Calculates fingerprint for the execution definition.
 *
 * @remarks
 * Fingerprinting is used as an _approximate_,
 * quick, first-level assessment whether two execution definitions are or are not effectively same = they
 * lead to the same computation on the backend.
 *
 * The contract and the approximate nature of the fingerprint can be described as follows:
 *
 * -  If two execution definitions have the same fingerprint, then they definitely are effectively the same
 *    from the result calculation point of view and the backend will perform the same computation for them.
 *
 * -  If two execution definition have different fingerprint, they MAY OR MAY NOT lead to different execution. Or
 *    more concrete: two executions with two different fingerprints MAY lead to the same execution and same results.
 *
 * While not optimal, this contract allows for safe usage of fingerprints to determine whether two
 * execution definitions have changed. For instance it can be used in React lifecycle methods (shouldComponentUpdate)
 * or for client-side caching.
 *
 * @param def - execution definition
 * @public
 */
export function defFingerprint(def) {
    var _a, _b;
    invariant(def, "execution definition to calculate fingerprint for must be defined");
    const hasher = new SparkMD5();
    /*
     * Simple approach to construct exec definition fingerprint; the main drawback is that it completely
     * disregards that ordering of some array elements does not impact the results of the actual execution.
     *
     * - attributes, measures, filters, sortby and totals should be sorted first and then fingerprinted.
     * - dimensions must be fingerprinted in the defined order
     *
     * This simple approach can lead to 'false negatives' => code says executions are different while in
     * fact are the same. This does not lead to functional issues as the bear can deal with that and will
     * reuse cached and all. The only drawback is frontend cache misses.
     */
    const hashFun = hasher.append.bind(hasher);
    hasher.append(def.workspace);
    def.attributes.map(attributeFingerprint).forEach(hashFun);
    def.measures.map(measureFingerprint).forEach(hashFun);
    def.filters.map(filterFingerprint).filter(isString).forEach(hashFun);
    def.sortBy.map(sortFingerprint).forEach(hashFun);
    def.dimensions.map(dimensionFingerprint).forEach(hashFun);
    if ((_a = def.executionConfig) === null || _a === void 0 ? void 0 : _a.dataSamplingPercentage) {
        hashFun(dataSamplingFingerprint((_b = def.executionConfig) === null || _b === void 0 ? void 0 : _b.dataSamplingPercentage));
    }
    return hasher.end();
}
//# sourceMappingURL=index.js.map