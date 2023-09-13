import { DashboardAttributeFilterSelectionMode, IDashboardAttributeFilter } from "@gooddata/sdk-model";
export declare const useSelectionModeConfiguration: (attributeFilter: IDashboardAttributeFilter) => {
    selectionMode: DashboardAttributeFilterSelectionMode;
    selectionModeChanged: boolean;
    onSelectionModeChange: () => void;
    onSelectionModeUpdate: (value: DashboardAttributeFilterSelectionMode) => void;
    onConfigurationClose: () => void;
};
