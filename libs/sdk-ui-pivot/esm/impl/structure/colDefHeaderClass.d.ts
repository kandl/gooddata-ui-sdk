import { TableFacade } from "../tableFacade.js";
import { ICorePivotTableProps } from "../../publicTypes.js";
export type HeaderClassProvider = (headerClassParams: any) => string;
export declare function headerClassFactory(table: TableFacade, _props: Readonly<ICorePivotTableProps>, classList?: string): HeaderClassProvider;
//# sourceMappingURL=colDefHeaderClass.d.ts.map