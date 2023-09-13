import { IExecutionDefinition, IDimensionDescriptor, IResultHeader } from "@gooddata/sdk-model";
/**
 * @beta
 */
export type LocalIdMap = {
    [from: string]: string;
};
/**
 * @beta
 */
export type NormalizationState = {
    /**
     * Normalized execution definition
     */
    readonly normalized: IExecutionDefinition;
    /**
     * Original execution definition
     */
    readonly original: IExecutionDefinition;
    /**
     * Local ID mapping between normalized and original execution definitions.
     */
    readonly n2oMap: LocalIdMap;
};
/**
 * @internal
 */
export declare class Denormalizer {
    readonly state: NormalizationState;
    static from(state: NormalizationState): Denormalizer;
    private readonly originalAttributes;
    private readonly originalMeasures;
    private constructor();
    /**
     * Given the current normalization state, this method transforms the dimension descriptors of the
     * normalized execution, so that all the customization of the original execution definition is restored
     * into them:
     *
     * -  Reverse lookup of local identifiers happens
     * -  Attribute / Measure name is set according to the defined alias
     * -  Measure format is set according to the format in definition
     *
     * @param normalizedDims - normalized dimension descriptors
     * @returns new descriptors
     */
    denormalizeDimDescriptors: (normalizedDims: IDimensionDescriptor[]) => IDimensionDescriptor[];
    /**
     * Derived measures or arithmetic measures have the 'name' in result header defaulted to measure
     * localId. This method deals with it. It creates a copy of headers with the measure headers denormalized,
     * values replaced with the contents of alias or title (whichever comes first).
     *
     * @param headerItems - headers to denormalize, copy will be done
     * @returns new headers
     */
    denormalizeHeaders: (headerItems: IResultHeader[][][]) => IResultHeader[][][];
    private originalLocalId;
    private fillOriginalMeasureTitle;
    private originalMeasureTitle;
}
/**
 * @internal
 */
export interface INormalizerOptions {
    /**
     * If true, things like aliases, titles, etc. are kept in the objects. Defaults to false.
     */
    keepRemovableProperties?: boolean;
}
/**
 * The normalization of execution definition means stripping away all the detail that is unnecessary for the
 * backend:
 *
 * -  attribute / measure alias
 * -  measure title
 * -  measure format
 * -  custom-crafted local IDs
 *
 * The code does the job by _mutating_ a clone of the original definition. The mutation approach, while not
 * backed by functionality in sdk-model and therefore somewhat hacky, is a simpler one for this task.
 *
 * The main reason behind that is the occurrence of attribute and measure objects in multiple parts of the
 * execution definition: same attributes and measures are referenced from both buckets and the attributes and measures
 * props of the execution definition. Mutating values means that after normalizing values the execution definition
 * is fully normalized.
 *
 * @internal
 */
export declare class Normalizer {
    readonly original: IExecutionDefinition;
    protected readonly options: INormalizerOptions;
    static normalize(def: IExecutionDefinition, options?: INormalizerOptions): NormalizationState;
    readonly normalized: IExecutionDefinition;
    /**
     * original to normalized local id map
     */
    private readonly o2nMap;
    /**
     * normalized to original local id map
     */
    private readonly n2oMap;
    private readonly originalMeasures;
    private readonly alreadyNormalized;
    private constructor();
    /**
     * Creates a new mapping between original local ID and the proposed normalized local ID. This method
     * ensures uniqueness of the normalized local ID. If the proposed normalized local ID is taken, it will
     * append a suffix to make a unique local ID.
     *
     * This can happen if the original execution definition contains same measure / attribute multiple times,
     * each time using different local ID.
     */
    private createUniqueMapping;
    private normalizedLocalId;
    private maybeNormalizedLocalId;
    private normalizeAttributes;
    private normalizeTotal;
    private normalizeTotals;
    /**
     * Simple measure normalization will toss away noop filters. There is nothing else to do.
     */
    private normalizeSimple;
    private normalizePoP;
    private normalizePreviousPeriod;
    private normalizeArithmetic;
    private normalizeMeasure;
    private normalizeMeasureByLocalId;
    private normalizeMeasures;
    private normalizeFilters;
    private normalizeSorts;
    private normalizeDimensions;
    private normalize;
}
//# sourceMappingURL=normalizer.d.ts.map