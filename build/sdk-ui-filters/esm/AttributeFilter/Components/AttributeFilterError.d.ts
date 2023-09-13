import React from "react";
/**
 * Component that is rendered when the initialization of the attribute filter ends up in an error state.
 * @remarks
 * It will be rendered instead of the component that implements {@link IAttributeFilterDropdownButtonProps}.
 * @beta
 */
export interface IAttributeFilterErrorProps {
    /**
     * Error message
     */
    message?: string;
    /**
     * Error object
     */
    error?: any;
    /**
     * Is active state or not
     */
    isOpen?: boolean;
    /**
     * Allow draggable
     */
    isDraggable?: boolean;
}
/**
 * AttributeFilter error component that display error,
 * It does not distinguish different errors, instead it renders a generic error message.
 * @beta
 */
export declare const AttributeFilterError: React.VFC<IAttributeFilterErrorProps>;
