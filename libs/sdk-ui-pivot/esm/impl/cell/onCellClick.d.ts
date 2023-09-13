import { TableFacade } from "../tableFacade.js";
import { ICorePivotTableProps } from "../../publicTypes.js";
import { CellEvent } from "@ag-grid-community/all-modules";
export type CellClickedHandler = (cellEvent: CellEvent) => boolean;
export declare function onCellClickedFactory(table: TableFacade, props: Readonly<ICorePivotTableProps>): CellClickedHandler;
//# sourceMappingURL=onCellClick.d.ts.map