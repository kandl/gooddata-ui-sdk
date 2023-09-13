import React from "react";
/**
 * AttributeFilter dropdown actions like confirm and cancel button.
 * @beta
 */
export interface IAttributeFilterDropdownActionsProps {
    /**
     * Callback to apply changes of current selection.
     *
     * @beta
     */
    onApplyButtonClick: () => void;
    /**
     * Callback to discard changes and close AttributeFilter.
     *
     * @beta
     */
    onCancelButtonClick: () => void;
    /**
     * If true, the Apply action should be disabled.
     *
     * @beta
     */
    isApplyDisabled?: boolean;
}
/**
 * This component displays two buttons Apply and Cancel.
 * Apply button is disabled when selection is not changed.
 * Cancel button discard changes and close AttributeFilter dropdown.
 *
 * @beta
 */
export declare const AttributeFilterDropdownActions: React.VFC<IAttributeFilterDropdownActionsProps>;
