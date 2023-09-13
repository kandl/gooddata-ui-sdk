import { IDataView } from "@gooddata/sdk-backend-spi";
import { IAttribute, IMeasure, IMeasureDescriptor, IAttributeDescriptor, IResultAttributeHeader, IResultHeader, IResultMeasureHeader } from "@gooddata/sdk-model";
export type DataSeriesDigest = {
    /**
     * Index of dimension that contains data series
     */
    dimIdx: number;
    /**
     * All measure descriptors in the series dimension.
     */
    fromMeasures: IMeasureDescriptor[];
    /**
     * Definitions of measures in the series dimension. The order of appearance matches
     * the order of appearance in the `fromMeasures` array.
     */
    fromMeasuresDef: IMeasure[];
    /**
     * All series-scoping attribute descriptors in series dimension.
     */
    scopingAttributes: IAttributeDescriptor[];
    /**
     * Definitions of scoping attributes in the series dimension. The order of appearance matches
     * the order of appearance in the `scopingAttributes`
     */
    scopingAttributesDef: IAttribute[];
    /**
     * All measure headers in the series dimension
     */
    measureHeaders: IResultMeasureHeader[];
    /**
     * All attribute headers in the series dimension - kept in order of their original appearance.
     */
    allAttributeHeaders: IResultAttributeHeader[][];
    /**
     * Index of measure local id → index into the series dimension
     */
    measureIndexes: {
        [localId: string]: number[];
    };
    /**
     * Count of data series - this is equal to number of measure headers (= all occurrences of all scoped measures)
     */
    count: number;
};
export type DataSlicesDigest = {
    /**
     * Index of dimension that contains data slices
     */
    dimIdx: number;
    /**
     * All attribute descriptors & totals definitions for the slices dimension.
     */
    descriptors: IAttributeDescriptor[];
    /**
     * Definitions of all attributes in the slices dimension. The order of appearance matches the
     * order of the descriptors.
     */
    descriptorsDef: IAttribute[];
    /**
     * All headers in the slices dimension.
     */
    headerItems: IResultHeader[][];
    /**
     * Total number of slices
     */
    count: number;
};
export type AttributeIndex = {
    [localId: string]: IAttribute;
};
export type MeasureIndex = {
    [localId: string]: IMeasure;
};
export type ExecutionDefinitionDigest = {
    /**
     * Attributes indexed by their local identifier
     */
    attributesIndex: AttributeIndex;
    /**
     * Measures indexed by their local identifier
     */
    measuresIndex: MeasureIndex;
};
/**
 * Data Access Digest contains categorized information and pointers to various parts of execution result
 * and the data view. The information from this digest is then used for more ergonomic creation of the
 * actual data series and slices and their descriptors.
 */
export type DataAccessDigest = {
    /**
     * Information about series. If series property is not in digest, then data view does not contain any
     * data series - which is completely valid case.
     */
    series?: DataSeriesDigest;
    /**
     * Information about slices. If slices property is not in digest, then data view does not contain any
     * data slices - which is completely valid case.
     */
    slices?: DataSlicesDigest;
    /**
     * Information extracted from execution definition.
     */
    def: ExecutionDefinitionDigest;
};
/**
 * Creates digest for the provided data view. The digest includes references to various parts of the
 * data view. The digest never copies any data from the input data view.
 *
 * @param dataView - data view to calculate digest for
 * @returns new digest
 */
export declare function createDataAccessDigest(dataView: IDataView): DataAccessDigest;
//# sourceMappingURL=dataAccessDigest.d.ts.map