import React from "react";
import { DashboardAccessibilityLimitation } from "./types.js";
export interface IDashboardDropdownButtonProps {
    isOpen: boolean;
    label: string;
    toggleDropdown: () => void;
    accessibilityLimitation?: DashboardAccessibilityLimitation;
}
export declare const DashboardListButton: React.FC<IDashboardDropdownButtonProps>;
