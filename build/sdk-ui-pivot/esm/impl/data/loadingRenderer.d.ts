/// <reference types="react" />
import { ICellRendererParams } from "@ag-grid-community/all-modules";
import { TableFacade } from "../tableFacade.js";
import { ICorePivotTableProps } from "../../publicTypes.js";
/**
 * Creates a loading renderer functional component which the table uses for rendering cells that will also show loading
 * indicators as data for them is being loaded.
 *
 * NOTE: keep in mind that this loading renderer IS NOT used to configure ag-grids built-in loading renderer. This
 * renderer is essentially a custom cell renderer which our table impl uses for all cells of the left-most table column.
 */
export declare function createLoadingRenderer(_table: TableFacade, _props: Readonly<ICorePivotTableProps>): (params: ICellRendererParams) => JSX.Element;
//# sourceMappingURL=loadingRenderer.d.ts.map