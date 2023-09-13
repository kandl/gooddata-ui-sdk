import React from "react";
import { DashboardAttributeFilterSelectionMode } from "@gooddata/sdk-model";
interface ISelectionModeProps {
    selectionTitleText: string;
    multiSelectionOptionText: string;
    singleSelectionOptionText: string;
    singleSelectionDisabledTooltip: string;
    selectionMode: DashboardAttributeFilterSelectionMode;
    onSelectionModeChange: (value: DashboardAttributeFilterSelectionMode) => void;
    disabled: boolean;
}
export declare const SelectionMode: React.FC<ISelectionModeProps>;
export {};
