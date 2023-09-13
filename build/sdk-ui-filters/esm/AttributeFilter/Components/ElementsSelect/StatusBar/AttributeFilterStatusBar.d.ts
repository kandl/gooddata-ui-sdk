import { IAttributeElement } from "@gooddata/sdk-model";
import React from "react";
/**
 * It represents component that display status of current selection.
 * @beta
 */
export interface IAttributeFilterStatusBarProps {
    /**
     * Number of elements that respect current criteria.
     */
    totalElementsCountWithCurrentSettings: number;
    /**
     * Indicate that elements are filtered by parents filters or not.
     */
    isFilteredByParentFilters: boolean;
    /**
     * List of parent filter titles that filter current elements.
     *
     * @beta
     */
    parentFilterTitles: string[];
    /**
     * Indicate that current filter is inverted {@link @gooddata/sdk-model#INegativeAttributeFilter} or not {@link @gooddata/sdk-model#IPositiveAttributeFilter}
     *
     * @beta
     */
    isInverted: boolean;
    /**
     * List of selected items
     * @beta
     */
    selectedItems: IAttributeElement[];
    /**
     * Item title getter used to get translated item empty value
     *
     * @beta
     */
    getItemTitle: (item: IAttributeElement) => string;
    /**
     * Maximum selected items
     *
     * @beta
     */
    selectedItemsLimit: number;
}
/**
 * A component that displays status of current selection, like number of selected elements, if Attribute Filter is inverted and list of selected elements.
 *
 * @beta
 */
export declare const AttributeFilterStatusBar: React.FC<IAttributeFilterStatusBarProps>;
