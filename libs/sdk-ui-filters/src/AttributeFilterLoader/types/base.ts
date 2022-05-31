// (C) 2022 GoodData Corporation
import { IAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeDisplayFormLoader } from "./displayForm";
import { IAttributeElementLoader } from "./elements";

/**
 * Handles the whole attribute filter experience
 * @internal
 */
export interface IAttributeFilterHandlerBase extends IAttributeDisplayFormLoader, IAttributeElementLoader {
    //
    // selectors
    //

    /**
     * Get the effective filter (using the committed selection).
     */
    getFilter(): IAttributeFilter;
}
