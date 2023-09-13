// (C) 2019-2020 GoodData Corporation
import stringify from "json-stable-stringify";
import { isSimpleMeasure } from "./index.js";
import merge from "lodash/merge.js";
import { isFilterRelevantForFingerprinting } from "../filter/fingerprint.js";
function simpleMeasureFingerprint(measure) {
    var _a;
    const { measureDefinition } = measure.measure.definition;
    const measureDefinitionWithSanitizedFilters = Object.assign(Object.assign({}, measureDefinition), { filters: (_a = measureDefinition.filters) === null || _a === void 0 ? void 0 : _a.filter(isFilterRelevantForFingerprinting) });
    const measureDefinitionDefaults = {
        filters: [],
        computeRatio: false,
    };
    const measureDefinitionWithDefaults = merge(measureDefinitionDefaults, measureDefinitionWithSanitizedFilters);
    return stringify({
        measure: Object.assign(Object.assign({}, measure.measure), { definition: {
                measureDefinition: measureDefinitionWithDefaults,
            } }),
    });
}
/**
 * Calculates dimension fingerprint; ensures that the optional vs default values are correctly reflected in
 * the fingerprint.
 *
 * @internal
 */
export function measureFingerprint(measure) {
    if (isSimpleMeasure(measure)) {
        /*
         * Simple measure has a few optional properties, which, when not provided default to specific
         * values (aggregation, computeRatio etc).
         *
         * Fingerprinting simple measure thus requires normalization of the definition so that measure with
         * optional props not specified has same fingerprint as measure with optional props specified to default
         * values.
         */
        return simpleMeasureFingerprint(measure);
    }
    return stringify(measure);
}
//# sourceMappingURL=fingerprint.js.map