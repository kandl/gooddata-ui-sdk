import React from "react";
export interface IDrillModalExportOptionsProps {
    showDropdown: boolean;
    toggleShowDropdown(): void;
    exportXLSXEnabled: boolean;
    onExportXLSX: () => void;
    exportCSVEnabled: boolean;
    onExportCSV: () => void;
}
declare const DrillModalExportOptions: React.FC<IDrillModalExportOptionsProps>;
export default DrillModalExportOptions;
