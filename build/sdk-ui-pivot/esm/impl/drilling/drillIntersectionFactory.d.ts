import { IDrillEventIntersectionElement } from "@gooddata/sdk-ui";
import { TableDescriptor } from "../structure/tableDescriptor.js";
import { CellEvent } from "@ag-grid-community/all-modules";
import { IGridRow } from "../data/resultTypes.js";
/**
 * Given an ag-grid cell event and table descriptor, create a drill intersection that exactly describes
 * coordinates of the clicked cell - by using attribute element headers, attribute descriptors and optionally measure
 * descriptor.
 *
 * @param cellEvent - cell event from ag-grid
 * @param tableDescriptor - table descriptor
 */
export declare function createDrillIntersection(cellEvent: CellEvent, tableDescriptor: TableDescriptor, rowNodes: IGridRow[]): IDrillEventIntersectionElement[];
//# sourceMappingURL=drillIntersectionFactory.d.ts.map