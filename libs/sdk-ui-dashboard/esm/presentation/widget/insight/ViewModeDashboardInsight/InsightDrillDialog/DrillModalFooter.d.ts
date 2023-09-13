import React from "react";
export interface IDrillModalFooterProps {
    exportAvailable: boolean;
    exportXLSXEnabled: boolean;
    onExportXLSX: () => void;
    exportCSVEnabled: boolean;
    onExportCSV: () => void;
    isLoading: boolean;
}
export declare const DrillModalFooter: React.FC<IDrillModalFooterProps>;
