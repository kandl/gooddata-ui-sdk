import { IAttribute } from "../attribute/index.js";
import { IDimension } from "../base/dimension.js";
import { ISortItem } from "../base/sort.js";
import { ITotal } from "../base/totals.js";
import { IBucket } from "../buckets/index.js";
import { IFilter, INullableFilter } from "../filter/index.js";
import { IMeasure } from "../measure/index.js";
/**
 * Contains any configuration that should be done with the data after they are obtained from the server
 * and before they are passed to the user.
 *
 * @public
 */
export interface IPostProcessing {
    /**
     * Format to be applied to the dates in an AFM execution response.
     */
    readonly dateFormat?: string;
}
/**
 * Contains any configiration that should be part of execution
 *
 * @public
 */
export interface IExecutionConfig {
    /**
     * Data sampling is only available in Tiger for specific databases
     */
    dataSamplingPercentage?: number;
}
/**
 * Execution definition contains 100% complete description of what will the execution compute and how will
 * the resulting data look like.
 *
 * @remarks
 * While the execution definition is part of the public API, it is a low-level structure and as such SHOULD NOT
 * be used in the typical application code. The UI.SDK offers several convenience layers to construct the execution
 * definition. The typical flows start in the Analytical Workspace.
 *
 * @public
 */
export interface IExecutionDefinition {
    /**
     * Analytical Workspace against which the execution should be run.
     */
    readonly workspace: string;
    /**
     * Buckets describe logical grouping within attributes and measures - they serve as a metadata
     * about the execution. They ARE NOT used during the execution itself. MAY be empty.
     */
    readonly buckets: IBucket[];
    /**
     * Attributes to slice the results by. MAY be empty. If not specified, then measures MUST be specified.
     */
    readonly attributes: IAttribute[];
    /**
     * Measures to calculate. MAY be empty. If not specified, then attributes MUST be specified.
     */
    readonly measures: IMeasure[];
    /**
     * Filters to apply during the execution. MAY be empty.
     */
    readonly filters: IFilter[];
    /**
     * Sorting to apply on the results. MAY be empty.
     */
    readonly sortBy: ISortItem[];
    /**
     * Dimensionality and contents of dimensions. MUST be specified.
     *
     * The dimensions specify how the result should be organized. For instance which attributes should be
     * used to slice the row dimension, in which dimension should the measures be located.
     */
    readonly dimensions: IDimension[];
    /**
     * Contains any configuration that should be done with the data after they are obtained from the server
     * and before they are passed to the user.
     */
    readonly postProcessing?: IPostProcessing;
    /**
     * additional configuration of the execution
     */
    readonly executionConfig?: IExecutionConfig;
}
/**
 * Function transforming a list of buckets (with attributes and measures) into execution dimension descriptors.
 *
 * @public
 */
export type DimensionGenerator = (def: IExecutionDefinition) => IDimension[];
/**
 * Creates new execution definition by merging new filters into an existing definition.
 *
 * @param def - existing definition
 * @param filters - array of filters to add to definition
 * @returns always new instance
 * @public
 */
export declare function defWithFilters(def: IExecutionDefinition, filters?: INullableFilter[]): IExecutionDefinition;
/**
 * Creates new execution definition by merging new sort items into an existing definition.
 *
 * @param def - existing definition
 * @param sortBy - array of sort items to add to definition
 * @returns always new instance
 * @public
 */
export declare function defSetSorts(def: IExecutionDefinition, sortBy?: ISortItem[]): IExecutionDefinition;
/**
 * Creates new execution definition by merging new exection configuration into an existing definition.
 *
 * @param def - existing definition
 * @param config - execution configuration
 * @returns always new instance
 * @public
 */
export declare function defSetExecConfig(def: IExecutionDefinition, config: IExecutionConfig): IExecutionDefinition;
/**
 * Creates new execution definition by setting a new post processing.
 *
 * @param def - existing definition
 * @param postProcessing - configuration that should be done with the data after they are obtained from the server
 *  and before they are passed to the user
 * @returns always new instance
 * @public
 */
export declare function defSetPostProcessing(def: IExecutionDefinition, postProcessing: IPostProcessing): IExecutionDefinition;
/**
 * Gets totals from particular dimension in the provided execution definition.
 *
 * @param def - definition to get totals from
 * @param dimIdx - dimension index
 * @returns empty list if no definition or dimension with the provided index not defined or if there are no
 *  totals in the dimension
 * @public
 */
export declare function defTotals(def: IExecutionDefinition, dimIdx: number): ITotal[];
/**
 * Creates new execution definition by slapping the provided dimensions on top of the definition.
 *
 * @param def - existing definition
 * @param dimensions - dimensions
 * @returns always new instance
 * @public
 */
export declare function defSetDimensions(def: IExecutionDefinition, dimensions?: IDimension[]): IExecutionDefinition;
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
export declare function defFingerprint(def: IExecutionDefinition): string;
//# sourceMappingURL=index.d.ts.map