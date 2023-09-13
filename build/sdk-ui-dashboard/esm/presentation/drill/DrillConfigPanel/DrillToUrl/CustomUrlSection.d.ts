import React from "react";
import { UrlDrillTarget } from "../../types.js";
type ToggleModalCallback = () => void;
type CloseDropdownCallback = (e: React.MouseEvent) => void;
interface CustomUrlSectionProps {
    toggleModal: ToggleModalCallback;
    closeDropdown: CloseDropdownCallback;
    urlDrillTarget?: UrlDrillTarget;
}
export declare const CustomUrlSection: React.FunctionComponent<CustomUrlSectionProps>;
export {};
