import { CellClassParams } from "@ag-grid-community/all-modules";
import { TableFacade } from "../tableFacade.js";
import { ICorePivotTableProps } from "../../publicTypes.js";
export type CellClassProvider = (cellClassParams: CellClassParams) => string;
export declare function cellClassFactory(table: TableFacade, props: Readonly<ICorePivotTableProps>, classList?: string): CellClassProvider;
//# sourceMappingURL=cellClass.d.ts.map