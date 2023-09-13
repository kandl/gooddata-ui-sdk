import { IDataView } from "@gooddata/sdk-backend-spi";
import { ISortItem, IMeasureDescriptor, IDimensionItemDescriptor, IDimensionDescriptor, IAttributeDescriptor, IMeasureGroupDescriptor, IResultAttributeHeader, IResultHeader } from "@gooddata/sdk-model";
/**
 * Methods to access result metadata - dimension descriptors and result headers.
 *
 * @internal
 */
export interface IResultMetaMethods {
    /**
     * @returns data view's dimension descriptors
     * @remarks see {@link @gooddata/sdk-backend-spi#IDimensionDescriptor} for more information of what this is
     */
    dimensions(): IDimensionDescriptor[];
    /**
     * @param dimIdx - index of dimension
     * @returns dimension item descriptors for desired dimension of the resulting data view
     */
    dimensionItemDescriptors(dimIdx: number): IDimensionItemDescriptor[];
    /**
     * @returns attribute descriptors from all dimensions
     */
    attributeDescriptors(): IAttributeDescriptor[];
    /**
     * Returns attribute descriptors from particular dimension.
     *
     * @param dim - dimension index
     * @returns attribute descriptors, empty if none or if no such dimension
     */
    attributeDescriptorsForDim(dim: number): IAttributeDescriptor[];
    /**
     * @returns measure group descriptor, regardless of dimension in which it is located
     */
    measureGroupDescriptor(): IMeasureGroupDescriptor | undefined;
    /**
     * This is a convenience function to find measure group descriptor and return its measure descriptors.
     *
     * @returns measure descriptors, empty array if measure group header descriptor is not in any dimension
     */
    measureDescriptors(): IMeasureDescriptor[];
    /**
     * Finds measure descriptor by local identifier of the measure from execution definition.
     *
     * @param localId - local identifier of desired measure's descriptor
     * @returns undefined if no measure group header descriptor or no measure descriptor with the provided local identifier
     */
    measureDescriptor(localId: string): IMeasureDescriptor | undefined;
    /**
     * Tests whether there are any headers in the dimension with the provided index.
     *
     * @param dim - dimension index.
     */
    hasNoHeadersInDim(dim: number): boolean;
    /**
     * @returns all headers describing the data included in the data view
     */
    allHeaders(): IResultHeader[][][];
    /**
     * @returns filters headers for all dimensions so that only attribute headers for the dimensions
     *   are returned
     */
    attributeHeaders(): IResultAttributeHeader[][][];
    /**
     * @returns filters headers for the provided dimension so that only attribute headers in that dimension
     *   are returned
     */
    attributeHeadersForDim(idx: number): IResultAttributeHeader[][];
    /**
     * Tests whether measure descriptor is for a derived measure - that is, the measure is specified in
     * execution definition and is either PoP measure or Previous Period Measure.
     *
     * @param measureDescriptor - input measure descriptor
     * @returns true if measure for the provide measure descriptor is in definition AND is either PoP or previous
     *  period; false otherwise.
     */
    isDerivedMeasure(measureDescriptor: IMeasureDescriptor): boolean;
    /**
     * Tests whether measure descriptor is for a virtual measure - that is, the measure is specified in
     * execution definition and is either virtual measure.
     *
     * @param measureDescriptor - input measure descriptor
     * @returns true if measure for the provide measure descriptor is in definition AND is either virtual measure; false otherwise.
     */
    isVirtualMeasure(measureDescriptor: IMeasureDescriptor): boolean;
    /**
     * Returns only those sort items from the result's definition which are actually applied on the result.
     *
     * The execution definition may contain sorts for measures scoped for particular attribute elements - it may
     * however happen that at the same time the execution definition contains filters that will remove the
     * attribute elements in question.
     *
     * This method inspects sorts in the definition, metadata and headers in the results and returns only those items
     * which actually match them.
     */
    effectiveSortItems(): ISortItem[];
}
export declare function newResultMetaMethods(dataView: IDataView): IResultMetaMethods;
//# sourceMappingURL=resultMetaMethods.d.ts.map