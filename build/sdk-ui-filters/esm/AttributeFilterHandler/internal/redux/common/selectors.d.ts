import { IAttributeElement } from "@gooddata/sdk-model";
import { AttributeFilterState } from "../store/state.js";
/**
 * @internal
 */
export declare const selectState: (state: AttributeFilterState) => AttributeFilterState;
/**
 * @internal
 */
export declare const getElementCacheKey: (state: AttributeFilterState, element: IAttributeElement) => string;
/**
 * @internal
 */
export declare const selectElementsForm: (state: AttributeFilterState) => "values" | "uris";
