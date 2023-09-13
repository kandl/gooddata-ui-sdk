import React from "react";
/**
 * Properties of AttributeFilterEmptyResult component implementation
 * @beta
 */
export interface IAttributeFilterEmptyResultProps {
    /**
     * Component height
     */
    height: number;
    /**
     * Number of items that respect current criteria
     */
    totalItemsCount: number;
    /**
     * Indicate that items are filtered or not
     */
    isFilteredByParentFilters: boolean;
    /**
     * Current search string
     */
    searchString: string;
    /**
     * List of parent filters items titles that are used as current filtering criteria
     */
    parentFilterTitles?: string[];
}
/**
 * This component displays different types of messages for situations when all elements are filtered out.
 * It distinguishes messages when current criteria return empty results or all elements are filtered by parents or by search.
 * @beta
 */
export declare const AttributeFilterEmptyResult: React.VFC<IAttributeFilterEmptyResultProps>;
