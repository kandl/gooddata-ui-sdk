import { IAttributeElement, IAttributeMetadataObject, IMeasure, IMeasureDefinitionType, IRelativeDateFilter, SortDirection } from "@gooddata/sdk-model";
import { AsyncOperationStatus, ILoadElementsOptions } from "../../../types/index.js";
import { FilterSelector } from "../common/types.js";
import { IElementsQueryAttributeFilter } from "@gooddata/sdk-backend-spi";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
/**
 * Get the elements specified by the keys.
 *
 * @remarks
 * If an element is not available in elementsMap, it is skipped. This can be the case when using hiddenElements,
 * or when a particular element is no longer accessible on the backend (either because it was removed or hidden
 * by permissions in the current context).
 *
 * @internal
 */
export declare const getElementsByKeys: (keys: string[], elementsMap: Record<string, IAttributeElement>) => IAttributeElement[];
/**
 * @internal
 */
export declare const selectElementKeys: FilterSelector<string[]>;
/**
 * @internal
 */
export declare const selectElementsCache: FilterSelector<Record<string, IAttributeElement>>;
/**
 * @internal
 */
export declare const selectElements: FilterSelector<IAttributeElement[]>;
/**
 * @internal
 */
export declare const selectElementsTotalCount: FilterSelector<number>;
/**
 * @internal
 */
export declare const selectInitTotalCountStatus: FilterSelector<AsyncOperationStatus>;
/**
 * @internal
 */
export declare const selectInitTotalCountError: FilterSelector<GoodDataSdkError>;
/**
 * @internal
 */
export declare const selectElementsTotalCountWithCurrentSettings: FilterSelector<number>;
/**
 * @internal
 */
export declare const selectStaticElements: FilterSelector<IAttributeElement[]>;
/**
 * @internal
 */
export declare const selectSearch: FilterSelector<string>;
/**
 * @internal
 */
export declare const selectOrder: FilterSelector<SortDirection>;
/**
 * @internal
 */
export declare const selectLimit: FilterSelector<number>;
/**
 * @internal
 */
export declare const selectOffset: FilterSelector<number>;
/**
 * @internal
 */
export declare const selectLimitingAttributeFilters: FilterSelector<IElementsQueryAttributeFilter[]>;
/**
 * @internal
 */
export declare const selectLimitingMeasures: FilterSelector<IMeasure<IMeasureDefinitionType>[]>;
/**
 * @internal
 */
export declare const selectLimitingDateFilters: FilterSelector<IRelativeDateFilter[]>;
/**
 * @internal
 */
export declare const selectLoadElementsOptions: FilterSelector<ILoadElementsOptions>;
/**
 * @internal
 */
export declare const selectLastLoadedElementsOptions: FilterSelector<ILoadElementsOptions>;
/**
 * @internal
 */
export declare const selectLimitingAttributeFiltersAttributes: FilterSelector<IAttributeMetadataObject[]>;
