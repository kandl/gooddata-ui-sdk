/// <reference types="react" />
import { DataValue, ISeparators } from "@gooddata/sdk-model";
import { CellStyle } from "@ag-grid-community/all-modules";
export interface ITableCellStyle {
    backgroundColor?: string;
    color?: string;
    fontWeight?: React.CSSProperties["fontWeight"];
}
export declare function getCellClassNames(rowIndex: number, columnIndex: number, isDrillable: boolean): string;
export declare function getMeasureCellFormattedValue(value: DataValue, format: string, separators: ISeparators | undefined): string;
export declare function getMeasureCellStyle(value: DataValue, format: string, separators: ISeparators | undefined, applyColor: boolean): CellStyle;
//# sourceMappingURL=cellUtils.d.ts.map