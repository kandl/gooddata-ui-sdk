import React from "react";
/**
 * @internal
 */
export interface IAttributeDisplayFormDropdownButtonProps {
    text: string;
    isOpened: boolean;
    toggleDropdown: (e: React.SyntheticEvent) => void;
}
/**
 * @internal
 */
export declare const AttributeDisplayFormDropdownButton: React.FC<IAttributeDisplayFormDropdownButtonProps>;
