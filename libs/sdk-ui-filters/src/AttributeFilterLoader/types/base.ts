// (C) 2022 GoodData Corporation
import { IAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeLoader } from "./attribute";
import { IAttributeElementLoader } from "./elements";

/**
 * Handles the whole attribute filter experience
 * @alpha
 */
export interface IAttributeFilterHandlerBase extends IAttributeLoader, IAttributeElementLoader {
    //
    // selectors
    //

    /**
     * Get the effective filter (using the committed selection).
     */
    getFilter(): IAttributeFilter;
}
