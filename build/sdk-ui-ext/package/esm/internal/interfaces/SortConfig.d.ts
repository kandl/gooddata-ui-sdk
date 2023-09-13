import { IMeasureSortTarget, LocalIdRef, ISortItem } from "@gooddata/sdk-model";
/**
 * @internal
 */
export type MeasureSortSuggestion = {
    type: "measureSort";
} & IMeasureSortTarget;
/**
 * Specifies set of available sorts for given level of hierarchy:
 * Specific attribute to which sort is related - for eg. multiple ViewBy attributes, each can specify its sorting
 */
/**
 * @internal
 */
export interface IAvailableSortsGroup {
    itemId: LocalIdRef;
    /**
     * Attribute sorts related to the attribute bucket item referenced by itemId
     * Attribute sort suggestions can be created later in AD
     * This structure eliminates the risk, that in one group attributeSortSuggestions for multiple attribute items will be mixed together
     */
    attributeSort?: {
        normalSortEnabled: boolean;
        areaSortEnabled: boolean;
    };
    metricSorts?: MeasureSortSuggestion[];
    /**
     * Additional text to available sorts, eg.
     * when there is single available sort, this can contain explanation of the reason
     */
    explanation?: string;
}
/**
 * @internal
 */
export declare const newAvailableSortsGroup: (attributeId: string, measureIds?: string[], normalSortEnabled?: boolean, areaSortEnabled?: boolean, explanation?: string) => IAvailableSortsGroup;
/**
 * @internal
 */
export interface ISortConfig {
    /**
     * Applied sort - when custom sort was provided, it is validated in current context of visualization and can be fully or partially applied.
     * When defined it has priority over defaultSort
     */
    appliedSort?: ISortItem[];
    /**
     * Default sort - default or chosen from inside of visualization
     */
    defaultSort: ISortItem[];
    /**
     * All available sorts for current buckets
     * - should contain current sort too
     */
    availableSorts: IAvailableSortsGroup[];
    /**
     * Whether sorting is supported by viz
     */
    supported: boolean;
    /**
     * Whether sorting is disabled for current buckets
     */
    disabled: boolean;
    /**
     * When sorting is disabled, this can contain explanation of reason
     */
    disabledExplanation?: string;
}
//# sourceMappingURL=SortConfig.d.ts.map