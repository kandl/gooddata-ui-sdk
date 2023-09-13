import { IAttributeElements, INegativeAttributeFilter, IPositiveAttributeFilter, ObjRef } from "@gooddata/sdk-model";
import { FilterSelector } from "../common/types.js";
/**
 * @internal
 */
export declare const selectAttributeFilterElementsForm: FilterSelector<"uris" | "values">;
/**
 * @internal
 */
export declare const selectHiddenElements: FilterSelector<string[]>;
/**
 * @internal
 */
export declare const selectHiddenElementsAsAttributeElements: FilterSelector<IAttributeElements>;
/**
 * @internal
 */
export declare const selectAttributeFilterDisplayForm: FilterSelector<ObjRef>;
/**
 * @internal
 */
export declare const selectAttributeFilterElements: FilterSelector<IAttributeElements>;
/**
 * @internal
 */
export declare const selectAttributeFilterElementsWithHiddenElementsResolved: FilterSelector<IAttributeElements>;
/**
 * @internal
 */
export declare const selectAttributeFilter: FilterSelector<INegativeAttributeFilter | IPositiveAttributeFilter>;
