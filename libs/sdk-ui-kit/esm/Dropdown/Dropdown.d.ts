import React from "react";
import { IAlignPoint } from "../typings/positioning.js";
import { OverlayPositionType } from "../typings/overlay.js";
/**
 * @internal
 */
export interface IDropdownButtonRenderProps {
    isMobile: boolean;
    isOpen: boolean;
    openDropdown: () => void;
    closeDropdown: () => void;
    toggleDropdown: () => void;
}
/**
 * @internal
 */
export interface IDropdownBodyRenderProps {
    isMobile: boolean;
    closeDropdown: () => void;
}
/**
 * @internal
 */
export interface IDropdownProps {
    renderBody: (props: IDropdownBodyRenderProps) => React.ReactNode;
    renderButton: (props: IDropdownButtonRenderProps) => React.ReactNode;
    openOnInit?: boolean;
    className?: string;
    alignPoints?: IAlignPoint[];
    closeOnMouseDrag?: boolean;
    closeOnOutsideClick?: boolean;
    closeOnParentScroll?: boolean;
    ignoreClicksOnByClass?: string[];
    onOpenStateChanged?: (isOpen: boolean) => void;
    overlayPositionType?: OverlayPositionType;
    overlayZIndex?: number;
    /**
     * Should the dropdown body be fullscreen on smaller screens? Defaults to true.
     */
    fullscreenOnMobile?: boolean;
    enableEventPropagation?: boolean;
}
/**
 * @internal
 */
export declare const Dropdown: React.FC<IDropdownProps>;
//# sourceMappingURL=Dropdown.d.ts.map