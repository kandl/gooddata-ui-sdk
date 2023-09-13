import React from "react";
export interface DrillDialogProps {
    insightTitle: string;
    breadcrumbs: string[];
    onCloseDialog: () => void;
    onBackButtonClick: () => void;
    isBackButtonVisible?: boolean;
    children: React.ReactNode;
    exportAvailable: boolean;
    onExportXLSX: () => void;
    onExportCSV: () => void;
    exportXLSXEnabled: boolean;
    exportCSVEnabled: boolean;
    isLoading: boolean;
}
export declare const DrillDialog: React.FC<DrillDialogProps>;
