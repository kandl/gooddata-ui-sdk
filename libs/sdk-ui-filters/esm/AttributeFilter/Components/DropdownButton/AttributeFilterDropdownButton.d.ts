import React, { ReactNode } from "react";
export declare const ALIGN_POINT: {
    align: string;
    offset: {
        x: number;
        y: number;
    };
}[];
/**
 * The interface of the AttributeFilter dropdown button.
 *
 * @remarks
 * It opens Attribute filter dropdown and displaying title or subtitle, selection details and attribute filter statuses like loading or filtering.
 * Note: for rendering error status see {@link IAttributeFilterErrorProps}.
 * @beta
 */
export interface IAttributeFilterDropdownButtonProps {
    /**
     * Title of the attribute {@link @gooddata/sdk-model#IAttributeFilter} and its related display form {@link @gooddata/sdk-model#IAttributeDisplayFormMetadataObject}.
     *
     * @beta
     */
    title?: string;
    /**
     * Comma-separated list of selected element titles.
     *
     * @beta
     */
    subtitle?: string;
    /**
     * Selected items count
     *
     * @remarks
     * -  If value is 0 for {@link @gooddata/sdk-model#IPositiveAttributeFilter} means NONE items are selected
     *
     * -  If value is 0 for {@link @gooddata/sdk-model#INegativeAttributeFilter} means ALL items are selected
     *
     * @beta
     */
    selectedItemsCount?: number;
    /**
     *
     * @beta
     */
    showSelectionCount?: boolean;
    /**
     * If true, the AttributeFilter dropdown is open.
     *
     * @beta
     */
    isOpen?: boolean;
    /**
     * If true, the AttributeFilter is initializing Attribute elements and its internal data.
     *
     * @beta
     */
    isLoading?: boolean;
    /**
     * If true, the AttributeFilter is filtering its elements by parent filters.
     *
     * @beta
     */
    isFiltering?: boolean;
    /**
     * If true, all the initialization has finished.
     *
     * @beta
     */
    isLoaded?: boolean;
    /**
     * If true, the button supports drag and drop operations.
     *
     * @beta
     */
    isDraggable?: boolean;
    /**
     * Icon of the AttributeFilterDropdownButton.
     *
     * @beta
     */
    icon?: ReactNode;
    /**
     * Customize content of the attribute filter tooltip component.
     *
     * @beta
     */
    TooltipContentComponent?: React.ComponentType;
    /**
     * Callback to open or close AttributeFilter dropdown.
     *
     * @beta
     */
    onClick?: () => void;
    isError?: boolean;
}
/**
 * Dropdown button for the AttributeFilter.
 *
 * @remarks
 * This component implements the {@link IAttributeFilterDropdownButtonProps} interface.
 * It displays AttributeFilterDropdownButton in the GoodData look and feel.
 * It displays the name of the related attribute filter as a title and the state of the selection as a subtitle.
 * It displays loading and filtering statuses.
 * It supports setting a left icon and dragging icons.
 *
 * @beta
 */
export declare const AttributeFilterDropdownButton: React.VFC<IAttributeFilterDropdownButtonProps>;
