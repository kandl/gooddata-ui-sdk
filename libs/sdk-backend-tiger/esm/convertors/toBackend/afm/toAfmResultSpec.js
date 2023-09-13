import { convertMeasure } from "./MeasureConverter.js";
import { convertAttribute } from "./AttributeConverter.js";
import { convertDimensions } from "./DimensionsConverter.js";
import { convertAfmFilters } from "./AfmFiltersConverter.js";
import { convertTotals } from "./TotalsConverter.js";
function convertAFM(def) {
    const attributes = def.attributes.map(convertAttribute);
    const attrProp = { attributes };
    const measures = def.measures.map(convertMeasure);
    const measuresProp = { measures };
    const { filters, auxMeasures } = convertAfmFilters(def.measures, def.filters || []);
    const filtersProp = { filters };
    const auxMeasuresProp = { auxMeasures };
    return Object.assign(Object.assign(Object.assign(Object.assign({}, measuresProp), attrProp), filtersProp), auxMeasuresProp);
}
function convertResultSpec(def) {
    return {
        dimensions: convertDimensions(def),
        totals: convertTotals(def),
    };
}
/**
 * Converts execution definition to AFM Execution
 *
 * @param def - execution definition
 * @returns AFM Execution
 */
export function toAfmExecution(def) {
    return {
        resultSpec: convertResultSpec(def),
        execution: Object.assign({}, convertAFM(def)),
        settings: Object.assign({}, def.executionConfig),
    };
}
//# sourceMappingURL=toAfmResultSpec.js.map