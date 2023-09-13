import React from "react";
/**
 * It represent a text field input for searching Attribute Filter elements
 *
 * @beta
 */
export interface IAttributeFilterElementsSearchBarProps {
    /**
     * Current search string
     *
     * @beta
     */
    searchString: string;
    /**
     * Debounced search string callback
     *
     * @beta
     */
    onSearch: (text: string) => void;
    /**
     * Render smaller text input
     *
     * @beta
     */
    isSmall?: boolean;
}
/**
 * This component displays a text field and calls onSearch callback when user types search text.
 *
 * @beta
 */
export declare const AttributeFilterElementsSearchBar: React.VFC<IAttributeFilterElementsSearchBarProps>;
