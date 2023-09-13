// (C) 2019-2020 GoodData Corporation
import stringify from "json-stable-stringify";
import merge from "lodash/merge.js";
/**
 * Calculates dimension fingerprint; ensures that the optional vs default values are correctly reflected in
 * the fingerprint.
 *
 * @internal
 */
export function dimensionFingerprint(dim) {
    const dimDefaults = {
        totals: [],
    };
    const withDefaultTotals = merge(dimDefaults, dim);
    return stringify(withDefaultTotals);
}
//# sourceMappingURL=fingerprint.js.map