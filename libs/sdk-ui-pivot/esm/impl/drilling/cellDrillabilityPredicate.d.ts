import { DataViewFacade, IHeaderPredicate } from "@gooddata/sdk-ui";
import { IGridRow } from "../data/resultTypes.js";
import { AnyCol } from "../structure/tableDescriptorTypes.js";
import { ColumnHeadersPosition } from "../../publicTypes.js";
export declare function isCellDrillable(colDescriptor: AnyCol, row: IGridRow, dv: DataViewFacade, drillablePredicates: IHeaderPredicate[], columnHeadersPosition: ColumnHeadersPosition, isTransposed: boolean): boolean;
//# sourceMappingURL=cellDrillabilityPredicate.d.ts.map