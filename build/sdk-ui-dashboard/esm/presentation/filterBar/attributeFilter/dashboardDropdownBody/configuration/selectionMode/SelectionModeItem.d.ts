import React from "react";
import { DashboardAttributeFilterSelectionMode } from "@gooddata/sdk-model";
interface ISelectionModeItemProps {
    item: DashboardAttributeFilterSelectionMode;
    itemTitle: string;
    selected: boolean;
    disabled: boolean;
    disabledTooltip: string;
    onClick: () => void;
}
export declare const SelectionModeItem: React.FC<ISelectionModeItemProps>;
export {};
