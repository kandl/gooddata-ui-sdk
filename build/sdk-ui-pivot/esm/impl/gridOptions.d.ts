import { ICustomGridOptions, TableAgGridCallbacks, TableConfigAccessors, TableMenuCallbacks } from "./privateTypes.js";
import { TableFacade } from "./tableFacade.js";
import { ICorePivotTableProps } from "../publicTypes.js";
export declare function createGridOptions(table: TableFacade, tableMethods: TableAgGridCallbacks & TableConfigAccessors & TableMenuCallbacks, props: Readonly<ICorePivotTableProps>): ICustomGridOptions;
//# sourceMappingURL=gridOptions.d.ts.map