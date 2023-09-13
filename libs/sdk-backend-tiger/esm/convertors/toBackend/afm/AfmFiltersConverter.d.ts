import { FilterDefinition, MeasureItem } from "@gooddata/api-client-tiger";
import { IFilter, IMeasure } from "@gooddata/sdk-model";
/**
 * Converts internal `afmFilters` to backend AFM filters. Those filters that reference some compute ratio measure from
 * `afmMeasures` will be handled specially (see `determineComputeRatioMeasureNumerators`) and will also lead to `auxMeasures`
 * being generated (intended to be used by the callers in crafting the final backend AFM).
 */
export declare function convertAfmFilters(afmMeasures: IMeasure[], afmFilters: IFilter[]): {
    filters: FilterDefinition[];
    auxMeasures: MeasureItem[];
};
//# sourceMappingURL=AfmFiltersConverter.d.ts.map